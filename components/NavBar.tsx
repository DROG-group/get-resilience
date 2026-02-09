'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

export default function NavBar() {
  const { user, loading, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-eu-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-eu-yellow-500 text-2xl">&#9733;</span>
            <span>Get Resilience</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="hover:text-eu-yellow-400 transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="hover:text-eu-yellow-400 transition-colors">
              How It Works
            </Link>
            <Link href="/councils" className="hover:text-eu-yellow-400 transition-colors">
              Councils
            </Link>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="hover:text-eu-yellow-400 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/reports" className="hover:text-eu-yellow-400 transition-colors">
                      My Reports
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="hover:text-eu-yellow-400 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="bg-eu-yellow-500 text-eu-blue-500 font-semibold px-4 py-1.5 rounded-lg hover:bg-eu-yellow-400 transition-colors"
                    >
                      Join Now
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/about" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/how-it-works" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="/councils" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
              Councils
            </Link>
            {!loading && user ? (
              <>
                <Link href="/dashboard" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/reports" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
                  My Reports
                </Link>
                <button onClick={() => { signOut(); setMenuOpen(false) }} className="block py-2 hover:text-eu-yellow-400">
                  Sign Out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link href="/login" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
                  Sign In
                </Link>
                <Link href="/register" className="block py-2 hover:text-eu-yellow-400" onClick={() => setMenuOpen(false)}>
                  Join Now
                </Link>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  )
}
