#!/usr/bin/env node
// migrate-to-supabase-remote.js — Creates schema and migrates data to remote Supabase Postgres

const PAT = 'sbp_e1535079b4cfb2d2cd6de97735fb2bfe372c8a9b';
const API = 'https://api.supabase.com/v1/projects/qyvokpribmbrosafntqa/database/query';

async function query(sql) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${PAT}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql })
  });
  const data = await res.json();
  if (!res.ok) console.error('ERROR:', data.message || JSON.stringify(data));
  return data;
}

async function main() {
  // 1. Create extensions
  console.log('Creating extensions...');
  await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  console.log('  OK');
  
  // 2. Create tenant_config table
  console.log('Creating tenant_config table...');
  await query(`
    CREATE TABLE IF NOT EXISTS tenant_config (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      tenant_slug VARCHAR(64) NOT NULL UNIQUE,
      domain VARCHAR(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      content JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_config JSONB NOT NULL DEFAULT '{}'::jsonb,
      images JSONB NOT NULL DEFAULT '{}'::jsonb,
      site_config JSONB NOT NULL DEFAULT '{}'::jsonb,
      meta JSONB NOT NULL DEFAULT '{}'::jsonb
    )
  `);
  console.log('  OK');
  
  // 3. Create indexes
  console.log('Creating indexes...');
  await query(`CREATE INDEX IF NOT EXISTS idx_tenant_slug ON tenant_config(tenant_slug)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_tenant_domain ON tenant_config(domain)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_tenant_active ON tenant_config(is_active)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_tenant_content ON tenant_config USING GIN(content jsonb_path_ops)`);
  console.log('  OK');
  
  // 4. Create audit_log table
  console.log('Creating audit_log table...');
  await query(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      tenant_slug VARCHAR(64) NOT NULL,
      action VARCHAR(32) NOT NULL,
      field_path TEXT,
      old_value JSONB,
      new_value JSONB,
      changed_by VARCHAR(128),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  console.log('  OK');
  
  // 5. Now migrate the data from local Postgres
  console.log('\nMigrating data from local Postgres...');
  
  const { execSync } = require('child_process');
  const container = execSync("docker ps --filter name=postgres --format '{{.ID}}' | head -1").toString().trim();
  
  // Get the data as JSON
  const jsonData = execSync(
    `docker exec ${container} psql -U postgres -d nexa -t -A -F',' ` +
    `-c "SELECT row_to_json(t) FROM (SELECT tenant_slug, domain, content, page_config, images, site_config, meta FROM tenant_config) t"`,
    { encoding: 'utf-8', timeout: 10000 }
  );
  
  const rows = jsonData.trim().split('\n').filter(Boolean);
  for (const rowJson of rows) {
    try {
      const row = JSON.parse(rowJson);
      // Insert into remote Supabase
      const insertResult = await fetch(API, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${PAT}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `INSERT INTO tenant_config (tenant_slug, domain, content, page_config, images, site_config, meta) VALUES ($1, $2, $3::jsonb, $4::jsonb, $5::jsonb, $6::jsonb, $7::jsonb) ON CONFLICT (tenant_slug) DO UPDATE SET content = $3::jsonb, page_config = $4::jsonb, images = $5::jsonb, site_config = $6::jsonb, updated_at = NOW()`,
          params: [row.tenant_slug, row.domain, JSON.stringify(row.content), JSON.stringify(row.page_config), JSON.stringify(row.images), JSON.stringify(row.site_config), JSON.stringify(row.meta)]
        })
      });
      const result = await insertResult.json();
      if (!insertResult.ok) console.error(`  ERROR: ${result.message || JSON.stringify(result)}`);
      else console.log(`  ✅ ${row.tenant_slug} migrated`);
    } catch(e) {
      console.error(`  Error parsing row: ${e.message}`);
    }
  }
  
  console.log('\n✅ Migration complete!');
  
  // Verify
  const verify = await query(`SELECT tenant_slug, LENGTH(content::text) as size FROM tenant_config`);
  console.log('Data in remote:', JSON.stringify(verify.slice(0, 3)));
}

main().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
