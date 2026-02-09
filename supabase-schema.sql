-- GetResilience Database Schema
-- All tables prefixed with gr_ to coexist with EMOD+ in shared Supabase instance

-- ============================================================
-- 1. PROFILES
-- ============================================================

CREATE TABLE IF NOT EXISTS gr_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  country TEXT,
  organization TEXT,
  role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'researcher', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE gr_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON gr_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON gr_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create gr_profiles on new auth.users (ON CONFLICT to coexist with EMOD+)
CREATE OR REPLACE FUNCTION handle_gr_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.gr_profiles (id, email, full_name, country, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    'citizen'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), gr_profiles.full_name),
    country = COALESCE(NULLIF(EXCLUDED.country, ''), gr_profiles.country),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created_gr ON auth.users;
CREATE TRIGGER on_auth_user_created_gr
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_gr_new_user();

-- ============================================================
-- 2. COUNCILS
-- ============================================================

CREATE TABLE IF NOT EXISTS gr_councils (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  country TEXT NOT NULL,
  focus_area TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  member_count INTEGER NOT NULL DEFAULT 0,
  report_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE gr_councils ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public councils" ON gr_councils
  FOR SELECT USING (is_public = true);

CREATE POLICY "Members can view private councils" ON gr_councils
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM gr_council_members
      WHERE gr_council_members.council_id = gr_councils.id
      AND gr_council_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create councils" ON gr_councils
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Council admins can update" ON gr_councils
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM gr_council_members
      WHERE gr_council_members.council_id = gr_councils.id
      AND gr_council_members.user_id = auth.uid()
      AND gr_council_members.role = 'admin'
    )
  );

CREATE POLICY "Council admins can delete" ON gr_councils
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM gr_council_members
      WHERE gr_council_members.council_id = gr_councils.id
      AND gr_council_members.user_id = auth.uid()
      AND gr_council_members.role = 'admin'
    )
  );

-- ============================================================
-- 3. COUNCIL MEMBERS
-- ============================================================

CREATE TABLE IF NOT EXISTS gr_council_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  council_id UUID NOT NULL REFERENCES gr_councils(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(council_id, user_id)
);

ALTER TABLE gr_council_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view council members" ON gr_council_members
  FOR SELECT USING (true);

CREATE POLICY "Users can join public councils" ON gr_council_members
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM gr_councils WHERE id = council_id AND is_public = true
    )
  );

CREATE POLICY "Users can leave councils" ON gr_council_members
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage members" ON gr_council_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM gr_council_members AS cm
      WHERE cm.council_id = gr_council_members.council_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

-- Auto-add creator as admin member
CREATE OR REPLACE FUNCTION handle_gr_council_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO gr_council_members (council_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin')
  ON CONFLICT (council_id, user_id) DO NOTHING;

  UPDATE gr_councils SET member_count = 1 WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_gr_council_created ON gr_councils;
CREATE TRIGGER on_gr_council_created
  AFTER INSERT ON gr_councils
  FOR EACH ROW EXECUTE FUNCTION handle_gr_council_created();

-- Update member_count on member changes
CREATE OR REPLACE FUNCTION update_gr_council_member_count()
RETURNS TRIGGER AS $$
DECLARE
  target_council_id UUID;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_council_id := OLD.council_id;
  ELSE
    target_council_id := NEW.council_id;
  END IF;

  UPDATE gr_councils
  SET member_count = (
    SELECT COUNT(*) FROM gr_council_members WHERE council_id = target_council_id
  )
  WHERE id = target_council_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_gr_member_change ON gr_council_members;
CREATE TRIGGER on_gr_member_change
  AFTER INSERT OR DELETE ON gr_council_members
  FOR EACH ROW EXECUTE FUNCTION update_gr_council_member_count();

-- ============================================================
-- 4. REPORTS
-- ============================================================

CREATE TABLE IF NOT EXISTS gr_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  platform TEXT NOT NULL,
  content_url TEXT,
  violation_type TEXT NOT NULL CHECK (violation_type IN (
    'disinformation', 'hate_speech', 'illegal_content',
    'manipulation', 'transparency_violation', 'other'
  )),
  dsa_article TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'submitted', 'under_review', 'forwarded', 'resolved', 'dismissed'
  )),
  council_id UUID REFERENCES gr_councils(id) ON DELETE SET NULL,
  submitted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE gr_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports" ON gr_reports
  FOR SELECT USING (auth.uid() = submitted_by);

