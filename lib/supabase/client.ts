import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const authUrl = process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL

  // Return mock client during build or when env vars are missing
  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_project_url_here') {
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
        signUp: async () => ({ error: new Error('Supabase not configured') }),
        signOut: async () => {},
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
        upsert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as any
  }

  // When auth and REST are on separate URLs, route requests through
  // Next.js rewrites to avoid CORS issues in the browser
  const needsProxy = authUrl && authUrl !== supabaseUrl

  if (!needsProxy) {
    return createBrowserClient(supabaseUrl, supabaseKey)
  }

  const customFetch: typeof fetch = async (input, init) => {
    let url: string
    if (typeof input === 'string') {
      url = input
    } else if (input instanceof URL) {
      url = input.toString()
    } else if (input instanceof Request) {
      url = input.url
    } else {
      url = String(input)
    }

    // Route auth requests through the local Next.js proxy
    if (url.includes('/auth/v1/')) {
      const authPath = url.split('/auth/v1/')[1]
      return fetch(`/supabase-auth/${authPath}`, init)
    }

    // Route REST requests through the local Next.js proxy
    if (url.includes('/rest/v1/')) {
      const restPath = url.split('/rest/v1/')[1]
      return fetch(`/supabase-rest/${restPath}`, init)
    }

    return fetch(input, init)
  }

  return createBrowserClient(supabaseUrl, supabaseKey, {
    global: { fetch: customFetch },
  })
}
