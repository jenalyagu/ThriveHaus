"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { STATE_COMPLIANCE, ALL_STATES } from "@/lib/homeschool";

interface Props {
  familyId: string;
  initialState: string;
  settingsId?: string;
}

export default function ComplianceTab({ familyId, initialState, settingsId }: Props) {
  const [state, setState] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const info = STATE_COMPLIANCE[state];

  async function handleStateChange(newState: string) {
    setState(newState);
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    if (settingsId) {
      await db.from("homeschool_settings").update({ state: newState }).eq("id", settingsId);
    } else {
      await db.from("homeschool_settings").upsert({ family_id: familyId, state: newState }, { onConflict: "family_id" });
    }
    setSaving(false);
  }

  const defaultChecklist = info ? [
    { label: `File required documents in ${state}`, done: false, due: info.filing.split(".")[0] },
    { label: "Maintain attendance/portfolio records", done: false },
    { label: "Annual assessment or portfolio review", done: false, due: "End of school year" },
    { label: "Keep immunization records on file", done: false },
  ] : [];

  const [checklist, setChecklist] = useState(defaultChecklist);

  function handleStateSelect(newState: string) {
    handleStateChange(newState);
    setChecklist([
      { label: `File required documents in ${newState}`, done: false, due: STATE_COMPLIANCE[newState]?.filing.split(".")[0] || "" },
      { label: "Maintain attendance/portfolio records", done: false },
      { label: "Annual assessment or portfolio review", done: false, due: "End of school year" },
      { label: "Keep immunization records on file", done: false },
    ]);
  }

  return (
    <div>
      {/* State selector */}
      <div className="card p-5 mb-6 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <label className="label">Your State</label>
          <select className="input" value={state} onChange={(e) => handleStateSelect(e.target.value)}
            style={{ maxWidth: 280 }}>
            {ALL_STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        {info && (
          <p className="text-sm font-medium" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
            {info.contact}
          </p>
        )}
        {saving && <p className="text-xs" style={{ color: "var(--color-sage)" }}>Saving…</p>}
      </div>

      {!info ? (
        <div className="text-center py-16">
          <span className="text-4xl mb-4 block">🗺️</span>
          <p className="font-serif text-xl mb-2" style={{ color: "var(--color-charcoal)" }}>
            State data coming soon for {state}.
          </p>
          <p className="text-sm max-w-sm mx-auto" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
            We&apos;re adding more states regularly. In the meantime, check your state&apos;s department of education website.
          </p>
          <a href="mailto:hello@thrivehaus.co" className="text-sm font-semibold mt-4 inline-block"
            style={{ color: "var(--color-terracotta)" }}>
            Request {state} →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Options */}
            <div className="card p-6">
              <h2 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>
                Homeschool Options in {state}
              </h2>
              <ul className="space-y-3">
                {info.options.map((opt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 70%, transparent)" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, transparent)", color: "var(--color-forest)" }}>
                      {i + 1}
                    </span>
                    {opt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Attendance", icon: "✓",  text: info.attendance, accent: "var(--color-sage)" },
                { label: "Portfolio",  icon: "📁", text: info.portfolio,  accent: "var(--color-ochre)" },
                { label: "Filing",     icon: "📋", text: info.filing,     accent: "var(--color-terracotta)" },
              ].map((item) => (
                <div key={item.label} className="card p-5 border-t-4" style={{ borderTopColor: item.accent }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span>{item.icon}</span>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-charcoal)" }}>{item.label}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl p-4 flex items-start gap-3"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-sand) 60%, transparent)" }}>
              <span className="text-lg shrink-0">⚠️</span>
              <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
                <strong style={{ color: "var(--color-charcoal)" }}>Disclaimer:</strong> This tool provides educational organization support and is not legal advice.
                Homeschool laws change frequently. Please verify all requirements with your state&apos;s department of education or HSLDA before making filing decisions.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>Compliance Checklist</h3>
              <div className="space-y-3">
                {checklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={item.done}
                      onChange={() => setChecklist((c) => c.map((it, idx) => idx === i ? { ...it, done: !it.done } : it))}
                      className="mt-0.5" style={{ accentColor: "var(--color-sage)" }} />
                    <div>
                      <p className="text-xs" style={{
                        color: item.done ? "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" : "var(--color-charcoal)",
                        textDecoration: item.done ? "line-through" : "none",
                      }}>
                        {item.label}
                      </p>
                      {item.due && !item.done && (
                        <p className="text-xs mt-0.5" style={{ color: "var(--color-terracotta)" }}>{item.due}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                {checklist.filter((i) => i.done).length} of {checklist.length} complete
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-serif text-sm mb-3" style={{ color: "var(--color-charcoal)" }}>Upcoming Deadlines</h3>
              <div className="space-y-3">
                {checklist.filter((i) => !i.done && i.due).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--color-terracotta)" }} />
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--color-charcoal)" }}>{item.label}</p>
                      <p className="text-xs" style={{ color: "var(--color-terracotta)" }}>{item.due}</p>
                    </div>
                  </div>
                ))}
                {checklist.filter((i) => !i.done && i.due).length === 0 && (
                  <p className="text-xs italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                    No upcoming deadlines. You&apos;re in great shape!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
