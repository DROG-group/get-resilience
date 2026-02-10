import Link from 'next/link'
import { IconUsers, IconShield, IconGlobe, IconScale, IconDocument, IconCheck, IconChart } from '@/components/Icons'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-dark mb-3">About GetResilience</h1>
        <p className="text-xl text-dark-400 max-w-2xl mx-auto">
          Turning individual frustration into coordinated legal action across the EU.
        </p>
      </div>

      {/* What is it — visual summary */}
      <div className="bg-[#f5f5f7] rounded-2xl p-8 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: IconUsers, title: 'Citizen-Led', desc: 'Any EU citizen can start a Resilience Council. No permission needed.' },
            { icon: IconScale, title: 'Legally Binding', desc: 'Reports map to DSA articles. Regulators must investigate coordinated submissions.' },
            { icon: IconGlobe, title: '27 Countries', desc: 'Simultaneous filing to all EU Digital Services Coordinators.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl mb-4 shadow-sm">
                <Icon className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="font-bold text-dark mb-1">{title}</h3>
              <p className="text-sm text-dark-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How Councils Work — Visual */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-dark mb-8 text-center">How Councils Work</h2>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: IconUsers, title: 'Citizen-Led Networks', desc: 'Pick your country, define your focus, start organizing.' },
            { icon: IconScale, title: 'DSA-Aligned', desc: 'Organized by DSC jurisdiction. Reports map to DSA articles.' },
            { icon: IconShield, title: 'Evidence Standards', desc: 'RADAR.CheckFirst data ensures DSA compliance.' },
            { icon: IconGlobe, title: 'Auto-Coordination', desc: 'One submission reaches all 27 regulators.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-black/[0.08] p-5 text-center hover:border-brand-400 hover:shadow-[0_20px_40px_rgba(107,76,230,0.1)] hover:-translate-y-1 transition-all duration-200">
              <div className="inline-flex items-center justify-center w-11 h-11 bg-brand-50 rounded-xl mb-3">
                <Icon className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="font-semibold text-dark text-sm mb-1">{title}</h3>
              <p className="text-xs text-dark-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SAUFEX Project */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-dark mb-4 text-center">The SAUFEX Project</h2>
        <p className="text-center text-dark-400 mb-8 max-w-2xl mx-auto">
          GetResilience is part of{' '}
          <a href="https://saufex.eu" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 font-medium">
            SAUFEX
          </a>
          {' '}&mdash; a unified framework for detecting and countering information manipulation across the EU.
        </p>

        {/* Partners grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'DROG', country: 'Netherlands', role: 'GetResilience creator', highlight: true },
            { name: 'PORT Lukasiewicz', country: 'Poland', role: 'Research & technology' },
            { name: 'Faktabaari', country: 'Finland', role: 'Fact-checking & media literacy' },
            { name: 'Debunk.org', country: 'Lithuania', role: 'Disinfo monitoring' },
            { name: 'ISP PAN', country: 'Poland', role: 'Political studies research' },
            { name: 'University of Warsaw', country: 'Poland', role: 'Academic research' },
          ].map((p) => (
            <div
              key={p.name}
              className={`rounded-xl p-5 ${
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
              <p className={`text-xs ${p.highlight ? 'text-white/80' : 'text-dark-400'}`}>{p.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sister platform */}
      <div className="bg-white rounded-2xl border border-black/[0.08] p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center">
              <IconDocument className="w-8 h-8 text-brand-400" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-dark text-lg mb-1">EMOD &mdash; Sister Platform</h3>
            <p className="text-dark-400 text-sm mb-3">
              64 free e-learning modules across 10 learning paths for policymakers, journalists,
              researchers, and citizens.
            </p>
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

      {/* EU Funding */}
      <div className="bg-[#f5f5f7] rounded-xl p-6 mb-12 text-center">
        <p className="text-xs text-dark-400">
          Funded by the European Union&apos;s Horizon Europe programme &mdash; Grant No. 101132494.
          Views expressed are the authors&apos; own.
        </p>
      </div>

      <div className="text-center">
        <Link href="/councils" className="btn-primary">
          Browse Councils
        </Link>
      </div>
    </div>
  )
}
