/**
 * Post 07: "how long does a website take".
 *
 * The second spoke into website-development, and the counterpart to b4: that
 * post explains why prices differ, this one why deadlines do. Same buyer, same
 * moment in the decision, different axis, no shared search term.
 *
 * The thesis was already on the site in three places, each as a two-sentence
 * stub on a commercial page and never argued anywhere:
 *
 *   s1Faq1A                  "najveci dio vremena ne trosi razvoj nego
 *                             prikupljanje sadrzaja"
 *   pricingPage.contentText  "Najveci skriveni trosak"
 *   s1Faq4A                  "dizajn bez sadrzaja zavrsi kao lijep raspored
 *                             praznih okvira"
 *
 * NO WEEK COUNTS ANYWHERE, deliberately. There are no real per-project
 * durations on record, and inventing them would violate section 0.7. S4 is
 * where honest ranges belong if they are ever supplied; nothing else in the
 * piece has to change to accommodate them.
 *
 * Guards against the neighbours: the season-as-deadline argument stays b3's,
 * and the platform question stays b2's. Each gets a single sentence here.
 *
 * This script also localises TAGS for every post. They used to be raw display
 * strings shared by both locales, so the English pages showed "Turizam",
 * "Cijene" and "Ponude". They are ids now, resolved through `blog.tags.<id>`.
 *
 *   node scripts/apply-blog-b7.mjs
 */
import fs from 'node:fs'

/** Tag labels per locale. Keys must match the ids used in data/posts.js. */
const TAGS = {
  hr: {
    performance: 'Brzina',
    'core-web-vitals': 'Core Web Vitals',
    seo: 'SEO',
    wordpress: 'WordPress',
    react: 'React',
    cms: 'CMS',
    pricing: 'Cijene',
    quotes: 'Ponude',
    process: 'Proces',
    tourism: 'Turizam',
    ux: 'UX',
    multilingual: 'Višejezičnost',
    google: 'Google',
    'search-console': 'Search Console',
    guide: 'Vodič',
    choosing: 'Odabir',
    content: 'Sadržaj',
    timeline: 'Rokovi',
  },
  en: {
    performance: 'Performance',
    'core-web-vitals': 'Core Web Vitals',
    seo: 'SEO',
    wordpress: 'WordPress',
    react: 'React',
    cms: 'CMS',
    pricing: 'Pricing',
    quotes: 'Quotes',
    process: 'Process',
    tourism: 'Tourism',
    ux: 'UX',
    multilingual: 'Multilingual',
    google: 'Google',
    'search-console': 'Search Console',
    guide: 'Guide',
    choosing: 'Choosing',
    content: 'Content',
    timeline: 'Timeline',
  },
}

