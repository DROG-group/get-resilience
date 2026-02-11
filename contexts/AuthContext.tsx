'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { Profile } from '@/types/database'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, metadata: { full_name: string; country: string }) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data, error: sessionError }: { data: { session: Session | null }, error: Error | null }) => {
        if (sessionError) {
          console.error('Failed to get session:', sessionError)
          setError('Failed to restore session')
        }
        setSession(data.session)
        setUser(data.session?.user ?? null)
        if (data.session?.user) {
          fetchProfile(data.session.user.id)
        }
        setLoading(false)
      })
      .catch((err: unknown) => {
        console.error('Unexpected error getting session:', err)
        setError('Failed to initialize authentication')
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        setError(null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    try {
      const { data, error: profileError } = await supabase
        .from('gr_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('Failed to fetch profile:', profileError)
        setError('Failed to load profile')
        setProfile(null)
      } else {
        setProfile(data)
        setError(null)
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err)
      setError('Failed to load profile')
      setProfile(null)
    }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error as Error | null }
  }

  async function signUp(email: string, password: string, metadata: { full_name: string; country: string }) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { error: error as Error | null }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error: error as Error | null }
  }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, error, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
