'use client'

import { ArrowLeft, Sparkles, Loader2, Users, Baby, Target, Home } from 'lucide-react'
import type { IntakeFormData } from '@/lib/types'

interface Props {
  data: IntakeFormData
  onSubmit: () => void
  onBack: () => void
  generating: boolean
}

export function Step5Review({ data, onSubmit, onBack, generating }: Props) {
  return (
    <div className="space-y-4 animate-slide-up">
      {generating ? (
        <div className="card text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-warm-400 to-warm-600 shadow-warm-lg animate-pulse-warm">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-3">
            Crafting Your Family Blueprint…
          </h2>
          <p className="text-navy-500 mb-8 max-w-sm mx-auto">
            Our AI is analyzing your family&apos;s unique profile and building your personalized
            operating system. This takes about 30 seconds.
          </p>
          <div className="flex items-center justify-center gap-2 text-warm-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Generating your Blueprint…</span>
          </div>
          <div className="mt-8 space-y-2 max-w-xs mx-auto text-left">
            {[
              'Analyzing family dynamics…',
              'Designing custom routines…',
              'Crafting child insights…',
              'Building your Blueprint…',
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm text-navy-500">
                <div className="h-1.5 w-1.5 rounded-full bg-warm-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                {step}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100">
                <Sparkles className="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-800">Review & Generate</h2>
                <p className="text-sm text-navy-500">Everything looks good? Let&apos;s build your Blueprint.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Family */}
              <ReviewSection icon={Home} title="Family" color="bg-warm-100 text-warm-600">
                <p className="text-sm text-navy-700 font-semibold">The {data.familyName} Family</p>
                {data.familyMotto && (
                  <p className="text-xs text-navy-500 mt-0.5">&ldquo;{data.familyMotto}&rdquo;</p>
                )}
              </ReviewSection>

              {/* Parents */}
              <ReviewSection icon={Users} title={`${data.parents.length} Caregiver${data.parents.length > 1 ? 's' : ''}`} color="bg-navy-100 text-navy-600">
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.parents.map((p) => (
                    <span key={p.full_name} className="tag bg-navy-50 text-navy-700 text-xs">
                      {p.full_name} ({p.role})
                    </span>
                  ))}
                </div>
              </ReviewSection>

              {/* Children */}
              <ReviewSection icon={Baby} title={`${data.children.length} Child${data.children.length !== 1 ? 'ren' : ''}`} color="bg-sage-100 text-sage-600">
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.children.map((c) => (
                    <span key={c.full_name} className="tag bg-sage-50 text-navy-700 text-xs">
                      {c.full_name}, age {c.age}
                    </span>
                  ))}
                </div>
              </ReviewSection>

              {/* Goals */}
              <ReviewSection icon={Target} title="Family Goals" color="bg-gold-100 text-gold-600">
                {data.familyGoals.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {data.familyGoals.map((g) => (
                      <span key={g} className="tag bg-gold-50 text-navy-700 text-xs">{g}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-navy-400">No goals selected</p>
                )}
              </ReviewSection>
            </div>
          </div>

          {/* CTA */}
          <div className="card bg-gradient-to-br from-navy-800 to-navy-900 border-none text-white">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-warm-500/20">
                <Sparkles className="h-6 w-6 text-warm-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Ready to generate your Blueprint?</h3>
                <p className="text-navy-300 text-sm mt-1">
                  Our AI will create a personalized Family Blueprint with custom routines,
                  child insights, weekly rhythms, and more — in about 30 seconds.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="btn-primary flex-1 py-3.5 bg-gradient-to-r from-warm-500 to-warm-600 text-base font-bold shadow-warm-lg"
            >
              <Sparkles className="h-5 w-5" />
              Generate My Blueprint
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function ReviewSection({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ElementType
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-warm-100 bg-warm-50/50 p-4">
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1">{title}</p>
        {children}
      </div>
    </div>
  )
}
