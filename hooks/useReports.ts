'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Report } from '@/types/database'
import { useAuth } from '@/contexts/AuthContext'

export function useMyReports(statusFilter?: string) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchReports = useCallback(async () => {
    if (!user) {
      setReports([])
      setLoading(false)
      return
    }

    setLoading(true)
    const supabase = createClient()
    let query = supabase
      .from('gr_reports')
      .select('*')
      .eq('submitted_by', user.id)
      .order('created_at', { ascending: false })

    if (statusFilter) {
      query = query.eq('status', statusFilter)
    }

    const { data } = await query
    setReports(data || [])
    setLoading(false)
  }, [user, statusFilter])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  return { reports, loading, refetch: fetchReports }
}
