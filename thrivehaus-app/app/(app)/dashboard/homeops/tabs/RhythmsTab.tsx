"use client";

import { useState } from "react";
import { DEFAULT_RHYTHMS } from "@/lib/homeops";

export default function RhythmsTab() {
  const [homeschoolMode, setHomeschoolMode] = useState(true);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const filtered = activeBlock ? DEFAULT_RHYTHMS.filter((r) => r.id === activeBlock) : DEFAULT_RHYTHMS;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="flex gap-1.5">
          {[{ id: null, label: "Full Day" }, ...DEFAULT_RHYTHMS.map((r) => ({ id: r.id, label: r.name }))].map((item) => (
            <button key={String(item.id)} onClick={() => setActiveBlock(item.id)}
              className="text-sm font-medium px-3 py-1.5 rounded-full border transition-colors"
              style={{
                backgroundColor: activeBlock === item.id ? "var(--color-forest)" : "transparent",
                color: activeBlock === item.id ? "var(--color-cream)" : "var(--color-charcoal)",
                borderColor: activeBlock === item.id ? "var(--color-forest)" : "var(--color-sand)",
              }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Homeschool toggle */}
        <label className="flex items-center gap-2 ml-auto cursor-pointer">
          <div onClick={() => setHomeschoolMode(!homeschoolMode)}
            className="w-10 h-5 rounded-full flex items-center px-0.5 transition-colors cursor-pointer"
            style={{ backgroundColor: homeschoolMode ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 20%, transparent)" }}>
            <div className="w-4 h-4 bg-white rounded-full shadow transition-transform"
              style={{ transform: homeschoolMode ? "translateX(20px)" : "translateX(0)" }} />
          </div>
          <span className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>Homeschool day</span>
        </label>
      </div>

      {/* Banner */}
      <div className="rounded-2xl p-4 mb-5 flex items-start gap-3"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 10%, transparent)" }}>
        <span className="text-lg shrink-0">🌿</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-forest)" }}>A rhythm, not a schedule</p>
          <p className="text-xs leading-relaxed mt-0.5" style={{ color: "color-mix(in srgb, var(--color-forest) 70%, transparent)" }}>
            A schedule says "math at 9:00 sharp." A rhythm says "math happens in the morning after breakfast." Rhythms are forgiving, flexible, and sustainable for real families.
          </p>
        </div>
      </div>

      {/* Blocks */}
      <div className="space-y-5">
        {filtered.map((block) => {
          const items = homeschoolMode ? block.items : block.items.filter((i) => !i.homeschoolOnly);
          return (
            <div key={block.id} className="card p-5 border-l-4" style={{ borderLeftColor: block.accentColor }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{block.emoji}</span>
                <h3 className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>{block.name} Rhythm</h3>
              </div>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b last:border-b-0"
                    style={{ borderColor: "color-mix(in srgb, var(--color-sand) 80%, transparent)" }}>
                    {item.time && (
                      <span className="text-xs font-mono w-12 shrink-0" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                        {item.time}
                      </span>
                    )}
                    <span className="text-base shrink-0">{item.emoji}</span>
                    <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>{item.label}</span>
                    {item.homeschoolOnly && (
                      <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 10%, transparent)", color: "var(--color-forest)" }}>
                        HS
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
