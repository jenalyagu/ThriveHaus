"use client";

import { useState, useMemo } from "react";
import {
  assignRole, ageTier, DEPARTMENTS, TIER_BADGE, getSharedConnectionRole,
  type FamilyMember, type Department,
} from "@/lib/homeops";
import type { Member } from "../HomeOpsHub";
import { Plus, Trash2, RefreshCw, ChevronRight, ChevronLeft } from "lucide-react";

interface Props { members: Member[] }

type View = "org" | "board" | "roster";

// Seed local FamilyMembers from the passed-in hub members
function seedMembers(raw: Member[]): FamilyMember[] {
  return raw.map((m, i) => ({
    id: m.id,
    name: m.name,
    age: m.role === "child" ? null : null, // age TBD by user
    isAdult: m.role !== "child",
  })) ?? [
    { id: "m1", name: "Parent", age: null, isAdult: true },
  ];
}

const DEPT_ORDER: Department[] = ["admin","kitchen","facilities","logistics","grounds"];

// Current ISO week number (1-52)
function currentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
}

export default function ChoresTab({ members: rawMembers }: Props) {
  const [view, setView] = useState<View>("org");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(seedMembers(rawMembers));
  const [rotationWeek, setRotationWeek] = useState(currentWeek());
  const [completedChores, setCompletedChores] = useState<Record<string, boolean>>({});
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", age: "", isAdult: false });
  const [editId, setEditId] = useState<string | null>(null);

  // Assign roles for current rotation — adults offset by index so each gets a different department
  const roster = useMemo(() => {
    let adultIndex = 0;
    return familyMembers.map((m) => {
      const memberIndex = m.isAdult || m.age === null || (m.age ?? 0) >= 18 ? adultIndex++ : 0;
      return { ...m, currentRole: assignRole(m, rotationWeek, memberIndex) };
    });
  }, [familyMembers, rotationWeek]);

  const sharedRole = useMemo(() => getSharedConnectionRole(rotationWeek), [rotationWeek]);

  // Group by department for the board view
  const byDept = useMemo(() => {
    const map: Partial<Record<Department, typeof roster>> = {};
    roster.forEach((m) => {
      const d = m.currentRole!.department;
      if (!map[d]) map[d] = [];
      map[d]!.push(m);
    });
    return map;
  }, [roster]);

  function toggleChore(memberId: string, choreIdx: number) {
    const key = `${memberId}-${choreIdx}-w${rotationWeek}`;
    setCompletedChores((c) => ({ ...c, [key]: !c[key] }));
  }

  function choreKey(memberId: string, choreIdx: number) {
    return `${memberId}-${choreIdx}-w${rotationWeek}`;
  }

  function addMember() {
    if (!newMember.name.trim()) return;
    setFamilyMembers((ms) => [...ms, {
      id: `fm${Date.now()}`,
      name: newMember.name,
      age: newMember.age ? parseInt(newMember.age) : null,
      isAdult: newMember.isAdult,
    }]);
    setNewMember({ name: "", age: "", isAdult: false });
    setShowAddMember(false);
  }

  function updateMemberAge(id: string, age: string, isAdult: boolean) {
    setFamilyMembers((ms) => ms.map((m) => m.id === id
      ? { ...m, age: age ? parseInt(age) : null, isAdult }
      : m
    ));
    setEditId(null);
  }

  function removeMember(id: string) {
    setFamilyMembers((ms) => ms.filter((m) => m.id !== id));
  }

  const totalChores = roster.reduce((n, m) => n + (m.currentRole?.chores.length ?? 0), 0);
  const doneChores  = Object.values(completedChores).filter(Boolean).length;

  const VIEWS: { key: View; label: string }[] = [
    { key: "org",    label: "🏢 Org Chart"    },
    { key: "board",  label: "📋 Dept Board"   },
    { key: "roster", label: "👥 Roster"       },
  ];

  return (
    <div>
      {/* Sub-nav */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {VIEWS.map((v) => (
          <button key={v.key} onClick={() => setView(v.key)}
            className="text-sm font-medium px-4 py-2 rounded-full border transition-colors"
            style={{
              backgroundColor: view === v.key ? "var(--color-forest)" : "transparent",
              color: view === v.key ? "var(--color-cream)" : "var(--color-charcoal)",
              borderColor: view === v.key ? "var(--color-forest)" : "var(--color-sand)",
            }}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Rotation controls */}
      <div className="flex items-center justify-between mb-6 card px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
            Rotation
          </p>
          <p className="font-serif text-base font-medium" style={{ color: "var(--color-charcoal)" }}>
            Week {rotationWeek}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
            {doneChores}/{totalChores} chores done
          </div>
          <div className="h-1.5 w-20 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-sand)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${totalChores ? (doneChores / totalChores) * 100 : 0}%`, backgroundColor: "var(--color-sage)" }} />
          </div>
          <div className="flex gap-1">
            <button onClick={() => setRotationWeek((w) => w - 1)}
              className="p-1.5 rounded-lg border transition-colors hover:bg-black/5"
              style={{ borderColor: "var(--color-sand)" }} title="Previous week">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setRotationWeek(currentWeek())}
              className="p-1.5 rounded-lg border transition-colors hover:bg-black/5 text-xs font-medium px-2"
              style={{ borderColor: "var(--color-sand)", color: "var(--color-charcoal)" }}>
              Today
            </button>
            <button onClick={() => setRotationWeek((w) => w + 1)}
              className="p-1.5 rounded-lg border transition-colors hover:bg-black/5"
              style={{ borderColor: "var(--color-sand)" }} title="Next week">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── ORG CHART ── */}
      {view === "org" && (
        <div>
          <div className="rounded-2xl p-4 mb-6 flex items-start gap-3"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--color-forest) 12%, transparent)" }}>
            <span className="text-lg shrink-0">🏠</span>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-forest)" }}>Run your home like a business</p>
              <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                Every family member has a role and a department. Roles rotate each week so everyone builds every skill — and no one burns out doing the same thing forever.
              </p>
            </div>
          </div>

          {/* C-Suite first */}
          {(() => {
            const csuite = roster.filter((m) => m.currentRole!.tier === "c-suite");
            const rest   = roster.filter((m) => m.currentRole!.tier !== "c-suite");
            return (
              <>
                {csuite.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Leadership</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {csuite.map((m) => <RoleCard key={m.id} member={m} completedChores={completedChores} onToggle={toggleChore} choreKey={choreKey} rotationWeek={rotationWeek} />)}
                    </div>

                    {/* Shared connection activity — only shown when there are 2+ adults */}
                    {csuite.length >= 2 && (
                      <div className="mt-4 rounded-2xl p-5 border-2 flex items-start gap-4"
                        style={{
                          borderColor: "color-mix(in srgb, var(--color-terracotta) 25%, transparent)",
                          background: "linear-gradient(135deg, color-mix(in srgb, var(--color-terracotta) 5%, transparent), color-mix(in srgb, var(--color-ochre) 5%, transparent))",
                        }}>
                        <span className="text-2xl shrink-0">{sharedRole.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{sharedRole.title}</p>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 12%, transparent)", color: "var(--color-terracotta)" }}>
                              Together · {sharedRole.duration}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--color-charcoal)" }}>
                            {sharedRole.activity}
                          </p>
                          <p className="text-[10px] italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                            💛 {sharedRole.why}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {rest.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Team</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rest.map((m) => <RoleCard key={m.id} member={m} completedChores={completedChores} onToggle={toggleChore} choreKey={choreKey} rotationWeek={rotationWeek} />)}
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {roster.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
                No family members yet. Go to the Roster tab to add your team.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── DEPT BOARD ── */}
      {view === "board" && (
        <div>
          {/* Description banner */}
          <div className="rounded-2xl p-5 mb-6 border" style={{
            backgroundColor: "color-mix(in srgb, var(--color-forest) 5%, transparent)",
            borderColor: "color-mix(in srgb, var(--color-forest) 12%, transparent)",
          }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">🏢</span>
              <div>
                <p className="font-serif text-base font-medium mb-1" style={{ color: "var(--color-forest)" }}>
                  Welcome to Corporate HQ — Population: Your Family
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                  Each department is staffed by whoever the rotation assigned this week. Tasks within each department are calibrated to each person&apos;s age and abilities — the C-Suite gets the heavy lifting, Trainees get the wins they can actually pull off. Nobody is above their department. Not even the CEO.
                </p>
                <p className="text-[10px] mt-2 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                  Tip: tasks are grouped by department so the whole team can see who&apos;s covering what this week.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {DEPT_ORDER.filter((d) => byDept[d]?.length).map((dept) => {
              const config = DEPARTMENTS[dept];
              const deptMembers = byDept[dept]!;
              return (
                <div key={dept} className="card p-5">
                  {/* Dept header */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: "var(--color-sand)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)` }}>
                      {config.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-base font-medium leading-tight" style={{ color: "var(--color-charcoal)" }}>{config.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>{config.description}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`, color: config.color }}>
                      {deptMembers.length} on staff
                    </span>
                  </div>

                  {/* Members in this dept */}
                  <div className="space-y-5">
                    {deptMembers.map((m) => {
                      const badge = TIER_BADGE[m.currentRole!.tier];
                      const ageLabel = m.isAdult || m.age === null
                        ? "Adult"
                        : m.age >= 14 ? `Age ${m.age} · Teen`
                        : m.age >= 11 ? `Age ${m.age} · Preteen`
                        : m.age >= 8  ? `Age ${m.age} · Big kid`
                        : m.age >= 5  ? `Age ${m.age} · Little kid`
                        : `Age ${m.age} · Tiny helper`;
                      const abilityNote = m.isAdult || m.age === null
                        ? "Full ownership — plan, execute, and follow through independently."
                        : m.age >= 14 ? "Can handle multi-step tasks and work with minimal supervision."
                        : m.age >= 11 ? "Ready for real responsibility with light check-ins."
                        : m.age >= 8  ? "Handles assigned tasks well with a clear instruction."
                        : m.age >= 5  ? "Builds habits with simple, concrete one-step tasks."
                        : "Learning through participation — short, supervised tasks only.";

                      return (
                        <div key={m.id} className="rounded-xl p-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-cream) 60%, white)" }}>
                          {/* Member header */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                              style={{ backgroundColor: badge.bg, color: badge.color }}>
                              {m.name[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{m.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                  style={{ backgroundColor: badge.bg, color: badge.color }}>{m.currentRole!.title}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>{ageLabel}</span>
                                <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" }}>·</span>
                                <span className="text-[10px] italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>{abilityNote}</span>
                              </div>
                            </div>
                          </div>

                          {/* Chore list */}
                          <div className="space-y-1.5 pl-11">
                            {m.currentRole!.chores.map((chore, i) => {
                              const key = choreKey(m.id, i);
                              const done = !!completedChores[key];
                              return (
                                <div key={i} onClick={() => toggleChore(m.id, i)}
                                  className="flex items-center gap-2 cursor-pointer">
                                  <div className="w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors"
                                    style={{ backgroundColor: done ? "var(--color-sage)" : "transparent", borderColor: done ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 20%, transparent)" }}>
                                    {done && <span style={{ color: "white", fontSize: "0.45rem" }}>✓</span>}
                                  </div>
                                  <span className="text-xs" style={{ color: done ? "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" : "var(--color-charcoal)", textDecoration: done ? "line-through" : "none" }}>
                                    {chore}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ROSTER ── */}
      {view === "roster" && (
        <div>
          <p className="text-xs mb-4 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
            Set each person&apos;s age to get accurate role tiers. Roles rotate every week automatically.
          </p>

          <div className="space-y-3 mb-5">
            {familyMembers.map((m) => {
              const tier = ageTier(m.age, m.isAdult);
              const badge = TIER_BADGE[tier];
              const isEditing = editId === m.id;
              return (
                <div key={m.id} className="card p-4">
                  {isEditing ? (
                    <EditMemberRow
                      member={m}
                      onSave={(age, isAdult) => updateMemberAge(m.id, age, isAdult)}
                      onCancel={() => setEditId(null)}
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{ backgroundColor: badge.bg, color: badge.color }}>
                        {m.name[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{m.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: badge.bg, color: badge.color }}>{badge.label}</span>
                          <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                            {m.isAdult ? "Adult" : m.age !== null ? `Age ${m.age}` : "Age not set"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setEditId(m.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-black/5"
                          style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }} title="Edit">
                          <RefreshCw size={13} />
                        </button>
                        <button onClick={() => removeMember(m.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                          style={{ color: "color-mix(in srgb, var(--color-charcoal) 30%, transparent)" }} title="Remove">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {showAddMember ? (
            <div className="card p-5">
              <p className="font-serif text-sm font-medium mb-3" style={{ color: "var(--color-charcoal)" }}>Add team member</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <label className="label">Name</label>
                  <input className="input" placeholder="First name" value={newMember.name} onChange={(e) => setNewMember((n) => ({ ...n, name: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Age</label>
                  <input className="input" type="number" min={1} max={99} placeholder="e.g. 8" value={newMember.age}
                    onChange={(e) => setNewMember((n) => ({ ...n, age: e.target.value, isAdult: parseInt(e.target.value) >= 18 || !e.target.value }))} />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={newMember.isAdult} onChange={(e) => setNewMember((n) => ({ ...n, isAdult: e.target.checked }))} className="w-4 h-4 rounded" />
                    <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>Adult / Parent</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={addMember} className="btn-primary">Add to team</button>
                <button onClick={() => setShowAddMember(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddMember(true)} className="btn-secondary w-full gap-2">
              <Plus size={15} /> Add family member
            </button>
          )}

          {/* Rotation legend */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Role tiers</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(TIER_BADGE) as [string, typeof TIER_BADGE[keyof typeof TIER_BADGE]][]).map(([key, b]) => (
                <div key={key} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: b.bg }}>
                  <span className="text-xs font-semibold" style={{ color: b.color }}>{b.label}</span>
                  <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                    {key === "c-suite" ? "18+" : key === "director" ? "14–17" : key === "manager" ? "11–13" : key === "team-lead" ? "8–10" : key === "associate" ? "5–7" : "2–4"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Role Card component ───────────────────────────────────────────────────────
function RoleCard({ member, completedChores, onToggle, choreKey, rotationWeek }: {
  member: FamilyMember & { currentRole: ReturnType<typeof assignRole> };
  completedChores: Record<string, boolean>;
  onToggle: (id: string, i: number) => void;
  choreKey: (id: string, i: number) => string;
  rotationWeek: number;
}) {
  const role = member.currentRole;
  const badge = TIER_BADGE[role.tier];
  const dept = DEPARTMENTS[role.department];
  const done = role.chores.filter((_, i) => !!completedChores[choreKey(member.id, i)]).length;

  return (
    <div className="card p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
              style={{ backgroundColor: badge.bg, color: badge.color }}>
              {member.name[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: "var(--color-charcoal)" }}>{member.name}</p>
              <p className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                {member.isAdult ? "Adult" : member.age !== null ? `Age ${member.age}` : "Age unknown"}
              </p>
            </div>
          </div>
          <p className="text-xs font-semibold" style={{ color: badge.color }}>{role.title}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-base">{role.emoji}</span>
          <p className="text-[10px] font-semibold mt-0.5" style={{ color: dept.color }}>{dept.label}</p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>This week</span>
          <span className="text-[10px]" style={{ color: "var(--color-sage)" }}>{done}/{role.chores.length}</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "var(--color-sand)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${role.chores.length ? (done / role.chores.length) * 100 : 0}%`, backgroundColor: "var(--color-sage)" }} />
        </div>
        <div className="space-y-1.5">
          {role.chores.map((chore, i) => {
            const key = choreKey(member.id, i);
            const isDone = !!completedChores[key];
            return (
              <div key={i} onClick={() => onToggle(member.id, i)}
                className="flex items-start gap-2 cursor-pointer group">
                <div className="w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                  style={{ backgroundColor: isDone ? "var(--color-sage)" : "transparent", borderColor: isDone ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 20%, transparent)" }}>
                  {isDone && <span style={{ color: "white", fontSize: "0.45rem" }}>✓</span>}
                </div>
                <span className="text-xs leading-snug" style={{ color: isDone ? "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" : "var(--color-charcoal)", textDecoration: isDone ? "line-through" : "none" }}>
                  {chore}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Perk */}
      <p className="text-[10px] italic border-t pt-2" style={{ borderColor: "var(--color-sand)", color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
        🎁 {role.perks}
      </p>
    </div>
  );
}

// ── Edit member row ───────────────────────────────────────────────────────────
function EditMemberRow({ member, onSave, onCancel }: {
  member: FamilyMember;
  onSave: (age: string, isAdult: boolean) => void;
  onCancel: () => void;
}) {
  const [age, setAge] = useState(member.age?.toString() ?? "");
  const [isAdult, setIsAdult] = useState(member.isAdult);
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{member.name}</span>
      <input className="input w-20" type="number" min={1} max={99} placeholder="Age" value={age}
        onChange={(e) => setAge(e.target.value)} />
      <label className="flex items-center gap-1.5 cursor-pointer select-none">
        <input type="checkbox" checked={isAdult} onChange={(e) => setIsAdult(e.target.checked)} className="w-4 h-4 rounded" />
        <span className="text-xs" style={{ color: "var(--color-charcoal)" }}>Adult</span>
      </label>
      <button onClick={() => onSave(age, isAdult)} className="btn-primary" style={{ padding: "0.35rem 0.875rem", fontSize: "0.75rem" }}>Save</button>
      <button onClick={onCancel} className="btn-secondary" style={{ padding: "0.35rem 0.875rem", fontSize: "0.75rem" }}>Cancel</button>
    </div>
  );
}
