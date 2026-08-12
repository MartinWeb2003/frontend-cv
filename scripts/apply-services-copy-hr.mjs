/**
 * Croatian copy for the services hub and the three service pages.
 *
 * No prices, no timelines stated as promises and no ranking guarantees: those
 * are things only Martin can commit to, and inventing them would make the
 * pages worse than useless.
 *
 *   node scripts/apply-services-copy-hr.mjs
 */
import fs from 'node:fs'

const services = {
  /* ── Shared chrome ── */
  indexMetaTitle: 'Usluge: izrada i održavanje web stranica | Martin Bogoje',
  indexMetaDesc:
    'Izrada web stranica i aplikacija, stranice za turizam i apartmane, održavanje i tehnička SEO optimizacija. Zagreb i cijela Hrvatska.',
  indexTitle: 'Usluge',
  indexLead:
    'Tri stvari koje radim, opisane onako kako stvarno izgledaju u praksi: što dobivate, kako teče proces i za koga ima smisla.',
  crumbServices: 'Usluge',
  getTitle: 'Što dobivate',
  processTitle: 'Kako teče',
  forTitle: 'Za koga je',
  stackTitle: 'Tehnologije',
  proofTitle: 'Primjeri iz prakse',
  faqTitle: 'Česta pitanja',
  ctaTitle: 'Imate projekt na umu?',
  ctaText:
    'Pošaljite nekoliko rečenica o tome što trebate i javljam se s pitanjima i prijedlogom pristupa, bez obveze.',
  ctaBtn: 'Javite se',
  viewService: 'Detaljnije',
  next: 'Sljedeća usluga',

  /* ── 01 Izrada web stranica ── */
  s1Name: 'Izrada web stranica',
  s1Title: 'Izrada web stranica i web aplikacija',
  s1MetaTitle: 'Izrada web stranica Zagreb | Martin Bogoje',
  s1MetaDesc:
    'Izrada web stranica i aplikacija u Reactu ili WordPressu: dizajn, razvoj, tehnički SEO i puštanje u produkciju. Zagreb i cijela Hrvatska.',
  s1Lead:
    'Stranica koja radi ono zbog čega ste je naručili: objašnjava ponudu, dovodi upite i jednako dobro izgleda na mobitelu kao na velikom ekranu.',
  s1Intro1:
    'Radim web stranice od prvog razgovora do trenutka kada su online i u upotrebi. To uključuje strukturu sadržaja, dizajn, izradu, testiranje na stvarnim uređajima te postavljanje domene i hostinga. Klijent na kraju dobiva rješenje koje može sam održavati, a ne nešto što ovisi o meni svaki put kada treba promijeniti telefonski broj.',
  s1Intro2:
    'Ne postoji jedan tip stranice koji odgovara svima. Prezentacijska stranica obrta, katalog nekretnina i landing stranica s jednim ciljem tri su različita problema i traže tri različita rješenja. Zato prvo pitam što stranica treba postići, pa tek onda biramo tehnologiju.',
  s1Get1:
    'Dizajn prilagođen vašem sadržaju, a ne gotov predložak u koji se sadržaj naknadno gura',
  s1Get2: 'Responzivan prikaz testiran na stvarnim telefonima, ne samo u alatima za razvoj',
  s1Get3:
    'Tehnička SEO osnova: semantički naslovi, meta podaci, čiste adrese i optimizirane slike',
  s1Get4: 'Brzo učitavanje, jer većina posjeta dolazi s mobilnih mreža izvan gradskog wi-fija',
  s1Get5:
    'Puštanje u produkciju s domenom, hostingom i certifikatom, uz upute za samostalno održavanje',
  s1Step1:
    'Razgovor i opseg. Prolazimo što stranica treba postići, tko je publika i koji sadržaj već postoji. Iz toga izlazi popis stranica i procjena trajanja.',
  s1Step2:
    'Struktura i dizajn. Prvo raspored sadržaja, pa vizualni dizajn. U ovoj se fazi ispravlja najviše stvari, jer je izmjena ovdje najjeftinija.',
  s1Step3:
    'Izrada. Razvoj u dogovorenoj tehnologiji, uz redovite prikaze napretka kako na kraju ne bi bilo iznenađenja.',
  s1Step4:
    'Isporuka. Testiranje na uređajima, provjera brzine i SEO osnove, postavljanje na domenu i predaja s uputama.',
  s1For1:
    'Obrti i male tvrtke kojima treba prva ozbiljna stranica umjesto profila na društvenim mrežama',
  s1For2: 'Tvrtke sa stranicom starom nekoliko godina koja se loše otvara na mobitelu',
  s1For3: 'Klijenti kojima treba landing stranica s jednim jasnim ciljem, prijavom ili upitom',
  s1For4: 'Projekti koji traže vlastitu web aplikaciju umjesto prilagodbe gotovog sustava',
  s1Faq1Q: 'Koliko traje izrada web stranice?',
  s1Faq1A:
    'Ovisi o broju stranica i o tome radi li se prezentacijska stranica ili aplikacija s vlastitom logikom. U praksi najveći dio vremena ne troši razvoj nego prikupljanje sadržaja: tekstova, fotografija i podataka o ponudi. Ako je sadržaj spreman na početku, rok se skraćuje više nego bilo kojom tehničkom odlukom.',
  s1Faq2Q: 'React ili WordPress?',
  s1Faq2A:
    'WordPress ima smisla kada sadržaj mijenjate često i želite to raditi sami, bez razvojnog rada. React ima smisla kada stranica radi nešto specifično što gotovi sustavi ne pokrivaju dobro, ili kada su brzina i ponašanje sučelja ključni. Odluku donosimo prema tome tko će održavati sadržaj, a ne prema tome što je trenutačno popularno.',
  s1Faq3Q: 'Mogu li sam mijenjati sadržaj?',
  s1Faq3A:
    'Uz WordPress da, i to je obično glavni razlog zašto ga biramo. Uz React rješenje sadržaj se ili povezuje s posebnim sustavom za uređivanje ili se mijenja kroz kod. Na to pitanje odgovaramo prije početka izrade jer bitno mijenja pristup i cijenu.',
  s1Faq4Q: 'Radite li i dizajn ili trebam gotov?',
  s1Faq4A:
    'Radim i dizajn. Ako već imate vizualni identitet, logotip i boje, radim unutar njega. Ako nemate, dizajn nastaje kroz projekt. U oba slučaja polazim od sadržaja, jer dizajn bez sadržaja završi kao lijep raspored praznih okvira.',

  /* ── 02 Web stranice za turizam ── */
  s2Name: 'Web stranice za turizam',
  s2Title: 'Web stranice za apartmane, kampove i turističku ponudu',
  s2MetaTitle: 'Web stranice za turizam i apartmane | Martin Bogoje',
  s2MetaDesc:
    'Izrada web stranica za apartmane, kampove i turističku ponudu: višejezično, brze galerije i jasan put do upita za rezervaciju.',
  s2Lead:
    'Gost odlučuje u nekoliko sekundi i gotovo uvijek s telefona. Stranica mora pokazati smještaj, okolicu i način rezervacije prije nego što izgubi strpljenje.',
  s2Intro1:
    'Turistički sadržaj je gotovo isključivo vizualan, ali odluka se donosi na detaljima: koliko je more udaljeno, ima li hlada, kakav je sanitarni čvor, primaju li se kućni ljubimci. Stranica mora pomiriti veliku količinu praktičnih informacija s prezentacijom koja ostaje mirna i pregledna.',
  s2Intro2:
    'Do sada sam radio stranice za kamp, privatni smještaj, destinacijski vodič i agenciju za nekretnine, uglavnom na Pelješcu i u okolici. Svaki od tih projekata imao je isti obrazac: puno fotografija, međunarodna publika i posjetitelji koji dolaze s mobitela dok tek planiraju put.',
  s2Get1: 'Optimizirane galerije koje se učitavaju postupno, umjesto da blokiraju prikaz stranice',
  s2Get2:
    'Višejezično sučelje s odvojenim adresama po jeziku, kako bi svaka verzija bila vidljiva na tražilicama',
  s2Get3: 'Jasan i uvijek dostupan put do upita, bez traženja kontakta po podnožju stranice',
  s2Get4: 'Struktura koja podnosi rast: nove jedinice, sezone i sadržaji dodaju se bez redizajna',
  s2Get5:
    'Prikaz udaljenosti, okolice i sadržaja koji gostu odgovara na pitanja prije nego što ih postavi',
  s2Step1:
    'Popis onoga što gost mora saznati. Prije dizajna slažemo listu pitanja koja gosti stvarno postavljaju, jer ona određuje strukturu stranice.',
  s2Step2:
    'Priprema fotografija. Odabir, obrada i optimizacija, jer su fotografije istovremeno najvažniji i tehnički najteži dio turističke stranice.',
  s2Step3:
    'Izrada i jezične verzije. Postavljanje stranice i prijevoda, sa strukturom adresa koja tražilicama jasno govori koja je verzija za koje tržište.',
  s2Step4:
    'Isporuka prije sezone. Testiranje na telefonima i sporijim mrežama, pa objava s dovoljno vremena za ispravke prije nego što promet krene.',
  s2For1: 'Privatni iznajmljivači i apartmani koji žele rezervacije i mimo velikih platformi',
  s2For2: 'Kampovi i manji smještajni objekti kojima treba prikazati parcele, sadržaje i okolicu',
  s2For3: 'Turističke agencije i destinacijski vodiči s većom količinom sadržaja',
  s2For4: 'Objekti koji ciljaju goste iz inozemstva i trebaju stranicu na više jezika',
  s2Faq1Q: 'Trebam li stranicu ako sam već na velikim platformama?',
  s2Faq1A:
    'Platforme donose goste, ali uzimaju proviziju i ne daju vam odnos s gostom. Vlastita stranica ne zamjenjuje platformu nego omogućuje da gost koji vas je tamo našao sljedeći put rezervira direktno. Za to je dovoljno da stranica postoji, brzo se otvara i ima jasan kontakt.',
  s2Faq2Q: 'Na koliko jezika treba biti stranica?',
  s2Faq2A:
    'Prema tržištima s kojih vam gosti stvarno dolaze, ne prema broju jezika koji zvuči impresivno. Bolje su dvije dobro napisane verzije nego pet strojno prevedenih. Svaki jezik dobiva vlastitu adresu, jer verzija koja postoji samo kao prekidač na istoj adresi tražilicama praktički ne postoji.',
  s2Faq3Q: 'Mogu li sam mijenjati cijene i fotografije po sezoni?',
  s2Faq3A:
    'Da, i za turističke stranice to gotovo uvijek postavljam tako. Cijene, dostupnost i fotografije mijenjaju se svake sezone, a rješenje koje za svaku izmjenu traži developera prestane se ažurirati već druge godine.',
  s2Faq4Q: 'Radite li i rezervacijski sustav?',
  s2Faq4A:
    'Ovisi o tome što vam stvarno treba. Za većinu manjih objekata obrazac za upit i jasan kontakt rade bolje od punog sustava rezervacija, jer gost ionako želi potvrdu od domaćina. Ako je potreban pravi sustav s kalendarom i dostupnošću, to je zaseban projekt i tako ga i tretiramo.',

  /* ── 03 Održavanje i optimizacija ── */
  s3Name: 'Održavanje i optimizacija',
  s3Title: 'Održavanje, brzina i SEO optimizacija postojeće stranice',
  s3MetaTitle: 'Održavanje i SEO optimizacija web stranica | Martin Bogoje',
  s3MetaDesc:
    'Održavanje postojećih web stranica, ubrzavanje učitavanja i tehnička SEO optimizacija. Pregled, popravci po redu utjecaja i praćenje rezultata.',
  s3Lead:
    'Ako stranica postoji ali se sporo otvara, ne pojavljuje se na Googleu ili je nitko nije dirao dvije godine, obično nije potreban redizajn nego popravak.',
  s3Intro1:
    'Većina stranica ne propada zato što su loše napravljene nego zato što ih nitko ne održava. Slike se dodaju u punoj veličini, dodaci se ne ažuriraju, tekstovi zastare, a brzina padne toliko da posjetitelji odustanu prije nego što se stranica otvori.',
  s3Intro2:
    'Ova usluga polazi od mjerenja, a ne od pretpostavke. Prvo se utvrdi što stranicu stvarno usporava i što je sprječava da bude pronađena, pa se popravlja po redu utjecaja. Redizajn dolazi u obzir tek ako se pokaže da popravak nema smisla.',
  s3Get1:
    'Analiza brzine na stvarnim uređajima i mrežama, s popisom onoga što najviše usporava stranicu',
  s3Get2: 'Tehnički SEO pregled: naslovi, meta podaci, indeksiranje, sitemap i struktura adresa',
  s3Get3: 'Optimizacija slika i učitavanja, obično najveći pojedinačni dobitak na brzini',
  s3Get4: 'Ažuriranje sustava i dodataka, uz provjeru da ništa nije puklo nakon ažuriranja',
  s3Get5: 'Postavljanje Google Search Consolea i analitike, kako biste vidjeli što se stvarno događa',
  s3Step1:
    'Pregled. Mjerim brzinu, provjeravam kako stranica izgleda tražilicama i radim popis nalaza poredanih po utjecaju.',
  s3Step2:
    'Dogovor opsega. Zajedno biramo što se radi odmah, a što može čekati, jer nema smisla popravljati sve odjednom.',
  s3Step3:
    'Popravci. Izvedba dogovorenih izmjena, uz provjeru da svaka promjena stvarno pomaže i da pritom ništa drugo nije puklo.',
  s3Step4:
    'Praćenje. Nakon izmjena pratimo brojke kroz Search Console i analitiku, jer se učinak tehničkog SEO-a vidi tek kroz nekoliko tjedana.',
  s3For1: 'Stranice koje se sporo otvaraju, osobito na mobilnim mrežama',
  s3For2: 'Stranice koje se ne pojavljuju na Googleu ni za vlastito ime',
  s3For3: 'WordPress instalacije koje dugo nisu ažurirane',
  s3For4: 'Vlasnici koji žele znati što se stvarno događa prije nego što ulože u redizajn',
  s3Faq1Q: 'Kako znam treba li mi popravak ili nova stranica?',
  s3Faq1A:
    'To pokazuje pregled. Ako je struktura u redu a problem su brzina, zastarjeli dodaci ili nedostatak SEO osnove, popravak je jeftiniji i brži. Ako stranica nije responzivna, oslanja se na tehnologiju koja se više ne održava ili je sadržaj potpuno zastario, redizajn je iskreniji odgovor.',
  s3Faq2Q: 'Možete li jamčiti prvo mjesto na Googleu?',
  s3Faq2A:
    'Ne, i nitko ozbiljan ne može. Nitko nema kontrolu nad Googleovim algoritmom ni nad time koliko je jaka konkurencija za pojedini pojam. Ono što se može je ukloniti tehničke prepreke koje sprječavaju stranicu da uopće bude u igri, i zatim mjeriti pomak kroz Search Console.',
  s3Faq3Q: 'Radite li i na stranicama koje niste vi napravili?',
  s3Faq3A:
    'Da, to je zapravo najčešći slučaj. Prvo pregledam u kakvom je stanju i javim ako je nešto postavljeno tako da popravak nema smisla. Ne preuzimam rad na stranici bez tog pregleda jer bih inače pogađao.',
  s3Faq4Q: 'Je li održavanje jednokratno ili mjesečno?',
  s3Faq4A:
    'Može biti oboje. Jednokratni pregled i popravak ima smisla ako je stranica zapuštena. Redovito održavanje ima smisla ako sadržaj živi i ako se sustav i dodaci moraju držati ažurnima. Što je prikladnije, vidi se nakon prvog pregleda.',
}

const p = 'src/locales/hr.json'
const j = JSON.parse(fs.readFileSync(p, 'utf8'))
j.services = services
fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')

const words = Object.values(services).join(' ').split(/\s+/).filter(Boolean).length
const dashes = Object.values(services).filter((v) => v.includes('—')).length
console.log(`ok   [hr] services copy added: ${Object.keys(services).length} keys, ${words} words`)
console.log(`     em-dashes: ${dashes}`)
