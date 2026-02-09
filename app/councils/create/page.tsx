'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CountrySelect from '@/components/CountrySelect'
import { FOCUS_AREAS } from '@/lib/constants'

export default function CreateCouncilPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [country, setCountry] = useState('')
  const [focusArea, setFocusArea] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/councils', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        country,
        focus_area: focusArea || null,
        is_public: isPublic,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Failed to create council')
      setLoading(false)
      return
    }

    router.push(`/councils/${data.id}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-dark-50 mb-2">Create a Resilience Council</h1>
      <p className="text-dark-400 mb-8">
        Start a new council to coordinate platform accountability in your country or focus area.
      </p>

      <form onSubmit={handleSubmit} className="card p-8 space-y-6">
        {error && (
          <div className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <div>
          <label htmlFor="name" className="label">Council Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
            placeholder="e.g. German Climate Disinformation Watch"
          />
        </div>

        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-field"
            placeholder="What is this council's mission? What types of violations will you focus on?"
          />
        </div>

        <div>
          <label htmlFor="country" className="label">Country *</label>
          <CountrySelect value={country} onChange={setCountry} required />
        </div>

        <div>
          <label htmlFor="focusArea" className="label">Focus Area</label>
          <select
            id="focusArea"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="input-field"
          >
            <option value="">General</option>
            {FOCUS_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 text-brand-400 rounded bg-dark-800 border-dark-700"
          />
          <label htmlFor="isPublic" className="text-sm text-dark-300">
            Public council (anyone can find and join)
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating...' : 'Create Council'}
        </button>
      </form>
    </div>
  )
}
