/**
 * Redesign, revision 2 (October 2026): the home manifesto was too much text in
 * one block, so it becomes one sentence plus three short principles. Same
 * facts as before, fewer words. No em dashes, per CLAUDE.md section 0.
 *
 *   node scripts/apply-redesign-copy-r2.mjs
 */
import fs from 'node:fs'

const COPY = {
  'home.manifesto': {
    hr: 'Većina mojih klijenata su apartmani, kampovi i agencije za nekretnine na Pelješcu.',
    en: 'Most of my clients are apartments, campsites and real estate agencies on Pelješac.',
    de: 'Die meisten meiner Kunden sind Ferienwohnungen, Campingplätze und Immobilienagenturen auf Pelješac.',
    pl: 'Większość moich klientów to apartamenty, kempingi i agencje nieruchomości na Pelješcu.',
  },
  'home.p1Title': { hr: 'Brzina', en: 'Speed', de: 'Tempo', pl: 'Szybkość' },
  'home.p1Text': {
    hr: 'Gosti traže s mobitela, često u pokretu. Stranica se mora otvoriti odmah.',
    en: 'Guests search on a phone, often on the move. The page has to open at once.',
    de: 'Gäste suchen auf dem Handy, oft unterwegs. Die Seite muss sofort laden.',
    pl: 'Goście szukają na telefonie, często w drodze. Strona musi otworzyć się od razu.',
  },
  'home.p2Title': { hr: 'Jasnoća', en: 'Clarity', de: 'Klarheit', pl: 'Przejrzystość' },
  'home.p2Text': {
    hr: 'Ponuda, cijena i način rezervacije moraju biti jasni na prvi pogled.',
    en: 'The offer, the price and how to book have to read at a glance.',
    de: 'Angebot, Preis und Buchungsweg müssen auf einen Blick klar sein.',
    pl: 'Oferta, cena i sposób rezerwacji muszą być jasne na pierwszy rzut oka.',
  },
  'home.p3Title': { hr: 'Vidljivost', en: 'Visibility', de: 'Sichtbarkeit', pl: 'Widoczność' },
  'home.p3Text': {
    hr: 'Google mora razumjeti stranicu, a put do upita mora biti kratak.',
    en: 'Google has to understand the page, and the path to an enquiry has to be short.',
    de: 'Google muss die Seite verstehen, und der Weg zur Anfrage muss kurz sein.',
    pl: 'Google musi rozumieć stronę, a droga do zapytania musi być krótka.',
  },
}

function set(obj, path, value) {
  const parts = path.split('.')
  let o = obj
  for (const p of parts.slice(0, -1)) o = o[p] ??= {}
  o[parts.at(-1)] = value
}

for (const lng of ['hr', 'en', 'de', 'pl']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const [key, byLng] of Object.entries(COPY)) set(data, key, byLng[lng])
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
