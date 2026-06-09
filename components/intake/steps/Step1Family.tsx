'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Home, Quote } from 'lucide-react'
import type { IntakeFormData } from '@/lib/types'

const schema = z.object({
  familyName: z.string().min(1, 'Enter your family name'),
  familyMotto: z.string().optional(),
})
type FormData = z.infer<typeof schema>

interface Props {
  data: IntakeFormData
  onChange: (updates: Partial<IntakeFormData>) => void
  onNext: () => void
}

export function Step1Family({ data, onChange, onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { familyName: data.familyName, familyMotto: data.familyMotto },
  })

  function onSubmit(values: FormData) {
    onChange(values)
    onNext()
  }

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100">
          <Home className="h-6 w-6 text-warm-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy-800">Let&apos;s start with your family</h2>
          <p className="text-sm text-navy-500">Tell us a little about your household.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">Family last name</label>
          <input
            {...register('familyName')}
            type="text"
            placeholder="e.g. Johnson"
            className="input-field"
            autoFocus
          />
          <p className="mt-1 text-xs text-navy-400">This will appear as &ldquo;The Johnson Family&rdquo; in your Blueprint.</p>
          {errors.familyName && (
            <p className="mt-1 text-xs text-red-500">{errors.familyName.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            Family motto <span className="text-navy-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <Quote className="absolute left-3 top-3.5 h-4 w-4 text-warm-300" />
            <input
              {...register('familyMotto')}
              type="text"
              placeholder="e.g. &quot;We rise together&quot;"
              className="input-field pl-10"
            />
          </div>
          <p className="mt-1 text-xs text-navy-400">A phrase that captures your family spirit. Your AI will weave it in.</p>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-primary w-full py-3.5">
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
