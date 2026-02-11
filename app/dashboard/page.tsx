'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useMyCouncils } from '@/hooks/useCouncils'
import { useMyReports } from '@/hooks/useReports'
import { useEmodTraining } from '@/hooks/useEmodTraining'
import CouncilCard from '@/components/CouncilCard'
import ReportCard from '@/components/ReportCard'
import { getCountryName } from '@/lib/utils'

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const { councils, loading: councilsLoading } = useMyCouncils()
  const { reports, loading: reportsLoading } = useMyReports()
  const training = useEmodTraining()

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-dark-400">
        Loading...
      </div>
    )
  }

  const recentReports = reports.slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
        </h1>
        <p className="text-dark-400 mt-1">
          {profile?.country ? getCountryName(profile.country) : 'EU Citizen'}
          {profile?.organization ? ` \u2022 ${profile.organization}` : ''}
        </p>
      </div>

      {/* Getting Started - shown when training not completed */}
      {!training.loading && training.required && !training.completed && (
        <div className="mb-10 card p-8">
          <h2 className="text-xl font-bold text-dark mb-2">Getting Started</h2>
          <p className="text-dark-400 text-sm mb-6">
            Complete these steps to start filing DSA reports with your council.
          </p>
          <div className="space-y-4">
            {/* Step 1: Training */}
            <div className="flex items-start gap-4 p-4 bg-brand-50 border border-brand-200 rounded-xl">
              <div className="w-8 h-8 bg-brand-400 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-dark">Complete DSA Training on EMOD</h3>
                <p className="text-sm text-dark-400 mt-0.5">
                  A free course that teaches you how to identify violations and file reports that meet EU standards. Takes about 30 minutes.
                </p>
                <a
                  href="https://emod.saufex.eu/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 bg-brand-400 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-brand-300 transition-colors"
                >
                  Start Training on EMOD
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-xs text-dark-400/70 mt-2">
                  Use the same email ({user?.email}) to sign in on EMOD. Your accounts are linked.
                </p>
              </div>
            </div>

            {/* Step 2: Join council */}
            <div className="flex items-start gap-4 p-4 bg-[#f5f5f7] rounded-xl opacity-60">
              <div className="w-8 h-8 bg-dark/20 text-dark-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-dark-400">Join a Resilience Council</h3>
                <p className="text-sm text-dark-400 mt-0.5">Find a council in your country or create a new one.</p>
              </div>
            </div>

            {/* Step 3: Submit */}
            <div className="flex items-start gap-4 p-4 bg-[#f5f5f7] rounded-xl opacity-60">
              <div className="w-8 h-8 bg-dark/20 text-dark-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-dark-400">Submit DSA Violation Reports</h3>
                <p className="text-sm text-dark-400 mt-0.5">Document violations with evidence and coordinate with your council.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Training Complete badge */}
      {!training.loading && training.required && training.completed && (
        <div className="mb-8 p-4 rounded-xl border bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-700 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-emerald-800">
              <strong>DSA Training Complete</strong> &mdash; Certificate: {training.certificateCode}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <Link
          href="/reports/new"
          className="card p-6 text-center"
        >
          <div className="text-3xl mb-2">&#x1F4F8;</div>
          <h3 className="font-semibold text-dark">Submit Report</h3>
          <p className="text-sm text-dark-400 mt-1">Document a platform violation</p>
        </Link>
        <Link
          href="/councils/create"
          className="card p-6 text-center"
        >
          <div className="text-3xl mb-2">&#x1F3DB;</div>
          <h3 className="font-semibold text-dark">Create Council</h3>
          <p className="text-sm text-dark-400 mt-1">Start a new Resilience Council</p>
        </Link>
        <Link
          href="/councils"
          className="card p-6 text-center"
        >
          <div className="text-3xl mb-2">&#x1F50D;</div>
          <h3 className="font-semibold text-dark">Browse Councils</h3>
          <p className="text-sm text-dark-400 mt-1">Find and join existing councils</p>
        </Link>
      </div>

      {/* My Councils */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-dark">
            My Councils ({councils.length})
          </h2>
          <Link href="/councils" className="text-sm text-brand-400 hover:underline">
            Browse all
          </Link>
        </div>
        {councilsLoading ? (
          <div className="text-center py-8 text-dark-400">Loading...</div>
        ) : councils.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-dark-400 mb-3">You haven&apos;t joined any councils yet</p>
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
          <h2 className="text-xl font-semibold text-dark">
            Recent Reports ({reports.length})
          </h2>
          <Link href="/reports" className="text-sm text-brand-400 hover:underline">
            View all
          </Link>
        </div>
        {reportsLoading ? (
          <div className="text-center py-8 text-dark-400">Loading...</div>
        ) : recentReports.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-dark-400 mb-3">You haven&apos;t submitted any reports yet</p>
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
