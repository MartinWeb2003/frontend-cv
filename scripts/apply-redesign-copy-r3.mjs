/**
 * Redesign, revision 3 (October 2026): the "Pristup" manifesto is replaced by
 * a Pelješac section built on licensed photographs, and the interactive 3D
 * logo gets its affordance hint. Claims stay within known facts: most clients
 * are on Pelješac; the projects named are real. No em dashes.
 *
 *   node scripts/apply-redesign-copy-r3.mjs
 */
import fs from 'node:fs'

const COPY = {
  'hero.dragHint': {
    hr: 'Povucite i zavrtite',
    en: 'Drag to spin',
    de: 'Zum Drehen ziehen',
    pl: 'Przeciągnij, aby obrócić',
  },
  'home.whereTitle': {
    hr: 'Većina mojih klijenata je na Pelješcu.',
    en: 'Most of my clients are on Pelješac.',
    de: 'Die meisten meiner Kunden sind auf Pelješac.',
    pl: 'Większość moich klientów jest na Pelješcu.',
  },
  'home.whereLead': {
    hr: 'Apartmani, kampovi i agencije za nekretnine, od Orebića do Lovišta. Njihovi gosti traže s mobitela, pa stranica mora biti brza, jasna i vidljiva na Googleu.',
    en: 'Apartments, campsites and real estate agencies, from Orebić to Lovište. Their guests search on a phone, so the site has to be fast, clear and visible on Google.',
    de: 'Ferienwohnungen, Campingplätze und Immobilienagenturen, von Orebić bis Lovište. Ihre Gäste suchen auf dem Handy, also muss die Website schnell, klar und bei Google sichtbar sein.',
    pl: 'Apartamenty, kempingi i agencje nieruchomości, od Orebicia po Lovište. Ich goście szukają na telefonie, więc strona musi być szybka, przejrzysta i widoczna w Google.',
  },
  'home.kind1Title': {
    hr: 'Apartmani i smještaj',
    en: 'Apartments and stays',
    de: 'Ferienwohnungen',
    pl: 'Apartamenty i noclegi',
  },
  'home.kind1Text': {
    hr: 'Gost mora vidjeti smještaj i rezervirati bez lutanja po stranici.',
    en: 'Guests need to see the place and book without hunting around.',
    de: 'Gäste wollen die Unterkunft sehen und ohne Umwege buchen.',
    pl: 'Gość musi zobaczyć obiekt i zarezerwować bez szukania.',
  },
  'home.kind1Alt': {
    hr: 'Kuća za odmor s bugenvilijom u Kućištu na Pelješcu',
    en: 'Holiday house with bougainvillea in Kućište on Pelješac',
    de: 'Ferienhaus mit Bougainvillea in Kućište auf Pelješac',
    pl: 'Dom wakacyjny z bugenwillą w Kućište na Pelješcu',
  },
  'home.kind2Title': {
    hr: 'Kampovi i plaže',
    en: 'Campsites and beaches',
    de: 'Campingplätze und Strände',
    pl: 'Kempingi i plaże',
  },
  'home.kind2Text': {
    hr: 'Sezona je kratka, a odluka o dolasku donosi se na mobitelu.',
    en: 'The season is short, and the decision to come is made on a phone.',
    de: 'Die Saison ist kurz, und die Entscheidung fällt auf dem Handy.',
    pl: 'Sezon jest krótki, a decyzja o przyjeździe zapada na telefonie.',
  },
  'home.kind2Alt': {
    hr: 'Daske za windsurfing na plaži u Kućištu u sumrak',
    en: 'Windsurf boards on the beach at Kućište at dusk',
    de: 'Windsurfbretter am Strand von Kućište in der Abenddämmerung',
    pl: 'Deski windsurfingowe na plaży w Kućište o zmierzchu',
  },
  'home.kind3Title': { hr: 'Nekretnine', en: 'Real estate', de: 'Immobilien', pl: 'Nieruchomości' },
  'home.kind3Text': {
    hr: 'Ponuda se mijenja svaki tjedan, a vlasnik je mora moći sam urediti.',
    en: 'Listings change every week, and the owner has to be able to edit them alone.',
    de: 'Das Angebot ändert sich jede Woche, und der Inhaber muss es selbst pflegen können.',
    pl: 'Oferta zmienia się co tydzień, a właściciel musi móc sam ją edytować.',
  },
  'home.kind3Alt': {
    hr: 'Kamene kuće s crvenim krovovima uz obalu u Kućištu',
    en: 'Stone houses with red roofs along the shore at Kućište',
    de: 'Steinhäuser mit roten Dächern an der Küste von Kućište',
    pl: 'Kamienne domy z czerwonymi dachami na wybrzeżu w Kućište',
  },
  'contactPage.photoAlt': {
    hr: 'Zalazak sunca nad plažom u Kućištu na Pelješcu',
    en: 'Sunset over the beach at Kućište on Pelješac',
    de: 'Sonnenuntergang am Strand von Kućište auf Pelješac',
    pl: 'Zachód słońca nad plażą w Kućište na Pelješcu',
  },
  'home.photoBy': { hr: 'Foto', en: 'Photo', de: 'Foto', pl: 'Zdjęcie' },
  'home.photoNote': {
    hr: 'Fotografije s Wikimedia Commonsa; izrezi su obrađene verzije pod istom licencom.',
    en: 'Photographs from Wikimedia Commons; the cutouts are edited versions under the same licence.',
    de: 'Fotos von Wikimedia Commons; die Freisteller sind bearbeitete Fassungen unter derselben Lizenz.',
    pl: 'Zdjęcia z Wikimedia Commons; wycięte elementy to przetworzone wersje na tej samej licencji.',
  },
}

const REMOVE = [
  'home.manifesto', 'home.manifestoLabel',
  'home.p1Title', 'home.p1Text', 'home.p2Title', 'home.p2Text', 'home.p3Title', 'home.p3Text',
  'home.showcaseLabel',
]

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
  for (const key of REMOVE) {
    const [ns, k] = key.split('.')
    delete data[ns]?.[k]
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
