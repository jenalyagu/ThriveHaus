"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { attendanceConfig, type AttendanceStatus } from "@/lib/homeschool";
import type { HsAttendance } from "../HomeschoolHub";

interface Props {
  familyId: string;
  childNames: string[];
  initialAttendance: HsAttendance[];
  state: string;
}

const REQUIRED_DAYS = 175;

export default function AttendanceTab({ familyId, childNames, initialAttendance, state }: Props) {
  const [selectedChild, setSelectedChild] = useState(childNames[0] || "Child");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    initialAttendance
      .filter((a) => a.child_name === (childNames[0] || "Child"))
      .forEach((a) => { map[a.date] = a.status as AttendanceStatus; });
    return map;
  });

  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth();

  const [viewYear,  setViewYear]  = useState(year);
  const [viewMonth, setViewMonth] = useState(month);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long", year: "numeric" });

  function dateKey(d: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  function isWeekend(d: number) {
    const dow = new Date(viewYear, viewMonth, d).getDay();
    return dow === 0 || dow === 6;
  }

  async function cycleStatus(d: number) {
    if (isWeekend(d)) return;
    const key = dateKey(d);
    const cycle: AttendanceStatus[] = ["present", "field-trip", "nature-day", "independent", "family-learning", "sick", "absent", "none"];
    const current = attendance[key] || "none";
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];

    setAttendance((a) => ({ ...a, [key]: next }));

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    if (next === "none") {
      await db.from("homeschool_attendance")
        .delete()
        .eq("family_id", familyId)
        .eq("date", key)
        .eq("child_name", selectedChild);
    } else {
      await db.from("homeschool_attendance")
        .upsert({ family_id: familyId, date: key, child_name: selectedChild, status: next },
          { onConflict: "family_id,date,child_name" });
    }
  }

  const switchChild = useCallback((name: string) => {
    setSelectedChild(name);
    const map: Record<string, AttendanceStatus> = {};
    initialAttendance
      .filter((a) => a.child_name === name)
      .forEach((a) => { map[a.date] = a.status as AttendanceStatus; });
    setAttendance(map);
  }, [initialAttendance]);

  const counts = Object.values(attendance).reduce<Record<string, number>>((acc, s) => {
    acc[s] = (acc[s] || 0) + 1; return acc;
  }, {});

  const schoolDays = (counts["present"] || 0) + (counts["field-trip"] || 0) +
    (counts["nature-day"] || 0) + (counts["independent"] || 0) + (counts["family-learning"] || 0);
  const totalLogged = Object.keys(attendance).length;
  const rate = totalLogged > 0 ? Math.round((schoolDays / totalLogged) * 100) : 0;

  return (
    <div>
      {/* Child selector */}
      {childNames.length > 1 && (
        <div className="flex gap-2 mb-5">
          {childNames.map((n) => (
            <button key={n} onClick={() => switchChild(n)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
              style={{
                backgroundColor: selectedChild === n ? "var(--color-forest)" : "transparent",
                color: selectedChild === n ? "var(--color-cream)" : "var(--color-charcoal)",
                borderColor: selectedChild === n ? "var(--color-forest)" : "var(--color-sand)",
              }}>
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "School Days",        value: schoolDays,  color: "var(--color-sage)" },
          { label: "Field/Nature Days",   value: (counts["field-trip"] || 0) + (counts["nature-day"] || 0), color: "var(--color-ochre)" },
          { label: "Sick Days",           value: counts["sick"] || 0, color: "var(--color-terracotta)" },
          { label: "Attendance Rate",     value: `${rate}%`,  color: "var(--color-charcoal)" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="font-serif text-3xl font-light" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else { setViewMonth(m => m - 1); } }}
              className="text-sm px-2 py-1 rounded transition-opacity hover:opacity-60" style={{ color: "var(--color-charcoal)" }}>←</button>
            <h2 className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>{monthName}</h2>
            <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else { setViewMonth(m => m + 1); } }}
              className="text-sm px-2 py-1 rounded transition-opacity hover:opacity-60" style={{ color: "var(--color-charcoal)" }}>→</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d} className="text-center text-xs font-semibold py-1"
                style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
              const key = dateKey(d);
              const status = attendance[key] || "none";
              const cfg = attendanceConfig[status];
              const weekend = isWeekend(d);
              return (
                <button key={d} onClick={() => cycleStatus(d)} disabled={weekend}
                  className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all"
                  style={{
                    backgroundColor: weekend ? "transparent" : (status === "none" ? "color-mix(in srgb, var(--color-sand) 40%, transparent)" : cfg.bg),
                    color: weekend ? "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" : (status === "none" ? "var(--color-charcoal)" : cfg.color),
                    cursor: weekend ? "default" : "pointer",
                    fontSize: "0.7rem",
                  }}>
                  {d}
                </button>
              );
            })}
          </div>

          <p className="text-xs mt-4 text-center" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
            Click any weekday to cycle through attendance types
          </p>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Annual progress */}
          <div className="card p-5">
            <h3 className="font-serif text-sm mb-3" style={{ color: "var(--color-charcoal)" }}>Annual Progress</h3>
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>Days logged</span>
              <span className="font-semibold" style={{ color: "var(--color-charcoal)" }}>{schoolDays} / {REQUIRED_DAYS}</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-sand)" }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${Math.min((schoolDays / REQUIRED_DAYS) * 100, 100)}%`, backgroundColor: "var(--color-sage)" }} />
            </div>
            <p className="text-xs mt-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
              {state} requires {REQUIRED_DAYS} days of instruction.
            </p>
          </div>

          {/* Status legend */}
          <div className="card p-5">
            <h3 className="font-serif text-sm mb-3" style={{ color: "var(--color-charcoal)" }}>Status Types</h3>
            <div className="space-y-2">
              {(Object.entries(attendanceConfig) as [AttendanceStatus, typeof attendanceConfig[AttendanceStatus]][])
                .filter(([k]) => k !== "none")
                .map(([key, cfg]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.color}60` }} />
                      <span style={{ color: "var(--color-charcoal)" }}>{cfg.label}</span>
                    </div>
                    <span className="font-semibold" style={{ color: cfg.color }}>{counts[key] || 0}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
