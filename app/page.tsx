import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Heart,
  Calendar,
  Brain,
  Shield,
  Star,
  CheckCircle2,
  Users,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { LandingNav } from '@/components/layout/LandingNav'
import { Footer } from '@/components/layout/Footer'

const features = [
  {
    icon: Brain,
    title: 'AI Family Blueprint',
    description:
      'A deeply personalized roadmap built from your unique family dynamic — routines, insights, and strategies that actually fit your life.',
    color: 'bg-warm-100 text-warm-600',
  },
  {
    icon: Calendar,
    title: 'Smart Routines',
    description:
      'Morning, evening, and weekly rhythms crafted around your family\'s schedules, ages, and goals. No more reinventing the wheel.',
    color: 'bg-navy-100 text-navy-600',
  },
  {
    icon: Heart,
    title: 'Child-Centered Insights',
    description:
      'Understand each child\'s unique personality, learning style, and needs — with tailored strategies for deeper connection.',
    color: 'bg-sage-100 text-sage-600',
  },
  {
    icon: Users,
    title: 'Family Dashboard',
    description:
      'Your command center for everything family — profiles, goals, wins, and your Blueprint — all in one warm, organized space.',
    color: 'bg-gold-100 text-gold-600',
  },
  {
    icon: Zap,
    title: 'Actionable Tips',
    description:
      'No generic advice. Every suggestion is tailored to your family\'s specific challenges, strengths, and current season of life.',
    color: 'bg-warm-100 text-warm-600',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description:
      'Your family\'s data is end-to-end protected. We never sell data or train on your information. Your family stays yours.',
    color: 'bg-navy-100 text-navy-600',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in seconds. No credit card required to get started.',
  },
  {
    number: '02',
    title: 'Complete the Family Intake',
    description:
      'Answer thoughtful questions about your family — parents, children, goals, and challenges.',
  },
  {
    number: '03',
    title: 'Receive Your Blueprint',
    description:
      'Our AI generates your personalized Family Blueprint in under 60 seconds.',
  },
  {
    number: '04',
    title: 'Start Thriving',
    description:
      'Use your dashboard daily to stay aligned, on track, and deeply connected as a family.',
  },
]

const testimonials = [
  {
    quote:
      'ThriveHaus gave us a roadmap we didn\'t know we needed. The morning routine alone transformed our chaotic school days.',
    author: 'Sarah M.',
    role: 'Mom of 3, Dallas TX',
    rating: 5,
  },
  {
    quote:
      'The AI Blueprint was shockingly accurate for our family. It felt like it truly understood our kids — not just generic advice.',
    author: 'Marcus & Tanya W.',
    role: 'Parents of twins, Atlanta GA',
    rating: 5,
  },
  {
    quote:
      'As a single dad juggling everything, ThriveHaus became my co-pilot. The evening routine suggestions changed everything.',
    author: 'Derek L.',
    role: 'Dad of 2, Seattle WA',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-warm-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-navy-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-4 py-2 text-sm font-medium text-warm-600 shadow-sm mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered Family Operating System
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-navy-900 sm:text-6xl lg:text-7xl text-balance">
              Your Family,{' '}
              <span className="gradient-text">Amplified.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-500 text-balance">
              ThriveHaus uses AI to craft a personalized Family Blueprint — custom
              routines, child insights, and a weekly rhythm designed around your unique
              family. Less chaos, more connection.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/signup" className="btn-primary text-base px-8 py-4 shadow-warm-lg">
                Get Your Family Blueprint
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#how-it-works" className="btn-ghost text-base">
                See how it works
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-navy-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sage-500" /> Free to start
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sage-500" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sage-500" /> Ready in 60 seconds
              </span>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-warm-50 z-10 pointer-events-none rounded-3xl" />
            <div className="rounded-3xl border border-warm-200 bg-white shadow-[0_32px_80px_rgba(26,50,112,0.12)] overflow-hidden">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 bg-warm-50 px-4 py-3 border-b border-warm-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-warm-300" />
                  <div className="w-3 h-3 rounded-full bg-gold-300" />
                  <div className="w-3 h-3 rounded-full bg-sage-300" />
                </div>
                <div className="flex-1 bg-white rounded-lg h-6 mx-4 flex items-center px-3">
                  <span className="text-xs text-navy-300">thrivehaus.app/dashboard</span>
                </div>
              </div>

              {/* Mock Dashboard */}
              <div className="p-6 bg-warm-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-4 w-32 skeleton mb-2" />
                    <div className="h-6 w-48 skeleton" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-warm-200 skeleton" />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {['Family Blueprint', 'Morning Routine', 'This Week'].map((item) => (
                    <div key={item} className="bg-white rounded-2xl p-4 shadow-card">
                      <div className="h-3 w-20 skeleton mb-3" />
                      <div className="h-5 w-full skeleton mb-2" />
                      <div className="h-3 w-3/4 skeleton" />
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-navy-700 to-navy-900 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-gold-400" />
                    <span className="font-semibold text-sm">Your Family Blueprint</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded w-full" />
                    <div className="h-3 bg-white/20 rounded w-5/6" />
                    <div className="h-3 bg-white/20 rounded w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="py-12 bg-navy-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center text-white md:flex-row md:justify-between">
            {[
              { value: '2,400+', label: 'Families Thriving' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '98%', label: 'Would Recommend' },
              { value: '60s', label: 'Blueprint Generated' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-warm-400">{stat.value}</span>
                <span className="text-sm text-navy-300 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white" id="features">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Everything Your Family Needs to{' '}
              <span className="gradient-text">Thrive</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              ThriveHaus combines AI intelligence with family science to give you tools
              that actually make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card group">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-800 mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-warm-50" id="how-it-works">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              From Chaos to Clarity in{' '}
              <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Getting started takes less than 10 minutes. Your Family Blueprint is
              waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-full w-full h-px bg-warm-200 hidden lg:block z-0" />
                )}
                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-warm-400 to-warm-600 text-xl font-bold text-white shadow-warm">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-navy-800 mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white" id="testimonials">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Families Who Found Their{' '}
              <span className="gradient-text">Rhythm</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="card flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-navy-600 flex-1 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-navy-800 text-sm">{t.author}</div>
                  <div className="text-xs text-navy-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-warm-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-warm-400/30 bg-warm-400/10 px-4 py-2 text-sm font-medium text-warm-300 mb-8">
            <Heart className="h-4 w-4" />
            Start for free today
          </div>
          <h2 className="text-4xl font-bold text-white sm:text-5xl text-balance mb-6">
            Your family deserves a{' '}
            <span className="text-warm-400">blueprint</span>, not a guess.
          </h2>
          <p className="text-lg text-navy-300 max-w-xl mx-auto mb-10">
            Join thousands of families who have traded overwhelm for intention.
            Your personalized Family Blueprint is one step away.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-warm-500 px-10 py-4 text-base font-bold text-white shadow-warm-lg transition-all duration-200 hover:bg-warm-400 hover:shadow-glow active:scale-[0.98]"
          >
            Create My Family Blueprint
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
