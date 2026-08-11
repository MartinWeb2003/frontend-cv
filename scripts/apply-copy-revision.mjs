/**
 * Copy revision pass:
 *   1. removes the stats block from the About section,
 *   2. rewrites the on-site marketing copy in all four locales,
 *   3. eliminates every user-facing em-dash.
 *
 *   node scripts/apply-copy-revision.mjs
 */
import fs from 'node:fs'

let fail = 0
const files = {}
const wasCrlf = {}

/** Some files are CRLF, some LF. Normalise to LF so patterns match either way. */
function load(p) {
  if (files[p] === undefined) {
    const raw = fs.readFileSync(p, 'utf8')
    wasCrlf[p] = raw.includes('\r\n')
    files[p] = raw.replace(/\r\n/g, '\n')
  }
  return files[p]
}

function sub(p, from, to, label, expect = 1) {
  const s = load(p)
  const n = s.split(from).length - 1
  if (n !== expect) {
    console.error(`FAIL [${label}] ${p}: matched ${n}x, expected ${expect}`)
    fail++
    return
  }
  files[p] = s.split(from).join(to)
  console.log(`ok   [${label}]`)
}

/* ---------- 1. Remove the stats section ---------- */
const A = 'src/components/About.jsx'
sub(
  A,
  "  const STATS = [\n" +
    "    { value: 3,  suffix: '+', labelKey: 'about.statExperience' },\n" +
    "    { value: 10, suffix: '+', labelKey: 'about.statProjects' },\n" +
    "    { value: 16, suffix: '+', labelKey: 'about.statTech' },\n" +
    "    { value: 2,  suffix: '',  labelKey: 'about.statDegrees' },\n" +
    "  ]\n\n",
  '',
  'stats-data',
)
sub(
  A,
  '          <motion.div className="about__stats" custom={5} variants={fadeUp} initial="hidden" animate={inView ? \'show\' : \'hidden\'}>\n' +
    '            {STATS.map((s, i) => (\n' +
    '              <div key={s.labelKey} className="about__stat">\n' +
    '                <span className="about__stat-value">\n' +
    '                  <CountUp to={s.value} duration={1.8} delay={i * 0.15} suffix={s.suffix} />\n' +
    '                </span>\n' +
    '                <span className="about__stat-label">{t(s.labelKey)}</span>\n' +
    '              </div>\n' +
    '            ))}\n' +
    '          </motion.div>\n',
  '',
  'stats-markup',
)
sub(A, "import CountUp from '../bits/CountUp'\n", '', 'stats-countup-import')

/* ---------- 2. Em-dashes inside JSX ---------- */
sub(
  'src/components/Footer.jsx',
  "Martin Bogoje — {t('footer.built')}",
  "Martin Bogoje · {t('footer.built')}",
  'footer-dash',
)

const P = 'src/components/Projects.jsx'
sub(P, '${project.title} — ${', '${project.title}, ${', 'project-alt-dashes', 2)

const E = 'src/components/Experience.jsx'
sub(E, "'Magistar — Softversko inženjerstvo i informacijski sustavi'", "'Magistar: softversko inženjerstvo i informacijski sustavi'", 'edu1')
sub(E, "'Prvostupnik — Računarstvo'", "'Prvostupnik: računarstvo'", 'edu2')

sub('public/site.webmanifest', '"Martin Bogoje — Software Developer"', '"Martin Bogoje | Software Developer"', 'manifest')

const H = 'index.html'
sub(
  H,
  '<title>Martin Bogoje — Softverski developer | React & Full-Stack</title>',
  '<title>Martin Bogoje | Softverski developer i izrada web stranica u Zagrebu</title>',
  'html-title',
)
sub(
  H,
  'content="Portfolio Martina Bogoja — softverski developer iz Zagreba. Student računarstva na FER-u, bivši developer u Ericsson Nikola Tesla. React, full-stack web razvoj i moderni UI/UX."',
  'content="Softverski developer iz Zagreba. Izrada web stranica i aplikacija u Reactu i WordPressu, tehnički SEO i održavanje. Pogledajte projekte i javite se."',
  'html-desc',
)

if (fail) {
  console.error(`\n${fail} replacement(s) failed, nothing written.`)
  process.exit(1)
}
for (const [p, s] of Object.entries(files)) {
  fs.writeFileSync(p, wasCrlf[p] ? s.replace(/\n/g, '\r\n') : s, 'utf8')
}

