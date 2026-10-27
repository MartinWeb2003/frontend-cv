/**
 * Original research post (b9): speed and health of Croatian coastal tourism
 * websites, measured 27 October 2026. Every number below comes from the
 * measurement (results.json in the study working folder) and is restated in
 * the downloadable anonymised CSV. No figure is estimated or rounded upward.
 *
 * Wording rules for this post: lab results are called lab results ("u
 * Googleovom Lighthouse testu"), the booking-engine count is a lower bound,
 * and nothing is said about causes that were not measured.
 *
 *   node scripts/apply-speed-study-copy.mjs
 */
import fs from 'node:fs'

const POST = {
  b9Title: {
    hr: 'Koliko su brze turističke web stranice u Hrvatskoj: analiza 1.194 stranice (2026.)',
    en: 'How fast are tourism websites in Croatia? An analysis of 1,194 sites (2026)',
  },
  b9MetaTitle: {
    hr: 'Brzina turističkih web stranica u Hrvatskoj 2026: analiza',
    en: 'Croatian tourism website speed study 2026: 1,194 sites',
  },
  b9MetaDesc: {
    hr: 'Izmjerio sam 1.194 stranice smještaja i kampova na Jadranu. Svaka peta ne radi, a glavni sadržaj na mobitelu pojavi se tek nakon 9,2 s. Podaci i metoda.',
    en: 'I measured 1,194 accommodation and campsite sites on the Croatian coast. One in five does not work; on mobile, main content takes a median 9.2 s to show.',
  },
  b9Lead: {
    hr: 'Provjerio sam 1.194 web stranice hotela, apartmana, kampova i agencija na hrvatskoj obali. Gotovo svaka peta uopće ne radi, a kod onih koje rade glavni se sadržaj na mobitelu pojavi tek nakon 9,2 sekunde.',
    en: 'I checked 1,194 websites of hotels, apartments, campsites and agencies on the Croatian coast. Almost one in five does not work at all, and on the ones that do, the main content takes a median 9.2 seconds to appear on a phone.',
  },
  b9Intro: {
    hr: 'Gost danas bira smještaj na mobitelu, a odluka pada u nekoliko sekundi. Zato sam u listopadu 2026. izmjerio kako se ponašaju stvarne stranice turističkih objekata na obali: rade li uopće, jesu li sigurne, prilagođene mobitelu i koliko se brzo učitavaju. Svi brojevi u nastavku dolaze iz tog mjerenja, a anonimizirani podaci dostupni su za preuzimanje na dnu članka.',
    en: 'Guests now choose where to stay on a phone, and they decide within seconds. So in October 2026 I measured how real tourism websites on the coast actually behave: whether they work at all, whether they are secure and mobile-ready, and how fast they load. Every number below comes from that measurement, and the anonymised data can be downloaded at the end of the article.',
  },

  b9F1Value: { hr: '18,4 %', en: '18.4%' },
  b9F1Label: {
    hr: 'navedenih web stranica ne radi: domena je istekla ili stranica vraća grešku (220 od 1.194).',
    en: 'of listed websites do not work: the domain has lapsed or the site returns an error (220 of 1,194).',
  },
  b9F2Value: { hr: '9,2 s', en: '9.2 s' },
  b9F2Label: {
    hr: 'medijan vremena do prikaza glavnog sadržaja na mobitelu (LCP) u Googleovom Lighthouse testu.',
    en: 'median time to show the main content on mobile (LCP) in Google’s Lighthouse test.',
  },
  b9F3Value: { hr: '6,1 %', en: '6.1%' },
  b9F3Label: {
    hr: 'stranica postiže Googleovu preporuku za LCP od 2,5 sekunde ili manje.',
    en: 'of sites meet Google’s recommended LCP of 2.5 seconds or less.',
  },
  b9F4Value: { hr: '3,2 MB', en: '3.2 MB' },
  b9F4Label: {
    hr: 'medijan veličine početne stranice; svaka treća prelazi 5 MB.',
    en: 'median homepage weight; one in three exceeds 5 MB.',
  },

  b9S1Title: { hr: 'Kako je provedeno mjerenje', en: 'How the measurement was done' },
  b9S1A: {
    hr: 'Uzorak čine sve turističke tvrtke s navedenom web stranicom u OpenStreetMapu za sedam jadranskih županija: Istarsku, Primorsko-goransku, Ličko-senjsku, Zadarsku, Šibensko-kninsku, Splitsko-dalmatinsku i Dubrovačko-neretvansku (Geofabrikov izvod od 26. listopada 2026.). To su hoteli, apartmani, pansioni, kampovi, hosteli i agencije za nekretnine. Nakon uklanjanja duplikata te profila na Facebooku ili Bookingu ostalo je 1.194 jedinstvenih domena.',
    en: 'The sample is every tourism business with a website listed in OpenStreetMap for the seven Adriatic counties: Istria, Primorje-Gorski Kotar, Lika-Senj, Zadar, Šibenik-Knin, Split-Dalmatia and Dubrovnik-Neretva (Geofabrik extract of 26 October 2026). That covers hotels, apartments, guest houses, campsites, hostels and estate agencies. After removing duplicates and Facebook or Booking.com profiles, 1,194 unique domains remained.',
  },
  b9S1B: {
    hr: 'Svaku sam početnu stranicu otvorio i zabilježio radi li, koristi li HTTPS, ima li mobilni prikaz, na kojoj je platformi i ima li prepoznatljiv sustav za izravne rezervacije. Na nasumičnom uzorku od 400 stranica koje rade pokrenuo sam Google Lighthouse 13.5 u mobilnom načinu, sa simuliranom sporijom mobilnom vezom kakvu koristi i PageSpeed Insights; 394 mjerenja su uspjela. Laboratorijski test strožiji je od iskustva gosta na brzom Wi-Fiju, ali je jednak za sve stranice, pa su usporedbe poštene.',
    en: 'I opened every homepage and recorded whether it works, uses HTTPS, has a mobile layout, which platform it runs on, and whether it shows a recognisable direct booking system. On a random sample of 400 working sites I ran Google Lighthouse 13.5 in mobile mode, with the same simulated slower mobile connection PageSpeed Insights uses; 394 runs succeeded. A lab test is stricter than a guest on fast Wi-Fi, but it is identical for every site, so the comparisons are fair.',
  },
  b9S2Title: { hr: 'Gotovo svaka peta stranica ne radi', en: 'Almost one in five sites does not work' },
  b9S2A: {
    hr: 'Od 1.194 navedenih adresa, njih 220 (18,4 %) ne radi: kod 163 domena više uopće ne postoji, a ostale vraćaju grešku poput 404 ili 500. Svaku neuspjelu stranicu provjerio sam ponovno, i na osnovnoj domeni, a nejasne slučajeve, poput blokiranog pristupa ili privremene greške, nisam ubrojio. Takvih je bilo još 46.',
    en: 'Of the 1,194 listed addresses, 220 (18.4%) do not work: for 163 the domain no longer exists at all, and the rest return an error such as 404 or 500. I rechecked every failed site, including at its root domain, and did not count unclear cases such as blocked access or a temporary error. There were another 46 of those.',
  },
  b9S2B: {
    hr: 'Za objekt to znači da gost koji ga pronađe na karti ili u vodiču klikne na poveznicu i ne dobije ništa. Vlasnik pritom često i ne zna da mu je domena istekla, jer stranicu sam rijetko otvara.',
    en: 'For the business, that means a guest who finds it on a map or in a guide clicks the link and gets nothing. The owner often does not even know the domain has lapsed, because they rarely open their own site.',
  },
  b9S3Title: { hr: 'Na mobitelu se stranice učitavaju sporo', en: 'On a phone, the sites load slowly' },
  b9S3A: {
    hr: 'Medijan vremena do prikaza glavnog sadržaja (Largest Contentful Paint) iznosi 9,2 sekunde. Googleovu preporuku od 2,5 sekunde ili manje zadovoljava tek 6,1 % stranica, a kod 46,4 % glavni sadržaj stigne tek nakon više od 10 sekundi. Medijan Lighthouse ocjene brzine je 56 od 100, a 90 ili više postiže samo 6,1 % stranica.',
    en: 'The median time to show the main content (Largest Contentful Paint) is 9.2 seconds. Only 6.1% of sites meet Google’s recommendation of 2.5 seconds or less, and on 46.4% the main content takes more than 10 seconds. The median Lighthouse performance score is 56 out of 100, and only 6.1% of sites score 90 or more.',
  },
  b9S3B: {
    hr: 'Najsporiji su kampovi, s medijanom od 12,5 sekundi, dok su apartmani i pansioni oko 8 sekundi. Platforma pritom nije presudna: stranice na WordPressu i one izrađene drugačije imaju gotovo jednake rezultate (medijan ocjene 55 i 59). Razlika je u tome kako je stranica izrađena i održavana, a ne na čemu.',
    en: 'Campsites are the slowest, with a median of 12.5 seconds, while apartments and guest houses sit around 8 seconds. The platform is not what decides it: sites on WordPress and sites built otherwise score almost the same (median scores of 55 and 59). The difference is in how a site is built and maintained, not what it runs on.',
  },
  b9S4Title: { hr: 'Teške stranice, sigurnost i mobilni prikaz', en: 'Heavy pages, security and mobile layout' },
  b9S4A: {
    hr: 'Medijan veličine početne stranice je 3,2 MB, a svaka treća (32,2 %) prelazi 5 MB. Na mobilnoj vezi svaki megabajt produžuje čekanje, a gost na plaži ili u autu ima najsporiju vezu upravo kad traži smještaj.',
    en: 'The median homepage weighs 3.2 MB, and one in three (32.2%) exceeds 5 MB. On a mobile connection every megabyte adds to the wait, and a guest on the beach or in the car has the slowest connection exactly when they are looking for somewhere to stay.',
  },
  b9S4B: {
    hr: 'Bez HTTPS-a radi 15,1 % stranica koje se otvaraju, pa ih preglednik označava kao nesigurne, a 8,6 % nema osnovnu oznaku za prilagodbu mobitelu. Obje stvari Google uzima u obzir, a gost ih primijeti odmah.',
    en: '15.1% of the sites that open run without HTTPS, so browsers mark them as not secure, and 8.6% lack the basic tag that adapts a page to a phone. Google takes both into account, and a guest notices both immediately.',
  },
  b9S5Title: { hr: 'Izravne rezervacije', en: 'Direct bookings' },
  b9S5A: {
    hr: 'Sustav za izravne rezervacije mogao sam prepoznati na 31,1 % stranica koje rade. To je donja granica, jer se neki sustavi ne vide u kodu početne stranice, ali sugerira da velik dio objekata izravnu rezervaciju ne nudi na samoj stranici.',
    en: 'I could detect a direct booking system on 31.1% of working sites. That is a lower bound, because some systems do not show in a homepage’s code, but it suggests that a large share of businesses do not offer direct booking on their own site.',
  },
  b9S5B: {
    hr: 'Platforme poput Bookinga uzimaju 15 do 25 % svake rezervacije. Brza stranica koja radi i nudi rezervaciju na prvom ekranu jedan je od rijetkih načina da dio tog novca ostane objektu; izračun za vlastite brojke nalazi se u cjeniku.',
    en: 'Platforms such as Booking.com take 15 to 25% of every booking. A fast site that works and offers booking on the first screen is one of the few ways to keep part of that money; you can run the numbers for your own business in the pricing guide.',
  },
  b9ListTitle: {
    hr: 'Pet stvari koje danas možete provjeriti na svojoj stranici',
    en: 'Five things you can check on your own site today',
  },
  b9L1: {
    hr: 'Otvorite je na mobitelu preko mobilnih podataka, ne Wi-Fija, i izmjerite koliko dugo čekate glavnu fotografiju.',
    en: 'Open it on a phone over mobile data, not Wi-Fi, and time how long the main photo takes.',
  },
  b9L2: {
    hr: 'Provjerite datum isteka domene i SSL certifikata i uključite automatsko obnavljanje.',
    en: 'Check when your domain and SSL certificate expire, and turn on automatic renewal.',
  },
  b9L3: {
    hr: 'Upišite adresu u PageSpeed Insights (pagespeed.web.dev) i pogledajte LCP za mobitel.',
    en: 'Enter your address in PageSpeed Insights (pagespeed.web.dev) and look at the mobile LCP.',
  },
  b9L4: {
    hr: 'Provjerite veličinu najveće fotografije na početnoj stranici; sve iznad 300 KB vrijedi smanjiti.',
    en: 'Check the size of the largest photo on your homepage; anything over 300 KB is worth shrinking.',
  },
  b9L5: {
    hr: 'Pogledajte vidi li gost mogućnost rezervacije ili upita bez pomicanja stranice.',
    en: 'See whether a guest can find booking or an enquiry form without scrolling.',
  },
  b9CloseTitle: { hr: 'Što ovo znači', en: 'What this means' },
  b9Close: {
    hr: 'Kvaliteta turističkih web stranica na Jadranu jako varira, a velik dio njih gubi goste prije nego što se uopće učita. Ako želite znati gdje vaša stranica stoji u odnosu na ove brojke, javite se: pregled brzine i tehničkog SEO-a radim kao zasebnu uslugu.',
    en: 'The quality of tourism websites on the Adriatic varies widely, and many of them lose guests before they even load. If you want to know where your site stands against these numbers, get in touch: a speed and technical SEO review is a separate service I offer.',
  },
}

const BLOG = {
  findingsTitle: { hr: 'Ključni nalazi', en: 'Key findings' },
  datasetLink: { hr: 'Preuzmite anonimizirane podatke (CSV)', en: 'Download the anonymised data (CSV)' },
  datasetNote: {
    hr: 'bez naziva i adresa objekata, uz licencu CC BY 4.0.',
    en: 'without business names or addresses, licensed CC BY 4.0.',
  },
}

for (const lng of ['hr', 'en']) {
  const file = `src/locales/${lng}.json`
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  for (const [k, v] of Object.entries(POST)) data.blog[k] = v[lng]
  for (const [k, v] of Object.entries(BLOG)) data.blog[k] = v[lng]
  data.blog.tags.research = lng === 'hr' ? 'Istraživanje' : 'Research'
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`  ${file}`)
}
