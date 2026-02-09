import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createServerFetch } from './fetch'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return null-safe client during build or when env vars are missing
  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_project_url_here') {
    return {
      auth: {
        exchangeCodeForSession: async () => ({ error: new Error('Supabase not configured') }),
        getUser: async () => ({ data: { user: null }, error: null }),
      },
    } as any
  }

  const cookieStore = await cookies()
  const customFetch = createServerFetch()

  return createServerClient(supabaseUrl, supabaseKey, {
    ...(customFetch ? { global: { fetch: customFetch } } : {}),
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  })
}
