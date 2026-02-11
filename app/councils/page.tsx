'use client'

import Link from 'next/link'
import EuropeMap from '@/components/EuropeMap'
import CouncilCard from '@/components/CouncilCard'
import { useCouncils } from '@/hooks/useCouncils'
import { useAuth } from '@/contexts/AuthContext'

export default function CouncilsPage() {
  const { councils, loading } = useCouncils({})
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Resilience Councils</h1>
          <p className="text-dark-400 mt-1">Browse and join public councils</p>
        </div>
        {user && (
          <Link href="/councils/create" className="btn-primary whitespace-nowrap">
            Create Council
          </Link>
        )}
      </div>

      {/* Europe Map */}
      <div className="p-6 bg-light rounded-xl border border-dark/5">
        <h2 className="text-lg font-semibold text-dark mb-1 text-center">Councils Across Europe</h2>
        <p className="text-sm text-dark-400 mb-4 text-center">Hover over highlighted countries to see council details</p>
        <EuropeMap councils={councils} />
      </div>

      {/* Council List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-dark mb-4">
          All Councils {councils.length > 0 && `(${councils.length})`}
        </h2>
        {loading ? (
          <div className="text-center py-8 text-dark-400">Loading councils...</div>
        ) : councils.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-dark-400 mb-3">No councils have been created yet. Be the first!</p>
            {user && (
              <Link href="/councils/create" className="btn-primary">
                Create a Council
              </Link>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {councils.map((council) => (
              <CouncilCard key={council.id} council={council} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
