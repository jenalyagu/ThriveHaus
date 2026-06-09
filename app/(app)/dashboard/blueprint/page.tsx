import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  Sparkles, TrendingUp, Lightbulb, Sun, Moon, Calendar,
  Heart, Target, Star
} from 'lucide-react'
import Link from 'next/link'
import type { Blueprint, Child } from '@/lib/types'

export default async function BlueprintPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [familyResult, blueprintResult, childrenResult] = await Promise.all([
    supabase.from('families').select('name').eq('created_by', user.id).single(),
    supabase.from('blueprints').select('*').eq('is_active', true)
      .order('created_at', { ascending: false }).limit(1).maybeSingle(),
    supabase.from('children').select('*').order('created_at'),
  ])

  const family = familyResult.data
  const blueprint = blueprintResult.data as Blueprint | null
  const children = (childrenResult.data || []) as Child[]

  if (!blueprint) redirect('/dashboard')

  const { content } = blueprint

  return (
    <div className="min-h-screen bg-warm-50 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard" className="text-sm text-navy-400 hover:text-navy-600">Dashboard</Link>
            <span className="text-navy-300">/</span>
            <span className="text-sm font-medium text-navy-700">Family Blueprint</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-800">
            The {family?.name} Family Blueprint
          </h1>
          <p className="text-sm text-navy-500 mt-1">Your AI-generated family operating system</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-400 to-warm-600 shadow-warm">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="card">
            <h2 className="text-lg font-bold text-navy-800 mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-gold-500" /> Family Overview
            </h2>
            <p className="text-navy-600 leading-relaxed">{content.overview}</p>
          </div>

          {/* Strengths & Growth */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h2 className="text-base font-bold text-navy-800 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-sage-500" /> Family Strengths
              </h2>
              <ul className="space-y-2">
                {content.familyStrengths?.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-navy-600">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="text-base font-bold text-navy-800 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-gold-500" /> Growth Opportunities
              </h2>
              <ul className="space-y-2">
                {content.growthAreas?.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-navy-600">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Routines */}
          <div className="card">
            <h2 className="text-lg font-bold text-navy-800 mb-4 flex items-center gap-2">
              <Sun className="h-5 w-5 text-gold-500" /> Daily Routines
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-bold text-warm-600 mb-3 flex items-center gap-1.5">
                  <Sun className="h-4 w-4" /> Morning Routine
                </p>
                <div className="space-y-3">
                  {content.morningRoutine?.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="rounded-lg bg-gold-50 px-2 py-0.5 text-xs font-bold text-gold-700 h-fit whitespace-nowrap">{item.time}</span>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{item.activity}</p>
                        {item.tip && <p className="text-xs text-navy-400">{item.tip}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-navy-600 mb-3 flex items-center gap-1.5">
                  <Moon className="h-4 w-4" /> Evening Routine
                </p>
                <div className="space-y-3">
                  {content.eveningRoutine?.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="rounded-lg bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-600 h-fit whitespace-nowrap">{item.time}</span>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{item.activity}</p>
                        {item.tip && <p className="text-xs text-navy-400">{item.tip}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Rhythm */}
          {content.weeklyRhythm && content.weeklyRhythm.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-bold text-navy-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-warm-500" /> Weekly Rhythm
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {content.weeklyRhythm.map((day) => (
                  <div key={day.day} className="rounded-xl border border-warm-100 bg-warm-50/50 p-3">
                    <p className="text-xs font-bold text-warm-600 uppercase tracking-wide">{day.day}</p>
                    <p className="text-sm font-semibold text-navy-800 mt-0.5">{day.theme}</p>
                    <ul className="mt-2 space-y-0.5">
                      {day.activities.map((a) => (
                        <li key={a} className="text-xs text-navy-500 flex items-start gap-1">
                          <span className="text-warm-400">·</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Child Insights */}
          {content.childInsights && content.childInsights.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-bold text-navy-800 mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-warm-500" /> Child Insights
              </h2>
              <div className="space-y-4">
                {content.childInsights.map((insight) => (
                  <div key={insight.name} className="rounded-xl border-2 border-sage-100 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-sm font-bold text-sage-700">
                        {insight.name[0]}
                      </div>
                      <h3 className="font-bold text-navy-800">{insight.name}</h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-sage-600 mb-1">Strengths</p>
                        <ul className="space-y-0.5">
                          {insight.strengths.map((s) => (
                            <li key={s} className="text-navy-600 flex items-start gap-1">
                              <span className="text-sage-500">✓</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-warm-600 mb-1">Suggestions</p>
                        <ul className="space-y-0.5">
                          {insight.suggestions.map((s) => (
                            <li key={s} className="text-navy-600 flex items-start gap-1">
                              <span className="text-warm-400">→</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-navy-500 mb-1">Connection Idea</p>
                        <p className="text-navy-600">{insight.connectionIdea}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Parenting tips */}
          {content.parentingTips && content.parentingTips.length > 0 && (
            <div className="card">
              <h3 className="text-base font-bold text-navy-800 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-warm-500" /> Parenting Tips
              </h3>
              <ul className="space-y-3">
                {content.parentingTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy-600">
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-warm-100 text-xs font-bold text-warm-600">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 30-day focus */}
          {content.thirtyDayFocus && (
            <div className="rounded-2xl bg-gradient-to-br from-sage-600 to-sage-800 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-sage-200 mb-2">
                30-Day Family Focus
              </p>
              <p className="text-sm font-medium leading-relaxed">{content.thirtyDayFocus}</p>
            </div>
          )}

          {/* Affirmation */}
          {content.affirmation && (
            <div className="rounded-2xl border-2 border-warm-200 bg-warm-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-warm-500 mb-2">
                Family Affirmation
              </p>
              <p className="text-sm italic leading-relaxed text-navy-700">
                &ldquo;{content.affirmation}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
