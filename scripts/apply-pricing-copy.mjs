/**
 * Copy for the cost guide / price list page, Croatian and English.
 *
 *   node scripts/apply-pricing-copy.mjs
 */
import fs from 'node:fs'

const COPY = {
  hr: {
    metaTitle: 'Koliko košta izrada web stranice | Cjenik | Martin Bogoje',
    metaDesc:
      'Koliko stvarno košta izrada web stranice u Hrvatskoj: početne cijene, što utječe na cijenu i što je uključeno. Bez skrivenih troškova.',
    label: 'Cjenik',
    title: 'Koliko košta izrada web stranice',
    lead: 'Većina stranica na ovo pitanje odgovara sa "ovisi" i ostavi vas bez ijedne brojke. Ovdje su početne cijene i, važnije, objašnjenje što ih pomiče gore ili dolje.',
    intro1:
      'Cijena web stranice u Hrvatskoj kreće se od nekoliko stotina eura za jednostavnu prezentacijsku stranicu do nekoliko tisuća za sustave s vlastitom logikom. Taj raspon nije marketinški trik nego posljedica toga da se pod istim imenom prodaju vrlo različite stvari: prilagodba gotovog predloška i stranica projektirana za konkretan posao nisu isti proizvod.',
    intro2:
      'Ono što slijedi su početne cijene, ne ponude. Konačna brojka ovisi o opsegu, a opseg se zna tek nakon kratkog razgovora. Radije ću vam reći da je projekt manji nego što ste mislili nego naplatiti paket u kojem polovica stavki nikome ne treba.',

    tableTitle: 'Početne cijene',
    tableNote:
      'Cijene su početne, izražene u eurima i bez PDV-a. Svaki projekt dobiva konkretnu ponudu nakon razgovora o opsegu.',
    colService: 'Usluga',
    colFrom: 'Cijena',
    from: 'od',
    perMonth: '/mj',
    perHour: '/h',

    landingName: 'Landing stranica',
    landingDesc: 'Jedna stranica s jednim ciljem: prijava, upit ili predstavljanje ponude.',
    presentationName: 'Prezentacijska stranica',
    presentationDesc: 'Do desetak stranica za obrt ili malu tvrtku, s osnovnim tehničkim SEO-om.',
    businessName: 'Poslovna stranica',
    businessDesc: 'Veći sadržajni sustav, više jezika ili katalog ponude koji raste.',
    shopName: 'Web shop',
    shopDesc: 'Prodaja putem WooCommercea, s postavljanjem plaćanja i dostave.',
    auditName: 'Pregled i optimizacija',
    auditDesc: 'Analiza brzine i tehničkog SEO-a postojeće stranice, s popisom nalaza po utjecaju.',
    maintenanceName: 'Održavanje',
    maintenanceDesc: 'Ažuriranja, sigurnosne kopije, sitne izmjene i praćenje brzine.',
    hourlyName: 'Satnica za izmjene',
    hourlyDesc: 'Za poslove izvan dogovorenog opsega ili povremene dorade.',

    factorsTitle: 'Što pomiče cijenu',
    factorsIntro:
      'Cijena gotovo nikad ne ovisi o tome koliko stranica "izgleda lijepo", nego o ovih šest stvari:',
    pagesTitle: 'Broj stranica.',
    pagesText:
      'Svaka nova stranica nosi dizajn, sadržaj i provjeru. Deset stranica nije deset puta skuplje od jedne, ali nije ni isto.',
    cmsTitle: 'Tko uređuje sadržaj.',
    cmsText:
      'Ako sadržaj mijenjate sami, treba sustav za uređivanje i to je dodatan posao. Ako se sadržaj ne mijenja, statična izvedba je jeftinija i brža.',
    contentTitle: 'Spremnost sadržaja.',
    contentText:
      'Najveći skriveni trošak. Ako tekstovi i fotografije postoje na početku, projekt teče. Ako ih pišemo usput, traje dulje i košta više.',
    languagesTitle: 'Broj jezika.',
    languagesText:
      'Svaki jezik znači vlastite adrese, prijevode i provjeru. Dodavanje jezika kasnije skuplje je nego planirati ga odmah.',
    shopTitle: 'Prodaja.',
    shopText:
      'Web shop uvodi plaćanja, dostavu, poreze i stanja zaliha. To je zaseban sloj složenosti, ne dodatna stranica.',
    integrationsTitle: 'Integracije.',
    integrationsText:
      'Rezervacijski sustavi, CRM, newsletter ili vanjski katalozi traže povezivanje i testiranje, i najčešće su ono što projekt pomakne u viši razred.',

    includedTitle: 'Što je uvijek uključeno',
    inc1: 'Responzivan prikaz i provjera na stvarnim uređajima',
    inc2: 'Tehnička SEO osnova: naslovi, meta podaci, sitemap i čiste adrese',
    inc3: 'Optimizirane slike i provjera brzine prije isporuke',
    inc4: 'Postavljanje na domenu i upute za samostalno održavanje',
    extraTitle: 'Što se plaća zasebno',
    extra:
      'Domena i hosting plaćaju se davatelju usluge, ne meni, i tipično iznose 10 do 50 eura godišnje za domenu te 50 do 200 eura godišnje za hosting. Profesionalno fotografiranje, lektura i plaćeni oglasi također nisu uključeni, ali reći ću vam kada mislim da se isplate.',

    faqTitle: 'Česta pitanja o cijeni',
    faq1Q: 'Zašto ne postoji fiksna cijena?',
    faq1A:
      'Zato što bi bila netočna. Prezentacijska stranica s pet stranica i katalog s dvjesto proizvoda dijele samo ime. Fiksni paketi obično znače da plaćate stavke koje vam ne trebaju, ili da se ono što vam treba naplati kao doplata.',
    faq2Q: 'Zašto su vaše cijene niže od agencijskih?',
    faq2A:
      'Jer nema režije agencije. Radite direktno sa mnom, bez voditelja projekta i bez marže na tuđi rad. To ima i drugu stranu: radim ograničen broj projekata odjednom, pa termin ovisi o tome što je trenutačno u radu.',
    faq3Q: 'Kako izgleda plaćanje?',
    faq3A:
      'Uobičajeno je podjela na dva dijela: dio na početku, ostatak po isporuci. Za veće projekte dogovaramo faze. Sve se piše u ponudi prije početka, pa nema iznenađenja na kraju.',
    faq4Q: 'Što ako mi treba nešto što nije na popisu?',
    faq4A:
      'Javite se s opisom. Ako je izvedivo, dobivate ponudu. Ako nije moj posao ili mislim da vam netko drugi to može bolje napraviti, reći ću vam i to.',

    ctaTitle: 'Recite mi što trebate',
    ctaText:
      'Nekoliko rečenica o projektu dovoljno je za procjenu opsega, roka i cijene. Odgovor dobivate bez obveze.',
  },

  en: {
    metaTitle: 'How much does a website cost | Pricing | Martin Bogoje',
    metaDesc:
      'What a website actually costs in Croatia: starting prices, what moves the number up or down, and what is included. No hidden extras.',
    label: 'Pricing',
    title: 'How much does a website cost',
    lead: 'Most sites answer this with "it depends" and leave you without a single figure. Here are the starting prices and, more usefully, what moves them.',
    intro1:
      'Website prices in Croatia run from a few hundred euros for a simple presentation site to several thousand for systems with their own logic. That range is not a sales tactic; it reflects the fact that very different things get sold under the same name. Adapting a template and designing a site around a specific business are not the same product.',
    intro2:
      'What follows are starting prices, not quotes. The final figure depends on scope, and scope is only knowable after a short conversation. I would rather tell you the project is smaller than you expected than sell you a package where half the line items serve nobody.',

    tableTitle: 'Starting prices',
    tableNote:
      'Starting prices in euros, excluding VAT. Every project gets a concrete quote once the scope is clear.',
    colService: 'Service',
    colFrom: 'Price',
    from: 'from',
    perMonth: '/mo',
    perHour: '/h',

    landingName: 'Landing page',
    landingDesc: 'One page with one goal: a sign-up, an enquiry, or presenting a single offer.',
    presentationName: 'Presentation website',
    presentationDesc: 'Up to about ten pages for a small business, with technical SEO groundwork.',
    businessName: 'Business website',
    businessDesc: 'A larger content system, several languages, or a catalogue that keeps growing.',
    shopName: 'Web shop',
    shopDesc: 'Selling through WooCommerce, including payment and delivery setup.',
    auditName: 'Audit and optimisation',
    auditDesc: 'Speed and technical SEO review of an existing site, with findings ordered by impact.',
    maintenanceName: 'Maintenance',
    maintenanceDesc: 'Updates, backups, small changes and ongoing speed monitoring.',
    hourlyName: 'Hourly rate for changes',
    hourlyDesc: 'For work outside an agreed scope, or occasional adjustments.',

    factorsTitle: 'What moves the price',
    factorsIntro:
      'The price almost never depends on how good a site "looks". It depends on these six things:',
    pagesTitle: 'Number of pages.',
    pagesText:
      'Each page carries design, content and checking. Ten pages is not ten times one, but it is not the same either.',
    cmsTitle: 'Who edits the content.',
    cmsText:
      'If you edit it yourself you need an editing system, and that is additional work. If the content does not change, a static build is cheaper and faster.',
    contentTitle: 'Content readiness.',
    contentText:
      'The largest hidden cost. If the text and photography exist at the start, the project flows. If we write them along the way, it takes longer and costs more.',
    languagesTitle: 'Number of languages.',
    languagesText:
      'Each language means its own URLs, translation and checking. Adding one later costs more than planning for it from the start.',
    shopTitle: 'Selling online.',
    shopText:
      'A shop introduces payments, delivery, tax and stock levels. That is a separate layer of complexity, not an extra page.',
    integrationsTitle: 'Integrations.',
    integrationsText:
      'Booking systems, CRM, newsletters or external catalogues need connecting and testing, and are usually what pushes a project into a higher bracket.',

    includedTitle: 'Always included',
    inc1: 'Responsive layout, checked on real devices',
    inc2: 'Technical SEO groundwork: headings, meta data, sitemap and clean URLs',
    inc3: 'Optimised images and a speed check before handover',
    inc4: 'Deployment to your domain, with documentation for maintaining it',
    extraTitle: 'Charged separately',
    extra:
      'Domain and hosting are paid to the provider rather than to me, and typically run 10 to 50 euros a year for a domain and 50 to 200 a year for hosting. Professional photography, copy-editing and paid advertising are not included either, though I will tell you when I think they are worth it.',

    faqTitle: 'Questions about price',
    faq1Q: 'Why is there no fixed price?',
    faq1A:
      'Because it would be wrong. A five-page presentation site and a catalogue of two hundred products share only a name. Fixed packages usually mean paying for line items you do not need, or being charged extra for the one you do.',
    faq2Q: 'Why are your prices lower than an agency’s?',
    faq2A:
      'Because there is no agency overhead. You work with me directly, with no project manager in between and no margin on somebody else’s work. There is a trade-off: I take on a limited number of projects at once, so the start date depends on what is already running.',
    faq3Q: 'How does payment work?',
    faq3A:
      'Usually split in two: part at the start, the rest on delivery. Larger projects are split into phases. All of it is written into the quote before anything begins, so there are no surprises at the end.',
    faq4Q: 'What if I need something not on the list?',
    faq4A:
      'Send a description. If it is feasible you get a quote. If it is not my kind of work, or I think somebody else would do it better, I will tell you that too.',

    ctaTitle: 'Tell me what you need',
    ctaText:
      'A few sentences about the project is enough to estimate scope, timeline and price. You get an answer with no obligation.',
  },
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  j.pricingPage = block
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  const words = Object.values(block).join(' ').split(/\s+/).filter(Boolean).length
  console.log(`ok   [${lng}] pricingPage: ${Object.keys(block).length} keys, ${words} words`)
}
