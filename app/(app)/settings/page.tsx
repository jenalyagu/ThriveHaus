import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Settings, User, Users, Bell, Shield } from 'lucide-react'
import { FamilySettings } from '@/components/settings/FamilySettings'
import { AccountSettings } from '@/components/settings/AccountSettings'
import type { Family, Parent, Child } from '@/lib/types'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [familyResult, parentsResult, childrenResult] = await Promise.all([
    supabase.from('families').select('*').eq('created_by', user.id).single(),
    supabase.from('parents').select('*').order('created_at'),
    supabase.from('children').select('*').order('created_at'),
  ])

  const family = familyResult.data as Family | null
  const parents = (parentsResult.data || []) as Parent[]
  const children = (childrenResult.data || []) as Child[]

  return (
    <div className="min-h-screen bg-warm-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <Settings className="h-6 w-6 text-warm-500" />
          Settings
        </h1>
        <p className="text-sm text-navy-500 mt-1">Manage your family profile and account</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <div className="card p-2">
            {[
              { icon: User, label: 'Account', href: '#account' },
              { icon: Users, label: 'Family Profile', href: '#family' },
              { icon: Bell, label: 'Notifications', href: '#notifications' },
              { icon: Shield, label: 'Privacy', href: '#privacy' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-warm-50 hover:text-warm-600 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-3 space-y-6">
          <AccountSettings user={user} />
          {family && (
            <FamilySettings
              family={family}
              parents={parents}
              children={children}
            />
          )}

          {/* Notifications placeholder */}
          <div className="card" id="notifications">
            <h2 className="text-base font-bold text-navy-800 mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-warm-500" /> Notification Preferences
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Weekly Blueprint reminder', description: 'Get a Sunday nudge to review your family rhythm' },
                { label: 'Routine alerts', description: 'Morning & evening routine check-in reminders' },
                { label: 'New tips & insights', description: 'AI-generated tips personalized for your family' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-warm-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-navy-700">{item.label}</p>
                    <p className="text-xs text-navy-400">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex h-5 w-9 items-center rounded-full bg-warm-500 transition-colors focus:outline-none"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="inline-block h-4 w-4 translate-x-4 rounded-full bg-white shadow transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
