#!/usr/bin/env node
// Fix @ai-whisperers packages in Docker build after npm install creates broken symlinks
const fs = require('fs')
const path = require('path')

const aiDir = path.resolve('node_modules/@ai-whisperers')
if (!fs.existsSync(aiDir)) {
  console.log('fix-ai-packages: @ai-whisperers not found, copying from pre-installed bundle...')
  // The deps COPY should have placed them
  process.exit(1)
}

let fixed = 0
for (const pkg of fs.readdirSync(aiDir)) {
  const pkgPath = path.join(aiDir, pkg)
  const pkgJson = path.join(pkgPath, 'package.json')
  if (!fs.existsSync(pkgJson)) continue
  
  let stat
  try { stat = fs.lstatSync(pkgPath) } catch { continue }
  
  if (stat.isSymbolicLink()) {
    const realPath = fs.readlinkSync(pkgPath)
    const absPath = path.resolve(path.dirname(pkgPath), realPath)
    if (fs.existsSync(absPath)) {
      // Real path exists, copy it in place of the symlink
      const tmp = path.join(aiDir, `.__${pkg}_tmp`)
      fs.rmSync(pkgPath)
      fs.cpSync(absPath, pkgPath, { recursive: true })
      fixed++
      console.log(`fix-ai-packages: resolved ${pkg} (${absPath} → ${pkgPath})`)
    } else {
      console.log(`fix-ai-packages: ${pkg} points to ${absPath} (outside context)`)
    }
  }
}

console.log(`fix-ai-packages: done (${fixed} packages fixed)`)
