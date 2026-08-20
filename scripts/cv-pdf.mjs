/**
 * Renders the CV sources in cv/ to PDFs through headless Chrome.
 *
 * The CV used to be a Canva export, which meant it could only be edited in
 * Canva and its font subset mangled č, ć, š, ž and đ whenever anyone copied
 * text out, including an ATS parser. Printing from Chrome keeps the text
 * selectable with a correct Unicode mapping, embeds the same Instrument Sans
 * the site uses, and makes the CV a file in the repo that can be diffed.
 *
 *   npm run cv                      # both editions
 *   node scripts/cv-pdf.mjs         # same
 *
 * Both editions share cv/cv.css, so a styling change cannot leave one of them
 * behind. Each is meant to be one A4 page and the script says so on every run;
 * the English copy is the wordier of the two, so it overflows first.
 *
 * Uses Node 22's built-in WebSocket, so no puppeteer dependency, same as
 * scripts/screenshot.mjs.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { setTimeout as sleep } from 'node:timers/promises'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const EDITIONS = [
  { src: 'cv/cv.html', out: 'cv/Martin_Bogoje-CV.pdf' },
  { src: 'cv/cv-en.html', out: 'cv/Martin_Bogoje-CV-EN.pdf' },
]

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]

const PORT = 9222 + Math.floor(Math.random() * 500)

async function findChrome() {
  for (const c of CHROME_CANDIDATES) {
    try {
      await fs.access(c)
      return c
    } catch {
      /* try next */
    }
  }
  throw new Error('No Chrome or Edge found')
}

/** Minimal CDP client: send commands, await matching ids. */
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl)
  const pending = new Map()
  const events = []
  let id = 0

  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
    } else if (msg.method) {
      events.push(msg.method)
    }
  })

  const ready = new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true })
    ws.addEventListener('error', rej, { once: true })
  })

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id
      pending.set(msgId, { resolve, reject })
      ws.send(JSON.stringify({ id: msgId, method, params }))
    })

  return { ready, send, events, close: () => ws.close() }
}

async function render(browser, edition) {
  const src = path.join(ROOT, edition.src)
  const out = path.join(ROOT, edition.out)
  await fs.access(src)

  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
  const info = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json())
  const page = connect(info.find((t) => t.id === targetId).webSocketDebuggerUrl)
  await page.ready

  await page.send('Page.enable')
  await page.send('Page.navigate', { url: pathToFileURL(src).href })
  for (let i = 0; i < 60 && !page.events.includes('Page.loadEventFired'); i++) await sleep(250)

  // The faces load with `font-display: block`, so glyphs stay blank until the
  // woff2 lands. Printing early produces an invisible CV; wait on the real
  // signal rather than a fixed delay.
  await page.send('Runtime.evaluate', {
    expression: 'document.fonts.ready.then(() => true)',
    awaitPromise: true,
  })

  const { data } = await page.send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true, // honour @page size and margins from cv.css
    generateDocumentOutline: false,
  })

  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, Buffer.from(data, 'base64'))
  const { size } = await fs.stat(out)
  // Each edition is meant to be a single A4 page. Counting page objects in the
  // output is the only check that accounts for @page margins, so it beats
  // measuring scrollHeight in the browser.
  const pages = (Buffer.from(data, 'base64').toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length
  const warn = pages > 1 ? `  <-- ${pages} pages, content overflows` : ''
  console.log(`  ${edition.out}  ${Math.round(size / 1024)} KB  ${pages} page${pages === 1 ? '' : 's'}${warn}`)

  page.close()
}

async function main() {
  const chrome = await findChrome()
  const proc = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      // The page pulls its woff2 files out of node_modules over file://, which
      // an opaque file origin would otherwise refuse.
      '--allow-file-access-from-files',
      `--remote-debugging-port=${PORT}`,
      '--remote-allow-origins=*',
      'about:blank',
    ],
    { stdio: 'ignore', detached: false },
  )

  try {
    let wsUrl
    for (let i = 0; i < 40; i++) {
      try {
        const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
        wsUrl = (await r.json()).webSocketDebuggerUrl
        if (wsUrl) break
      } catch {
        await sleep(250)
      }
    }
    if (!wsUrl) throw new Error('Chrome debugging endpoint never became available')

    const browser = connect(wsUrl)
    await browser.ready

    for (const edition of EDITIONS) await render(browser, edition)

    browser.close()
  } finally {
    proc.kill()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
