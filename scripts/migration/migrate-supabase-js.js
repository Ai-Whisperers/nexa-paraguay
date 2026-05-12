#!/usr/bin/env node
// Migrate data to remote Supabase using the Supabase JS client
// Reads the service-role key from SUPABASE_SERVICE_ROLE_KEY.

const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const SUPABASE_URL = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const SERVICE_ROLE_KEY = requireEnv('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

async function main() {
  // Get data from local Postgres
  console.log('Fetching data from local Postgres...');
  const CID = execSync("docker ps --filter name=postgres --format '{{.ID}}' | head -1").toString().trim();
  
  const result = execSync(
    `docker exec ${CID} psql -U postgres -d nexa -t -A ` +
    `-c "SELECT row_to_json(t) FROM (SELECT tenant_slug, domain, content, page_config, images, site_config, meta FROM tenant_config) t"`,
    { encoding: 'utf-8', timeout: 30000 }
  );
  
  const row = JSON.parse(result.trim());
  const slug = row.tenant_slug;
  
  console.log(`Migrating: ${slug}`);
  
  // 1. Upsert basic data (without the huge content)
  const { data: existing } = await supabase
    .from('tenant_config')
    .select('id')
    .eq('tenant_slug', slug)
    .single();
  
  if (!existing) {
    const { error } = await supabase
      .from('tenant_config')
      .insert({
        tenant_slug: slug,
        domain: row.domain || '',
        site_config: row.site_config || {},
        meta: row.meta || { migratedAt: new Date().toISOString() },
      });
    if (error) throw error;
    console.log('  Row created');
  } else {
    console.log('  Row exists, updating...');
  }
  
  // 2. Update images
  if (row.images && row.images.images) {
    const { error } = await supabase
      .from('tenant_config')
      .update({ images: row.images })
      .eq('tenant_slug', slug);
    if (error) throw error;
    console.log(`  Images updated (image keys: ${Object.keys(row.images.images || {}).length})`);
  }
  
  // 3. Update page_config
  if (row.page_config) {
    const { error } = await supabase
      .from('tenant_config')
      .update({ page_config: row.page_config })
      .eq('tenant_slug', slug);
    if (error) throw error;
    console.log(`  Page config updated (${Object.keys(row.page_config).length} pages)`);
  }
  
  // 4. Update content by locale
  if (row.content) {
    console.log(`  Updating content (${Object.keys(row.content).length} top-level keys)...`);
    
    const content = row.content;
    // Update in chunks to avoid payload limits
    const keys = Object.keys(content);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const { error } = await supabase.rpc('merge_tenant_content', {
        p_slug: slug,
        p_key: key,
        p_value: content[key],
      });
      if (error) {
        // If RPC fails, do direct update
        const updatePatch = {};
        updatePatch[key] = content[key];
        const { error: updateError } = await supabase
          .from('tenant_config')
          .update({ content: updatePatch })
          .eq('tenant_slug', slug);
        if (updateError) {
          console.log(`    ❌ ${key}: ${updateError.message}`);
        } else {
          console.log(`    ✅ ${key} (${JSON.stringify(content[key]).length}B)`);
        }
      } else {
        console.log(`    ✅ ${key} via RPC`);
      }
    }
  }
  
  // 5. Verify
  const { data: verify, error: verifyError } = await supabase
    .from('tenant_config')
    .select('tenant_slug, octet_length(content::text) as content_bytes, updated_at')
    .eq('tenant_slug', slug)
    .single();
  
  if (verifyError) {
    console.log('\n❌ Verification failed:', verifyError.message);
  } else {
    console.log(`\n✅ ${verify.tenant_slug}: ${verify.content_bytes}B content, updated ${verify.updated_at}`);
  }
}

main().catch(err => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
