'use client'

import { useState } from 'react'
import { Users, Loader2 } from 'lucide-react'
import type { Family, Parent, Child } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { getInitials } from '@/lib/utils'

interface Props {
  family: Family
  parents: Parent[]
  children: Child[]
}

export function FamilySettings({ family, parents, children }: Props) {
  const [familyName, setFamilyName] = useState(family.name)
  const [motto, setMotto] = useState(family.family_motto || '')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSave() {
    setLoading(true)
    const { error } = await supabase
      .from('families')
      .update({ name: familyName, family_motto: motto })
      .eq('id', family.id)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Family profile updated')
    }
    setLoading(false)
  }

  return (
    <div className="card" id="family">
      <h2 className="text-base font-bold text-navy-800 mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-warm-500" /> Family Profile
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="label">Family name</label>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Family motto <span className="text-navy-400 font-normal">(optional)</span></label>
          <input
            type="text"
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
            placeholder="e.g. We rise together"
            className="input-field"
          />
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={loading} className="btn-primary px-6">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save changes
          </button>
        </div>
      </div>

      {/* Members list */}
      <div className="border-t border-warm-100 pt-4">
        <p className="text-sm font-semibold text-navy-700 mb-3">Family Members</p>

        {parents.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wide mb-2">Caregivers</p>
            <div className="space-y-2">
              {parents.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border border-warm-100 bg-warm-50/50 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-700">
                    {getInitials(p.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800 truncate">{p.full_name}</p>
                    <p className="text-xs text-navy-400 capitalize">{p.role} · {p.work_schedule?.replace('-', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {children.length > 0 && (
          <div>
            <p className="text-xs font-medium text-navy-400 uppercase tracking-wide mb-2">Children</p>
            <div className="space-y-2">
              {children.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-sage-100 bg-sage-50/30 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-100 text-xs font-bold text-sage-700">
                    {getInitials(c.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800 truncate">{c.full_name}</p>
                    <p className="text-xs text-navy-400">Age {c.age} · {c.grade}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.interests.slice(0, 2).map((i) => (
                      <span key={i} className="tag bg-sage-100 text-sage-700 text-xs">{i}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
