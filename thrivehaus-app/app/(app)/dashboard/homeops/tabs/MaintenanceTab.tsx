"use client";

import { useState } from "react";
import { DEFAULT_MAINTENANCE, type MaintenanceTask } from "@/lib/homeops";

const PRIORITY_STYLE: Record<string, { bg: string; color: string }> = {
  high:   { bg: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)", color: "var(--color-terracotta)" },
  medium: { bg: "color-mix(in srgb, var(--color-ochre) 12%, transparent)",      color: "var(--color-ochre)" },
  low:    { bg: "color-mix(in srgb, var(--color-charcoal) 8%, transparent)",    color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" },
};

export default function MaintenanceTab() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(DEFAULT_MAINTENANCE);
  const [filter, setFilter] = useState<"all" | "due" | "done">("all");

  const dueCount = tasks.filter((t) => !t.completed).length;
  const filtered = filter === "all" ? tasks : filter === "done" ? tasks.filter((t) => t.completed) : tasks.filter((t) => !t.completed);

  function toggle(id: string) {
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  return (
    <div>
      {dueCount > 0 && (
        <div className="rounded-2xl p-4 mb-5 flex items-start gap-3 border"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 6%, transparent)", borderColor: "color-mix(in srgb, var(--color-terracotta) 18%, transparent)" }}>
          <span className="text-lg shrink-0">⚠️</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-terracotta)" }}>{dueCount} maintenance items need attention</p>
            <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-terracotta) 70%, transparent)" }}>
              Preventative maintenance prevents costly repairs. Check off items as you complete them.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-5">
        {(["all", "due", "done"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="text-sm font-medium px-4 py-2 rounded-full border transition-colors capitalize"
            style={{
              backgroundColor: filter === f ? "var(--color-forest)" : "transparent",
              color: filter === f ? "var(--color-cream)" : "var(--color-charcoal)",
              borderColor: filter === f ? "var(--color-forest)" : "var(--color-sand)",
            }}>
            {f === "all" ? `All (${tasks.length})` : f === "due" ? `Due (${dueCount})` : `Done (${tasks.length - dueCount})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((task) => (
          <div key={task.id} className="card p-4 flex items-start gap-4 transition-all" style={{ opacity: task.completed ? 0.55 : 1 }}>
            <button onClick={() => toggle(task.id)}
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors"
              style={{ backgroundColor: task.completed ? "var(--color-sage)" : "transparent", borderColor: task.completed ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" }}>
              {task.completed && <span style={{ color: "white", fontSize: "0.55rem" }}>✓</span>}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)", textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title}
                </p>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                  style={PRIORITY_STYLE[task.priority]}>
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
                <span className="font-medium">{task.area}</span>
                <span>·</span>
                <span>{task.frequency}</span>
                <span>·</span>
                <span style={{ color: task.completed ? "var(--color-sage)" : "var(--color-terracotta)" }}>
                  {task.completed ? "Done" : `Due ${task.nextDue}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: "color-mix(in srgb, var(--color-cream) 60%, white)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-charcoal)" }}>🔧 Maintenance mindset</p>
        <p className="text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
          The average deferred maintenance task costs $200+ when ignored too long. Spending 30 minutes now prevents a $500 emergency later. Pick one task from the list every week.
        </p>
      </div>
    </div>
  );
}
