-- Tenant Config Migration Script
-- Creates the multi-tenant content storage table
-- This is the single source of truth post-migration

BEGIN;

-- Create database and schema
CREATE DATABASE nexa;

\c nexa

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Core tenant table
CREATE TABLE tenant_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_slug VARCHAR(64) NOT NULL UNIQUE,
  domain VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Content payload (the entire content JSON tree)
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Page configuration (nexa-pages data)
  page_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Image manifest
  images JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Site-level config (site.json fields)
  site_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Metadata
  meta JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_tenant_slug ON tenant_config(tenant_slug);
CREATE INDEX idx_tenant_domain ON tenant_config(domain);
CREATE INDEX idx_tenant_active ON tenant_config(is_active);
CREATE INDEX idx_tenant_content ON tenant_config USING GIN(content jsonb_path_ops);
CREATE INDEX idx_tenant_updated ON tenant_config(updated_at DESC);

-- Audit log for content changes
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_slug VARCHAR(64) NOT NULL,
  action VARCHAR(32) NOT NULL,
  field_path TEXT,
  old_value JSONB,
  new_value JSONB,
  changed_by VARCHAR(128),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_tenant ON audit_log(tenant_slug, created_at DESC);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tenant_updated
  BEFORE UPDATE ON tenant_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

COMMIT;
