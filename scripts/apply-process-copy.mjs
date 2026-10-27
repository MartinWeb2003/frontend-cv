/**
 * October 2026: the Pelješac section is replaced by a four-step process, and
 * the home pricing CTA leads with what a website earns (the sourced figures
 * from the cost guide) instead of what it costs.
 *
 * The step texts restate what the service pages already promise (services
 * s1Step1-4), so nothing new is claimed. No em dashes.
 *
 *   node scripts/apply-process-copy.mjs
 */
import fs from 'node:fs'

const COPY = {
  processTitle: {
    hr: 'Od prvog razgovora do objave.',
    en: 'From the first call to launch.',
    de: 'Vom ersten Gespräch bis zum Launch.',
    pl: 'Od pierwszej rozmowy do publikacji.',
  },
  processLead: {
    hr: 'Jasan postupak u četiri koraka. Uvijek znate što slijedi i koliko će koštati.',
    en: 'A clear process in four steps. You always know what comes next and what it will cost.',
    de: 'Ein klarer Ablauf in vier Schritten. Sie wissen immer, was als Nächstes kommt und was es kostet.',
    pl: 'Jasny proces w czterech krokach. Zawsze wiesz, co dalej i ile to będzie kosztować.',
  },
  step1Title: { hr: 'Razgovor', en: 'Conversation', de: 'Gespräch', pl: 'Rozmowa' },
  step1Text: {
    hr: 'Kratak razgovor o vašem poslu, cilju stranice i sadržaju koji već imate. Nakon njega dobivate procjenu opsega, roka i cijene.',
    en: 'A short conversation about your business, the goal of the site and the content you already have. Afterwards you get an estimate of scope, timeline and price.',
    de: 'Ein kurzes Gespräch über Ihr Geschäft, das Ziel der Website und vorhandene Inhalte. Danach erhalten Sie eine Einschätzung zu Umfang, Zeitplan und Preis.',
    pl: 'Krótka rozmowa o Twojej firmie, celu strony i treściach, które już masz. Potem dostajesz wycenę zakresu, terminu i ceny.',
  },
  step2Title: { hr: 'Struktura i dizajn', en: 'Structure and design', de: 'Struktur und Design', pl: 'Struktura i projekt' },
  step2Text: {
    hr: 'Prvo raspored sadržaja, zatim vizualni dizajn. U ovoj se fazi izmjene rade najlakše i najjeftinije.',
    en: 'First the content layout, then the visual design. This is where changes are easiest and cheapest.',
    de: 'Zuerst die Anordnung der Inhalte, dann das visuelle Design. In dieser Phase sind Änderungen am einfachsten und günstigsten.',
    pl: 'Najpierw układ treści, potem projekt wizualny. Na tym etapie zmiany są najłatwiejsze i najtańsze.',
  },
  step3Title: { hr: 'Izrada', en: 'Build', de: 'Umsetzung', pl: 'Realizacja' },
  step3Text: {
    hr: 'Razvoj u dogovorenoj tehnologiji, uz redovite prikaze napretka kako na kraju ne bi bilo iznenađenja.',
    en: 'Development in the agreed technology, with regular progress previews so there are no surprises at the end.',
    de: 'Entwicklung in der vereinbarten Technologie, mit regelmäßigen Zwischenständen, damit es am Ende keine Überraschungen gibt.',
    pl: 'Realizacja w uzgodnionej technologii, z regularnymi podglądami postępów, żeby na końcu nie było niespodzianek.',
  },
  step4Title: { hr: 'Objava', en: 'Launch', de: 'Launch', pl: 'Publikacja' },
  step4Text: {
    hr: 'Testiranje na stvarnim uređajima, provjera brzine i SEO osnova, postavljanje na domenu i predaja s uputama.',
    en: 'Testing on real devices, a speed and SEO basics check, going live on your domain and a handover with instructions.',
    de: 'Tests auf echten Geräten, Prüfung von Ladezeit und SEO-Grundlagen, Livegang auf Ihrer Domain und Übergabe mit Anleitung.',
    pl: 'Testy na prawdziwych urządzeniach, sprawdzenie szybkości i podstaw SEO, uruchomienie na domenie i przekazanie z instrukcją.',
  },

  priceCtaTitle: {
    hr: 'Koliko vam stranica može donijeti?',
    en: 'What can a website earn you?',
    de: 'Was kann Ihnen eine Website einbringen?',
    pl: 'Ile może Ci przynieść strona?',
  },
  priceCtaText: {
    hr: 'U cjeniku izračunajte koliko novca vlastita stranica zadržava u vašem poslu, uz istraživanja o tome kako brzina i vidljivost utječu na prodaju.',
    en: 'In the pricing guide, work out how much money your own site keeps in your business, alongside research on how speed and visibility affect sales.',
    de: 'Berechnen Sie in der Preisübersicht, wie viel Geld eine eigene Website in Ihrem Geschäft hält, ergänzt um Studien dazu, wie Tempo und Sichtbarkeit den Umsatz beeinflussen.',
    pl: 'W cenniku policz, ile pieniędzy własna strona zatrzymuje w Twojej firmie, wraz z badaniami o tym, jak szybkość i widoczność wpływają na sprzedaż.',
  },
  priceCtaBtn: {
    hr: 'Izračunajte svoju uštedu',
    en: 'Work out your savings',
    de: 'Ersparnis berechnen',
    pl: 'Oblicz swoją oszczędność',
  },
  priceCtaFrom: {
    hr: 'Vlastita stranica godišnje može zadržati',
    en: 'Your own website can keep, each year,',
    de: 'Eine eigene Website kann jährlich halten',
    pl: 'Własna strona może rocznie zatrzymać',
  },
  priceCtaNote: {
    hr: 'Izvori i izračun nalaze se u cjeniku.',
    en: 'Sources and the calculation are in the pricing guide.',
    de: 'Quellen und Berechnung finden Sie in der Preisübersicht.',
    pl: 'Źródła i obliczenia znajdziesz w cenniku.',
  },
}

const REMOVE = [
  'whereTitle', 'whereLead', 'panoramaAlt',
  'kind1Title', 'kind1Text', 'kind1Alt', 'kind2Title', 'kind2Text', 'kind2Alt', 'kind3Title', 'kind3Text', 'kind3Alt',
]

for (const lng of ['hr', 'en', 'de', 'pl']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const [k, v] of Object.entries(COPY)) data.home[k] = v[lng]
  for (const k of REMOVE) delete data.home[k]
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
