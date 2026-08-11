/**
 * Adds the BMFit project copy in all four locales and bumps the project count
 * wording from six to seven.
 *
 *   node scripts/apply-bmfit-project.mjs
 */
import fs from 'node:fs'

const COPY = {
  hr: {
    Subtitle: 'Landing stranica za fitness coaching',
    Desc: 'BMFit: konverzijska landing stranica za osobnog trenera Benjamina Matoševića. Vođenje posjetitelja od problema do prijave, s jasnim objašnjenjem programa i odgovorima na česta pitanja.',
    MetaTitle: 'BMFit: landing stranica za fitness coaching',
    MetaDesc:
      'Izrada landing stranice za fitness coaching BMFit: struktura koja vodi posjetitelja od problema do prijave, uz brzo učitavanje bez CMS sloja.',
    Intro:
      'BMFit je program osobnog treninga Benjamina Matoševića, usmjeren na žene koje su više puta pokušale i odustale. Stranica ima jedan zadatak: objasniti zašto dosadašnji pokušaji nisu uspjeli i pretvoriti taj uvid u prijavu.',
    Challenge:
      'Landing stranica s jednim ciljem lakše promaši nego opsežna web stranica. Posjetitelj dolazi skeptično, često nakon lošeg iskustva, i odlazi u nekoliko sekundi ako ne prepozna vlastitu situaciju. Trebalo je posložiti redoslijed argumenata tako da svaki sljedeći odjeljak odgovara na pitanje koje se prirodno javlja u prethodnom, bez agresivnog tona.',
    Approach:
      'Stranica je izvedena kao statični set datoteka, bez CMS-a, što joj daje trenutačno učitavanje i minimalnu površinu za kvarove. Sadržaj je posložen kao argument: problem, uzrok, sustav u tri koraka, tko stoji iza programa i odgovori na česta pitanja, a svaki odjeljak vodi prema istom obrascu za prijavu. Vizualni jezik je tamna podloga s jednim naglasnim tonom, kako bi pozivi na akciju ostali očiti.',
    F1: 'Statična izvedba bez CMS-a, s trenutačnim učitavanjem',
    F2: 'Struktura sadržaja posložena kao argument, od problema do prijave',
    F3: 'Prikaz programa u tri koraka i sekcija s čestim pitanjima',
    F4: 'Dosljedni pozivi na akciju koji vode na isti obrazac za prijavu',
    Delivered:
      'Stranica je objavljena na vlastitoj domeni, s jednostavnom strukturom koja omogućuje izmjenu ponude i testiranje novih poruka bez razvojnog rada.',
  },
  en: {
    Subtitle: 'Landing page for fitness coaching',
    Desc: 'BMFit: a conversion-focused landing page for personal trainer Benjamin Matošević. It walks the visitor from the problem to a sign-up, with a clear account of the programme and answers to common objections.',
    MetaTitle: 'BMFit: landing page for a fitness coaching programme',
    MetaDesc:
      'A landing page for the BMFit coaching programme: a structure that carries the visitor from problem to sign-up, loading instantly with no CMS layer.',
    Intro:
      'BMFit is Benjamin Matošević’s personal training programme, aimed at women who have started and stopped several times before. The page has a single job: explain why the previous attempts failed, and turn that recognition into a sign-up.',
    Challenge:
      'A single-goal landing page misses more easily than a full website. The visitor arrives sceptical, often after a bad experience, and leaves within seconds if they do not recognise their own situation. The order of the argument had to be arranged so each section answers the question the previous one raises, without tipping into a hard sell.',
    Approach:
      'The page was built as a static set of files with no CMS, which gives it instant loading and a minimal surface for failure. The content is sequenced as an argument: the problem, the cause, a three-step system, who runs the programme, and answers to common questions, with every section leading back to the same sign-up form. The visual language is a dark ground with a single accent tone, so the calls to action stay unmistakable.',
    F1: 'Static build with no CMS, loading instantly',
    F2: 'Content sequenced as an argument, from problem through to sign-up',
    F3: 'Three-step programme breakdown and a frequently-asked-questions section',
    F4: 'Consistent calls to action all leading to the same sign-up form',
    Delivered:
      'The page was published on its own domain, with a simple structure that allows the offer to be revised and new messaging tested without development work.',
  },
  de: {
    Subtitle: 'Landingpage für Fitness-Coaching',
    Desc: 'BMFit: eine conversion-orientierte Landingpage für den Personal Trainer Benjamin Matošević. Sie führt Besucherinnen vom Problem zur Anmeldung, mit klarer Darstellung des Programms und Antworten auf häufige Einwände.',
    MetaTitle: 'BMFit: Landingpage für ein Fitness-Coaching-Programm',
    MetaDesc:
      'Landingpage für das Coaching-Programm BMFit: eine Struktur, die vom Problem zur Anmeldung führt, mit sofortigem Laden und ohne CMS-Schicht.',
    Intro:
      'BMFit ist das Personal-Training-Programm von Benjamin Matošević, gerichtet an Frauen, die schon mehrfach angefangen und wieder aufgehört haben. Die Seite hat eine einzige Aufgabe: erklären, warum die bisherigen Versuche scheiterten, und diese Einsicht in eine Anmeldung überführen.',
    Challenge:
      'Eine Landingpage mit einem einzigen Ziel geht leichter daneben als eine umfassende Website. Besucherinnen kommen skeptisch, oft nach einer schlechten Erfahrung, und sind in wenigen Sekunden wieder weg, wenn sie ihre eigene Situation nicht wiedererkennen. Die Reihenfolge der Argumente musste so gebaut sein, dass jeder Abschnitt die Frage beantwortet, die der vorherige aufwirft, ohne in aggressiven Verkauf zu kippen.',
    Approach:
      'Die Seite entstand als statisches Dateiset ohne CMS, was sofortiges Laden und eine minimale Fehleranfälligkeit bedeutet. Die Inhalte sind als Argument angeordnet: Problem, Ursache, ein System in drei Schritten, wer hinter dem Programm steht und Antworten auf häufige Fragen, wobei jeder Abschnitt zum selben Anmeldeformular führt. Die visuelle Sprache ist ein dunkler Grund mit einem einzigen Akzentton, damit die Handlungsaufforderungen eindeutig bleiben.',
    F1: 'Statischer Aufbau ohne CMS, mit sofortigem Laden',
    F2: 'Inhalte als Argument angeordnet, vom Problem bis zur Anmeldung',
    F3: 'Darstellung des Programms in drei Schritten und ein FAQ-Bereich',
    F4: 'Durchgängige Handlungsaufforderungen, die alle zum selben Formular führen',
    Delivered:
      'Die Seite ging unter eigener Domain online, mit einer einfachen Struktur, die Anpassungen des Angebots und das Testen neuer Botschaften ohne Entwicklungsarbeit erlaubt.',
  },
  pl: {
    Subtitle: 'Strona docelowa dla coachingu fitness',
    Desc: 'BMFit: nastawiona na konwersję strona docelowa dla trenera personalnego Benjamina Matoševicia. Prowadzi odwiedzającą od problemu do zgłoszenia, z czytelnym opisem programu i odpowiedziami na częste wątpliwości.',
    MetaTitle: 'BMFit: strona docelowa programu coachingu fitness',
    MetaDesc:
      'Strona docelowa programu coachingowego BMFit: struktura prowadząca od problemu do zgłoszenia, z natychmiastowym ładowaniem i bez warstwy CMS.',
    Intro:
      'BMFit to program treningu personalnego Benjamina Matoševicia, skierowany do kobiet, które zaczynały i rezygnowały już kilka razy. Strona ma jedno zadanie: wyjaśnić, dlaczego wcześniejsze próby się nie udały, i zamienić to zrozumienie w zgłoszenie.',
    Challenge:
      'Strona docelowa z jednym celem łatwiej chybia niż rozbudowany serwis. Odwiedzająca przychodzi sceptycznie, często po złym doświadczeniu, i wychodzi w kilka sekund, jeśli nie rozpozna własnej sytuacji. Kolejność argumentów musiała być ułożona tak, by każda sekcja odpowiadała na pytanie postawione przez poprzednią, bez przechodzenia w nachalną sprzedaż.',
    Approach:
      'Stronę zbudowano jako statyczny zestaw plików, bez CMS-a, co daje natychmiastowe ładowanie i minimalną powierzchnię awarii. Treść ułożono jak argument: problem, przyczyna, system w trzech krokach, kto stoi za programem oraz odpowiedzi na częste pytania, a każda sekcja prowadzi do tego samego formularza zgłoszenia. Język wizualny to ciemne tło z jednym kolorem akcentu, dzięki czemu wezwania do działania pozostają wyraźne.',
    F1: 'Statyczna realizacja bez CMS-a, z natychmiastowym ładowaniem',
    F2: 'Treść ułożona jak argument, od problemu do zgłoszenia',
    F3: 'Program przedstawiony w trzech krokach oraz sekcja częstych pytań',
    F4: 'Spójne wezwania do działania prowadzące do tego samego formularza',
    Delivered:
      'Strona została opublikowana pod własną domeną, z prostą strukturą pozwalającą zmieniać ofertę i testować nowe komunikaty bez prac programistycznych.',
  },
}

const COUNTS = {
  hr: ['Šest projekata', 'Sedam projekata'],
  en: ['Six projects', 'Seven projects'],
  de: ['Sechs Projekte', 'Sieben Projekte'],
  pl: ['Sześć projektów', 'Siedem projektów'],
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))

  for (const [field, value] of Object.entries(block)) {
    j.projects[`p7${field}`] = value
  }

  const [from, to] = COUNTS[lng]
  let bumped = 0
  if (j.projects.sectionIntro?.includes(from)) {
    j.projects.sectionIntro = j.projects.sectionIntro.replace(from, to)
    bumped++
  }
  if (j.projectPage.indexIntro?.includes(from)) {
    j.projectPage.indexIntro = j.projectPage.indexIntro.replace(from, to)
    bumped++
  }

  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  console.log(`ok   [${lng}] p7 copy added, ${bumped} count reference(s) bumped`)
}
