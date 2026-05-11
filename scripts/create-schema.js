#!/usr/bin/env node
/**
 * Supabase schema creation via service_role key
 * The service_role key bypasses RLS and can create tables
 * via the Supabase Management API
 */
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://qyvokpribmbrosafntqa.supabase.co',
  'sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: 'public',
    },
  }
)

async function run() {
  // Check if tables exist
  console.log('Checking if site_content exists...')
  const { data: check, error: checkErr } = await supabase
    .from('site_content')
    .select('count', { count: 'exact', head: true })
  
  if (checkErr && checkErr.code === 'PGRST205') {
    console.log('Table does NOT exist. Trying to create via raw SQL...')
    
    // Try using the pg query endpoint directly via the Supabase API
    // The service_role key lets us use the Management API
    const sql = `
      CREATE TABLE IF NOT EXISTS site_content (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        tenant_slug TEXT NOT NULL,
        locale TEXT NOT NULL DEFAULT 'es',
        key_path TEXT NOT NULL,
        content JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now(),
        UNIQUE(tenant_slug, locale, key_path)
      );
      CREATE INDEX IF NOT EXISTS idx_site_content_tenant ON site_content(tenant_slug);
      CREATE INDEX IF NOT EXISTS idx_site_content_tenant_locale ON site_content(tenant_slug, locale);
      
      CREATE TABLE IF NOT EXISTS site_config (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        tenant_slug TEXT NOT NULL UNIQUE,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      );
      
      ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
      ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "site_content_read_public" ON site_content;
      CREATE POLICY "site_content_read_public" ON site_content FOR SELECT USING (true);
      
      DROP POLICY IF EXISTS "site_config_read_public" ON site_config;
      CREATE POLICY "site_config_read_public" ON site_config FOR SELECT USING (true);
      
      DROP POLICY IF EXISTS "site_content_write_admin" ON site_content;
      CREATE POLICY "site_content_write_admin" ON site_content
        FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));
      
      DROP POLICY IF EXISTS "site_config_write_admin" ON site_config;
      CREATE POLICY "site_config_write_admin" ON site_config
        FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));
    `.trim()

    // Try via the Supabase platform API with service_role
    const res = await fetch('https://api.supabase.com/v1/projects/qyvokpribmbrosafntqa/database/query', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    })
    
    const result = await res.json()
    console.log('Management API response:', JSON.stringify(result, null, 2))
    
    if (result.error) {
      console.log('\nManagement API failed. Trying direct Postgres REST API...')
      
      // Try the pg_dump endpoint
      const res2 = await fetch('https://api.supabase.com/v1/projects/qyvokpribmbrosafntqa/database/query', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'SELECT 1 AS test' }),
      })
      const result2 = await res2.json()
      console.log('Test query response:', JSON.stringify(result2, null, 2))
    }
  } else {
    console.log('Found! site_content exists:', check)
  }
}

run().catch(console.error)
