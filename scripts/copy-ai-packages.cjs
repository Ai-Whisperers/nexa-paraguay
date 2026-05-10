#!/usr/bin/env node
// Copy @ai-whisperers packages into node_modules after npm install creates broken symlinks
const fs = require('fs')
const path = require('path')

const aiDir = path.resolve('node_modules/@ai-whisperers')

if (!fs.existsSync(aiDir)) {
  console.log('copy-ai-packages: @ai-whisperers node_modules directory not found')
  process.exit(0)
}

const packages = fs.readdirSync(aiDir)
let copied = 0

for (const pkg of packages) {
  const pkgPath = path.join(aiDir, pkg)
  const pkgJson = path.join(pkgPath, 'package.json')

  if (!fs.existsSync(pkgJson)) continue

  let stat
  try {
    stat = fs.lstatSync(pkgPath)
  } catch {
    continue
  }

  // If it's a symlink, resolve it
  if (stat.isSymbolicLink()) {
    const realPath = fs.readlinkSync(pkgPath)
    const absPath = path.resolve(path.dirname(pkgPath), realPath)
    
    if (!fs.existsSync(absPath)) {
      console.log(`copy-ai-packages: ${pkg} symlink target ${absPath} not found — replacing with existing dist dir`)
      // The dist/ directory already exists in the pkgPath (pre-copied from host)
      // npm just replaced the dir with a broken symlink
      // Remove the broken symlink, keep the dist content that was there
      fs.rmSync(pkgPath, { recursive: true, force: true })
      console.log(`copy-ai-packages: removed broken symlink for ${pkg}`)
      continue
    }
    
    // Target exists — copy package contents over the symlink
    fs.rmSync(pkgPath, { recursive: true, force: true })
    fs.cpSync(absPath, pkgPath, { recursive: true })
    copied++
    console.log(`copy-ai-packages: resolved ${pkg} (${absPath} → ${pkgPath})`)
    continue
  }

  // Real directory — nothing to do
  const distDst = path.join(pkgPath, 'dist')
  if (fs.existsSync(distDst)) {
    console.log(`copy-ai-packages: ${pkg} already resolved`)
  }
}

if (copied === 0) {
  console.log('copy-ai-packages: no packages needed copying (already resolved)')
} else {
  console.log(`copy-ai-packages: done (${copied} packages copied)`)
}
