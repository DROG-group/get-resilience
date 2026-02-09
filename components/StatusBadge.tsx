import { REPORT_STATUSES } from '@/lib/constants'

const colorMap: Record<string, string> = {
  gray: 'bg-gray-100 text-gray-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-amber-100 text-amber-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }: { status: string }) {
  const statusInfo = REPORT_STATUSES.find((s) => s.id === status)
  const color = statusInfo ? colorMap[statusInfo.color] : colorMap.gray

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {statusInfo?.name ?? status}
    </span>
  )
}
