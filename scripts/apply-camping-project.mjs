/**
 * Adds the Camping Lovište Paradise project copy in all four locales and
 * updates the project-count wording now that there are six.
 *
 *   node scripts/apply-camping-project.mjs
 */
import fs from 'node:fs'

let fail = 0
function subFile(p, from, to, label) {
  const raw = fs.readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  const s = raw.replace(/\r\n/g, '\n')
  const n = s.split(from).length - 1
  if (n !== 1) {
    console.error(`FAIL [${label}] ${p}: matched ${n}x`)
    fail++
    return
  }
  const out = s.replace(from, to)
  fs.writeFileSync(p, crlf ? out.replace(/\n/g, '\r\n') : out, 'utf8')
  console.log(`ok   [${label}]`)
}

// Tints for the new project id.
subFile(
  'src/data/projects.js',
  "export const PLACEHOLDER_BG = { 1: '#1a0a0c', 2: '#0a0e1a', 3: '#0a1210', 4: '#0e0a1a', 5: '#0f1a0a' }\nexport const PLACEHOLDER_ACCENT = { 1: '#3d0f17', 2: '#0f1a3d', 3: '#0f3d2a', 4: '#1a0f3d', 5: '#1a3d0f' }",
  "export const PLACEHOLDER_BG = { 1: '#1a0a0c', 2: '#0a0e1a', 3: '#0a1210', 4: '#0e0a1a', 5: '#0f1a0a', 6: '#0a1418' }\nexport const PLACEHOLDER_ACCENT = { 1: '#3d0f17', 2: '#0f1a3d', 3: '#0f3d2a', 4: '#1a0f3d', 5: '#1a3d0f', 6: '#0f2f3d' }",
  'tints',
)

if (fail) process.exit(1)

