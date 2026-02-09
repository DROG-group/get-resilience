import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-dark mb-4">How It Works</h1>
      <p className="text-xl text-dark-400 mb-12">
        From screenshot to legal action in three clicks. Citizen networks documenting
        platform violations across Europe through coordination and automation.
      </p>

      {/* Step 1 */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-dark text-white text-xl font-bold rounded-full">
            1
          </div>
          <h2 className="text-2xl font-bold text-dark">Start or Join a Council</h2>
        </div>
        <div className="ml-16">
          <p className="text-dark-400 mb-4">
            Resilience Councils are citizen-led networks that coordinate collective evidence
            against platform violations. Any EU citizen can start or join one &mdash; no
            permission needed, no bureaucratic barriers. Poland&apos;s council was the first
            in the EU, proving the model works.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold text-dark mb-2">Create a Council</h3>
              <ul className="text-sm text-dark-400 space-y-1.5">
                <li>Pick your country to match DSC jurisdiction</li>
                <li>Define your focus (climate disinfo, election integrity, health misinfo, etc.)</li>
                <li>Set visibility: public or private</li>
                <li>You become the admin automatically</li>
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-dark mb-2">Join a Council</h3>
              <ul className="text-sm text-dark-400 space-y-1.5">
                <li>Browse existing councils by country</li>
                <li>Filter by focus area or platform</li>
                <li>Join instantly with one click</li>
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
          <h2 className="text-2xl font-bold text-dark">Document &amp; Report</h2>
        </div>
        <div className="ml-16">
          <p className="text-dark-400 mb-4">
            When you witness a platform violation, document it using our structured
            reporting form. The system uses RADAR.CheckFirst structured data to ensure
            compliance with DSA documentation requirements.
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
                  Direct link to the violating post, video, ad, or page
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">C.</span>
              <div>
                <p className="font-medium text-dark">Categorize the violation type</p>
                <p className="text-sm text-dark-400">
                  Disinformation, hate speech, illegal content, dark patterns,
                  transparency violation, foreign interference, or other
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">D.</span>
              <div>
                <p className="font-medium text-dark">Upload evidence</p>
                <p className="text-sm text-dark-400">
                  Screenshots, PDFs, or other documentation to support your report
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-400 font-bold mt-0.5">E.</span>
              <div>
                <p className="font-medium text-dark">Auto-mapped to DSA articles</p>
                <p className="text-sm text-dark-400">
                  The system automatically maps your report to relevant DSA articles using
                  RADAR.CheckFirst structured data, ensuring full compliance with DSA
                  documentation requirements
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
            This is where coordination becomes your legal leverage. Under DSA Articles 51
            and 56, when multiple national authorities receive credible reports of the same
            violation, they must coordinate investigations. Individual reports can be
            dismissed &mdash; coordinated council submissions cannot.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-5 text-center">
              <div className="text-2xl mb-2">&#x1F4CA;</div>
              <h3 className="font-semibold text-dark text-sm mb-1">Pattern Detection</h3>
              <p className="text-xs text-dark-400">
                Multiple reports from council members reveal systematic violations and
                cross-border patterns
              </p>
            </div>
            <div className="card p-5 text-center">
              <div className="text-2xl mb-2">&#x1F4E8;</div>
              <h3 className="font-semibold text-dark text-sm mb-1">Simultaneous Filing</h3>
              <p className="text-xs text-dark-400">
                Council submits identical structured evidence to Digital Services
                Coordinators in all 27 member states
              </p>
            </div>
            <div className="card p-5 text-center">
              <div className="text-2xl mb-2">&#x2696;</div>
              <h3 className="font-semibold text-dark text-sm mb-1">Mandatory Coordination</h3>
              <p className="text-xs text-dark-400">
                Under DSA Art. 51 &amp; 56, when multiple national authorities receive the
                same evidence, they must coordinate investigations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Start?</h2>
        <p className="text-white/70 mb-6 max-w-lg mx-auto">
          Every report brings us closer to platform accountability. The evidence you
          collect creates a permanent public record that strengthens future enforcement
          actions, compensation claims, and regulatory pressure campaigns.
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
