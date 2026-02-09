import { REPORT_STATUSES } from '@/lib/constants'

const colorMap: Record<string, string> = {
  gray: 'bg-dark-700 text-dark-300',
  blue: 'bg-blue-900/30 text-blue-400',
  yellow: 'bg-amber-900/30 text-amber-400',
  purple: 'bg-purple-900/30 text-purple-400',
  green: 'bg-green-900/30 text-green-400',
  red: 'bg-red-900/30 text-red-400',
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
