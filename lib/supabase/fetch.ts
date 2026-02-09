/**
 * Creates a custom fetch function for server-side Supabase clients.
 * Routes auth requests directly to the separate auth URL when configured.
 * No CORS issues server-side, so we can call services directly.
 *
 * Returns null if no custom routing is needed (standard Supabase setup).
 */
export function createServerFetch(): typeof fetch | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const authUrl = process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL

  // No custom routing needed if auth URL is the same as the main URL
  if (!authUrl || !supabaseUrl || authUrl === supabaseUrl) {
    return null
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

    // Route auth requests to the dedicated auth service
    if (url.includes('/auth/v1/')) {
      const authPath = url.split('/auth/v1/')[1]
      return fetch(`${authUrl}/${authPath}`, init)
    }

    // Route REST requests, stripping the /rest/v1/ prefix
    if (url.includes('/rest/v1/')) {
      const restPath = url.split('/rest/v1/')[1]
      return fetch(`${supabaseUrl}/${restPath}`, init)
    }

    return fetch(input, init)
  }

  return customFetch
}