CREATE POLICY "Council members can view council reports" ON gr_reports
  FOR SELECT USING (
    council_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM gr_council_members
      WHERE gr_council_members.council_id = gr_reports.council_id
      AND gr_council_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create reports" ON gr_reports
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Users can update own reports" ON gr_reports
  FOR UPDATE USING (auth.uid() = submitted_by);

-- Update council report_count
CREATE OR REPLACE FUNCTION update_gr_council_report_count()
RETURNS TRIGGER AS $$
DECLARE
  target_council_id UUID;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_council_id := OLD.council_id;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle council_id change
    IF OLD.council_id IS DISTINCT FROM NEW.council_id THEN
      IF OLD.council_id IS NOT NULL THEN
        UPDATE gr_councils SET report_count = (
          SELECT COUNT(*) FROM gr_reports WHERE council_id = OLD.council_id
        ) WHERE id = OLD.council_id;
      END IF;
    END IF;
    target_council_id := NEW.council_id;
  ELSE
    target_council_id := NEW.council_id;
  END IF;

  IF target_council_id IS NOT NULL THEN
    UPDATE gr_councils SET report_count = (
      SELECT COUNT(*) FROM gr_reports WHERE council_id = target_council_id
    ) WHERE id = target_council_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_gr_report_change ON gr_reports;
CREATE TRIGGER on_gr_report_change
  AFTER INSERT OR UPDATE OR DELETE ON gr_reports
  FOR EACH ROW EXECUTE FUNCTION update_gr_council_report_count();

-- ============================================================
-- 5. REPORT EVIDENCE
-- ============================================================

CREATE TABLE IF NOT EXISTS gr_report_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES gr_reports(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE gr_report_evidence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Report owners can view evidence" ON gr_report_evidence
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM gr_reports
      WHERE gr_reports.id = gr_report_evidence.report_id
      AND gr_reports.submitted_by = auth.uid()
    )
  );

CREATE POLICY "Council members can view evidence" ON gr_report_evidence
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM gr_reports
      JOIN gr_council_members ON gr_council_members.council_id = gr_reports.council_id
      WHERE gr_reports.id = gr_report_evidence.report_id
      AND gr_council_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Report owners can add evidence" ON gr_report_evidence
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM gr_reports
      WHERE gr_reports.id = gr_report_evidence.report_id
      AND gr_reports.submitted_by = auth.uid()
    )
  );

-- ============================================================
-- 6. STORAGE BUCKET
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('report-evidence', 'report-evidence', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload evidence" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'report-evidence'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Users can view own evidence" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'report-evidence'
    AND auth.role() = 'authenticated'
  );

-- ============================================================
-- 7. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_gr_councils_country ON gr_councils(country);
CREATE INDEX IF NOT EXISTS idx_gr_councils_slug ON gr_councils(slug);
CREATE INDEX IF NOT EXISTS idx_gr_council_members_user ON gr_council_members(user_id);
CREATE INDEX IF NOT EXISTS idx_gr_council_members_council ON gr_council_members(council_id);
CREATE INDEX IF NOT EXISTS idx_gr_reports_submitted_by ON gr_reports(submitted_by);
CREATE INDEX IF NOT EXISTS idx_gr_reports_council ON gr_reports(council_id);
CREATE INDEX IF NOT EXISTS idx_gr_reports_status ON gr_reports(status);
CREATE INDEX IF NOT EXISTS idx_gr_report_evidence_report ON gr_report_evidence(report_id);
