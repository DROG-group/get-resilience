import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-dark mb-8">Privacy &amp; Data Management</h1>

      <div className="prose prose-neutral max-w-none space-y-6 text-dark-400">
        <section>
          <h2 className="text-xl font-semibold text-dark">About this platform</h2>
          <p>
            GetResilience is developed as part of the SAUFEX research project, funded by
            the European Union&apos;s Horizon Europe research and innovation programme under
            grant agreement No. 101132494. The platform enables EU citizens to form
            Resilience Councils and submit reports on Digital Services Act (DSA) violations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark">Data we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account data:</strong> Name, email address, country, and organization (optional).</li>
            <li><strong>Reports:</strong> Violation reports you submit, including descriptions, platform URLs, and any uploaded evidence files.</li>
            <li><strong>Council membership:</strong> Which councils you create or join, and your role within them.</li>
            <li><strong>Training certificates:</strong> Completion status of the DSA training course on the EMOD platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark">How we use your data</h2>
          <p>
            Your data is used solely to operate the GetResilience platform and for the
            SAUFEX research project. We do not sell or share your personal data with
            third parties outside the SAUFEX consortium. Aggregated, anonymised data
            may be used in research publications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark">Data storage &amp; security</h2>
          <p>
            Data is stored securely using industry-standard encryption. Our infrastructure
            is hosted within the EU. Access to personal data is restricted to authorised
            project personnel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark">Your rights under GDPR</h2>
          <p>As an EU resident, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Export your data in a portable format</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark">Contact</h2>
          <p>
            For any privacy-related questions or to exercise your rights, contact us
            at{' '}
            <a href="mailto:info@saufex.eu" className="text-brand-400 hover:underline">
              info@saufex.eu
            </a>.
          </p>
        </section>

        <div className="pt-4 border-t border-dark/10">
          <p className="text-sm text-dark-400/70">
            Last updated: February 2026
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-brand-400 hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </div>
  )
}
