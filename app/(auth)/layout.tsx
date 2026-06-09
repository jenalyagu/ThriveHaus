import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <header className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-warm-400 to-warm-600">
            <span className="text-sm font-bold text-white">TH</span>
          </div>
          <span className="text-base font-bold text-navy-800">ThriveHaus</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-navy-400">
        &copy; {new Date().getFullYear()} ThriveHaus. All rights reserved.
      </footer>
    </div>
  )
}
