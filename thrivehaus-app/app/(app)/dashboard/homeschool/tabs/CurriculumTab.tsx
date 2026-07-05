"use client";

import { useState } from "react";
import { CURRICULUM_LIBRARY, CURRICULUM_CATEGORIES } from "@/lib/homeschool";
import { RefreshCw, BookOpen, Save, Check } from "lucide-react";

interface LessonBlock {
  subject: string;
  activity: string;
  duration: string;
}

interface DayFlow {
  day: string;
  blocks: LessonBlock[];
}

interface SubjectLesson {
  title: string;
  description: string;
  duration: string;
  materials: string[];
  days: string[];
}

interface Subject {
  name: string;
  emoji: string;
  color: string;
  weeklyGoal: string;
  lessons: SubjectLesson[];
}

export interface LessonPlan {
  theme: string;
  learningStyle: string;
  styleNote: string;
  subjects: Subject[];
  dailyFlow: DayFlow[];
  weeklyAnchor: string;
  resourceSpotlight: { title: string; why: string };
  encouragement: string;
}

const COLOR_MAP: Record<string, string> = {
  terracotta: "var(--color-terracotta)",
  sage:       "var(--color-sage)",
  ochre:      "var(--color-ochre)",
  forest:     "var(--color-forest)",
};
const BG_MAP: Record<string, string> = {
  terracotta: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)",
  sage:       "color-mix(in srgb, var(--color-sage) 10%, transparent)",
  ochre:      "color-mix(in srgb, var(--color-ochre) 10%, transparent)",
  forest:     "color-mix(in srgb, var(--color-forest) 10%, transparent)",
};

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

interface Props {
  familyId: string;
  children: { name: string; age?: number }[];
  learningStyle: string | null;
  familyName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blueprintContent: any | null;
  plan: LessonPlan | null;
  onPlanChange: (plan: LessonPlan) => void;
}

