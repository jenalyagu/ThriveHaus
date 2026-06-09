import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sparkles, ArrowRight, Sun, Moon, Users } from 'lucide-react'
import Link from 'next/link'
import { BlueprintCard } from '@/components/dashboard/BlueprintCard'
import { FamilyMembersCard } from '@/components/dashboard/FamilyMembersCard'
import { RoutineCard } from '@/components/dashboard/RoutineCard'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import type { Blueprint, Family, Parent, Child } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [familyResult, parentsResult, childrenResult, blueprintResult] =
    await Promise.all([
      supabase.from('families').select('*').eq('created_by', user.id).single(),
      supabase.from('parents').select('*').order('created_at'),
      supabase.from('children').select('*').order('created_at'),
      supabase
        .from('blueprints')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ])

  const family = familyResult.data as Family | null
  const parents = (parentsResult.data || []) as Parent[]
  const children = (childrenResult.data || []) as Child[]
  const blueprint = blueprintResult.data as Blueprint | null

  if (!family || !family.intake_completed) {
    redirect('/intake')
  }

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-warm-50 p-6 lg:p-8">
      <WelcomeBanner firstName={firstName} familyName={family.name} />

      {blueprint ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Blueprint overview — takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <BlueprintCard blueprint={blueprint} />

            <div className="grid gap-6 sm:grid-cols-2">
              <RoutineCard
                title="Morning Routine"
                icon={Sun}
                color="from-gold-400 to-warm-500"
                items={blueprint.content.morningRoutine?.slice(0, 4) || []}
              />
              <RoutineCard
                title="Evening Routine"
                icon={Moon}
                color="from-navy-500 to-navy-700"
                items={blueprint.content.eveningRoutine?.slice(0, 4) || []}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FamilyMembersCard parents={parents} children={children} />

            {/* 30-day focus */}
            {blueprint.content.thirtyDayFocus && (
              <div className="card bg-gradient-to-br from-sage-600 to-sage-800 border-none text-white">
                <p className="text-xs font-bold uppercase tracking-wide text-sage-200 mb-2">
                  30-Day Focus
                </p>
                <p className="text-sm leading-relaxed font-medium">
                  {blueprint.content.thirtyDayFocus}
                </p>
              </div>
            )}

            {/* Family affirmation */}
            {blueprint.content.affirmation && (
              <div className="card bg-gradient-to-br from-warm-50 to-warm-100 border-warm-200">
                <p className="text-xs font-bold uppercase tracking-wide text-warm-500 mb-2">
                  Family Affirmation
                </p>
                <p className="text-sm italic leading-relaxed text-navy-700">
                  &ldquo;{blueprint.content.affirmation}&rdquo;
                </p>
              </div>
            )}

            <Link
              href="/dashboard/blueprint"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-warm-200 py-3 text-sm font-semibold text-warm-600 hover:bg-warm-50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              View Full Blueprint
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* No blueprint yet */
        <div className="mt-8 flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-100 mb-6">
            <Sparkles className="h-10 w-10 text-warm-500" />
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-3">
            Your Blueprint is waiting
          </h2>
          <p className="text-navy-500 max-w-md mb-8">
            Complete the family intake questionnaire to generate your personalized
            Family Blueprint.
          </p>
          <Link href="/intake" className="btn-primary px-8 py-3.5">
            <Users className="h-5 w-5" />
            Complete Family Setup
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  )
}
