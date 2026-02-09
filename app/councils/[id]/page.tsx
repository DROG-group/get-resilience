'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useCouncil } from '@/hooks/useCouncils'
import { useAuth } from '@/contexts/AuthContext'
import { getCountryName, formatDate } from '@/lib/utils'
import ReportCard from '@/components/ReportCard'
import { createClient } from '@/lib/supabase/client'
import { Report } from '@/types/database'
import { useEffect } from 'react'

export default function CouncilDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { council, members, isMember, memberRole, loading, refetch } = useCouncil(id)
  const { user } = useAuth()
  const [actionLoading, setActionLoading] = useState(false)
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    if (!id) return
    const supabase = createClient()
    supabase
      .from('gr_reports')
      .select('*')
      .eq('council_id', id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setReports(data || []))
  }, [id])

  async function handleJoin() {
    setActionLoading(true)
    await fetch(`/api/councils/${id}/join`, { method: 'POST' })
    await refetch()
    setActionLoading(false)
  }

  async function handleLeave() {
    setActionLoading(true)
    await fetch(`/api/councils/${id}/leave`, { method: 'POST' })
    await refetch()
    setActionLoading(false)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">
        Loading council...
      </div>
    )
  }

  if (!council) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Council not found</h1>
        <Link href="/councils" className="text-brand-400 hover:underline">
          Browse all councils
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{council.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
            <span>{getCountryName(council.country)}</span>
            {council.focus_area && (
              <>
                <span>&middot;</span>
                <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {council.focus_area}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          {user && !isMember && (
            <button onClick={handleJoin} disabled={actionLoading} className="btn-primary">
              {actionLoading ? 'Joining...' : 'Join Council'}
            </button>
          )}
          {user && isMember && memberRole !== 'admin' && (
            <button onClick={handleLeave} disabled={actionLoading} className="btn-secondary">
              {actionLoading ? 'Leaving...' : 'Leave Council'}
            </button>
          )}
          {user && isMember && (
            <Link href={`/reports/new?council=${id}`} className="btn-primary">
              Submit Report
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      {council.description && (
        <div className="card p-6 mb-8">
          <p className="text-gray-700 whitespace-pre-wrap">{council.description}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-brand-400">{council.member_count}</p>
          <p className="text-sm text-gray-600">Members</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-brand-400">{council.report_count}</p>
          <p className="text-sm text-gray-600">Reports</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-brand-400">{formatDate(council.created_at)}</p>
          <p className="text-sm text-gray-600">Founded</p>
        </div>
      </div>

      {/* Members */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Members ({members.length})
        </h2>
        <div className="card divide-y divide-gray-100">
          {members.map((member) => (
            <div key={member.id} className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-700">{member.user_id.slice(0, 8)}...</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                member.role === 'admin'
                  ? 'bg-brand-100 text-brand-700'
                  : member.role === 'moderator'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reports */}
      {reports.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Reports ({reports.length})
          </h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
