'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PlatformSelect from '@/components/PlatformSelect'
import CountrySelect from '@/components/CountrySelect'
import FileUpload from '@/components/FileUpload'
import { VIOLATION_TYPES } from '@/lib/constants'
import { useMyCouncils } from '@/hooks/useCouncils'
import { useAuth } from '@/contexts/AuthContext'
import { useEmodTraining } from '@/hooks/useEmodTraining'
import { createClient } from '@/lib/supabase/client'

function TrainingGate({ children }: { children: React.ReactNode }) {
  const { completed, loading } = useEmodTraining()

  if (loading) {
    return (
      <div className="card p-8 text-center">
        <div className="w-8 h-8 border-4 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-dark-400">Checking training status...</p>
      </div>
    )
  }

  if (!completed) {
    return (
      <div className="card p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-dark mb-2">Training Required</h2>
          <p className="text-dark-400 max-w-md mx-auto">
            Before submitting DSA violation reports, you need to complete the DSA Reporting
            course on EMOD. This ensures your reports meet the standards that EU regulators expect.
          </p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-dark">DSA Reporting for Resilience Councils</p>
              <p className="text-sm text-dark-400">12 modules across 5 chapters</p>
            </div>
            <a
              href="https://emod.saufex.eu/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm whitespace-nowrap"
            >
              Start Training
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-dark-400 mb-4">
            The training covers DSA article mapping, evidence standards, and coordinated reporting
            best practices. It takes approximately 3 hours to complete.
          </p>
          <a
            href="https://emod.saufex.eu/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:underline text-sm"
          >
            View all learning paths on EMOD
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

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
    <TrainingGate>
      <form onSubmit={handleSubmit} className="card p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg text-sm">{error}</div>
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
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-black/[0.08] hover:border-brand-300'
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
                  <p className="text-sm font-medium text-dark">{type.name}</p>
                  <p className="text-xs text-dark-400">{type.description}</p>
                  {type.dsaArticle && (
                    <p className="text-xs text-brand-400 mt-0.5">DSA {type.dsaArticle}</p>
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
    </TrainingGate>
  )
}

export default function NewReportPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-dark mb-2">Submit a Violation Report</h1>
      <p className="text-dark-400 mb-8">
        Document a platform violation with evidence. Your report will be linked to the relevant DSA articles.
      </p>
      <Suspense fallback={<div className="text-center py-8 text-dark-400">Loading...</div>}>
        <NewReportForm />
      </Suspense>
    </div>
  )
}
