'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">&#9888;</div>
        <h2 className="text-2xl font-bold text-dark mb-2">Something went wrong</h2>
        <p className="text-dark-400 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  )
}
