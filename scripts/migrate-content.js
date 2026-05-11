#!/usr/bin/env node
/**
 * migrate-nexa-content.js — Migrate Nexa Paraguay JSON files to Supabase site_content table
 * 
 * Reads all content/{locale}.json files, flattens to key_path rows,
 * and upserts into the site_content table.
 * 
 * Usage: node scripts/migrate-content.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const SUPABASE_URL = 'https://qyvokpribmbrosafntqa.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH'
const TENANT = 'nexa-paraguay'
const LOCALES = ['es', 'en', 'nl', 'de']

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

function flatten(obj, prefix = '') {
  const rows = []
  for (const [key, value] of Object.entries(obj)) {
    const kp = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      rows.push(...flatten(value, kp))
    } else {
      rows.push({ key_path: kp, content: value })
    }
  }
  return rows
}

async function migrate() {
  const contentDir = path.join(__dirname, '..', 'content')
  console.log(`Migrating content from ${contentDir} for tenant: ${TENANT}`)

  let totalInserted = 0
  const errors = []

  for (const locale of LOCALES) {
    const filePath = path.join(contentDir, `${locale}.json`)
    if (!fs.existsSync(filePath)) {
      console.log(`  [${locale}] File not found, skipping`)
      continue
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(raw)
    const rows = flatten(data)

    console.log(`  [${locale}] ${rows.length} rows to insert`)

    // Upsert in batches of 100
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100).map(r => ({
        tenant_slug: TENANT,
        locale,
        key_path: r.key_path,
        content: r.content,
      }))

      const { error } = await supabase
        .from('site_content')
        .upsert(batch, {
          onConflict: 'tenant_slug,locale,key_path',
          ignoreDuplicates: false,
        })

      if (error) {
        errors.push(`[${locale}] Batch ${i}: ${error.message}`)
        console.error(`    ERROR: ${error.message}`)
      } else {
        totalInserted += batch.length
        process.stdout.write('.')
      }
    }
    console.log(` [done]`)
  }

  // Also migrate site.json as site_config
  const siteConfigPath = path.join(__dirname, '..', 'site.json')
  if (fs.existsSync(siteConfigPath)) {
    const siteData = JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'))
    const { error } = await supabase
      .from('site_config')
      .upsert({ tenant_slug: TENANT, data: siteData }, { onConflict: 'tenant_slug' })
    if (error) {
      errors.push(`site_config: ${error.message}`)
    } else {
      console.log(`  [config] site.json migrated`)
    }
  }

  console.log(`\n---`)
  console.log(`Total rows inserted/updated: ${totalInserted}`)
  if (errors.length > 0) {
    console.log(`Errors (${errors.length}):`)
    errors.forEach(e => console.log(`  - ${e}`))
  } else {
    console.log('All OK!')
  }
}

migrate().catch(console.error)
