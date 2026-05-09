#!/usr/bin/env node
// Pre-build script: copies @ai-whisperers/sections from file: link to node_modules
// Turbopack doesn't resolve file: symlinks properly, so we copy the dist instead.
const fs = require('fs')
const path = require('path')

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const sectionLink = pkgJson.dependencies['@ai-whisperers/sections']

if (!sectionLink || !sectionLink.startsWith('file:')) {
  console.log('copy-sections: @ai-whisperers/sections is not a file: link, skipping')
  process.exit(0)
}

const targetPath = path.resolve('node_modules/@ai-whisperers/sections')

// Check if target exists — if not, npm install hasn't created the link yet.
// This can happen during postinstall lifecycle.
if (!fs.existsSync(targetPath)) {
  // Try parent dir
  const parentDir = path.resolve('node_modules/@ai-whisperers')
  if (!fs.existsSync(parentDir)) {
    console.error('copy-sections: node_modules/@ai-whisperers does not exist. Run npm install first.')
    process.exit(0)
  }
  // Maybe it's a plain file or incomplete link
  console.log('copy-sections: target symlink not ready yet, skipping')
  process.exit(0)
}

let stat
try {
  stat = fs.lstatSync(targetPath)
} catch {
  console.log('copy-sections: cannot stat target, skipping')
  process.exit(0)
}

if (!stat.isSymbolicLink()) {
  console.log('copy-sections: already a real directory, skipping')
  process.exit(0)
}

// Resolve symlink
let realPath
try {
  realPath = fs.readlinkSync(targetPath)
} catch {
  console.log('copy-sections: cannot read link, skipping')
  process.exit(0)
}

const absRealPath = path.resolve(path.dirname(targetPath), realPath)

if (!fs.existsSync(absRealPath)) {
  console.error(`copy-sections: linked path ${absRealPath} does not exist`)
  process.exit(1)
}

// Remove symlink, copy directory
fs.rmSync(targetPath, { recursive: true, force: true })

;(function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyRecursive(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
})(absRealPath, targetPath)

console.log(`copy-sections: copied ${absRealPath} → ${targetPath}`)
