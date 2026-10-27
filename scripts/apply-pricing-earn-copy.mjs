/**
 * Cost guide, October 2026: a "what a website earns" section with published,
 * sourced figures and a commission calculator, plus a rewritten closing CTA.
 *
 * Sources (each linked on the page beside its figure):
 *   15–25 % OTA commission    Which?, reported by TTG Media
 *   +10.1 % / +8.4 %          Deloitte for Google, "Milliseconds make millions" (web.dev)
 *   53 % abandon over 3 s     Think with Google, 2017 (Google/SOASTA)
 *   98 % look locally online  BrightLocal, Local Consumer Review Survey 2023
 * Nothing here is a client result or a promise of revenue. The en dash in a
 * numeric range is allowed by CLAUDE.md; no em dashes.
 *
 * Cost guide pages exist in hr and en only (SERVICE_LOCALES).
 *
 *   node scripts/apply-pricing-earn-copy.mjs
 */
import fs from 'node:fs'

const COPY = {
  // Headline figure: 28,254 € (Airbtics 2025) x 15 % = 4,238 € a year.
  earnHeroKicker: { hr: 'Prosječni smještaj u Hrvatskoj godišnje plati', en: 'An average Croatian holiday rental pays' },
  earnHeroLabel: {
    hr: 'provizije Bookingu i sličnim platformama.',
    en: 'a year in commission to Booking.com and similar platforms.',
  },
  earnHeroText: {
    hr: 'Prosječni objekt za kratkoročni najam u Hrvatskoj ostvari {{revenue}} € prihoda godišnje. Uz najnižu tipičnu proviziju od {{percent}} %, {{amount}} € od toga ode platformama. To je novac koji vam vlastita stranica s izravnim rezervacijama vraća, rezervaciju po rezervaciju.',
    en: 'An average short-term rental in Croatia brings in {{revenue}} € a year. At the lowest typical commission of {{percent}}%, {{amount}} € of that goes to the platforms. That is the money your own site wins back through direct bookings, one booking at a time.',
  },
  earnHeroSource1: { hr: 'Airbtics, pregled tržišta 2025.', en: 'Airbtics, 2025 market review' },

  earnTitle: { hr: 'Što vam stranica donosi', en: 'What a website earns you' },
  earnLead: {
    hr: 'Stranica nije samo trošak. Izravno vam zadržava novac koji bi otišao platformama, a neizravno donosi upite koje bi spora ili nevidljiva stranica izgubila. Ovo pokazuju istraživanja:',
    en: 'A website is not just a cost. Directly, it keeps money that would go to booking platforms; indirectly, it brings enquiries a slow or invisible site would lose. Here is what the research shows:',
  },

  earn1Value: { hr: '15–25 %', en: '15–25%' },
  earn1Title: { hr: 'provizije koju zadržite', en: 'commission you keep' },
  earn1Text: {
    hr: 'Toliko Booking.com i slične platforme tipično uzimaju od svake rezervacije. Gost koji rezervira preko vaše stranice taj iznos ostavlja vama.',
    en: 'That is what Booking.com and similar platforms typically take from every booking. A guest who books through your own site leaves that amount with you.',
  },
  earn1Source: { hr: 'Which?, preko TTG Media', en: 'Which?, via TTG Media' },

  earn2Value: { hr: '+10,1 %', en: '+10.1%' },
  earn2Title: { hr: 'više rezervacija na turističkim stranicama', en: 'more conversions on travel sites' },
  earn2Text: {
    hr: 'Kad se mobilna stranica ubrza za samo 0,1 sekundu. U trgovinama je rast konverzija 8,4 %.',
    en: 'When a mobile site gets just 0.1 seconds faster. For retail sites the conversion lift was 8.4%.',
  },
  earn2Source: { hr: 'Deloitte za Google, 2020.', en: 'Deloitte for Google, 2020' },

  earn3Value: { hr: '53 %', en: '53%' },
  earn3Title: { hr: 'posjeta odustane', en: 'of visits are abandoned' },
  earn3Text: {
    hr: 'ako se mobilna stranica učitava dulje od tri sekunde. Spora stranica košta upite koje nikad ne vidite.',
    en: 'when a mobile site takes longer than three seconds to load. A slow site costs enquiries you never see.',
  },
  earn3Source: { hr: 'Think with Google, 2017.', en: 'Think with Google, 2017' },

  earn4Value: { hr: '98 %', en: '98%' },
  earn4Title: { hr: 'ljudi traži lokalne tvrtke na internetu', en: 'of people look up local businesses online' },
  earn4Text: {
    hr: 'Prije poziva, rezervacije ili dolaska, gotovo svi vas prvo potraže. Stranica je ono što tada pronađu.',
    en: 'Before they call, book or visit, almost everyone looks you up first. Your website is what they find.',
  },
  earn4Source: { hr: 'BrightLocal, 2023.', en: 'BrightLocal, 2023' },

  calcTitle: { hr: 'Izračunajte koliko provizije zadržite', en: 'Work out the commission you keep' },
  calcRevenue: { hr: 'Godišnji prihod od rezervacija preko platformi', en: 'Yearly revenue from platform bookings' },
  calcShare: { hr: 'Udio rezervacija prebačen na vašu stranicu:', en: 'Share of bookings moved to your own site:' },
  calcCommission: { hr: 'Provizija platforme', en: 'Platform commission' },
  calcResult: { hr: 'Godišnje zadržite', en: 'You keep each year' },
  calcPayback: { hr: 'Prezentacijska stranica od {{price}} € isplati se za', en: 'A presentation site from {{price}} € pays for itself in' },
  calcMonths: { hr: '{{months}} mj.', en: '{{months}} months' },
  calcUnderMonth: { hr: 'manje od mjesec dana', en: 'under a month' },
  calcNote: {
    hr: 'Primjer za ilustraciju, izračunat iz brojki koje sami unesete. Stvarna ušteda ovisi o vašem ugovoru s platformom i o tome koliko gostiju rezervira izravno.',
    en: 'An illustration, calculated from the figures you enter. Real savings depend on your platform contract and on how many guests book direct.',
  },

  ctaTitle: { hr: 'Krenimo prije sljedeće sezone.', en: "Let's get it live before next season." },
  ctaText: {
    hr: 'Napišite nekoliko rečenica o svom poslu i o tome što stranica treba postići. Dobit ćete procjenu opsega, roka i cijene.',
    en: 'Write a few lines about your business and what the site needs to achieve. You will get an estimate of scope, timeline and price.',
  },
  ctaPoint1: { hr: 'Odgovor bez obveze', en: 'A reply with no obligation' },
  ctaPoint2: { hr: 'Konkretna ponuda nakon kratkog razgovora', en: 'A concrete quote after a short call' },
  ctaPoint3: { hr: 'Bez skrivenih troškova', en: 'No hidden costs' },
  ctaMailLabel: { hr: 'Pišite izravno na', en: 'Write directly to' },
  ctaBtn: { hr: 'Zatražite ponudu', en: 'Request a quote' },
}

for (const lng of ['hr', 'en']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const [key, byLng] of Object.entries(COPY)) data.pricingPage[key] = byLng[lng]
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
