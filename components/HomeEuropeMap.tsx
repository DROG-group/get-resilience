'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Council } from '@/types/database'
import EuropeMap from './EuropeMap'

export default function HomeEuropeMap() {
  const [councils, setCouncils] = useState<Council[]>([])

  useEffect(() => {
    async function fetch() {
      const supabase = createClient()
      const { data } = await supabase
        .from('gr_councils')
        .select('*')
        .eq('is_public', true)
      setCouncils(data || [])
    }
    fetch()
  }, [])

  return <EuropeMap councils={councils} />
}
