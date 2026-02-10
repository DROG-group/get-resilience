import Link from 'next/link'
import { IconUsers, IconCamera, IconSend, IconScale, IconShield, IconGlobe, IconDocument, IconChart, IconArrowDown, IconCheck, IconX, IconPerson, IconFlag } from '@/components/Icons'
import EuropeMap from '@/components/EuropeMap'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#fafafa] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,127,245,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,160,0,0.04),_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-dark">
            From Screenshot to Legal Action
            <span className="block text-brand-400 mt-2">In Three Clicks</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-dark-400 max-w-2xl mx-auto">
            Join a Resilience Council. Amplify your reports across all 27 EU regulators.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-dark text-white font-bold px-8 py-3.5 rounded-full text-lg hover:bg-brand-400 transition-colors"
            >
              Join a Council
            </Link>
            <Link
              href="/how-it-works"
              className="bg-transparent hover:bg-dark hover:text-white font-semibold px-8 py-3.5 rounded-full text-lg transition-colors border-2 border-dark text-dark"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Visual 3-Step Flow */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-16">
            How Resilience Councils Work
          </h2>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="flex-shrink-0 w-20 h-20 bg-brand-400 rounded-2xl flex items-center justify-center">
              <IconUsers className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Step 1</div>
              <h3 className="text-xl font-bold text-dark mb-1">Join or Create a Council</h3>
              <p className="text-dark-400">
                Pick your country, choose a focus area. You&apos;re in.
              </p>
            </div>
            <div className="hidden md:grid grid-cols-3 gap-3 flex-shrink-0">
              {['Netherlands', 'Poland', 'Finland'].map((c) => (
                <div key={c} className="bg-white rounded-lg px-3 py-2 text-xs font-medium text-dark border border-black/[0.06] text-center">
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center md:justify-start md:ml-10 my-2">
            <IconArrowDown className="w-6 h-6 text-brand-300" />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="flex-shrink-0 w-20 h-20 bg-dark rounded-2xl flex items-center justify-center">
              <IconCamera className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Step 2</div>
              <h3 className="text-xl font-bold text-dark mb-1">Document the Violation</h3>
              <p className="text-dark-400">
                Screenshot it, paste the URL, categorize it. The system maps it to DSA articles automatically.
              </p>
            </div>
            <div className="hidden md:flex gap-2 flex-shrink-0">
              {[
                { icon: IconCamera, label: 'Screenshot' },
                { icon: IconDocument, label: 'DSA Map' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 border border-black/[0.06]">
                  <Icon className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-medium text-dark">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center md:justify-start md:ml-10 my-2">
            <IconArrowDown className="w-6 h-6 text-brand-300" />
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-20 h-20 bg-brand-400 rounded-2xl flex items-center justify-center">
              <IconSend className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Step 3</div>
              <h3 className="text-xl font-bold text-dark mb-1">Coordinated EU Filing</h3>
              <p className="text-dark-400">
                Your council submits identical evidence to all 27 EU regulators at once. They <em>must</em> investigate.
              </p>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <div className="bg-white rounded-xl p-3 border border-black/[0.06]">
                <div className="grid grid-cols-9 gap-1">
                  {Array.from({ length: 27 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-brand-400/80" />
                  ))}
                </div>
                <p className="text-[10px] text-dark-400 text-center mt-1.5">27 member states</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Coordination — Visual Comparison */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            Why Coordination Matters
          </h2>
          <p className="text-center text-dark-400 mb-12 max-w-xl mx-auto">
            Individual reports get ignored. Coordinated council submissions trigger mandatory investigations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Without Council */}
            <div className="bg-white rounded-2xl border border-black/[0.08] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <IconX className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-dark">Without a Council</h3>
              </div>
              {/* Visual flow */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                    <IconPerson className="w-4 h-4 text-dark-400" />
                  </div>
                  <div className="flex-1 h-1 bg-[#f5f5f7] rounded" />
                  <div className="text-xs text-dark-400 bg-[#f5f5f7] rounded-full px-3 py-1">1 report</div>
                  <div className="flex-1 h-1 bg-[#f5f5f7] rounded" />
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center flex-shrink-0">
                    <IconFlag className="w-4 h-4 text-dark-400" />
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Easily dismissed
                  </span>
                </div>
              </div>
            </div>

            {/* With Council */}
            <div className="bg-white rounded-2xl border-2 border-brand-400 p-8 shadow-[0_20px_40px_rgba(107,76,230,0.1)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
                  <IconCheck className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="text-lg font-bold text-dark">With a Council</h3>
              </div>
              {/* Visual flow */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 flex-shrink-0">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center">
                        <IconPerson className="w-4 h-4 text-brand-400" />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 h-1 bg-brand-100 rounded" />
                  <div className="text-xs text-brand-600 bg-brand-50 rounded-full px-3 py-1 font-medium">27 filings</div>
                  <div className="flex-1 h-1 bg-brand-100 rounded" />
                  <div className="flex -space-x-1.5 flex-shrink-0">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-sm bg-brand-400/80 border border-white" />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-block bg-brand-50 text-brand-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Mandatory investigation (DSA Art. 51 &amp; 56)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — Icon Grid */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-12">
            Built for Effective Reporting
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: IconDocument, title: 'DSA-Compliant', desc: 'Auto-mapped to DSA articles using RADAR.CheckFirst' },
              { icon: IconShield, title: 'Evidence Archive', desc: 'Permanent record for enforcement and compensation claims' },
              { icon: IconGlobe, title: 'Cross-Border', desc: 'Simultaneous filing across all 27 EU member states' },
              { icon: IconUsers, title: 'Council Network', desc: 'Join the European network led by Poland\u2019s first council' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-black/[0.08] p-6 text-center hover:border-brand-400 hover:shadow-[0_20px_40px_rgba(107,76,230,0.1)] hover:-translate-y-1 transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark mb-1">{title}</h3>
                <p className="text-sm text-dark-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Europe Map */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-3">
            Active Councils Across Europe
          </h2>
          <p className="text-center text-dark-400 mb-10 max-w-xl mx-auto">
            Resilience Councils are growing across the EU. Hover over countries to explore.
          </p>
          <div className="max-w-lg mx-auto">
            <EuropeMap />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '6', label: 'Partners' },
              { value: '5', label: 'Countries' },
              { value: '170+', label: 'Research Articles' },
              { value: '27', label: 'EU States' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-400">{stat.value}</div>
                <div className="mt-1 text-sm text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Hold Platforms Accountable?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Join EU citizens using the Digital Services Act to fight disinformation.
          </p>
          <Link
            href="/register"
            className="bg-brand-400 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-brand-300 transition-colors inline-block"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
