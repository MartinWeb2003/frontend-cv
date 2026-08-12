/**
 * Starting prices, shown on the cost guide page.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW THESE NUMBERS WERE DERIVED (August 2026)
 *
 * Croatian market rates were collected from five published price lists, then
 * averaged across the FREELANCER tier only. Agency pricing (frequently 2 to 5x
 * higher) was excluded, because that is not the peer group.
 *
 *   h1-design.hr      landing 150-800 | presentation 400-2000 | business 1500-3500
 *                     | webshop 1500-5000+ | maintenance 75-150/mo
 *   trebam.hr         up to 10 pages 940-1300 | 15 pages ~1600 avg
 *                     | 20 pages 1900-2800 | maintenance 34-63/h
 *   gravitygroup.hr   freelancer 1-5 pages 200-600 | 5-15 pages 500-1500
 *                     | webshop 800-2000 | maintenance 50-150/mo | 30-80/h
 *   dius.hr           5 pages 249-820 | simple 400-700 | mid 700-3000
 *                     | webshop 780-1690 | 25-150/h | SEO 150-1200/mo
 *   metadigital.hr    freelancer projects 150-2000 overall
 *
 * `marketAvg` below is the midpoint average across those freelancer figures.
 * `price` is 60% of it, per the owner's instruction, rounded to a clean number.
 *
 * ⚠ These are STARTING prices ("od X"), not quotes. Every figure is a business
 * commitment; review before deploying. Nothing here is published until built.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Flip to false to hide the numbers and show only the cost-drivers content. */
export const SHOW_PRICES = true

export const CURRENCY = 'EUR'
export const CURRENCY_SYMBOL = '€'

/**
 * @typedef {object} PriceItem
 * @property {string} id          translation key suffix
 * @property {number} price       starting price shown on the site
 * @property {number} marketAvg   researched freelancer-tier average
 * @property {'project'|'month'|'hour'} unit
 */

/** @type {PriceItem[]} */
export const PRICES = [
  { id: 'landing', price: 290, marketAvg: 490, unit: 'project' },
  { id: 'presentation', price: 650, marketAvg: 1100, unit: 'project' },
  { id: 'business', price: 1290, marketAvg: 2150, unit: 'project' },
  { id: 'shop', price: 950, marketAvg: 1600, unit: 'project' },
  { id: 'audit', price: 300, marketAvg: 500, unit: 'project' },
  { id: 'maintenance', price: 60, marketAvg: 100, unit: 'month' },
  { id: 'hourly', price: 30, marketAvg: 50, unit: 'hour' },
]

/** Cost drivers explained on the page; each maps to a translation key. */
export const COST_FACTORS = ['pages', 'cms', 'content', 'languages', 'shop', 'integrations']

export const priceById = (id) => PRICES.find((p) => p.id === id)