const COPY = {
  hr: {
    Subtitle: 'Web stranica za kamp na Pelješcu',
    Desc: 'Camping Lovište Paradise: jednostranična React aplikacija za obiteljski kamp u uvali Lovište. Prezentacija parcela i sadržaja kampa, višejezično sučelje i jasan put do upita za rezervaciju.',
    MetaTitle: 'Camping Lovište Paradise: web stranica za kamp na Pelješcu',
    MetaDesc:
      'Izrada React web stranice za Camping Lovište Paradise: prezentacija terasastih parcela, sadržaja kampa i okolice, uz višejezično sučelje i obrazac za upit.',
    Intro:
      'Camping Lovište Paradise je obiteljski kamp u uvali Lovište na zapadnom Pelješcu. Trebala mu je stranica koja gostu iz inozemstva u nekoliko sekundi objasni kakav je kamp, što nudi i kako rezervirati, bez pretrpavanja informacijama.',
    Challenge:
      'Kamp se bira vizualno, ali odluka pada na detaljima: kakav je sanitarni čvor, ima li hlada, koliko je more udaljeno, primaju li se kućni ljubimci. Trebalo je pomiriti velik broj praktičnih informacija s prezentacijom koja ostaje mirna i pregledna. Publika je pretežno strana i dolazi s mobilnih uređaja, najčešće dok tek planira put.',
    Approach:
      'Stranica je izvedena kao jednostranična React aplikacija uz Vite, podijeljena u jasne cjeline: dojam lokacije, sadržaji kampa, sanitarni čvor, aktivnosti u okolici i udaljenosti do okolnih mjesta. Sadržaj je višejezičan, a fotografije su organizirane u galerije koje se učitavaju postupno. Svaka cjelina završava jasnim putem prema obrascu za upit.',
    F1: 'Jednostranična React arhitektura s jasno odvojenim tematskim cjelinama',
    F2: 'Višejezično sučelje za goste iz različitih zemalja',
    F3: 'Galerije fotografija kampa, sanitarnog čvora i okolice s postupnim učitavanjem',
    F4: 'Pregled udaljenosti do okolnih mjesta i karta za lakše planiranje puta',
    Delivered:
      'Stranica je objavljena na vlastitoj domeni, sa strukturom koja omogućuje dodavanje sadržaja i sezonskih informacija bez razvojnog rada.',
  },
  en: {
    Subtitle: 'Website for a campsite on Pelješac',
    Desc: 'Camping Lovište Paradise: a single-page React application for a family-run campsite in Lovište bay. Presentation of the pitches and facilities, a multilingual interface, and a clear path to a booking enquiry.',
    MetaTitle: 'Camping Lovište Paradise: website for a campsite on Pelješac',
    MetaDesc:
      'A React website for Camping Lovište Paradise: presenting the terraced pitches, the camp facilities and the surrounding area, with a multilingual interface and an enquiry form.',
    Intro:
      'Camping Lovište Paradise is a family-run campsite in Lovište bay on the western tip of the Pelješac peninsula. It needed a site that explains to an international guest, within seconds, what the camp is like, what it offers and how to book, without burying them in detail.',
    Challenge:
      'A campsite is chosen visually, but the decision is made on specifics: what the sanitary block is like, whether there is shade, how far the sea is, whether pets are allowed. A large amount of practical information had to sit alongside a presentation that stays calm and easy to scan. The audience is mostly international and arrives on mobile, usually while still planning the trip.',
    Approach:
      'The site was built as a single-page React application with Vite, split into clear sections: a sense of the location, the camp facilities, the sanitary block, activities in the area, and distances to nearby places. The content is multilingual, and the photography is organised into galleries that load progressively. Every section ends with a clear route to the enquiry form.',
    F1: 'Single-page React architecture with clearly separated thematic sections',
    F2: 'Multilingual interface for guests arriving from different countries',
    F3: 'Photo galleries of the camp, the sanitary block and the surroundings, loaded progressively',
    F4: 'Distances to nearby destinations and a map, for easier trip planning',
    Delivered:
      'The site was published on its own domain, structured so content and seasonal information can be added without development work.',
  },
  de: {
    Subtitle: 'Website für einen Campingplatz auf Pelješac',
    Desc: 'Camping Lovište Paradise: eine einseitige React-Anwendung für einen familiengeführten Campingplatz in der Bucht von Lovište. Darstellung der Stellplätze und Einrichtungen, mehrsprachige Oberfläche und ein klarer Weg zur Buchungsanfrage.',
    MetaTitle: 'Camping Lovište Paradise: Website für einen Campingplatz auf Pelješac',
    MetaDesc:
      'React-Website für Camping Lovište Paradise: Darstellung der terrassierten Stellplätze, der Einrichtungen und der Umgebung, mit mehrsprachiger Oberfläche und Anfrageformular.',
    Intro:
      'Camping Lovište Paradise ist ein familiengeführter Campingplatz in der Bucht von Lovište im Westen der Halbinsel Pelješac. Gebraucht wurde eine Website, die internationalen Gästen in wenigen Sekunden vermittelt, wie der Platz ist, was er bietet und wie gebucht wird, ohne sie mit Details zu überfrachten.',
    Challenge:
      'Ein Campingplatz wird visuell ausgewählt, entschieden wird aber über Details: Wie ist der Sanitärbereich, gibt es Schatten, wie weit ist das Meer, sind Haustiere erlaubt. Eine große Menge praktischer Informationen musste neben einer Darstellung bestehen, die ruhig und übersichtlich bleibt. Das Publikum ist überwiegend international und kommt mobil, meist noch in der Reiseplanung.',
    Approach:
      'Die Website entstand als einseitige React-Anwendung mit Vite, gegliedert in klare Bereiche: Eindruck der Lage, Einrichtungen, Sanitärbereich, Aktivitäten in der Umgebung und Entfernungen zu Nachbarorten. Die Inhalte sind mehrsprachig, die Fotos in Galerien organisiert, die schrittweise laden. Jeder Bereich endet mit einem klaren Weg zum Anfrageformular.',
    F1: 'Einseitige React-Architektur mit klar getrennten thematischen Bereichen',
    F2: 'Mehrsprachige Oberfläche für Gäste aus verschiedenen Ländern',
    F3: 'Fotogalerien von Platz, Sanitärbereich und Umgebung mit schrittweisem Laden',
    F4: 'Entfernungen zu Nachbarorten und Karte für die einfachere Reiseplanung',
    Delivered:
      'Die Website ging unter eigener Domain online, strukturiert so, dass Inhalte und saisonale Angaben ohne Entwicklungsarbeit ergänzt werden können.',
  },
  pl: {
    Subtitle: 'Strona internetowa kempingu na półwyspie Pelješac',
    Desc: 'Camping Lovište Paradise: jednostronicowa aplikacja React dla rodzinnego kempingu w zatoce Lovište. Prezentacja stanowisk i udogodnień, wielojęzyczny interfejs oraz czytelna ścieżka do zapytania o rezerwację.',
    MetaTitle: 'Camping Lovište Paradise: strona kempingu na półwyspie Pelješac',
    MetaDesc:
      'Strona React dla Camping Lovište Paradise: prezentacja tarasowych stanowisk, udogodnień kempingu i okolicy, z wielojęzycznym interfejsem i formularzem zapytania.',
    Intro:
      'Camping Lovište Paradise to rodzinny kemping w zatoce Lovište na zachodnim krańcu półwyspu Pelješac. Potrzebował strony, która zagranicznemu gościowi w kilka sekund wyjaśni, jaki jest kemping, co oferuje i jak zarezerwować, bez zasypywania go szczegółami.',
    Challenge:
      'Kemping wybiera się wzrokiem, ale decyzja zapada na szczegółach: jaki jest węzeł sanitarny, czy jest cień, jak daleko jest morze, czy przyjmowane są zwierzęta. Trzeba było pogodzić dużą ilość praktycznych informacji z prezentacją, która pozostaje spokojna i czytelna. Odbiorcy są głównie zagraniczni i wchodzą z telefonów, zwykle jeszcze na etapie planowania wyjazdu.',
    Approach:
      'Stronę zbudowano jako jednostronicową aplikację React z Vite, podzieloną na wyraźne sekcje: wrażenie lokalizacji, udogodnienia kempingu, węzeł sanitarny, aktywności w okolicy oraz odległości do sąsiednich miejscowości. Treść jest wielojęzyczna, a zdjęcia zorganizowano w galerie ładowane stopniowo. Każda sekcja kończy się czytelną drogą do formularza zapytania.',
    F1: 'Jednostronicowa architektura React z wyraźnie oddzielonymi sekcjami tematycznymi',
    F2: 'Wielojęzyczny interfejs dla gości z różnych krajów',
    F3: 'Galerie zdjęć kempingu, węzła sanitarnego i okolicy ze stopniowym ładowaniem',
    F4: 'Odległości do okolicznych miejscowości i mapa ułatwiająca planowanie podróży',
    Delivered:
      'Strona została opublikowana pod własną domeną, ze strukturą pozwalającą dodawać treści i informacje sezonowe bez prac programistycznych.',
  },
}

/** "Five projects" -> "Six projects" in the two intro paragraphs. */
const COUNTS = {
  hr: [['Pet projekata', 'Šest projekata']],
  en: [['Five projects', 'Six projects']],
  de: [['Fünf Projekte', 'Sechs Projekte']],
  pl: [['Pięć projektów', 'Sześć projektów']],
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))

  for (const [field, value] of Object.entries(block)) {
    j.projects[`p6${field}`] = value
  }

  let renamed = 0
  for (const [from, to] of COUNTS[lng]) {
    for (const key of ['sectionIntro']) {
      if (j.projects[key]?.includes(from)) {
        j.projects[key] = j.projects[key].replace(from, to)
        renamed++
      }
    }
    if (j.projectPage.indexIntro?.includes(from)) {
      j.projectPage.indexIntro = j.projectPage.indexIntro.replace(from, to)
      renamed++
    }
  }

  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  console.log(`ok   [${lng}] p6 copy added, ${renamed} count reference(s) updated`)
}
