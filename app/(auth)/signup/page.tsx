import { Metadata } from 'next'
import { SignUpForm } from '@/components/auth/SignUpForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up — ThriveHaus',
}

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md">
      <div className="card border-warm-200 shadow-card-hover">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-800">Create your account</h1>
          <p className="text-sm text-navy-500 mt-2">
            Start building your Family Blueprint today — free
          </p>
        </div>

        <SignUpForm />

        <p className="mt-6 text-center text-sm text-navy-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-warm-500 hover:text-warm-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
