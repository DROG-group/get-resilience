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

      {/* Training Status */}
      {!training.loading && training.required && (
        <div className={`mb-8 p-5 rounded-xl border ${
          training.completed
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              training.completed ? 'bg-emerald-200' : 'bg-amber-200'
            }`}>
              {training.completed ? (
                <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${training.completed ? 'text-emerald-800' : 'text-amber-800'}`}>
                {training.completed ? 'DSA Training Complete' : 'DSA Training Required'}
              </h3>
              <p className={`text-sm mt-0.5 ${training.completed ? 'text-emerald-700' : 'text-amber-700'}`}>
                {training.completed
                  ? `You have completed the required training. Certificate: ${training.certificateCode}`
                  : 'Complete the DSA reporting course on EMOD+ to unlock report submission.'}
              </p>
              {!training.completed && training.courses.length > 0 && (
                <a
                  href={`https://emodplus.tactcheck.com/plus/courses/${training.courses[0].id}/learn`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm font-medium text-amber-800 underline hover:no-underline"
                >
                  Start training on EMOD+
                </a>
              )}
            </div>
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
