/**
 * The Orebić location page, plus post 08 that supports it.
 *
 * Why a page and not only an article: "izrada web stranica Orebić" is a
 * commercial query, and Google answers those with service and location pages.
 * The article carries the informational half of the same intent and links up.
 *
 * Every claim here is checkable against the project pages. Five of the seven
 * production projects are for businesses on Pelješac, and that is the only
 * quantity this copy asserts. It does NOT claim residence in Orebić, an
 * office, travel, response times or a number of local clients, because none
 * of that is on record. Section 0.7.
 *
 * Post 08 is written as five real projects rather than as advice: b3 already
 * owns tourism content and b6 owns Google visibility, so another set of tips
 * would cannibalise them. Everything in it is drawn from the project copy.
 *
 *   node scripts/apply-location-orebic.mjs
 */
import fs from 'node:fs'

const LOCATIONS = {
  hr: {
    l1Name: 'Orebić i Pelješac',
    l1Title: 'Izrada web stranica za Orebić i Pelješac',
    l1MetaTitle: 'Izrada web stranica Orebić i Pelješac | Martin Bogoje',
    l1MetaDesc:
      'Izrada, redizajn i održavanje web stranica za poslove na Pelješcu: smještaj, kampovi, nekretnine i lokalne usluge. Pet izvedenih projekata u ovom kraju.',
    l1Lead:
      'Pet od sedam stranica koje sam do sada izveo radi za poslove na Pelješcu, od smještaja u Orebiću do kampa u uvali Lovište.',
    l1Area: 'Orebić, Pelješac, Kučište, Viganj, Lovište, Trpanj',

    l1Intro1:
      'Ako vodite smještaj, kamp, agenciju ili obrt na Pelješcu, vaša web stranica ima drukčiji zadatak nego stranica u gradu. Promet je sezonski i koncentriran, velik dio posjetitelja dolazi s mobilnih uređaja i iz inozemstva, često na sporijim mrežama, a odluka o upitu donese se u nekoliko minuta.',
    l1Intro2:
      'Radim izradu, redizajn i održavanje web stranica za poslove u ovom kraju. Do sada sam izveo sedam stranica koje su danas online i u upotrebi, a pet ih je za tvrtke i obrte s Pelješca: smještaj u Orebiću, kamp u uvali Lovište, destinacijski vodič za poluotok, agencija za nekretnine i grafički studio.',
    l1Intro3:
      'Ne radim s predlošcima u koje se ubaci tuđi sadržaj. Svaka od tih stranica složena je oko onoga što taj posao stvarno nudi, na tehnologiji odabranoj prema tome tko će održavati sadržaj nakon isporuke.',

    l1GetTitle: 'Što dobivate',
    l1Get1: 'Stranicu složenu oko vaše ponude, a ne predložak s promijenjenim fotografijama',
    l1Get2: 'Brzo učitavanje na mobilnoj mreži, jer se većina upita šalje s mobitela',
    l1Get3: 'Jezike prema tržištima s kojih vam gosti stvarno dolaze',
    l1Get4: 'Tehničku pripremu za tražilice i postavljen Search Console',
    l1Get5: 'Domenu i hosting na vaše ime, s pristupom koji ostaje kod vas',

    l1ForTitle: 'Za koga radim',
    l1For1: 'Smještaj, apartmane i kampove koji žele upite izravno, bez provizije platformi',
    l1For2: 'Agencije za nekretnine kojima stranica mora nositi ponudu i pretragu',
    l1For3: 'Obrte i lokalne usluge koje se na Googleu ne pojavljuju ni za vlastito ime',
    l1For4: 'Postojeće stranice koje se sporo otvaraju ili ih dvije godine nitko nije dirao',

    l1ServicesTitle: 'Usluge',
    l1ProofTitle: 'Projekti izvedeni u ovom kraju',
    l1ReadTitle: 'Za čitanje prije nego što naručite',

    l1FaqTitle: 'Česta pitanja',
    l1Faq1Q: 'Radite li samo za poslove s Pelješca?',
    l1Faq1A:
      'Ne. Radim za klijente bilo gdje u Hrvatskoj i izvan nje, a ova stranica postoji zato što je najveći dio dosadašnjeg posla ovdje. Prednost je praktična: ne moram objašnjavati zašto je kolovoz drukčiji od travnja ni što gost traži prije nego što uopće krene na put.',
    l1Faq2Q: 'Moramo li se naći uživo?',
    l1Faq2A:
      'Ne mora. Dogovor, razmjena materijala i prikazi napretka mogu ići na daljinu, što je za većinu projekata dovoljno. Ako vam je lakše razgovarati uživo, napišite to u prvoj poruci pa ćemo se dogovoriti.',
    l1Faq3Q: 'Imamo stranicu, ali se ne pojavljuje na Googleu.',
    l1Faq3A:
      'To je čest slučaj i obično ne traži redizajn. Prvo se utvrdi je li stranica uopće indeksirana ili je indeksirana pa slabo rangirana, jer se te dvije stvari rješavaju različito. Pregled postojeće stranice može se napraviti prije nego što se bilo što dogovori, i dobivate popis nalaza čak i ako dalje ne radimo ništa.',
    l1Faq4Q: 'Kada je najbolje vrijeme za izradu?',
    l1Faq4A:
      'Izvan sezone. Zimi imate vremena posložiti fotografije i tekstove, a stranica ima nekoliko mjeseci da je tražilice počnu prikazivati prije nego što promet krene. Stranica objavljena sredinom srpnja propustila je razdoblje u kojem se gosti odlučuju.',
    l1Faq5Q: 'Koliko to košta?',
    l1Faq5A:
      'Ovisi o opsegu, pa su na stranici s cijenama objavljene početne cijene po tipu stranice i objašnjenje što ih pomiče gore ili dolje. Konkretnu procjenu dobivate nakon kratkog razgovora, prije nego što se bilo što dogovori.',

    l1CtaTitle: 'Recite mi što vam treba',
    l1CtaText:
      'Nekoliko rečenica o poslu i o tome što stranica treba postići dovoljno je za procjenu opsega, roka i cijene. Odgovor dobivate bez obveze.',
  },

  en: {
    l1Name: 'Orebić and Pelješac',
    l1Title: 'Website development for Orebić and Pelješac',
    l1MetaTitle: 'Website development in Orebić and Pelješac | Martin Bogoje',
    l1MetaDesc:
      'Building, rebuilding and maintaining websites for businesses on Pelješac: accommodation, campsites, real estate and local services. Five projects delivered here.',
    l1Lead:
      'Five of the seven sites I have delivered work for businesses on Pelješac, from accommodation in Orebić to a campsite in the bay at Lovište.',
    l1Area: 'Orebić, Pelješac, Kučište, Viganj, Lovište, Trpanj',

    l1Intro1:
      'If you run accommodation, a campsite, an agency or a trade on Pelješac, your website has a different job from one in a city. Traffic is seasonal and concentrated, a large share of visitors arrive on phones and from abroad, often on slower networks, and the decision to send an enquiry is made in minutes.',
    l1Intro2:
      'I build, rebuild and maintain websites for businesses in this area. Seven sites I have built are online and in use today, and five of them are for companies and trades on Pelješac: accommodation in Orebić, a campsite in the bay at Lovište, a destination guide for the peninsula, a real estate agency and a graphic design studio.',
    l1Intro3:
      'I do not work from templates with somebody else’s content swapped out. Each of those sites was assembled around what that business actually offers, on technology chosen according to who would be maintaining the content after handover.',

    l1GetTitle: 'What you get',
    l1Get1: 'A site built around your offer, not a template with the photographs changed',
    l1Get2: 'Fast loading on a mobile network, because most enquiries are sent from a phone',
    l1Get3: 'Languages chosen for the markets your guests actually come from',
    l1Get4: 'The technical groundwork for search engines, and Search Console set up',
    l1Get5: 'Domain and hosting in your name, with the access staying with you',

    l1ForTitle: 'Who I work with',
    l1For1: 'Accommodation, apartments and campsites that want enquiries direct, without platform commission',
    l1For2: 'Estate agencies whose site has to carry listings and a search',
    l1For3: 'Trades and local services that do not show up on Google even for their own name',
    l1For4: 'Existing sites that load slowly or that nobody has touched in two years',

    l1ServicesTitle: 'Services',
    l1ProofTitle: 'Projects delivered in this area',
    l1ReadTitle: 'Worth reading before you commission anything',

    l1FaqTitle: 'Common questions',
    l1Faq1Q: 'Do you only work for businesses on Pelješac?',
    l1Faq1A:
      'No. I work with clients anywhere in Croatia and beyond, and this page exists because most of the work so far has been here. The advantage is practical: I do not have to be told why August is different from April, or what a guest is looking for before they even set off.',
    l1Faq2Q: 'Do we have to meet in person?',
    l1Faq2A:
      'Not necessarily. Agreeing scope, exchanging material and reviewing progress can all be done remotely, which is enough for most projects. If you would rather talk in person, say so in your first message and we will arrange it.',
    l1Faq3Q: 'We have a site, but it does not show up on Google.',
    l1Faq3A:
      'That is common and rarely needs a redesign. The first step is establishing whether the site is indexed at all or indexed but ranking poorly, because those two are fixed in completely different ways. A review of the existing site can be done before anything is agreed, and you get the list of findings even if we go no further.',
    l1Faq4Q: 'When is the best time to build?',
    l1Faq4A:
      'Out of season. In winter you have time to sort out photographs and text, and the site has a few months for search engines to start showing it before the traffic arrives. A site published in mid July has missed the period when guests are deciding.',
    l1Faq5Q: 'What does it cost?',
    l1Faq5A:
      'It depends on scope, which is why the pricing page publishes starting prices per type of site along with what moves them up or down. You get a specific estimate after a short conversation, before anything is agreed.',

    l1CtaTitle: 'Tell me what you need',
    l1CtaText:
      'A few sentences about the business and what the site has to achieve is enough to estimate scope, timing and cost. You get an answer with no obligation.',
  },
}

