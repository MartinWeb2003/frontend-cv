/**
 * English blog copy. Mirrors the Croatian key set exactly.
 *
 *   node scripts/apply-blog-copy-en.mjs
 */
import fs from 'node:fs'

const blog = {
  indexMetaTitle: 'Blog on web development and SEO | Martin Bogoje',
  indexMetaDesc:
    'Writing on website speed, choosing a stack, and sites for tourism. No marketing filler, with concrete examples from real projects.',
  indexTitle: 'Blog',
  indexLead:
    'The questions clients actually ask before commissioning a site, answered the way I would answer them in conversation. No tool lists, and no promises of first place on Google.',
  crumb: 'Blog',
  readMore: 'Read',
  allPosts: 'All posts',
  nextPost: 'Next post',
  relatedTitle: 'Related projects',
  ctaLabel: 'Related service',

  /* ── 01 Speed ── */
  b1Title: 'Why your website is slow, and what to do about it',
  b1MetaTitle: 'Why your website is slow and how to fix it',
  b1MetaDesc:
    'The most common reasons a website loads slowly, how to measure the real cause, and what to fix first. No guesswork, no redesign.',
  b1Lead:
    'A site that takes five seconds to open has lost a share of its visitors before they saw anything. The good news is the cause is almost always the same one, and it is rarely solved by a redesign.',
  b1Intro:
    'When somebody asks me why their site is slow, they usually already have a theory: the hosting, too many plugins, "something with WordPress". In practice the answer is far more boring nine times out of ten, and better still, far cheaper to fix. Here is what it looks like when you start from measurement instead of guesswork.',

  b1S1Title: 'Speed is not an aesthetic question',
  b1S1A:
    'A waiting visitor has none of the patience you have for your own site. For tourism and service businesses much of the traffic arrives on a phone, often on a mobile network outside town, and there the difference between two and five seconds is the difference between an enquiry and a closed tab.',
  b1S1B:
    'Google measures this and uses it. Core Web Vitals is a set of metrics describing how quickly the main content appears, how quickly the page responds to a tap, and how much the layout jumps while loading. It is not the dominant ranking factor, but it is the one that decides between two pages of similar quality. If you are in that position, and most small businesses are, speed is one of the few places where an advantage can be won technically.',

  b1S2Title: 'Images are almost always the main culprit',
  b1S2A:
    'In every audit I have run, images were the single largest weight. The reason is simple: a photograph straight out of a camera is several thousand pixels wide and several megabytes, and it gets displayed in a frame a few hundred pixels across. The browser downloads the whole file regardless.',
  b1S2B:
    'The fix has three parts. First, images are saved in a modern format like WebP, typically two to five times smaller than the same JPEG. Second, several sizes of the same image are prepared so a phone downloads the smaller one. Third, images below the fold load only as the visitor approaches them. Together these often halve the weight of a page with no visible change at all.',

  b1S3Title: 'Plugins and scripts nobody uses',
  b1S3A:
    'The second most common cause is things loading on every page but used on one, or none. A booking calendar that lives on the contact page but whose script loads everywhere. A tracking tool somebody added three years ago that nobody looks at. A gallery installed to try out, then left in place.',
  b1S3B:
    'On WordPress this accumulates invisibly, because each plugin brings its own CSS and JavaScript. It is not unusual for a site to load ten stylesheets and twenty scripts, a third of which are actually used. Removing inactive plugins and limiting the rest to the pages that need them is usually the second largest win, right behind images.',

  b1S4Title: 'Hosting and where the server sits',
  b1S4A:
    'Hosting is the real cause less often than people assume, but when it is, you can see it immediately: the page does nothing for a long time, then loads normally. That waiting period is time to first byte, and it depends on the server rather than on your site.',
  b1S4B:
    'For Croatian visitors it also matters where the server physically is. The cheapest plans tend to sit on shared hardware with several hundred other sites, and then your speed depends on what the neighbours are doing. Moving to decent European hosting usually costs less per month than an hour of development work, which makes it one of the few decisions where the answer is almost always obvious.',

  b1S5Title: 'Measure instead of guessing',
  b1S5A:
    'Before any fix, it is worth measuring. PageSpeed Insights is free and gives two things: a lab test and, if the site has enough traffic, real data from actual visitors. That real-world data is what Google uses, so it matters more than the score in the test.',
  b1S5B:
    'Search Console shows the same picture over time and grouped by page type, which is more useful than a single test. If the numbers do not move in the right direction within a few weeks of a fix, the wrong thing was fixed. That is the only reliable way to avoid an expensive redesign that solves a problem which was never there.',

  b1ListTitle: 'What to check first',
  b1L1: 'Open the site on a phone using mobile data rather than wi-fi, and time the wait',
  b1L2: 'Check the weight of the largest image on the homepage; anything over 300 KB is a candidate',
  b1L3: 'Look at the list of active plugins and ask whether each one is genuinely used',
  b1L4: 'Run PageSpeed Insights and read the field data, not just the score',
  b1L5: 'Turn on Search Console if it is not already, because without it there is no history',

  b1CloseTitle: 'When a fix is not enough',
  b1Close:
    'A repair makes sense when the structure is sound and the problem is speed, neglected plugins or missing technical groundwork. If the site is not responsive, runs on a system that is no longer maintained, or the content is so out of date it needs rewriting anyway, then a new site is the more honest answer. An audit shows which of the two you are looking at within a few hours, and it is worth doing before committing to the more expensive option.',

  /* ── 02 WordPress vs React ── */
  b2Title: 'WordPress or React: how to choose for your site',
  b2MetaTitle: 'WordPress or React: what to choose for a website',
  b2MetaDesc:
    'Comparing WordPress and React for small businesses: when each makes sense, what they cost over time, and the question that actually decides it.',
  b2Lead:
    'This is a question developers enjoy and clients rarely benefit from. The decision almost never turns on which technology is better, but on who will maintain the content.',
  b2Intro:
    'If you have been looking for someone to build your site, you have probably had contradictory advice. One says WordPress because it is simple, another says WordPress is slow and offers something modern. Both can be right, because they are answering different questions. Here is how I make the call, and which question actually settles it.',

  b2S1Title: 'The question is not which technology is better',
  b2S1A:
    'Both WordPress and React can produce a fast, tidy, well-ranked site, and both can produce a slow, unmaintainable one. The technology sets an upper bound; the execution determines the result. I have seen WordPress sites that load in a second and React applications that barely function on a phone.',
  b2S1B:
    'So the first question is never technical. I ask who will change the content, how often, and how much that person is willing to learn. The answer usually resolves ninety percent of the dilemma before any tool gets mentioned.',

  b2S2Title: 'When WordPress makes sense',
  b2S2A:
    'WordPress is the answer when the content is alive. If you change prices by season, add properties, publish news, or want to swap photographs yourself without emailing a developer, you need an editing system, and WordPress is the most widespread one in Croatia. That also means it is easier to find somebody who knows it if our paths diverge.',
  b2S2B:
    'The price of that flexibility is maintenance. WordPress and its plugins need regular updates, and every plugin is something that can break or slow the site down. That is not a reason to avoid it, but it is a line item to plan for: an installation nobody has updated in two years is a security problem, not just technical debt.',

  b2S3Title: 'When React makes sense',
  b2S3A:
    'React makes sense when the site does something specific that off-the-shelf systems handle badly, or when speed and interface behaviour are part of the product. Calculators, configurators, interactive displays, applications with their own logic. It also makes sense when the content barely changes, because then there is no reason to pay for and maintain an entire CMS layer.',
  b2S3B:
    'What often goes unsaid is that a React site is not automatically good for search engines without extra work. If content is drawn only in the browser, some of the tools that read the page will see nothing. There is a solution, called prerendering or server-side rendering, but it is work somebody has to do. If you are offered a React site, ask how that part is handled.',

  b2S4Title: 'The mistake made most often',
  b2S4A:
    'The most expensive mistake is choosing the technology before knowing who maintains the content. That is where React sites come from whose owner cannot change a phone number without an invoice, and WordPress installs with fifteen plugins on a site that has not changed since launch.',
  b2S4B:
    'The second common mistake is choosing by novelty. Technology that was popular five years ago is often a burden today, and what is popular now will be in the same position in five years. A more useful question than "is this modern" is "will somebody be able to take this over in three years".',

  b2S5Title: 'Cost over time, not just at the start',
  b2S5A:
    'The initial price is the visible part. What gets calculated less often is the cost across several years: hosting, updates, small changes, and the time you spend maintaining it yourself. WordPress usually has a lower entry price and higher maintenance. A static or React build usually has the opposite profile.',
  b2S5B:
    'So I ask how long the site needs to last. For a site that is an advertisement for one season and a site that underpins the business for the next five years, the answer is not the same, even when they look almost identical.',

  b2ListTitle: 'Five questions that decide it for you',
  b2L1: 'Who will change the content, and how often',
  b2L2: 'Does the site do anything beyond displaying information',
  b2L3: 'How much are you willing to spend on maintenance each year',
  b2L4: 'Does the site need to exist in several languages',
  b2L5: 'How long do you expect this version of the site to last',

  b2CloseTitle: 'The answer in one sentence',
  b2Close:
    'If you change the content yourself and often, take WordPress and budget for maintenance. If the content rarely changes or the site does something specific, a static or React build gives you a faster and quieter result. If you are not sure, that is a sign the conversation needs to be about content first, not technology.',

  /* ── 03 Tourism ── */
  b3Title: 'Websites for holiday rentals and campsites: what guests look for',
  b3MetaTitle: 'Websites for holiday rentals: what guests look for',
  b3MetaDesc:
    'What a tourism website needs before a guest sends an enquiry: photography, practical detail, languages and speed. From projects on Pelješac.',
  b3Lead:
    'A guest is looking at your site on a phone, often with five other tabs open. The decision happens within seconds, and almost never on the basis of what you think matters most.',
  b3Intro:
    'I have built sites for a campsite, private accommodation and a destination guide, mostly on the Pelješac peninsula. The pattern repeats every time: a lot of photography, an audience from abroad, and visitors who are still planning the trip. This is what those projects showed actually affects whether an enquiry arrives.',

  b3S1Title: 'The first few seconds decide',
  b3S1A:
    'A guest does not read, they scan. The first screen has to deliver three things: what the property is, where it is, and what the surroundings look like. If they have to scroll to work out whether they are looking at an apartment or a campsite, you have already lost them to the next open tab.',
  b3S1B:
    'That makes the opening photograph the hardest-working element on the entire site. An aerial shot of the bay or a view from the terrace says more than three paragraphs of text, and it is one of the few places where paying for professional photography beats paying for extra functionality.',

  b3S2Title: 'Photography is both the most important and the most demanding part',
  b3S2A:
    'A tourism site sells an impression, and the impression is carried by photographs. At the same time, photographs are the main reason tourism sites take ten seconds to open. A gallery of thirty images straight from a camera is tens of megabytes, which is unusable on a mobile network in July.',
  b3S2B:
    'The answer is not fewer photographs but smarter delivery. Images get prepared in several sizes, saved in a modern format, and loaded progressively as the guest scrolls. The gallery stays rich and the page opens immediately. This is a difference a guest will never notice but will absolutely feel.',

  b3S3Title: 'The practical details guests want and rarely get',
  b3S3A:
    'After the impression come the specifics, and this is where most sites fall down. How far the sea is, in walking minutes rather than as the crow flies. Whether there is shade. What the sanitary facilities are like. Whether there is parking. Whether pets are allowed. Whether the air conditioning works. How long the drive from the ferry takes.',
  b3S3B:
    'Every one of those questions the site fails to answer becomes an email you have to write, or a guest who gave up rather than ask. The list of questions you actually receive in enquiries is the best possible blueprint for the structure of the site, and it is worth compiling before any design starts.',

  b3S4Title: 'Languages by market, not by ambition',
  b3S4A:
    'Guests come from specific countries and you already know which from your own bookings. If those are Germany, Poland and Austria, then German and Polish make sense, and Italian does not simply because it sounds good. Two well-written versions always beat five machine-translated ones, because a guest spots a bad sentence in their own language as fast as you would.',
  b3S4B:
    'Technically, it matters that each language has its own URL. A version that exists only as a toggle on the same address effectively does not exist to a search engine, so a German guest searching in German will never reach it. This is one of the few technical decisions that directly affects the number of enquiries.',

  b3S5Title: 'Platforms are not a substitute for your own site',
  b3S5A:
    'The large platforms bring guests and that is real value. But they take a commission, they own the relationship with the guest, and they can change the rules whenever they like. Your own site does not replace the platform; it means the guest who found you there can book directly next time.',
  b3S5B:
    'That does not require a booking system. For most smaller properties an enquiry form and a clearly visible contact work better, because the guest wants confirmation from the host before paying anyway. A full system with a calendar and availability only makes sense once the number of units or the volume of enquiries justifies it.',

  b3ListTitle: 'What every tourism site needs',
  b3L1: 'An opening photograph that explains in one second where you are and what the property is',
  b3L2: 'Answers to practical questions, including distance to the sea in walking minutes',
  b3L3: 'Contact details visible from every page, not only on a separate contact page',
  b3L4: 'Language versions on their own URLs, for the markets guests actually come from',
  b3L5: 'Galleries that load progressively, so the page opens on a mobile network too',

  b3CloseTitle: 'The season is a deadline nobody moves',
  b3Close:
    'A tourism site has one deadline no other project has. A site published in mid-July has missed the window in which guests decide, and search engines need several weeks before they even begin showing it. So the build gets planned backwards from the date traffic actually starts, and the best time to do the work is winter, when there is room to gather photography and text.',
}

const p = 'src/locales/en.json'
const j = JSON.parse(fs.readFileSync(p, 'utf8'))
j.blog = blog
fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n', 'utf8')

const words = Object.values(blog).join(' ').split(/\s+/).filter(Boolean).length
console.log(`ok   [en] blog: ${Object.keys(blog).length} keys, ${words} words`)
