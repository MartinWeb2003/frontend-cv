/**
 * Post 05: the pillar, "how to choose a web developer".
 *
 * Unlike the four spokes this is not tied to a single service. It is the hub
 * the cluster was missing: it links out to every post and every money page,
 * and every spoke gains from having something to link up into.
 *
 * Longer than the spokes on purpose, since a pillar is meant to be the most
 * complete page on its topic.
 *
 *   node scripts/apply-blog-b5.mjs
 */
import fs from 'node:fs'

const COPY = {
  hr: {
    readNextTitle: 'Pročitajte dalje',

    b5Title: 'Kako odabrati web developera',
    b5MetaTitle: 'Kako odabrati web developera: vodič za male tvrtke',
    b5MetaDesc:
      'Agencija, freelancer ili gotov alat, što tražiti u portfelju, koja pitanja postaviti i tko na kraju drži domenu, hosting i kod.',
    b5Lead:
      'Većina ljudi bira web developera na temelju cijene i dojma, jer nema način procijeniti ostalo. Ovaj tekst je pokušaj da vam dam taj način, uključujući razloge zašto biste mene mogli preskočiti.',
    b5Intro:
      'Naručivanje web stranice je nezgodna kupnja: plaćate unaprijed za nešto što ne možete ocijeniti dok ne bude gotovo, a ako ispadne loše, često ne znate ni je li problem u izvedbi ili u tome što ste tražili krivu stvar. Ovaj tekst pokriva odluke koje donosite prije nego što potpišete: koga uopće tražite, kako čitati portfelj, što pitati i tko na kraju drži ključeve.',

    b5S1Title: 'Agencija, freelancer ili gotov alat',
    b5S1A:
      'Gotovi alati poput Wixa ili Squarespacea imaju smisla češće nego što developeri priznaju. Ako trebate mjesto na internetu s kontaktom, opisom usluge i nekoliko fotografija, i spremni ste to sami posložiti kroz vikend, platit ćete desetak eura mjesečno i biti gotovi. Ograničenja dolaze kasnije: teže je optimizirati brzinu, teže je izaći iz sustava i teško se radi nešto što alat ne predviđa.',
    b5S1B:
      'Agencija ima smisla kada projekt traži više ljudi: dizajnera, developera, nekoga za tekstove i nekoga tko to vodi. Plaćate i tu koordinaciju, što je opravdano na velikom projektu i skupo na malom. Freelancer je između: radite direktno s osobom koja izvodi, bez marže na tuđi rad, ali je ta osoba i usko grlo kada je zauzeta ili na godišnjem. Nijedan od ta tri odgovora nije univerzalno točan, i ako vam netko kaže da jest, to je prva informacija koju ste dobili o njemu.',

    b5S2Title: 'Što tražiti u portfelju, a što ignorirati',
    b5S2A:
      'Portfelji su napravljeni da impresioniraju, pa se isplati gledati mimo estetike. Otvorite dvije ili tri stranice iz portfelja na mobitelu, s mobilnim podacima. Mjerite koliko čekate. Provjerite radi li izbornik, može li se doći do kontakta u jednom potezu i izgleda li tekst kao da ga je netko napisao za tu tvrtku.',
    b5S2B:
      'Ignorirajte broj projekata i popis tehnologija. Trideset stranica koje su sve isti predložak govore manje od tri koje rješavaju tri različita problema. Vrijedi provjeriti i rade li te stranice još uvijek: portfelj pun mrtvih linkova znači da klijenti nisu ostali, a to je podatak.',

    b5S3Title: 'Pitanja koja otkrivaju razinu',
    b5S3A:
      'Ne morate razumjeti tehnologiju da biste prepoznali ozbiljan odgovor. Pitajte tko će mijenjati sadržaj nakon isporuke i slušajte postavlja li vam netko protupitanja. Osoba koja odmah nudi rješenje bez ijednog pitanja o vašem poslu prodaje paket, ne rješenje.',
    b5S3B:
      'Druga dobra pitanja: što se događa ako mi za godinu dana treba još pet stranica, kako mjerite je li stranica uspješna, i što biste napravili drugačije na zadnjem projektu. To zadnje je najkorisnije, jer netko tko na njega nema odgovor ili nije radio dovoljno projekata ili ne razmišlja o njima nakon isporuke.',

    b5S4Title: 'Crvene zastavice',
    b5S4A:
      'Jamstvo prvog mjesta na Googleu je najjasnija od svih. Nitko nema kontrolu nad tuđim algoritmom, pa je to obećanje koje se ne može održati. Slična je i cijena dana odmah, bez ijednog pitanja o opsegu: znači da dobivate paket koji je netko unaprijed složio, a ne procjenu vašeg projekta.',
    b5S4B:
      'Ostalo je suptilnije. Ponuda bez ijednog spomena onoga što slijedi nakon isporuke. Nespremnost da se kaže koji sustav se koristi. Rok koji zvuči prekratko za ono što ste tražili. I najvažnije, netko tko ne želi da domena i hosting budu na vaše ime.',

    b5S5Title: 'Tko drži domenu, hosting i kod',
    b5S5A:
      'Ovo je dio koji se najrjeđe pita, a najviše boli kasnije. Domena treba biti registrirana na vas ili vašu tvrtku, ne na developera. Hosting isto. Ako je oboje na tuđe ime, promjena suradnika prestaje biti poslovna odluka i postaje pregovor.',
    b5S5B:
      'Isto vrijedi za pristup. Trebate imati administratorski račun na vlastitoj stranici, pristup hostingu i, ako je stranica rađena po mjeri, kod negdje gdje mu možete pristupiti. Ozbiljnom ponuditelju to nije sporno jer ionako ne planira držati vas kao taoca. Ako je sporno, dobili ste odgovor prije nego što ste išta potpisali.',

    b5ListTitle: 'Kratka lista prije nego što potpišete',
    b5L1: 'Otvorite dvije stranice iz portfelja na mobitelu i izmjerite koliko se učitavaju',
    b5L2: 'Pitajte tko će mijenjati sadržaj i kroz koji sustav',
    b5L3: 'Tražite da domena i hosting budu na vaše ime',
    b5L4: 'Pitajte što se plaća nakon isporuke i po kojoj cijeni',
    b5L5: 'Provjerite je li cijena dana nakon pitanja o opsegu, a ne prije njih',

    b5CloseTitle: 'Odluka na kraju',
    b5Close:
      'Ako sve prođe kroz ovu listu, ostaje vam odluka koja je više o osobi nego o tehnologiji: hoćete li s tim čovjekom moći razgovarati kada nešto pođe po zlu. Web stranica nije jednokratna kupnja nego odnos koji traje koliko i stranica, pa netko tko vam iskreno kaže da vam njegova usluga ne treba vrijedi više od nekoga tko pristane na sve. Ako vam je nakon svega još uvijek nejasno što točno trebate, to je normalno i to je pitanje s kojim treba početi razgovor, a ne ono koje treba riješiti prije njega.',
  },

  en: {
    readNextTitle: 'Read next',

    b5Title: 'How to choose a web developer',
    b5MetaTitle: 'How to choose a web developer: a guide for small businesses',
    b5MetaDesc:
      'Agency, freelancer or a website builder, what to look for in a portfolio, which questions to ask, and who ends up holding the domain, hosting and code.',
    b5Lead:
      'Most people choose a web developer on price and impression, because there is no obvious way to judge anything else. This is an attempt to give you that way, including the reasons you might skip me.',
    b5Intro:
      'Commissioning a website is an awkward purchase: you pay up front for something you cannot evaluate until it exists, and if it turns out badly you often cannot tell whether the problem was the execution or the fact that you asked for the wrong thing. This covers the decisions you make before signing anything: who you are actually looking for, how to read a portfolio, what to ask, and who ends up holding the keys.',

    b5S1Title: 'Agency, freelancer or a website builder',
    b5S1A:
      'Builders like Wix or Squarespace make sense more often than developers admit. If you need a presence with a contact, a description of your service and a few photographs, and you are willing to assemble it yourself over a weekend, you will pay around ten euros a month and be finished. The limits arrive later: speed is harder to optimise, leaving the platform is harder, and anything the tool did not anticipate is difficult to build.',
    b5S1B:
      'An agency makes sense when a project needs several people: a designer, a developer, somebody for the copy and somebody running it. You are also paying for that coordination, which is justified on a large project and expensive on a small one. A freelancer sits between: you work directly with the person doing the work, with no margin on somebody else, but that person is also the bottleneck when they are busy or away. None of the three is universally right, and if somebody tells you theirs is, that is the first thing you have learned about them.',

    b5S2Title: 'What to look for in a portfolio, and what to ignore',
    b5S2A:
      'Portfolios are built to impress, so it pays to look past the aesthetics. Open two or three of the sites on a phone using mobile data. Time the wait. Check whether the menu works, whether you can reach a contact in one move, and whether the text reads like somebody wrote it for that specific business.',
    b5S2B:
      'Ignore the project count and the list of technologies. Thirty sites that are all the same template tell you less than three that solve three different problems. It is also worth checking whether those sites are still running: a portfolio full of dead links means the clients did not stay, and that is information.',

    b5S3Title: 'Questions that reveal the level',
    b5S3A:
      'You do not need to understand the technology to recognise a serious answer. Ask who will change the content after handover, and listen for whether they ask you questions back. Somebody who proposes a solution immediately, without asking anything about your business, is selling a package rather than a solution.',
    b5S3B:
      'Other good ones: what happens if I need five more pages in a year, how do you measure whether the site is working, and what would you do differently on your last project. That last one is the most useful, because somebody with no answer either has not done enough projects or does not think about them after handover.',

    b5S4Title: 'Red flags',
    b5S4A:
      'A guarantee of first place on Google is the clearest of them. Nobody controls somebody else’s algorithm, so it is a promise that cannot be kept. A price quoted immediately, without a single question about scope, is close behind: it means you are getting a pre-assembled package rather than an assessment of your project.',
    b5S4B:
      'The rest is subtler. A quote that never mentions what happens after handover. Reluctance to say which system will be used. A timeline that sounds too short for what you described. And most importantly, anybody who does not want the domain and hosting in your name.',

    b5S5Title: 'Who holds the domain, hosting and code',
    b5S5A:
      'This is the part that gets asked least and hurts most later. The domain should be registered to you or your company, not to the developer. The same goes for hosting. If both are in somebody else’s name, changing supplier stops being a business decision and becomes a negotiation.',
    b5S5B:
      'The same applies to access. You should have an administrator account on your own site, access to the hosting, and, if the site was custom-built, the code somewhere you can reach it. None of that is controversial to anyone serious, because they were not planning to hold you hostage. If it is controversial, you have your answer before signing anything.',

    b5ListTitle: 'A short list before you sign',
    b5L1: 'Open two portfolio sites on a phone and time how long they take to load',
    b5L2: 'Ask who will change the content, and through what system',
    b5L3: 'Require that the domain and hosting are in your name',
    b5L4: 'Ask what is billed after handover, and at what rate',
    b5L5: 'Check that the price came after questions about scope, not before them',

    b5CloseTitle: 'The decision at the end',
    b5Close:
      'If everything passes this list, what remains is a decision more about the person than the technology: will you be able to talk to them when something goes wrong. A website is not a one-off purchase but a relationship that lasts as long as the site does, so somebody who honestly tells you that you do not need their service is worth more than somebody who agrees to everything. And if you are still unclear about what exactly you need, that is normal, and it is the question a conversation should start from rather than one you have to solve before it.',
  },
}

for (const [lng, block] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  Object.assign(j.blog, block)
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  const w = Object.values(block).join(' ').split(/\s+/).filter(Boolean).length
  const d = Object.values(block).filter((v) => v.includes('—')).length
  console.log(`ok   [${lng}] b5: ${Object.keys(block).length} keys, ${w} words, ${d} em-dashes`)
}
