import { getInitials, getAgeLabel } from '@/lib/utils'
import type { Parent, Child } from '@/lib/types'

interface Props {
  parents: Parent[]
  children: Child[]
}

const parentAvatarColors = [
  'from-navy-500 to-navy-700',
  'from-warm-500 to-warm-700',
]
const childAvatarColors = [
  'from-sage-400 to-sage-600',
  'from-gold-400 to-gold-600',
  'from-warm-400 to-warm-500',
  'from-navy-400 to-navy-600',
]

export function FamilyMembersCard({ parents, children }: Props) {
  return (
    <div className="card">
      <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wide mb-4">
        Family Members
      </h3>

      {parents.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-navy-400 mb-2">Caregivers</p>
          <div className="space-y-2.5">
            {parents.map((parent, i) => (
              <div key={parent.id} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${parentAvatarColors[i % 2]} text-xs font-bold text-white`}
                >
                  {getInitials(parent.full_name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy-800 truncate">{parent.full_name}</p>
                  <p className="text-xs text-navy-400 capitalize">{parent.role}</p>
                </div>
                {parent.is_primary && (
                  <span className="ml-auto tag bg-warm-100 text-warm-600 text-xs">You</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {children.length > 0 && (
        <div>
          <p className="text-xs font-medium text-navy-400 mb-2">Children</p>
          <div className="space-y-2.5">
            {children.map((child, i) => (
              <div key={child.id} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${childAvatarColors[i % 4]} text-xs font-bold text-white`}
                >
                  {getInitials(child.full_name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy-800 truncate">{child.full_name}</p>
                  <p className="text-xs text-navy-400">
                    Age {child.age} · {child.grade || getAgeLabel(child.age || 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
