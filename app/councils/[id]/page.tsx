'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useCouncil } from '@/hooks/useCouncils'
import { useAuth } from '@/contexts/AuthContext'
import { getCountryName, formatDate } from '@/lib/utils'
import ReportCard from '@/components/ReportCard'
import { createClient } from '@/lib/supabase/client'
import { Report, Profile } from '@/types/database'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function CouncilDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { council, members, isMember, memberRole, loading, refetch } = useCouncil(id)
  const { user } = useAuth()
  const [actionLoading, setActionLoading] = useState(false)
  const [reports, setReports] = useState<Report[]>([])
  const [memberProfiles, setMemberProfiles] = useState<Record<string, Profile>>({})

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

  // Fetch member profiles
  useEffect(() => {
    if (members.length === 0) return
    const supabase = createClient()
    const userIds = members.map((m) => m.user_id)
    supabase
      .from('gr_profiles')
      .select('*')
      .in('id', userIds)
      .then(({ data }) => {
        const profiles: Record<string, Profile> = {}
        data?.forEach((p) => { profiles[p.id] = p })
        setMemberProfiles(profiles)
      })
  }, [members])

  async function handleRoleChange(memberId: string, newRole: string) {
    setActionLoading(true)
    const res = await fetch(`/api/councils/${id}/members/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    if (res.ok) {
      toast.success(`Member role updated to ${newRole}`)
      await refetch()
    } else {
      const data = await res.json()
      toast.error(data.error || 'Failed to update role')
    }
    setActionLoading(false)
  }

  async function handleRemoveMember(memberId: string) {
    if (!confirm('Remove this member from the council?')) return
    setActionLoading(true)
    const res = await fetch(`/api/councils/${id}/members/${memberId}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Member removed')
      await refetch()
    } else {
      toast.error('Failed to remove member')
    }
    setActionLoading(false)
  }

  async function handleJoin() {
    setActionLoading(true)
    const res = await fetch(`/api/councils/${id}/join`, { method: 'POST' })
    if (res.ok) {
      toast.success('You joined the council!')
    } else {
      toast.error('Failed to join council')
    }
    await refetch()
    setActionLoading(false)
  }

  async function handleLeave() {
    if (!confirm('Are you sure you want to leave this council?')) return
    setActionLoading(true)
    const res = await fetch(`/api/councils/${id}/leave`, { method: 'POST' })
    if (res.ok) {
      toast.success('You left the council')
    } else {
      toast.error('Failed to leave council')
    }
    await refetch()
    setActionLoading(false)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-dark-400">
        Loading council...
      </div>
    )
  }

  if (!council) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-dark mb-2">Council not found</h1>
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
          <h1 className="text-3xl font-bold text-dark">{council.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-dark-400">
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
          <p className="text-dark-400 whitespace-pre-wrap">{council.description}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-brand-400">{council.member_count}</p>
          <p className="text-sm text-dark-400">Members</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-brand-400">{council.report_count}</p>
          <p className="text-sm text-dark-400">Reports</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-brand-400">{formatDate(council.created_at)}</p>
          <p className="text-sm text-dark-400">Founded</p>
        </div>
      </div>

      {/* Members */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-dark mb-4">
          Members ({members.length})
        </h2>
        <div className="card divide-y divide-black/[0.08]">
          {members.map((member) => {
            const profile = memberProfiles[member.user_id]
            const isAdmin = memberRole === 'admin'
            const isOwnEntry = member.user_id === user?.id
            return (
              <div key={member.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-dark truncate">
                    {profile?.full_name || member.user_id.slice(0, 8) + '...'}
                  </p>
                  {profile?.organization && (
                    <p className="text-xs text-dark-400">{profile.organization}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    member.role === 'admin'
                      ? 'bg-brand-100 text-brand-700'
                      : member.role === 'moderator'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-dark-400'
                  }`}>
                    {member.role}
                  </span>
                  {isAdmin && !isOwnEntry && member.role !== 'admin' && (
                    <div className="flex items-center gap-1">
                      {member.role === 'member' ? (
                        <button
                          onClick={() => handleRoleChange(member.user_id, 'moderator')}
                          disabled={actionLoading}
                          className="text-xs text-brand-400 hover:underline"
                          title="Promote to moderator"
                        >
                          Promote
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(member.user_id, 'member')}
                          disabled={actionLoading}
                          className="text-xs text-amber-600 hover:underline"
                          title="Demote to member"
                        >
                          Demote
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveMember(member.user_id)}
                        disabled={actionLoading}
                        className="text-xs text-red-500 hover:underline ml-1"
                        title="Remove member"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Admin Guide */}
      {memberRole === 'admin' && (
        <div className="mb-8">
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-dark mb-2">Admin Guide</h2>
            <p className="text-sm text-dark-400 mb-4">
              As council admin, you play a key role in making sure reports reach EU regulators effectively.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-400 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="text-sm font-medium text-dark">Review incoming reports</p>
                  <p className="text-xs text-dark-400">Check that evidence is clear, the violation type is correct, and the right DSA articles are mapped. Mark reports as &ldquo;Under Review&rdquo; when you start.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-400 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="text-sm font-medium text-dark">Forward to EU regulators</p>
                  <p className="text-xs text-dark-400">When a report is solid, mark it as &ldquo;Forwarded to EU&rdquo;. This signals that the structured evidence has been sent to Digital Services Coordinators across EU member states.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-400 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="text-sm font-medium text-dark">Manage your team</p>
                  <p className="text-xs text-dark-400">Promote trusted members to moderator so they can also review reports. Quality over quantity — well-documented reports with proper evidence are worth more than volume.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {reports.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-dark mb-4">
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
