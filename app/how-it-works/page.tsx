import Link from 'next/link'
import { IconUsers, IconCamera, IconSend, IconDocument, IconLink, IconTag, IconUpload, IconCheck, IconScale, IconGlobe, IconArrowDown, IconChart, IconShield } from '@/components/Icons'

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-dark mb-3">How It Works</h1>
        <p className="text-xl text-dark-400 max-w-xl mx-auto">
          From screenshot to legal action in three clicks.
        </p>
      </div>

      {/* ======== STEP 1 ======== */}
      <div className="mb-20">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-brand-400 rounded-2xl flex items-center justify-center flex-shrink-0">
            <IconUsers className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step 1</div>
            <h2 className="text-2xl font-bold text-dark">Start or Join a Council</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 ml-0 md:ml-[84px]">
          <div className="bg-white rounded-xl border border-black/[0.08] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <span className="text-lg font-bold text-brand-400">+</span>
              </div>
              <h3 className="font-semibold text-dark">Create a Council</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: IconGlobe, text: 'Pick your country' },
                { icon: IconTag, text: 'Choose a focus area' },
                { icon: IconCheck, text: 'You\u2019re the admin' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span className="text-sm text-dark-400">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-black/[0.08] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <IconUsers className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="font-semibold text-dark">Join a Council</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: IconGlobe, text: 'Browse by country' },
                { icon: IconTag, text: 'Filter by focus area' },
                { icon: IconCheck, text: 'One click to join' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span className="text-sm text-dark-400">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example councils visual */}
        <div className="ml-0 md:ml-[84px] mt-5">
          <div className="bg-[#f5f5f7] rounded-xl p-5">
            <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-3">Example Councils</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { country: 'Poland', focus: 'Election integrity', members: 24 },
                { country: 'Netherlands', focus: 'Climate disinfo', members: 18 },
                { country: 'Finland', focus: 'Health misinfo', members: 12 },
                { country: 'Lithuania', focus: 'Foreign interference', members: 9 },
              ].map((c) => (
                <div key={c.country} className="bg-white rounded-lg p-3 border border-black/[0.06]">
                  <p className="font-semibold text-dark text-sm">{c.country}</p>
                  <p className="text-xs text-dark-400">{c.focus}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <IconUsers className="w-3 h-3 text-brand-400" />
                    <span className="text-xs text-brand-400 font-medium">{c.members}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Arrow connector */}
      <div className="flex justify-center mb-20">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-brand-200" />
          <IconArrowDown className="w-5 h-5 text-brand-300" />
        </div>
      </div>

      {/* ======== STEP 2 ======== */}
      <div className="mb-20">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-dark rounded-2xl flex items-center justify-center flex-shrink-0">
            <IconCamera className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step 2</div>
            <h2 className="text-2xl font-bold text-dark">Document the Violation</h2>
          </div>
        </div>

        {/* Visual reporting pipeline */}
        <div className="ml-0 md:ml-[84px]">
          <div className="bg-[#f5f5f7] rounded-xl p-6">
            <div className="grid sm:grid-cols-5 gap-4">
              {[
                { icon: IconTag, label: 'Platform', detail: 'Select where' },
                { icon: IconLink, label: 'URL', detail: 'Paste the link' },
                { icon: IconScale, label: 'Violation', detail: 'Categorize it' },
                { icon: IconUpload, label: 'Evidence', detail: 'Upload screenshots' },
                { icon: IconDocument, label: 'DSA Map', detail: 'Auto-generated' },
              ].map(({ icon: Icon, label, detail }, i) => (
                <div key={label} className="relative">
                  <div className="bg-white rounded-xl p-4 text-center border border-black/[0.06] h-full">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 rounded-xl mb-2">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <p className="font-semibold text-dark text-sm">{label}</p>
                    <p className="text-xs text-dark-400 mt-0.5">{detail}</p>
                    {i === 4 && (
                      <span className="inline-block mt-2 text-[10px] font-medium text-brand-400 bg-brand-50 rounded-full px-2 py-0.5">
                        automatic
                      </span>
                    )}
                  </div>
                  {/* Connector arrow (hidden on mobile, shown between items on desktop) */}
                  {i < 4 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-brand-300">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DSA articles visual */}
          <div className="mt-5 bg-white rounded-xl border border-black/[0.08] p-5">
            <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-3">Automatically mapped to DSA articles</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Art. 16 \u2014 Report illegal content',
                'Art. 22 \u2014 Trusted flaggers',
                'Art. 24 \u2014 Transparency',
                'Art. 25 \u2014 Dark patterns',
                'Art. 26 \u2014 Ad transparency',
                'Art. 34 \u2014 Risk assessment',
                'Art. 51 \u2014 Cross-border coordination',
              ].map((art) => (
                <span key={art} className="inline-flex items-center gap-1.5 bg-[#f5f5f7] rounded-full px-3 py-1.5 text-xs font-medium text-dark">
                  <IconScale className="w-3 h-3 text-brand-400" />
                  {art}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Arrow connector */}
      <div className="flex justify-center mb-20">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-brand-200" />
          <IconArrowDown className="w-5 h-5 text-brand-300" />
        </div>
      </div>

      {/* ======== STEP 3 ======== */}
      <div className="mb-20">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-brand-400 rounded-2xl flex items-center justify-center flex-shrink-0">
            <IconSend className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step 3</div>
            <h2 className="text-2xl font-bold text-dark">Coordinated EU Filing</h2>
          </div>
        </div>

        <div className="ml-0 md:ml-[84px]">
          {/* Visual: filing to 27 states */}
          <div className="bg-dark rounded-2xl p-8 text-white mb-5">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Council */}
              <div className="text-center flex-shrink-0">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <IconUsers className="w-8 h-8 text-brand-300" />
                </div>
                <p className="text-sm font-medium text-white/80">Your Council</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center flex-shrink-0">
                <div className="w-16 h-0.5 bg-brand-400/50" />
                <svg className="w-3 h-3 text-brand-400 -ml-0.5" viewBox="0 0 12 12" fill="currentColor"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <div className="md:hidden">
                <IconArrowDown className="w-5 h-5 text-brand-400/50" />
              </div>

              {/* 27 states grid */}
              <div className="flex-1">
                <div className="grid grid-cols-9 gap-1.5 mb-3">
                  {Array.from({ length: 27 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded bg-brand-400/70 flex items-center justify-center">
                      <IconShield className="w-3 h-3 text-white/60" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 text-center">
                  Identical structured evidence sent to all 27 Digital Services Coordinators
                </p>
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: IconChart, title: 'Pattern detected', desc: 'Multiple reports reveal systematic cross-border violations' },
              { icon: IconSend, title: 'Simultaneous filing', desc: 'Same evidence reaches all 27 member states at once' },
              { icon: IconScale, title: 'Mandatory action', desc: 'Under DSA Art. 51 & 56, regulators must coordinate' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-black/[0.08] p-5 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 rounded-xl mb-3">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark text-sm mb-1">{title}</h3>
                <p className="text-xs text-dark-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Start?</h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          Every report strengthens enforcement. Every council multiplies your impact.
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
