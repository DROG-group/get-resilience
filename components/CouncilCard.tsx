import Link from 'next/link'
import { Council } from '@/types/database'
import { getCountryName } from '@/lib/utils'

export default function CouncilCard({ council }: { council: Council }) {
  return (
    <Link href={`/councils/${council.id}`} className="card p-6 block">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{council.name}</h3>
          <p className="text-sm text-brand-400 mt-1">{getCountryName(council.country)}</p>
        </div>
        {council.focus_area && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 whitespace-nowrap">
            {council.focus_area}
          </span>
        )}
      </div>
      {council.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{council.description}</p>
      )}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <span>{council.member_count} member{council.member_count !== 1 ? 's' : ''}</span>
        <span>{council.report_count} report{council.report_count !== 1 ? 's' : ''}</span>
      </div>
    </Link>
  )
}