type View    = "planner" | "library";
type PlanView = "subjects" | "calendar" | "schedule";
type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function CurriculumTab({ familyId, children, learningStyle, familyName, blueprintContent, plan, onPlanChange }: Props) {
  const [view, setView] = useState<View>("planner");
  const [planView, setPlanView] = useState<PlanView>("subjects");
  const [loading, setLoading] = useState(false);
  const [genError, setGenError] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(plan?.subjects?.[0]?.name ?? null);
  const [category, setCategory] = useState("all");

  const style = learningStyle || "Eclectic";
  const hasBlueprintContext = !!blueprintContent;

  async function generatePlan() {
    setLoading(true);
    setGenError("");
    try {
      const res = await fetch("/api/homeschool/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ children, learningStyle: style, familyName, blueprintContent }),
      });
      if (res.ok) {
        const data: LessonPlan = await res.json();
        onPlanChange(data);
        setExpandedSubject(data.subjects?.[0]?.name ?? null);
        setSaveStatus("idle");
      } else {
        const body = await res.json().catch(() => ({}));
        setGenError(body.error || `Generation failed (${res.status}). Try again.`);
      }
    } catch {
      setGenError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function savePlan() {
    if (!plan) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/homeschool/save-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familyId, plan }),
      });
      setSaveStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    }
  }

  const filtered = category === "all"
    ? CURRICULUM_LIBRARY
    : CURRICULUM_LIBRARY.filter((c) => c.category === category);

  return (
    <div>
      {/* Top nav */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setView("planner")}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-colors"
          style={{
            backgroundColor: view === "planner" ? "var(--color-forest)" : "transparent",
            color: view === "planner" ? "var(--color-cream)" : "var(--color-charcoal)",
            borderColor: view === "planner" ? "var(--color-forest)" : "var(--color-sand)",
          }}>
          ✨ AI Lesson Planner
          {plan && view !== "planner" && (
            <span className="inline-flex w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-sage)" }} />
          )}
        </button>
        <button onClick={() => setView("library")}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-colors"
          style={{
            backgroundColor: view === "library" ? "var(--color-forest)" : "transparent",
            color: view === "library" ? "var(--color-cream)" : "var(--color-charcoal)",
            borderColor: view === "library" ? "var(--color-forest)" : "var(--color-sand)",
          }}>
          <BookOpen size={13} /> Curriculum Library
        </button>
      </div>

      {/* ── AI LESSON PLANNER ── */}
      {view === "planner" && (
        <div>
          {/* Context + action bar */}
          <div className="rounded-2xl p-5 mb-6 border"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 5%, transparent)", borderColor: "color-mix(in srgb, var(--color-forest) 12%, transparent)" }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="font-serif text-base font-medium mb-2" style={{ color: "var(--color-forest)" }}>
                  {familyName} Weekly Lesson Plan
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, transparent)", color: "var(--color-forest)" }}>
                    📚 {style}
                  </span>
                  {children.map((c) => (
                    <span key={c.name} className="text-xs px-3 py-1 rounded-full"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 12%, transparent)", color: "var(--color-charcoal)" }}>
                      👧 {c.name}{c.age ? `, ${c.age}` : ""}
                    </span>
                  ))}
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: hasBlueprintContext
                        ? "color-mix(in srgb, var(--color-sage) 12%, transparent)"
                        : "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",
                      color: hasBlueprintContext ? "var(--color-forest)" : "var(--color-terracotta)",
                    }}>
                    {hasBlueprintContext ? "✓ Blueprint personalized" : "⚠ No blueprint yet"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {plan && (
                  <button onClick={savePlan} disabled={saveStatus === "saving" || saveStatus === "saved"}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-colors"
                    style={{
                      borderColor: saveStatus === "saved" ? "var(--color-sage)" : "var(--color-sand)",
                      color: saveStatus === "saved" ? "var(--color-sage)" : saveStatus === "error" ? "var(--color-terracotta)" : "var(--color-charcoal)",
                      backgroundColor: "white",
                    }}>
                    {saveStatus === "saving" ? <><RefreshCw size={13} className="animate-spin" /> Saving…</>
                      : saveStatus === "saved"  ? <><Check size={13} /> Saved</>
                      : saveStatus === "error"  ? "Save failed"
                      : <><Save size={13} /> Save plan</>}
                  </button>
                )}
                <button onClick={generatePlan} disabled={loading} className="btn-primary gap-2">
                  {loading
                    ? <><RefreshCw size={14} className="animate-spin" /> Generating…</>
                    : plan ? <><RefreshCw size={14} /> Regenerate</> : "✨ Generate plan"}
                </button>
              </div>
            </div>
            {genError && <p className="text-xs mt-3" style={{ color: "var(--color-terracotta)" }}>{genError}</p>}
          </div>

          {/* Loading */}
          {loading && !plan && (
            <div className="text-center py-16">
              <RefreshCw size={28} className="animate-spin mx-auto mb-4" style={{ color: "var(--color-sage)" }} />
              <p className="font-serif text-lg mb-1" style={{ color: "var(--color-charcoal)" }}>Designing your week…</p>
              <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                Weaving your family&apos;s values into every lesson.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !plan && (
            <div className="text-center py-16 border-2 border-dashed rounded-3xl"
              style={{ borderColor: "var(--color-sand)" }}>
              <p className="text-4xl mb-4">📖</p>
              <p className="font-serif text-lg mb-2" style={{ color: "var(--color-charcoal)" }}>Your lesson plan lives here</p>
              <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                Hit Generate to get a full week of {style}-style lessons built around {familyName}&apos;s values and your children&apos;s ages.
              </p>
              <button onClick={generatePlan} className="btn-primary gap-2">✨ Generate this week&apos;s plan</button>
            </div>
          )}

          {/* Plan output */}
          {plan && (
            <div>
              {/* Theme banner */}
              <div className="rounded-2xl p-5 mb-6"
                style={{ background: "linear-gradient(135deg, var(--color-forest), color-mix(in srgb, var(--color-forest) 70%, var(--color-sage)))", color: "var(--color-cream)" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-60">This week&apos;s theme</p>
                <p className="font-serif text-2xl font-light mb-2">{plan.theme}</p>
                <p className="text-sm opacity-75">{plan.styleNote}</p>
              </div>

              {/* Plan view toggle */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {(["subjects", "calendar", "schedule"] as const).map((v) => (
                  <button key={v} onClick={() => setPlanView(v)}
                    className="text-sm font-medium px-4 py-2 rounded-full border transition-colors"
                    style={{
                      backgroundColor: planView === v ? "var(--color-charcoal)" : "transparent",
                      color: planView === v ? "white" : "var(--color-charcoal)",
                      borderColor: planView === v ? "var(--color-charcoal)" : "var(--color-sand)",
                    }}>
                    {v === "subjects" ? "By Subject" : v === "calendar" ? "📅 Weekly Calendar" : "Daily Schedule"}
                  </button>
                ))}
              </div>

              {/* ── BY SUBJECT ── */}
              {planView === "subjects" && (
                <div className="space-y-3 mb-6">
                  {plan.subjects.map((subj) => {
                    const accent = COLOR_MAP[subj.color] || COLOR_MAP.sage;
                    const bg     = BG_MAP[subj.color] || BG_MAP.sage;
                    const open   = expandedSubject === subj.name;
                    return (
                      <div key={subj.name} className="card overflow-hidden">
                        <button onClick={() => setExpandedSubject(open ? null : subj.name)}
                          className="w-full flex items-center gap-3 px-5 py-4 text-left">
                          <span className="text-xl shrink-0">{subj.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{subj.name}</p>
                            {!open && (
                              <p className="text-xs mt-0.5 truncate" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                                {subj.weeklyGoal}
                              </p>
                            )}
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                            style={{ backgroundColor: bg, color: accent }}>
                            {subj.lessons.length} lesson{subj.lessons.length !== 1 ? "s" : ""}
                          </span>
                          <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 30%, transparent)" }}>
                            {open ? "▲" : "▼"}
                          </span>
                        </button>
                        {open && (
                          <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--color-sand)" }}>
                            <p className="text-xs mt-3 mb-4 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
                              Goal: {subj.weeklyGoal}
                            </p>
                            <div className="space-y-4">
                              {subj.lessons.map((lesson, i) => (
                                <div key={i} className="rounded-xl p-4" style={{ backgroundColor: bg }}>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{lesson.title}</p>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                                      style={{ backgroundColor: accent, color: "white" }}>
                                      {lesson.duration}
                                    </span>
                                  </div>
                                  <p className="text-xs leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
                                    {lesson.description}
                                  </p>
                                  <div className="flex items-center justify-between gap-3 flex-wrap">
                                    {lesson.materials.length > 0 && (
                                      <div className="flex flex-wrap gap-1.5">
                                        {lesson.materials.map((m, j) => (
                                          <span key={j} className="text-[10px] px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "var(--color-charcoal)" }}>
                                            {m}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    <div className="flex gap-1">
                                      {lesson.days.map((d) => (
                                        <span key={d} className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                          style={{ backgroundColor: accent, color: "white", opacity: 0.85 }}>
                                          {d.slice(0, 3)}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── WEEKLY CALENDAR GRID ── */}
              {planView === "calendar" && (
                <div className="mb-6 overflow-x-auto -mx-8 px-8">
                  {/* Header row */}
                  <div className="min-w-[640px]">
                    <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: `repeat(${DAYS.length}, 1fr)` }}>
                      {DAYS.map((d) => (
                        <div key={d} className="text-center py-2 rounded-xl"
                          style={{ backgroundColor: "var(--color-sand)" }}>
                          <p className="text-xs font-semibold" style={{ color: "var(--color-charcoal)" }}>{d}</p>
                        </div>
                      ))}
                    </div>

                    {/* Build a matrix: for each day, find blocks */}
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${DAYS.length}, 1fr)` }}>
                      {DAYS.map((day) => {
                        const dayFlow = plan.dailyFlow.find((df) => df.day === day);
                        const blocks  = dayFlow?.blocks ?? [];
                        return (
                          <div key={day} className="space-y-1.5">
                            {blocks.map((block, i) => {
                              const subj   = plan.subjects.find((s) => s.name === block.subject);
                              const accent = subj ? (COLOR_MAP[subj.color] || COLOR_MAP.sage) : "var(--color-sage)";
                              const bg     = subj ? (BG_MAP[subj.color] || BG_MAP.sage) : BG_MAP.sage;
                              return (
                                <div key={i} className="rounded-xl px-2.5 py-2.5"
                                  style={{ backgroundColor: bg, borderLeft: `3px solid ${accent}` }}>
                                  <div className="flex items-center gap-1 mb-1">
                                    <span className="text-xs">{subj?.emoji || "📖"}</span>
                                    <span className="text-[10px] font-semibold truncate" style={{ color: accent }}>
                                      {block.subject}
                                    </span>
                                  </div>
                                  <p className="text-[10px] leading-snug" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
                                    {block.activity}
                                  </p>
                                  <p className="text-[9px] mt-1 font-semibold" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>
                                    {block.duration}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── DAILY SCHEDULE (list) ── */}
              {planView === "schedule" && (
                <div className="space-y-4 mb-6">
                  {plan.dailyFlow.map((day) => (
                    <div key={day.day} className="card p-5">
                      <p className="font-serif text-sm font-semibold mb-3" style={{ color: "var(--color-charcoal)" }}>{day.day}</p>
                      <div className="space-y-2">
                        {day.blocks.map((block, i) => {
                          const subj   = plan.subjects.find((s) => s.name === block.subject);
                          const accent = subj ? (COLOR_MAP[subj.color] || COLOR_MAP.sage) : "var(--color-sage)";
                          const bg     = subj ? (BG_MAP[subj.color] || BG_MAP.sage) : BG_MAP.sage;
                          return (
                            <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-xl" style={{ backgroundColor: bg }}>
                              <span className="text-base shrink-0">{subj?.emoji || "📖"}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold" style={{ color: accent }}>{block.subject}</span>
                                  <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>· {block.duration}</span>
                                </div>
                                <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>{block.activity}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                    ⚓ Weekly Anchor Activity
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{plan.weeklyAnchor}</p>
                </div>
                <div className="card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                    📚 Resource Spotlight
                  </p>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-charcoal)" }}>{plan.resourceSpotlight.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>{plan.resourceSpotlight.why}</p>
                </div>
              </div>

              <div className="rounded-2xl px-5 py-4 flex items-start gap-3"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--color-ochre) 20%, transparent)" }}>
                <span className="text-lg shrink-0">💛</span>
                <p className="text-sm italic leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{plan.encouragement}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CURRICULUM LIBRARY ── */}
      {view === "library" && (
        <div>
          <div className="flex gap-2 flex-wrap mb-5">
            {CURRICULUM_CATEGORIES.map((cat) => (
              <button key={cat.key} onClick={() => setCategory(cat.key)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all"
                style={{
                  backgroundColor: category === cat.key ? "var(--color-forest)" : "transparent",
                  color: category === cat.key ? "var(--color-cream)" : "var(--color-charcoal)",
                  borderColor: category === cat.key ? "var(--color-forest)" : "var(--color-sand)",
                }}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="rounded-2xl p-4 mb-5 flex items-start gap-3"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 10%, transparent)" }}>
            <span className="text-lg shrink-0">🌿</span>
            <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-forest) 80%, transparent)" }}>
              <strong>Educator-curated for homeschool families.</strong> Preview before purchasing. What works for one child may not suit another — trust your instincts.
            </p>
          </div>
          <p className="text-xs mb-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
            {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="card p-5 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-serif text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{item.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 12%, transparent)", color: "var(--color-ochre)" }}>
                    {item.cost}
                  </span>
                </div>
                <p className="text-xs mb-2 font-medium" style={{ color: "var(--color-sage)" }}>{item.style}</p>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                  {item.description}
                </p>
                <p className="text-xs mt-3" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Ages {item.ages}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 text-center border-t" style={{ borderColor: "var(--color-sand)" }}>
            <p className="text-sm mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
              Know a great resource we should add?
            </p>
            <a href="mailto:hello@thrivehaus.co" className="text-sm font-semibold transition-opacity hover:opacity-75"
              style={{ color: "var(--color-terracotta)" }}>
              Suggest a curriculum →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
