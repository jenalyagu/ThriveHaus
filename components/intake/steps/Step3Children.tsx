'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Baby, Plus, Trash2 } from 'lucide-react'
import { PERSONALITY_TRAITS, LEARNING_STYLES } from '@/lib/utils'
import type { IntakeFormData } from '@/lib/types'

interface Props {
  data: IntakeFormData
  onChange: (updates: Partial<IntakeFormData>) => void
  onNext: () => void
  onBack: () => void
}

const CHILD_INTERESTS = [
  'Sports', 'Art', 'Music', 'Reading', 'Gaming', 'Science', 'Nature',
  'Cooking', 'Dancing', 'Building/LEGO', 'Animals', 'Math', 'Technology',
  'Drama/Theater', 'Crafts', 'Swimming', 'Writing', 'YouTube/Content',
]

const CHILD_CHALLENGES = [
  'Homework/school', 'Emotional regulation', 'Focus/attention',
  'Social skills', 'Screen time', 'Sibling conflict', 'Anxiety',
  'Mornings', 'Bedtime', 'Eating habits', 'Organization', 'Following directions',
]

const GRADES = [
  'Pre-K', 'Kindergarten', '1st', '2nd', '3rd', '4th', '5th',
  '6th', '7th', '8th', '9th', '10th', '11th', '12th', 'College',
]

function newChild() {
  return {
    full_name: '', age: 0, grade: '', interests: [], challenges: [],
    personality_traits: [], learning_style: '', notes: '',
  }
}

export function Step3Children({ data, onChange, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<string[]>([])

  function updateChild(index: number, field: string, value: string | number | string[]) {
    const updated = [...data.children]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ children: updated })
  }

  function toggleTag(childIndex: number, field: 'interests' | 'challenges' | 'personality_traits', value: string) {
    const child = data.children[childIndex]
    const current = child[field] || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateChild(childIndex, field, updated)
  }

  function addChild() {
    onChange({ children: [...data.children, newChild()] })
  }

  function removeChild(index: number) {
    onChange({ children: data.children.filter((_, i) => i !== index) })
  }

  function validate() {
    const errs: string[] = []
    if (data.children.length === 0) {
      errs.push('Add at least one child to continue')
    }
    data.children.forEach((c, i) => {
      if (!c.full_name.trim()) errs.push(`Child ${i + 1} needs a name`)
      if (!c.age || c.age < 0) errs.push(`Child ${i + 1} needs an age`)
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100">
            <Baby className="h-6 w-6 text-sage-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-800">Your Children</h2>
            <p className="text-sm text-navy-500">Help us understand each child&apos;s world.</p>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-4">
            {errors.map((e) => <p key={e} className="text-sm text-red-600">{e}</p>)}
          </div>
        )}

        <div className="space-y-6">
          {data.children.map((child, index) => (
            <div key={index} className="rounded-2xl border-2 border-sage-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-navy-700">Child {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeChild(index)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-4">
                <div className="col-span-2">
                  <label className="label">First name</label>
                  <input
                    type="text"
                    value={child.full_name}
                    onChange={(e) => updateChild(index, 'full_name', e.target.value)}
                    placeholder="e.g. Emma"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Age</label>
                  <input
                    type="number"
                    value={child.age || ''}
                    onChange={(e) => updateChild(index, 'age', parseInt(e.target.value) || 0)}
                    placeholder="8"
                    min="0"
                    max="25"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Grade</label>
                  <select
                    value={child.grade}
                    onChange={(e) => updateChild(index, 'grade', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Grade…</option>
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Interests <span className="text-navy-400 font-normal">(pick all that apply)</span></label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {CHILD_INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleTag(index, 'interests', interest)}
                      className={`tag transition-all ${
                        child.interests.includes(interest)
                          ? 'bg-sage-500 text-white'
                          : 'bg-sage-50 text-navy-600 hover:bg-sage-100'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Current challenges <span className="text-navy-400 font-normal">(pick all that apply)</span></label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {CHILD_CHALLENGES.map((challenge) => (
                    <button
                      key={challenge}
                      type="button"
                      onClick={() => toggleTag(index, 'challenges', challenge)}
                      className={`tag transition-all ${
                        child.challenges.includes(challenge)
                          ? 'bg-warm-500 text-white'
                          : 'bg-warm-50 text-navy-600 hover:bg-warm-100'
                      }`}
                    >
                      {challenge}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Personality traits <span className="text-navy-400 font-normal">(pick up to 5)</span></label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PERSONALITY_TRAITS.map((trait) => (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => toggleTag(index, 'personality_traits', trait)}
                      disabled={
                        !child.personality_traits.includes(trait) &&
                        child.personality_traits.length >= 5
                      }
                      className={`tag transition-all ${
                        child.personality_traits.includes(trait)
                          ? 'bg-navy-600 text-white'
                          : 'bg-navy-50 text-navy-600 hover:bg-navy-100 disabled:opacity-40'
                      }`}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Learning style</label>
                <select
                  value={child.learning_style}
                  onChange={(e) => updateChild(index, 'learning_style', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select learning style…</option>
                  {LEARNING_STYLES.map((ls) => (
                    <option key={ls.value} value={ls.value}>{ls.label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addChild}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-700"
        >
          <Plus className="h-4 w-4" />
          Add {data.children.length === 0 ? 'a child' : 'another child'}
        </button>
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
