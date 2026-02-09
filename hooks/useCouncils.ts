'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Council, CouncilMember } from '@/types/database'
import { useAuth } from '@/contexts/AuthContext'

export function useCouncils(filters?: { country?: string; search?: string }) {
  const [councils, setCouncils] = useState<Council[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCouncils = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    let query = supabase.from('gr_councils').select('*').eq('is_public', true).order('created_at', { ascending: false })

    if (filters?.country) {
      query = query.eq('country', filters.country)
    }
    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    const { data, error } = await query
    if (error) {
      setError(error.message)
    } else {
      setCouncils(data || [])
    }
    setLoading(false)
  }, [filters?.country, filters?.search])

  useEffect(() => {
    fetchCouncils()
  }, [fetchCouncils])

  return { councils, loading, error, refetch: fetchCouncils }
}

export function useCouncil(id: string) {
  const [council, setCouncil] = useState<Council | null>(null)
  const [members, setMembers] = useState<CouncilMember[]>([])
  const [isMember, setIsMember] = useState(false)
  const [memberRole, setMemberRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchCouncil = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()

    const { data: councilData, error: councilError } = await supabase
      .from('gr_councils')
      .select('*')
      .eq('id', id)
      .single()

    if (councilError) {
      setLoading(false)
      return
    }

    setCouncil(councilData)

    const { data: membersData } = await supabase
      .from('gr_council_members')
      .select('*')
      .eq('council_id', id)

    setMembers(membersData || [])

    if (user) {
      const membership = membersData?.find((m) => m.user_id === user.id)
      setIsMember(!!membership)
      setMemberRole(membership?.role || null)
    }

    setLoading(false)
  }, [id, user])

  useEffect(() => {
    if (id) fetchCouncil()
  }, [id, fetchCouncil])

  return { council, members, isMember, memberRole, loading, refetch: fetchCouncil }
}

export function useMyCouncils() {
  const [councils, setCouncils] = useState<Council[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setCouncils([])
      setLoading(false)
      return
    }

    async function fetch() {
      const supabase = createClient()
      const { data: memberData } = await supabase
        .from('gr_council_members')
        .select('council_id')
        .eq('user_id', user!.id)

      if (!memberData?.length) {
        setCouncils([])
        setLoading(false)
        return
      }

      const councilIds = memberData.map((m) => m.council_id)
      const { data } = await supabase
        .from('gr_councils')
        .select('*')
        .in('id', councilIds)
        .order('created_at', { ascending: false })

      setCouncils(data || [])
      setLoading(false)
    }

    fetch()
  }, [user])

  return { councils, loading }
}
