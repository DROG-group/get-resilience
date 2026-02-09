'use client'

import { PLATFORMS } from '@/lib/constants'

interface PlatformSelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
}

export default function PlatformSelect({ value, onChange, required, className }: PlatformSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={className || 'input-field'}
    >
      <option value="">Select platform</option>
      {PLATFORMS.map((platform) => (
        <option key={platform.id} value={platform.id}>
          {platform.icon} {platform.name}
        </option>
      ))}
    </select>
  )
}
