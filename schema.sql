-- GEODAR InsForge PostgreSQL Schema

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  account_type TEXT NOT NULL DEFAULT 'citizen',
  avatar_url TEXT,
  civic_impact_score INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_code TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT,
  ward TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  visual_severity INTEGER NOT NULL DEFAULT 0,
  contextual_risk INTEGER NOT NULL DEFAULT 0,
  priority_score INTEGER NOT NULL DEFAULT 0,
  severity_level TEXT NOT NULL DEFAULT 'MEDIUM',
  ai_confidence INTEGER DEFAULT 0,
  ai_classification TEXT,
  detected_issue TEXT,
  ai_observations JSONB DEFAULT '[]'::jsonb,
  source TEXT DEFAULT 'Citizen App',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_category ON reports(category);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_priority ON reports(priority_score DESC);

-- 3. Report Images Table
CREATE TABLE IF NOT EXISTS report_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  storage_key TEXT,
  public_or_signed_url TEXT NOT NULL,
  image_type TEXT DEFAULT 'primary',
  file_name TEXT,
  mime_type TEXT,
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_report_images_report_id ON report_images(report_id);

-- 4. Report Analysis Table
CREATE TABLE IF NOT EXISTS report_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  model_used TEXT DEFAULT 'gemini-2.5-flash',
  detected_issue TEXT,
  classification TEXT,
  visual_severity INTEGER,
  ai_confidence INTEGER,
  observations JSONB DEFAULT '[]'::jsonb,
  structural_integrity_risk INTEGER,
  traffic_impact_factor INTEGER,
  weather_vulnerability_factor INTEGER,
  raw_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_report_analysis_report_id ON report_analysis(report_id);

-- 5. Report Status History Table
CREATE TABLE IF NOT EXISTS report_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  changed_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_status_history_report_id ON report_status_history(report_id);

-- 6. Infrastructure Assets Table
CREATE TABLE IF NOT EXISTS infrastructure_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  health_score INTEGER NOT NULL DEFAULT 85,
  failure_risk_30d INTEGER NOT NULL DEFAULT 15,
  critical_nodes_count INTEGER DEFAULT 0,
  ward TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geometry JSONB,
  last_inspected TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Client Requests Table
CREATE TABLE IF NOT EXISTS client_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  request_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_requests_created ON client_requests(created_at DESC);
