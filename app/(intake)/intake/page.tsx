import { Metadata } from 'next'
import { IntakeWizard } from '@/components/intake/IntakeWizard'

export const metadata: Metadata = {
  title: 'Family Setup — ThriveHaus',
}

export default function IntakePage() {
  return <IntakeWizard />
}
