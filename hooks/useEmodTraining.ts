'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

interface TrainingStatus {
  required: boolean
  completed: boolean
  certificateCode: string | null
  courses: Array<{
    id: string
    title: string
    completed: boolean
  }>
}

export function useEmodTraining() {
  const { user } = useAuth()
  const [status, setStatus] = useState<TrainingStatus>({
    required: true,
    completed: false,
    certificateCode: null,
    courses: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const checkTraining = async () => {
      const supabase = createClient()

      try {
        // Find required courses (certification_path = 'resilience-council')
        const { data: courses } = await supabase
          .from('plus_courses')
          .select('id, title')
          .eq('certification_path', 'resilience-council')
          .eq('status', 'published')

        if (!courses || courses.length === 0) {
          // No required courses configured yet
          setStatus({ required: false, completed: true, certificateCode: null, courses: [] })
          setLoading(false)
          return
        }

        // Check for certificates
        const { data: certs } = await supabase
          .from('plus_certificates')
          .select('id, certificate_code, course_id')
          .eq('user_id', user.id)
          .in('course_id', courses.map(c => c.id))

        const certMap = new Map(certs?.map(c => [c.course_id, c.certificate_code]) || [])

        const courseStatuses = courses.map(c => ({
          id: c.id,
          title: c.title,
          completed: certMap.has(c.id),
        }))

        const allCompleted = courseStatuses.every(c => c.completed)
        const firstCert = certs?.[0]

        setStatus({
          required: true,
          completed: allCompleted,
          certificateCode: firstCert?.certificate_code || null,
          courses: courseStatuses,
        })
      } catch (err) {
        console.error('Failed to check training status:', err)
        // On error, don't block - allow submission
        setStatus({ required: false, completed: true, certificateCode: null, courses: [] })
      } finally {
        setLoading(false)
      }
    }

    checkTraining()
  }, [user])

  return { ...status, loading }
}
