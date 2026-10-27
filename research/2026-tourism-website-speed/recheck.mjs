// Retry every failed site at its root domain, https then http, so a deep
// link, a temporary DNS error or a missing www does not count as dead.
import fs from 'node:fs/promises'
const rows = JSON.parse(await fs.readFile('survey.json', 'utf8'))
const UA = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36 bogojemartin-study'
const failed = rows.filter((r) => !r.ok)
async function tryUrl(u) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 25000)
  try { const r = await fetch(u, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': UA } }); return { ok: r.ok, status: r.status, url: r.url, html: (await r.text()).slice(0, 2e6) } }
  catch (e) { return { ok: false, error: e.name === 'AbortError' ? 'timeout' : (e.cause?.code || e.message).slice(0, 60) } }
  finally { clearTimeout(t) }
}
let revived = 0
const q = [...failed]
await Promise.all(Array.from({ length: 10 }, async () => {
  while (q.length) {
    const r = q.shift()
    for (const u of [`https://${r.domain}/`, `https://www.${r.domain}/`, `http://${r.domain}/`]) {
      const res = await tryUrl(u)
      if (res.ok) { r.ok = true; r.recovered = u; r.finalUrl = res.url; r.https = res.url.startsWith('https://'); r.viewport = /<meta[^>]+name=["']?viewport/i.test(res.html); r.status = res.status; delete r.error; revived++; r.html = res.html; break }
      r.retryError = res.error || res.status
    }
  }
}))
await fs.writeFile('survey.json', JSON.stringify(rows, null, 1))
console.log('failed', failed.length, 'revived', revived)
