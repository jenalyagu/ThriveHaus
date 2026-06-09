'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-warm-100'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-warm-400 to-warm-600">
              <span className="text-sm font-bold text-white">TH</span>
            </div>
            <span className="text-lg font-bold text-navy-800">ThriveHaus</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-navy-500 hover:text-warm-500 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-navy-500 hover:text-warm-500 transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-navy-500 hover:text-warm-500 transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="btn-ghost py-2 px-4 text-sm">
              Log in
            </Link>
            <Link href="/signup" className="btn-primary py-2 px-5 text-sm">
              Get Started Free
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-navy-600 hover:bg-warm-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-warm-100 px-4 py-4 space-y-3">
          <Link href="#features" className="block text-sm font-medium text-navy-600 py-2" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link href="#how-it-works" className="block text-sm font-medium text-navy-600 py-2" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link href="#testimonials" className="block text-sm font-medium text-navy-600 py-2" onClick={() => setMobileOpen(false)}>Testimonials</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="btn-secondary flex-1 text-center text-sm py-2.5">Log in</Link>
            <Link href="/signup" className="btn-primary flex-1 text-center text-sm py-2.5">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
