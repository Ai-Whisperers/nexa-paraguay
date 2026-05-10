#!/usr/bin/env node
// migrate-data.js — Pipes JSON data into Postgres via Docker exec
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const REPO = path.resolve(__dirname, '../..');

const slug = 'nexa-paraguay';
const locale = 'nl';

const content = JSON.parse(fs.readFileSync(path.join(REPO, 'content', `${locale}.json`), 'utf-8'));

const pageConfig = {};
for (const file of fs.readdirSync(path.join(REPO, 'nexa-pages')).filter(f => f.endsWith('.json'))) {
  pageConfig[file.replace('.json', '')] = JSON.parse(fs.readFileSync(path.join(REPO, 'nexa-pages', file), 'utf-8'));
}

const images = JSON.parse(fs.readFileSync(path.join(REPO, 'images.json'), 'utf-8'));
const siteConfig = JSON.parse(fs.readFileSync(path.join(REPO, 'site.json'), 'utf-8'));

// Build the JSON params
const params = JSON.stringify({
  slug,
  domain: siteConfig.domain || 'nexa.paragu-ai.com',
  content,
  pageConfig,
  images,
  siteConfig,
  meta: { migratedAt: new Date().toISOString() }
});

// Write to a temp SQL file and pipe it
const sql = `
-- Migration script
DO $$
DECLARE
  data jsonb := '${params.replace(/'/g, "''")}';
  inserted_id uuid;
BEGIN
  INSERT INTO tenant_config (tenant_slug, domain, content, page_config, images, site_config, meta)
  VALUES (
    data->>'slug',
    data->>'domain',
    (data->'content')::jsonb,
    (data->'pageConfig')::jsonb,
    (data->'images')::jsonb,
    (data->'siteConfig')::jsonb,
    (data->'meta')::jsonb
  )
  ON CONFLICT (tenant_slug) 
  DO UPDATE SET 
    content = EXCLUDED.content,
    page_config = EXCLUDED.page_config,
    images = EXCLUDED.images,
    site_config = EXCLUDED.site_config,
    updated_at = NOW()
  RETURNING id INTO inserted_id;
  
  RAISE NOTICE 'Inserted tenant % with id %', data->>'slug', inserted_id;
END;
$$;
`;

fs.writeFileSync('/tmp/migrate-nexa.sql', sql);
const container = execSync("docker ps --filter name=postgres --format '{{.ID}}' | head -1").toString().trim();

console.log(`📦 Executing migration in container ${container}...`);
const r = spawnSync('bash', ['-c', `docker exec -i ${container} psql -U postgres -d nexa -f /dev/stdin < /tmp/migrate-nexa.sql`], {
  timeout: 30000,
  stdio: ['pipe', 'pipe', 'pipe'],
  encoding: 'utf-8'
});

console.log(r.stdout);
if (r.stderr) console.error('STDERR:', r.stderr);
if (r.error) console.error('ERROR:', r.error.message);
console.log(`Exit code: ${r.status}`);
