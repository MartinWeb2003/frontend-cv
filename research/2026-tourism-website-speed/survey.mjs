// Pass 1: fetch every homepage once and record cheap facts.
// Output: survey.json, one row per site. No site is named in the published study.
import fs from 'node:fs/promises'

const sites = JSON.parse(await fs.readFile('sites.json', 'utf8'))
const UA = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36 bogojemartin-study'

const PLATFORMS = [
  ['WordPress', /wp-content|wp-includes|wordpress/i],
  ['Wix', /wixstatic\.com|wix\.com|_wix/i],
  ['Joomla', /joomla|\/media\/jui\/|\/components\/com_/i],
  ['Squarespace', /squarespace/i],
  ['Webflow', /webflow/i],
  ['Drupal', /drupal/i],
  ['Shopify', /cdn\.shopify|shopify/i],
  ['Jimdo', /jimdo/i],
  ['Weebly', /weebly/i],
]
const BOOKING = /phobs|smoobu|beds24|lodgify|rentlio|mews\.com|simplebooking|cloudbeds|synxis|siteminder|booking-engine|bookingengine|ibe\.|hotelrunner|guestcentric|vikbooking|motopress|hotel-booking|reservations\.|bookonline|book-now|webbook|d-edge|availpro|amenitiz|octorate|hotelspider|bookassist|roomraccoon|krossbooking|camping\.care|campingcare|eurocamp|pitchup|kampo|booking\.calendar|wp-booking|bookingpress|hbook/i

async function check(site) {
  const out = { domain: site.domain, type: site.type, county: site.county }
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 20000)
  try {
    const res = await fetch(site.url, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': UA } })
    const html = (await res.text()).slice(0, 2_000_000)
    out.ok = res.ok
    out.status = res.status
    out.finalUrl = res.url
    out.https = res.url.startsWith('https://')
    out.viewport = /<meta[^>]+name=["']?viewport/i.test(html)
    out.platform = (PLATFORMS.find(([, re]) => re.test(html)) ?? ['Other'])[0]
    out.booking = BOOKING.test(html)
    out.bytesHtml = html.length
    const year = [...html.matchAll(/(?:©|&copy;|copyright)\s*(?:[^0-9<]{0,20})?(20\d\d)(?:\s*[-–]\s*(20\d\d))?/gi)].map((m) => Number(m[2] || m[1]))
    out.copyrightYear = year.length ? Math.max(...year) : null
  } catch (e) {
    out.ok = false
    out.error = e.name === 'AbortError' ? 'timeout' : (e.cause?.code || e.message || 'error').slice(0, 60)
  } finally {
    clearTimeout(timer)
  }
  return out
}

const results = []
const queue = [...sites]
await Promise.all(
  Array.from({ length: 12 }, async () => {
    while (queue.length) {
      const s = queue.shift()
      results.push(await check(s))
      if (results.length % 100 === 0) console.log(results.length)
    }
  }),
)
await fs.writeFile('survey.json', JSON.stringify(results, null, 1))
console.log('done', results.length)
