import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateFamilyBlueprint } from '@/lib/openai/blueprint'
import type { IntakeFormData } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { intakeData, familyId } = body as {
      intakeData: IntakeFormData
      familyId: string
    }

    const blueprintContent = await generateFamilyBlueprint(intakeData)

    const { data: blueprint, error } = await supabase
      .from('blueprints')
      .insert({
        family_id: familyId,
        content: blueprintContent,
        version: 1,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ blueprint })
  } catch (error) {
    console.error('Blueprint generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate blueprint' },
      { status: 500 }
    )
  }
}
