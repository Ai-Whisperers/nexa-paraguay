import { chromium } from 'playwright'
import { spawn } from 'child_process'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots')

// Focus only on the 5 core pages for the Hermes Visual Perfection Loop
const PAGES = [
  { name: 'home', url: '/' },
  { name: 'servicios', url: '/servicios' },
  { name: 'proceso', url: '/proceso' },
  { name: 'por-que-paraguay', url: '/por-que-paraguay' },
  { name: 'asistente', url: '/asistente' },
]

const PORT = 3456
const BASE = `http://localhost:${PORT}`

function getIterationDir() {
  const entries = fs.existsSync(SCREENSHOTS_DIR)
    ? fs.readdirSync(SCREENSHOTS_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory() && /^\d+$/.test(d.name))
        .map(d => parseInt(d.name, 10))
        .sort((a, b) => a - b)
    : []
  const next = entries.length > 0 ? entries[entries.length - 1] + 1 : 1
  const dir = path.join(SCREENSHOTS_DIR, String(next))
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function sanitizeName(name) {
  return name === '/' ? 'index' : name.replace(/^\/+/, '').replace(/[/?&=]+/g, '_') || 'index'
}

function waitForServer(url, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const poll = () => {
      const r = http.get(url, res => { res.resume(); resolve() })
      r.on('error', () => {
        if (Date.now() - start > timeoutMs) reject(new Error('Server start timeout'))
        else setTimeout(poll, 500)
      })
      r.end()
    }
    poll()
  })
}

async function capturePageDiagnostics(page, pageUrl, iterationDir, pageName) {
  // Create a subdirectory for this page within the iteration directory
  const pageDir = path.join(iterationDir, pageName)
  fs.mkdirSync(pageDir, { recursive: true })
  
  const base = path.join(pageDir, 'page') // All files will be named page.png, page.html, etc. within the page's subdirectory
  const maxAttempts = 3
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const logs = []
      const errors = []
      const requests = []

      page.on('console', msg => logs.push({ type: msg.type(), text: msg.text(), location: msg.location() }))
      page.on('pageerror', err => errors.push({ message: err.message, stack: err.stack }))
      page.on('requestfailed', req => requests.push({
        url: req.url(),
        failure: req.failure()?.errorText,
        method: req.method(),
        resourceType: req.resourceType(),
      }))

      await page.goto(`${BASE}${pageUrl}`, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(1500)

      // --- serialized final HTML (post-JS, computed styles inlined) ---
      const html = await page.evaluate(() => {
        const serialize = (el) => {
          if (el.nodeType === Node.TEXT_NODE) return el.textContent
          if (el.nodeType !== Node.ELEMENT_NODE) return ''
          const tag = el.tagName.toLowerCase()
          if (tag === 'script' || tag === 'style') return ''
          const clone = el.cloneNode(false)
          const cs = getComputedStyle(el)
          for (let i = 0; i < cs.length; i++) {
            const prop = cs[i]
            const val = cs.getPropertyValue(prop)
            if (val && prop !== '--') clone.style.setProperty(prop, val)
          }
          clone.innerHTML = Array.from(el.childNodes).map(c => serialize(c)).join('')
          return clone.outerHTML
        }
        return '<!DOCTYPE html>\n' + serialize(document.documentElement)
      })
      fs.writeFileSync(`${base}.html`, html, 'utf-8')

      // --- extracted CSS (all final stylesheets serialized) ---
      const css = await page.evaluate(() => {
        const sheets = []
        for (const sheet of document.styleSheets) {
          try {
            const rules = Array.from(sheet.cssRules || []).map(r => r.cssText).join('\n')
            sheets.push({ href: sheet.href, rules })
          } catch {
            sheets.push({ href: sheet.href, rules: '/* CORS-blocked or cross-origin */' })
          }
        }
        return sheets
      })
      const cssBlocks = css.map(s =>
        `/* ${s.href || 'inline'} */\n${s.rules}`
      ).join('\n\n')
      fs.writeFileSync(`${base}.css`, cssBlocks, 'utf-8')

      // --- full page screenshot ---
      await page.screenshot({ path: `${base}.png`, fullPage: true })

      // --- diagnostic JSON ---
      const perfTimings = JSON.parse(JSON.stringify(await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0]
        if (!nav) return {}
        return {
          domContentLoaded: nav.domContentLoadedEventEnd,
          load: nav.loadEventEnd,
          domInteractive: nav.domInteractive,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || null,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null,
          domSize: nav.domComplete,
          transferSize: nav.transferSize,
          encodedBodySize: nav.encodedBodySize,
          decodedBodySize: nav.decodedBodySize,
          duration: nav.duration,
          serverTiming: nav.serverTiming ? Array.from(nav.serverTiming).map(s => ({ name: s.name, dur: s.duration })) : [],
        }
      })))

      const metrics = {} // page.metrics() removed from Playwright

      // --- page structure summary ---
      const structure = await page.evaluate(() => {
        const count = (sel) => document.querySelectorAll(sel).length
        return {
          totalElements: document.querySelectorAll('*').length,
          imgTags: count('img'),
          imgBroken: Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).length,
          scripts: count('script'),
          links: count('a'),
          headings: { h1: count('h1'), h2: count('h2'), h3: count('h3'), h4: count('h4') },
          forms: count('form'),
          iframes: count('iframe'),
          buttons: count('button'),
          textNodes: document.body?.innerText?.length || 0,
        }
      })

      const viewport = page.viewportSize()

      const diagnostics = {
        url: pageUrl ? `${BASE}${pageUrl}` : page.url(),
        capturedAt: new Date().toISOString(),
        attempt,
        viewport,
        consoleLogs: logs,
        pageErrors: errors,
        failedRequests: requests,
        performanceTimings: perfTimings,
        metrics,
        structure,
      }
      fs.writeFileSync(`${base}.json`, JSON.stringify(diagnostics, null, 2), 'utf-8')

      return diagnostics
    } catch (err) {
      lastError = err
      if (attempt < maxAttempts) {
        console.log(`    Retry ${attempt}/${maxAttempts} for ${pageUrl}: ${err.message}`)
      }
    }
  }
  throw lastError
}

