"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SUBJECTS, EVIDENCE_TYPES, AI_PORTFOLIO_LANGUAGE } from "@/lib/homeschool";
import Spinner from "@/components/ui/Spinner";
import type { HsPortfolio } from "../HomeschoolHub";

interface Props {
  familyId: string;
  childNames: string[];
  initialEntries: HsPortfolio[];
}

const EVIDENCE_COLORS: Record<string, string> = {
  photo: "var(--color-sage)", writing: "var(--color-ochre)", art: "var(--color-terracotta)",
  project: "var(--color-forest)", "field-trip": "#7B6EA0", "reading-log": "var(--color-charcoal)",
};

export default function PortfolioTab({ familyId, childNames, initialEntries }: Props) {
  const [entries, setEntries] = useState<HsPortfolio[]>(initialEntries);
  const [showForm, setShowForm] = useState(false);
  const [aiLanguage, setAiLanguage] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    child_name: childNames[0] || "Child",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    activity: "",
    evidence_type: "photo",
    notes: "",
  });

  function generateAI() {
    setAiLanguage(AI_PORTFOLIO_LANGUAGE[form.evidence_type] || AI_PORTFOLIO_LANGUAGE.photo);
  }

  async function handleAdd() {
    if (!form.subject || !form.activity) return;
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    const { data } = await db
      .from("homeschool_portfolio")
      .insert({ ...form, family_id: familyId, ai_language: aiLanguage || AI_PORTFOLIO_LANGUAGE[form.evidence_type] })
      .select()
      .single();
    if (data) setEntries((e) => [data, ...e]);
    setSaving(false);
    setShowForm(false);
    setAiLanguage("");
    setForm({ child_name: childNames[0] || "Child", subject: "", date: new Date().toISOString().split("T")[0], activity: "", evidence_type: "photo", notes: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </p>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
          {showForm ? "Cancel" : "+ Add Entry"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-6 mb-6">
          <h3 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>New Portfolio Entry</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {childNames.length > 1 && (
              <div>
                <label className="label">Child</label>
                <select className="input" value={form.child_name} onChange={(e) => setForm((f) => ({ ...f, child_name: e.target.value }))}>
                  {childNames.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="label">Date</label>
              <input className="input" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="label">Subject</label>
              <select className="input" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                <option value="">Select…</option>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="label mb-2 block">Evidence Type</label>
            <div className="flex flex-wrap gap-2">
              {EVIDENCE_TYPES.map((t) => (
                <button key={t} onClick={() => { setForm((f) => ({ ...f, evidence_type: t })); setAiLanguage(""); }}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors capitalize"
                  style={{
                    backgroundColor: form.evidence_type === t ? "var(--color-sage)" : "transparent",
                    color: form.evidence_type === t ? "white" : "var(--color-charcoal)",
                    borderColor: form.evidence_type === t ? "var(--color-sage)" : "var(--color-sand)",
                  }}>
                  {t.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="label">Activity Description</label>
            <input className="input" placeholder="What did your child do?" value={form.activity}
              onChange={(e) => setForm((f) => ({ ...f, activity: e.target.value }))} />
          </div>

          <div className="mb-4">
            <label className="label">Parent Notes</label>
            <textarea className="input resize-none" rows={2} placeholder="What did you observe? Any notable moments?"
              value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
          </div>

          {/* AI language */}
          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-cream) 80%, white)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold" style={{ color: "var(--color-charcoal)" }}>✦ AI Portfolio Language</p>
              <button onClick={generateAI} className="text-xs font-semibold transition-opacity hover:opacity-75"
                style={{ color: "var(--color-terracotta)" }}>
                Generate language
              </button>
            </div>
            {aiLanguage
              ? <p className="text-xs italic leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{aiLanguage}</p>
              : <p className="text-xs italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                  Click generate for professional portfolio documentation language.
                </p>
            }
          </div>

          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={saving || !form.subject || !form.activity} className="btn-primary">
              {saving ? <><Spinner size="sm" /> Saving…</> : "Save Entry"}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed p-10 text-center" style={{ borderColor: "var(--color-sand)" }}>
          <p className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>No portfolio entries yet</p>
          <p className="text-sm mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
            Add your first entry to start documenting your child&apos;s learning.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="card p-5 border-l-4"
              style={{ borderLeftColor: EVIDENCE_COLORS[entry.evidence_type] || "var(--color-sage)" }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="font-serif text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                    {entry.child_name} · {entry.subject}
                  </p>
                  <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${EVIDENCE_COLORS[entry.evidence_type] || "var(--color-sage)"} 12%, transparent)`,
                    color: EVIDENCE_COLORS[entry.evidence_type] || "var(--color-sage)",
                  }}>
                  {entry.evidence_type.replace("-", " ")}
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: "var(--color-charcoal)" }}>{entry.activity}</p>
              {entry.notes && (
                <p className="text-xs mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
                  {entry.notes}
                </p>
              )}
              {entry.ai_language && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--color-sand)" }}>
                  <p className="text-xs italic leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                    {entry.ai_language}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
