import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-dark mb-6">About GetResilience</h1>

      <section className="prose prose-lg max-w-none">
        <div className="bg-[#f5f5f7] rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-brand-400 mt-0 mb-4">
            What is GetResilience?
          </h2>
          <p className="text-dark-400 mb-4">
            GetResilience is a decentralized platform enabling any EU citizen to establish
            a Resilience Council and bridge the gap between citizens and DSA implementation.
            It transforms individual frustration into coordinated legal action by connecting
            people who witness platform violations with the regulatory tools to hold
            platforms accountable.
          </p>
          <p className="text-dark-400">
            Councils amplify your reports across all EU regulators. Individual reports can
            be dismissed, but when councils submit matching structured evidence to Digital
            Services Coordinators across all 27 member states simultaneously, regulators
            must investigate. Under DSA Articles 51 and 56, when multiple national
            authorities receive credible reports of the same violation, they are legally
            obligated to coordinate investigations.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-dark mb-4">How Councils Work</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: 'Citizen-Led Networks',
              description:
                'Any citizen can start a council. No permission needed, no bureaucratic barriers. Pick your country, define your focus area, and begin organizing collective evidence.',
            },
            {
              title: 'DSA-Aligned Structure',
              description:
                'Councils organize by country matching Digital Services Coordinator jurisdictions. Reports map directly to specific DSA articles for maximum legal precision.',
            },
            {
              title: 'Automated Coordination',
              description:
                'When your council submits evidence, it reaches all relevant Digital Services Coordinators simultaneously. No manual filing across 27 member states.',
            },
            {
              title: 'Evidence Standards',
              description:
                'RADAR.CheckFirst structured data ensures every report meets DSA compliance requirements. This creates a persistent public record for enforcement actions and compensation claims.',
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h3 className="font-semibold text-dark mb-2">{item.title}</h3>
              <p className="text-sm text-dark-400">{item.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-dark mb-4">The SAUFEX Project</h2>
        <p className="text-dark-400 mb-4">
          GetResilience is developed as part of the{' '}
          <a
            href="https://saufex.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            SAUFEX
          </a>{' '}
          (Secure Automated Unified Framework for Exchange) project &mdash; a unified
          democratic framework for detecting, analyzing, and countering information
          manipulation across EU member states. SAUFEX is funded by the European
          Union&apos;s Horizon Europe research and innovation programme under grant
          agreement No. 101132494.
        </p>
        <p className="text-dark-400 mb-4">
          The consortium brings together 6 partners across 5 countries:
        </p>
        <ul className="space-y-2 mb-6">
          {[
            'PORT Lukasiewicz (Poland) \u2014 Research network and technology partner',
            'DROG (Netherlands) \u2014 Combats disinformation through innovative educational tools and strategies to build resilience against fake news',
            'Faktabaari (Finland) \u2014 Fact-checking and media literacy organization',
            'Debunk.org (Lithuania) \u2014 Disinformation monitoring and analysis',
            'ISP PAN \u2014 Institute of Political Studies, Polish Academy of Sciences (Poland)',
            'University of Warsaw (Poland) \u2014 Academic research partner',
          ].map((partner) => (
            <li key={partner} className="flex items-start gap-3">
              <span className="text-brand-400 mt-0.5">&#10003;</span>
              <span className="text-dark-400">{partner}</span>
            </li>
          ))}
        </ul>
        <p className="text-dark-400 mb-4">
          GetResilience is a{' '}
          <a
            href="https://dfrlab.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            DROG
          </a>{' '}
          initiative within the SAUFEX consortium. DROG also develops{' '}
          <a
            href="https://emod.saufex.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            EMOD
          </a>{' '}
          (European Master of Countering Disinformation) &mdash; a sister platform offering
          64 free e-learning modules across 10 learning paths for policymakers, journalists,
          researchers, and citizens using the DROG Intervention Menu framework.
        </p>
        <p className="text-dark-400 mb-4">
          Poland&apos;s Resilience Council is the first pilot &mdash; the first EU nation to
          implement a SAUFEX Resilience Council. The Resilience Council Handbook provides
          best practices for establishing and running councils effectively.
        </p>

        <div className="bg-[#f5f5f7] rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-dark mb-2">EU Horizon Europe Funding</h3>
          <p className="text-sm text-dark-400">
            This project has received funding from the European Union&apos;s Horizon Europe
            research and innovation programme under grant agreement No. 101132494. The
            content of this platform represents the views of the authors only and does not
            necessarily reflect the views of the European Union. Neither the European Union
            nor the granting authority can be held responsible for them.
          </p>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/councils" className="btn-primary">
          Browse Existing Councils
        </Link>
      </div>
    </div>
  )
}
