-- Migration 004: Nexa Paraguay — Blog CMS, FAQ, Glossary, Form Submissions, FTS
-- Run after 003_site_content_universal.sql

BEGIN;

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug   TEXT        NOT NULL DEFAULT 'nexa-paraguay',
  locale        TEXT        NOT NULL CHECK (locale IN ('es','en','nl','de')),
  slug          TEXT        NOT NULL,
  title         TEXT        NOT NULL,
  excerpt       TEXT,
  body_md       TEXT,                   -- markdown body
  category      TEXT,
  tags          TEXT[]     DEFAULT '{}',
  cover_url     TEXT,
  author        TEXT,
  reading_min   INT,
  published     BOOLEAN    DEFAULT false,
  date_published TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT    blog_posts_tenant_locale_slug UNIQUE (tenant_slug, locale, slug)
);

CREATE INDEX idx_blog_posts_published  ON blog_posts(tenant_slug, locale, published) WHERE published = true;
CREATE INDEX idx_blog_posts_category  ON blog_posts(tenant_slug, locale, category);
CREATE INDEX idx_blog_posts_updated  ON blog_posts(updated_at DESC);

-- Full-text search: tsvector on title + body_md + excerpt
ALTER TABLE blog_posts ADD COLUMN fts_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('spanish', coalesce(title, '')),  'A') ||
    setweight(to_tsvector('spanish', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('spanish', coalesce(body_md, '')), 'C')
  ) STORED;

CREATE INDEX idx_blog_posts_fts ON blog_posts USING GIN(fts_vector);

-- ============================================================
-- FAQ ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS faq_items (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug TEXT        NOT NULL DEFAULT 'nexa-paraguay',
  locale      TEXT        NOT NULL CHECK (locale IN ('es','en','nl','de')),
  question    TEXT        NOT NULL,
  answer      TEXT,
  category    TEXT        DEFAULT 'General',
  sort_order  INT         DEFAULT 0,
  active      BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT  faq_items_tenant_locale_q UNIQUE (tenant_slug, locale, question)
);

CREATE INDEX idx_faq_items_locale_active ON faq_items(tenant_slug, locale, active, sort_order);

-- ============================================================
-- GLOSSARY TERMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS glossary_terms (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug TEXT        NOT NULL DEFAULT 'nexa-paraguay',
  locale      TEXT        NOT NULL CHECK (locale IN ('es','en','nl','de')),
  slug        TEXT,
  term        TEXT,
  definition  TEXT,
  sort_order  INT         DEFAULT 0,
  active      BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT  glossary_terms_tenant_locale_slug UNIQUE (tenant_slug, locale, slug)
);

CREATE INDEX idx_glossary_terms_locale ON glossary_terms(tenant_slug, locale, active, sort_order);

-- ============================================================
-- IMAGE ASSETS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS site_images (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug   TEXT        NOT NULL DEFAULT 'nexa-paraguay',
  path          TEXT        NOT NULL,
  url           TEXT,
  alt           TEXT,
  width         INT,
  height        INT,
  size_bytes    INT,
  category      TEXT,                   -- hero, testimonial, process, team, blog, brand, etc.
  credit        TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT    site_images_tenant_path UNIQUE (tenant_slug, path)
);

CREATE INDEX idx_site_images_category ON site_images(tenant_slug, category);

-- ============================================================
-- FORM SUBMISSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS form_submissions (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_slug TEXT        NOT NULL DEFAULT 'nexa-paraguay',
  form_type   TEXT        NOT NULL,     -- feedback | intake | contact | seprelad | newsletter
  payload     JSONB       NOT NULL,     -- all form fields
  locale      TEXT,
  ip_hash     TEXT,                     -- hashed IP for spam prevention
  user_agent  TEXT,
  source_url  TEXT,
  utm_params  JSONB       DEFAULT '{}', -- utm_source, utm_medium, utm_campaign
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_form_submissions_type ON form_submissions(tenant_slug, form_type, created_at DESC);
CREATE INDEX idx_form_submissions_date ON form_submissions(created_at DESC);

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE blog_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms   ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images      ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Blog posts: public read published; admin write
CREATE POLICY blog_posts_public_read ON blog_posts
  FOR SELECT USING (
    tenant_slug = 'nexa-paraguay'
    AND published = true
  );
CREATE POLICY blog_posts_admin_all ON blog_posts
  FOR ALL USING (
    auth.jwt() ->> 'role' IN ('admin', 'service_role')
  );

-- FAQ: public read active; admin write
CREATE POLICY faq_items_public_read ON faq_items
  FOR SELECT USING (tenant_slug = 'nexa-paraguay' AND active = true);
CREATE POLICY faq_items_admin_all ON faq_items
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));

