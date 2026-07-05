"use client";

import { useState } from "react";
import { DEFAULT_MEALS, DEFAULT_GROCERY, type DayMeals, type GroceryItem } from "@/lib/homeops";
import { RefreshCw } from "lucide-react";

type MealKey = "breakfast" | "lunch" | "dinner" | "snack";
type TabKey = "plan" | "batch" | "grocery";

interface BatchSession { label: string; tasks: string[] }
interface Anchor { ingredient: string; usedIn: string[] }
interface BatchPlan {
  meals: DayMeals[];
  batchSessions: BatchSession[];
  anchors: Anchor[];
  tip: string;
}

interface MealApproach {
  philosophy: string;
  weeklyAnchor: string;
  quickWins: string[];
}

interface Props {
  mealApproach: MealApproach | null;
}

export default function MealsTab({ mealApproach }: Props) {
  const [tab, setTab] = useState<TabKey>("plan");
  const [meals, setMeals] = useState<DayMeals[]>(DEFAULT_MEALS);
  const [editing, setEditing] = useState<{ day: string; meal: MealKey } | null>(null);
  const [editVal, setEditVal] = useState("");
  const [regenerating, setRegenerating] = useState<{ day: string; meal: MealKey } | null>(null);
  const [grocery, setGrocery] = useState<GroceryItem[]>(DEFAULT_GROCERY);
  const [batchPlan, setBatchPlan] = useState<BatchPlan | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState("");

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const categories = Array.from(new Set(grocery.map((g) => g.category)));
  const checkedCount = grocery.filter((g) => g.checked).length;

  function startEdit(day: string, meal: MealKey, current: string) {
    setEditing({ day, meal });
    setEditVal(current);
  }

  function commitEdit() {
    if (!editing) return;
    setMeals((ms) => ms.map((m) => m.day === editing.day ? { ...m, [editing.meal]: editVal } : m));
    setEditing(null);
  }

  const dietaryContext = mealApproach?.philosophy ? [mealApproach.philosophy] : [];

  async function regenerateMeal(day: string, meal: MealKey) {
    setRegenerating({ day, meal });
    try {
      const currentMeals = meals.flatMap((d) => [d.breakfast, d.lunch, d.dinner, d.snack]);
      const res = await fetch("/api/meals/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealType: meal, day, currentMeals, preferences: dietaryContext }),
      });
      if (res.ok) {
        const { meal: suggested } = await res.json();
        setMeals((ms) => ms.map((m) => m.day === day ? { ...m, [meal]: suggested } : m));
      }
    } finally {
      setRegenerating(null);
    }
  }

  async function generateBatchPlan() {
    setBatchLoading(true);
    setBatchError("");
    try {
      const res = await fetch("/api/meals/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meals, preferences: dietaryContext }),
      });
      if (res.ok) {
        const plan: BatchPlan = await res.json();
        setBatchPlan(plan);
      } else {
        setBatchError("Couldn't generate batch plan. Try again.");
      }
    } catch {
      setBatchError("Network error. Try again.");
    } finally {
      setBatchLoading(false);
    }
  }

  function applyBatchMeals() {
    if (batchPlan?.meals) setMeals(batchPlan.meals);
    setTab("plan");
  }

  function toggleItem(id: string) {
    setGrocery((gs) => gs.map((g) => g.id === id ? { ...g, checked: !g.checked } : g));
  }

  function addItem(name: string, category: string) {
    if (!name.trim()) return;
    setGrocery((gs) => [...gs, { id: `g${Date.now()}`, name, category, checked: false }]);
  }

  const TABS: { key: TabKey; label: string }[] = [
    { key: "plan", label: "Weekly Plan" },
    { key: "batch", label: "🍳 Batch Cook" },
    { key: "grocery", label: `Grocery (${checkedCount}/${grocery.length})` },
  ];

  return (
    <div>
      {mealApproach && (
        <div className="rounded-2xl p-4 mb-5 flex items-start gap-3 border"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 6%, transparent)", borderColor: "color-mix(in srgb, var(--color-forest) 15%, transparent)" }}>
          <span className="text-lg shrink-0">🗺️</span>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-forest)" }}>Personalized by your Family Blueprint</p>
            <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>{mealApproach.philosophy}</p>
            {mealApproach.quickWins?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {mealApproach.quickWins.map((win, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 15%, transparent)", color: "var(--color-forest)" }}>
                    {win}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="text-sm font-medium px-4 py-2 rounded-full border transition-colors"
            style={{
              backgroundColor: tab === t.key ? "var(--color-forest)" : "transparent",
              color: tab === t.key ? "var(--color-cream)" : "var(--color-charcoal)",
              borderColor: tab === t.key ? "var(--color-forest)" : "var(--color-sand)",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── WEEKLY PLAN ── */}
      {tab === "plan" && (
        <>
          <div className="rounded-2xl p-4 mb-5 flex items-start gap-3"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 10%, transparent)" }}>
            <span className="text-lg shrink-0">💡</span>
            <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 70%, transparent)" }}>
              <strong style={{ color: "var(--color-charcoal)" }}>Click</strong> any meal to edit it.{" "}
              <strong style={{ color: "var(--color-charcoal)" }}>Hit the refresh icon</strong> to get an AI suggestion.{" "}
              Want the whole week optimized for batch cooking?{" "}
              <button onClick={() => setTab("batch")} className="underline font-medium" style={{ color: "var(--color-terracotta)" }}>
                Try Batch Cook →
              </button>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {meals.map((day) => {
              const isToday = day.day === todayName;
              return (
                <div key={day.day} className="card p-4 border-t-4"
                  style={{ borderTopColor: isToday ? "var(--color-terracotta)" : "var(--color-sand)" }}>
                  <p className="font-serif text-sm font-medium mb-3 flex items-center gap-2" style={{ color: "var(--color-charcoal)" }}>
                    {day.day}
                    {isToday && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-terracotta)", color: "white" }}>Today</span>}
                  </p>
                  {(["breakfast", "lunch", "dinner", "snack"] as const).map((meal) => {
                    const isEditing = editing?.day === day.day && editing?.meal === meal;
                    const isRegen = regenerating?.day === day.day && regenerating?.meal === meal;
                    return (
                      <div key={meal} className="mb-2 group">
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>{meal}</p>
                        {isEditing ? (
                          <input
                            autoFocus
                            className="w-full text-xs rounded-lg px-2 py-1 border outline-none"
                            style={{ borderColor: "var(--color-terracotta)", color: "var(--color-charcoal)", backgroundColor: "white" }}
                            value={editVal}
                            onChange={(e) => setEditVal(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditing(null); }}
                          />
                        ) : (
                          <div className="flex items-center gap-1">
                            <p
                              className="flex-1 text-xs rounded px-1 -mx-1 cursor-pointer transition-colors hover:bg-black/5"
                              style={{ color: isRegen ? "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" : "var(--color-charcoal)" }}
                              onClick={() => !isRegen && startEdit(day.day, meal, day[meal])}
                            >
                              {isRegen ? "Thinking…" : day[meal]}
                            </p>
                            <button
                              onClick={() => !isRegen && regenerateMeal(day.day, meal)}
                              disabled={!!isRegen}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-black/5 shrink-0"
                              style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}
                              title="Regenerate with AI"
                            >
                              <RefreshCw size={10} className={isRegen ? "animate-spin" : ""} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── BATCH COOK ── */}
      {tab === "batch" && (
        <div>
          <div className="rounded-2xl p-5 mb-6 border"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 6%, transparent)", borderColor: "color-mix(in srgb, var(--color-forest) 15%, transparent)" }}>
            <h3 className="font-serif text-base font-medium mb-1" style={{ color: "var(--color-forest)" }}>Cook once, eat all week</h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
              AI will redesign your meal plan around 2–3 anchor proteins or grains you prep in one big session. Same ingredients, less cooking, zero decision fatigue.
            </p>
            <button onClick={generateBatchPlan} disabled={batchLoading}
              className="btn-primary gap-2">
              {batchLoading
                ? <><RefreshCw size={14} className="animate-spin" /> Optimizing…</>
                : "✨ Generate batch plan"}
            </button>
            {batchError && <p className="text-xs mt-2" style={{ color: "var(--color-terracotta)" }}>{batchError}</p>}
          </div>

          {batchPlan && (
            <>
              {/* Tip */}
              <div className="rounded-2xl px-4 py-3 mb-5 flex items-start gap-2"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 10%, transparent)" }}>
                <span>💛</span>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{batchPlan.tip}</p>
              </div>

              {/* Batch Sessions */}
              {batchPlan.batchSessions?.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-serif text-sm font-semibold mb-3" style={{ color: "var(--color-charcoal)" }}>Prep sessions</h4>
                  <div className="space-y-3">
                    {batchPlan.batchSessions.map((session, i) => (
                      <div key={i} className="card p-4">
                        <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-forest)" }}>{session.label}</p>
                        <ul className="space-y-1">
                          {session.tasks.map((task, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-charcoal)" }}>
                              <span style={{ color: "var(--color-sage)" }}>✓</span> {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Anchor ingredients */}
              {batchPlan.anchors?.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-serif text-sm font-semibold mb-3" style={{ color: "var(--color-charcoal)" }}>Anchor ingredients</h4>
                  <div className="space-y-2">
                    {batchPlan.anchors.map((anchor, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl"
                        style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 8%, transparent)" }}>
                        <span className="text-base shrink-0">🥩</span>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{anchor.ingredient}</p>
                          <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
                            Used in: {anchor.usedIn.join(" · ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New meal plan preview */}
              <div className="mb-6">
                <h4 className="font-serif text-sm font-semibold mb-3" style={{ color: "var(--color-charcoal)" }}>Optimized meal plan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {batchPlan.meals.map((day) => (
                    <div key={day.day} className="card p-4">
                      <p className="font-serif text-xs font-semibold mb-2" style={{ color: "var(--color-charcoal)" }}>{day.day}</p>
                      {(["breakfast", "lunch", "dinner", "snack"] as const).map((meal) => (
                        <div key={meal} className="mb-1.5">
                          <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>{meal}</p>
                          <p className="text-xs" style={{ color: "var(--color-charcoal)" }}>{day[meal]}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={applyBatchMeals} className="btn-primary">
                  Apply this plan
                </button>
                <button onClick={generateBatchPlan} disabled={batchLoading} className="btn-secondary gap-2">
                  {batchLoading ? <><RefreshCw size={13} className="animate-spin" /> Regenerating…</> : "Regenerate"}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── GROCERY ── */}
      {tab === "grocery" && (
        <div className="max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>{checkedCount} of {grocery.length} items</p>
            <div className="h-1.5 w-32 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-sand)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${grocery.length ? (checkedCount / grocery.length) * 100 : 0}%`, backgroundColor: "var(--color-sage)" }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>{cat}</p>
              <div className="space-y-1.5">
                {grocery.filter((g) => g.category === cat).map((item) => (
                  <div key={item.id} onClick={() => toggleItem(item.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all"
                    style={{
                      backgroundColor: item.checked ? "color-mix(in srgb, var(--color-sage) 8%, transparent)" : "white",
                      borderColor: item.checked ? "color-mix(in srgb, var(--color-sage) 20%, transparent)" : "color-mix(in srgb, var(--color-charcoal) 8%, transparent)",
                    }}>
                    <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
                      style={{ backgroundColor: item.checked ? "var(--color-sage)" : "transparent", borderColor: item.checked ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" }}>
                      {item.checked && <span style={{ color: "white", fontSize: "0.5rem" }}>✓</span>}
                    </div>
                    <span className="text-sm" style={{ color: item.checked ? "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" : "var(--color-charcoal)", textDecoration: item.checked ? "line-through" : "none" }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <AddGroceryItem onAdd={addItem} />
        </div>
      )}
    </div>
  );
}

function AddGroceryItem({ onAdd }: { onAdd: (name: string, category: string) => void }) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Produce");
  return (
    <div className="flex gap-2 mt-4">
      <input className="input flex-1" placeholder="Add item…" value={name} onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { onAdd(name, cat); setName(""); } }} />
      <select className="input w-28" value={cat} onChange={(e) => setCat(e.target.value)}>
        {["Produce", "Protein", "Dairy", "Pantry", "Bread", "Other"].map((c) => <option key={c}>{c}</option>)}
      </select>
      <button onClick={() => { onAdd(name, cat); setName(""); }} className="btn-primary" style={{ padding: "0.5rem 0.875rem" }}>+</button>
    </div>
  );
}
