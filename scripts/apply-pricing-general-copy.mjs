/**
 * October 2026, round 2 on the cost guide:
 *   - the headline figure is framed for any business that sells through a
 *     platform or middleman, not only holiday rentals. The number and its
 *     sources are unchanged (Airbtics 2025 average revenue x 15 % OTA
 *     commission); the text now says plainly where it comes from.
 *   - calculator labels speak of sales through platforms in general.
 *   - a pricing call to action on the home page (home.priceCta*).
 * No em dashes.
 *
 *   node scripts/apply-pricing-general-copy.mjs
 */
import fs from 'node:fs'

const PRICING = {
  earnHeroKicker: {
    hr: 'Ovoliko novca vlastita stranica može zadržati u vašem poslu svake godine:',
    en: 'This much money your own website can keep in your business every year:',
  },
  earnHeroLabel: {
    hr: 'umjesto da ode platformama i posrednicima.',
    en: 'instead of going to platforms and middlemen.',
  },
  earnHeroText: {
    hr: 'Platforme za rezervacije i prodaju uzimaju proviziju od svake prodaje, tipično 15 do 25 %. Na prihodu od {{revenue}} € godišnje, koliko u prosjeku ostvari objekt za kratkoročni najam u Hrvatskoj, već najniža provizija od {{percent}} % iznosi {{amount}} €. Svaki kupac ili gost koji dođe preko vaše stranice taj dio ostavlja vama.',
    en: 'Booking and sales platforms take a commission on every sale, typically 15 to 25%. On {{revenue}} € of yearly revenue, what an average short-term rental in Croatia brings in, even the lowest commission of {{percent}}% comes to {{amount}} €. Every customer or guest who comes through your own site leaves that share with you.',
  },
  calcTitle: { hr: 'Izračunajte koliko zadržite', en: 'Work out how much you keep' },
  calcRevenue: {
    hr: 'Godišnji prihod koji ide preko platformi ili posrednika',
    en: 'Yearly revenue that goes through platforms or middlemen',
  },
  calcShare: { hr: 'Udio prodaje prebačen na vašu stranicu:', en: 'Share of sales moved to your own site:' },
  calcCommission: { hr: 'Provizija platforme ili posrednika', en: 'Platform or middleman commission' },
  calcNote: {
    hr: 'Primjer za ilustraciju, izračunat iz brojki koje sami unesete. Stvarna ušteda ovisi o vašem ugovoru s platformom i o tome koliko kupaca dođe izravno.',
    en: 'An illustration, calculated from the figures you enter. Real savings depend on your platform contract and on how many customers come direct.',
  },
}

const HOME = {
  priceCtaTitle: {
    hr: 'Koliko košta vaša web stranica?',
    en: 'What does your website cost?',
    de: 'Was kostet Ihre Website?',
    pl: 'Ile kosztuje Twoja strona?',
  },
  priceCtaText: {
    hr: 'Otvoreni cjenik s početnim cijenama, objašnjenjem što ih pomiče i izračunom koliko vam stranica može vratiti.',
    en: 'An open price list with starting prices, what moves them, and a calculator for what a site can earn you back.',
    de: 'Eine offene Preisliste mit Startpreisen, den Faktoren dahinter und einem Rechner, was eine Website Ihnen einbringen kann.',
    pl: 'Otwarty cennik z cenami początkowymi, wyjaśnieniem, co na nie wpływa, i kalkulatorem tego, co strona może Ci zwrócić.',
  },
  priceCtaBtn: { hr: 'Pogledajte cjenik', en: 'See the pricing', de: 'Preise ansehen', pl: 'Zobacz cennik' },
  priceCtaFrom: { hr: 'Web stranice već od', en: 'Websites from', de: 'Websites ab', pl: 'Strony już od' },
  priceCtaNote: {
    hr: 'Početne cijene bez PDV-a. Konkretna ponuda nakon kratkog razgovora.',
    en: 'Starting prices, excluding VAT. A concrete quote after a short call.',
    de: 'Startpreise ohne MwSt. Ein konkretes Angebot nach einem kurzen Gespräch.',
    pl: 'Ceny początkowe bez VAT. Konkretna oferta po krótkiej rozmowie.',
  },
}

for (const lng of ['hr', 'en', 'de', 'pl']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (data.pricingPage) for (const [k, v] of Object.entries(PRICING)) data.pricingPage[k] = v[lng]
  for (const [k, v] of Object.entries(HOME)) data.home[k] = v[lng]
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
