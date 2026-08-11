/**
 * Full-page screenshots via the Chrome DevTools Protocol.
 *
 * The `--screenshot` CLI flag only captures the viewport, so a page whose hero
 * is `100vh` is impossible to capture below the fold: making the window taller
 * just makes the hero taller. Setting a realistic viewport and then asking for
 * `captureBeyondViewport` keeps `100vh` at 1000px while still capturing the
 * whole document.
 *
 * Uses Node 22's built-in WebSocket, so there is no puppeteer dependency.
 *
 *   node scripts/screenshot.mjs <url> <out.png> [width] [height] [selector]
 *
 * Passing a selector scrolls it into view and captures the viewport only.
 * Scroll-linked animations (framer-motion `useScroll`) evaluate to their
 * initial state at scrollY 0, so a full-page capture renders them blank; to see
 * them as a visitor would, the page has to actually be scrolled.
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]

const [url, out, w = '1600', h = '1000', selector] = process.argv.slice(2)
if (!url || !out) {
  console.error('usage: node scripts/screenshot.mjs <url> <out.png> [width] [height]')
  process.exit(1)
}

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

/** Minimal CDP client: send commands, await matching ids, buffer events. */
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

async function main() {
  const chrome = await findChrome()
  const proc = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      '--remote-allow-origins=*',
      'about:blank',
    ],
    { stdio: 'ignore', detached: false },
  )

  try {
    // Wait for the debugging endpoint to come up.
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

    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
    const info = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json())
    const page = connect(info.find((t) => t.id === targetId).webSocketDebuggerUrl)
    await page.ready

    await page.send('Page.enable')
    await page.send('Emulation.setDeviceMetricsOverride', {
      width: Number(w),
      height: Number(h),
      deviceScaleFactor: 1,
      mobile: false,
    })

    await page.send('Page.navigate', { url })

    // Wait for load, then settle for lazy images and entrance animations.
    for (let i = 0; i < 60 && !page.events.includes('Page.loadEventFired'); i++) await sleep(250)
    await sleep(2500)

    // Scroll through the document so lazy/in-view content commits, then reset.
    await page.send('Runtime.evaluate', {
      expression: `(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 220));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 500));
      })()`,
      awaitPromise: true,
    })

    if (selector) {
      // Land the target in view and let scroll-linked animations settle.
      await page.send('Runtime.evaluate', {
        expression: `(async () => {
          const el = document.querySelector(${JSON.stringify(selector)});
          if (!el) throw new Error('selector not found: ' + ${JSON.stringify(selector)});
          el.scrollIntoView({ block: 'center' });
          await new Promise(r => setTimeout(r, 1800));
        })()`,
        awaitPromise: true,
      })
    }

    const { data } = await page.send('Page.captureScreenshot', {
      format: 'png',
      // A selector implies "show me this as a visitor sees it", so capture the
      // viewport at the scrolled position rather than the whole document.
      captureBeyondViewport: !selector,
    })

    await fs.writeFile(out, Buffer.from(data, 'base64'))
    const { size } = await fs.stat(out)
    console.log(`  ${out}  ${(size / 1024).toFixed(0)} KB`)

    page.close()
    browser.close()
  } finally {
    proc.kill()
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
