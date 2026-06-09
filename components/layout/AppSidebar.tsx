'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Sparkles,
  Settings,
  LogOut,
  Users,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/blueprint', label: 'Blueprint', icon: Sparkles },
  { href: '/dashboard/family', label: 'Family', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
]

interface AppSidebarProps {
  familyName?: string
  userInitials?: string
}

export function AppSidebar({ familyName, userInitials }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    toast.success('Signed out successfully')
    router.push('/')
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-warm-100 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-warm-100 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-warm-400 to-warm-600">
          <span className="text-sm font-bold text-white">TH</span>
        </div>
        <span className="text-base font-bold text-navy-800">ThriveHaus</span>
      </div>

      {/* Family name */}
      {familyName && (
        <div className="mx-4 my-4 rounded-xl bg-warm-50 px-4 py-3">
          <p className="text-xs font-medium text-warm-500 uppercase tracking-wide">Family</p>
          <p className="text-sm font-bold text-navy-800 mt-0.5 truncate">
            The {familyName} Family
          </p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-4 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-warm-500 text-white shadow-warm'
                  : 'text-navy-500 hover:bg-warm-50 hover:text-warm-600'
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-warm-100 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-navy-400 to-navy-600 text-sm font-bold text-white flex-shrink-0">
            {userInitials || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-navy-800 truncate">My Account</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-navy-500 transition-all hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
