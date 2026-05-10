#!/usr/bin/env node
// Pre-build: copy @ai-whisperers packages for Docker build context
// Docker .dockerignore excludes node_modules, so we copy packages to a temp dir
const fs = require('fs')
const path = require('path')

const srcDir = path.resolve('node_modules/@ai-whisperers')
const dstDir = path.resolve('.docker-ai-packages')

if (!fs.existsSync(srcDir)) {
  console.error('@ai-whisperers not found in node_modules')
  process.exit(1)
}

fs.rmSync(dstDir, { recursive: true, force: true })
fs.cpSync(srcDir, dstDir, { recursive: true })
console.log(`prep-docker: copied @ai-whisperers → ${dstDir}`)
