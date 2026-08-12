/**
 * Depth pass for the Croatian service pages: a third intro paragraph, a
 * per-service "what actually matters" section, and two more FAQ entries each.
 * Brings every page past the 800-word mark with substance rather than padding.
 *
 *   node scripts/apply-services-copy-hr-extra.mjs
 */
import fs from 'node:fs'

const extra = {
  noteTitleFallback: 'Napomene',

  /* ── 01 ── */
  s1Intro3:
    'Cijena i rok ovise o opsegu, pa ih ne objavljujem kao fiksan cjenik koji bi ionako bio netočan za pola upita. Nakon kratkog razgovora znam je li projekt izvediv, koliko otprilike traje i koliko košta, i to dobivate prije nego što se bilo što dogovori.',
  s1NoteTitle: 'Na što najviše pazim',
  s1Note1:
    'Sadržaj prije dizajna. Stranica složena oko praznih okvira uvijek se raspadne kad stigne pravi tekst.',
  s1Note2:
    'Jedna jasna radnja po stranici. Pet jednako naglašenih gumba znači da posjetitelj neće pritisnuti nijedan.',
  s1Note3:
    'Brzina se ne popravlja na kraju. Odluke o slikama, fontovima i skriptama donose se tijekom izrade, jer je naknadno ubrzavanje uvijek skuplje.',
  s1Faq5Q: 'Što ako već imam domenu i hosting?',
  s1Faq5A:
    'Nema problema, radim na postojećima. Ako hosting bitno usporava stranicu, reći ću vam to i objasniti zašto, ali odluka o preseljenju ostaje vaša.',
  s1Faq6Q: 'Tko piše tekstove?',
  s1Faq6A:
    'Najbolji rezultat je kada tekst dolazi od vas jer poznajete posao i kupce, a ja ga posložim u strukturu koja radi na webu. Ako teksta nema, radimo ga zajedno kroz nekoliko pitanja. Ono što ne radim je popunjavanje stranice praznim frazama da bi izgledala puno.',

  /* ── 02 ── */
  s2Intro3:
    'Turistička stranica ima i jedan rok koji nema nijedan drugi projekt: sezonu. Stranica objavljena usred srpnja propustila je razdoblje u kojem se gosti odlučuju, pa se izrada planira unatrag od datuma kada promet stvarno počinje.',
  s2NoteTitle: 'Što najviše koči turističke stranice',
  s2Note1:
    'Fotografije u punoj veličini ravno iz fotoaparata. Najčešći razlog zašto se turistička stranica otvara deset sekundi.',
  s2Note2:
    'Kontakt skriven na zasebnoj stranici. Gost koji se odlučio ne bi trebao tražiti kako vas dobiti.',
  s2Note3:
    'Strojni prijevod bez pregleda. Gost iz Njemačke prepozna lošu njemačku rečenicu jednako brzo kao vi lošu hrvatsku.',
  s2Faq5Q: 'Kada je najbolje vrijeme za izradu?',
  s2Faq5A:
    'Izvan sezone. Tada imate vremena za prikupljanje fotografija i tekstova, a stranica ima nekoliko mjeseci da je tražilice indeksiraju prije nego što promet krene. Stranica objavljena u srpnju propušta upravo razdoblje u kojem se gosti odlučuju.',
  s2Faq6Q: 'Trebaju li mi profesionalne fotografije?',
  s2Faq6A:
    'Pomažu više nego bilo koja tehnička odluka. Turistička stranica prodaje dojam, a dojam nosi fotografija. Ako profesionalnih nema, radimo s onim što postoji i biramo najbolje, ali vrijedi uložiti u fotografiranje prije nego u dodatne funkcionalnosti.',

  /* ── 03 ── */
  s3Intro3:
    'Pregled ima smisla i ako na kraju ne napravimo ništa. Dobivate popis nalaza poredanih po utjecaju i možete ga odraditi sami ili s nekim drugim. Radije ću vam reći da stranica ne treba popravak nego naplatiti posao koji ništa ne mijenja.',
  s3NoteTitle: 'Odakle obično dolazi najveći dobitak',
  s3Note1:
    'Slike. U gotovo svakom pregledu koji sam radio one su bile najveći pojedinačni teret na brzini.',
  s3Note2:
    'Nepotrebne skripte. Dodaci i alati za praćenje koji se učitavaju na svakoj stranici, a koriste se na jednoj.',
  s3Note3:
    'Nedostatak osnove. Stranice bez sitemapa, bez Search Consolea i s praznim meta opisima ne mogu se ni mjeriti, a kamoli popraviti.',
  s3Faq5Q: 'Hoće li se nešto pokvariti tijekom ažuriranja?',
  s3Faq5A:
    'Zato se prije ažuriranja radi sigurnosna kopija, a nakon njega provjerava stranica, a ne samo verzija dodatka. Ako nešto pukne, vraća se na prethodno stanje i traži se uzrok. Rizik ažuriranja je stvaran, ali je manji od rizika neažurirane instalacije.',
  s3Faq6Q: 'Koliko brzo se vide rezultati?',
  s3Faq6A:
    'Brzina se vidi odmah, isti dan. Vidljivost na tražilicama ne. Google treba ponovno indeksirati stranice i procijeniti promjene, što u praksi znači nekoliko tjedana prije nego što se u Search Consoleu vidi pomak. Svatko tko obeća brže, obećava nešto što ne kontrolira.',
}

const p = 'src/locales/hr.json'
const j = JSON.parse(fs.readFileSync(p, 'utf8'))
Object.assign(j.services, extra)
fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')

const words = Object.values(extra).join(' ').split(/\s+/).filter(Boolean).length
console.log(`ok   [hr] +${Object.keys(extra).length} keys, +${words} words`)
console.log(`     services total: ${Object.keys(j.services).length} keys`)
