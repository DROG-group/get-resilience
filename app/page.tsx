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
          <p className="mt-6 text-lg sm:text-xl text-dark-400 max-w-3xl mx-auto">
            Foreign actors manipulate online platforms to undermine European democracy. The EU&apos;s Digital Services Act
            gives citizens the legal tools to fight back &mdash; but only if reports are coordinated.
            GetResilience makes that coordination automatic.
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

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            The Problem We&apos;re Solving
          </h2>
          <p className="text-center text-dark-400 mb-12 max-w-3xl mx-auto">
            Foreign information manipulation and interference (FIMI) is one of the biggest threats to European democracy.
            State-backed actors use social media to spread disinformation, polarize societies, and interfere in elections.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f7] rounded-xl p-6">
              <div className="text-3xl font-extrabold text-brand-400 mb-2">83%</div>
              <p className="text-sm text-dark-400">
                of Europeans see disinformation as a threat to democracy (Eurobarometer 2024).
                Yet most feel powerless to do anything about it.
              </p>
            </div>
            <div className="bg-[#f5f5f7] rounded-xl p-6">
              <div className="text-3xl font-extrabold text-brand-400 mb-2">6x</div>
              <p className="text-sm text-dark-400">
                False stories spread six times faster than true ones because they&apos;re more
                emotionally engaging. Platforms profit from this engagement.
              </p>
            </div>
            <div className="bg-[#f5f5f7] rounded-xl p-6">
              <div className="text-3xl font-extrabold text-brand-400 mb-2">&lt;1%</div>
              <p className="text-sm text-dark-400">
                of individual user reports to platforms result in meaningful action.
                Without coordination, complaints disappear into a black hole.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The DSA Opportunity */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            The DSA Changed Everything
          </h2>
          <p className="text-center text-dark-400 mb-12 max-w-3xl mx-auto">
            The EU&apos;s Digital Services Act (DSA), fully enforced since February 2024, creates legally binding
            obligations for platforms. For the first time, citizens have real legal tools to hold platforms accountable.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <IconDocument className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark">Your Rights Under the DSA</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Art. 16:</strong> Report illegal content directly to platforms &mdash; they must act</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Art. 17:</strong> Platforms must explain every moderation decision to you</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Art. 20:</strong> Appeal any decision through internal complaint systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Art. 22:</strong> Trusted Flaggers get priority treatment from platforms</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <IconScale className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark">Why Coordination Unlocks the DSA</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Art. 34:</strong> Cross-border patterns trigger mandatory risk assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Art. 51 &amp; 56:</strong> Regulators must coordinate across borders when multiple states are affected</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Coordinated reports establish <strong>systemic patterns</strong> that single reports cannot</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Councils can work toward <strong>Trusted Flagger</strong> status for priority enforcement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual 3-Step Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            How Resilience Councils Work
          </h2>
          <p className="text-center text-dark-400 mb-16 max-w-2xl mx-auto">
            Resilience Councils are citizen-led bodies that coordinate disinformation reports to EU regulators.
            They follow a whole-of-society approach: citizens, civil society, media, and researchers working together.
          </p>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="flex-shrink-0 w-20 h-20 bg-brand-400 rounded-2xl flex items-center justify-center">
              <IconUsers className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Step 1</div>
              <h3 className="text-xl font-bold text-dark mb-1">Join or Create a Council</h3>
              <p className="text-dark-400">
                Pick your country, choose a focus area &mdash; election integrity, health misinformation,
                climate disinformation, or foreign interference. Any EU citizen can start one.
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
                Screenshot it, paste the URL, categorize the violation type.
                The system automatically maps your report to the relevant DSA articles &mdash;
                so your complaint speaks the language regulators understand.
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
                Your council submits identical, structured evidence to all 27 EU Digital Services Coordinators
                simultaneously. Under DSA Articles 51 and 56, when multiple member states receive the same
                complaint, regulators <em>must</em> coordinate their response. That&apos;s the power of collective action.
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
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            Why Coordination Matters
          </h2>
          <p className="text-center text-dark-400 mb-12 max-w-2xl mx-auto">
            The DSA gives every EU citizen the right to report illegal content. But platforms process millions
            of individual reports &mdash; and routinely ignore them. Coordinated council submissions establish
            systemic patterns that trigger mandatory regulatory investigation.
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
                    Easily dismissed &mdash; no systemic pattern established
                  </span>
                </div>
                <p className="text-xs text-dark-400 text-center">
                  Individual reports are processed by algorithms. No human ever reads them.
                  Platforms have no legal obligation to take action on single complaints.
                </p>
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
                <p className="text-xs text-dark-400 text-center">
                  Identical evidence filed simultaneously across 27 member states.
                  Regulators must coordinate their response under the DSA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Europe Map */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-3">
            Active Councils Across Europe
          </h2>
          <p className="text-center text-dark-400 mb-10 max-w-2xl mx-auto">
            The SAUFEX consortium operates across five EU countries with active partners.
            Poland launched the first FIMI Resilience Council in 2024, integrating government, civil society,
            and academic experts for election disinformation prevention. This model is now expanding across the EU.
          </p>
          <div className="max-w-lg mx-auto">
            <EuropeMap />
          </div>
        </div>
      </section>

      {/* SAUFEX + EMOD */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            Part of the SAUFEX Ecosystem
          </h2>
          <p className="text-center text-dark-400 mb-12 max-w-3xl mx-auto">
            GetResilience is built by{' '}
            <a href="https://saufex.eu" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 font-medium">
              SAUFEX
            </a>
            {' '}&mdash; a Horizon Europe-funded consortium of six European organizations building a unified
            democratic framework for detecting, analyzing, and countering information manipulation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <IconShield className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark">GetResilience</h3>
              </div>
              <p className="text-sm text-dark-400 mb-3">
                The action platform. Establish Resilience Councils, document violations,
                and file coordinated complaints to EU regulators under the Digital Services Act.
              </p>
              <span className="text-xs font-medium text-brand-400">You are here</span>
            </div>

            <div className="bg-white rounded-xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <IconDocument className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark">EMOD e-Learning</h3>
              </div>
              <p className="text-sm text-dark-400 mb-3">
                The knowledge platform. 64 free modules across 10 learning paths teaching
                how to detect disinformation, verify information, and understand platform manipulation.
                Designed for policymakers, journalists, researchers, and citizens.
              </p>
              <a
                href="https://emod.saufex.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Visit EMOD &rarr;
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '6', label: 'Consortium Partners' },
              { value: '5', label: 'EU Countries' },
              { value: '170+', label: 'Research Articles' },
              { value: '50+', label: 'Training Modules' },
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
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            The Digital Services Act gives you the right to act. GetResilience gives you the tools
            to make that action count. Join citizens across Europe who are building democratic
            resilience against information manipulation.
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
