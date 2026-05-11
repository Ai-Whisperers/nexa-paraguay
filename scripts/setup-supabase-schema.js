#!/usr/bin/env node
/**
 * setup-supabase-schema.js — Create site_content and site_config tables
 * Uses the Supabase Management API (not postgres directly)
 */
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://qyvokpribmbrosafntqa.supabase.co',
  'sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH'
)

async function setup() {
  // We can't CREATE TABLE via REST API. We need to use the Supabase Dashboard
  // or the Management API. Let me check if the tables already exist by trying
  // to query them.
  const { data, error } = await supabase.from('site_content').select('count(*)', { count: 'exact', head: true })
  if (error && error.code === 'PGRST301') {
    console.log('Creating tables via Supabase Dashboard required.')
    console.log('Go to: https://supabase.com/dashboard/project/qyvokpribmbrosafntqa/sql/new')
    console.log('')
    console.log('Paste this SQL:')
    console.log('')
    const sql = `
-- =========================================
-- Site Content — Universal content store
-- For all Ai-Whisperers clients
-- =========================================

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

-- Public read
CREATE POLICY "site_content_read_public" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_config_read_public" ON site_config FOR SELECT USING (true);

-- Admin write (via service_role or admin role)
CREATE POLICY "site_content_write_admin" ON site_content
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));

CREATE POLICY "site_config_write_admin" ON site_config
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));
`.trim()
    console.log(sql)
    console.log('')
    console.log('After creating tables, run: node scripts/migrate-content.js')
    process.exit(1)
  } else {
    console.log('Table exists!')
  }
}

setup().catch(console.error)
