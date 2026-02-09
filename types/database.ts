export interface Profile {
  id: string
  email: string
  full_name: string | null
  country: string | null
  organization: string | null
  role: 'citizen' | 'researcher' | 'admin'
  created_at: string
  updated_at: string
}

export interface Council {
  id: string
  name: string
  slug: string
  description: string | null
  country: string
  focus_area: string | null
  is_public: boolean
  created_by: string
  member_count: number
  report_count: number
  created_at: string
  updated_at: string
}

export interface CouncilMember {
  id: string
  council_id: string
  user_id: string
  role: 'admin' | 'moderator' | 'member'
  joined_at: string
}

export type ReportStatus = 'draft' | 'submitted' | 'under_review' | 'forwarded' | 'resolved' | 'dismissed'

export type ViolationType =
  | 'disinformation'
  | 'hate_speech'
  | 'illegal_content'
  | 'manipulation'
  | 'transparency_violation'
  | 'other'

export interface Report {
  id: string
  title: string
  description: string | null
  platform: string
  content_url: string | null
  violation_type: ViolationType
  dsa_article: string | null
  status: ReportStatus
  council_id: string | null
  submitted_by: string
  country: string | null
  created_at: string
  updated_at: string
}

export interface ReportEvidence {
  id: string
  report_id: string
  file_name: string
  file_url: string
  file_type: string
  file_size: number
  created_at: string
}

export interface CouncilWithMembers extends Council {
  members?: CouncilMember[]
  creator?: Profile
}

export interface ReportWithEvidence extends Report {
  evidence?: ReportEvidence[]
  council?: Council
  submitter?: Profile
}
