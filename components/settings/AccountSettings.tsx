'use client'

import { useState } from 'react'
import { User, Loader2 } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { getInitials } from '@/lib/utils'

interface Props {
  user: SupabaseUser
}

export function AccountSettings({ user }: Props) {
  const [name, setName] = useState(user.user_metadata?.full_name || '')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSave() {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Account updated')
    }
    setLoading(false)
  }

  return (
    <div className="card" id="account">
      <h2 className="text-base font-bold text-navy-800 mb-4 flex items-center gap-2">
        <User className="h-4 w-4 text-warm-500" /> Account Settings
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-navy-500 to-navy-700 text-xl font-bold text-white">
          {getInitials(name || user.email || 'U')}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-800">{name || user.email}</p>
          <p className="text-xs text-navy-400">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user.email || ''}
            disabled
            className="input-field opacity-60 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-navy-400">Email cannot be changed here.</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary px-6"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
