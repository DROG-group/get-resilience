'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useMyCouncils } from '@/hooks/useCouncils'
import { useMyReports } from '@/hooks/useReports'
import CouncilCard from '@/components/CouncilCard'
import ReportCard from '@/components/ReportCard'
import { getCountryName } from '@/lib/utils'

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const { councils, loading: councilsLoading } = useMyCouncils()
  const { reports, loading: reportsLoading } = useMyReports()

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">
        Loading...
      </div>
    )
  }

  const recentReports = reports.slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>
        <p className="text-gray-600 mt-1">
          {profile?.country ? getCountryName(profile.country) : 'EU Citizen'}
          {profile?.organization ? ` \u2022 ${profile.organization}` : ''}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <Link
          href="/reports/new"
          className="card p-6 text-center hover:border-brand-300 transition-colors"
        >
          <div className="text-3xl mb-2">&#x1F4F8;</div>
          <h3 className="font-semibold text-gray-900">Submit Report</h3>
          <p className="text-sm text-gray-500 mt-1">Document a platform violation</p>
        </Link>
        <Link
          href="/councils/create"
          className="card p-6 text-center hover:border-brand-300 transition-colors"
        >
          <div className="text-3xl mb-2">&#x1F3DB;</div>
          <h3 className="font-semibold text-gray-900">Create Council</h3>
          <p className="text-sm text-gray-500 mt-1">Start a new Resilience Council</p>
        </Link>
        <Link
          href="/councils"
          className="card p-6 text-center hover:border-brand-300 transition-colors"
        >
          <div className="text-3xl mb-2">&#x1F50D;</div>
          <h3 className="font-semibold text-gray-900">Browse Councils</h3>
          <p className="text-sm text-gray-500 mt-1">Find and join existing councils</p>
        </Link>
      </div>

      {/* My Councils */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            My Councils ({councils.length})
          </h2>
          <Link href="/councils" className="text-sm text-brand-400 hover:underline">
            Browse all
          </Link>
        </div>
        {councilsLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : councils.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500 mb-3">You haven&apos;t joined any councils yet</p>
            <Link href="/councils" className="btn-secondary">
              Browse Councils
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {councils.map((council) => (
              <CouncilCard key={council.id} council={council} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Reports ({reports.length})
          </h2>
          <Link href="/reports" className="text-sm text-brand-400 hover:underline">
            View all
          </Link>
        </div>
        {reportsLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : recentReports.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-500 mb-3">You haven&apos;t submitted any reports yet</p>
            <Link href="/reports/new" className="btn-secondary">
              Submit your first report
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
