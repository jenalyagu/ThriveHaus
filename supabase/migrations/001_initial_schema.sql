-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Families table
CREATE TABLE IF NOT EXISTS families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  family_motto TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  intake_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Parents table
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'parent',
  email TEXT,
  work_schedule TEXT,
  strengths TEXT[] DEFAULT '{}',
  notes TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Children table
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  age INTEGER,
  grade TEXT,
  interests TEXT[] DEFAULT '{}',
  challenges TEXT[] DEFAULT '{}',
  personality_traits TEXT[] DEFAULT '{}',
  learning_style TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blueprints table
CREATE TABLE IF NOT EXISTS blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{}',
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's family id
CREATE OR REPLACE FUNCTION get_user_family_id(user_id UUID)
RETURNS UUID AS $$
  SELECT id FROM families WHERE created_by = user_id LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Families policies
CREATE POLICY "Users can view their own family"
  ON families FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Users can create their family"
  ON families FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their family"
  ON families FOR UPDATE
  USING (created_by = auth.uid());

-- Parents policies
CREATE POLICY "Users can view parents in their family"
  ON parents FOR SELECT
  USING (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can create parents in their family"
  ON parents FOR INSERT
  WITH CHECK (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can update parents in their family"
  ON parents FOR UPDATE
  USING (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can delete parents in their family"
  ON parents FOR DELETE
  USING (family_id = get_user_family_id(auth.uid()));

-- Children policies
CREATE POLICY "Users can view children in their family"
  ON children FOR SELECT
  USING (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can create children in their family"
  ON children FOR INSERT
  WITH CHECK (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can update children in their family"
  ON children FOR UPDATE
  USING (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can delete children in their family"
  ON children FOR DELETE
  USING (family_id = get_user_family_id(auth.uid()));

-- Blueprints policies
CREATE POLICY "Users can view blueprints for their family"
  ON blueprints FOR SELECT
  USING (family_id = get_user_family_id(auth.uid()));

CREATE POLICY "Users can create blueprints for their family"
  ON blueprints FOR INSERT
  WITH CHECK (family_id = get_user_family_id(auth.uid()));

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER families_updated_at
  BEFORE UPDATE ON families
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER parents_updated_at
  BEFORE UPDATE ON parents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
