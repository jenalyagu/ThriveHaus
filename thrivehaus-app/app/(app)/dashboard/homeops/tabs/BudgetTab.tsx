"use client";

import { useState } from "react";
import { BUDGET_ROUTINES, type BudgetCategory } from "@/lib/homeops";
import { Plus, Trash2 } from "lucide-react";

const CATEGORY_EMOJIS = ["🛒","🍕","⛽","🎨","🏠","📱","🛡️","✨","💊","🐾","☕","👕","🎓","🧸","💅","🎵"];

interface Goal {
  id: string;
  label: string;
  emoji: string;
  current: number;
  target: number;
}

export default function BudgetTab() {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: "b1", name: "Groceries",       emoji: "🛒", budgeted: 700,  spent: 0 },
    { id: "b2", name: "Dining Out",      emoji: "🍕", budgeted: 150,  spent: 0 },
    { id: "b3", name: "Gas & Transport", emoji: "⛽", budgeted: 200,  spent: 0 },
    { id: "b4", name: "Kids Activities", emoji: "🎨", budgeted: 100,  spent: 0 },
    { id: "b5", name: "Home & Supplies", emoji: "🏠", budgeted: 200,  spent: 0 },
    { id: "b6", name: "Subscriptions",   emoji: "📱", budgeted: 80,   spent: 0 },
    { id: "b7", name: "Emergency Fund",  emoji: "🛡️", budgeted: 300,  spent: 0 },
    { id: "b8", name: "Fun & Family",    emoji: "✨", budgeted: 150,  spent: 0 },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: "g1", label: "Emergency fund", emoji: "🛡️", current: 0, target: 3000 },
    { id: "g2", label: "Summer travel",  emoji: "✈️", current: 0, target: 1200 },
    { id: "g3", label: "Home projects",  emoji: "🏠", current: 0, target: 500  },
  ]);

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", emoji: "🛒", budgeted: "" });
  const [addingGoal, setAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ label: "", emoji: "🎯", current: "", target: "" });
  const [activeTab, setActiveTab] = useState<"budget" | "goals" | "routines">("budget");

  const totalBudgeted = categories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent    = categories.reduce((s, c) => s + c.spent,    0);
  const remaining     = totalBudgeted - totalSpent;
  const overBudget    = categories.filter((c) => c.spent > c.budgeted);

  function updateCat(id: string, field: "budgeted" | "spent", raw: string) {
    const val = parseFloat(raw) || 0;
    setCategories((cs) => cs.map((c) => c.id === id ? { ...c, [field]: val } : c));
  }

  function removeCat(id: string) {
    setCategories((cs) => cs.filter((c) => c.id !== id));
  }

  function addCategory() {
    if (!newCat.name.trim()) return;
    setCategories((cs) => [...cs, {
      id: `b${Date.now()}`,
      name: newCat.name,
      emoji: newCat.emoji,
      budgeted: parseFloat(newCat.budgeted) || 0,
      spent: 0,
    }]);
    setNewCat({ name: "", emoji: "🛒", budgeted: "" });
    setAddingCategory(false);
  }

  function updateGoal(id: string, field: "current" | "target", raw: string) {
    const val = parseFloat(raw) || 0;
    setGoals((gs) => gs.map((g) => g.id === id ? { ...g, [field]: val } : g));
  }

  function removeGoal(id: string) {
    setGoals((gs) => gs.filter((g) => g.id !== id));
  }

  function addGoal() {
    if (!newGoal.label.trim()) return;
    setGoals((gs) => [...gs, {
      id: `g${Date.now()}`,
      label: newGoal.label,
      emoji: newGoal.emoji,
      current: parseFloat(newGoal.current) || 0,
      target: parseFloat(newGoal.target) || 0,
    }]);
    setNewGoal({ label: "", emoji: "🎯", current: "", target: "" });
    setAddingGoal(false);
  }

  return (
    <div>
      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="font-serif text-2xl font-light" style={{ color: "var(--color-charcoal)" }}>
            ${totalBudgeted.toLocaleString()}
          </p>
          <p className="text-xs mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>Monthly budget</p>
        </div>
        <div className="card p-4 text-center">
          <p className="font-serif text-2xl font-light" style={{ color: totalSpent > totalBudgeted ? "var(--color-terracotta)" : "var(--color-sage)" }}>
            ${totalSpent.toLocaleString()}
          </p>
          <p className="text-xs mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>Spent so far</p>
        </div>
        <div className="card p-4 text-center">
          <p className="font-serif text-2xl font-light" style={{ color: remaining < 0 ? "var(--color-terracotta)" : "var(--color-ochre)" }}>
            {remaining < 0 ? "-" : ""}${Math.abs(remaining).toLocaleString()}
          </p>
          <p className="text-xs mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
            {remaining < 0 ? "Over budget" : "Remaining"}
          </p>
        </div>
      </div>

      {overBudget.length > 0 && (
        <div className="rounded-2xl p-4 mb-5 flex items-start gap-3 border"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 6%, transparent)", borderColor: "color-mix(in srgb, var(--color-terracotta) 20%, transparent)" }}>
          <span>⚠️</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-terracotta)" }}>
              {overBudget.map((c) => c.name).join(", ")} {overBudget.length === 1 ? "is" : "are"} over budget.
            </p>
            <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-terracotta) 70%, transparent)" }}>
              No shame — just awareness. Adjust next month or find one cut.
            </p>
          </div>
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex gap-1.5 mb-6">
        {(["budget", "goals", "routines"] as const).map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="text-sm font-medium px-4 py-2 rounded-full border transition-colors capitalize"
            style={{
              backgroundColor: activeTab === t ? "var(--color-forest)" : "transparent",
              color: activeTab === t ? "var(--color-cream)" : "var(--color-charcoal)",
              borderColor: activeTab === t ? "var(--color-forest)" : "var(--color-sand)",
            }}>
            {t === "budget" ? "Categories" : t === "goals" ? "Savings Goals" : "Budget Routines"}
          </button>
        ))}
      </div>

      {/* Categories calculator */}
      {activeTab === "budget" && (
        <div>
          <p className="text-xs mb-4 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
            Set your budget and enter what you&apos;ve spent. Progress bars update in real time.
          </p>

          {/* Header row */}
          <div className="grid grid-cols-12 gap-2 mb-2 px-2">
            <div className="col-span-4"><p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Category</p></div>
            <div className="col-span-3 text-right"><p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Budget</p></div>
            <div className="col-span-3 text-right"><p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Spent</p></div>
            <div className="col-span-2" />
          </div>

          <div className="space-y-2 mb-4">
            {categories.map((cat) => {
              const pct  = cat.budgeted > 0 ? Math.min((cat.spent / cat.budgeted) * 100, 100) : 0;
              const over = cat.spent > cat.budgeted;
              return (
                <div key={cat.id} className="card p-3">
                  <div className="grid grid-cols-12 gap-2 items-center mb-2">
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-base">{cat.emoji}</span>
                      <span className="text-sm font-medium truncate" style={{ color: "var(--color-charcoal)" }}>{cat.name}</span>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                        <input
                          type="number" min={0}
                          value={cat.budgeted || ""}
                          onChange={(e) => updateCat(cat.id, "budgeted", e.target.value)}
                          className="w-full text-right text-sm rounded-lg border py-1.5 pr-2 pl-5 outline-none focus:border-current"
                          style={{ borderColor: "var(--color-sand)", color: "var(--color-charcoal)", backgroundColor: "white" }}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                        <input
                          type="number" min={0}
                          value={cat.spent || ""}
                          onChange={(e) => updateCat(cat.id, "spent", e.target.value)}
                          className="w-full text-right text-sm rounded-lg border py-1.5 pr-2 pl-5 outline-none focus:border-current"
                          style={{ borderColor: over ? "var(--color-terracotta)" : "var(--color-sand)", color: over ? "var(--color-terracotta)" : "var(--color-charcoal)", backgroundColor: "white" }}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button onClick={() => removeCat(cat.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                        style={{ color: "color-mix(in srgb, var(--color-charcoal) 30%, transparent)" }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-sand)" }}>
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: over ? "var(--color-terracotta)" : pct > 80 ? "var(--color-ochre)" : "var(--color-sage)" }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>{pct.toFixed(0)}% used</span>
                    <span className="text-[10px]" style={{ color: over ? "var(--color-terracotta)" : "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>
                      {over ? `$${(cat.spent - cat.budgeted).toFixed(0)} over` : `$${(cat.budgeted - cat.spent).toFixed(0)} left`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add category */}
          {addingCategory ? (
            <div className="card p-4 mb-4">
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-1">
                  <label className="label text-[10px]">Icon</label>
                  <select className="input text-center px-0" value={newCat.emoji} onChange={(e) => setNewCat((n) => ({ ...n, emoji: e.target.value }))}>
                    {CATEGORY_EMOJIS.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div className="col-span-5">
                  <label className="label text-[10px]">Category name</label>
                  <input className="input" placeholder="e.g. Clothing" value={newCat.name} onChange={(e) => setNewCat((n) => ({ ...n, name: e.target.value }))} />
                </div>
                <div className="col-span-3">
                  <label className="label text-[10px]">Monthly budget</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                    <input className="input pl-5" type="number" placeholder="0" value={newCat.budgeted} onChange={(e) => setNewCat((n) => ({ ...n, budgeted: e.target.value }))} />
                  </div>
                </div>
                <div className="col-span-3 flex gap-2">
                  <button onClick={addCategory} className="btn-primary flex-1" style={{ padding: "0.5rem" }}>Add</button>
                  <button onClick={() => setAddingCategory(false)} className="btn-secondary flex-1" style={{ padding: "0.5rem" }}>✕</button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingCategory(true)} className="btn-secondary w-full gap-2">
              <Plus size={15} /> Add category
            </button>
          )}
        </div>
      )}

      {/* Savings Goals */}
      {activeTab === "goals" && (
        <div>
          <p className="text-xs mb-4 italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
            Track progress toward your family&apos;s savings goals.
          </p>
          <div className="space-y-4 mb-5">
            {goals.map((goal) => {
              const pct = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
              return (
                <div key={goal.id} className="card p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{goal.emoji}</span>
                      <span className="font-serif text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{goal.label}</span>
                    </div>
                    <button onClick={() => removeGoal(goal.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                      style={{ color: "color-mix(in srgb, var(--color-charcoal) 30%, transparent)" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="label text-[10px]">Saved so far</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                        <input type="number" min={0}
                          value={goal.current || ""}
                          onChange={(e) => updateGoal(goal.id, "current", e.target.value)}
                          className="input pl-5" placeholder="0" />
                      </div>
                    </div>
                    <div>
                      <label className="label text-[10px]">Goal target</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                        <input type="number" min={0}
                          value={goal.target || ""}
                          onChange={(e) => updateGoal(goal.id, "target", e.target.value)}
                          className="input pl-5" placeholder="0" />
                      </div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden mb-1" style={{ backgroundColor: "var(--color-sand)" }}>
                    <div className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? "var(--color-sage)" : "var(--color-ochre)" }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
                      ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: pct >= 100 ? "var(--color-sage)" : "var(--color-ochre)" }}>
                      {pct >= 100 ? "🎉 Goal reached!" : `${pct.toFixed(0)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {addingGoal ? (
            <div className="card p-5">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="col-span-2 grid grid-cols-6 gap-2">
                  <div className="col-span-1">
                    <label className="label text-[10px]">Icon</label>
                    <select className="input text-center px-0" value={newGoal.emoji} onChange={(e) => setNewGoal((n) => ({ ...n, emoji: e.target.value }))}>
                      {["🎯","🏠","✈️","🛡️","🎓","🚗","💍","🌴","🐶","💻"].map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                  <div className="col-span-5">
                    <label className="label text-[10px]">Goal name</label>
                    <input className="input" placeholder="e.g. New car" value={newGoal.label} onChange={(e) => setNewGoal((n) => ({ ...n, label: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="label text-[10px]">Saved so far</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                    <input className="input pl-5" type="number" placeholder="0" value={newGoal.current} onChange={(e) => setNewGoal((n) => ({ ...n, current: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="label text-[10px]">Target amount</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>$</span>
                    <input className="input pl-5" type="number" placeholder="0" value={newGoal.target} onChange={(e) => setNewGoal((n) => ({ ...n, target: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={addGoal} className="btn-primary">Add goal</button>
                <button onClick={() => setAddingGoal(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingGoal(true)} className="btn-secondary w-full gap-2">
              <Plus size={15} /> Add savings goal
            </button>
          )}
        </div>
      )}

      {/* Routines */}
      {activeTab === "routines" && (
        <div className="space-y-3">
          {BUDGET_ROUTINES.map((r) => (
            <div key={r.title} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>{r.title}</p>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>{r.description}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, transparent)", color: "var(--color-forest)" }}>
                  {r.impact}
                </span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider mt-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>{r.frequency}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
