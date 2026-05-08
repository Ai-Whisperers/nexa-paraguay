#!/usr/bin/env node
/**
 * Image Optimization Pipeline for Nexa Paraguay
 * 
 * Generates webp/avif variants at 3 breakpoints for all images in the manifest.
 * Prerequisite: npm install sharp (will install if missing)
 * 
 * Usage: node scripts/optimize-images.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname, extname, basename, parse } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const BREAKPOINTS = [
  { suffix: 'sm', width: 480 },
  { suffix: 'md', width: 768 },
  { suffix: 'lg', width: 1200 },
];

async function main() {
  // Check if sharp is available
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('Installing sharp...');
    const { execSync } = await import('child_process');
    execSync('npm install sharp --no-save', { cwd: ROOT, stdio: 'inherit' });
    sharp = (await import('sharp')).default;
  }

  // Find all images
  const imageDirs = [];
  for (const dir of ['images', 'public/images', 'public']) {
    const d = join(ROOT, dir);
    if (existsSync(d)) imageDirs.push(d);
  }

  const imageFiles = [];
  for (const dir of imageDirs) {
    const files = walkDir(dir);
    for (const f of files) {
      const ext = extname(f).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        imageFiles.push(f);
      }
    }
  }

  const manifestPath = join(ROOT, 'images.json');
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  } catch {
    manifest = { images: {} };
  }

  const outputDir = join(PUBLIC, 'images', 'optimized');
  mkdirSync(outputDir, { recursive: true });

  let optimized = 0;
  let errors = 0;

  for (const srcPath of imageFiles) {
    const parsed = parse(srcPath);
    const relPath = srcPath.replace(ROOT, '').replace(/^\//, '');
    const outputBase = join(outputDir, parsed.name);

    console.log(`  ${relPath}`);

    try {
      const img = sharp(srcPath);
      const metadata = await img.metadata();

      // Generate webp at 3 breakpoints + original width
      for (const bp of BREAKPOINTS) {
        if (metadata.width && metadata.width <= bp.width) continue; // skip if image is smaller

        const outPath = `${outputBase}@${bp.suffix}.webp`;
        await img.clone().resize(bp.width).webp({ quality: 80 }).toFile(outPath);
        optimized++;
      }

      // Always generate original size webp
      const originalWebp = `${outputBase}.webp`;
      await img.clone().webp({ quality: 85 }).toFile(originalWebp);
      optimized++;

      // AVIF for browsers that support it
      if (metadata.width && metadata.width <= 1200) {
        const avifPath = `${outputBase}.avif`;
        await img.clone().avif({ quality: 70 }).toFile(avifPath);
        optimized++;
      }

      // Add to manifest
      if (!manifest.images[parsed.name]) {
        manifest.images[parsed.name] = {
          src: relPath,
          optimized: {
            webp: `images/optimized/${parsed.name}.webp`,
            avif: `images/optimized/${parsed.name}.avif`,
            breakpoints: BREAKPOINTS.map(bp => ({
              width: bp.width,
              webp: `images/optimized/${parsed.name}@${bp.suffix}.webp`,
            })),
          },
        };
      }
    } catch (err) {
      console.error(`    ✗ ${err.message}`);
      errors++;
    }
  }

  // Write updated manifest
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\nDone: ${optimized} variants generated, ${errors} errors`);
  console.log(`Manifest updated: ${manifestPath}`);
}

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkDir(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

main().catch(err => { console.error(err); process.exit(1); });
