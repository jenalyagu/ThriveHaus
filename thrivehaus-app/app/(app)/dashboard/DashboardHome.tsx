"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Database } from "@/types/database";
import type { BlueprintContent } from "@/types";
import type { ScoreKey } from "@/lib/village";
import { dimensions, defaultScores, villageLabel } from "@/lib/village";
import { formatDate } from "@/lib/utils";
import VillageScoreRing from "@/components/ui/VillageScoreRing";

type Family = Database["public"]["Tables"]["families"]["Row"] & {
  parents: Database["public"]["Tables"]["parents"]["Row"][];
  children: Database["public"]["Tables"]["children"]["Row"][];
  village_scores?: Record<ScoreKey, number>;
};

type Blueprint = Database["public"]["Tables"]["blueprints"]["Row"];

interface DashboardHomeProps {
  family: Family;
  blueprint: Blueprint | null;
}

export default function DashboardHome({ family, blueprint }: DashboardHomeProps) {
  const primaryParent = family.parents?.find((p) => p.role === "primary");
  const firstName = primaryParent?.first_name || "Friend";
  const bpContent = blueprint?.content as BlueprintContent | null;
  const isGenerating = blueprint?.status === "generating";
  const scores = { ...defaultScores, ...(family.village_scores || {}) };
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const hasAssessment = total > 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const lowestDim = dimensions.reduce((a, b) =>
    scores[a.key] < scores[b.key] ? a : b
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <p className="text-sm font-medium mb-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
          {greeting},
        </p>
        <h1 className="font-serif text-2xl md:text-4xl font-light" style={{ color: "var(--color-charcoal)" }}>
          {firstName} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
          {family.name} · {family.children?.length || 0} {family.children?.length === 1 ? "child" : "children"}
        </p>
      </div>

      {/* Main grid — score ring stacks above dimension bars on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Village Score Ring */}
        <div className="card p-5 md:p-6 flex flex-row md:flex-col items-center gap-4 md:gap-3 md:justify-center">
          <VillageScoreRing score={total} size="lg" />
          <div className="flex flex-col gap-1 md:items-center">
            <p className="text-xs font-semibold" style={{ color: "var(--color-charcoal)" }}>Village Score</p>
            <Link
              href="/dashboard/assessment"
              className="text-xs font-semibold transition-colors"
              style={{ color: "var(--color-terracotta)" }}
            >
              {hasAssessment ? "Update assessment →" : "Take assessment →"}
            </Link>
          </div>
        </div>

        {/* Dimension bars */}
        <div className="card p-5 md:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <h2 className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>
              Village Dimensions
            </h2>
            {!hasAssessment && (
              <Link href="/dashboard/assessment" className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}>
                Start assessment
              </Link>
            )}
          </div>
          <div className="space-y-3 md:space-y-4">
            {dimensions.map((dim) => {
              const val = scores[dim.key];
              return (
                <div key={dim.key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{dim.label}</span>
                    <span className="text-xs font-semibold" style={{ color: dim.color }}>{val}/10</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: "var(--color-sand)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val * 10}%`, backgroundColor: dim.color, opacity: 0.7 + val / 10 * 0.3 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insight callout — only if assessment taken */}
      {hasAssessment && (
        <div
          className="rounded-2xl p-4 md:p-5 mb-6 md:mb-8 flex items-start gap-3 md:gap-4 border"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-forest) 6%, transparent)",
            borderColor: "color-mix(in srgb, var(--color-forest) 12%, transparent)",
          }}
        >
          <span className="text-xl md:text-2xl mt-0.5 shrink-0">◎</span>
          <div>
            <p className="font-serif text-sm md:text-base mb-1" style={{ color: "var(--color-charcoal)" }}>
              Lowest dimension: <em>{lowestDim.label}</em>
            </p>
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
              {lowestDim.description}
            </p>
            <p className="text-xs mt-1.5 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
              {villageLabel(total)}
            </p>
          </div>
        </div>
      )}

      {/* Blueprint card */}
      {isGenerating ? (
        <div className="rounded-2xl p-4 md:p-5 mb-5 md:mb-6 flex items-center gap-4 border"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 10%, transparent)", borderColor: "color-mix(in srgb, var(--color-ochre) 20%, transparent)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--color-ochre)" }}>
            <span style={{ color: "white", fontSize: "0.8rem" }}>✦</span>
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>Your Family Blueprint is being generated…</p>
            <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>Hang tight — this takes about 10 seconds.</p>
          </div>
        </div>
      ) : bpContent ? (
        <div className="rounded-2xl p-5 md:p-6 mb-5 md:mb-6" style={{ backgroundColor: "var(--color-forest)", color: "var(--color-cream)" }}>
          <p className="section-tag mb-1" style={{ color: "rgba(251,249,246,0.5)" }}>Family Blueprint</p>
          <p className="font-serif text-base md:text-lg font-light leading-relaxed mb-3">{bpContent.summary}</p>
          {bpContent.affirmation && (
            <p className="text-sm italic mb-4" style={{ color: "rgba(251,249,246,0.6)" }}>&ldquo;{bpContent.affirmation}&rdquo;</p>
          )}
          <Link href="/dashboard/blueprint" className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75" style={{ color: "var(--color-ochre)" }}>
            View full blueprint <ArrowRight size={14} />
          </Link>
        </div>
      ) : null}

      {/* Quick links — 2 cols on mobile, 3+ on sm */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {[
          { href: "/dashboard/cocare",    icon: "♡",  label: "Co-Care",         color: "var(--color-terracotta)", desc: "Shared childcare" },
          { href: "/dashboard/pods",      icon: "◈",  label: "Learning Pods",   color: "var(--color-ochre)",      desc: "Micro-guilds" },
          { href: "/dashboard/guild",     icon: "✦",  label: "Guild",           color: "var(--color-sage)",       desc: "Family specialists" },
          { href: "/culture-kitchen",     icon: "🍽️", label: "Culture Kitchen", color: "var(--color-ochre)",      desc: "Heritage meals" },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="card p-4 border-l-4 hover:shadow-md transition-shadow block"
            style={{ borderLeftColor: item.color }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base mb-2"
              style={{ backgroundColor: `color-mix(in srgb, ${item.color} 10%, transparent)`, color: item.color }}>
              {item.icon}
            </div>
            <p className="font-serif text-sm font-medium mb-0.5 leading-tight" style={{ color: "var(--color-charcoal)" }}>{item.label}</p>
            <p className="text-xs hidden sm:block" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Village AI CTA */}
      <div className="card p-4 md:p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)" }}>
            <MessageCircle size={18} style={{ color: "var(--color-terracotta)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>Village AI</p>
            <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
              Ask your family guide anything
            </p>
          </div>
        </div>
        <Link href="/dashboard/chat" className="btn-primary shrink-0" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
          Open chat <MessageCircle size={14} />
        </Link>
      </div>

      {blueprint && (
        <p className="text-xs mt-5 md:mt-6" style={{ color: "color-mix(in srgb, var(--color-charcoal) 30%, transparent)" }}>
          Blueprint created {formatDate(blueprint.created_at)}
        </p>
      )}
    </div>
  );
}
