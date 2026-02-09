import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-dark mb-4">How It Works</h1>
      <p className="text-xl text-dark-400 mb-12">
        Three steps from witnessing a violation to triggering EU enforcement action.
      </p>

      {/* Step 1 */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-dark text-white text-xl font-bold rounded-full">
            1
          </div>
          <h2 className="text-2xl font-bold text-dark">Create or Join a Council</h2>
        </div>
        <div className="ml-16">
          <p className="text-dark-400 mb-4">
            Resilience Councils are the backbone of collective action. You can either
            create a new council or join an existing one.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold text-dark mb-2">Create a Council</h3>
              <ul className="text-sm text-dark-400 space-y-1.5">
                <li>Pick your country and focus area</li>
                <li>Write a description of your mission</li>
                <li>Choose public or private visibility</li>
                <li>You become the admin automatically</li>
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-dark mb-2">Join a Council</h3>
              <ul className="text-sm text-dark-400 space-y-1.5">
                <li>Browse public councils by country</li>
                <li>Filter by focus area</li>
                <li>Click &ldquo;Join&rdquo; to become a member</li>
                <li>Start contributing reports immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-dark text-white text-xl font-bold rounded-full">
            2
          </div>
          <h2 className="text-2xl font-bold text-dark">Document & Report</h2>
        </div>
        <div className="ml-16">
          <p className="text-dark-400 mb-4">
            When you see a platform violation, document it with our structured reporting form.
          </p>
          <div className="bg-[#f5f5f7] rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">A.</span>
              <div>
                <p className="font-medium text-dark">Select the platform</p>
                <p className="text-sm text-dark-400">
                  Facebook, Instagram, TikTok, X, YouTube, Telegram, LinkedIn, Reddit, or other
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">B.</span>
              <div>
                <p className="font-medium text-dark">Paste the content URL</p>
                <p className="text-sm text-dark-400">
                  Direct link to the violating post, video, or ad
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">C.</span>
              <div>
                <p className="font-medium text-dark">Categorize the violation</p>
                <p className="text-sm text-dark-400">
                  Disinformation, hate speech, illegal content, manipulation,
                  transparency violation, or other
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">D.</span>
              <div>
                <p className="font-medium text-dark">Upload evidence</p>
                <p className="text-sm text-dark-400">
                  Screenshots, PDFs, or other documentation. The system automatically
                  maps your report to relevant DSA articles.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">E.</span>
              <div>
                <p className="font-medium text-dark">Assign to your council</p>
                <p className="text-sm text-dark-400">
                  Link the report to one of your councils for coordinated submission
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-dark text-white text-xl font-bold rounded-full">
            3
          </div>
          <h2 className="text-2xl font-bold text-dark">Coordinated EU Action</h2>
        </div>
        <div className="ml-16">
          <p className="text-dark-400 mb-4">
            Councils aggregate individual reports into powerful collective submissions
            that EU regulators cannot ignore.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-5 text-center">
              <div className="text-2xl mb-2">&#x1F4CA;</div>
              <h3 className="font-semibold text-dark text-sm mb-1">Pattern Detection</h3>
              <p className="text-xs text-dark-400">
                Multiple reports reveal systematic violations
              </p>
            </div>
            <div className="card p-5 text-center">
              <div className="text-2xl mb-2">&#x1F4E8;</div>
              <h3 className="font-semibold text-dark text-sm mb-1">Coordinated Submission</h3>
              <p className="text-xs text-dark-400">
                Council admins forward bundled reports to DSCs
              </p>
            </div>
            <div className="card p-5 text-center">
              <div className="text-2xl mb-2">&#x2696;</div>
              <h3 className="font-semibold text-dark text-sm mb-1">Enforcement</h3>
              <p className="text-xs text-dark-400">
                DSCs investigate and can impose DSA penalties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Start?</h2>
        <p className="text-white/70 mb-6 max-w-lg mx-auto">
          Create a free account and join a Resilience Council today.
          Every report brings us closer to a safer digital space.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/register"
            className="bg-brand-400 text-white font-bold px-8 py-3 rounded-full hover:bg-brand-300 transition-colors"
          >
            Create Account
          </Link>
          <Link
            href="/councils"
            className="bg-white/10 hover:bg-white/20 font-semibold px-8 py-3 rounded-full transition-colors border border-white/20 text-white"
          >
            Browse Councils
          </Link>
        </div>
      </div>
    </div>
  )
}
