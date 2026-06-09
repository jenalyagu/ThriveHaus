import type { LucideIcon } from 'lucide-react'
import type { RoutineItem } from '@/lib/types'

interface Props {
  title: string
  icon: LucideIcon
  color: string
  items: RoutineItem[]
}

export function RoutineCard({ title, icon: Icon, color, items }: Props) {
  return (
    <div className="card">
      <div className={`flex items-center gap-2 mb-4 rounded-xl bg-gradient-to-r ${color} p-3`}>
        <Icon className="h-4 w-4 text-white" />
        <p className="text-sm font-bold text-white">{title}</p>
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 rounded-lg bg-warm-50 px-2 py-0.5 text-xs font-bold text-warm-600 min-w-[56px] text-center">
                {item.time}
              </span>
              <div>
                <p className="text-sm font-medium text-navy-800">{item.activity}</p>
                {item.tip && (
                  <p className="text-xs text-navy-400 mt-0.5">{item.tip}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-navy-400 text-center py-4">
          Routine not yet generated
        </p>
      )}
    </div>
  )
}
