import { Sparkles, TrendingUp, Lightbulb } from 'lucide-react'
import type { Blueprint } from '@/lib/types'

interface Props {
  blueprint: Blueprint
}

export function BlueprintCard({ blueprint }: Props) {
  const { content } = blueprint

  return (
    <div className="rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 p-6 text-white shadow-card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm-500/20">
            <Sparkles className="h-4 w-4 text-warm-400" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-navy-300">
              Family Blueprint
            </p>
            <p className="text-xs text-navy-400">AI-Generated</p>
          </div>
        </div>
        <span className="tag bg-warm-500/20 text-warm-300 text-xs">Active</span>
      </div>

      <p className="text-sm leading-relaxed text-navy-200 mb-5">{content.overview}</p>

      <div className="grid grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="h-3.5 w-3.5 text-sage-400" />
            <p className="text-xs font-bold text-sage-300 uppercase tracking-wide">Strengths</p>
          </div>
          <ul className="space-y-1">
            {content.familyStrengths?.slice(0, 3).map((s) => (
              <li key={s} className="text-xs text-navy-300 flex items-start gap-1.5">
                <span className="text-sage-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Growth areas */}
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="h-3.5 w-3.5 text-gold-400" />
            <p className="text-xs font-bold text-gold-300 uppercase tracking-wide">Opportunities</p>
          </div>
          <ul className="space-y-1">
            {content.growthAreas?.slice(0, 3).map((g) => (
              <li key={g} className="text-xs text-navy-300 flex items-start gap-1.5">
                <span className="text-gold-400 mt-0.5">•</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips preview */}
      {content.parentingTips && content.parentingTips.length > 0 && (
        <div className="mt-4 rounded-xl bg-white/5 p-4">
          <p className="text-xs font-bold text-warm-300 uppercase tracking-wide mb-2">
            Top Tip for Your Family
          </p>
          <p className="text-xs text-navy-200 leading-relaxed">{content.parentingTips[0]}</p>
        </div>
      )}
    </div>
  )
}
