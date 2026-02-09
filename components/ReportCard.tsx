import Link from 'next/link'
import { Report } from '@/types/database'
import StatusBadge from './StatusBadge'
import ViolationTypeBadge from './ViolationTypeBadge'
import { PLATFORMS } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

export default function ReportCard({ report }: { report: Report }) {
  const platform = PLATFORMS.find((p) => p.id === report.platform)

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{report.title}</h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <StatusBadge status={report.status} />
            <ViolationTypeBadge type={report.violation_type} />
            {platform && (
              <span className="text-xs text-gray-500">
                {platform.icon} {platform.name}
              </span>
            )}
          </div>
        </div>
      </div>
      {report.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{report.description}</p>
      )}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{formatDate(report.created_at)}</span>
        {report.content_url && (
          <a
            href={report.content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-eu-blue-500 hover:underline"
          >
            View content
          </a>
        )}
      </div>
    </div>
  )
}
