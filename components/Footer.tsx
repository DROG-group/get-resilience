import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#fafafa] font-bold text-lg mb-4 flex items-center gap-2">
              <Image src="/saufex-logo.png" alt="SAUFEX" width={24} height={24} className="rounded" />
              GetResilience
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-3">
              From screenshot to legal action in three clicks. A decentralized platform
              enabling EU citizens to establish Resilience Councils and coordinate platform
              accountability under the Digital Services Act.
            </p>
            <p className="text-xs text-white/40">
              A DROG initiative within the SAUFEX consortium
            </p>
          </div>

          <div>
            <h4 className="text-[#fafafa] font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/councils" className="hover:text-white transition-colors">Councils</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Join Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#fafafa] font-semibold mb-4">Legal &amp; Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  EU Digital Services Act
                </a>
              </li>
              <li>
                <a
                  href="https://saufex.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  SAUFEX Project
                </a>
              </li>
              <li>
                <a
                  href="https://emod.saufex.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  EMOD e-Learning
                </a>
              </li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Data Management</Link></li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-white/40">
                Contact:{' '}
                <a
                  href="mailto:info@saufex.eu"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  info@saufex.eu
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              This project has received funding from the European Union&apos;s Horizon Europe
              research and innovation programme under grant agreement No. 101132494. The
              content represents the views of the authors only and does not necessarily
              reflect the views of the European Union. Neither the European Union nor the
              granting authority can be held responsible for them.
            </p>
            <div className="flex items-center gap-4 whitespace-nowrap">
              <p className="text-xs text-white/40">
                CC BY-NC-SA 4.0
              </p>
              <p className="text-xs text-white/40">
                &copy; {new Date().getFullYear()} SAUFEX Consortium
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
