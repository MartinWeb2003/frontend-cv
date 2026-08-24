/**
 * Post 06: "why your website does not show up on Google".
 *
 * The second spoke into maintenance-seo. That service page already names the
 * pain in s3For2 ("stranice koje se ne pojavljuju na Googleu ni za vlastito
 * ime") and nothing in the cluster answered it: b1 covers speed only.
 *
 * Written as method, not as a case study. There is no Search Console history
 * from a client to quote, so the post makes no claim about results achieved
 * and attaches no numbers to anything. Section 0.7.
 *
 * Speed is deliberately one sentence with a pointer to b1, so the two posts
 * targeting maintenance-seo do not compete for the same query.
 *
 *   node scripts/apply-blog-b6.mjs
 */
import fs from 'node:fs'

const COPY = {
  hr: {
    b6Title: 'Zašto se moja stranica ne pojavljuje na Googleu',
    b6MetaTitle: 'Zašto se stranica ne pojavljuje na Googleu i što provjeriti',
    b6MetaDesc:
      'Razlika između indeksiranja i rangiranja, zašto je poslovni profil najveći lokalni dobitak i kojim redom provjeriti zašto vas Google ne prikazuje.',
    b6Lead:
      'Upišete ime svoje tvrtke u Google i dobijete sve osim sebe. To je čest problem, gotovo nikad nema jedan uzrok, ali ima redoslijed po kojem se traži.',
    b6Intro:
      'Kada se stranica ne pojavljuje na Googleu, prva pretpostavka je obično da je potrebna SEO usluga. Ponekad jest, ali češće se radi o nečemu što se da provjeriti u pola sata i ispraviti bez ičije pomoći. Problem je što se pod istim pitanjem kriju dvije potpuno različite situacije: Google vašu stranicu uopće ne poznaje, ili je poznaje ali je stavlja iza konkurencije. Rješenja za te dvije stvari nemaju ništa zajedničko, pa ih vrijedi razdvojiti prije nego što bilo što poduzmete.',

    b6S1Title: 'Indeksiranje i rangiranje nisu isto',
    b6S1A:
      'Indeksiranje znači da Google zna da vaša stranica postoji i da ju je spremio u svoj popis. Rangiranje znači da ju je odlučio pokazati kada netko nešto potraži. Stranica koja nije indeksirana ne može se rangirati ni za što, uključujući vlastito ime, i to je stanje koje se popravlja tehnički. Stranica koja je indeksirana ali se ne pokazuje za tražene pojmove je sasvim drugi problem, i tu tehnika više nije glavni odgovor.',
    b6S1B:
      'Razlika se provjeri u nekoliko sekundi. U Google upišite site: pa adresu svoje stranice, bez razmaka. Ako se ne pojavi nijedan rezultat, stranica nije indeksirana i sve ostalo u ovom tekstu može čekati. Ako se pojavi popis vaših podstranica, Google vas poznaje i pitanje se pomiče na to zašto vas stavlja niže od drugih.',

    b6S2Title: 'Poslovni profil je najveći pojedinačni dobitak za lokalnu tvrtku',
    b6S2A:
      'Za tvrtku koja posluje na jednom mjestu, Google poslovni profil obično donosi više vidljivosti nego sama stranica. To je zapis koji se pojavljuje na karti i u okviru sa strane kada netko traži vaše ime ili uslugu u vašem mjestu, i besplatan je. Ako ga niste postavili, moguće je da već postoji verzija koju je Google sam sastavio ili koju je netko prijavio, pa je prvi korak preuzeti postojeći, a ne raditi drugi.',
    b6S2B:
      'Ono što se na profilu isplati odraditi do kraja je dosadno, ali odlučuje: točna kategorija djelatnosti, radno vrijeme koje odgovara stvarnom, adresa i broj u istom obliku u kojem stoje na stranici, i fotografije koje ste sami snimili. Nedosljednost između profila i stranice je čest razlog zašto se lokalni rezultat ne slaže, a taj popravak ne traži nikakvo znanje programiranja.',

    b6S3Title: 'Što vaša stranica kontrolira sama',
    b6S3A:
      'Na stranici postoji nekoliko stvari koje Googleu izravno govore o čemu se radi, i one se često ostave onako kako ih je ostavio predložak. Naslov stranice u pregledniku, opis koji se prikazuje u rezultatima, jedan glavni naslov po stranici i tekst koji stvarno spominje čime se bavite i gdje. Stranica na kojoj piše samo "Početna" i "Dobrodošli" nije dala nijedan podatak po kojem bi ju se moglo pronaći.',
    b6S3B:
      'Drugo pravilo je jedna namjena po stranici. Ako se ista usluga spominje u pola rečenice na pet mjesta, nijedno od tih mjesta nije jasan odgovor na upit, pa Google bira sam i obično bira loše. Bolje radi jedna stranica koja u cijelosti odgovara na jedno pitanje. Brzina učitavanja tu također igra ulogu, ali je rijetko razlog zašto se stranica uopće ne pojavljuje, i o njoj postoji zaseban tekst.',

    b6S4Title: 'Zašto prvo mjesto za sve ne postoji',
    b6S4A:
      'Pojmovi se međusobno jako razlikuju po tome koliko je za njih teško doći visoko. Za ime vlastite tvrtke gotovo uvijek se može biti prvi, jer nitko drugi ne cilja taj pojam. Za opću uslugu u velikom gradu natječete se s tvrtkama koje na tome rade godinama i imaju budžet, i tu obećanje prvog mjesta nije realno bez obzira tko ga daje.',
    b6S4B:
      'Korisniji cilj je usko postavljen pojam koji opisuje što stvarno radite i gdje. Manje ljudi to traži, ali oni koji traže znaju što žele, i tu se doista može doći visoko. Ako vam netko jamči prvo mjesto za širok pojam i to naplati, plaćate obećanje nad kojim ta osoba nema kontrolu.',

    b6S5Title: 'Mjerite kroz Search Console, ne kroz vlastito pretraživanje',
    b6S5A:
      'Pretraživanje vlastitog imena u vlastitom pregledniku nije mjerenje. Google prilagođava rezultate prema tome gdje ste, što ste prije tražili i jeste li prijavljeni, pa vaša stranica vama može izgledati bolje ili gore nego što stvarno stoji. Google Search Console je besplatan alat koji pokazuje stvarne podatke: za koje se pojmove stranica prikazuje, koliko puta i koliko ljudi klikne.',
    b6S5B:
      'Vrijedi ga postaviti čak i ako ne planirate ništa mijenjati, jer javlja i probleme koje inače ne biste vidjeli, poput podstranica koje Google ne može indeksirati. Podaci se skupljaju od trenutka postavljanja, ne unatrag, što je razlog da se postavi odmah, a gleda kasnije. Promjene se ionako ne vide preko noći.',

    b6ListTitle: 'Redoslijed po kojem provjeriti',
    b6L1: 'Upišite site: pa svoju adresu u Google i provjerite je li stranica uopće indeksirana',
    b6L2: 'Preuzmite ili postavite Google poslovni profil, s točnom kategorijom i radnim vremenom',
    b6L3: 'Provjerite ima li svaka stranica vlastiti naslov, opis i jedan glavni naslov',
    b6L4: 'Uskladite adresu i telefon na stranici s onima na poslovnom profilu',
    b6L5: 'Postavite Search Console i pustite ga da skuplja podatke prije nego što išta mijenjate',

    b6CloseTitle: 'Koliko ovo traje',
    b6Close:
      'Tehnički dio je pitanje sati. Ako stranica nije indeksirana, popravak i prijava obično se riješe isti dan, a Google reagira kroz nekoliko dana. Poslovni profil se postavi u jedno popodne. Ono što traje je rangiranje za pojmove za koje se netko drugi već trudi, i tu je pošten okvir mjeseci, ne tjedni. Ako ste prošli ovaj popis i stranica se i dalje ne pojavljuje ni za vlastito ime, problem je gotovo sigurno tehnički i vrijedi ga pogledati prije nego što uložite u bilo kakvu optimizaciju.',
  },

  en: {
    b6Title: 'Why your website does not show up on Google',
    b6MetaTitle: 'Why your site does not show up on Google, and what to check',
    b6MetaDesc:
      'The difference between indexing and ranking, why a business profile is the biggest local win, and the order to check things in when Google ignores you.',
    b6Lead:
      'You type your own company name into Google and get everything except yourself. It is a common problem, it almost never has one cause, and there is an order in which to look for it.',
    b6Intro:
      'When a site does not show up on Google, the first assumption is usually that it needs an SEO service. Sometimes it does, but more often the cause is something you can check in half an hour and fix without anyone’s help. The trouble is that one question hides two entirely different situations: either Google does not know your site exists, or it knows and puts it behind the competition. The fixes for those two have nothing in common, so it is worth separating them before you do anything.',

    b6S1Title: 'Indexing and ranking are not the same thing',
    b6S1A:
      'Indexing means Google knows your site exists and has stored it in its list. Ranking means it has decided to show your site when somebody searches. A site that is not indexed cannot rank for anything at all, including its own name, and that is a technical problem with a technical fix. A site that is indexed but does not appear for the terms you care about is a different problem, and technique is no longer the main answer there.',
    b6S1B:
      'You can tell which one you have in a few seconds. Type site: followed by your address into Google, with no space. If nothing comes back, the site is not indexed and everything else in this article can wait. If you get a list of your own pages, Google knows you, and the question becomes why it places you below others.',

    b6S2Title: 'A business profile is the biggest single win for a local company',
    b6S2A:
      'For a business that operates in one place, a Google Business Profile usually brings more visibility than the site itself. It is the entry that appears on the map and in the panel beside the results when somebody searches your name or your service in your town, and it costs nothing. If you have never set one up, a version may already exist that Google assembled on its own or that somebody else submitted, so the first step is to claim the existing one rather than create a second.',
    b6S2B:
      'What pays off on the profile is dull and decisive: the right business category, opening hours that match reality, an address and phone number written the same way they are written on your site, and photographs you took yourself. A mismatch between the profile and the site is a common reason local results do not line up, and fixing it takes no programming knowledge at all.',

    b6S3Title: 'What your own site controls',
    b6S3A:
      'A few things on the site tell Google directly what it is about, and they are often left exactly as the template left them. The page title shown in the browser, the description that appears in results, one main heading per page, and body text that actually names what you do and where. A page that says only "Home" and "Welcome" has given Google nothing to find it by.',
    b6S3B:
      'The second rule is one purpose per page. If the same service is mentioned in half a sentence across five places, none of those places is a clear answer to a query, so Google picks for you and usually picks badly. One page that answers one question in full works better. Loading speed plays a part too, but it is rarely why a site fails to appear at all, and it has an article of its own.',

    b6S4Title: 'Why first place for everything does not exist',
    b6S4A:
      'Search terms differ enormously in how hard they are to rank for. For your own company name you can almost always be first, because nobody else is aiming at that term. For a general service in a large city you are competing with companies who have worked at it for years and have a budget, and a promise of first place there is not realistic no matter who makes it.',
    b6S4B:
      'A more useful target is a narrow term that describes what you actually do and where you do it. Fewer people search it, but the ones who do know what they want, and there you genuinely can rank. If somebody guarantees first place for a broad term and charges for it, you are paying for a promise they have no control over.',

    b6S5Title: 'Measure in Search Console, not by searching for yourself',
    b6S5A:
      'Searching your own name in your own browser is not measurement. Google adapts results to where you are, what you have searched before and whether you are signed in, so your site can look better or worse to you than it really stands. Google Search Console is a free tool that shows the real figures: which terms your site appears for, how often, and how many people click.',
    b6S5B:
      'It is worth setting up even if you plan to change nothing, because it also reports problems you would not otherwise see, such as pages Google cannot index. Data collects from the moment you set it up rather than backwards, which is the reason to set it up now and look at it later. Changes do not show overnight in any case.',

    b6ListTitle: 'The order to check things in',
    b6L1: 'Type site: followed by your address into Google and see whether the site is indexed at all',
    b6L2: 'Claim or create the Google Business Profile, with the correct category and opening hours',
    b6L3: 'Check that every page has its own title, description and single main heading',
    b6L4: 'Make the address and phone number on the site match the ones on the profile',
    b6L5: 'Set up Search Console and let it gather data before you change anything',

    b6CloseTitle: 'How long this takes',
    b6Close:
      'The technical part is a matter of hours. If the site is not indexed, the fix and the submission are usually done the same day and Google responds within a few days. A business profile takes an afternoon. What takes time is ranking for terms somebody else is already working on, and the honest frame there is months rather than weeks. If you have worked through this list and the site still does not appear even for its own name, the cause is almost certainly technical and worth looking at before you invest in any kind of optimisation.',
  },
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  Object.assign(j.blog, block)
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  const w = Object.values(block).join(' ').split(/\s+/).filter(Boolean).length
  const d = Object.values(block).filter((v) => v.includes('—')).length
  console.log(`ok   [${lng}] b6: ${Object.keys(block).length} keys, ${w} words, ${d} em-dashes`)
}
