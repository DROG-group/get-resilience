'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

const DSA_LEARNING_PATH = 'DSA Reporting for Resilience Councils'

interface TrainingStatus {
  required: boolean
  completed: boolean
  certificateCode: string | null
  // Simplified: just the learning path name, since modules are in emod-platform's JSON
  learningPath: string
}

export function useEmodTraining() {
  const { user } = useAuth()
  const [status, setStatus] = useState<TrainingStatus>({
    required: true,
    completed: false,
    certificateCode: null,
    learningPath: DSA_LEARNING_PATH,
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
        // Check for a certificate with the DSA learning path
        const { data: cert } = await supabase
          .from('certificates')
          .select('id, certificate_code, learning_path')
          .eq('user_id', user.id)
          .eq('learning_path', DSA_LEARNING_PATH)
          .maybeSingle()

        setStatus({
          required: true,
          completed: !!cert,
          certificateCode: cert?.certificate_code || null,
          learningPath: DSA_LEARNING_PATH,
        })
      } catch (err) {
        console.error('Failed to check training status:', err)
        // On error, don't block - allow submission
        setStatus({ required: false, completed: true, certificateCode: null, learningPath: DSA_LEARNING_PATH })
      } finally {
        setLoading(false)
      }
    }

    checkTraining()
  }, [user])

  return { ...status, loading }
}
