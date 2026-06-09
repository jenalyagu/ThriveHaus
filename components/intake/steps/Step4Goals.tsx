'use client'

import { ArrowRight, ArrowLeft, Target } from 'lucide-react'
import { FAMILY_GOALS, CHALLENGES } from '@/lib/utils'
import type { IntakeFormData } from '@/lib/types'

interface Props {
  data: IntakeFormData
  onChange: (updates: Partial<IntakeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const CURRENT_WINS = [
  'We eat dinner together', 'Kids do chores', 'We have family traditions',
  'Good communication', 'Active & healthy', 'Kids are thriving academically',
  'We prioritize fun', 'Strong parent-child bonds', 'Financially stable',
  'Faith/spiritual grounding', 'Great friendships', 'Screen time is balanced',
]

export function Step4Goals({ data, onChange, onNext, onBack }: Props) {
  function toggle(field: 'familyGoals' | 'biggestChallenges' | 'currentWins', value: string) {
    const current = data[field] as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ [field]: updated })
  }

  function handleNext() {
    onNext()
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100">
            <Target className="h-6 w-6 text-gold-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-800">Goals & Challenges</h2>
            <p className="text-sm text-navy-500">This shapes your personalized Blueprint.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="label text-base">
              What are your family&apos;s top goals?{' '}
              <span className="text-navy-400 font-normal">Pick up to 5</span>
            </label>
            <p className="text-xs text-navy-400 mb-3">These become the foundation of your Blueprint.</p>
            <div className="flex flex-wrap gap-2">
              {FAMILY_GOALS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggle('familyGoals', goal)}
                  disabled={!data.familyGoals.includes(goal) && data.familyGoals.length >= 5}
                  className={`tag transition-all text-xs py-1.5 px-3 ${
                    data.familyGoals.includes(goal)
                      ? 'bg-warm-500 text-white shadow-warm'
                      : 'bg-warm-50 text-navy-600 hover:bg-warm-100 disabled:opacity-40'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label text-base">
              What are your biggest family challenges right now?{' '}
              <span className="text-navy-400 font-normal">Pick all that apply</span>
            </label>
            <p className="text-xs text-navy-400 mb-3">Honesty here leads to better recommendations.</p>
            <div className="flex flex-wrap gap-2">
              {CHALLENGES.map((challenge) => (
                <button
                  key={challenge}
                  type="button"
                  onClick={() => toggle('biggestChallenges', challenge)}
                  className={`tag transition-all text-xs py-1.5 px-3 ${
                    data.biggestChallenges.includes(challenge)
                      ? 'bg-navy-600 text-white'
                      : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  }`}
                >
                  {challenge}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label text-base">
              What&apos;s already going well?{' '}
              <span className="text-navy-400 font-normal">Celebrate your wins</span>
            </label>
            <p className="text-xs text-navy-400 mb-3">Your Blueprint builds on these strengths.</p>
            <div className="flex flex-wrap gap-2">
              {CURRENT_WINS.map((win) => (
                <button
                  key={win}
                  type="button"
                  onClick={() => toggle('currentWins', win)}
                  className={`tag transition-all text-xs py-1.5 px-3 ${
                    data.currentWins.includes(win)
                      ? 'bg-sage-500 text-white'
                      : 'bg-sage-50 text-navy-600 hover:bg-sage-100'
                  }`}
                >
                  {win}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3.5">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button type="button" onClick={handleNext} className="btn-primary flex-1 py-3.5">
          Review & Generate
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
