export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { getInitials } from '@/lib/utils'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: family } = await supabase
    .from('families')
    .select('name')
    .eq('created_by', user.id)
    .single()

  const fullName = user.user_metadata?.full_name || user.email || ''
  const userInitials = getInitials(fullName)

  return (
    <div className="flex h-screen overflow-hidden bg-warm-50">
      <AppSidebar familyName={family?.name} userInitials={userInitials} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
