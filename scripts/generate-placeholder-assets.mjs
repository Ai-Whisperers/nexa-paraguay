/**
 * Generates every path declared in images.json as WebP + PNG (where applicable).
 * Assets are editorial placeholders (brand gradient + labels) — replace with
 * commissioned photography and final brand lockups before launch.
 */
import { readFileSync, writeFileSync } from 'fs'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'sites', 'nexa-paraguay', 'images')

const TITLE = 'Nexa Paraguay'

function dimensionsFor(relNoExt) {
  const p = relNoExt.replace(/\\/g, '/')
  if (p.includes('google-728x90')) return [728, 90]
  if (p.includes('google-300x250')) return [300, 250]
  if (p.includes('google-336x280')) return [336, 280]
  if (p.includes('google-970x250')) return [970, 250]
  if (/meta-story/.test(p)) return [1080, 1920]
  if (/meta-feed/.test(p)) return [1080, 1080]
  if (p.includes('linkedin')) return [1200, 627]
  if (p.includes('youtube-thumb')) return [1280, 720]
  if (p.includes('hero-bg-mobile')) return [1080, 1920]
  if (p.startsWith('hero/')) return [1920, 1080]
  if (p.includes('favicon') && !p.includes('apple')) return [32, 32]
  if (p.includes('apple-touch')) return [180, 180]
  if (p.includes('maskable')) return [512, 512]
  if (p.includes('og-default') || p.includes('twitter-card')) return [1200, 630]
  if (p.includes('whatsapp')) return [800, 800]
  if (p.startsWith('email/')) return [1200, 400]
  if (p.startsWith('social/')) return [1080, 1080]
  if (p.includes('press/brand-book')) return [1200, 1800]
  if (p.startsWith('press/')) return [1600, 1000]
  if (p.startsWith('blog/')) {
    if (p.includes('paraguay-uruguay')) return [1920, 1080]
    return [1600, 840]
  }
  if (p.startsWith('team/')) return [600, 600]
  if (/testimonials\/testimonial-/.test(p)) return [480, 480]
  if (/testimonials\/poster-/.test(p)) return [1280, 720]
  if (p.startsWith('programs/')) return [900, 600]
  if (p.startsWith('brand/logo') && !p.includes('icon')) return [560, 160]
  if (p.includes('logo-icon')) return [512, 512]
  if (p.startsWith('brand/')) return [512, 512]
  return [1200, 800]
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function labelFromRel(relNoExt) {
  return relNoExt
    .replace(/\.(webp|png)$/i, '')
    .split(/[/\\]/)
    .pop()
    .replace(/-/g, ' ')
}

function buildSvg(w, h, subtitle) {
  const sub = escapeXml(subtitle)
  if (h < 120) {
    const fs = Math.max(10, h * 0.45)
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1B2A4A"/>
      <stop offset="100%" stop-color="#243B66"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="0" y="0" width="4" height="100%" fill="#C9A96E"/>
  <text x="${w * 0.5}" y="${h * 0.58}" text-anchor="middle" fill="#EDE8DB" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="${fs}" font-weight="600">${sub}</text>
</svg>`
  }
  const fs1 = Math.max(12, Math.min(w, h) * 0.055)
  const fs2 = Math.max(10, Math.min(w, h) * 0.028)
  const short = sub.length > 48 ? sub.slice(0, 45) + '…' : sub
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B2A4A"/>
      <stop offset="100%" stop-color="#243B66"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="0" y="0" width="100%" height="${Math.max(4, Math.floor(h * 0.012))}" fill="#C9A96E" opacity="0.95"/>
  <text x="${w / 2}" y="${h * 0.4}" text-anchor="middle" fill="#C9A96E" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="${fs1}" font-weight="600">${escapeXml(TITLE)}</text>
  <text x="${w / 2}" y="${h * 0.52}" text-anchor="middle" fill="#EDE8DB" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="${fs2}" opacity="0.92">${short}</text>
  <text x="${w / 2}" y="${h * 0.92}" text-anchor="middle" fill="#C9A96E" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="${Math.max(8, fs2 * 0.75)}" opacity="0.45">Placeholder — replace with final art</text>
</svg>`
}

function* iterRecords(node) {
  if (!node || typeof node !== 'object') return
  if (typeof node.src === 'string' && node.src.includes('/nexa-paraguay/images/')) {
    yield node
  }
  for (const v of Object.values(node)) {
    if (v && typeof v === 'object') yield* iterRecords(v)
  }
}

function toRel(u) {
  const i = u.indexOf('/nexa-paraguay/images/')
  if (i === -1) return null
  return u.slice(i + '/nexa-paraguay/images/'.length)
}

async function writeRaster(relPath, subtitle) {
  const noExt = relPath.replace(/\.(webp|png)$/i, '')
  const [w, h] = dimensionsFor(noExt)
  const svg = buildSvg(w, h, subtitle)
  const buf = await sharp(Buffer.from(svg)).png().toBuffer()
  const webpBuf = await sharp(buf).webp({ quality: 82 }).toBuffer()
  const full = path.join(OUT, relPath)
  await mkdir(path.dirname(full), { recursive: true })
  if (relPath.endsWith('.png')) {
    await sharp(buf).png({ compressionLevel: 9 }).toFile(full)
  } else if (relPath.endsWith('.webp')) {
    writeFileSync(full, webpBuf)
  }
}

async function main() {
  const manifest = JSON.parse(readFileSync(path.join(ROOT, 'images.json'), 'utf8'))
  const tasks = []

  const seenPair = new Set()

  for (const rec of iterRecords(manifest.images)) {
    const relWebp = toRel(rec.src)
    if (!relWebp || !relWebp.endsWith('.webp')) continue
    const relPng =
      typeof rec.fallbackSrc === 'string'
        ? toRel(rec.fallbackSrc)
        : relWebp.replace(/\.webp$/, '.png')
    const baseLabel = labelFromRel(relWebp.replace(/\.webp$/i, ''))
    const key = relWebp + '|' + (relPng || '')
    if (seenPair.has(key)) continue
    seenPair.add(key)

    tasks.push(writeRaster(relWebp, baseLabel))
    if (relPng && relPng.endsWith('.png')) tasks.push(writeRaster(relPng, baseLabel))
  }

  await Promise.all(tasks)

  const extras = [
    ['blog/paraguay-uruguay-panama-w1920.webp', 'paraguay uruguay panama 2026'],
    ['blog/paraguay-uruguay-panama-w1920.png', 'paraguay uruguay panama 2026'],
  ]
  for (const [rel, lab] of extras) {
    await writeRaster(rel, lab)
  }

  const brandDir = path.join(OUT, 'brand')
  await mkdir(brandDir, { recursive: true })

  const logoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 64" fill="none">
  <rect width="240" height="64" rx="6" fill="#1B2A4A"/>
  <path d="M24 16 L24 48 L32 48 L32 34 L44 48 L54 48 L40 32 L52 16 L42 16 L32 28 L32 16 Z" fill="#C9A96E"/>
  <text x="66" y="42" fill="#EDE8DB" font-family="Segoe UI,system-ui,sans-serif" font-size="22" font-weight="600">Nexa Paraguay</text>
</svg>`
  const logoDarkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 64" fill="none">
  <rect width="240" height="64" rx="6" fill="#0f1729"/>
  <path d="M24 16 L24 48 L32 48 L32 34 L44 48 L54 48 L40 32 L52 16 L42 16 L32 28 L32 16 Z" fill="#C9A96E"/>
  <text x="66" y="42" fill="#FFFFFF" font-family="Segoe UI,system-ui,sans-serif" font-size="22" font-weight="600">Nexa Paraguay</text>
</svg>`
  const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="96" fill="#1B2A4A"/>
  <path d="M140 120 L140 392 L180 392 L180 260 L280 392 L340 392 L220 256 L330 120 L270 120 L180 230 L180 120 Z" fill="#C9A96E"/>
</svg>`

  writeFileSync(path.join(brandDir, 'logo.svg'), logoSvg)
  writeFileSync(path.join(brandDir, 'logo-dark.svg'), logoDarkSvg)
  writeFileSync(path.join(brandDir, 'logo-icon.svg'), iconSvg)

  const fav32 = await sharp(Buffer.from(buildSvg(32, 32, 'N'))).png().toBuffer()
  const fav16 = await sharp(Buffer.from(buildSvg(16, 16, 'N'))).png().toBuffer()
  const fav48 = await sharp(Buffer.from(buildSvg(48, 48, 'N'))).png().toBuffer()
  const ico = await pngToIco([fav16, fav32, fav48])
  writeFileSync(path.join(brandDir, 'favicon.ico'), ico)

  console.log('Done. Placeholder rasters under', path.relative(ROOT, OUT))
  console.log('SVG marks + favicon.ico in brand/. Replace with final brand and photography before production.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
