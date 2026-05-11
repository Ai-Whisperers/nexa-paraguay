-- Site Content — Universal content storage for all Ai-Whisperers clients
-- Stores all copy content as JSONB with locale + tenant isolation

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

COMMENT ON TABLE site_content IS 'Universal content store for all Ai-Whisperers clients. Each row is one content field identified by tenant, locale, and dotted key_path.';

-- Site Config — Per-client configuration (site.json equivalent)
CREATE TABLE IF NOT EXISTS site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public read access (everyone can read content)
CREATE POLICY site_content_read_public ON site_content
  FOR SELECT USING (true);

-- Only admins or service_role can write
CREATE POLICY site_content_write_admin ON site_content
  FOR ALL USING (
    auth.jwt() ->> 'role' IN ('admin', 'service_role')
  );

-- Same for site_config
CREATE POLICY site_config_read_public ON site_config
  FOR SELECT USING (true);

CREATE POLICY site_config_write_admin ON site_config
  FOR ALL USING (
    auth.jwt() ->> 'role' IN ('admin', 'service_role')
  );

-- Function to reconstruct nested objects from flat key_paths
CREATE OR REPLACE FUNCTION get_site_content(p_tenant TEXT, p_locale TEXT)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  result JSONB := '{}'::JSONB;
  row RECORD;
BEGIN
  FOR row IN
    SELECT key_path, content FROM site_content
    WHERE tenant_slug = p_tenant AND locale = p_locale
    ORDER BY key_path
  LOOP
    result = jsonb_set(result, string_to_array(row.key_path, '.'), row.content, true);
  END LOOP;
  RETURN result;
END;
$$;
