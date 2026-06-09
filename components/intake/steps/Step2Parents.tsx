'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Users, Plus, Trash2 } from 'lucide-react'
import { WORK_SCHEDULES, PERSONALITY_TRAITS } from '@/lib/utils'
import type { IntakeFormData } from '@/lib/types'

interface Props {
  data: IntakeFormData
  onChange: (updates: Partial<IntakeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const PARENT_ROLES = ['Mom', 'Dad', 'Guardian', 'Step-parent', 'Grandparent', 'Other']

const PARENT_STRENGTHS = [
  'Organized', 'Nurturing', 'Patient', 'Playful', 'Disciplined',
  'Creative', 'Supportive', 'Flexible', 'Consistent', 'Empathetic',
  'Fun', 'Calm under pressure',
]

export function Step2Parents({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<string[]>([])

  function updateParent(index: number, field: string, value: string | string[]) {
    const updated = [...data.parents]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ parents: updated })
  }

  function toggleStrength(parentIndex: number, strength: string) {
    const parent = data.parents[parentIndex]
    const current = parent.strengths || []
    const updated = current.includes(strength)
      ? current.filter((s) => s !== strength)
      : [...current, strength]
    updateParent(parentIndex, 'strengths', updated)
  }

  function addParent() {
    onChange({
      parents: [
        ...data.parents,
        { full_name: '', role: 'parent', work_schedule: '', strengths: [], notes: '' },
      ],
    })
  }

  function removeParent(index: number) {
    onChange({ parents: data.parents.filter((_, i) => i !== index) })
  }

  function validate() {
    const errs: string[] = []
    data.parents.forEach((p, i) => {
      if (!p.full_name.trim()) errs.push(`Parent ${i + 1} needs a name`)
      if (!p.work_schedule) errs.push(`Parent ${i + 1} needs a work schedule`)
    })
    setErrors(errs)
    return errs.length === 0
  }

  function handleNext() {
    if (validate()) onNext()
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-100">
            <Users className="h-6 w-6 text-navy-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-800">Parents & Caregivers</h2>
            <p className="text-sm text-navy-500">Tell us about the adults in the home.</p>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-4">
            {errors.map((e) => (
              <p key={e} className="text-sm text-red-600">{e}</p>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {data.parents.map((parent, index) => (
            <div key={index} className="rounded-2xl border-2 border-warm-100 p-5 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-navy-700">
                  {index === 0 ? 'Primary Caregiver (You)' : `Caregiver ${index + 1}`}
                </span>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeParent(index)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Full name</label>
                  <input
                    type="text"
                    value={parent.full_name}
                    onChange={(e) => updateParent(index, 'full_name', e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Role in family</label>
                  <select
                    value={parent.role}
                    onChange={(e) => updateParent(index, 'role', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select role…</option>
                    {PARENT_ROLES.map((r) => (
                      <option key={r} value={r.toLowerCase()}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="label">Work schedule</label>
                  <select
                    value={parent.work_schedule}
                    onChange={(e) => updateParent(index, 'work_schedule', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select schedule…</option>
                    {WORK_SCHEDULES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="label">Your parenting strengths <span className="text-navy-400 font-normal">(pick all that apply)</span></label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PARENT_STRENGTHS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStrength(index, s)}
                      className={`tag transition-all ${
                        parent.strengths?.includes(s)
                          ? 'bg-warm-500 text-white'
                          : 'bg-warm-50 text-navy-600 hover:bg-warm-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.parents.length < 2 && (
          <button
            type="button"
            onClick={addParent}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-warm-500 hover:text-warm-600"
          >
            <Plus className="h-4 w-4" />
            Add another caregiver
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3.5">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button type="button" onClick={handleNext} className="btn-primary flex-1 py-3.5">
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
