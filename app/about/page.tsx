import Link from 'next/link'
import { IconUsers, IconShield, IconGlobe, IconScale, IconDocument, IconCheck, IconChart } from '@/components/Icons'
import ScrollReveal from '@/components/ScrollReveal'
import FlipCard from '@/components/FlipCard'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-dark mb-3">About GetResilience</h1>
          <p className="text-xl text-dark-400 max-w-3xl mx-auto">
            A decentralized platform enabling EU citizens to establish Resilience Councils and
            bridge gaps in Digital Services Act implementation through coordinated action.
          </p>
        </div>
      </ScrollReveal>

      {/* Why GetResilience Exists - 3 visual cards */}
      <div className="mb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-dark mb-8">Why This Platform Exists</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <IconShield className="w-6 h-6 text-red-500" />,
              iconBg: 'bg-red-100',
              title: 'The Threat',
              summary: 'Foreign information manipulation undermines EU democracy.',
              backText: 'False stories spread 6x faster than true ones because platforms profit from engagement. 83% of Europeans see disinformation as a threat to democracy.',
              backBg: 'bg-red-500',
            },
            {
              icon: <IconDocument className="w-6 h-6 text-brand-400" />,
              iconBg: 'bg-brand-50',
              title: 'The Law',
              summary: 'The DSA gives citizens real legal tools to act.',
              backText: 'Articles 16, 17, 20, and 22 create enforceable rights. But less than 1% of individual reports result in meaningful action without coordination.',
              backBg: 'bg-brand-400',
            },
            {
              icon: <IconUsers className="w-6 h-6 text-green-600" />,
              iconBg: 'bg-green-100',
              title: 'The Solution',
              summary: 'Coordinated cross-border reports trigger mandatory investigation.',
              backText: 'Under Art. 51 & 56, when multiple member states are affected, regulators must coordinate their response. GetResilience makes that coordination automatic.',
              backBg: 'bg-green-600',
            },
          ].map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 100}>
              <FlipCard
                height="200px"
                front={
                  <div className="bg-[#f5f5f7] rounded-2xl p-6 h-full">
                    <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}>
                      {card.icon}
                    </div>
                    <h3 className="font-bold text-dark mb-2">{card.title}</h3>
                    <p className="text-sm text-dark-400">{card.summary}</p>
                  </div>
                }
                back={
                  <div className={`${card.backBg} rounded-2xl p-6 h-full flex items-center`}>
                    <p className="text-sm text-white leading-relaxed">{card.backText}</p>
                  </div>
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* What are Resilience Councils */}
      <div className="mb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-dark mb-4">What Are Resilience Councils?</h2>
          <p className="text-dark-400 mb-8">
            Citizen-led governance bodies that coordinate disinformation reports using a &ldquo;whole-of-society&rdquo; approach,
            bringing together citizens, civil society, media, researchers, and policymakers.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ScrollReveal delay={0}>
            <div className="bg-white rounded-xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <IconUsers className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark">How They Work</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Any EU citizen can create a council for their country and focus area</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Members document platform violations with evidence and context</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Reports are automatically mapped to relevant DSA articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Coordinated submissions go to all 27 Digital Services Coordinators at once</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-white rounded-xl border border-black/[0.08] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <IconScale className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-dark">Why They Matter</h3>
              </div>
              <ul className="space-y-2 text-sm text-dark-400">
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>They deepen democracy by giving citizens a direct voice in platform governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Coordinated reports establish systemic patterns regulators can&apos;t ignore</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>They build community trust and shared expertise in counter-disinformation</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>Councils can evolve toward DSA Trusted Flagger status for priority enforcement</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="bg-brand-400 text-white rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-3">
              <IconShield className="w-6 h-6 text-white" />
              <h3 className="font-bold text-lg">First Council: Poland</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              In 2024, Poland became the first EU nation to implement a SAUFEX Resilience Council, led by
              PORT Lukasiewicz. The council integrates government officials, civil society, academic experts,
              and citizens for election disinformation prevention. This pioneering model now inspires similar councils across the EU.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* The SAUFEX Project */}
      <div className="mb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-dark mb-4 text-center">The SAUFEX Project</h2>
          <p className="text-center text-dark-400 mb-8 max-w-3xl mx-auto">
            GetResilience is part of{' '}
            <a href="https://saufex.eu" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 font-medium">
              SAUFEX
            </a>
            {' '}(Secure Automated Unified Framework for Exchange), a Horizon Europe-funded consortium
            developing a unified democratic framework for detecting, analyzing, and countering foreign
            information manipulation across EU member states.
          </p>
        </ScrollReveal>

        {/* Partners grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'DROG', country: 'Netherlands', role: 'GetResilience creator. Pioneered the "Bad News" game for inoculation against disinformation.', highlight: true },
            { name: 'PORT Lukasiewicz', country: 'Poland (Lead)', role: 'Coordinates the consortium and leads research & technology development.', highlight: false },
            { name: 'Faktabaari', country: 'Finland', role: 'Finland\'s leading fact-checking organization. Media literacy expertise.', highlight: false },
            { name: 'Debunk.org', country: 'Lithuania', role: 'Real-time disinformation monitoring. Baltic states specialist.', highlight: false },
            { name: 'ISP PAN', country: 'Poland', role: 'Institute of Political Studies. Information warfare research.', highlight: false },
            { name: 'University of Warsaw', country: 'Poland', role: 'Social science methodology and evidence-based intervention design.', highlight: false },
          ].map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 100}>
              <FlipCard
                height="140px"
                front={
                  <div
                    className={`rounded-2xl p-5 h-full ${
                      p.highlight
                        ? 'bg-brand-400 text-white'
                        : 'bg-white border border-black/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        p.highlight ? 'bg-white/20' : 'bg-brand-50'
                      }`}>
                        <IconUsers className={`w-4 h-4 ${p.highlight ? 'text-white' : 'text-brand-400'}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${p.highlight ? 'text-white' : 'text-dark'}`}>{p.name}</h3>
                        <p className={`text-xs ${p.highlight ? 'text-white/70' : 'text-dark-400'}`}>{p.country}</p>
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div
                    className={`rounded-2xl p-5 h-full flex items-center ${
                      p.highlight
                        ? 'bg-brand-500 text-white'
                        : 'bg-dark text-white'
                    }`}
                  >
                    <p className="text-xs leading-relaxed text-white/90">{p.role}</p>
                  </div>
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* EMOD Sister Platform */}
      <ScrollReveal>
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-4 text-center">Learn Before You Act</h2>
          <p className="text-center text-dark-400 mb-8 max-w-2xl mx-auto">
            Effective reporting requires understanding how disinformation works. EMOD provides the knowledge foundation.
          </p>

          <div className="bg-white rounded-2xl border border-black/[0.08] p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center">
                  <IconDocument className="w-8 h-8 text-brand-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-dark text-lg mb-2">EMOD: European Master of Countering Disinformation</h3>
                <p className="text-dark-400 text-sm mb-4">
                  A free e-learning platform with 64 modules across 10 learning paths, totaling 19+ hours of
                  evidence-based content. Self-paced modules designed for 8-10 minute completion.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-dark mb-2">Learning Paths</p>
                    <ul className="space-y-1 text-xs text-dark-400">
                      <li>Understanding Disinformation Basics</li>
                      <li>Media Literacy Fundamentals</li>
                      <li>Detection and Verification</li>
                      <li>Counter-Messaging Strategies</li>
                      <li>Platform Governance</li>
                      <li>Disinfonomics</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark mb-2">Designed For</p>
                    <ul className="space-y-1 text-xs text-dark-400">
                      <li>Policymakers (33 modules)</li>
                      <li>Journalists (39 modules)</li>
                      <li>Researchers (46 modules)</li>
                      <li>Citizens (14 modules)</li>
                    </ul>
                  </div>
                </div>

                <a
                  href="https://emod.saufex.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 hover:text-brand-300 font-semibold text-sm transition-colors"
                >
                  Visit EMOD &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* The Digital Services Act */}
      <div className="mb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-dark mb-4 text-center">The Digital Services Act</h2>
          <p className="text-center text-dark-400 mb-8 max-w-3xl mx-auto">
            The DSA is the legal backbone of GetResilience. Key articles that make citizen-driven platform accountability possible.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { art: 'Article 16', title: 'Notice and Action', desc: 'Any user can notify platforms about illegal content. Platforms must process these notifications in a timely, diligent, and non-arbitrary manner.' },
            { art: 'Article 17', title: 'Statement of Reasons', desc: 'Platforms must clearly explain every content moderation decision to affected users, including the legal basis and remedies available.' },
            { art: 'Article 20', title: 'Complaint Handling', desc: 'Users can challenge platform decisions through internal complaint systems that must be easy to access, user-friendly, and handle complaints diligently.' },
            { art: 'Article 22', title: 'Trusted Flaggers', desc: 'Organizations with demonstrated expertise can achieve Trusted Flagger status. Their notices get priority treatment from platforms.' },
            { art: 'Article 34', title: 'Risk Assessment', desc: 'Very large platforms must assess systemic risks including disinformation. Cross-border coordinated reports help establish these systemic patterns.' },
            { art: 'Articles 51 & 56', title: 'Cross-Border Cooperation', desc: 'When multiple member states are affected, Digital Services Coordinators must coordinate their investigation and response.' },
          ].map((item, i) => (
            <ScrollReveal key={item.art} delay={i % 2 === 0 ? 0 : 100}>
              <FlipCard
                height="160px"
                front={
                  <div className="bg-[#f5f5f7] rounded-2xl p-5 h-full flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <IconScale className="w-4 h-4 text-brand-400" />
                      <span className="text-xs font-bold text-brand-400">{item.art}</span>
                    </div>
                    <h3 className="font-semibold text-dark text-sm">{item.title}</h3>
                  </div>
                }
                back={
                  <div className="bg-dark rounded-2xl p-5 h-full flex items-center">
                    <div>
                      <span className="text-xs font-bold text-brand-300 mb-1 block">{item.art}</span>
                      <p className="text-xs text-white/90 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* EU Funding */}
      <ScrollReveal>
        <div className="bg-[#f5f5f7] rounded-xl p-6 mb-12">
          <p className="text-xs text-dark-400 text-center leading-relaxed">
            This project has received funding from the European Union&apos;s Horizon Europe research
            and innovation programme under grant agreement No. 101132494. The content represents
            the views of the authors only and does not necessarily reflect the views of the European
            Union. Neither the European Union nor the granting authority can be held responsible for them.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="text-center">
          <Link href="/councils" className="btn-primary">
            Browse Councils
          </Link>
        </div>
      </ScrollReveal>
    </div>
  )
}
