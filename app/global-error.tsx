'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>Something went wrong</h2>
          <p style={{ color: '#666', marginBottom: 16 }}>An unexpected error occurred.</p>
          <button
            onClick={reset}
            style={{ background: '#1d1d1f', color: 'white', padding: '8px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
