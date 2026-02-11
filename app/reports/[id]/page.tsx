'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Report, ReportEvidence, Council } from '@/types/database'
import StatusBadge from '@/components/StatusBadge'
import ViolationTypeBadge from '@/components/ViolationTypeBadge'
import { PLATFORMS, VIOLATION_TYPES } from '@/lib/constants'
import { formatDate, getCountryName } from '@/lib/utils'
import { toast } from 'sonner'

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const [report, setReport] = useState<Report | null>(null)
  const [evidence, setEvidence] = useState<ReportEvidence[]>([])
  const [council, setCouncil] = useState<Council | null>(null)
  const [isCouncilAdmin, setIsCouncilAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    async function fetchReport() {
      const supabase = createClient()

      const { data: reportData, error } = await supabase
        .from('gr_reports')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !reportData) {
        setLoading(false)
        return
      }

      setReport(reportData)

      // Fetch evidence
      const { data: evidenceData } = await supabase
        .from('gr_report_evidence')
        .select('*')
        .eq('report_id', id)
        .order('created_at', { ascending: true })

      setEvidence(evidenceData || [])

      // Fetch council if assigned
      if (reportData.council_id) {
        const { data: councilData } = await supabase
          .from('gr_councils')
          .select('*')
          .eq('id', reportData.council_id)
          .single()

        setCouncil(councilData)

        // Check if current user is council admin
        if (user) {
          const { data: membership } = await supabase
            .from('gr_council_members')
            .select('role')
            .eq('council_id', reportData.council_id)
            .eq('user_id', user.id)
            .maybeSingle()

          setIsCouncilAdmin(membership?.role === 'admin' || membership?.role === 'moderator')
        }
      }

      setLoading(false)
    }

    fetchReport()
  }, [id, user])

  async function handleStatusChange(newStatus: string) {
    if (!report) return
    setActionLoading(true)

    const res = await fetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })

    if (res.ok) {
      const updated = await res.json()
      setReport(updated)
      toast.success(`Report ${newStatus === 'forwarded' ? 'forwarded to EU DSCs' : newStatus}`)
    } else {
      toast.error('Failed to update report status')
    }

    setActionLoading(false)
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-dark-400">
        Loading report...
      </div>
    )
  }

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-dark mb-2">Report not found</h1>
        <Link href="/reports" className="text-brand-400 hover:underline">
          Back to My Reports
        </Link>
      </div>
    )
  }

  const platform = PLATFORMS.find((p) => p.id === report.platform)
  const violation = VIOLATION_TYPES.find((v) => v.id === report.violation_type)
  const isOwner = user?.id === report.submitted_by
  const canChangeStatus = isOwner || isCouncilAdmin

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link href="/reports" className="text-sm text-brand-400 hover:underline mb-6 inline-block">
        &larr; Back to My Reports
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dark">{report.title}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <StatusBadge status={report.status} />
            <ViolationTypeBadge type={report.violation_type} />
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="card p-6 mb-6 space-y-4">
        {report.description && (
          <div>
            <h3 className="text-sm font-semibold text-dark mb-1">Description</h3>
            <p className="text-dark-400 whitespace-pre-wrap">{report.description}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-dark mb-1">Platform</h3>
            <p className="text-dark-400">{platform ? `${platform.icon} ${platform.name}` : report.platform}</p>
          </div>
          {report.country && (
            <div>
              <h3 className="text-sm font-semibold text-dark mb-1">Country</h3>
              <p className="text-dark-400">{getCountryName(report.country)}</p>
            </div>
          )}
          {violation?.dsaArticle && (
            <div>
              <h3 className="text-sm font-semibold text-dark mb-1">DSA Article</h3>
              <p className="text-brand-400 font-medium">{violation.dsaArticle}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-dark mb-1">Submitted</h3>
            <p className="text-dark-400">{formatDate(report.created_at)}</p>
          </div>
        </div>

        {report.content_url && (
          <div>
            <h3 className="text-sm font-semibold text-dark mb-1">Content URL</h3>
            <a
              href={report.content_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline break-all"
            >
              {report.content_url}
            </a>
          </div>
        )}

        {council && (
          <div>
            <h3 className="text-sm font-semibold text-dark mb-1">Assigned Council</h3>
            <Link href={`/councils/${council.id}`} className="text-brand-400 hover:underline">
              {council.name}
            </Link>
          </div>
        )}
      </div>

      {/* Evidence */}
      {evidence.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-dark mb-4">Evidence ({evidence.length})</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {evidence.map((file) => (
              <a
                key={file.id}
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 flex items-center gap-3 hover:border-brand-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  {file.file_type.startsWith('image/') ? (
                    <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-dark truncate">{file.file_name}</p>
                  <p className="text-xs text-dark-400">
                    {(file.file_size / 1024).toFixed(0)} KB
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Status Actions */}
      {canChangeStatus && !(['resolved', 'dismissed'] as string[]).includes(report.status) && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-dark mb-3">Actions</h2>
          <div className="flex flex-wrap gap-3">
            {report.status === 'submitted' && (
              <button
                onClick={() => handleStatusChange('under_review')}
                disabled={actionLoading}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                Mark Under Review
              </button>
            )}
            {(['submitted', 'under_review'] as string[]).includes(report.status) && (
              <button
                onClick={() => handleStatusChange('forwarded')}
                disabled={actionLoading}
                className="px-4 py-2 bg-brand-400 text-white rounded-lg text-sm font-medium hover:bg-brand-300 transition-colors"
              >
                Forward to EU DSCs
              </button>
            )}
            <button
              onClick={() => handleStatusChange('resolved')}
              disabled={actionLoading}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
            >
              Mark Resolved
            </button>
            <button
              onClick={() => handleStatusChange('dismissed')}
              disabled={actionLoading}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
