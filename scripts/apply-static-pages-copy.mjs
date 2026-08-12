/**
 * Copy for the About, Contact and Privacy pages in all four locales.
 *
 *   node scripts/apply-static-pages-copy.mjs
 */
import fs from 'node:fs'

const COPY = {
  hr: {
    aboutPage: {
      metaTitle: 'O meni | Martin Bogoje, softverski developer iz Zagreba',
      metaDesc:
        'Softverski developer iz Zagreba: magistarski studij na FER-u, iskustvo u Ericsson Nikola Tesla i sedam web projekata za klijente iz turizma, nekretnina i dizajna.',
      label: 'O meni',
      title: 'Tko sam ja',
      lead: 'Martin Bogoje, softverski developer iz Zagreba. Radim web stranice i aplikacije za klijente kojima stranica nije ukras nego alat: mora biti brza, pregledna i pronalažljiva.',
      p1: 'Trenutačno sam na magistarskom studiju računarstva na Fakultetu elektrotehnike i računarstva u Zagrebu, smjer softversko inženjerstvo i informacijski sustavi. Prije toga sam završio preddiplomski studij računarstva na istom fakultetu.',
      p2: 'Radio sam kao Software Developer u Ericsson Nikola Tesla, jednoj od najvećih tehnoloških tvrtki u regiji. Tamo sam naučio ono što se teško nauči na samostalnim projektima: kako izgleda kod koji održava netko drugi, zašto se piše dokumentacija i koliko procesa stoji iza jedne isporuke.',
      p3: 'Paralelno sam počeo raditi za vlastite klijente. Do sada je to sedam projekata izvedenih od koncepta do produkcije: agencija za nekretnine, kamp, destinacijski vodič, privatni smještaj, studio za grafički dizajn, fitness coaching i studentski event. Većina njih dolazi iz turizma i nekretnina na Pelješcu i u okolici.',
      p4: 'Tehnološki radim s Reactom i Viteom kada projekt traži aplikaciju, i s WordPressom kada klijent mora sam održavati sadržaj. Na backendu Node.js, C# i PostgreSQL. Tehnički SEO i brzina učitavanja tretiram kao dio posla, a ne kao dodatnu uslugu.',
      p5: 'Govorim hrvatski, engleski i njemački, a ova stranica postoji i na poljskom. To nije slučajno: dobar dio klijenata koje moji klijenti opslužuju dolazi iz inozemstva, pa je višejezičnost češće zahtjev nego iznimka.',
      howTitle: 'Kako radim',
      how: 'Počinjem od pitanja što stranica treba postići, ne od izgleda. Nakon toga slijedi struktura sadržaja, pa dizajn, pa izvedba. Prije isporuke provjeravam brzinu, mobilni prikaz i osnovni tehnički SEO. Klijent dobiva rješenje koje može sam održavati i dokumentaciju kako to napraviti.',
      factsTitle: 'Ukratko',
      fact1: 'Magistarski studij računarstva na FER-u, Sveučilište u Zagrebu',
      fact2: 'Bivši Software Developer u Ericsson Nikola Tesla',
      fact3: 'Sedam klijentskih projekata u produkciji, od React aplikacija do WordPress stranica',
      fact4: 'Rad na hrvatskom, engleskom i njemačkom jeziku',
      ctaContact: 'Javite se',
    },
    contactPage: {
      metaTitle: 'Kontakt | Martin Bogoje, izrada web stranica Zagreb',
      metaDesc:
        'Kontaktirajte Martina Bogoja za izradu web stranica i aplikacija. Javljam se na email, radim iz Zagreba, dostupan za freelance projekte i stalne angažmane.',
      label: 'Kontakt',
      title: 'Razgovarajmo',
      lead: 'Otvoren sam za freelance projekte i stalne angažmane. Najbrži put je email s nekoliko rečenica o tome što trebate.',
      directTitle: 'Direktan kontakt',
      location: 'Zagreb, Hrvatska',
      expectTitle: 'Što slijedi',
      step1: 'Pišete mi kratak opis projekta, roka i okvirnog budžeta.',
      step2: 'Javljam se s pitanjima i prijedlogom pristupa, bez obveze.',
      step3: 'Ako se poklopimo, dogovaramo opseg, cijenu i termin isporuke.',
      briefTitle: 'Što mi olakšava odgovor',
      brief: 'Ne treba vam gotova specifikacija. Ovih nekoliko podataka dovoljno je da procijenim je li projekt izvediv i koliko traje:',
      brief1: 'Čime se bavite i tko su vam klijenti',
      brief2: 'Imate li već stranicu i što na njoj ne radi',
      brief3: 'Treba li stranica biti višejezična',
      brief4: 'Postoji li rok do kojeg mora biti gotova',
      seeWork: 'Pogledajte prije toga radove',
    },
    privacyPage: {
      metaTitle: 'Politika privatnosti | Martin Bogoje',
      metaDesc:
        'Kako se obrađuju podaci na stranici bogojemartin.com: koji se podaci prikupljaju, zašto, koliko se čuvaju i koja prava imate prema GDPR-u.',
      label: 'Pravno',
      title: 'Politika privatnosti',
      lead: 'Ova stranica prikuplja što je manje moguće. Nema obrazaca, nema profiliranja i nema kolačića za praćenje.',
      controllerTitle: 'Voditelj obrade',
      controller:
        'Voditelj obrade osobnih podataka je Martin Bogoje, Zagreb, Hrvatska. Za sva pitanja o obradi podataka dostupan sam na email adresi navedenoj na dnu ove stranice.',
      dataTitle: 'Koje podatke prikupljam',
      data: 'Stranica nema kontaktni obrazac ni korisničke račune, pa ne prikupljam podatke koje sami unosite. Ako mi pošaljete email, obrađujem vašu adresu i sadržaj poruke isključivo kako bih odgovorio na upit. Pravna osnova je legitimni interes, odnosno poduzimanje radnji prije sklapanja ugovora.',
      analyticsTitle: 'Analitika',
      analyticsOn:
        'Za mjerenje posjećenosti koristim analitiku bez kolačića koja ne pohranjuje identifikatore na vašem uređaju i ne prati vas kroz druge stranice. Podaci se prikupljaju zbirno, bez osobnih podataka, i služe isključivo za praćenje broja posjeta i najčešće gledanih stranica.',
      analyticsOff:
        'Trenutačno na stranici nema alata za analitiku, praćenje ni oglašavanje. Ne postavljam kolačiće u vaš preglednik, zbog čega ova stranica ni ne prikazuje obavijest o kolačićima.',
      hostingTitle: 'Hosting i zapisi poslužitelja',
      hosting:
        'Stranica je statična i posluživana preko davatelja usluge hostinga koji, kao i svaki web poslužitelj, bilježi tehničke podatke o zahtjevima, uključujući IP adresu, vrstu preglednika i vrijeme pristupa. Ti zapisi služe sigurnosti i stabilnosti usluge i ne koriste se za identifikaciju posjetitelja.',
      rightsTitle: 'Vaša prava',
      rights:
        'Prema Općoj uredbi o zaštiti podataka imate pravo na pristup svojim podacima, ispravak, brisanje, ograničenje obrade i prigovor na obradu. Ako smatrate da su vam prava povrijeđena, imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka.',
      retentionTitle: 'Čuvanje podataka',
      retention:
        'Email prepisku čuvam onoliko dugo koliko je potrebno za odgovor na upit i eventualnu poslovnu suradnju, nakon čega je brišem. Tehnički zapisi poslužitelja brišu se prema politici davatelja hostinga.',
      contactTitle: 'Pitanja',
      contact:
        'Za bilo kakvo pitanje o obradi vaših podataka, zahtjev za brisanje ili pristup podacima, javite se emailom i odgovorit ću u razumnom roku.',
      contactLine: 'Kontakt za pitanja o privatnosti:',
    },
  },

  en: {
    aboutPage: {
      metaTitle: 'About | Martin Bogoje, software developer in Zagreb',
      metaDesc:
        'Software developer based in Zagreb: MSc studies at FER, experience at Ericsson Nikola Tesla, and seven client web projects across tourism, real estate and design.',
      label: 'About',
      title: 'Who I am',
      lead: 'Martin Bogoje, a software developer based in Zagreb. I build websites and applications for clients who need the site to work as a tool rather than decoration: fast, clear, and findable.',
      p1: 'I am currently completing a master’s degree in computing at the Faculty of Electrical Engineering and Computing, University of Zagreb, specialising in software engineering and information systems, after finishing my undergraduate degree at the same faculty.',
      p2: 'I worked as a Software Developer at Ericsson Nikola Tesla, one of the largest technology companies in the region. That taught me what independent projects rarely do: what code looks like when somebody else has to maintain it, why documentation gets written, and how much process sits behind a single release.',
      p3: 'Alongside that I started taking on my own clients. So far that is seven projects carried from concept to production: a real estate agency, a campsite, a destination guide, private accommodation, a graphic design studio, a fitness coaching programme and a student event. Most come from tourism and real estate on the Pelješac peninsula and the surrounding area.',
      p4: 'I work with React and Vite when a project calls for an application, and with WordPress when the client needs to maintain the content themselves. On the backend, Node.js, C# and PostgreSQL. Technical SEO and load speed are part of the job rather than an add-on service.',
      p5: 'I work in Croatian, English and German, and this site also exists in Polish. That is not incidental: a large share of the visitors my clients serve arrive from abroad, so multilingual delivery is more often a requirement than an exception.',
      howTitle: 'How I work',
      how: 'I start from what the site has to achieve, not from how it should look. Content structure comes next, then design, then build. Before handover I check speed, the mobile view and the technical SEO groundwork. The client gets something they can maintain themselves, plus the documentation to do it.',
      factsTitle: 'In short',
      fact1: 'MSc in computing at FER, University of Zagreb',
      fact2: 'Former Software Developer at Ericsson Nikola Tesla',
      fact3: 'Seven client projects in production, from React applications to WordPress sites',
      fact4: 'Working in Croatian, English and German',
      ctaContact: 'Get in touch',
    },
    contactPage: {
      metaTitle: 'Contact | Martin Bogoje, web development in Zagreb',
      metaDesc:
        'Get in touch with Martin Bogoje about a website or application. Based in Zagreb, Croatia, available for freelance projects and permanent roles.',
      label: 'Contact',
      title: 'Let’s talk',
      lead: 'I am open to freelance projects and permanent roles. The fastest route is an email with a few lines about what you need.',
      directTitle: 'Direct contact',
      location: 'Zagreb, Croatia',
      expectTitle: 'What happens next',
      step1: 'You send a short description of the project, the timeline and a rough budget.',
      step2: 'I come back with questions and a proposed approach, with no obligation.',
      step3: 'If it is a fit, we agree scope, price and a delivery date.',
      briefTitle: 'What helps me answer',
      brief: 'You do not need a finished specification. These few details are enough for me to judge whether the project is feasible and how long it takes:',
      brief1: 'What you do and who your customers are',
      brief2: 'Whether you already have a site, and what is not working on it',
      brief3: 'Whether the site needs to be multilingual',
      brief4: 'Whether there is a deadline it has to meet',
      seeWork: 'Have a look at the work first',
    },
    privacyPage: {
      metaTitle: 'Privacy policy | Martin Bogoje',
      metaDesc:
        'How data is handled on bogojemartin.com: what is collected, why, how long it is kept, and what rights you have under the GDPR.',
      label: 'Legal',
      title: 'Privacy policy',
      lead: 'This site collects as little as possible. No forms, no profiling, and no tracking cookies.',
      controllerTitle: 'Data controller',
      controller:
        'The controller of personal data is Martin Bogoje, Zagreb, Croatia. For any question about data processing, I am reachable at the email address given at the bottom of this page.',
      dataTitle: 'What data is collected',
      data: 'The site has no contact form and no user accounts, so I do not collect data that you enter yourself. If you email me, I process your address and the content of your message solely in order to answer the enquiry. The legal basis is legitimate interest, or taking steps prior to entering into a contract.',
      analyticsTitle: 'Analytics',
      analyticsOn:
        'Visitor numbers are measured with cookieless analytics that stores no identifier on your device and does not follow you across other sites. Data is collected in aggregate, without personal data, and is used only to see how many visits there are and which pages are read.',
      analyticsOff:
        'There are currently no analytics, tracking or advertising tools on this site. No cookies are placed in your browser, which is also why this site shows no cookie notice.',
      hostingTitle: 'Hosting and server logs',
      hosting:
        'The site is static and served through a hosting provider which, like any web server, records technical details about requests, including IP address, browser type and time of access. These logs exist for security and reliability and are not used to identify visitors.',
      rightsTitle: 'Your rights',
      rights:
        'Under the General Data Protection Regulation you have the right to access your data, to rectification, erasure, restriction of processing and to object to processing. If you believe your rights have been infringed, you may lodge a complaint with the Croatian Personal Data Protection Agency or your local supervisory authority.',
      retentionTitle: 'Retention',
      retention:
        'Email correspondence is kept for as long as it takes to answer the enquiry and handle any resulting work, and is deleted afterwards. Technical server logs are deleted according to the hosting provider’s policy.',
      contactTitle: 'Questions',
      contact:
        'For any question about how your data is handled, or a request for access or erasure, send me an email and I will respond within a reasonable period.',
      contactLine: 'Privacy contact:',
    },
  },

  de: {
    aboutPage: {
      metaTitle: 'Über mich | Martin Bogoje, Softwareentwickler in Zagreb',
      metaDesc:
        'Softwareentwickler aus Zagreb: Masterstudium an der FER, Erfahrung bei Ericsson Nikola Tesla und sieben Kundenprojekte aus Tourismus, Immobilien und Design.',
      label: 'Über mich',
      title: 'Wer ich bin',
      lead: 'Martin Bogoje, Softwareentwickler aus Zagreb. Ich baue Websites und Anwendungen für Kunden, denen die Website Werkzeug statt Dekoration sein soll: schnell, übersichtlich und auffindbar.',
      p1: 'Derzeit absolviere ich das Masterstudium Informatik an der Fakultät für Elektrotechnik und Informatik der Universität Zagreb mit Schwerpunkt Software Engineering und Informationssysteme, nach dem Bachelorabschluss an derselben Fakultät.',
      p2: 'Ich habe als Softwareentwickler bei Ericsson Nikola Tesla gearbeitet, einem der größten Technologieunternehmen der Region. Dort lernt man, was eigenständige Projekte selten vermitteln: wie Code aussieht, den jemand anderes pflegen muss, warum Dokumentation entsteht und wie viel Prozess hinter einer einzigen Auslieferung steckt.',
      p3: 'Parallel habe ich begonnen, für eigene Kunden zu arbeiten. Bisher sind das sieben Projekte vom Konzept bis zur Produktion: eine Immobilienagentur, ein Campingplatz, ein Destinationsguide, eine Ferienunterkunft, ein Grafikdesign-Studio, ein Fitness-Coaching-Programm und eine Studierendenveranstaltung. Die meisten kommen aus Tourismus und Immobilien auf der Halbinsel Pelješac und Umgebung.',
      p4: 'Ich arbeite mit React und Vite, wenn ein Projekt eine Anwendung verlangt, und mit WordPress, wenn der Kunde die Inhalte selbst pflegen muss. Im Backend Node.js, C# und PostgreSQL. Technisches SEO und Ladegeschwindigkeit gehören zur Arbeit, nicht zu einer Zusatzleistung.',
      p5: 'Ich arbeite auf Kroatisch, Englisch und Deutsch, und diese Seite existiert zusätzlich auf Polnisch. Das ist kein Zufall: Ein großer Teil der Gäste meiner Kunden kommt aus dem Ausland, weshalb Mehrsprachigkeit häufiger Anforderung als Ausnahme ist.',
      howTitle: 'Wie ich arbeite',
      how: 'Ich beginne bei der Frage, was die Seite erreichen soll, nicht beim Aussehen. Danach folgen Inhaltsstruktur, Design und Umsetzung. Vor der Übergabe prüfe ich Geschwindigkeit, mobile Darstellung und das technische SEO-Fundament. Der Kunde erhält eine Lösung, die er selbst pflegen kann, samt Dokumentation dazu.',
      factsTitle: 'Kurz gefasst',
      fact1: 'Masterstudium Informatik an der FER, Universität Zagreb',
      fact2: 'Ehemaliger Softwareentwickler bei Ericsson Nikola Tesla',
      fact3: 'Sieben Kundenprojekte in Produktion, von React-Anwendungen bis WordPress-Websites',
      fact4: 'Arbeit auf Kroatisch, Englisch und Deutsch',
      ctaContact: 'Kontakt aufnehmen',
    },
    contactPage: {
      metaTitle: 'Kontakt | Martin Bogoje, Webentwicklung in Zagreb',
      metaDesc:
        'Kontaktieren Sie Martin Bogoje zu Website oder Anwendung. Standort Zagreb, Kroatien, verfügbar für freiberufliche Projekte und feste Anstellungen.',
      label: 'Kontakt',
      title: 'Reden wir',
      lead: 'Ich bin offen für freiberufliche Projekte und feste Anstellungen. Der schnellste Weg ist eine E-Mail mit ein paar Zeilen zu Ihrem Vorhaben.',
      directTitle: 'Direkter Kontakt',
      location: 'Zagreb, Kroatien',
      expectTitle: 'Wie es weitergeht',
      step1: 'Sie schicken eine kurze Beschreibung des Projekts, den Zeitrahmen und ein grobes Budget.',
      step2: 'Ich melde mich mit Rückfragen und einem Vorschlag zum Vorgehen, unverbindlich.',
      step3: 'Wenn es passt, vereinbaren wir Umfang, Preis und Liefertermin.',
      briefTitle: 'Was mir die Antwort erleichtert',
      brief: 'Sie brauchen kein fertiges Lastenheft. Diese wenigen Angaben genügen, um einzuschätzen, ob das Projekt machbar ist und wie lange es dauert:',
      brief1: 'Was Sie tun und wer Ihre Kunden sind',
      brief2: 'Ob es bereits eine Website gibt und was daran nicht funktioniert',
      brief3: 'Ob die Seite mehrsprachig sein muss',
      brief4: 'Ob es eine Frist gibt, bis zu der sie fertig sein muss',
      seeWork: 'Vorher die Arbeiten ansehen',
    },
    privacyPage: {
      metaTitle: 'Datenschutzerklärung | Martin Bogoje',
      metaDesc:
        'Wie Daten auf bogojemartin.com verarbeitet werden: was erhoben wird, warum, wie lange es gespeichert bleibt und welche Rechte Sie nach DSGVO haben.',
      label: 'Rechtliches',
      title: 'Datenschutzerklärung',
      lead: 'Diese Seite erhebt so wenig wie möglich. Keine Formulare, kein Profiling, keine Tracking-Cookies.',
      controllerTitle: 'Verantwortlicher',
      controller:
        'Verantwortlicher für die Verarbeitung personenbezogener Daten ist Martin Bogoje, Zagreb, Kroatien. Für Fragen zur Datenverarbeitung erreichen Sie mich unter der am Ende dieser Seite genannten E-Mail-Adresse.',
      dataTitle: 'Welche Daten erhoben werden',
      data: 'Die Seite hat weder ein Kontaktformular noch Benutzerkonten, daher erhebe ich keine von Ihnen eingegebenen Daten. Wenn Sie mir schreiben, verarbeite ich Ihre Adresse und den Inhalt der Nachricht ausschließlich zur Beantwortung der Anfrage. Rechtsgrundlage ist das berechtigte Interesse beziehungsweise die Durchführung vorvertraglicher Maßnahmen.',
      analyticsTitle: 'Analyse',
      analyticsOn:
        'Die Besucherzahlen werden mit cookieloser Analyse gemessen, die keine Kennung auf Ihrem Gerät speichert und Sie nicht über andere Seiten hinweg verfolgt. Die Daten werden aggregiert und ohne Personenbezug erhoben und dienen allein der Anzahl der Besuche und der meistgelesenen Seiten.',
      analyticsOff:
        'Derzeit sind auf dieser Seite keine Analyse-, Tracking- oder Werbewerkzeuge im Einsatz. Es werden keine Cookies in Ihrem Browser gesetzt, weshalb diese Seite auch keinen Cookie-Hinweis anzeigt.',
      hostingTitle: 'Hosting und Server-Logs',
      hosting:
        'Die Seite ist statisch und wird über einen Hosting-Anbieter ausgeliefert, der wie jeder Webserver technische Angaben zu Anfragen protokolliert, darunter IP-Adresse, Browsertyp und Zugriffszeit. Diese Protokolle dienen Sicherheit und Stabilität und werden nicht zur Identifizierung von Besuchern genutzt.',
      rightsTitle: 'Ihre Rechte',
      rights:
        'Nach der Datenschutz-Grundverordnung haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Widerspruch gegen die Verarbeitung. Sind Sie der Ansicht, dass Ihre Rechte verletzt wurden, können Sie sich bei der kroatischen Datenschutzbehörde oder Ihrer zuständigen Aufsichtsbehörde beschweren.',
      retentionTitle: 'Speicherdauer',
      retention:
        'E-Mail-Korrespondenz bewahre ich so lange auf, wie es zur Beantwortung der Anfrage und zur Abwicklung einer daraus entstehenden Zusammenarbeit nötig ist, danach wird sie gelöscht. Technische Server-Logs werden gemäß den Richtlinien des Hosting-Anbieters gelöscht.',
      contactTitle: 'Fragen',
      contact:
        'Bei Fragen zur Verarbeitung Ihrer Daten oder bei einem Auskunfts- oder Löschungsersuchen schreiben Sie mir eine E-Mail; ich antworte innerhalb einer angemessenen Frist.',
      contactLine: 'Kontakt für Datenschutzfragen:',
    },
  },

  pl: {
    aboutPage: {
      metaTitle: 'O mnie | Martin Bogoje, programista z Zagrzebia',
      metaDesc:
        'Programista z Zagrzebia: studia magisterskie na FER, doświadczenie w Ericsson Nikola Tesla i siedem projektów dla klientów z turystyki, nieruchomości i designu.',
      label: 'O mnie',
      title: 'Kim jestem',
      lead: 'Martin Bogoje, programista z Zagrzebia. Tworzę strony i aplikacje dla klientów, którym strona ma służyć jako narzędzie, a nie ozdoba: szybka, czytelna i możliwa do znalezienia.',
      p1: 'Obecnie kończę studia magisterskie z informatyki na Wydziale Elektrotechniki i Informatyki Uniwersytetu w Zagrzebiu, specjalność inżynieria oprogramowania i systemy informacyjne, po ukończeniu studiów licencjackich na tym samym wydziale.',
      p2: 'Pracowałem jako programista w Ericsson Nikola Tesla, jednej z największych firm technologicznych w regionie. To nauczyło mnie tego, czego rzadko uczą samodzielne projekty: jak wygląda kod, który musi utrzymywać ktoś inny, po co powstaje dokumentacja i ile procesu stoi za jednym wdrożeniem.',
      p3: 'Równolegle zacząłem pracować dla własnych klientów. Do tej pory to siedem projektów doprowadzonych od koncepcji do wdrożenia: agencja nieruchomości, kemping, przewodnik destynacyjny, obiekt noclegowy, studio graficzne, program coachingu fitness i wydarzenie studenckie. Większość pochodzi z turystyki i nieruchomości na półwyspie Pelješac i w okolicy.',
      p4: 'Pracuję z React i Vite, gdy projekt wymaga aplikacji, oraz z WordPress, gdy klient musi samodzielnie prowadzić treści. Po stronie backendu Node.js, C# i PostgreSQL. Techniczne SEO i szybkość ładowania traktuję jako część pracy, a nie dodatkową usługę.',
      p5: 'Pracuję po chorwacku, angielsku i niemiecku, a ta strona istnieje także po polsku. To nie przypadek: znaczna część gości obsługiwanych przez moich klientów przyjeżdża z zagranicy, więc wielojęzyczność jest częściej wymogiem niż wyjątkiem.',
      howTitle: 'Jak pracuję',
      how: 'Zaczynam od pytania, co strona ma osiągnąć, a nie od tego, jak ma wyglądać. Potem struktura treści, projekt i wdrożenie. Przed przekazaniem sprawdzam szybkość, widok mobilny i podstawy technicznego SEO. Klient dostaje rozwiązanie, które może utrzymywać samodzielnie, wraz z dokumentacją.',
      factsTitle: 'W skrócie',
      fact1: 'Studia magisterskie z informatyki na FER, Uniwersytet w Zagrzebiu',
      fact2: 'Były programista w Ericsson Nikola Tesla',
      fact3: 'Siedem projektów klienckich we wdrożeniu, od aplikacji React po strony WordPress',
      fact4: 'Praca po chorwacku, angielsku i niemiecku',
      ctaContact: 'Skontaktuj się',
    },
    contactPage: {
      metaTitle: 'Kontakt | Martin Bogoje, tworzenie stron w Zagrzebiu',
      metaDesc:
        'Skontaktuj się z Martinem Bogoje w sprawie strony lub aplikacji. Zagrzeb, Chorwacja, dostępny dla projektów freelance i stałego zatrudnienia.',
      label: 'Kontakt',
      title: 'Porozmawiajmy',
      lead: 'Jestem otwarty na projekty freelance i stałe zatrudnienie. Najszybszą drogą jest e-mail z kilkoma zdaniami o tym, czego potrzebujesz.',
      directTitle: 'Kontakt bezpośredni',
      location: 'Zagrzeb, Chorwacja',
      expectTitle: 'Co dalej',
      step1: 'Wysyłasz krótki opis projektu, termin i orientacyjny budżet.',
      step2: 'Odzywam się z pytaniami i propozycją podejścia, bez zobowiązań.',
      step3: 'Jeśli pasujemy do siebie, ustalamy zakres, cenę i termin wdrożenia.',
      briefTitle: 'Co ułatwia mi odpowiedź',
      brief: 'Nie potrzebujesz gotowej specyfikacji. Te kilka informacji wystarczy, żebym ocenił wykonalność i czas realizacji:',
      brief1: 'Czym się zajmujesz i kim są twoi klienci',
      brief2: 'Czy masz już stronę i co na niej nie działa',
      brief3: 'Czy strona ma być wielojęzyczna',
      brief4: 'Czy jest termin, do którego musi być gotowa',
      seeWork: 'Zobacz najpierw realizacje',
    },
    privacyPage: {
      metaTitle: 'Polityka prywatności | Martin Bogoje',
      metaDesc:
        'Jak przetwarzane są dane na bogojemartin.com: co jest zbierane, dlaczego, jak długo przechowywane i jakie masz prawa zgodnie z RODO.',
      label: 'Informacje prawne',
      title: 'Polityka prywatności',
      lead: 'Ta strona zbiera możliwie najmniej danych. Bez formularzy, bez profilowania i bez plików cookie śledzących.',
      controllerTitle: 'Administrator danych',
      controller:
        'Administratorem danych osobowych jest Martin Bogoje, Zagrzeb, Chorwacja. W sprawach dotyczących przetwarzania danych jestem dostępny pod adresem e-mail podanym na dole tej strony.',
      dataTitle: 'Jakie dane są zbierane',
      data: 'Strona nie ma formularza kontaktowego ani kont użytkowników, więc nie zbieram danych wprowadzanych przez ciebie. Jeśli napiszesz do mnie e-mail, przetwarzam twój adres i treść wiadomości wyłącznie w celu odpowiedzi na zapytanie. Podstawą prawną jest prawnie uzasadniony interes lub podjęcie działań przed zawarciem umowy.',
      analyticsTitle: 'Analityka',
      analyticsOn:
        'Liczbę odwiedzin mierzę analityką bez plików cookie, która nie zapisuje identyfikatorów na twoim urządzeniu i nie śledzi cię na innych stronach. Dane zbierane są zbiorczo, bez danych osobowych, i służą wyłącznie do sprawdzenia liczby wizyt i najczęściej czytanych stron.',
      analyticsOff:
        'Obecnie na tej stronie nie ma narzędzi analitycznych, śledzących ani reklamowych. W twojej przeglądarce nie są umieszczane pliki cookie, dlatego ta strona nie wyświetla też komunikatu o cookies.',
      hostingTitle: 'Hosting i logi serwera',
      hosting:
        'Strona jest statyczna i serwowana przez dostawcę hostingu, który, jak każdy serwer WWW, zapisuje techniczne dane o żądaniach, w tym adres IP, typ przeglądarki i czas dostępu. Logi te służą bezpieczeństwu i stabilności i nie są używane do identyfikacji odwiedzających.',
      rightsTitle: 'Twoje prawa',
      rights:
        'Zgodnie z RODO masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz wniesienia sprzeciwu wobec przetwarzania. Jeśli uważasz, że twoje prawa zostały naruszone, możesz złożyć skargę do chorwackiego organu ochrony danych lub do właściwego organu nadzorczego.',
      retentionTitle: 'Okres przechowywania',
      retention:
        'Korespondencję e-mail przechowuję tak długo, jak jest to potrzebne do odpowiedzi na zapytanie i obsługi ewentualnej współpracy, po czym ją usuwam. Techniczne logi serwera są usuwane zgodnie z polityką dostawcy hostingu.',
      contactTitle: 'Pytania',
      contact:
        'W przypadku pytań o przetwarzanie twoich danych albo wniosku o dostęp lub usunięcie, napisz do mnie e-mail, a odpowiem w rozsądnym terminie.',
      contactLine: 'Kontakt w sprawach prywatności:',
    },
  },
}

let words = 0
for (const [lng, blocks] of Object.entries(COPY)) {
  const p = `src/locales/${lng}.json`
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  for (const [group, values] of Object.entries(blocks)) {
    j[group] = values
    words += Object.values(values).join(' ').split(/\s+/).filter(Boolean).length
  }
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')
  console.log(`ok   [${lng}] aboutPage, contactPage, privacyPage added`)
}
console.log(`\nTotal new copy across all locales: ${words} words`)
