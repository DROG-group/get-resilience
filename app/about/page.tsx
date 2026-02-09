import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-dark mb-6">About Get Resilience</h1>

      <section className="prose prose-lg max-w-none">
        <div className="bg-[#f5f5f7] rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-brand-400 mt-0 mb-4">
            What Are Resilience Councils?
          </h2>
          <p className="text-dark-400 mb-4">
            Resilience Councils are citizen-led groups that coordinate the reporting of
            platform violations to EU regulators under the Digital Services Act (DSA).
            They transform individual frustration into collective legal action.
          </p>
          <p className="text-dark-400">
            Each Council focuses on a specific country, topic, or platform. Members
            document violations, build evidence portfolios, and submit coordinated
            reports to national Digital Services Coordinators &mdash; the authorities
            responsible for enforcing the DSA in each EU member state.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-dark mb-4">How Councils Work</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: 'Democratic Structure',
              description:
                'Each Council has admins, moderators, and members. Admins manage the council, moderators review reports, and every member can contribute.',
            },
            {
              title: 'Country-Based',
              description:
                'Councils are organized by EU member state, matching the jurisdiction of national Digital Services Coordinators who process complaints.',
            },
            {
              title: 'Focus Areas',
              description:
                'Councils can specialize in areas like climate disinformation, election integrity, health misinformation, or general platform accountability.',
            },
            {
              title: 'Evidence Standards',
              description:
                'Reports follow a structured format with screenshots, URLs, violation categories, and DSA article references for legal precision.',
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
          Get Resilience is developed as part of the{' '}
          <a
            href="https://saufex.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            SAUFEX
          </a>{' '}
          (Safeguarding the EU From Disinformation and Extremism) project,
          funded by the European Union&apos;s Horizon Europe research and innovation programme.
        </p>
        <p className="text-dark-400 mb-4">
          SAUFEX brings together researchers, civil society organizations, and technologists
          from across Europe to develop tools and methodologies for countering disinformation
          and building societal resilience.
        </p>

        <div className="bg-[#f5f5f7] rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-dark mb-2">EU Horizon Europe Funding</h3>
          <p className="text-sm text-dark-400">
            This project has received funding from the European Union&apos;s Horizon Europe
            research and innovation programme. The content of this platform represents
            the views of the authors only and does not necessarily reflect the views of
            the European Union. Neither the European Union nor the granting authority can
            be held responsible for them.
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
