"use client";

import { useState } from "react";
import { DEFAULT_RESET_TASKS, type ResetTask } from "@/lib/homeops";

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Home:     { bg: "color-mix(in srgb, var(--color-sage) 12%, transparent)",      color: "var(--color-forest)" },
  Laundry:  { bg: "color-mix(in srgb, #3B82F6 8%, transparent)",                 color: "#3B82F6" },
  Meals:    { bg: "color-mix(in srgb, var(--color-ochre) 12%, transparent)",     color: "var(--color-ochre)" },
  Calendar: { bg: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)",color: "var(--color-terracotta)" },
  Budget:   { bg: "color-mix(in srgb, #7B6EA0 10%, transparent)",               color: "#7B6EA0" },
  Family:   { bg: "color-mix(in srgb, var(--color-sand) 80%, transparent)",      color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" },
};

export default function ResetTab() {
  const [tasks, setTasks] = useState<ResetTask[]>(DEFAULT_RESET_TASKS);
  const [intention, setIntention] = useState("");

  const done  = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const totalMinutes = tasks.filter((t) => !t.completed).reduce((s, t) => s + (t.estimatedMinutes || 0), 0);
  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  function toggle(id: string) {
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function resetAll() {
    setTasks((ts) => ts.map((t) => ({ ...t, completed: false })));
  }

  return (
    <div>
      {/* Progress card */}
      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-serif text-3xl font-light" style={{ color: "var(--color-charcoal)" }}>{done}/{total}</p>
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>tasks complete</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-2xl font-light" style={{ color: "var(--color-ochre)" }}>{totalMinutes}</p>
            <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>minutes remaining</p>
          </div>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-sand)" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${total ? (done / total) * 100 : 0}%`, background: "linear-gradient(to right, var(--color-sage), color-mix(in srgb, var(--color-sage) 75%, var(--color-forest)))" }} />
        </div>
        {done === total && total > 0 && (
          <div className="mt-3 rounded-xl p-3 text-center"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 10%, transparent)" }}>
            <p className="font-serif text-base" style={{ color: "var(--color-forest)" }}>🎉 Reset complete! Your week is ready.</p>
          </div>
        )}
        {done > 0 && (
          <button onClick={resetAll} className="text-xs mt-3 transition-opacity hover:opacity-60"
            style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
            Reset all
          </button>
        )}
      </div>

      {/* Category groups */}
      {categories.map((cat) => {
        const catTasks = tasks.filter((t) => t.category === cat);
        const catDone  = catTasks.filter((t) => t.completed).length;
        const style    = CATEGORY_COLORS[cat] || { bg: "color-mix(in srgb, var(--color-sand) 60%, transparent)", color: "var(--color-charcoal)" };
        return (
          <div key={cat} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: style.bg, color: style.color }}>{cat}</span>
              <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>{catDone}/{catTasks.length} done</span>
            </div>
            <div className="space-y-2">
              {catTasks.map((task) => (
                <div key={task.id} onClick={() => toggle(task.id)}
                  className="card p-4 flex items-start gap-4 cursor-pointer transition-all"
                  style={{ opacity: task.completed ? 0.55 : 1 }}>
                  <div className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                    style={{ backgroundColor: task.completed ? "var(--color-sage)" : "transparent", borderColor: task.completed ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" }}>
                    {task.completed && <span style={{ color: "white", fontSize: "0.5rem" }}>✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)", textDecoration: task.completed ? "line-through" : "none" }}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>{task.description}</p>
                    )}
                  </div>
                  {task.estimatedMinutes && !task.completed && (
                    <span className="text-xs shrink-0" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>{task.estimatedMinutes}m</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Intention */}
      <div className="card p-5">
        <h3 className="font-serif text-base mb-3" style={{ color: "var(--color-charcoal)" }}>This week&apos;s intention</h3>
        <textarea className="input resize-none" rows={2}
          placeholder="What does a good week look like for your family?"
          value={intention} onChange={(e) => setIntention(e.target.value)} />
      </div>
    </div>
  );
}
