export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function IntakeLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-warm-gradient">
      <header className="flex h-16 items-center justify-between px-6 border-b border-warm-100 bg-white/60 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-warm-400 to-warm-600">
            <span className="text-sm font-bold text-white">TH</span>
          </div>
          <span className="text-base font-bold text-navy-800">ThriveHaus</span>
        </Link>
        <span className="text-sm text-navy-500">Family Setup</span>
      </header>
      <main>{children}</main>
    </div>
  )
}
