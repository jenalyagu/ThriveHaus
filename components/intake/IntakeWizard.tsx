'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { StepIndicator } from './StepIndicator'
import { Step1Family } from './steps/Step1Family'
import { Step2Parents } from './steps/Step2Parents'
import { Step3Children } from './steps/Step3Children'
import { Step4Goals } from './steps/Step4Goals'
import { Step5Review } from './steps/Step5Review'
import type { IntakeFormData } from '@/lib/types'

const STEPS = [
  { label: 'Your Family', description: 'Basic info' },
  { label: 'Parents', description: 'Caregiver details' },
  { label: 'Children', description: 'Kids info' },
  { label: 'Goals', description: 'Dreams & challenges' },
  { label: 'Review', description: 'Generate Blueprint' },
]

const defaultData: IntakeFormData = {
  familyName: '',
  familyMotto: '',
  parents: [{ full_name: '', role: 'parent', work_schedule: '', strengths: [], notes: '' }],
  children: [],
  familyGoals: [],
  biggestChallenges: [],
  currentWins: [],
}

export function IntakeWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<IntakeFormData>(defaultData)
  const [generating, setGenerating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function updateData(updates: Partial<IntakeFormData>) {
    setData((prev) => ({ ...prev, ...updates }))
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    setGenerating(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // 1. Create family
      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert({
          name: data.familyName,
          family_motto: data.familyMotto || null,
          created_by: user.id,
          intake_completed: true,
        })
        .select()
        .single()
      if (familyError) throw familyError

      // 2. Insert parents
      if (data.parents.length > 0) {
        const { error: parentsError } = await supabase.from('parents').insert(
          data.parents.map((p, i) => ({
            ...p,
            family_id: family.id,
            user_id: i === 0 ? user.id : null,
            is_primary: i === 0,
          }))
        )
        if (parentsError) throw parentsError
      }

      // 3. Insert children
      if (data.children.length > 0) {
        const { error: childrenError } = await supabase.from('children').insert(
          data.children.map((c) => ({ ...c, family_id: family.id }))
        )
        if (childrenError) throw childrenError
      }

      // 4. Generate blueprint via API
      const blueprintRes = await fetch('/api/blueprint/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intakeData: data, familyId: family.id }),
      })
      if (!blueprintRes.ok) throw new Error('Blueprint generation failed')

      toast.success("Your Family Blueprint is ready! 🎉")
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
      setGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="mt-8">
        {step === 0 && (
          <Step1Family data={data} onChange={updateData} onNext={nextStep} />
        )}
        {step === 1 && (
          <Step2Parents data={data} onChange={updateData} onNext={nextStep} onBack={prevStep} />
        )}
        {step === 2 && (
          <Step3Children data={data} onChange={updateData} onNext={nextStep} onBack={prevStep} />
        )}
        {step === 3 && (
          <Step4Goals data={data} onChange={updateData} onNext={nextStep} onBack={prevStep} />
        )}
        {step === 4 && (
          <Step5Review
            data={data}
            onSubmit={handleSubmit}
            onBack={prevStep}
            generating={generating}
          />
        )}
      </div>
    </div>
  )
}
