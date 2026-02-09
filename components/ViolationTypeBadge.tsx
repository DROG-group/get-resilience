import { VIOLATION_TYPES } from '@/lib/constants'

const colorMap: Record<string, string> = {
  disinformation: 'bg-orange-900/30 text-orange-400',
  hate_speech: 'bg-red-900/30 text-red-400',
  illegal_content: 'bg-red-900/30 text-red-300',
  manipulation: 'bg-purple-900/30 text-purple-400',
  transparency_violation: 'bg-amber-900/30 text-amber-400',
  other: 'bg-dark-700 text-dark-300',
}

export default function ViolationTypeBadge({ type }: { type: string }) {
  const typeInfo = VIOLATION_TYPES.find((t) => t.id === type)
  const color = colorMap[type] || colorMap.other

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {typeInfo?.name ?? type}
    </span>
  )
}
