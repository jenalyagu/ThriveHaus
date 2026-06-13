"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

interface Props {
  familyId: string;
  familyName: string;
}

const WHAT_YOU_GET = [
  { emoji: "🗺️", label: "Personalized Family Blueprint",   desc: "AI-crafted from your intake answers — not a template, your actual family." },
  { emoji: "🏛️", label: "4–5 Custom Support Pillars",      desc: "Specific to your challenges, values, and goals." },
  { emoji: "📅", label: "Weekly Rhythm Plan",               desc: "Mon–Sun, built around your schedule and what matters to you." },
  { emoji: "🍽️", label: "Meal & Budget Approach",          desc: "Practical strategies matched to your preferences and resources." },
  { emoji: "◎",  label: "Village Strategy",                 desc: "A clear-eyed look at your support gap and exactly how to close it." },
  { emoji: "📚", label: "Curated Resource List",            desc: "Books, tools, and communities chosen for your family's specific situation." },
  { emoji: "💛", label: "Parenting Tips & Love Languages",  desc: "Daily rotating wisdom from leading early childhood experts." },
];

export default function BlueprintPaywall({ familyId, familyName }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function startCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyId }),
      });
      const { url, error: err } = await res.json();
      if (err || !url) { setError(err || "Something went wrong."); setLoading(false); return; }
      window.location.href = url;
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-10">
        <span className="section-tag">Family Blueprint</span>
        <h1 className="font-serif text-4xl font-light mb-3 mt-2" style={{ color: "var(--color-charcoal)" }}>
          {familyName}&apos;s Blueprint
        </h1>
        <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
          Your family is one of a kind. Your blueprint should be too. Unlock a completely personalized plan built from your answers — not a generic guide.
        </p>
      </div>

      {/* What you get */}
      <div className="card p-6 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
          What&apos;s inside
        </p>
        <div className="space-y-4">
          {WHAT_YOU_GET.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{item.label}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase CTA */}
      <div className="rounded-2xl p-6 text-center"
        style={{ background: "linear-gradient(135deg, var(--color-forest), color-mix(in srgb, var(--color-forest) 75%, var(--color-sage)))" }}>
        <p className="font-serif text-3xl font-light mb-1" style={{ color: "var(--color-cream)" }}>$29</p>
        <p className="text-sm mb-1" style={{ color: "rgba(251,249,246,0.65)" }}>One-time · Yours forever</p>
        <p className="text-xs mb-5" style={{ color: "rgba(251,249,246,0.45)" }}>Secure checkout via Stripe</p>

        <button onClick={startCheckout} disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--color-cream)", color: "var(--color-forest)" }}>
          {loading
            ? <><RefreshCw size={15} className="animate-spin" /> Redirecting to checkout…</>
            : "✨ Unlock My Family Blueprint"}
        </button>

        {error && <p className="text-xs mt-3" style={{ color: "var(--color-ochre)" }}>{error}</p>}

        <p className="text-xs mt-4" style={{ color: "rgba(251,249,246,0.4)" }}>
          Not happy? Email us within 7 days for a full refund — no questions asked.
        </p>
      </div>
    </div>
  );
}
