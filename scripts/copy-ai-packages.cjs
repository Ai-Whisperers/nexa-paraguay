#!/usr/bin/env node
// Pre-build script: copies all @ai-whisperers/* file: linked packages to node_modules
// Turbopack doesn't resolve file: symlinks properly, so we copy the dist instead.
const fs = require('fs')
const path = require('path')

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies }

const aiDeps = Object.entries(deps).filter(
  ([name, link]) => name.startsWith('@ai-whisperers/') && typeof link === 'string' && link.startsWith('file:')
)

if (aiDeps.length === 0) {
  console.log('copy-ai-packages: no @ai-whisperers file: dependencies found')
  process.exit(0)
}

const BASE_DIR = path.resolve('node_modules/@ai-whisperers')
if (!fs.existsSync(BASE_DIR)) {
  console.log('copy-ai-packages: node_modules/@ai-whisperers does not exist. Run npm install first.')
  process.exit(0)
}

function copyRecursive(src, dest) {
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
}

let count = 0
for (const [name, link] of aiDeps) {
  const pkgName = name.replace('@ai-whisperers/', '')
  const targetPath = path.join(BASE_DIR, pkgName)

  if (!fs.existsSync(targetPath)) {
    console.log(`copy-ai-packages: ${name} does not exist in node_modules, skipping`)
    continue
  }

  let stat
  try {
    stat = fs.lstatSync(targetPath)
  } catch {
    console.log(`copy-ai-packages: ${name} cannot stat, skipping`)
    continue
  }

  if (!stat.isSymbolicLink()) {
    console.log(`copy-ai-packages: ${name} already a real directory, skipping`)
    continue
  }

  let realPath
  try {
    realPath = fs.readlinkSync(targetPath)
  } catch {
    console.log(`copy-ai-packages: ${name} cannot read link, skipping`)
    continue
  }

  const absRealPath = path.resolve(path.dirname(targetPath), realPath)

  if (!fs.existsSync(absRealPath)) {
    // file: dependency points outside the Docker build context
    // Try to use npm link or copy from node_modules if pre-installed
    console.log(`copy-ai-packages: ${name} linked path ${absRealPath} not found (outside build context?)`)
    // Write a placeholder so later npm steps don't fail
    fs.writeFileSync(path.join(targetPath, '../.ai-packages-stub'), `${name}\n`)
    continue
  }

  fs.rmSync(targetPath, { recursive: true, force: true })
  copyRecursive(absRealPath, targetPath)
  count++
  console.log(`copy-ai-packages: copied ${name} (${absRealPath} → ${targetPath})`)
}

console.log(`copy-ai-packages: done (${count} package${count !== 1 ? 's' : ''} copied)`)
