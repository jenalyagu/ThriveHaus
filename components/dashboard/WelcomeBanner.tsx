'use client'

import { format } from 'date-fns'
import { Bell } from 'lucide-react'

interface Props {
  firstName: string
  familyName: string
}

export function WelcomeBanner({ firstName, familyName }: Props) {
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const today = format(new Date(), 'EEEE, MMMM d')

  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-navy-400">{today}</p>
        <h1 className="text-2xl font-bold text-navy-800 mt-0.5">
          {greeting}, {firstName}! 👋
        </h1>
        <p className="text-sm text-navy-500 mt-1">
          The <span className="font-semibold text-warm-600">{familyName} Family</span> dashboard
        </p>
      </div>
      <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-warm-100 shadow-card hover:shadow-card-hover transition-shadow">
        <Bell className="h-4 w-4 text-navy-500" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-warm-500" />
      </button>
    </div>
  )
}
