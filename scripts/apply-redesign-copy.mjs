/**
 * Copy for the cinematic redesign (October 2026): new home page sections,
 * navigation and footer, in all four locales. Also removes keys that only the
 * deleted components (bento grid, 3D colour presets, mega-titles, skill
 * percentages) used.
 *
 * Every claim here traces to a fact already on the site: FER, Ericsson Nikola
 * Tesla, seven projects in production, five of them on Pelješac. No metrics
 * were added. Croatian and English were drafted natively; German and Polish
 * follow the same structure. No em dashes, per CLAUDE.md section 0.
 *
 *   node scripts/apply-redesign-copy.mjs
 */
import fs from 'node:fs'

const COPY = {
  'nav.skip': {
    hr: 'Preskoči na sadržaj',
    en: 'Skip to content',
    de: 'Zum Inhalt springen',
    pl: 'Przejdź do treści',
  },
  'nav.primary': {
    hr: 'Glavna navigacija',
    en: 'Main navigation',
    de: 'Hauptnavigation',
    pl: 'Główna nawigacja',
  },

  'hero.statement': {
    hr: 'Izrađujem brze web stranice za turizam, nekretnine i lokalne tvrtke, od prvog razgovora do prvog upita.',
    en: 'I build fast websites for tourism, real estate and local businesses, from the first call to the first enquiry.',
    de: 'Ich entwickle schnelle Websites für Tourismus, Immobilien und lokale Unternehmen, vom ersten Gespräch bis zur ersten Anfrage.',
    pl: 'Tworzę szybkie strony internetowe dla turystyki, nieruchomości i lokalnych firm, od pierwszej rozmowy do pierwszego zapytania.',
  },
  'hero.availability': {
    hr: 'Otvoren za nove projekte',
    en: 'Open for new projects',
    de: 'Offen für neue Projekte',
    pl: 'Otwarty na nowe projekty',
  },
  'hero.ctaContact': {
    hr: 'Pošaljite upit',
    en: 'Send an enquiry',
    de: 'Anfrage senden',
    pl: 'Wyślij zapytanie',
  },
  'hero.ctaProjects': {
    hr: 'Pogledajte radove',
    en: 'See the work',
    de: 'Arbeiten ansehen',
    pl: 'Zobacz realizacje',
  },
  'hero.fact1Key': { hr: 'FER, Zagreb', en: 'FER, Zagreb', de: 'FER, Zagreb', pl: 'FER, Zagrzeb' },
  'hero.fact1Val': {
    hr: 'Magistarski studij računarstva',
    en: "Master's in computing",
    de: 'Masterstudium Informatik',
    pl: 'Studia magisterskie z informatyki',
  },
  'hero.fact2Key': {
    hr: 'Ericsson Nikola Tesla',
    en: 'Ericsson Nikola Tesla',
    de: 'Ericsson Nikola Tesla',
    pl: 'Ericsson Nikola Tesla',
  },
  'hero.fact2Val': {
    hr: 'Bivši softverski developer',
    en: 'Former software developer',
    de: 'Ehemaliger Softwareentwickler',
    pl: 'Były programista',
  },
  'hero.fact3Key': {
    hr: '{{count}} projekata',
    en: '{{count}} projects',
    de: '{{count}} Projekte',
    pl: '{{count}} projektów',
  },
  'hero.fact3Val': {
    hr: 'U produkciji, većinom na Pelješcu',
    en: 'Live in production, mostly on Pelješac',
    de: 'Live im Einsatz, überwiegend auf Pelješac',
    pl: 'Działających w produkcji, głównie na Pelješcu',
  },

  'home.manifestoLabel': { hr: 'Pristup', en: 'Approach', de: 'Ansatz', pl: 'Podejście' },
  'home.manifesto': {
    hr: 'Većina mojih klijenata su apartmani, kampovi i agencije za nekretnine na Pelješcu. Njihovi gosti traže s mobitela, često u pokretu. Zato svaka stranica koju izradim mora biti brza, jasna i razumljiva Googleu, a put do upita što kraći.',
    en: 'Most of my clients are apartments, campsites and real estate agencies on Pelješac. Their guests search on a phone, often on the move. So every site I build has to be fast, clear and easy for Google to understand, with the shortest possible path to an enquiry.',
    de: 'Die meisten meiner Kunden sind Ferienwohnungen, Campingplätze und Immobilienagenturen auf Pelješac. Ihre Gäste suchen auf dem Handy, oft unterwegs. Deshalb muss jede Website, die ich baue, schnell, klar und für Google verständlich sein, mit dem kürzesten Weg zur Anfrage.',
    pl: 'Większość moich klientów to apartamenty, kempingi i agencje nieruchomości na Pelješcu. Ich goście szukają na telefonie, często w drodze. Dlatego każda strona, którą tworzę, musi być szybka, przejrzysta i zrozumiała dla Google, z jak najkrótszą drogą do zapytania.',
  },

  'home.showcaseLabel': {
    hr: 'Odabrani radovi',
    en: 'Selected work',
    de: 'Ausgewählte Arbeiten',
    pl: 'Wybrane realizacje',
  },
  'home.showcaseTitle': {
    hr: 'Stranice koje danas rade za svoje vlasnike.',
    en: 'Sites working for their owners today.',
    de: 'Websites, die heute für ihre Inhaber arbeiten.',
    pl: 'Strony, które dziś pracują dla swoich właścicieli.',
  },
  'home.caseStudy': { hr: 'Studija projekta', en: 'Case study', de: 'Fallstudie', pl: 'Studium przypadku' },

  'about.heading': {
    hr: 'Usluge koje isporučujem od početka do kraja.',
    en: 'Services I deliver end to end.',
    de: 'Leistungen, die ich von Anfang bis Ende liefere.',
    pl: 'Usługi, które realizuję od początku do końca.',
  },
  'home.pricingNote': {
    hr: 'Okvirne cijene i što utječe na njih:',
    en: 'Typical prices and what drives them:',
    de: 'Richtpreise und was sie beeinflusst:',
    pl: 'Orientacyjne ceny i co na nie wpływa:',
  },

  'home.indexTitle': {
    hr: 'Svih {{count}} projekata, od koncepta do produkcije.',
    en: 'All {{count}} projects, concept to production.',
    de: 'Alle {{count}} Projekte, vom Konzept bis zum Livegang.',
    pl: 'Wszystkie {{count}} projektów, od koncepcji do wdrożenia.',
  },

  'home.recordTitle': {
    hr: 'Gdje sam učio i radio.',
    en: 'Where I trained and worked.',
    de: 'Wo ich gelernt und gearbeitet habe.',
    pl: 'Gdzie się uczyłem i pracowałem.',
  },
  'home.recordIntro': {
    hr: 'Inženjerska podloga s FER-a i iskustvo iz enterprise razvoja u Ericsson Nikola Tesla, primijenjeni na stranice za male i srednje tvrtke.',
    en: 'An engineering grounding from FER and enterprise development experience at Ericsson Nikola Tesla, applied to sites for small and mid-sized businesses.',
    de: 'Ein Ingenieurstudium an der FER und Erfahrung in der Enterprise-Entwicklung bei Ericsson Nikola Tesla, angewandt auf Websites für kleine und mittlere Unternehmen.',
    pl: 'Inżynierskie podstawy z FER i doświadczenie w tworzeniu oprogramowania enterprise w Ericsson Nikola Tesla, zastosowane w stronach dla małych i średnich firm.',
  },
  'home.kindWork': { hr: 'Posao', en: 'Work', de: 'Beruf', pl: 'Praca' },
  'home.kindEdu': { hr: 'Obrazovanje', en: 'Education', de: 'Studium', pl: 'Edukacja' },
  'home.rec1': {
    hr: 'Studentska pozicija u timu koji razvija enterprise softver. Rad u C#-u kroz Git workflow i Scrum, s code reviewom na svakoj promjeni i testiranjem prije isporuke.',
    en: 'Student role on a team building enterprise software. C# work through a Git workflow and Scrum, with code review on every change and testing before delivery.',
    de: 'Werkstudentenstelle in einem Team, das Enterprise-Software entwickelt. Arbeit in C# mit Git-Workflow und Scrum, mit Code-Review bei jeder Änderung und Tests vor der Auslieferung.',
    pl: 'Stanowisko studenckie w zespole tworzącym oprogramowanie enterprise. Praca w C# w oparciu o Git i Scrum, z code review każdej zmiany i testami przed wdrożeniem.',
  },
  'home.rec2': {
    hr: 'Web stranice i aplikacije za klijente iz turizma, nekretnina i grafičkog dizajna, od prvog razgovora do održavanja nakon objave. React, WordPress, Node.js i PostgreSQL.',
    en: 'Websites and applications for clients in tourism, real estate and graphic design, from the first conversation to maintenance after launch. React, WordPress, Node.js and PostgreSQL.',
    de: 'Websites und Anwendungen für Kunden aus Tourismus, Immobilien und Grafikdesign, vom ersten Gespräch bis zur Wartung nach dem Launch. React, WordPress, Node.js und PostgreSQL.',
    pl: 'Strony i aplikacje dla klientów z branży turystycznej, nieruchomości i projektowania graficznego, od pierwszej rozmowy po utrzymanie po starcie. React, WordPress, Node.js i PostgreSQL.',
  },

  'home.contactTitle': {
    hr: 'Imate projekt? Javite se.',
    en: 'Have a project? Get in touch.',
    de: 'Sie haben ein Projekt? Schreiben Sie mir.',
    pl: 'Masz projekt? Napisz do mnie.',
  },
  'home.contactPage': {
    hr: 'Svi načini kontakta',
    en: 'All contact options',
    de: 'Alle Kontaktwege',
    pl: 'Wszystkie formy kontaktu',
  },

  'home.footerHome': { hr: 'Početna', en: 'Home', de: 'Startseite', pl: 'Strona główna' },
  'home.footerPitch': {
    hr: 'Web stranice za turizam, nekretnine i lokalne tvrtke u Hrvatskoj.',
    en: 'Websites for tourism, real estate and local businesses in Croatia.',
    de: 'Websites für Tourismus, Immobilien und lokale Unternehmen in Kroatien.',
    pl: 'Strony internetowe dla turystyki, nieruchomości i lokalnych firm w Chorwacji.',
  },
  'home.footerPages': { hr: 'Stranice', en: 'Pages', de: 'Seiten', pl: 'Strony' },
  'home.footerProfiles': { hr: 'Profili', en: 'Profiles', de: 'Profile', pl: 'Profile' },
  'footer.built': {
    hr: 'Dizajn i kod: Martin Bogoje',
    en: 'Designed and built by Martin Bogoje',
    de: 'Design und Code: Martin Bogoje',
    pl: 'Projekt i kod: Martin Bogoje',
  },
}

