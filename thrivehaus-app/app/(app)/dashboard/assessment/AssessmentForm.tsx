"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import VillageScoreRing from "@/components/ui/VillageScoreRing";
import Spinner from "@/components/ui/Spinner";
import { dimensions, type ScoreKey } from "@/lib/village";

interface AssessmentFormProps {
  familyId: string;
  familyName: string;
  initialScores: Record<ScoreKey, number>;
}

export default function AssessmentForm({ familyId, familyName, initialScores }: AssessmentFormProps) {
  const [scores, setScores] = useState(initialScores);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("families")
      .update({ village_scores: scores })
      .eq("id", familyId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 800);
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <span className="section-tag">Village Assessment</span>
        <h1 className="font-serif text-3xl font-light mb-2" style={{ color: "var(--color-charcoal)" }}>
          How strong is your village?
        </h1>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          Rate {familyName}&apos;s current support across five dimensions. Honest answers lead to better action.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sliders */}
        <div className="lg:col-span-2 space-y-5">
          {dimensions.map((dim) => {
            const val = scores[dim.key];
            return (
              <div key={dim.key} className="card p-6">
                <div className="flex justify-between items-start mb-1">
                  <label className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>
                    {dim.label}
                  </label>
                  <span className="text-2xl font-light font-serif" style={{ color: dim.color }}>
                    {val}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                  {dim.description}
                </p>
                <input
                  type="range" min={0} max={10} value={val}
                  onChange={(e) => {
                    setScores((s) => ({ ...s, [dim.key]: Number(e.target.value) }));
                    setSaved(false);
                  }}
                  className="w-full cursor-pointer"
                  style={{ accentColor: dim.color }}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>None</span>
                  <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>Thriving</span>
                </div>
              </div>
            );
          })}

          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="btn-primary w-full"
          >
            {saving ? <><Spinner size="sm" /> Saving…</> : saved ? "✓ Saved — redirecting" : "Save my village score"}
          </button>
        </div>

        {/* Live score ring */}
        <div className="flex flex-col gap-6">
          <div className="card p-6 flex flex-col items-center justify-center">
            <VillageScoreRing score={total} size="lg" />
          </div>

          <div className="card p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
              Score breakdown
            </p>
            {dimensions.map((dim) => (
              <div key={dim.key}>
                <div className="flex justify-between text-xs mb-1" style={{ color: "var(--color-charcoal)" }}>
                  <span>{dim.label}</span>
                  <span className="font-semibold">{scores[dim.key]}/10</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: "var(--color-sand)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${scores[dim.key] * 10}%`, backgroundColor: dim.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
