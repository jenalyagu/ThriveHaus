import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-300 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-warm-400 to-warm-600">
                <span className="text-sm font-bold text-white">TH</span>
              </div>
              <span className="text-base font-bold text-white">ThriveHaus</span>
            </Link>
            <p className="text-sm leading-relaxed text-navy-400">
              Your AI-powered Family Operating System. Less chaos, more connection.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-warm-400 transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-warm-400 transition-colors">How It Works</Link></li>
              <li><Link href="/signup" className="hover:text-warm-400 transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-warm-400 transition-colors">Log In</Link></li>
              <li><Link href="/signup" className="hover:text-warm-400 transition-colors">Sign Up</Link></li>
              <li><Link href="/dashboard" className="hover:text-warm-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-warm-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-warm-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-8 flex flex-col items-center gap-2 text-sm text-navy-500 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} ThriveHaus. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-warm-500 text-warm-500" /> for families everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
