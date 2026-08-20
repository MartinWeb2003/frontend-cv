/**
 * Post 04: why website quotes vary so widely.
 *
 * Supports /cjenik/ rather than a service page. The angle is deliberately
 * distinct from the pricing page to avoid cannibalisation: that page answers
 * "what does it cost", this one answers "why did I get 300 and 3000 for the
 * same brief, and how do I compare them".
 *
 *   node scripts/apply-blog-b4.mjs
 */
import fs from 'node:fs'

const COPY = {
  hr: {
    b4Title: 'Zašto se ponude za web stranicu razlikuju od 300 do 5.000 eura',
    b4MetaTitle: 'Zašto se ponude za web stranicu toliko razlikuju',
    b4MetaDesc:
      'Poslali ste isti upit na tri adrese i dobili ponude od 300, 1.200 i 4.000 eura. Evo što te brojke zapravo znače i kako ih usporediti.',
    b4Lead:
      'Poslali ste isti opis na tri adrese i dobili tri ponude koje se razlikuju deset puta. Nitko nije pogriješio u računu; jednostavno nisu ponudili istu stvar.',
    b4Intro:
      'Ovo je vjerojatno najfrustrirajniji dio naručivanja web stranice. Kod većine usluga raspon ponuda je dvadeset ili trideset posto, a ovdje zna biti deset puta. Razlog nije u tome što vas netko pokušava prevariti, nego u tome što izraz "web stranica" pokriva proizvode koji nemaju gotovo ništa zajedničko osim imena. Evo kako te ponude izgledaju iznutra i što napraviti da postanu usporedive.',

    b4S1Title: 'Ista rečenica, tri različita proizvoda',
    b4S1A:
      'Kada napišete "trebam web stranicu za svoj obrt", jedan ponuditelj to čuje kao instalaciju gotovog predloška s vašim logotipom i tekstom. Drugi kao stranicu složenu oko vašeg sadržaja, s dizajnom koji netko stvarno crta. Treći kao projekt u kojem se prvo istražuje tko su vam kupci pa se struktura gradi oko toga.',
    b4S1B:
      'Sva tri odgovora su legitimna. Sva tri završe s nečim što se otvara u pregledniku i ima vaš logotip gore lijevo. Razlika je u tome koliko je sati nečijeg rada unutra, i tu se krije gotovo cijeli raspon cijene. Prije nego što usporedite brojke, morate znati koji od ta tri proizvoda ste zapravo dobili u ponudi.',

    b4S2Title: 'Što jeftina ponuda obično ne uključuje',
    b4S2A:
      'Ponuda od dvjesto ili tristo eura gotovo uvijek znači predložak. To nije samo po sebi loše: za obrtnika kojem treba mjesto na internetu s kontaktom i opisom usluge, predložak može biti potpuno razuman izbor. Problem nastaje kada očekujete nešto drugo, a ne pitate.',
    b4S2B:
      'Ono što u toj cijeni najčešće nije: tekstovi, jer se očekuje da ih pošaljete gotove, obrada fotografija, tehnički SEO iznad osnovnog, prilagodba predloška izvan boja i logotipa, te bilo kakva podrška nakon isporuke. Nijedno od toga nije skriveno ako pitate. Postaje skriveno ako pretpostavite da je uključeno.',

    b4S3Title: 'Što skupa ponuda uključuje, a možda vam ne treba',
    b4S3A:
      'Na drugom kraju, ponuda od nekoliko tisuća eura obično uključuje stvari koje se u jeftinoj ni ne spominju: istraživanje, više krugova dizajna, pisanje tekstova, vlastiti sustav za uređivanje sadržaja, integracije s postojećim alatima i podršku kroz dogovoreno razdoblje. Za tvrtku kojoj stranica donosi upite svaki dan, to je opravdano.',
    b4S3B:
      'Za obrt s pet stranica sadržaja često nije. Skupa ponuda nije prevara jednako kao što jeftina nije uvijek loša; samo je namijenjena drugom problemu. Vrijedi pitati koje stavke možete izbaciti i što se time gubi. Ozbiljan ponuditelj odgovorit će konkretno, a ne braniti paket u komadu.',

    b4S4Title: 'Troškovi koji dolaze nakon isporuke',
    b4S4A:
      'Dio razlike u ponudama nije u samoj izradi nego u onome što slijedi. Domena i hosting su godišnji trošak koji plaćate davatelju usluge, obično deset do pedeset eura za domenu i pedeset do dvjesto za hosting. Neki ponuditelji to uključe u prvu godinu pa ponuda izgleda skuplje, drugi ne spomenu pa izgleda jeftinije.',
    b4S4B:
      'Zatim dolazi održavanje. WordPress traži redovita ažuriranja, a svaku izmjenu sadržaja koju ne možete napraviti sami netko naplaćuje. Ponuda koja ne kaže ništa o tome što se događa nakon isporuke nije jeftinija, nego samo nepotpuna. Pitajte tko drži domenu, tko hosting i koliko košta izmjena teksta za pola godine.',

    b4S5Title: 'Kako izjednačiti ponude da ih možete usporediti',
    b4S5A:
      'Jedini način da ponude postanu usporedive je da svima pošaljete isti, konkretan opis. Ne "trebam web stranicu", nego popis stranica koje očekujete, tko će mijenjati sadržaj, treba li stranica biti na više jezika, imate li tekstove i fotografije spremne, i do kada mora biti gotova.',
    b4S5B:
      'S tim opisom razlike u ponudama prestaju biti misterija i postaju informacija: netko je uključio pisanje tekstova, netko nije, netko računa dva kruga izmjena, netko neograničeno. Tada birate prema tome što vam stvarno treba, a ne prema tome tko je napisao manji broj.',

    b4ListTitle: 'Pet pitanja koja postavite svakom ponuditelju',
    b4L1: 'Je li ovo prilagodba predloška ili dizajn rađen za mene, i koliko krugova izmjena je uključeno',
    b4L2: 'Tko piše tekstove i tko obrađuje fotografije',
    b4L3: 'Mogu li sam mijenjati sadržaj nakon isporuke, i ako da, kroz što',
    b4L4: 'Na čije ime idu domena i hosting i koliko koštaju godišnje',
    b4L5: 'Što se plaća nakon isporuke i po kojoj cijeni',

    b4CloseTitle: 'Kada je najjeftinija ponuda točan odgovor',
    b4Close:
      'Češće nego što se misli. Ako vam treba mjesto na internetu s kontaktom, opisom usluge i nekoliko fotografija, i nemate namjeru mijenjati sadržaj svaki tjedan, predložak od nekoliko stotina eura odradit će posao. Skupa stranica neće vam donijeti kupce koje jeftina ne bi. Razlika se počne isplaćivati tek kada stranica ima konkretan zadatak: dovoditi upite, prodavati, ili nositi sadržaj koji raste. Ako niste sigurni u kojoj ste od te dvije situacije, to je pitanje na koje treba odgovoriti prije nego što uspoređujete brojke.',
  },

  en: {
    b4Title: 'Why website quotes range from 300 to 5,000 euros',
    b4MetaTitle: 'Why website quotes vary so widely',
    b4MetaDesc:
      'You sent the same brief to three people and got 300, 1,200 and 4,000 euros back. Here is what those numbers actually mean and how to compare them.',
    b4Lead:
      'You sent the same description to three people and got back three quotes that differ by a factor of ten. Nobody made an arithmetic error; they simply did not quote for the same thing.',
    b4Intro:
      'This is probably the most frustrating part of commissioning a website. For most services quotes land within twenty or thirty percent of each other; here the spread can be tenfold. The reason is not that somebody is trying to overcharge you, but that the phrase "a website" covers products which have almost nothing in common beyond the name. Here is what those quotes look like from the inside, and what to do to make them comparable.',

    b4S1Title: 'The same sentence, three different products',
    b4S1A:
      'When you write "I need a website for my business", one person hears installing a ready-made template with your logo and text. Another hears a site arranged around your content, with a design somebody actually draws. A third hears a project that starts by working out who your customers are and builds the structure around that.',
    b4S1B:
      'All three are legitimate answers. All three end with something that opens in a browser and has your logo in the top left. The difference is how many hours of work sit inside, and that accounts for almost the entire price range. Before comparing numbers, you need to know which of those three products each quote is for.',

    b4S2Title: 'What a cheap quote usually leaves out',
    b4S2A:
      'A quote of two or three hundred euros almost always means a template. That is not bad in itself: for a small business needing a presence with a contact and a description of the service, a template can be an entirely sensible choice. The problem starts when you expect something else and do not ask.',
    b4S2B:
      'What is most often not in that price: the copy, because you are expected to supply it finished, photo editing, technical SEO beyond the basics, customisation beyond colours and a logo, and any support after handover. None of that is hidden if you ask. It becomes hidden when you assume it is included.',

    b4S3Title: 'What an expensive quote includes that you may not need',
    b4S3A:
      'At the other end, a quote of several thousand usually covers things the cheap one does not even mention: research, several rounds of design, copywriting, a content editing system of its own, integrations with tools you already use, and support for an agreed period. For a company whose site brings in enquiries every day, that is justified.',
    b4S3B:
      'For a small business with five pages of content, often it is not. An expensive quote is no more a scam than a cheap one is automatically bad; it is aimed at a different problem. It is worth asking which line items you can drop and what you lose by dropping them. Anyone serious will answer specifically rather than defend the package as a single block.',

    b4S4Title: 'The costs that arrive after handover',
    b4S4A:
      'Part of the difference between quotes is not the build at all but what follows it. Domain and hosting are an annual cost paid to a provider, typically ten to fifty euros for a domain and fifty to two hundred for hosting. Some quotes fold the first year in and therefore look more expensive; others do not mention it and therefore look cheaper.',
    b4S4B:
      'Then comes maintenance. WordPress needs regular updates, and every content change you cannot make yourself is something somebody bills for. A quote that says nothing about what happens after handover is not cheaper, just incomplete. Ask who holds the domain, who holds the hosting, and what a text change costs six months from now.',

    b4S5Title: 'How to make quotes comparable',
    b4S5A:
      'The only way to make quotes comparable is to send everyone the same concrete brief. Not "I need a website", but a list of the pages you expect, who will change the content, whether it needs several languages, whether your text and photography are ready, and the date it has to be live.',
    b4S5B:
      'With that brief, the differences stop being a mystery and become information: one included copywriting, another did not, one budgeted two rounds of revisions, another left it open. Then you are choosing on what you actually need rather than on who wrote the smaller number.',

    b4ListTitle: 'Five questions to ask every quote',
    b4L1: 'Is this a template adaptation or a design made for me, and how many rounds of revisions are included',
    b4L2: 'Who writes the copy and who edits the photographs',
    b4L3: 'Can I change the content myself after handover, and if so through what',
    b4L4: 'Whose name are the domain and hosting in, and what do they cost annually',
    b4L5: 'What is billed after handover, and at what rate',

    b4CloseTitle: 'When the cheapest quote is the right answer',
    b4Close:
      'More often than people assume. If what you need is a presence with a contact, a description of your service and a few photographs, and you have no intention of changing the content weekly, a template for a few hundred euros will do the job. An expensive site will not bring you customers a cheap one would have missed. The difference only starts paying for itself when the site has a concrete job: generating enquiries, selling, or carrying content that keeps growing. If you are not sure which of those two situations you are in, that is the question to answer before comparing any numbers.',
  },
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  Object.assign(j.blog, block)
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  const w = Object.values(block).join(' ').split(/\s+/).filter(Boolean).length
  const d = Object.values(block).filter((v) => v.includes('—')).length
  console.log(`ok   [${lng}] b4: ${Object.keys(block).length} keys, ${w} words, ${d} em-dashes`)
}
