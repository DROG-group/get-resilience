import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-400 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            From Screenshot to Legal Action
            <span className="block text-gold-500 mt-2">In Three Clicks</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Join Resilience Councils to coordinate reports of platform violations
            to EU regulators under the Digital Services Act.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-gold-500 text-brand-400 font-bold px-8 py-3.5 rounded-lg text-lg hover:bg-gold-400 transition-colors"
            >
              Join a Council
            </Link>
            <Link
              href="/how-it-works"
              className="bg-white/10 hover:bg-white/20 font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors border border-white/30"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Three Steps to Platform Accountability
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The Digital Services Act gives EU citizens real power. Here&apos;s how to use it.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create or Join a Council',
                description:
                  'Form a Resilience Council with citizens from your country or focus area. Councils coordinate collective action for maximum impact.',
                icon: '&#x1F3DB;',
              },
              {
                step: '2',
                title: 'Document & Report',
                description:
                  'Screenshot violations, categorize them by type, and submit structured reports. We map each violation to specific DSA articles.',
                icon: '&#x1F4F8;',
              },
              {
                step: '3',
                title: 'Coordinated EU Action',
                description:
                  'Councils aggregate reports and forward them to national Digital Services Coordinators and EU regulators for enforcement.',
                icon: '&#x2696;',
              },
            ].map((item) => (
              <div key={item.step} className="card p-8 text-center">
                <div
                  className="text-4xl mb-4"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <div className="inline-flex items-center justify-center w-8 h-8 bg-brand-400 text-white text-sm font-bold rounded-full mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DSA Explainer */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Digital Services Act: Your Rights
              </h2>
              <p className="text-gray-600 mb-4">
                The EU Digital Services Act (DSA) is the most comprehensive platform regulation
                in the world. It requires Very Large Online Platforms to be transparent about
                content moderation and take responsibility for systemic risks.
              </p>
              <ul className="space-y-3">
                {[
                  'Right to report illegal content (Art. 16)',
                  'Transparency in content moderation (Art. 24)',
                  'Ban on dark patterns (Art. 25)',
                  'Advertising transparency (Art. 26-27)',
                  'Risk assessment obligations (Art. 34-35)',
                  'Trusted flaggers status (Art. 22)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-400 mt-0.5">&#10003;</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-brand-400 mb-4">
                Why Collective Action?
              </h3>
              <p className="text-gray-700 mb-4">
                Individual reports are easily dismissed. But when a Resilience Council
                submits coordinated evidence of systematic violations, regulators must act.
              </p>
              <p className="text-gray-700 mb-4">
                The DSA gives organizations &ldquo;trusted flagger&rdquo; status &mdash; their reports
                get priority processing. Resilience Councils aim to earn this status
                through consistent, high-quality reporting.
              </p>
              <Link href="/about" className="text-brand-400 font-semibold hover:underline">
                Learn more about Resilience Councils &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Built for Effective Reporting
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'DSA Mapping', desc: 'Every report is linked to specific DSA articles for legal precision', icon: '&#x1F4DC;' },
              { title: 'Evidence Upload', desc: 'Attach screenshots and documents as evidence for your reports', icon: '&#x1F4CE;' },
              { title: 'Council Coordination', desc: 'Work together to identify patterns and systemic violations', icon: '&#x1F91D;' },
              { title: 'Multi-Country', desc: 'Councils span all 27 EU member states for cross-border cases', icon: '&#x1F1EA;&#x1F1FA;' },
            ].map((feature) => (
              <div key={feature.title} className="card p-6">
                <div
                  className="text-3xl mb-3"
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                />
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-400 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Hold Platforms Accountable?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of EU citizens using the Digital Services Act to fight
            disinformation and protect democratic discourse.
          </p>
          <Link
            href="/register"
            className="bg-gold-500 text-brand-400 font-bold px-10 py-4 rounded-lg text-lg hover:bg-gold-400 transition-colors inline-block"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
