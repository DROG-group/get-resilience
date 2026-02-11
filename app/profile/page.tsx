'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import CountrySelect from '@/components/CountrySelect'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { user, profile, loading: authLoading } = useAuth()
  const [fullName, setFullName] = useState('')
  const [country, setCountry] = useState('')
  const [organization, setOrganization] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setCountry(profile.country || '')
      setOrganization(profile.organization || '')
    }
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()
    const { error } = await supabase
      .from('gr_profiles')
      .update({
        full_name: fullName,
        country,
        organization: organization || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user!.id)

    if (error) {
      toast.error('Failed to update profile')
    } else {
      toast.success('Profile updated')
    }

    setSaving(false)
  }

  if (authLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center text-dark-400">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-dark mb-2">Profile Settings</h1>
      <p className="text-dark-400 mb-8">Update your personal information</p>

      <form onSubmit={handleSubmit} className="card p-8 space-y-5">
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            className="input-field bg-[#f5f5f7] text-dark-400 cursor-not-allowed"
          />
          <p className="text-xs text-dark-400/70 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label htmlFor="fullName" className="label">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="country" className="label">Country</label>
          <CountrySelect value={country} onChange={setCountry} required />
        </div>

        <div>
          <label htmlFor="organization" className="label">Organization (optional)</label>
          <input
            id="organization"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="input-field"
            placeholder="Your organization"
          />
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
