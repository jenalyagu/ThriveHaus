"use client";

import { useState } from "react";
import { DEFAULT_SEASONAL, SEASONAL_CATEGORY_CONFIG, type SeasonalItem } from "@/lib/homeops";

export default function SeasonalTab() {
  const [items, setItems] = useState<SeasonalItem[]>(DEFAULT_SEASONAL);
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", category: "general", date: "" });

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);
  const upcoming  = items.filter((i) => !i.completed && i.date).sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  const done      = items.filter((i) => i.completed).length;

  function toggle(id: string) {
    setItems((is) => is.map((i) => i.id === id ? { ...i, completed: !i.completed } : i));
  }

  function addItem() {
    if (!form.title.trim()) return;
    setItems((is) => [...is, { id: `s${Date.now()}`, ...form, completed: false }]);
    setForm({ title: "", category: "general", date: "" });
    setShowAdd(false);
  }

  const season = (() => {
    const m = new Date().getMonth();
    if (m >= 2 && m <= 4) return "🌸 Spring";
    if (m >= 5 && m <= 7) return "☀️ Summer";
    if (m >= 8 && m <= 10) return "🍂 Autumn";
    return "❄️ Winter";
  })();

  return (
    <div>
      {/* Season banner */}
      <div className="rounded-2xl p-5 mb-5 flex items-center justify-between flex-wrap gap-3"
        style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--color-sage) 12%, transparent), color-mix(in srgb, var(--color-ochre) 10%, transparent), color-mix(in srgb, var(--color-terracotta) 8%, transparent))" }}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>Current Season</p>
          <p className="font-serif text-3xl font-light" style={{ color: "var(--color-charcoal)" }}>{season} {new Date().getFullYear()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>Upcoming events</p>
          <p className="font-serif text-2xl font-light" style={{ color: "var(--color-terracotta)" }}>{upcoming.length}</p>
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="card p-5 mb-5">
          <h2 className="font-serif text-base mb-3" style={{ color: "var(--color-charcoal)" }}>Coming Up</h2>
          <div className="space-y-2">
            {upcoming.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-lg w-7 text-center">{SEASONAL_CATEGORY_CONFIG[item.category]?.emoji || "📋"}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{item.title}</p>
                  {item.date && <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>{item.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters + Add */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border capitalize transition-all"
              style={{
                backgroundColor: filter === cat ? "var(--color-charcoal)" : "transparent",
                color: filter === cat ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
                borderColor: filter === cat ? "var(--color-charcoal)" : "var(--color-sand)",
              }}>
              {cat === "all" ? "All" : `${SEASONAL_CATEGORY_CONFIG[cat]?.emoji || ""} ${cat}`}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd((s) => !s)} className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}>
          + Add item
        </button>
      </div>

      {showAdd && (
        <div className="card p-5 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="sm:col-span-2"><label className="label">Title</label><input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></div>
            <div>
              <label className="label">Category</label>
              <select className="input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {Object.keys(SEASONAL_CATEGORY_CONFIG).map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div><label className="label">Date (optional)</label><input className="input" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} /></div>
          </div>
          <div className="flex gap-3">
            <button onClick={addItem} className="btn-primary">Save</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((item) => (
          <div key={item.id} onClick={() => toggle(item.id)}
            className="card p-4 cursor-pointer transition-all" style={{ opacity: item.completed ? 0.55 : 1 }}>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                style={{ backgroundColor: item.completed ? "var(--color-sage)" : "transparent", borderColor: item.completed ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" }}>
                {item.completed && <span style={{ color: "white", fontSize: "0.55rem" }}>✓</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug" style={{ color: "var(--color-charcoal)", textDecoration: item.completed ? "line-through" : "none" }}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-sand) 60%, transparent)", color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                    {SEASONAL_CATEGORY_CONFIG[item.category]?.emoji} {item.category}
                  </span>
                  {item.date && <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>{item.date}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mt-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>
        {done} of {items.length} complete
      </p>
    </div>
  );
}