/** Keys only the deleted components read. */
const REMOVE = [
  'titles',
  'hero.bio1', 'hero.bio2', 'hero.bio3', 'hero.badge', 'hero.badgeAria',
  'about.para2', 'about.hint3d', 'about.presetsLabel',
  'about.presetCrimson', 'about.presetAzure', 'about.presetAmber',
  ...[1, 2, 3, 4, 5].flatMap((n) => [`about.bento${n}Title`, `about.bento${n}Desc`]),
  'experience.intro',
  ...[1, 2].flatMap((j) => [1, 2, 3, 4].map((b) => `experience.job${j}B${b}`)),
  'education.activeBadge', 'education.doneBadge',
  'education.labelDuration', 'education.labelStatus', 'education.labelUniversity',
  'education.labelAcademicYear', 'education.labelTitleEarned',
  'education.deg1Status', 'education.deg1Uni', 'education.deg2Status', 'education.deg2TitleEarned',
  ...[1, 2].flatMap((d) => [1, 2, 3, 4].map((n) => `education.deg${d}Tag${n}`)),
]

function set(obj, path, value) {
  const parts = path.split('.')
  let o = obj
  for (const p of parts.slice(0, -1)) o = o[p] ??= {}
  o[parts.at(-1)] = value
}

function unset(obj, path) {
  const parts = path.split('.')
  let o = obj
  for (const p of parts.slice(0, -1)) {
    o = o?.[p]
    if (!o) return
  }
  delete o[parts.at(-1)]
}

for (const lng of ['hr', 'en', 'de', 'pl']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const [key, byLng] of Object.entries(COPY)) set(data, key, byLng[lng])
  for (const key of REMOVE) unset(data, key)
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
