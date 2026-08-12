/**
 * English copy for the services hub and the three service pages.
 * Mirrors the Croatian key set exactly; see apply-services-copy-hr.mjs.
 *
 *   node scripts/apply-services-copy-en.mjs
 */
import fs from 'node:fs'

const services = {
  indexMetaTitle: 'Services: web development and maintenance | Martin Bogoje',
  indexMetaDesc:
    'Website and application development, sites for tourism and holiday rentals, plus maintenance and technical SEO. Based in Zagreb, Croatia.',
  indexTitle: 'Services',
  indexLead:
    'Three things I do, described the way they actually go: what you get, how the process runs, and who each one is for.',
  crumbServices: 'Services',
  getTitle: 'What you get',
  processTitle: 'How it runs',
  forTitle: 'Who it is for',
  stackTitle: 'Stack',
  proofTitle: 'Examples from real work',
  faqTitle: 'Common questions',
  ctaTitle: 'Have a project in mind?',
  ctaText:
    'Send a few lines about what you need and I will come back with questions and a proposed approach, with no obligation.',
  ctaBtn: 'Get in touch',
  viewService: 'Read more',
  next: 'Next service',

  /* ── 01 ── */
  s1Name: 'Website development',
  s1Title: 'Website and web application development',
  s1MetaTitle: 'Website development in Zagreb | Martin Bogoje',
  s1MetaDesc:
    'Website and web application development in React or WordPress: design, build, technical SEO and going live. Based in Zagreb, Croatia.',
  s1Lead:
    'A site that does the job you commissioned it for: explains the offer, brings in enquiries, and looks as good on a phone as on a large screen.',
  s1Intro1:
    'I build websites from the first conversation through to the moment they are live and in use. That covers content structure, design, the build, testing on real devices, and setting up the domain and hosting. What the client ends up with is something they can maintain themselves, not something that depends on me every time a phone number changes.',
  s1Intro2:
    'There is no single type of site that suits everyone. A small business brochure site, a property catalogue and a single-goal landing page are three different problems and need three different answers. So I start by asking what the site has to achieve, and only then do we pick the technology.',
  s1Intro3:
    'Price and timeline depend on scope, so I do not publish a fixed rate card that would be wrong for half the enquiries anyway. After a short conversation I can tell you whether the project is feasible, roughly how long it takes and what it costs, and you get that before anything is agreed.',
  s1Get1: 'Design built around your content, not a template that content is later forced into',
  s1Get2: 'Responsive layout tested on real phones, not only in developer tools',
  s1Get3: 'Technical SEO groundwork: semantic headings, meta data, clean URLs and optimised images',
  s1Get4: 'Fast loading, because most visits arrive over mobile networks rather than office wi-fi',
  s1Get5: 'Going live with domain, hosting and certificate, plus instructions for maintaining it yourself',
  s1Step1:
    'Conversation and scope. We go through what the site has to achieve, who the audience is and what content already exists. That produces a page list and a time estimate.',
  s1Step2:
    'Structure and design. Content layout first, visual design second. Most corrections happen in this phase, because changing things here is the cheapest it will ever be.',
  s1Step3:
    'Build. Development in the agreed technology, with regular progress reviews so there are no surprises at the end.',
  s1Step4:
    'Handover. Device testing, a speed and SEO check, deployment to the domain, and handover with documentation.',
  s1For1: 'Small businesses needing a first proper site instead of a social media profile',
  s1For2: 'Companies with a site a few years old that handles badly on mobile',
  s1For3: 'Clients who need a landing page with one clear goal, a sign-up or an enquiry',
  s1For4: 'Projects that call for a custom application rather than bending an off-the-shelf system',
  s1NoteTitle: 'What I watch most closely',
  s1Note1:
    'Content before design. A page arranged around empty boxes always falls apart when the real text arrives.',
  s1Note2:
    'One clear action per page. Five equally prominent buttons means the visitor presses none of them.',
  s1Note3:
    'Speed is not fixed at the end. Decisions about images, fonts and scripts are made during the build, because retrofitting performance always costs more.',
  s1Faq1Q: 'How long does a website take?',
  s1Faq1A:
    'It depends on the number of pages and on whether it is a presentation site or an application with its own logic. In practice the largest share of the time is not development but gathering content: text, photography and details of the offer. If the content is ready at the start, the timeline shortens more than any technical decision could manage.',
  s1Faq2Q: 'React or WordPress?',
  s1Faq2A:
    'WordPress makes sense when you change content often and want to do it yourself without development work. React makes sense when the site does something specific that off-the-shelf systems handle badly, or when speed and interface behaviour are critical. The decision follows who will maintain the content, not what is currently fashionable.',
  s1Faq3Q: 'Can I edit the content myself?',
  s1Faq3A:
    'With WordPress yes, and that is usually the main reason for choosing it. With a React build, content is either connected to a dedicated editing system or changed in code. We answer that question before the build starts, because it materially changes both approach and cost.',
  s1Faq4Q: 'Do you do design too, or do I need it ready?',
  s1Faq4A:
    'I do design as well. If you already have a visual identity, logo and colours, I work inside it. If you do not, the design emerges through the project. Either way I start from the content, because design without content ends up as a nice arrangement of empty frames.',
  s1Faq5Q: 'What if I already have a domain and hosting?',
  s1Faq5A:
    'Not a problem, I work with what exists. If the hosting is materially slowing the site down I will tell you and explain why, but the decision to move stays yours.',
  s1Faq6Q: 'Who writes the copy?',
  s1Faq6A:
    'The best result is when the text comes from you, because you know the business and the customers, and I arrange it into a structure that works on the web. If there is no text, we build it together through a handful of questions. What I will not do is fill a page with empty phrasing so it looks full.',

  /* ── 02 ── */
  s2Name: 'Websites for tourism',
  s2Title: 'Websites for holiday rentals, campsites and tourism',
  s2MetaTitle: 'Websites for tourism and holiday rentals | Martin Bogoje',
  s2MetaDesc:
    'Websites for holiday rentals, campsites and tourism businesses: multilingual, fast-loading galleries and a clear path to a booking enquiry.',
  s2Lead:
    'A guest decides within seconds, and almost always on a phone. The site has to show the property, the surroundings and how to book before their patience runs out.',
  s2Intro1:
    'Tourism content is almost entirely visual, but the decision is made on specifics: how far the sea is, whether there is shade, what the sanitary facilities are like, whether pets are allowed. The site has to reconcile a large amount of practical information with a presentation that stays calm and easy to scan.',
  s2Intro2:
    'So far I have built sites for a campsite, private accommodation, a destination guide and a real estate agency, mostly on the Pelješac peninsula. Every one of those projects followed the same pattern: a lot of photography, an international audience, and visitors arriving on mobile while they are still planning the trip.',
  s2Intro3:
    'A tourism site also has a deadline no other project has: the season. A site published in mid-July has missed the exact window in which guests make their decision, so the build gets planned backwards from the date traffic actually starts.',
  s2Get1: 'Optimised galleries that load progressively instead of blocking the page',
  s2Get2:
    'A multilingual interface with a separate URL per language, so every version is visible to search engines',
  s2Get3: 'A clear, always-available route to an enquiry, with no hunting for contact details in the footer',
  s2Get4: 'A structure that absorbs growth: new units, seasons and amenities are added without a redesign',
  s2Get5: 'Distances, surroundings and amenities that answer a guest’s questions before they ask them',
  s2Step1:
    'A list of what the guest must learn. Before any design we assemble the questions guests actually ask, because those determine the structure of the site.',
  s2Step2:
    'Photography preparation. Selection, processing and optimisation, because photographs are simultaneously the most important and the most technically demanding part of a tourism site.',
  s2Step3:
    'Build and language versions. Setting up the site and its translations, with a URL structure that tells search engines clearly which version serves which market.',
  s2Step4:
    'Delivery before the season. Testing on phones and slower networks, then publishing with enough time to correct things before traffic starts.',
  s2For1: 'Private hosts and holiday rentals who want bookings outside the large platforms as well',
  s2For2: 'Campsites and smaller properties that need to show pitches, amenities and surroundings',
  s2For3: 'Tourism agencies and destination guides with a larger body of content',
  s2For4: 'Properties targeting guests from abroad that need the site in several languages',
  s2NoteTitle: 'What holds tourism sites back most',
  s2Note1:
    'Full-size photographs straight out of the camera. The single most common reason a tourism site takes ten seconds to open.',
  s2Note2:
    'Contact details hidden on a separate page. A guest who has decided should not have to look for how to reach you.',
  s2Note3:
    'Machine translation published unreviewed. A German guest spots a bad German sentence exactly as fast as you spot a bad one in your own language.',
  s2Faq1Q: 'Do I need a site if I am already on the big platforms?',
  s2Faq1A:
    'Platforms bring guests, but they take a commission and they keep the relationship with the guest. Your own site does not replace the platform; it means the guest who found you there can book directly next time. For that, the site only has to exist, open quickly and show a clear contact.',
  s2Faq2Q: 'How many languages should the site have?',
  s2Faq2A:
    'As many as the markets your guests actually come from, not as many as sounds impressive. Two well-written versions beat five machine-translated ones. Each language gets its own URL, because a version that exists only as a toggle on the same address effectively does not exist to a search engine.',
  s2Faq3Q: 'Can I change prices and photos myself each season?',
  s2Faq3A:
    'Yes, and for tourism sites I set it up that way almost every time. Prices, availability and photography change every season, and a solution that needs a developer for each edit stops being updated by its second year.',
  s2Faq4Q: 'Do you build booking systems?',
  s2Faq4A:
    'It depends what you actually need. For most smaller properties an enquiry form and a clear contact work better than a full booking system, because the guest wants confirmation from the host anyway. If a real system with a calendar and availability is genuinely required, that is a separate project and we treat it as one.',
  s2Faq5Q: 'When is the best time to build?',
  s2Faq5A:
    'Out of season. You have time to gather photography and text, and the site gets a few months to be indexed before traffic starts. A site published in July misses precisely the period in which guests are deciding.',
  s2Faq6Q: 'Do I need professional photography?',
  s2Faq6A:
    'It helps more than any technical decision. A tourism site sells an impression, and the impression is carried by the photographs. If professional shots do not exist we work with what there is and pick the best, but it is worth investing in photography before extra functionality.',

  /* ── 03 ── */
  s3Name: 'Maintenance and SEO',
  s3Title: 'Maintenance, speed and technical SEO for an existing site',
  s3MetaTitle: 'Website maintenance and technical SEO | Martin Bogoje',
  s3MetaDesc:
    'Maintenance for existing websites, faster loading and technical SEO. An audit, fixes ordered by impact, and measurement afterwards.',
  s3Lead:
    'If the site exists but opens slowly, does not show up on Google, or nobody has touched it in two years, what it usually needs is a repair rather than a redesign.',
  s3Intro1:
    'Most sites do not fail because they were built badly. They fail because nobody maintains them. Images get uploaded at full size, plugins go un-updated, text goes stale, and speed degrades until visitors give up before the page opens.',
  s3Intro2:
    'This service starts from measurement rather than assumption. First we establish what is genuinely slowing the site down and what is stopping it from being found, then fix things in order of impact. A redesign only comes into it if the audit shows repair does not make sense.',
  s3Intro3:
    'The audit is worth having even if we then do nothing. You get a list of findings ordered by impact and you can work through it yourself or with somebody else. I would rather tell you the site does not need fixing than charge for work that changes nothing.',
  s3Get1: 'A speed audit on real devices and networks, with a list of what slows the site most',
  s3Get2: 'A technical SEO review: titles, meta data, indexing, sitemap and URL structure',
  s3Get3: 'Image and loading optimisation, usually the single largest speed win available',
  s3Get4: 'System and plugin updates, with a check that nothing broke afterwards',
  s3Get5: 'Google Search Console and analytics set up, so you can see what is actually happening',
  s3Step1:
    'Audit. I measure speed, check how the site looks to search engines, and produce a list of findings ordered by impact.',
  s3Step2:
    'Agreeing scope. Together we choose what gets done now and what can wait, because fixing everything at once rarely makes sense.',
  s3Step3:
    'Fixes. Carrying out the agreed changes, verifying that each one genuinely helps and that nothing else broke in the process.',
  s3Step4:
    'Measurement. After the changes we watch the numbers in Search Console and analytics, because the effect of technical SEO only becomes visible over several weeks.',
  s3For1: 'Sites that load slowly, particularly over mobile networks',
  s3For2: 'Sites that do not appear on Google even for their own name',
  s3For3: 'WordPress installations that have gone a long time without updates',
  s3For4: 'Owners who want to know what is actually happening before investing in a redesign',
  s3NoteTitle: 'Where the biggest win usually comes from',
  s3Note1:
    'Images. In almost every audit I have run they were the single largest drag on speed.',
  s3Note2:
    'Unnecessary scripts. Plugins and tracking tools loaded on every page but used on one.',
  s3Note3:
    'Missing groundwork. Sites with no sitemap, no Search Console and empty meta descriptions cannot even be measured, let alone fixed.',
  s3Faq1Q: 'How do I know whether I need a repair or a new site?',
  s3Faq1A:
    'The audit answers that. If the structure is sound and the problem is speed, outdated plugins or missing SEO groundwork, a repair is cheaper and faster. If the site is not responsive, relies on technology that is no longer maintained, or the content is thoroughly out of date, a redesign is the more honest answer.',
  s3Faq2Q: 'Can you guarantee first place on Google?',
  s3Faq2A:
    'No, and nobody serious can. Nobody controls Google’s algorithm or how strong the competition is for a given term. What can be done is removing the technical obstacles that stop a site from being in the running at all, and then measuring the movement in Search Console.',
  s3Faq3Q: 'Do you work on sites you did not build?',
  s3Faq3A:
    'Yes, that is actually the most common case. I start by reviewing the state it is in and tell you if something is set up such that repair does not make sense. I will not take on work on a site without that review, because otherwise I would be guessing.',
  s3Faq4Q: 'Is maintenance one-off or monthly?',
  s3Faq4A:
    'It can be either. A one-off audit and repair makes sense if the site has been neglected. Ongoing maintenance makes sense if the content is alive and the system and plugins have to be kept current. Which one fits becomes clear after the first audit.',
  s3Faq5Q: 'Will something break during updates?',
  s3Faq5A:
    'That is why a backup is taken before updating and why the site itself is checked afterwards, not just the plugin version. If something breaks it goes back to the previous state and we find the cause. The risk of updating is real, but it is smaller than the risk of an un-updated installation.',
  s3Faq6Q: 'How quickly do results show?',
  s3Faq6A:
    'Speed shows immediately, the same day. Search visibility does not. Google has to re-crawl the pages and assess the changes, which in practice means several weeks before movement appears in Search Console. Anyone promising faster is promising something they do not control.',
}

const p = 'src/locales/en.json'
const j = JSON.parse(fs.readFileSync(p, 'utf8'))
j.services = services
fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')

const words = Object.values(services).join(' ').split(/\s+/).filter(Boolean).length
console.log(`ok   [en] services copy added: ${Object.keys(services).length} keys, ${words} words`)
