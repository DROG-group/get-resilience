'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReportCard from '@/components/ReportCard'
import { useMyReports } from '@/hooks/useReports'
import { REPORT_STATUSES } from '@/lib/constants'

export default function ReportsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const { reports, loading } = useMyReports(statusFilter || undefined)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600 mt-1">Track your submitted violation reports</p>
        </div>
        <Link href="/reports/new" className="btn-primary whitespace-nowrap">
          New Report
        </Link>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setStatusFilter('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !statusFilter ? 'bg-eu-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {REPORT_STATUSES.map((status) => (
          <button
            key={status.id}
            onClick={() => setStatusFilter(status.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              statusFilter === status.id
                ? 'bg-eu-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {statusFilter ? 'No reports with this status' : 'You haven\'t submitted any reports yet'}
          </p>
          <Link href="/reports/new" className="btn-secondary">
            Submit your first report
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