/* ---------- 3. Rewrite locale copy ---------- */
const COPY = {
  hr: {
    'seo.title': 'Martin Bogoje | Softverski developer i izrada web stranica u Zagrebu',
    'seo.description':
      'Softverski developer iz Zagreba. Izrada web stranica i aplikacija u Reactu i WordPressu, tehnički SEO i održavanje. Pogledajte projekte i javite se.',
    'seo.ogImageAlt': 'Martin Bogoje, softverski developer iz Zagreba',
    'hero.bio1': 'Softverski developer iz Zagreba, magistarski studij računarstva na FER-u.',
    'hero.bio2': 'Iza mene je rad u Ericsson Nikola Tesla i niz web projekata za klijente.',
    'hero.bio3': 'Radim web stranice i aplikacije koje su brze, pregledne i vidljive na Googleu.',
    'about.heading': 'Web stranice i aplikacije na spoju dizajna i inženjerske preciznosti',
    'about.para1':
      'Pomažem tvrtkama i obrtima pretvoriti ideju u web proizvod koji stvarno radi: brz, pregledan i lako pronalažljiv na tražilicama.',
    'about.para2': 'Uz iskustvo iz vodeće regionalne tech tvrtke, kao freelance developer nudim:',
    'about.service1Desc': 'Od koncepta i dizajna do produkcije, u Reactu, Node.js-u ili WordPressu.',
    'about.service2Desc': 'Povezivanje postojećeg poslovanja s modernim servisima i vanjskim sustavima.',
    'projects.sectionIntro':
      'Pet projekata izvedenih od koncepta do produkcije, za klijente iz turizma, nekretnina i grafičkog dizajna. Svaki je rješavao konkretan problem, a ne samo mijenjao izgled stranice.',
    'experience.intro':
      'Softverski developer s iskustvom u Ericsson Nikola Tesla i u razvoju custom web rješenja za klijente. Spajam inženjersku preciznost velikog sustava s brzinom samostalnog rada.',
    'contact.tagline1': 'Otvoren sam za freelance projekte i stalne angažmane.',
    'contact.tagline2': 'Napišite mi nekoliko rečenica o projektu i dogovorit ćemo detalje.',
  },
  en: {
    'seo.title': 'Martin Bogoje | Software Developer and Web Development in Zagreb',
    'seo.description':
      'Software developer based in Zagreb, Croatia. React and WordPress websites and applications, technical SEO and maintenance. See the projects and get in touch.',
    'seo.ogImageAlt': 'Martin Bogoje, software developer based in Zagreb',
    'hero.bio1': 'Software developer based in Zagreb, studying computer science at FER.',
    'hero.bio2': 'Previously at Ericsson Nikola Tesla, alongside a run of client web projects.',
    'hero.bio3': 'I build websites and applications that are fast, clear and easy to find.',
    'about.heading': 'Websites and applications where design meets engineering precision',
    'about.para1':
      'I help companies turn an idea into a web product that actually performs: fast, clear, and easy to find in search.',
    'about.para2': 'With experience from a leading regional tech company, as a freelance developer I offer:',
    'about.service1Desc': 'From concept and design through to production, in React, Node.js or WordPress.',
    'about.service2Desc': 'Connecting an existing business to modern services and external systems.',
    'projects.sectionIntro':
      'Five projects taken from concept to production, for clients in tourism, real estate and graphic design. Each solved a concrete problem rather than just changing how a page looks.',
    'experience.intro':
      'Software developer with experience at Ericsson Nikola Tesla and in building custom web solutions for clients. I combine the precision of a large system with the speed of working independently.',
    'contact.tagline1': 'Open to freelance projects and permanent roles.',
    'contact.tagline2': 'Send a few lines about the project and we will work out the details.',
  },
  de: {
    'seo.title': 'Martin Bogoje | Softwareentwickler und Webentwicklung in Zagreb',
    'seo.description':
      'Softwareentwickler aus Zagreb, Kroatien. Websites und Anwendungen mit React und WordPress, technisches SEO und Wartung. Projekte ansehen und Kontakt aufnehmen.',
    'seo.ogImageAlt': 'Martin Bogoje, Softwareentwickler aus Zagreb',
    'hero.bio1': 'Softwareentwickler aus Zagreb, Masterstudium Informatik an der FER.',
    'hero.bio2': 'Zuvor bei Ericsson Nikola Tesla, dazu zahlreiche Webprojekte für Kunden.',
    'hero.bio3': 'Ich baue Websites und Anwendungen, die schnell, klar und auffindbar sind.',
    'about.heading': 'Websites und Anwendungen, wo Design auf technische Präzision trifft',
    'about.para1':
      'Ich helfe Unternehmen, aus einer Idee ein Webprodukt zu machen, das wirklich funktioniert: schnell, übersichtlich und in der Suche auffindbar.',
    'about.para2': 'Mit Erfahrung aus einem führenden regionalen Tech-Unternehmen biete ich als freiberuflicher Entwickler:',
    'about.service1Desc': 'Vom Konzept über das Design bis zur Produktion, mit React, Node.js oder WordPress.',
    'about.service2Desc': 'Anbindung des bestehenden Geschäfts an moderne Dienste und externe Systeme.',
    'projects.sectionIntro':
      'Fünf Projekte vom Konzept bis zur Produktion, für Kunden aus Tourismus, Immobilien und Grafikdesign. Jedes löste ein konkretes Problem, statt nur das Aussehen zu ändern.',
    'experience.intro':
      'Softwareentwickler mit Erfahrung bei Ericsson Nikola Tesla und in der Entwicklung individueller Weblösungen für Kunden. Ich verbinde die Präzision großer Systeme mit der Geschwindigkeit eigenständiger Arbeit.',
    'contact.tagline1': 'Offen für freiberufliche Projekte und feste Anstellungen.',
    'contact.tagline2': 'Schreiben Sie ein paar Zeilen zum Projekt, den Rest klären wir gemeinsam.',
  },
  pl: {
    'seo.title': 'Martin Bogoje | Programista i tworzenie stron w Zagrzebiu',
    'seo.description':
      'Programista z Zagrzebia w Chorwacji. Strony i aplikacje w React i WordPress, techniczne SEO i utrzymanie. Zobacz projekty i skontaktuj się ze mną.',
    'seo.ogImageAlt': 'Martin Bogoje, programista z Zagrzebia',
    'hero.bio1': 'Programista z Zagrzebia, studia magisterskie z informatyki na FER.',
    'hero.bio2': 'Wcześniej Ericsson Nikola Tesla oraz szereg projektów webowych dla klientów.',
    'hero.bio3': 'Tworzę strony i aplikacje, które są szybkie, czytelne i łatwe do znalezienia.',
    'about.heading': 'Strony i aplikacje, w których projekt spotyka inżynierską precyzję',
    'about.para1':
      'Pomagam firmom zamienić pomysł w produkt internetowy, który naprawdę działa: szybki, czytelny i łatwy do znalezienia w wyszukiwarce.',
    'about.para2': 'Dzięki doświadczeniu z wiodącej regionalnej firmy technologicznej, jako freelancer oferuję:',
    'about.service1Desc': 'Od koncepcji i projektu po wdrożenie, w React, Node.js lub WordPress.',
    'about.service2Desc': 'Połączenie istniejącego biznesu z nowoczesnymi usługami i systemami zewnętrznymi.',
    'projects.sectionIntro':
      'Pięć projektów doprowadzonych od koncepcji do wdrożenia, dla klientów z turystyki, nieruchomości i projektowania graficznego. Każdy rozwiązywał konkretny problem, a nie tylko zmieniał wygląd strony.',
    'experience.intro':
      'Programista z doświadczeniem w Ericsson Nikola Tesla i w budowie indywidualnych rozwiązań webowych dla klientów. Łączę precyzję dużego systemu z szybkością samodzielnej pracy.',
    'contact.tagline1': 'Otwarty na projekty freelance i stałe zatrudnienie.',
    'contact.tagline2': 'Napisz kilka zdań o projekcie, a ustalimy szczegóły.',
  },
}

const STAT_KEYS = ['statExperience', 'statProjects', 'statTech', 'statDegrees']

for (const [lng, entries] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))

  for (const [path, value] of Object.entries(entries)) {
    const [group, key] = path.split('.')
    j[group][key] = value
  }

  STAT_KEYS.forEach((k) => delete j.about[k])

  // A colon reads better than the comma the dash sweep left in page titles.
  for (const k of Object.keys(j.projects)) {
    if (k.endsWith('MetaTitle')) j.projects[k] = j.projects[k].replace(', ', ': ')
  }

  let dashes = 0
  const walk = (o) => {
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'string') {
        if (v.includes('—')) {
          dashes++
          o[k] = v.replace(/\s*—\s*/g, ', ')
        }
      } else walk(v)
    }
  }
  walk(j)

  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  console.log(`ok   [${lng}] copy rewritten, stats keys dropped, ${dashes} stray em-dash(es) cleaned`)
}