const POST = {
  hr: {
    b8Title: 'Pet web stranica za poslove na Pelješcu',
    b8MetaTitle: 'Web stranice za poslove na Pelješcu: pet primjera',
    b8MetaDesc:
      'Pet stranica izvedenih za poslove na Pelješcu i konkretan problem koji je svaka morala riješiti: brzina, praktični podaci, rast sadržaja i unos ponude.',
    b8Lead:
      'Umjesto općenitih savjeta, pet stranica koje su danas online i problem koji je svaka od njih morala riješiti. Sve su za poslove na Pelješcu.',
    b8Intro:
      'Poslovi na ovom poluotoku dijele nekoliko stvari: promet je sezonski, gosti su većinom stranci, a gotovo svi dolaze s mobitela, često na vezi koja nije brza. Ispod toga se ipak kriju vrlo različiti zadaci. Smještaj mora ostaviti dojam u nekoliko sekundi, kamp mora odgovoriti na tridesetak praktičnih pitanja, a agencija za nekretnine mora omogućiti unos ponude bez developera. Ovo je pregled pet takvih stranica i onoga što je u svakoj bilo teško.',

    b8S1Title: 'Smještaj u Orebiću: galerije protiv brzine',
    b8S1A:
      'Kod turističkog smještaja sadržaj je gotovo isključivo vizualan. Gost želi vidjeti sobu, pogled i okolicu prije nego što pročita ijednu rečenicu, pa su velike galerije nužne. One su ujedno najveći pojedinačni teret za brzinu, a promet dolazi s mobilnih uređaja i iz inozemstva, gdje se svaka nepotrebna sekunda osjeti izravno.',
    b8S1B:
      'Rješenje nije bilo manje fotografija nego drukčije posluživanje: obrada u optimiziranim veličinama i odgođeno učitavanje svega što nije na prvom zaslonu. Struktura vodi posjetitelja linearno kroz smještaj, sadržaje, okolicu i kontakt. WordPress je postavljen tako da vlasnik sam mijenja fotografije i informacije po sezoni, bez tehničkog znanja i bez mene.',

    b8S2Title: 'Kamp u Lovištu: trideset praktičnih pitanja',
    b8S2A:
      'Kamp se bira vizualno, ali odluka pada na detaljima. Kakav je sanitarni čvor, ima li hlada, koliko je more udaljeno, primaju li se kućni ljubimci. To je velika količina praktičnih informacija koja lako pretvori stranicu u popis, a publika je pretežno strana i najčešće pretražuje dok tek planira put.',
    b8S2B:
      'Stranica je izvedena kao jednostranična aplikacija podijeljena u jasne cjeline: dojam lokacije, sadržaji kampa, sanitarni čvor, aktivnosti u okolici i udaljenosti do okolnih mjesta. Sadržaj je višejezičan, galerije se učitavaju postupno, a svaka cjelina završava jasnim putem prema obrascu za upit, jer gost koji je našao odgovor ne smije morati tražiti kako pitati.',

    b8S3Title: 'Vodič za poluotok: sadržaj koji raste',
    b8S3A:
      'Destinacijski vodič ima bitno drukčiji problem od prezentacijske stranice. Sadržaja je mnogo i mora ostati pretraživ, a posjetitelji dolaze s različitim namjerama: plaže, vino, smještaj, aktivnosti. Struktura mora podnijeti rast bez da postane nepregledna, što je zahtjev koji se ne vidi na početku nego nakon druge godine dodavanja sadržaja.',
    b8S3B:
      'Zato je sadržaj organiziran u tematske cjeline s dosljednim predlošcima, tako da svaka nova stranica automatski dobiva ispravnu strukturu naslova i interno povezivanje. Tehnički SEO je ovdje tretiran kao dio arhitekture, a ne kao naknadni dodatak: semantički naslovi, opisne adrese i optimizirane slike. Nove destinacije i teme dodaju se bez razvojnog rada.',

    b8S4Title: 'Nekretnine: ponuda se mijenja svaki tjedan',
    b8S4A:
      'Kod nekretnina je ključno da uređivanje sadržaja ne ovisi o developeru, jer se ponuda stalno mijenja i nitko neće čekati na objavu nove kuće. Istovremeno su stranice s nekretninama slikovno teške, što lako uništi brzinu, a upravo brzina i tehnički SEO odlučuju hoće li se pojedini oglas uopće pronaći na tražilici.',
    b8S4B:
      'Postavljen je WordPress s prilagođenom strukturom sadržaja za nekretnine i predlošcima koji drže dosljedan izgled bez obzira na to tko unosi podatke. Na tehničkoj strani je SEO osnova: hijerarhija naslova, meta podaci, optimizirane slike i čista shema adresa. Raspored je razvijan s naglaskom na mobilni prikaz, jer se ponuda najčešće pregledava s telefona.',

    b8S5Title: 'Grafički studio: stranica koja ne smije zasjeniti radove',
    b8S5A:
      'Studio čiji je posao vizualni identitet ne može imati generičku stranicu, ali ne može ni imati stranicu koja se nameće. Trebalo je pomiriti bogatu vizualnu prezentaciju radova i brzinu na mobilnim uređajima, odakle dolazi većina posjeta, uz strukturu dovoljno fleksibilnu da se nove usluge dodaju bez redizajna.',
    b8S5B:
      'Aplikacija je izgrađena u Reactu, s komponentnom strukturom u kojoj je svaka usluga zaseban i ponovno iskoristiv element. Slike se poslužuju u modernim formatima, raspored je razvijan mobile-first, a naglasak je stavljen na tipografiju i bjelinu kako bi radovi ostali u prvom planu, a sučelje se povuklo u pozadinu.',

    b8ListTitle: 'Što se ponavlja u svih pet',
    b8L1: 'Većina posjeta dolazi s mobitela, često na vezi koja nije brza',
    b8L2: 'Fotografije su i najvažniji sadržaj i najveći teret za brzinu',
    b8L3: 'Vlasnik mora moći mijenjati sadržaj bez razvojnog rada',
    b8L4: 'Gost traži praktične podatke koje stranice najčešće ne daju',
    b8L5: 'Sve je objavljeno na vlastitoj domeni, s pristupom kod klijenta',

    b8CloseTitle: 'Zajednički nazivnik',
    b8Close:
      'Nijedan od tih pet projekata nije bio težak zbog tehnologije. Teško je bilo utvrditi što točno posjetitelj traži i posložiti stranicu oko toga, a zatim je izvesti tako da vlasnik ostane samostalan nakon isporuke. To je ista stvar bez obzira radi li se o kampu, agenciji ili studiju, i to je razlog zašto razgovor uvijek počinje pitanjem što stranica treba postići, a ne pitanjem koju tehnologiju želite.',
  },

  en: {
    b8Title: 'Five websites for businesses on Pelješac',
    b8MetaTitle: 'Websites for businesses on Pelješac: five examples',
    b8MetaDesc:
      'Five sites built for businesses on Pelješac and the specific problem each had to solve: speed, practical detail, growing content and listing management.',
    b8Lead:
      'Instead of general advice, five sites that are online today and the problem each one had to solve. All of them are for businesses on Pelješac.',
    b8Intro:
      'Businesses on this peninsula share a few things: traffic is seasonal, guests are mostly foreign, and nearly all of them arrive on a phone, often on a connection that is not fast. Underneath that, though, the jobs are very different. Accommodation has to make an impression in seconds, a campsite has to answer thirty practical questions, and an estate agency has to let staff publish listings without a developer. This is a walk through five of them and what was actually hard in each.',

    b8S1Title: 'Accommodation in Orebić: galleries against speed',
    b8S1A:
      'For tourist accommodation the content is almost entirely visual. A guest wants to see the room, the view and the surroundings before reading a single sentence, so large galleries are unavoidable. They are also the single heaviest load on speed, and the traffic arrives on phones and from abroad, where every unnecessary second is felt directly.',
    b8S1B:
      'The answer was not fewer photographs but different delivery: processing them at optimised sizes and deferring everything below the first screen. The structure walks the visitor through the accommodation, the facilities, the area and the contact details in order. WordPress was configured so the owner changes photographs and seasonal information without technical knowledge and without me.',

    b8S2Title: 'A campsite at Lovište: thirty practical questions',
    b8S2A:
      'A campsite is chosen visually, but the decision comes down to details. What the washblock is like, whether there is shade, how far the sea is, whether pets are allowed. That is a large volume of practical information that easily turns a site into a list, and the audience is mostly foreign and usually searching while still planning the trip.',
    b8S2B:
      'The site was built as a single-page application split into clear blocks: the feel of the location, the facilities, the washblock, activities nearby and distances to surrounding places. The content is multilingual, galleries load progressively, and every block ends with a clear route to the enquiry form, because a guest who has found their answer should not then have to hunt for how to ask.',

    b8S3Title: 'A guide to the peninsula: content that grows',
    b8S3A:
      'A destination guide has a fundamentally different problem from a presentation site. There is a lot of content and it has to stay findable, and visitors arrive with different intentions: beaches, wine, accommodation, activities. The structure has to survive growth without becoming unnavigable, which is a requirement you do not see at the start but two years into adding content.',
    b8S3B:
      'So the content is organised into themed sections with consistent templates, which means every new page automatically gets the right heading structure and internal linking. Technical SEO was treated as part of the architecture rather than something added afterwards: semantic headings, descriptive addresses and optimised images. New destinations and topics get added with no development work.',

    b8S4Title: 'Real estate: the listings change every week',
    b8S4A:
      'With property the critical thing is that editing content does not depend on a developer, because the listings change constantly and nobody will wait for a new house to be published. At the same time property pages are image-heavy, which easily destroys loading speed, and speed and technical SEO are exactly what decide whether an individual listing gets found at all.',
    b8S4B:
      'WordPress was set up with a content structure built for property and templates that hold a consistent layout regardless of who enters the data. On the technical side, the SEO groundwork: heading hierarchy, meta data, optimised images and a clean address scheme. The layout was developed with the mobile view first, because listings are usually browsed on a phone.',

    b8S5Title: 'A design studio: the site must not upstage the work',
    b8S5A:
      'A studio whose business is visual identity cannot have a generic site, but it also cannot have a site that draws attention to itself. It had to reconcile a rich visual presentation of the work with speed on mobile devices, where most of the visits come from, and a structure flexible enough to add new services without a redesign.',
    b8S5B:
      'The application was built in React, with a component structure in which each service is a separate, reusable element. Images are served in modern formats, the layout was developed mobile-first, and the emphasis went on typography and white space so the studio’s work stays in front and the interface steps back.',

    b8ListTitle: 'What repeats across all five',
    b8L1: 'Most visits arrive on a phone, often on a connection that is not fast',
    b8L2: 'Photographs are both the most important content and the heaviest load',
    b8L3: 'The owner has to be able to change content without development work',
    b8L4: 'Guests want practical detail that most sites never give them',
    b8L5: 'Everything is published on its own domain, with access held by the client',

    b8CloseTitle: 'The common denominator',
    b8Close:
      'None of those five projects was hard because of the technology. What was hard was working out precisely what the visitor was looking for, arranging the site around that, and then building it so the owner stays independent after handover. That is the same problem whether it is a campsite, an agency or a studio, and it is why the conversation always starts with what the site has to achieve rather than which technology you want.',
  },
}

for (const lng of ['hr', 'en']) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  j.locations = { ...(j.locations ?? {}), ...LOCATIONS[lng] }
  Object.assign(j.blog, POST[lng])
  // Tag labels for the new post.
  j.blog.tags = {
    ...j.blog.tags,
    peljesac: 'Pelješac',
  }
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')

  const all = { ...LOCATIONS[lng], ...POST[lng] }
  const w = Object.values(all).join(' ').split(/\s+/).filter(Boolean).length
  const d = Object.values(all).filter((v) => v.includes('—')).length
  console.log(
    `ok   [${lng}] location l1: ${Object.keys(LOCATIONS[lng]).length} keys, ` +
      `post b8: ${Object.keys(POST[lng]).length} keys, ${w} words, ${d} em-dashes`,
  )
}
