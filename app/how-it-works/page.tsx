import Link from 'next/link'
import { IconUsers, IconCamera, IconSend, IconDocument, IconLink, IconTag, IconUpload, IconCheck, IconScale, IconGlobe, IconArrowDown, IconChart, IconShield } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-dark mb-3">How It Works</h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            From screenshot to legal action in three clicks. Here&apos;s the full process.
          </p>
        </div>
      </ScrollReveal>

      {/* Context: Why This Process */}
      <ScrollReveal>
        <div className="bg-[#f5f5f7] rounded-2xl p-8 mb-20">
          <h2 className="text-lg font-bold text-dark mb-3">Why Coordination Is the Key</h2>
          <p className="text-sm text-dark-400 leading-relaxed">
            Platforms process millions of individual reports daily and most get dismissed.
            The DSA&apos;s real power lies in cross-border mechanisms: when identical complaints reach multiple
            Digital Services Coordinators simultaneously, regulators must coordinate their response (Art. 51 &amp; 56).
          </p>
        </div>
      </ScrollReveal>

      {/* ======== STEP 1 ======== */}
      <ScrollReveal>
        <div className="mb-20">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-16 h-16 bg-brand-400 rounded-2xl flex items-center justify-center flex-shrink-0">
              <IconUsers className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step 1</div>
              <h2 className="text-2xl font-bold text-dark">Start or Join a Council</h2>
            </div>
          </div>

          <div className="ml-0 md:ml-[84px]">
            <p className="text-dark-400 mb-6">
              Councils bring together citizens around a common concern &mdash; election interference,
              climate disinformation, health misinformation, or foreign information operations.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-black/[0.08] p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <span className="text-lg font-bold text-brand-400">+</span>
                  </div>
                  <h3 className="font-semibold text-dark">Create a Council</h3>
                </div>
                <p className="text-xs text-dark-400 mb-4">
                  Any EU citizen can create a council. Choose your country and focus area, and you become the admin.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: IconGlobe, text: 'Pick your EU member state' },
                    { icon: IconTag, text: 'Choose a focus area' },
                    { icon: IconCheck, text: 'Become admin and invite members' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-brand-400 flex-shrink-0" />
                      <span className="text-sm text-dark-400">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-black/[0.08] p-6 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <IconUsers className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-dark">Join an Existing Council</h3>
                </div>
                <p className="text-xs text-dark-400 mb-4">
                  Browse by country or topic. The more members, the more weight your coordinated reports carry.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: IconGlobe, text: 'Browse by country or search by topic' },
                    { icon: IconTag, text: 'See focus, members, and report count' },
                    { icon: IconCheck, text: 'One click to join and start contributing' },
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
            <div className="bg-[#f5f5f7] rounded-xl p-5">
              <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-3">Active Councils</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { country: 'Poland', focus: 'Election integrity', members: 38, partner: 'PORT Lukasiewicz' },
                  { country: 'Netherlands', focus: 'Climate disinfo', members: 45, partner: 'DROG' },
                  { country: 'Finland', focus: 'Media literacy', members: 24, partner: 'Faktabaari' },
                  { country: 'Lithuania', focus: 'Foreign interference', members: 31, partner: 'Debunk.org' },
                ].map((c, i) => (
                  <ScrollReveal key={c.country} delay={i * 80}>
                    <div className="bg-white rounded-lg p-3 border border-black/[0.06] transition-transform duration-200 hover:-translate-y-1">
                      <p className="font-semibold text-dark text-sm">{c.country}</p>
                      <p className="text-xs text-dark-400">{c.focus}</p>
                      <p className="text-[10px] text-dark-400 mt-1">Led by {c.partner}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <IconUsers className="w-3 h-3 text-brand-400" />
                        <span className="text-xs text-brand-400 font-medium">{c.members} members</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Arrow connector */}
      <div className="flex justify-center mb-20">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-brand-200" />
          <IconArrowDown className="w-5 h-5 text-brand-300" />
        </div>
      </div>

      {/* ======== STEP 2 ======== */}
      <ScrollReveal>
        <div className="mb-20">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-16 h-16 bg-dark rounded-2xl flex items-center justify-center flex-shrink-0">
              <IconCamera className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step 2</div>
              <h2 className="text-2xl font-bold text-dark">Document the Violation</h2>
            </div>
          </div>

          <div className="ml-0 md:ml-[84px]">
            <p className="text-dark-400 mb-6">
              GetResilience guides you through structured evidence that maps directly to DSA legal requirements.
              A structured complaint triggers investigation; a vague one gets ignored.
            </p>

            {/* Visual reporting pipeline */}
            <div className="bg-[#f5f5f7] rounded-xl p-6 mb-5">
              <div className="grid sm:grid-cols-5 gap-4">
                {[
                  { icon: IconTag, label: 'Platform', detail: 'Which platform hosts the content' },
                  { icon: IconLink, label: 'URL', detail: 'Direct link for verification' },
                  { icon: IconScale, label: 'Violation', detail: 'Categorize the violation type' },
                  { icon: IconUpload, label: 'Evidence', detail: 'Screenshots and files' },
                  { icon: IconDocument, label: 'DSA Map', detail: 'Auto-maps to DSA articles' },
                ].map(({ icon: Icon, label, detail }, i) => (
                  <ScrollReveal key={label} delay={i * 80}>
                    <div className="relative">
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
                      {i < 4 && (
                        <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-brand-300">
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Why DSA mapping matters */}
            <ScrollReveal>
              <div className="bg-white rounded-xl border border-black/[0.08] p-5 mb-5">
                <h3 className="font-semibold text-dark text-sm mb-2">Why DSA Article Mapping Matters</h3>
                <p className="text-xs text-dark-400 mb-4">
                  By automatically mapping your report to the correct articles, GetResilience ensures your complaint
                  uses the legal language that triggers formal investigation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Art. 16 \u2014 Report illegal content',
                    'Art. 22 \u2014 Trusted flaggers',
                    'Art. 24 \u2014 Transparency obligations',
                    'Art. 25 \u2014 Dark patterns prohibition',
                    'Art. 26 \u2014 Advertising transparency',
                    'Art. 34 \u2014 Systemic risk assessment',
                    'Art. 51 \u2014 Cross-border coordination',
                  ].map((art) => (
                    <span key={art} className="inline-flex items-center gap-1.5 bg-[#f5f5f7] rounded-full px-3 py-1.5 text-xs font-medium text-dark">
                      <IconScale className="w-3 h-3 text-brand-400" />
                      {art}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Evidence permanence */}
            <ScrollReveal>
              <div className="bg-[#f5f5f7] rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <IconShield className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-dark text-sm mb-1">Permanent Evidence Archive</h3>
                    <p className="text-xs text-dark-400 leading-relaxed">
                      Disinformation content often gets deleted once flagged. GetResilience creates a permanent record
                      with screenshots, URLs, and metadata &mdash; essential for enforcement proceedings.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Arrow connector */}
      <div className="flex justify-center mb-20">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-brand-200" />
          <IconArrowDown className="w-5 h-5 text-brand-300" />
        </div>
      </div>

      {/* ======== STEP 3 ======== */}
      <ScrollReveal>
        <div className="mb-20">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-16 h-16 bg-brand-400 rounded-2xl flex items-center justify-center flex-shrink-0">
              <IconSend className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step 3</div>
              <h2 className="text-2xl font-bold text-dark">Coordinated EU Filing</h2>
            </div>
          </div>

          <div className="ml-0 md:ml-[84px]">
            <p className="text-dark-400 mb-6">
              Your council submits identical evidence to all 27 EU Digital Services Coordinators simultaneously,
              triggering the DSA&apos;s cross-border cooperation mechanisms.
            </p>

            {/* Visual: filing to 27 states */}
            <div className="bg-dark rounded-2xl p-8 text-white mb-5">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center flex-shrink-0">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <IconUsers className="w-8 h-8 text-brand-300" />
                  </div>
                  <p className="text-sm font-medium text-white/80">Your Council</p>
                </div>

                <div className="hidden md:flex items-center flex-shrink-0">
                  <div className="w-16 h-0.5 bg-brand-400/50" />
                  <svg className="w-3 h-3 text-brand-400 -ml-0.5" viewBox="0 0 12 12" fill="currentColor"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
                </div>
                <div className="md:hidden">
                  <IconArrowDown className="w-5 h-5 text-brand-400/50" />
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-9 gap-1.5 mb-3">
                    {Array.from({ length: 27 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded bg-brand-400/70 flex items-center justify-center"
                        style={{
                          animation: `stagger-in 400ms ease-out ${i * 40}ms both`,
                        }}
                      >
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
            <h3 className="font-semibold text-dark mb-4">What Happens After Filing</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              {[
                { icon: IconChart, title: 'Systemic pattern established', desc: 'Multiple identical reports from different countries reveal a cross-border violation that Art. 34 requires platforms to assess.' },
                { icon: IconSend, title: 'Simultaneous investigation', desc: 'All 27 Digital Services Coordinators receive the same evidence. Under Art. 51, they must coordinate their response.' },
                { icon: IconScale, title: 'Mandatory platform action', desc: 'Platforms must conduct risk assessments and implement mitigation. Non-compliance can result in fines up to 6% of global turnover.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 100}>
                  <div className="bg-white rounded-xl border border-black/[0.08] p-5 transition-transform duration-200 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 rounded-xl mb-3">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <h4 className="font-semibold text-dark text-sm mb-2">{title}</h4>
                    <p className="text-xs text-dark-400 leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Trusted Flagger path */}
            <ScrollReveal>
              <div className="bg-[#f5f5f7] rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <IconCheck className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-dark text-sm mb-1">The Path to Trusted Flagger Status</h3>
                    <p className="text-xs text-dark-400 leading-relaxed">
                      Under DSA Article 22, organizations with demonstrated expertise can achieve Trusted Flagger status
                      for priority treatment. As councils build a track record of accurate reports, they can apply through
                      their national Digital Services Coordinator.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Learn More */}
      <ScrollReveal>
        <div className="bg-white rounded-2xl border border-black/[0.08] p-8 mb-20">
          <h2 className="text-xl font-bold text-dark mb-3">Want to Learn More About Disinformation?</h2>
          <p className="text-dark-400 text-sm mb-4">
            SAUFEX&apos;s sister platform <strong>EMOD</strong> offers 64 free e-learning modules on disinformation
            detection, verification, counter-messaging, and platform governance.
          </p>
          <a
            href="https://emod.saufex.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 font-semibold text-sm transition-colors"
          >
            Explore EMOD&apos;s free courses &rarr;
          </a>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="bg-dark text-white rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Start?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
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
      </ScrollReveal>
    </div>
  )
}
