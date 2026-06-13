"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Star, Plus, Shield } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

interface GuildMember {
  id: string;
  family_id: string;
  name: string;
  profession: string;
  specialty: string;
  bio: string;
  contact_email: string;
  website: string;
  verified: boolean;
  created_at: string;
}

interface Props {
  familyId: string;
  familyName: string;
  members: GuildMember[];
}

const PROFESSIONS = [
  "Pediatrician", "Lactation Consultant", "Sleep Consultant", "Therapist / Counselor",
  "Occupational Therapist", "Speech Therapist", "Doula / Midwife", "Nutritionist",
  "Family Lawyer", "Financial Advisor", "Tutor", "Nanny / Au Pair", "House Manager",
  "Personal Trainer", "Other",
];

export default function GuildClient({ familyId, members: initialMembers }: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({
    name: "",
    profession: "",
    specialty: "",
    bio: "",
    contact_email: "",
    website: "",
  });
  const [saving, setSaving] = useState(false);

  const filtered = filter
    ? members.filter((m) =>
        m.profession.toLowerCase().includes(filter.toLowerCase()) ||
        m.name.toLowerCase().includes(filter.toLowerCase()) ||
        m.specialty?.toLowerCase().includes(filter.toLowerCase())
      )
    : members;

  async function handleAdd() {
    if (!form.name || !form.profession) return;
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    const { data } = await db
      .from("guild_members")
      .insert({ ...form, family_id: familyId, verified: false })
      .select()
      .single();
    if (data) setMembers((m) => [data, ...m]);
    setSaving(false);
    setShowForm(false);
    setForm({ name: "", profession: "", specialty: "", bio: "", contact_email: "", website: "" });
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-tag">Professional Guild</span>
          <h1 className="font-serif text-3xl font-light mb-2" style={{ color: "var(--color-charcoal)" }}>
            Vetted family specialists
          </h1>
          <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
            Community-recommended professionals who understand the full weight of raising a family.
          </p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary flex items-center gap-2" style={{ whiteSpace: "nowrap" }}>
          <Plus size={16} /> Add professional
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          className="input"
          placeholder="Search by profession, name, or specialty…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ maxWidth: 420 }}
        />
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>Recommend a professional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Full name</label>
              <input className="input" value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">Profession</label>
              <select className="input" value={form.profession}
                onChange={(e) => setForm((s) => ({ ...s, profession: e.target.value }))}>
                <option value="">Select…</option>
                {PROFESSIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Specialty / focus area</label>
              <input className="input" placeholder="e.g. infant sleep, postpartum" value={form.specialty}
                onChange={(e) => setForm((s) => ({ ...s, specialty: e.target.value }))} />
            </div>
            <div>
              <label className="label">Contact email</label>
              <input className="input" type="email" value={form.contact_email}
                onChange={(e) => setForm((s) => ({ ...s, contact_email: e.target.value }))} />
            </div>
            <div>
              <label className="label">Website (optional)</label>
              <input className="input" type="url" placeholder="https://" value={form.website}
                onChange={(e) => setForm((s) => ({ ...s, website: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Why do you recommend them?</label>
              <textarea className="input resize-none" rows={2} value={form.bio}
                onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={saving || !form.name || !form.profession} className="btn-primary">
              {saving ? <><Spinner size="sm" /> Adding…</> : "Add to guild"}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Members grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed p-10 text-center"
          style={{ borderColor: "var(--color-sand)" }}>
          <Star size={32} className="mx-auto mb-3" style={{ color: "var(--color-sand)" }} />
          <p className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>
            {filter ? "No matches found" : "No guild members yet"}
          </p>
          <p className="text-sm mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
            {filter ? "Try a different search." : "Recommend a trusted professional above."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-serif text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{m.name}</p>
                {m.verified && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 15%, transparent)", color: "var(--color-sage)" }}>
                    <Shield size={10} /> Verified
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-sage)" }}>{m.profession}</p>
              {m.specialty && (
                <p className="text-xs mb-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>{m.specialty}</p>
              )}
              {m.bio && (
                <p className="text-xs italic mt-1 mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                  &ldquo;{m.bio}&rdquo;
                </p>
              )}
              <div className="flex gap-3 mt-2">
                {m.contact_email && (
                  <a href={`mailto:${m.contact_email}`} className="text-xs font-medium" style={{ color: "var(--color-sage)" }}>
                    Email →
                  </a>
                )}
                {m.website && (
                  <a href={m.website} target="_blank" rel="noopener noreferrer" className="text-xs font-medium" style={{ color: "var(--color-sage)" }}>
                    Website →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
