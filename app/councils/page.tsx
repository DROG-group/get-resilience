'use client'

import { useState } from 'react'
import Link from 'next/link'
import CouncilCard from '@/components/CouncilCard'
import CountrySelect from '@/components/CountrySelect'
import { useCouncils } from '@/hooks/useCouncils'
import { useAuth } from '@/contexts/AuthContext'

export default function CouncilsPage() {
  const [country, setCountry] = useState('')
  const [search, setSearch] = useState('')
  const { councils, loading } = useCouncils({ country, search })
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search councils..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field sm:max-w-xs"
        />
        <CountrySelect
          value={country}
          onChange={setCountry}
          includeAll
          className="input-field sm:max-w-xs"
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12 text-dark-400">Loading councils...</div>
      ) : councils.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-dark-400 mb-4">No councils found</p>
          {user && (
            <Link href="/councils/create" className="btn-secondary">
              Create the first one
            </Link>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {councils.map((council) => (
            <CouncilCard key={council.id} council={council} />
          ))}
        </div>
      )}
    </div>
  )
}
