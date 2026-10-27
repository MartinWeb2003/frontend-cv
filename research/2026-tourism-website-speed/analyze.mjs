// Aggregates for the article, plus the anonymised CSV (no domains, no names).
import fs from 'node:fs/promises'

const survey = JSON.parse(await fs.readFile('survey.json', 'utf8'))
const lh = (await fs.readFile('lh.jsonl', 'utf8')).trim().split('\n').map(JSON.parse)
const lhBy = new Map(lh.map((r) => [r.domain, r]))

// Conservative classification of failures (see methodology).
const BROKEN = new Set(['ENOTFOUND', '404', '410', '500', '503', '520', '523', 'CERT_HAS_EXPIRED', 'ECONNREFUSED', 'ERR_SSL_SSLV3_ALERT_HANDSHAKE_FAILURE'])
const status = (r) => {
  if (r.ok) return 'ok'
  const e = String(r.retryError ?? r.error ?? r.status)
  return BROKEN.has(e) ? (e === 'ENOTFOUND' ? 'domain_gone' : 'broken') : 'unclear'
}

const pct = (a, b) => Math.round((1000 * a) / b) / 10
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b)
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

const total = survey.length
const st = survey.map(status)
const ok = survey.filter((r) => r.ok)
const scored = lh.filter((r) => typeof r.score === 'number' && !r.runtimeError)

const out = {
  frame: total,
  reachable: ok.length,
  domainGone: st.filter((s) => s === 'domain_gone').length,
  broken: st.filter((s) => s === 'broken').length,
  unclear: st.filter((s) => s === 'unclear').length,
  brokenPct: pct(st.filter((s) => s === 'domain_gone' || s === 'broken').length, total),
  noHttpsPct: pct(ok.filter((r) => !r.https).length, ok.length),
  noViewportPct: pct(ok.filter((r) => !r.viewport).length, ok.length),
  bookingPct: pct(ok.filter((r) => r.booking).length, ok.length),
  platforms: Object.fromEntries(Object.entries(ok.reduce((m, r) => ((m[r.platform] = (m[r.platform] || 0) + 1), m), {})).map(([k, v]) => [k, pct(v, ok.length)])),
  lighthouse: {
    n: scored.length,
    failedRuns: lh.length - scored.length,
    medianScore: median(scored.map((r) => r.score * 100)),
    goodScorePct: pct(scored.filter((r) => r.score >= 0.9).length, scored.length),
    poorScorePct: pct(scored.filter((r) => r.score < 0.5).length, scored.length),
    medianLcpS: Math.round(median(scored.map((r) => r.lcp)) / 100) / 10,
    lcpGoodPct: pct(scored.filter((r) => r.lcp <= 2500).length, scored.length),
    lcpPoorPct: pct(scored.filter((r) => r.lcp > 4000).length, scored.length),
    lcpOver10sPct: pct(scored.filter((r) => r.lcp > 10000).length, scored.length),
    clsGoodPct: pct(scored.filter((r) => r.cls <= 0.1).length, scored.length),
    tbtGoodPct: pct(scored.filter((r) => r.tbt <= 200).length, scored.length),
    medianMB: Math.round(median(scored.map((r) => r.bytes)) / 1e5) / 10,
    over5MBPct: pct(scored.filter((r) => r.bytes > 5e6).length, scored.length),
    byPlatform: Object.fromEntries(
      ['WordPress', 'Joomla', 'Other'].map((p) => {
        const rows = scored.filter((r) => r.platform === p)
        return [p, rows.length ? { n: rows.length, medianScore: median(rows.map((r) => r.score * 100)), medianLcpS: Math.round(median(rows.map((r) => r.lcp)) / 100) / 10 } : null]
      }),
    ),
    byType: Object.fromEntries(
      ['hotel', 'apartment', 'guest_house', 'camp_site'].map((t) => {
        const rows = scored.filter((r) => r.type === t)
        return [t, rows.length ? { n: rows.length, medianScore: median(rows.map((r) => r.score * 100)), medianLcpS: Math.round(median(rows.map((r) => r.lcp)) / 100) / 10 } : null]
      }),
    ),
  },
}
console.log(JSON.stringify(out, null, 2))
await fs.writeFile('results.json', JSON.stringify(out, null, 2))

// Anonymised dataset: row order is shuffled by sorting on a hash, ids are sequential.
const hash = (s) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7)
const rows = [...survey].sort((a, b) => hash(a.domain) - hash(b.domain))
const head = ['id', 'business_type', 'county', 'status', 'https', 'mobile_viewport', 'platform', 'booking_engine_detected', 'latest_copyright_year', 'lighthouse_sampled', 'performance_score', 'lcp_ms', 'fcp_ms', 'tbt_ms', 'cls', 'page_weight_bytes']
const csv = [head.join(',')]
rows.forEach((r, i) => {
  const l = lhBy.get(r.domain)
  const good = l && typeof l.score === 'number' && !l.runtimeError
  const v = [
    i + 1, r.type, `"${r.county}"`, status(r),
    r.ok ? r.https : '', r.ok ? r.viewport : '', r.ok ? r.platform : '', r.ok ? r.booking : '', r.copyrightYear ?? '',
    good ? 'yes' : 'no',
    good ? Math.round(l.score * 100) : '', good ? Math.round(l.lcp) : '', good ? Math.round(l.fcp) : '',
    good ? Math.round(l.tbt) : '', good ? l.cls.toFixed(3) : '', good ? Math.round(l.bytes) : '',
  ]
  csv.push(v.join(','))
})
await fs.writeFile('dataset.csv', csv.join('\n') + '\n', 'utf8')
console.log('csv rows', rows.length)
