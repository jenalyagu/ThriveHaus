import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Log In — ThriveHaus',
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="card border-warm-200 shadow-card-hover">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-800">Welcome back</h1>
          <p className="text-sm text-navy-500 mt-2">
            Sign in to access your Family Dashboard
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-navy-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-warm-500 hover:text-warm-600">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