const COPY = {
  hr: {
    b7Title: 'Koliko traje izrada web stranice',
    b7MetaTitle: 'Koliko traje izrada web stranice i o čemu to ovisi',
    b7MetaDesc:
      'Zašto rok ovisi manje o tehnologiji nego o tome je li sadržaj spreman, koje su faze izrade i što pripremiti prije početka da projekt ne stane.',
    b7Lead:
      'Na to pitanje pošten odgovor počinje s "ovisi", ali ne mora tu stati. Ono o čemu rok ovisi može se izbrojati, i većina toga je na vašoj strani stola.',
    b7Intro:
      'Kod izrade web stranice većina ljudi pretpostavlja da rok određuje složenost programiranja. U praksi je razvoj rijetko usko grlo. Projekti koji kasne gotovo nikad ne kasne zato što je nešto bilo teško izvesti, nego zato što se čeka: na tekstove, na fotografije, na podatak o cijeni usluge, na odgovor osobe koja jedina može odlučiti. Ovaj tekst razdvaja faze izrade, pokazuje gdje vrijeme stvarno odlazi i što možete pripremiti da se rok skrati.',

    b7S1Title: 'Razvoj rijetko odlučuje o roku',
    b7S1A:
      'Kada se dogovori opseg, sama izrada je najpredvidljiviji dio posla. Broj stranica je poznat, funkcije su popisane, i vrijeme potrebno za njihovu izvedbu procjenjuje se prilično točno. To je dio koji netko tko je radio dovoljno projekata zna procijeniti bez velikog odstupanja.',
    b7S1B:
      'Nepredvidljivo je sve ostalo. Koliko će trajati dogovor o strukturi, koliko krugova izmjena dizajna će trebati, kada će stići fotografije, i hoće li se na pola puta pojaviti stranica koje nije bilo u dogovoru. Zbog toga dva projekta iste tehničke složenosti mogu završiti u vrlo različitim rokovima, a razlika gotovo nikad nije u kodu.',

    b7S2Title: 'Četiri faze i što u kojoj traje',
    b7S2A:
      'Prva faza je dogovor opsega: što stranica treba postići, tko je publika, koje stranice trebaju postojati i koji sadržaj već imate. Ona je kratka ako znate odgovore, a zna se otegnuti ako se u razgovoru otkrije da odluka o tome što tvrtka zapravo nudi još nije donesena. Druga faza je struktura pa dizajn, i to je faza u kojoj se najviše mijenja, što je dobro: izmjena rasporeda je jeftina, izmjena gotove stranice nije.',
    b7S2B:
      'Treća faza je izrada, i ona teče ravnomjerno ako su prethodne dvije zatvorene. Četvrta je isporuka: testiranje na uređajima, provjera brzine i osnovnog SEO-a, postavljanje na domenu i predaja. Ta zadnja faza redovito traje dulje nego što ljudi očekuju, jer se tu prvi put sve vidi zajedno i tu se rješavaju sitnice koje se ranije nisu primijetile.',

    b7S3Title: 'Sadržaj je kritični put',
    b7S3A:
      'Ako postoji jedna stvar koja odlučuje o roku, to je jesu li tekstovi i fotografije spremni na početku. Stranica se ne može složiti oko sadržaja koji ne postoji. Može se napraviti raspored s praznim okvirima, ali onda se, kada tekst stigne, ispostavi da je predugačak ili prekratak za mjesto koje mu je ostavljeno, pa se raspored radi ponovno.',
    b7S3B:
      'Isto vrijedi za fotografije. Fotografija koja ne postoji ne može se optimizirati, a ona koju ćete "poslati sutra" u praksi rijetko stigne sutra. Ovdje ne mislim na savršen sadržaj: bolja je gruba verzija teksta koja postoji nego dotjerana koja se tek piše. Grubu verziju možemo posložiti zajedno, na nepostojeću se samo čeka.',

    b7S4Title: 'Što stvarno produljuje rok, a što se krivo optuži',
    b7S4A:
      'Produljuju ga stvari koje nemaju veze s tehnikom. Nejasno je tko donosi konačnu odluku, pa svaki krug izmjena ide kroz nekoliko ljudi koji se međusobno ne slažu. Sadržaj stiže u dijelovima. Traži se dodatak koji nije bio u dogovoru, što je legitimno, ali pomiče datum. Ili projekt ovisi o nekom trećem: sustavu za rezervacije, platnom procesoru, nekome tko drži postojeću domenu i ne javlja se.',
    b7S4B:
      'Ono što se najčešće krivo optuži je izbor tehnologije. Razlika između WordPressa i izrade po mjeri postoji, ali je manja od razlike između projekta sa spremnim sadržajem i projekta bez njega. Isto vrijedi za broj stranica: pet dodatnih podstranica koje slijede isti obrazac dodaje malo, dok jedna stranica koja radi nešto novo dodaje puno više nego što izgleda.',

    b7S5Title: 'Zašto je prekratak rok loš znak',
    b7S5A:
      'Rok koji zvuči prekratko za ono što ste opisali obično znači jedno od dvoje. Ili je ponuditelj shvatio manji projekt nego što ste mislili da tražite, što ćete otkriti tek na isporuci. Ili se planira predložak u koji se ubacuje vaš sadržaj, što je legitiman proizvod ako to znate unaprijed, a neugodno iznenađenje ako ne znate.',
    b7S5B:
      'Korisnije od samog broja je pitanje što taj rok pretpostavlja o vama. Pitajte do kada morate isporučiti tekstove i fotografije da bi rok vrijedio. Ozbiljna procjena uvijek ima taj uvjet u sebi, jer nitko ne može jamčiti datum ako ovisi o materijalima koje još nema. Rok bez tog uvjeta nije procjena nego želja.',

    b7ListTitle: 'Što pripremiti prije početka',
    b7L1: 'Tekstove za glavne stranice, makar u gruboj verziji koju zajedno dotjeramo',
    b7L2: 'Fotografije u punoj veličini, svoje a ne skinute s interneta',
    b7L3: 'Logotip u izvornom formatu, i boje ako već imate vizualni identitet',
    b7L4: 'Pristup domeni i hostingu, ili barem podatak tko ih drži',
    b7L5: 'Jednu osobu koja donosi konačnu odluku o izmjenama',

    b7CloseTitle: 'Kako se rok stvarno skraćuje',
    b7Close:
      'Ne bira se kraći rok, nego se uklanja ono zbog čega se čeka. Projekt u kojem su tekstovi i fotografije spremni prvog dana, u kojem je jasno tko odlučuje i u kojem je opseg zatvoren prije početka izrade, gotov je bitno prije od projekta iste veličine u kojem se sve to rješava usput. Ako još niste sigurni koliko je vaš projekt velik, to je pitanje na koje se odgovori u jednom razgovoru, i iz njega izlazi procjena roka koja nešto vrijedi.',
  },

  en: {
    b7Title: 'How long does a website take',
    b7MetaTitle: 'How long does a website take to build, and what decides it',
    b7MetaDesc:
      'Why a deadline depends less on technology than on whether the content is ready, what the four phases are, and what to prepare before the build starts.',
    b7Lead:
      'The honest answer starts with "it depends", but it does not have to stop there. What it depends on can be listed, and most of it sits on your side of the table.',
    b7Intro:
      'Most people assume the deadline on a website is set by how complicated the programming is. In practice development is rarely the bottleneck. Projects that run late almost never run late because something was hard to build; they run late because somebody is waiting, for text, for photographs, for the price of a service, for the one person who can approve a decision. This article separates the phases, shows where the time actually goes, and lists what you can have ready to shorten the whole thing.',

    b7S1Title: 'Development rarely decides the deadline',
    b7S1A:
      'Once the scope is agreed, the build itself is the most predictable part of the work. The number of pages is known, the features are listed, and the time needed to produce them can be estimated fairly closely. That is the part somebody who has done enough projects can put a number on without being far out.',
    b7S1B:
      'Everything around it is what varies. How long the conversation about structure takes, how many rounds the design needs, when the photographs arrive, and whether a page nobody mentioned appears halfway through. Two projects of identical technical difficulty can finish a long way apart, and the difference is almost never in the code.',

    b7S2Title: 'Four phases, and what each one costs you',
    b7S2A:
      'The first phase is agreeing scope: what the site has to achieve, who it is for, which pages it needs and what content already exists. It is short if you know the answers, and it stretches when the conversation reveals that what the business actually offers has not been settled yet. The second is structure and then design, and it is the phase where the most changes happen, which is how it should be, because moving a block around is cheap and rebuilding a finished page is not.',
    b7S2B:
      'The third phase is the build, and it runs evenly if the first two were closed properly. The fourth is delivery: testing on devices, checking speed and the SEO basics, putting it on the domain and handing it over. That last phase reliably takes longer than people expect, because it is the first time everything is seen together and the small things nobody noticed earlier get resolved.',

    b7S3Title: 'Content is the critical path',
    b7S3A:
      'If one thing decides the deadline, it is whether the text and photographs exist at the start. A site cannot be assembled around content that is not there. You can lay out empty boxes, but when the text finally arrives it turns out to be longer or shorter than the space left for it, and the layout gets done a second time.',
    b7S3B:
      'The same goes for photographs. A photograph that does not exist cannot be optimised, and one you will "send tomorrow" rarely arrives tomorrow. This is not an argument for perfect content: a rough version of the text that exists beats a polished one still being written. A rough version can be shaped together, whereas a missing one can only be waited for.',

    b7S4Title: 'What actually extends a deadline, and what gets blamed',
    b7S4A:
      'The things that extend it have nothing to do with technique. It is unclear who makes the final call, so every round of changes passes through several people who disagree with each other. Content arrives in pieces. Something is added that was not in the agreement, which is fair enough but moves the date. Or the project depends on a third party: a booking system, a payment processor, somebody holding the existing domain who does not reply.',
    b7S4B:
      'What usually gets blamed unfairly is the choice of technology. The difference between WordPress and a custom build is real, but it is smaller than the difference between a project with its content ready and one without. The same goes for page count: five more pages following the same pattern add very little, while one page that does something new adds far more than it looks like it should.',

    b7S5Title: 'Why a short deadline is a warning',
    b7S5A:
      'A deadline that sounds too short for what you described usually means one of two things. Either the other side understood a smaller project than you thought you were asking for, which you find out at handover. Or a template is planned with your content dropped into it, which is a legitimate product if you know that in advance and an unpleasant surprise if you do not.',
    b7S5B:
      'More useful than the number itself is asking what it assumes about you. Ask by when you have to deliver text and photographs for that date to hold. A serious estimate always carries that condition, because nobody can promise a date that depends on materials they do not have yet. A deadline without that condition is not an estimate, it is a wish.',

    b7ListTitle: 'What to have ready before the start',
    b7L1: 'Text for the main pages, even a rough version we tidy up together',
    b7L2: 'Photographs at full size, your own rather than taken from the internet',
    b7L3: 'The logo in its original format, and your colours if you already have an identity',
    b7L4: 'Access to the domain and hosting, or at least the name of whoever holds them',
    b7L5: 'One person who makes the final call on changes',

    b7CloseTitle: 'How a deadline actually gets shorter',
    b7Close:
      'You do not pick a shorter deadline, you remove the reasons for waiting. A project where the text and photographs are ready on day one, where it is clear who decides, and where the scope is closed before the build starts finishes considerably sooner than one of the same size that sorts all of that out along the way. If you are not sure yet how big your project is, that is a question a single conversation answers, and the estimate that comes out of it is worth something.',
  },
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  Object.assign(j.blog, block)
  j.blog.tags = TAGS[lng]
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  const w = Object.values(block).join(' ').split(/\s+/).filter(Boolean).length
  const d = Object.values(block).filter((v) => v.includes('—')).length
  console.log(
    `ok   [${lng}] b7: ${Object.keys(block).length} keys, ${w} words, ${d} em-dashes` +
      `, ${Object.keys(TAGS[lng]).length} tag labels`,
  )
}
