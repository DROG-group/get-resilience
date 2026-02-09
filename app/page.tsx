import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#fafafa] py-20 lg:py-28 overflow-hidden">
        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,127,245,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,160,0,0.04),_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-dark">
            From Screenshot to Legal Action
            <span className="block text-brand-400 mt-2">In Three Clicks</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-dark-400 max-w-3xl mx-auto">
            You have the law. We handle the bureaucracy. Join a Resilience Council
            and amplify your reports across all 27 EU regulators.
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
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step Overview */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-4">
            Three Steps to Platform Accountability
          </h2>
          <p className="text-center text-dark-400 mb-12 max-w-2xl mx-auto">
            Citizen networks documenting platform violations across Europe. The key is coordination and automation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Start or Join a Council',
                description:
                  'Form a network of citizens in your country or focus area. Councils coordinate collective evidence against platform violations.',
                icon: '&#x1F3DB;',
              },
              {
                step: '2',
                title: 'Document Violations',
                description:
                  'Use RADAR-compliant structured reporting to document platform violations. Every report is mapped to specific DSA articles for legal precision.',
                icon: '&#x1F4F8;',
              },
              {
                step: '3',
                title: 'Coordinated EU Filing',
                description:
                  'Your council submits identical evidence to Digital Services Coordinators across all 27 member states simultaneously. Under DSA Articles 51 and 56, regulators must coordinate investigations.',
                icon: '&#x2696;',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl border border-black/[0.08] p-8 text-center hover:border-brand-400 hover:shadow-[0_20px_40px_rgba(107,76,230,0.1)] hover:-translate-y-1 transition-all duration-200">
                <div
                  className="text-4xl mb-4"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <div className="inline-flex items-center justify-center w-8 h-8 bg-brand-400 text-white text-sm font-bold rounded-full mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">{item.title}</h3>
                <p className="text-dark-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DSA Explainer */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">
                The Digital Services Act: Your Legal Leverage
              </h2>
              <p className="text-dark-400 mb-4">
                The EU Digital Services Act (DSA) is the most comprehensive platform regulation
                in the world. It requires Very Large Online Platforms to be transparent about
                content moderation and take responsibility for systemic risks. These are the
                specific articles that give citizens real power:
              </p>
              <ul className="space-y-3">
                {[
                  'Report illegal content (Art. 16)',
                  'Trusted flagger priority processing (Art. 22)',
                  'Content moderation transparency (Art. 24)',
                  'Ban on dark patterns and deceptive design (Art. 25)',
                  'Advertising transparency requirements (Art. 26-27)',
                  'Systemic risk assessment obligations (Art. 34-35)',
                  'Cross-border coordination between authorities (Art. 51 & 56)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-400 mt-0.5">&#10003;</span>
                    <span className="text-dark-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#f5f5f7] rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-brand-400 mb-4">
                Why Coordination Matters
              </h3>
              <p className="text-dark-400 mb-4">
                Individual reports can be dismissed. But when councils submit matching
                structured evidence to Digital Services Coordinators across multiple member
                states simultaneously, regulators are legally obligated to investigate and
                coordinate under DSA Articles 51 and 56.
              </p>
              <p className="text-dark-400 mb-4">
                Poland&apos;s Resilience Council &mdash; the first in the EU &mdash; has proven
                this model works. When multiple national authorities receive credible reports
                of the same violation, they must coordinate investigations. Your evidence
                creates public records that strengthen future enforcement actions, compensation
                claims, and regulatory pressure campaigns.
              </p>
              <Link href="/about" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">
                Learn more about Resilience Councils &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-12">
            Built for Effective Reporting
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'DSA-Compliant Reporting', desc: 'RADAR.CheckFirst structured data ensuring compliance with DSA documentation requirements', icon: '&#x1F4DC;' },
              { title: 'Evidence Archive', desc: 'Creates a persistent public record that strengthens future enforcement actions and compensation claims', icon: '&#x1F4CE;' },
              { title: 'Cross-Border Coordination', desc: 'Automated filing across all 27 EU member states for maximum regulatory pressure', icon: '&#x1F1EA;&#x1F1FA;' },
              { title: 'Resilience Council Network', desc: 'Join the European network alongside Poland\u2019s pioneering council, the first in the EU', icon: '&#x1F91D;' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl border border-black/[0.08] p-6 hover:border-brand-400 hover:shadow-[0_20px_40px_rgba(107,76,230,0.1)] hover:-translate-y-1 transition-all duration-200">
                <div
                  className="text-3xl mb-3"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
                <h3 className="font-semibold text-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-dark-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '6', label: 'Partner Organizations' },
              { value: '5', label: 'Countries Active' },
              { value: '170+', label: 'Research Articles' },
              { value: '27', label: 'EU Member States' },
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
            Join thousands of EU citizens using the Digital Services Act to fight
            information manipulation and protect democratic discourse.
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
