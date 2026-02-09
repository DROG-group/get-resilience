export const EU_COUNTRIES = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
] as const

export const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: '📘' },
  { id: 'instagram', name: 'Instagram', icon: '📷' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
  { id: 'youtube', name: 'YouTube', icon: '📺' },
  { id: 'telegram', name: 'Telegram', icon: '✈️' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  { id: 'reddit', name: 'Reddit', icon: '🔴' },
  { id: 'other', name: 'Other', icon: '🌐' },
] as const

export const VIOLATION_TYPES = [
  {
    id: 'disinformation',
    name: 'Disinformation',
    description: 'False or misleading content presented as factual',
    dsaArticle: 'Art. 34-35',
  },
  {
    id: 'hate_speech',
    name: 'Hate Speech',
    description: 'Content inciting violence or hatred against protected groups',
    dsaArticle: 'Art. 16',
  },
  {
    id: 'illegal_content',
    name: 'Illegal Content',
    description: 'Content that violates EU or national law',
    dsaArticle: 'Art. 16',
  },
  {
    id: 'manipulation',
    name: 'Manipulation',
    description: 'Coordinated inauthentic behavior or bot activity',
    dsaArticle: 'Art. 34-35',
  },
  {
    id: 'transparency_violation',
    name: 'Transparency Violation',
    description: 'Failure to label ads, AI content, or algorithmic recommendations',
    dsaArticle: 'Art. 26-27',
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Other DSA-related violation',
    dsaArticle: null,
  },
] as const

export const REPORT_STATUSES = [
  { id: 'draft', name: 'Draft', color: 'gray' },
  { id: 'submitted', name: 'Submitted', color: 'blue' },
  { id: 'under_review', name: 'Under Review', color: 'yellow' },
  { id: 'forwarded', name: 'Forwarded to EU', color: 'purple' },
  { id: 'resolved', name: 'Resolved', color: 'green' },
  { id: 'dismissed', name: 'Dismissed', color: 'red' },
] as const

export const FOCUS_AREAS = [
  'Climate Disinformation',
  'Election Integrity',
  'Health Misinformation',
  'Foreign Interference',
  'Consumer Protection',
  'Hate Speech Monitoring',
  'AI-Generated Content',
  'General Platform Accountability',
] as const
