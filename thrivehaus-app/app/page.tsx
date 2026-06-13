import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";

export default async function LandingPage() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Supabase not configured — show landing in unauthenticated state
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      <Navbar user={user} />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 md:py-36">
        <span className="section-tag">Family Operating System</span>
        <h1
          className="font-serif text-5xl md:text-7xl font-light leading-[1.1] mb-6 max-w-3xl"
          style={{ color: "var(--color-charcoal)" }}
        >
          Build Your Village.
          <br />
          <em style={{ color: "var(--color-terracotta)" }}>Finally.</em>
        </h1>
        <p
          className="text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed"
          style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}
        >
          ThriveHaus is an AI-powered family operating system that transforms
          the chaos of modern parenthood into a clear, supported plan — built
          around your actual family.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link href="/signup" className="btn-primary text-base px-8 py-4">
            Start building your blueprint
            <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="btn-secondary text-base px-8 py-4">
            Sign in
          </Link>
        </div>
      </section>

      {/* Social proof strip */}
      <div
        className="py-6 border-y text-center text-sm font-medium"
        style={{
          backgroundColor: "var(--color-sand)",
          borderColor: "var(--color-sand)",
          color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)",
        }}
      >
        Designed for the modern family — multigenerational, multilayered, and beautifully complex.
      </div>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="section-tag">What ThriveHaus Does</span>
          <h2
            className="font-serif text-3xl md:text-4xl font-light"
            style={{ color: "var(--color-charcoal)" }}
          >
            Everything your family needs to thrive
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Family Intake",
              description:
                "Answer a thoughtful questionnaire about your family's unique structure, needs, and goals. No two families are the same.",
            },
            {
              icon: Sparkles,
              title: "AI Family Blueprint",
              description:
                "Receive a personalized roadmap — weekly rhythms, resource recommendations, and actionable support pillars — generated just for you.",
            },
            {
              icon: Users,
              title: "Family Dashboard",
              description:
                "Your family's operating center. Track your blueprint, manage your household, and build the support system you deserve.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 12%, transparent)" }}
              >
                <Icon size={22} style={{ color: "var(--color-terracotta)" }} />
              </div>
              <h3
                className="font-serif text-xl mb-3"
                style={{ color: "var(--color-charcoal)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: "var(--color-forest)" }}
      >
        <h2
          className="font-serif text-3xl md:text-4xl font-light mb-4"
          style={{ color: "var(--color-cream)" }}
        >
          Your family deserves a village.
        </h2>
        <p
          className="text-base mb-8 max-w-md mx-auto"
          style={{ color: "rgba(251,249,246,0.65)" }}
        >
          Join families already building their blueprint with ThriveHaus.
        </p>
        <Link href="/signup" className="btn-primary text-base px-8 py-4">
          Create your free account
          <ArrowRight size={16} />
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center text-sm border-t"
        style={{
          borderColor: "var(--color-sand)",
          color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)",
        }}
      >
        <p className="font-serif italic mb-1">&ldquo;Who is the village for the village?&rdquo;</p>
        <p>© {new Date().getFullYear()} ThriveHaus · Built by Jennifer Aguilar</p>
      </footer>
    </div>
  );
}
