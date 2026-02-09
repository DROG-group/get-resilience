'use client'

import { EU_COUNTRIES } from '@/lib/constants'

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
  includeAll?: boolean
}

export default function CountrySelect({ value, onChange, required, className, includeAll }: CountrySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={className || 'input-field'}
    >
      {includeAll ? (
        <option value="">All Countries</option>
      ) : (
        <option value="">Select your country</option>
      )}
      {EU_COUNTRIES.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  )
}
