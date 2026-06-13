"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, Plus } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

interface Pod {
  id: string;
  family_id: string;
  name: string;
  subject: string;
  age_range: string;
  max_children: number;
  description: string;
  contact_email: string;
  created_at: string;
}

interface Props {
  familyId: string;
  familyName: string;
  pods: Pod[];
}

const SUBJECTS = ["Math", "Reading", "Science", "Arts", "Music", "Coding", "Languages", "Nature", "History", "Physical Ed"];

export default function PodsClient({ familyId, familyName, pods: initialPods }: Props) {
  const [pods, setPods] = useState(initialPods);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    age_range: "",
    max_children: 6,
    description: "",
    contact_email: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    if (!form.name || !form.subject) return;
    setSaving(true);
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    const { data } = await db
      .from("learning_pods")
      .insert({ ...form, family_id: familyId })
      .select()
      .single();
    if (data) setPods((p) => [data, ...p]);
    setSaving(false);
    setShowForm(false);
    setForm({ name: "", subject: "", age_range: "", max_children: 6, description: "", contact_email: "" });
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-tag">Learning Pods</span>
          <h1 className="font-serif text-3xl font-light mb-2" style={{ color: "var(--color-charcoal)" }}>
            Micro-schools &amp; learning circles
          </h1>
          <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
            Create or join small learning pods led by parents, educators, and community experts.
          </p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary flex items-center gap-2" style={{ whiteSpace: "nowrap" }}>
          <Plus size={16} /> Create pod
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>New learning pod</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Pod name</label>
              <input className="input" placeholder="e.g. Morning Math Circle" value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">Subject</label>
              <select className="input" value={form.subject}
                onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}>
                <option value="">Select…</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Age range (e.g. 5–8)</label>
              <input className="input" placeholder="5–8" value={form.age_range}
                onChange={(e) => setForm((s) => ({ ...s, age_range: e.target.value }))} />
            </div>
            <div>
              <label className="label">Max children</label>
              <input className="input" type="number" min={2} max={20} value={form.max_children}
                onChange={(e) => setForm((s) => ({ ...s, max_children: Number(e.target.value) }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Description</label>
              <textarea className="input resize-none" rows={2} placeholder="What will kids learn? When does it meet?" value={form.description}
                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
            </div>
            <div>
              <label className="label">Contact email</label>
              <input className="input" type="email" value={form.contact_email}
                onChange={(e) => setForm((s) => ({ ...s, contact_email: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreate} disabled={saving || !form.name || !form.subject} className="btn-primary">
              {saving ? <><Spinner size="sm" /> Creating…</> : "Create pod"}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Pods grid */}
      {pods.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed p-10 text-center"
          style={{ borderColor: "var(--color-sand)" }}>
          <BookOpen size={32} className="mx-auto mb-3" style={{ color: "var(--color-sand)" }} />
          <p className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>No learning pods yet</p>
          <p className="text-sm mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
            Start one — it only takes a moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pods.map((pod) => (
            <div key={pod.id} className="card p-5 border-t-4" style={{ borderTopColor: "var(--color-ochre)" }}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-serif text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{pod.name}</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 15%, transparent)", color: "var(--color-ochre)" }}>
                  {pod.subject}
                </span>
              </div>
              {pod.age_range && (
                <p className="text-xs mb-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                  Ages {pod.age_range} · max {pod.max_children} kids
                </p>
              )}
              {pod.description && (
                <p className="text-xs mt-1 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                  {pod.description}
                </p>
              )}
              {pod.contact_email && (
                <a href={`mailto:${pod.contact_email}`}
                  className="text-xs font-medium mt-2 inline-block"
                  style={{ color: "var(--color-ochre)" }}>
                  Join pod →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
