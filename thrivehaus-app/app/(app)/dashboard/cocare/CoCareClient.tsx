"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Heart, Plus, Users } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

interface CoCareEntry {
  id: string;
  family_id: string;
  family_name: string;
  contact_email: string;
  child_ages: string;
  notes: string;
  available_days: string[];
  created_at: string;
}

interface Props {
  familyId: string;
  familyName: string;
  myEntry: CoCareEntry | null;
  network: CoCareEntry[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CoCareClient({ familyId, familyName, myEntry, network }: Props) {
  const [showForm, setShowForm] = useState(!myEntry);
  const [entry, setEntry] = useState({
    family_name: myEntry?.family_name || familyName,
    contact_email: myEntry?.contact_email || "",
    child_ages: myEntry?.child_ages || "",
    notes: myEntry?.notes || "",
    available_days: myEntry?.available_days || [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleDay(day: string) {
    setEntry((e) => ({
      ...e,
      available_days: e.available_days.includes(day)
        ? e.available_days.filter((d) => d !== day)
        : [...e.available_days, day],
    }));
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    if (myEntry) {
      await db.from("cocare_families").update(entry).eq("id", myEntry.id);
    } else {
      await db.from("cocare_families").insert({ ...entry, family_id: familyId });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setShowForm(false); setSaved(false); }, 800);
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <span className="section-tag">Co-Care Network</span>
        <h1 className="font-serif text-3xl font-light mb-2" style={{ color: "var(--color-charcoal)" }}>
          Shared childcare with families you trust
        </h1>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          List your family and connect with nearby families for playdates, co-parenting days, and childcare swaps.
        </p>
      </div>

      {/* Your listing */}
      {!showForm && myEntry ? (
        <div className="card p-6 mb-8 border-l-4" style={{ borderLeftColor: "var(--color-terracotta)" }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-serif text-base font-medium" style={{ color: "var(--color-charcoal)" }}>{myEntry.family_name}</p>
              <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>{myEntry.contact_email}</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}>
              Edit listing
            </button>
          </div>
          {myEntry.child_ages && (
            <p className="text-sm mb-1" style={{ color: "var(--color-charcoal)" }}>
              <span className="font-medium">Child ages:</span> {myEntry.child_ages}
            </p>
          )}
          {myEntry.available_days?.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-2">
              {myEntry.available_days.map((d) => (
                <span key={d} className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 12%, transparent)", color: "var(--color-terracotta)" }}>
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="card p-6 mb-8">
          <h2 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>
            {myEntry ? "Update your listing" : "Add your family to the network"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label">Family name</label>
              <input className="input" value={entry.family_name}
                onChange={(e) => setEntry((s) => ({ ...s, family_name: e.target.value }))} />
            </div>
            <div>
              <label className="label">Contact email</label>
              <input className="input" type="email" value={entry.contact_email}
                onChange={(e) => setEntry((s) => ({ ...s, contact_email: e.target.value }))} />
            </div>
            <div>
              <label className="label">Children&apos;s ages (e.g. 3, 5, 8)</label>
              <input className="input" value={entry.child_ages}
                onChange={(e) => setEntry((s) => ({ ...s, child_ages: e.target.value }))} />
            </div>
            <div>
              <label className="label">Available days</label>
              <div className="flex gap-2 flex-wrap mt-1">
                {DAYS.map((day) => (
                  <button key={day} onClick={() => toggleDay(day)}
                    className="px-3 py-1 rounded-full text-xs font-medium border transition-colors"
                    style={{
                      backgroundColor: entry.available_days.includes(day) ? "var(--color-terracotta)" : "transparent",
                      color: entry.available_days.includes(day) ? "white" : "var(--color-charcoal)",
                      borderColor: entry.available_days.includes(day) ? "var(--color-terracotta)" : "var(--color-sand)",
                    }}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Notes (activities you enjoy, neighborhood, etc.)</label>
              <textarea className="input resize-none" rows={3} value={entry.notes}
                onChange={(e) => setEntry((s) => ({ ...s, notes: e.target.value }))} />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={saving || saved} className="btn-primary">
                {saving ? <><Spinner size="sm" /> Saving…</> : saved ? "✓ Saved!" : "Save listing"}
              </button>
              {myEntry && (
                <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Network grid */}
      <div className="mb-4 flex items-center gap-2">
        <Users size={16} style={{ color: "var(--color-charcoal)" }} />
        <h2 className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>
          Families in the network ({network.length})
        </h2>
      </div>

      {network.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed p-10 text-center"
          style={{ borderColor: "var(--color-sand)" }}>
          <Heart size={32} className="mx-auto mb-3" style={{ color: "var(--color-sand)" }} />
          <p className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>No families yet</p>
          <p className="text-sm mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
            Be the first — add your family above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {network.map((f) => (
            <div key={f.id} className="card p-5">
              <p className="font-serif text-sm font-medium mb-0.5" style={{ color: "var(--color-charcoal)" }}>{f.family_name}</p>
              {f.child_ages && (
                <p className="text-xs mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                  Ages: {f.child_ages}
                </p>
              )}
              {f.available_days?.length > 0 && (
                <div className="flex gap-1 flex-wrap mb-2">
                  {f.available_days.map((d) => (
                    <span key={d} className="px-1.5 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)", color: "var(--color-terracotta)" }}>
                      {d}
                    </span>
                  ))}
                </div>
              )}
              {f.notes && (
                <p className="text-xs italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>{f.notes}</p>
              )}
              {f.contact_email && (
                <a href={`mailto:${f.contact_email}`}
                  className="text-xs font-medium mt-2 inline-block transition-opacity hover:opacity-75"
                  style={{ color: "var(--color-terracotta)" }}>
                  Contact →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
