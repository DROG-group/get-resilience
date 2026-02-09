import { VIOLATION_TYPES } from '@/lib/constants'

const colorMap: Record<string, string> = {
  disinformation: 'bg-orange-100 text-orange-700',
  hate_speech: 'bg-red-100 text-red-700',
  illegal_content: 'bg-red-100 text-red-800',
  manipulation: 'bg-purple-100 text-purple-700',
  transparency_violation: 'bg-yellow-100 text-yellow-700',
  other: 'bg-gray-100 text-gray-700',
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
