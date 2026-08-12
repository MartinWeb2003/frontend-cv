/**
 * Croatian blog copy: index chrome plus three posts.
 *
 *   node scripts/apply-blog-copy-hr.mjs
 */
import fs from 'node:fs'

const blog = {
  indexMetaTitle: 'Blog o izradi web stranica i SEO-u | Martin Bogoje',
  indexMetaDesc:
    'Tekstovi o brzini web stranica, izboru tehnologije i stranicama za turizam. Bez marketinških fraza, s konkretnim primjerima iz prakse.',
  indexTitle: 'Blog',
  indexLead:
    'Pitanja koja klijenti stvarno postavljaju prije nego što naruče stranicu, odgovorena onako kako bih odgovorio u razgovoru. Bez popisa alata i bez obećanja prvog mjesta na Googleu.',
  crumb: 'Blog',
  readMore: 'Pročitaj',
  allPosts: 'Svi tekstovi',
  nextPost: 'Sljedeći tekst',
  relatedTitle: 'Povezani projekti',
  ctaLabel: 'Povezana usluga',

  /* ── 01 Brzina ── */
  b1Title: 'Zašto je moja web stranica spora i što s tim',
  b1MetaTitle: 'Zašto je web stranica spora i kako to popraviti',
  b1MetaDesc:
    'Najčešći razlozi zašto se web stranica sporo otvara, kako izmjeriti pravi uzrok i što popraviti prvo. Bez nagađanja i bez redizajna.',
  b1Lead:
    'Stranica koja se otvara pet sekundi izgubila je dio posjetitelja prije nego što su išta vidjeli. Dobra vijest je da je uzrok gotovo uvijek isti i da se rijetko rješava redizajnom.',
  b1Intro:
    'Kada me netko pita zašto mu je stranica spora, obično već ima teoriju: hosting, previše dodataka, "nešto s WordPressom". U praksi je odgovor u devet od deset slučajeva puno dosadniji, a što je bolje, i puno jeftiniji za popraviti. Evo kako to izgleda kada se umjesto nagađanja krene od mjerenja.',

  b1S1Title: 'Brzina nije estetsko pitanje',
  b1S1A:
    'Posjetitelj koji čeka nema strpljenja koje vi imate prema vlastitoj stranici. Kod turističkih i uslužnih stranica velik dio prometa dolazi s mobitela, često na mobilnoj mreži izvan grada, i tamo je razlika između dvije i pet sekundi razlika između upita i zatvorenog taba.',
  b1S1B:
    'Google to mjeri i koristi. Core Web Vitals su skup mjera koje opisuju koliko brzo se prikaže glavni sadržaj, koliko brzo stranica reagira na dodir i koliko se raspored trza tijekom učitavanja. To nije glavni faktor rangiranja, ali je faktor koji odlučuje kada su dvije stranice sadržajno slične. Ako ste u toj situaciji, a većina malih tvrtki jest, brzina je jedno od rijetkih mjesta gdje se prednost stječe tehnički.',

  b1S2Title: 'Slike su gotovo uvijek glavni krivac',
  b1S2A:
    'U svakom pregledu koji sam radio slike su bile najveći pojedinačni teret. Razlog je jednostavan: fotografija ravno iz fotoaparata ima nekoliko tisuća piksela u širinu i nekoliko megabajta, a prikazuje se u okviru širokom nekoliko stotina piksela. Preglednik svejedno mora skinuti cijelu datoteku.',
  b1S2B:
    'Rješenje ima tri dijela. Prvo, slike se spremaju u modernom formatu poput WebP-a, koji je tipično dvostruko do peterostruko manji od iste JPEG datoteke. Drugo, priprema se više veličina iste slike pa preglednik na telefonu skida manju verziju. Treće, slike izvan prvog zaslona učitavaju se tek kada im se posjetitelj približi. Sve troje zajedno često prepolovi težinu stranice bez ijedne vidljive promjene.',

  b1S3Title: 'Dodaci i skripte koje nitko ne koristi',
  b1S3A:
    'Drugi najčešći uzrok su stvari koje se učitavaju na svakoj stranici, a koriste se na jednoj ili nijednoj. Kalendar rezervacija koji stoji na kontaktu, ali se skripta učitava svugdje. Alat za praćenje koji je netko postavio prije tri godine i nitko ga više ne gleda. Galerija instalirana da bi se probala, pa ostala.',
  b1S3B:
    'Kod WordPressa se to nakuplja neprimjetno jer svaki dodatak nosi vlastiti CSS i JavaScript. Nije rijetkost da stranica učitava deset stilskih datoteka i dvadesetak skripti, od kojih se stvarno koristi trećina. Uklanjanje neaktivnih dodataka i ograničavanje ostalih na stranice gdje su potrebni obično donese drugi najveći dobitak, odmah iza slika.',

  b1S4Title: 'Hosting i gdje se poslužitelj nalazi',
  b1S4A:
    'Hosting je stvaran uzrok rjeđe nego što se misli, ali kada jest, vidi se odmah: stranica dugo ne počne ništa raditi, a onda se učita normalno. To je vrijeme do prvog bajta i ono ovisi o poslužitelju, ne o vašoj stranici.',
  b1S4B:
    'Za hrvatske posjetitelje bitno je i gdje poslužitelj fizički stoji. Najjeftiniji paketi znaju biti na dijeljenom poslužitelju s nekoliko stotina drugih stranica, i tada vaša brzina ovisi o tome što rade susjedi. Prelazak na pristojan hosting u Europi obično košta manje od jednog sata razvojnog rada mjesečno, pa je to jedna od rijetkih odluka gdje je odgovor gotovo uvijek jasan.',

  b1S5Title: 'Mjerite umjesto da nagađate',
  b1S5A:
    'Prije bilo kakvog popravka vrijedi izmjeriti. PageSpeed Insights je besplatan i daje dvije stvari: laboratorijski test i, ako stranica ima dovoljno prometa, stvarne podatke od pravih posjetitelja. Ti stvarni podaci su ono što Google koristi, pa su važniji od ocjene u testu.',
  b1S5B:
    'Search Console pokazuje istu sliku kroz vrijeme i po skupinama stranica, što je korisnije od pojedinačnog testa. Ako nakon popravaka brojke ne krenu u dobrom smjeru kroz nekoliko tjedana, popravljalo se krivo mjesto. To je jedini način da se izbjegne skup redizajn koji rješava problem koji nije postojao.',

  b1ListTitle: 'Što provjeriti prvo',
  b1L1: 'Otvorite stranicu na mobitelu, s mobilnim podacima umjesto wi-fija, i mjerite koliko čekate',
  b1L2: 'Provjerite težinu najveće slike na naslovnici; sve preko 300 KB je kandidat za optimizaciju',
  b1L3: 'Pogledajte popis aktivnih dodataka i pitajte se koristi li se svaki od njih',
  b1L4: 'Pustite PageSpeed Insights i gledajte podatke sa terena, ne samo ocjenu',
  b1L5: 'Uključite Search Console ako već nije uključen, jer bez njega nemate povijest',

  b1CloseTitle: 'Kada popravak nije dovoljan',
  b1Close:
    'Popravak ima smisla kada je struktura stranice u redu a problem su brzina, zapušteni dodaci ili nedostatak tehničke osnove. Ako stranica nije responzivna, radi na sustavu koji se više ne održava ili je sadržaj zastario toliko da ga ionako treba pisati iznova, onda je nova stranica iskreniji odgovor. Pregled tu razliku pokaže za nekoliko sati, i vrijedi ga napraviti prije nego što se donese skuplja odluka.',

  /* ── 02 WordPress ili React ── */
  b2Title: 'WordPress ili React: kako odabrati za svoju stranicu',
  b2MetaTitle: 'WordPress ili React: što odabrati za web stranicu',
  b2MetaDesc:
    'Usporedba WordPressa i Reacta za male tvrtke i obrte: kada koji ima smisla, koliko koštaju kroz vrijeme i koje pitanje zapravo odlučuje.',
  b2Lead:
    'Ovo je pitanje koje developeri vole, a klijentima rijetko pomaže. Odluka gotovo nikad ne ovisi o tome koja je tehnologija bolja, nego o tome tko će održavati sadržaj.',
  b2Intro:
    'Ako ste tražili tko će vam izraditi stranicu, vjerojatno ste dobili suprotne preporuke. Jedan kaže WordPress jer je jednostavan, drugi kaže da je WordPress spor i nudi nešto moderno. Obojica mogu biti u pravu, jer odgovaraju na različita pitanja. Evo kako tu odluku donosim ja, i koje pitanje je zapravo presudno.',

  b2S1Title: 'Pitanje nije koja je tehnologija bolja',
  b2S1A:
    'I WordPress i React mogu proizvesti brzu, urednu i dobro rangiranu stranicu, kao što oboje mogu proizvesti sporu i neodrživu. Tehnologija postavlja gornju granicu, ali rezultat određuje izvedba. Vidio sam WordPress stranice koje se učitavaju za sekundu i React aplikacije koje na mobitelu jedva rade.',
  b2S1B:
    'Zato prvo pitanje nikad nije tehničko. Pitam tko će mijenjati sadržaj, koliko često i koliko je taj netko spreman učiti. Odgovor na to obično riješi devedeset posto dileme prije nego što se uopće spomene ijedan alat.',

  b2S2Title: 'Kada WordPress ima smisla',
  b2S2A:
    'WordPress je odgovor kada sadržaj živi. Ako mijenjate cijene po sezoni, dodajete nekretnine, objavljujete novosti ili želite sami zamijeniti fotografije bez javljanja developeru, treba vam sustav za uređivanje i WordPress je najrasprostranjeniji takav sustav u Hrvatskoj. To znači i da ćete lakše naći nekoga tko ga zna ako se putevi razidu.',
  b2S2B:
    'Cijena te fleksibilnosti je održavanje. WordPress i njegovi dodaci traže redovita ažuriranja, a svaki dodatak je nešto što se može pokvariti ili usporiti stranicu. To nije razlog za izbjegavanje, nego stavka koju treba planirati: instalacija koju nitko ne ažurira dvije godine je sigurnosni problem, ne samo tehnički dug.',

  b2S3Title: 'Kada React ima smisla',
  b2S3A:
    'React ima smisla kada stranica radi nešto specifično što gotovi sustavi ne pokrivaju dobro, ili kada su brzina i ponašanje sučelja dio proizvoda. Kalkulatori, konfiguratori, interaktivni prikazi, aplikacije s vlastitom logikom. Također ima smisla kada se sadržaj gotovo ne mijenja, jer tada nema razloga plaćati i održavati cijeli CMS sloj.',
  b2S3B:
    'Ono što se često prešuti je da React stranica bez dodatnog rada nije automatski dobra za tražilice. Ako se sadržaj crta tek u pregledniku, dio alata koji čitaju stranicu vidjet će prazninu. Rješenje postoji i zove se prerenderiranje ili poslužiteljsko renderiranje, ali to je posao koji netko mora napraviti. Ako vam netko nudi React stranicu, pitajte kako je riješen taj dio.',

  b2S4Title: 'Što se najčešće pogriješi',
  b2S4A:
    'Najskuplja greška je birati tehnologiju prije nego što se zna tko održava sadržaj. Iz toga nastaju React stranice čiji vlasnik ne može promijeniti telefonski broj bez računa, i WordPress instalacije s petnaest dodataka na stranici koja se nije mijenjala od objave.',
  b2S4B:
    'Druga česta greška je birati po tome što je novo. Tehnologija koja je bila popularna prije pet godina danas je često teret, a ono što je popularno danas bit će u istoj poziciji za pet godina. Zanimljivije pitanje od "je li moderno" je "hoće li netko ovo moći preuzeti za tri godine".',

  b2S5Title: 'Trošak kroz vrijeme, ne samo na početku',
  b2S5A:
    'Početna cijena je vidljiv dio. Ono što se rjeđe računa je trošak kroz nekoliko godina: hosting, ažuriranja, sitne izmjene i vrijeme koje sami potrošite na održavanje. WordPress obično ima nižu početnu cijenu i viši trošak održavanja. Statična ili React izvedba obično ima obrnut profil.',
  b2S5B:
    'Zato pitam koliko dugo stranica treba trajati. Za stranicu koja je oglas za jednu sezonu i za stranicu koja je temelj poslovanja sljedećih pet godina odgovor nije isti, čak i ako izgledaju gotovo identično.',

  b2ListTitle: 'Pet pitanja koja odlučuju umjesto vas',
  b2L1: 'Tko će mijenjati sadržaj i koliko često',
  b2L2: 'Radi li stranica nešto osim što prikazuje informacije',
  b2L3: 'Koliko ste spremni izdvojiti za održavanje svake godine',
  b2L4: 'Treba li stranica biti na više jezika',
  b2L5: 'Koliko dugo očekujete da će ova verzija stranice trajati',

  b2CloseTitle: 'Odgovor u jednoj rečenici',
  b2Close:
    'Ako sadržaj mijenjate sami i često, uzmite WordPress i planirajte održavanje. Ako se sadržaj rijetko mijenja ili stranica radi nešto specifično, statična ili React izvedba dat će vam brži i mirniji rezultat. Ako niste sigurni, to je znak da prvo treba razgovor o sadržaju, a ne o tehnologiji.',

  /* ── 03 Turizam ── */
  b3Title: 'Web stranica za apartmane i kampove: što gost stvarno traži',
  b3MetaTitle: 'Web stranica za apartmane i kampove: što gost traži',
  b3MetaDesc:
    'Što turistička web stranica mora imati da bi gost poslao upit: fotografije, praktični podaci, jezici i brzina. Iz iskustva na Pelješcu.',
  b3Lead:
    'Gost gleda vašu stranicu s telefona, često dok je otvorio još pet drugih. Odluka pada u nekoliko sekundi, i gotovo nikad na temelju onoga što mislite da je najvažnije.',
  b3Intro:
    'Radio sam stranice za kamp, privatni smještaj i destinacijski vodič, uglavnom na Pelješcu. Obrazac se ponavlja svaki put: puno fotografija, publika iz inozemstva i posjetitelji koji tek planiraju put. Ovo je ono što se u tim projektima pokazalo da stvarno utječe na to hoće li stići upit.',

  b3S1Title: 'Prvih nekoliko sekundi odlučuje',
  b3S1A:
    'Gost ne čita, nego skenira. U prvom zaslonu mora dobiti tri stvari: kakav je objekt, gdje je i kako izgleda okolina. Ako mora skrolati da bi shvatio gleda li apartman ili kamp, već ste ga izgubili na račun sljedeće otvorene kartice.',
  b3S1B:
    'Zato naslovna fotografija radi najviše posla na cijeloj stranici. Zračna snimka uvale ili pogled s terase kaže više od tri odlomka teksta, i to je jedno od rijetkih mjesta gdje se isplati platiti profesionalno fotografiranje prije nego dodatne funkcionalnosti.',

  b3S2Title: 'Fotografije su i najvažnije i tehnički najteže',
  b3S2A:
    'Turistička stranica prodaje dojam, a dojam nosi fotografija. Istovremeno su fotografije glavni razlog zašto se turističke stranice otvaraju deset sekundi. Galerija od trideset slika ravno iz fotoaparata je nekoliko desetaka megabajta, što je na mobilnoj mreži u srpnju neupotrebljivo.',
  b3S2B:
    'Rješenje nije manje fotografija nego pametnije posluživanje. Slike se pripremaju u više veličina, spremaju u modernom formatu i učitavaju postupno kako gost skrola. Tako galerija ostaje bogata, a stranica se otvara odmah. Ovo je razlika koju gost nikad neće primijetiti, ali će je osjetiti.',

  b3S3Title: 'Praktični podaci koje gost traži, a rijetko dobije',
  b3S3A:
    'Nakon dojma dolaze detalji, i tu većina stranica podbaci. Koliko je more udaljeno, i to u minutama hoda a ne u zračnoj liniji. Ima li hlada. Kakav je sanitarni čvor. Ima li parkirno mjesto. Primaju li se kućni ljubimci. Radi li klima. Koliko traje vožnja od trajekta.',
  b3S3B:
    'Svako od tih pitanja koje stranica ne odgovori postaje email koji morate napisati, ili gost koji je odustao jer mu se nije dalo pitati. Popis pitanja koja stvarno dobivate u upitima je najbolji mogući nacrt strukture stranice, i preporučam ga sastaviti prije nego što se počne s dizajnom.',

  b3S4Title: 'Jezici prema tržištima, ne prema ambiciji',
  b3S4A:
    'Gosti dolaze iz konkretnih zemalja i to znate iz vlastitih rezervacija. Ako su to Njemačka, Poljska i Austrija, onda njemački i poljski imaju smisla, a talijanski nema samo zato što zvuči dobro. Dvije dobro napisane verzije uvijek su bolje od pet strojno prevedenih, jer gost prepozna lošu rečenicu na vlastitom jeziku jednako brzo kao vi.',
  b3S4B:
    'Tehnički je važno da svaki jezik ima vlastitu adresu. Verzija koja postoji samo kao prekidač na istoj adresi za tražilice praktički ne postoji, pa njemački gost koji traži smještaj na njemačkom nikad neće doći do nje. To je jedna od rijetkih tehničkih odluka koja izravno utječe na broj upita.',

  b3S5Title: 'Platforme nisu zamjena za vlastitu stranicu',
  b3S5A:
    'Velike platforme donose goste i to je stvarna vrijednost. Ali uzimaju proviziju, drže odnos s gostom i mogu promijeniti pravila kad god žele. Vlastita stranica ne zamjenjuje platformu nego omogućuje da gost koji vas je tamo našao sljedeći put rezervira direktno.',
  b3S5B:
    'Za to ne treba sustav rezervacija. Za većinu manjih objekata obrazac za upit i jasno vidljiv kontakt rade bolje, jer gost ionako želi potvrdu od domaćina prije nego što plati. Puni sustav s kalendarom i dostupnošću ima smisla tek kada broj jedinica ili volumen upita to opravda.',

  b3ListTitle: 'Što svaka turistička stranica mora imati',
  b3L1: 'Naslovnu fotografiju koja u sekundi objasni gdje ste i kakav je objekt',
  b3L2: 'Odgovore na praktična pitanja, uključujući udaljenost od mora u minutama hoda',
  b3L3: 'Kontakt vidljiv sa svake stranice, ne samo na zasebnoj kontakt stranici',
  b3L4: 'Jezične verzije na vlastitim adresama, za tržišta s kojih gosti stvarno dolaze',
  b3L5: 'Galerije koje se učitavaju postupno, da se stranica otvori i na mobilnoj mreži',

  b3CloseTitle: 'Sezona je rok koji ne pomiče nitko',
  b3Close:
    'Turistička stranica ima jedan rok koji nema nijedan drugi projekt. Stranica objavljena sredinom srpnja propustila je razdoblje u kojem se gosti odlučuju, a tražilicama treba nekoliko tjedana da je uopće počnu prikazivati. Zato izradu planiramo unatrag od datuma kada promet stvarno počinje, a najbolje vrijeme za rad je zima, kada imate mira za fotografije i tekstove.',
}

const p = 'src/locales/hr.json'
const j = JSON.parse(fs.readFileSync(p, 'utf8'))
j.blog = blog
fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')

const words = Object.values(blog).join(' ').split(/\s+/).filter(Boolean).length
const dashes = Object.values(blog).filter((v) => v.includes('—')).length
console.log(`ok   [hr] blog: ${Object.keys(blog).length} keys, ${words} words, ${dashes} em-dashes`)
