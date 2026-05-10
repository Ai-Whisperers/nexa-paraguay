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

  let sourcePath = pkgPath
  if (stat.isSymbolicLink()) {
    const realPath = fs.readlinkSync(pkgPath)
    const absPath = path.resolve(path.dirname(pkgPath), realPath)
    sourcePath = absPath
  }

  if (!fs.existsSync(sourcePath)) {
    console.log(`copy-ai-packages: ${pkg} target ${sourcePath} does not exist, skipping`)
    continue
  }

  // Check if package already has dist
  const distSrc = path.join(sourcePath, 'dist')
  const distDst = path.join(pkgPath, 'dist')

  if (fs.existsSync(distSrc) && !fs.existsSync(distDst)) {
    // Symlink case: need to copy package contents over
    fs.rmSync(pkgPath, { recursive: true, force: true })
    fs.cpSync(sourcePath, pkgPath, { recursive: true })
    copied++
    console.log(`copy-ai-packages: copied ${pkg} (${sourcePath} → ${pkgPath})`)
  } else if (!fs.existsSync(distSrc)) {
    // Check for src directory (unbuilt package)
    const srcSrc = path.join(sourcePath, 'src')
    if (fs.existsSync(srcSrc)) {
      console.log(`copy-ai-packages: ${pkg} has src but no dist at ${sourcePath}`)
    } else {
      console.log(`copy-ai-packages: ${pkg} has no dist or src at ${sourcePath}`)
    }
  }
}

if (copied === 0) {
  console.log('copy-ai-packages: no packages needed copying (already resolved)')
} else {
  console.log(`copy-ai-packages: done (${copied} packages copied)`)
}
