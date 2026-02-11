import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is GetResilience?',
        a: 'GetResilience is a platform where EU citizens form Resilience Councils: citizen-led groups that coordinate reports about online platform violations (disinformation, hate speech, manipulation, etc.) to EU regulators under the Digital Services Act (DSA). By coordinating reports across multiple countries, councils trigger mandatory regulatory investigation that individual complaints cannot.',
      },
      {
        q: 'What is the Digital Services Act (DSA)?',
        a: 'The Digital Services Act is an EU regulation that took full effect in February 2024. It creates legally binding obligations for online platforms (social media, search engines, and marketplaces) to address illegal content, protect users\' rights, and be transparent about their content moderation. For the first time, it gives citizens real legal tools to hold platforms accountable.',
      },
      {
        q: 'What is a Digital Services Coordinator (DSC)?',
        a: 'Every EU member state has appointed a Digital Services Coordinator, a national regulatory authority responsible for enforcing the DSA in that country. For example, Ireland\'s DSC is Coimisiún na Meán, and the Netherlands\' is the Authority for Consumers & Markets (ACM). When GetResilience says reports are "forwarded to EU DSCs", it means your structured evidence is sent to these 27 national regulators at once.',
      },
      {
        q: 'Do I need to be an EU citizen to use GetResilience?',
        a: 'The platform is designed for EU citizens and residents, since the DSA applies to platforms operating in the EU. However, anyone can create an account and document violations. The DSA protects all users of platforms that serve EU audiences, regardless of the user\'s nationality.',
      },
      {
        q: 'Is GetResilience free?',
        a: 'Yes, completely. GetResilience is part of the SAUFEX project, funded by the EU\'s Horizon Europe programme (grant No. 101132494). There are no fees, subscriptions, or hidden costs.',
      },
    ],
  },
  {
    category: 'Training & Accounts',
    questions: [
      {
        q: 'Why do I need to complete training before submitting reports?',
        a: 'The DSA training on EMOD teaches you how to identify violations, gather proper evidence, and understand which DSA articles apply. This isn\'t a bureaucratic hurdle. It\'s what makes your reports effective. Structured reports that reference specific DSA articles and include proper evidence trigger formal investigation. Vague complaints get dismissed. The training takes about 30 minutes and is free.',
      },
      {
        q: 'What is EMOD?',
        a: 'EMOD (European Master of Disinformation) is SAUFEX\'s free e-learning platform with 64+ modules on disinformation detection, media literacy, and platform governance. The specific course required for GetResilience, "DSA Reporting for Resilience Councils", covers 12 modules across 5 chapters. You can explore additional learning paths after completing the required course.',
      },
      {
        q: 'Are my EMOD and GetResilience accounts linked?',
        a: 'Yes. Both platforms share the same authentication system. Use the same email address when signing up for both, and your training completion on EMOD is automatically recognized by GetResilience. If you reset your password on one platform, it changes on both.',
      },
    ],
  },
  {
    category: 'Resilience Councils',
    questions: [
      {
        q: 'What is a Resilience Council?',
        a: 'A Resilience Council is a citizen-led group organized around a country and focus area (e.g., "Election Integrity" in Poland, or "Climate Disinformation" in the Netherlands). Members document platform violations, and the council coordinates submissions to EU regulators. The goal is to establish systemic patterns that individual reports cannot, which is what triggers mandatory regulatory action under the DSA.',
      },
      {
        q: 'Who can create a council?',
        a: 'Any registered user who has completed the DSA training can create a council. You choose a country and focus area, and you become the council\'s admin. As admin, you can promote members to moderator, review submitted reports, and coordinate the council\'s activities.',
      },
      {
        q: 'What are the admin\'s responsibilities?',
        a: 'Council admins review incoming reports to make sure they meet evidence standards, promote trusted members to moderator roles, and coordinate when reports should be forwarded to regulators. Quality over quantity: a well-documented report with proper DSA article mapping is worth more than dozens of vague complaints.',
      },
      {
        q: 'What is a Trusted Flagger?',
        a: 'Under DSA Article 22, organizations with a proven track record in identifying illegal content can apply for "Trusted Flagger" status with their national Digital Services Coordinator. Platforms must process Trusted Flagger reports faster and with more care. As a council builds a track record of accurate, well-documented reports, it becomes eligible to apply.',
      },
      {
        q: 'Can a council be moderated or removed?',
        a: 'Council admins are responsible for maintaining quality standards. In cases of misuse, the SAUFEX project team can intervene. The platform is designed for good-faith reporting of genuine platform violations, not for harassment or censorship.',
      },
    ],
  },
  {
    category: 'Submitting Reports',
    questions: [
      {
        q: 'What happens after I submit a report?',
        a: 'Your report goes through several stages: (1) Submitted: your report is received and visible to your council. (2) Under Review: a council admin or moderator checks your evidence and DSA article mapping. (3) Forwarded to EU DSCs: your council sends the structured evidence to Digital Services Coordinators across EU member states. (4) Resolved: the regulatory process has concluded, or the platform has taken action. You can check your report\'s status on your dashboard at any time.',
      },
      {
        q: 'How long does the process take?',
        a: 'The timeline varies. Council review typically happens within days. Once forwarded to DSCs, the regulatory process depends on the severity and scope of the violation. For systemic issues affecting multiple countries, the DSA requires coordinators to respond, but formal investigations can take weeks to months. Even if individual cases take time, the cumulative evidence strengthens enforcement over time.',
      },
      {
        q: 'Will I be notified of outcomes?',
        a: 'You can track your report\'s status on your dashboard. As council admins update the status (Under Review, Forwarded, Resolved), you\'ll see the changes. Full regulatory transparency is still evolving as DSCs set up their processes, but your report remains permanently documented.',
      },
      {
        q: 'Can I submit a report without joining a council?',
        a: 'Yes. You can submit a personal report without assigning it to a council. However, coordinated council reports carry significantly more weight because they demonstrate systemic patterns across countries. We strongly recommend joining or creating a council for maximum impact.',
      },
      {
        q: 'What kind of evidence should I include?',
        a: 'The strongest reports include: (1) A direct URL to the violating content. (2) Screenshots, because content often gets deleted once flagged, so visual evidence is critical. (3) Context about why the content violates the DSA (the violation type selector helps with this). (4) Any additional files that support your case. The EMOD training covers evidence standards in detail.',
      },
    ],
  },
  {
    category: 'Privacy & Safety',
    questions: [
      {
        q: 'Is my identity protected?',
        a: 'Your personal information is stored securely and processed under GDPR. Reports forwarded to DSCs include the structured evidence and DSA article mapping, but your personal details are handled according to EU data protection standards. Council membership is visible to other council members, but not publicly.',
      },
      {
        q: 'Can I face legal consequences for submitting reports?',
        a: 'Good-faith reporting of genuine platform violations is protected under the DSA. The Act explicitly encourages citizens to report illegal content and platform violations. As long as your reports are honest and evidence-based, you are exercising your legal rights under EU law.',
      },
      {
        q: 'How is my data handled?',
        a: 'GetResilience processes data under GDPR for the SAUFEX research project (Horizon Europe grant No. 101132494). We collect only what\'s necessary: your account info, reports, and evidence. Data is stored on EU-based infrastructure. See our privacy policy for full details.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'What does "Forwarded to EU" status mean?',
        a: 'When a report is marked "Forwarded to EU", it means the council admin has approved the evidence and DSA article mapping, and the structured complaint has been prepared for submission to all 27 Digital Services Coordinators. This is the step where your individual report becomes part of a coordinated cross-border action under DSA Articles 51 and 56.',
      },
      {
        q: 'What is "systemic risk" under the DSA?',
        a: 'DSA Article 34 requires very large platforms (those with 45+ million EU users, like Facebook, YouTube, TikTok, and X) to identify and assess "systemic risks". This includes disinformation, election manipulation, and negative effects on fundamental rights. When coordinated reports from multiple countries document the same type of violation, they help establish that a systemic risk exists, which triggers mandatory risk assessment by the platform.',
      },
      {
        q: 'What are "very large online platforms" (VLOPs)?',
        a: 'Under the DSA, platforms with more than 45 million monthly active EU users are designated as Very Large Online Platforms (VLOPs). As of 2024, this includes: Alibaba AliExpress, Amazon Store, Apple App Store, Booking.com, Facebook, Google Play, Google Maps, Google Shopping, Instagram, LinkedIn, Pinterest, Snapchat, TikTok, Wikipedia, X (Twitter), YouTube, and Zalando. VLOPs have the strictest obligations under the DSA, including systemic risk assessments.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-dark mb-3">Frequently Asked Questions</h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Everything you need to know about GetResilience, the DSA, and how citizen-led councils hold platforms accountable.
          </p>
        </div>
      </ScrollReveal>

      {/* Quick nav */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {faqs.map((section) => (
            <a
              key={section.category}
              href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#f5f5f7] text-dark-400 hover:text-dark hover:bg-brand-50 transition-colors"
            >
              {section.category}
            </a>
          ))}
        </div>
      </ScrollReveal>

      {/* FAQ sections */}
      <div className="space-y-12">
        {faqs.map((section) => (
          <ScrollReveal key={section.category}>
            <div id={section.category.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-2xl font-bold text-dark mb-6">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((faq) => (
                  <details
                    key={faq.q}
                    className="group bg-white rounded-xl border border-black/[0.08] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer hover:bg-[#f5f5f7] transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-semibold text-dark text-sm sm:text-base">{faq.q}</h3>
                      <svg
                        className="w-5 h-5 text-dark-400 flex-shrink-0 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4">
                      <p className="text-sm text-dark-400 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Still have questions */}
      <ScrollReveal>
        <div className="mt-16 bg-[#f5f5f7] rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-dark mb-2">Still have questions?</h2>
          <p className="text-dark-400 mb-6">
            Learn more about the full process or get started right away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/how-it-works"
              className="bg-white text-dark font-semibold px-6 py-2.5 rounded-full border border-black/[0.08] hover:border-brand-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/register"
              className="bg-dark text-white font-semibold px-6 py-2.5 rounded-full hover:bg-brand-400 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
