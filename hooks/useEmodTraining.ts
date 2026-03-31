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
  // Training requirement temporarily disabled for testing
  return {
    required: false,
    completed: true,
    certificateCode: null,
    learningPath: DSA_LEARNING_PATH,
    loading: false,
  }
}