async function main() {
  const iterationDir = getIterationDir()
  console.log(`Iteration → ${iterationDir}`)

  const build = spawn('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit', shell: true })
  await new Promise((resolve, reject) => {
    build.on('exit', code => code === 0 ? resolve() : reject(new Error(`Build failed with code ${code}`)))
  })

  const server = spawn('npm', ['run', 'start', '--', '-p', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    shell: true,
  })

  let serverOutput = ''
  server.stdout.on('data', d => { serverOutput += d.toString() })
  server.stderr.on('data', d => { serverOutput += d.toString() })

  try {
    await waitForServer(BASE)
    console.log('Server up.')

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
    })

    const summary = []
    for (const pg of PAGES) {
      console.log(`  ${pg.url}`)
      try {
        const p = await context.newPage()
        const diag = await capturePageDiagnostics(p, pg.url, iterationDir, sanitizeName(pg.url))
        await p.close()
        summary.push({
          name: pg.name,
          url: pg.url,
          status: 'ok',
          errors: diag.pageErrors.length,
          warnings: diag.consoleLogs.filter(l => l.type === 'warning').length,
          logs: diag.consoleLogs.length,
          failedReqs: diag.failedRequests.length,
          domSize: diag.structure.totalElements,
          loadMs: Math.round(diag.performanceTimings?.load || 0),
        })
        console.log(`    ✓ page.png page.html page.css page.json (in ${pg.name}/ subfolder)`)
      } catch (err) {
        summary.push({ name: pg.name, url: pg.url, status: 'error', error: err.message })
        console.error(`    ✗ ${err.message}`)
      }
    }

    await browser.close()

    // write summary
    const summaryPath = path.join(iterationDir, '_summary.json')
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8')
    const ok = summary.filter(s => s.status === 'ok').length
    const err = summary.filter(s => s.status === 'error').length
    console.log(`\nDone: ${ok} ok, ${err} errors. Summary → ${summaryPath}`)
  } finally {
    server.kill('SIGTERM')
    setTimeout(() => server.kill('SIGKILL'), 5000)
    // save server logs for debugging
    if (serverOutput) {
      fs.writeFileSync(path.join(iterationDir, '_server.log'), serverOutput, 'utf-8')
    }
  }
}

main().catch(err => { console.error(err); process.exit(1) })