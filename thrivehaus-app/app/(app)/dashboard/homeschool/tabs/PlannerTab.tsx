"use client";

import { useState } from "react";
import { WEEK_THEMES, LEARNING_STYLES, SUBJECTS } from "@/lib/homeschool";
import Spinner from "@/components/ui/Spinner";

const MOCK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

interface DayPlan {
  day: string;
  morningRhythm: string;
  mainLesson: string;
  handsOn: string;
  reading: string;
  outdoor: string;
  notes: string;
}

const SAMPLE_PLAN: DayPlan[] = [
  { day: "Monday",    morningRhythm: "Morning meeting, nature journal, memory work", mainLesson: "Math: Patterns and sequences", handsOn: "Manipulative exploration", reading: "Read-aloud chapter book",     outdoor: "Garden observation",         notes: "" },
  { day: "Tuesday",   morningRhythm: "Copywork, memory review",                      mainLesson: "Language Arts: Narration",     handsOn: "Living history project",     reading: "Independent reading 20 min", outdoor: "Nature walk",                notes: "" },
  { day: "Wednesday", morningRhythm: "Morning meeting, oral review",                 mainLesson: "History/Geography",            handsOn: "Map-making or timeline",     reading: "Library day",               outdoor: "Community errand or walk",  notes: "" },
  { day: "Thursday",  morningRhythm: "Copywork, mental math warm-up",               mainLesson: "Science exploration",          handsOn: "Experiment or observation",  reading: "Read-aloud chapter book",   outdoor: "Outdoor science observation",notes: "" },
  { day: "Friday",    morningRhythm: "Week-in-review, share journals",              mainLesson: "Art or Music",                 handsOn: "Creative project",           reading: "Poetry or free reading",    outdoor: "Unstructured outdoor play",  notes: "" },
];

interface Props {
  childNames: string[];
  style: string;
}

export default function PlannerTab({ childNames, style: initialStyle }: Props) {
  const [form, setForm] = useState({
    child: childNames[0] || "Child",
    theme: WEEK_THEMES[0],
    timePerDay: "4 hours",
    style: initialStyle,
    subjects: ["Language Arts", "Mathematics", "Science", "History", "Art"],
  });
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [plan, setPlan] = useState<DayPlan[]>([]);

  function generate() {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setPlan(SAMPLE_PLAN.map((d) => ({ ...d })));
      setLoading(false);
      setGenerated(true);
    }, 1800);
  }

  function toggleSubject(sub: string) {
    setForm((f) => ({
      ...f,
      subjects: f.subjects.includes(sub) ? f.subjects.filter((s) => s !== sub) : [...f.subjects, sub],
    }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Controls */}
      <div className="lg:col-span-1 space-y-5">
        <div className="card p-5">
          <h3 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>Plan Settings</h3>
          <div className="space-y-4">
            {childNames.length > 1 && (
              <div>
                <label className="label">Child</label>
                <select className="input" value={form.child} onChange={(e) => setForm((f) => ({ ...f, child: e.target.value }))}>
                  {childNames.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="label">Week Theme</label>
              <select className="input" value={form.theme} onChange={(e) => setForm((f) => ({ ...f, theme: e.target.value }))}>
                {WEEK_THEMES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Time Per Day</label>
              <select className="input" value={form.timePerDay} onChange={(e) => setForm((f) => ({ ...f, timePerDay: e.target.value }))}>
                {["2 hours","3 hours","4 hours","5 hours","6 hours"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Learning Style</label>
              <select className="input" value={form.style} onChange={(e) => setForm((f) => ({ ...f, style: e.target.value }))}>
                {LEARNING_STYLES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label mb-2 block">Subjects</label>
              {SUBJECTS.map((sub) => (
                <label key={sub} className="flex items-center gap-2 text-xs py-1 cursor-pointer" style={{ color: "var(--color-charcoal)" }}>
                  <input type="checkbox" checked={form.subjects.includes(sub)} onChange={() => toggleSubject(sub)}
                    style={{ accentColor: "var(--color-sage)" }} />
                  {sub}
                </label>
              ))}
            </div>
            <button onClick={generate} disabled={loading} className="btn-primary w-full">
              {loading ? <><Spinner size="sm" /> Generating…</> : "✦ Generate Weekly Plan"}
            </button>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 10%, transparent)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-forest)" }}>✦ AI-Powered</p>
          <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-forest) 70%, transparent)" }}>
            Plans are tailored to your child&apos;s age, learning style, and week theme.
          </p>
        </div>
      </div>

      {/* Plan display */}
      <div className="lg:col-span-3">
        {loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-10 h-10 border-4 rounded-full animate-spin"
              style={{ borderColor: "color-mix(in srgb, var(--color-sage) 20%, transparent)", borderTopColor: "var(--color-sage)" }} />
            <p className="font-serif text-lg italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
              Crafting your week…
            </p>
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>
              Designing a {form.style} rhythm for {form.child}
            </p>
          </div>
        )}

        {!loading && !generated && (
          <div className="flex flex-col items-center justify-center h-64 gap-4 rounded-2xl border-2 border-dashed"
            style={{ borderColor: "var(--color-sand)" }}>
            <span className="text-4xl">📅</span>
            <p className="font-serif text-xl" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
              Your plan will appear here.
            </p>
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
              Configure settings and click Generate.
            </p>
          </div>
        )}

        {!loading && generated && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, transparent)", color: "var(--color-forest)" }}>
                ✦ AI Generated
              </span>
              <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
                Theme: <strong style={{ color: "var(--color-charcoal)" }}>{form.theme}</strong> · {form.style} · {form.timePerDay}/day
              </p>
            </div>

            {/* Weekly plan table */}
            <div className="card overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: "var(--color-forest)", color: "var(--color-cream)" }}>
                      <th className="text-left px-4 py-3 font-semibold w-24">Day</th>
                      <th className="text-left px-4 py-3 font-semibold">Morning Rhythm</th>
                      <th className="text-left px-4 py-3 font-semibold">Main Lesson</th>
                      <th className="text-left px-4 py-3 font-semibold">Hands-On</th>
                      <th className="text-left px-4 py-3 font-semibold">Outdoor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.map((day, i) => (
                      <tr key={day.day} style={{ backgroundColor: i % 2 === 0 ? "white" : "color-mix(in srgb, var(--color-cream) 80%, white)" }}>
                        <td className="px-4 py-3 font-semibold font-serif" style={{ color: "var(--color-forest)" }}>{day.day}</td>
                        <td className="px-4 py-3" style={{ color: "var(--color-charcoal)" }}>{day.morningRhythm}</td>
                        <td className="px-4 py-3" style={{ color: "var(--color-charcoal)" }}>{day.mainLesson}</td>
                        <td className="px-4 py-3" style={{ color: "var(--color-charcoal)" }}>{day.handsOn}</td>
                        <td className="px-4 py-3" style={{ color: "var(--color-charcoal)" }}>{day.outdoor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs italic" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
              Sample AI-generated plan based on your settings. In a future update, each plan will be uniquely AI-generated via your Village AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
