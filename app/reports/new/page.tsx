'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PlatformSelect from '@/components/PlatformSelect'
import CountrySelect from '@/components/CountrySelect'
import FileUpload from '@/components/FileUpload'
import { VIOLATION_TYPES } from '@/lib/constants'
import { useMyCouncils } from '@/hooks/useCouncils'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

function NewReportForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedCouncil = searchParams.get('council') || ''
  const { user, profile } = useAuth()
  const { councils } = useMyCouncils()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [platform, setPlatform] = useState('')
  const [contentUrl, setContentUrl] = useState('')
  const [violationType, setViolationType] = useState('')
  const [councilId, setCouncilId] = useState(preselectedCouncil)
  const [country, setCountry] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (profile?.country) setCountry(profile.country)
  }, [profile])

  const selectedViolation = VIOLATION_TYPES.find((v) => v.id === violationType)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        platform,
        content_url: contentUrl || null,
        violation_type: violationType,
        dsa_article: selectedViolation?.dsaArticle || null,
        council_id: councilId || null,
        country,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Failed to create report')
      setLoading(false)
      return
    }

    if (files.length > 0 && user) {
      const supabase = createClient()

      for (const file of files) {
        const filePath = `${user.id}/${data.id}/${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('report-evidence')
          .upload(filePath, file)

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('report-evidence')
            .getPublicUrl(filePath)

          await supabase.from('gr_report_evidence').insert({
            report_id: data.id,
            file_name: file.name,
            file_url: urlData.publicUrl,
            file_type: file.type,
            file_size: file.size,
          })
        }
      }
    }

    router.push('/reports')
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-6">
      {error && (
        <div className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="label">Report Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
          placeholder="Brief title describing the violation"
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
          placeholder="Describe what you observed. Include context about why this is a violation."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Platform *</label>
          <PlatformSelect value={platform} onChange={setPlatform} required />
        </div>
        <div>
          <label className="label">Country</label>
          <CountrySelect value={country} onChange={setCountry} />
        </div>
      </div>

      <div>
        <label htmlFor="contentUrl" className="label">Content URL</label>
        <input
          id="contentUrl"
          type="url"
          value={contentUrl}
          onChange={(e) => setContentUrl(e.target.value)}
          className="input-field"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="label">Violation Type *</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {VIOLATION_TYPES.map((type) => (
            <label
              key={type.id}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                violationType === type.id
                  ? 'border-brand-400 bg-brand-400/10'
                  : 'border-dark-700 hover:border-dark-600'
              }`}
            >
              <input
                type="radio"
                name="violationType"
                value={type.id}
                checked={violationType === type.id}
                onChange={(e) => setViolationType(e.target.value)}
                className="mt-0.5"
                required
              />
              <div>
                <p className="text-sm font-medium text-dark-50">{type.name}</p>
                <p className="text-xs text-dark-400">{type.description}</p>
                {type.dsaArticle && (
                  <p className="text-xs text-brand-300 mt-0.5">DSA {type.dsaArticle}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {councils.length > 0 && (
        <div>
          <label className="label">Assign to Council</label>
          <select
            value={councilId}
            onChange={(e) => setCouncilId(e.target.value)}
            className="input-field"
          >
            <option value="">No council (personal report)</option>
            {councils.map((council) => (
              <option key={council.id} value={council.id}>
                {council.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="label">Evidence (Screenshots)</label>
        <FileUpload onFilesSelected={setFiles} />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  )
}

export default function NewReportPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-dark-50 mb-2">Submit a Violation Report</h1>
      <p className="text-dark-400 mb-8">
        Document a platform violation with evidence. Your report will be linked to the relevant DSA articles.
      </p>
      <Suspense fallback={<div className="text-center py-8 text-dark-400">Loading...</div>}>
        <NewReportForm />
      </Suspense>
    </div>
  )
}
