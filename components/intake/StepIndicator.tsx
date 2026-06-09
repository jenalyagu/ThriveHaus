import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: simple text */}
      <div className="md:hidden text-center mb-4">
        <p className="text-xs font-medium text-warm-500 uppercase tracking-wide">
          Step {currentStep + 1} of {steps.length}
        </p>
        <p className="text-lg font-bold text-navy-800 mt-0.5">{steps[currentStep].label}</p>
      </div>

      {/* Desktop: full stepper */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = index < currentStep
          const active = index === currentStep
          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                    completed
                      ? 'bg-sage-500 text-white shadow-sm'
                      : active
                      ? 'bg-warm-500 text-white shadow-warm ring-4 ring-warm-100'
                      : 'border-2 border-warm-200 bg-white text-navy-400'
                  )}
                >
                  {completed ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-xs font-semibold',
                      active ? 'text-warm-600' : completed ? 'text-sage-600' : 'text-navy-400'
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-navy-400">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-3 mt-[-20px] transition-all duration-300',
                    completed ? 'bg-sage-400' : 'bg-warm-200'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar (mobile) */}
      <div className="md:hidden w-full bg-warm-100 rounded-full h-1.5">
        <div
          className="bg-warm-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