-- Glossary: public read active; admin write
CREATE POLICY glossary_terms_public_read ON glossary_terms
  FOR SELECT USING (tenant_slug = 'nexa-paraguay' AND active = true);
CREATE POLICY glossary_terms_admin_all ON glossary_terms
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));

-- Images: public read; admin write
CREATE POLICY site_images_public_read ON site_images
  FOR SELECT USING (tenant_slug = 'nexa-paraguay');
CREATE POLICY site_images_admin_all ON site_images
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));

-- Form submissions: public insert; admin all
CREATE POLICY form_submissions_public_insert ON form_submissions
  FOR INSERT WITH CHECK (tenant_slug = 'nexa-paraguay');
CREATE POLICY form_submissions_admin_all ON form_submissions
  FOR ALL USING (auth.jwt() ->> 'role' IN ('admin', 'service_role'));

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Upsert a blog post (used by CMS)
CREATE OR REPLACE FUNCTION upsert_blog_post(
  p_locale    TEXT,
  p_slug      TEXT,
  p_title     TEXT,
  p_excerpt   TEXT DEFAULT NULL,
  p_body_md   TEXT DEFAULT NULL,
  p_category  TEXT DEFAULT NULL,
  p_tags      TEXT[] DEFAULT '{}',
  p_cover_url TEXT DEFAULT NULL,
  p_author    TEXT DEFAULT NULL,
  p_reading_min INT DEFAULT NULL,
  p_published BOOLEAN DEFAULT false
) RETURNS blog_posts LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  result blog_posts;
BEGIN
  INSERT INTO blog_posts (tenant_slug, locale, slug, title, excerpt, body_md, category, tags, cover_url, author, reading_min, published, date_published)
  VALUES ('nexa-paraguay', p_locale, p_slug, p_title, p_excerpt, p_body_md, p_category, p_tags, p_cover_url, p_author, p_reading_min, p_published,
          CASE WHEN p_published THEN now() ELSE NULL END)
  ON CONFLICT (tenant_slug, locale, slug) DO UPDATE SET
    title       = EXCLUDED.title,
    excerpt     = EXCLUDED.excerpt,
    body_md     = EXCLUDED.body_md,
    category    = EXCLUDED.category,
    tags        = EXCLUDED.tags,
    cover_url   = EXCLUDED.cover_url,
    author      = EXCLUDED.author,
    reading_min = EXCLUDED.reading_min,
    published   = EXCLUDED.published,
    date_published = CASE WHEN EXCLUDED.published AND blog_posts.date_published IS NULL THEN now() ELSE blog_posts.date_published END,
    updated_at  = now()
  RETURNING * INTO result;
  RETURN result;
END;
$$;

-- Insert a form submission
CREATE OR REPLACE FUNCTION insert_form_submission(
  p_form_type TEXT,
  p_payload   JSONB,
  p_locale    TEXT DEFAULT NULL,
  p_ip_hash   TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_source_url TEXT DEFAULT NULL,
  p_utm       JSONB DEFAULT '{}'
) RETURNS form_submissions LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  result form_submissions;
BEGIN
  INSERT INTO form_submissions (tenant_slug, form_type, payload, locale, ip_hash, user_agent, source_url, utm_params)
  VALUES ('nexa-paraguay', p_form_type, p_payload, p_locale, p_ip_hash, p_user_agent, p_source_url, p_utm)
  RETURNING * INTO result;
  RETURN result;
END;
$$;

-- Search blog posts FTS
CREATE OR REPLACE FUNCTION search_blog_posts(
  p_locale TEXT,
  p_query  TEXT,
  p_limit  INT DEFAULT 20
) RETURNS SETOF blog_posts LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM   blog_posts
  WHERE  tenant_slug = 'nexa-paraguay'
    AND  locale = p_locale
    AND  published = true
    AND  fts_vector @@ websearch_to_tsquery('spanish', p_query)
  ORDER BY ts_rank(fts_vector, websearch_to_tsquery('spanish', p_query)) DESC
  LIMIT p_limit;
END;
$$;

COMMIT;