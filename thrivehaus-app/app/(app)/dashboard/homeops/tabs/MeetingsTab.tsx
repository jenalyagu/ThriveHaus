"use client";

import { useState } from "react";
import type { Member } from "../HomeOpsHub";
import type { ActionItem } from "@/lib/homeops";

interface Props { members: Member[] }

const DEFAULT_AGENDA = [
  { id: "fm1", title: "Wins",            emoji: "🏆", items: ["What went well this week?", "A moment of connection", "Something each person is proud of"] },
  { id: "fm2", title: "Challenges",      emoji: "🌊", items: ["What felt hard?", "Any friction we can solve together?", "No blame — just honesty"] },
  { id: "fm3", title: "Needs",           emoji: "💬", items: ["What does each person need for the coming week?", "Any support requests?"] },
  { id: "fm4", title: "Upcoming Events", emoji: "📅", items: ["Review next week's calendar", "Any appointments or commitments?", "Anything to prepare?"] },
  { id: "fm5", title: "Goals Check-In",  emoji: "🎯", items: ["How are our family goals progressing?", "Any wins toward goals this week?"] },
];

export default function MeetingsTab({ members }: Props) {
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: "ai1", task: "Set alarm 15 minutes earlier starting Monday", assignee: members[0]?.name || "Parent", done: false },
    { id: "ai2", task: "Weekly 10-minute family pickup before bedtime",  assignee: "Everyone",                 done: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newAssignee, setNewAssignee] = useState(members[0]?.name || "Everyone");
  const [notes, setNotes] = useState("");

  function toggleAction(id: string) {
    setActionItems((as) => as.map((a) => a.id === id ? { ...a, done: !a.done } : a));
  }

  function addAction() {
    if (!newTask.trim()) return;
    setActionItems((as) => [...as, { id: `ai${Date.now()}`, task: newTask, assignee: newAssignee, done: false }]);
    setNewTask("");
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      {/* Tip */}
      <div className="rounded-2xl p-4 mb-6 flex gap-3 border"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 6%, transparent)", borderColor: "color-mix(in srgb, var(--color-terracotta) 18%, transparent)" }}>
        <span className="text-lg shrink-0">👪</span>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--color-terracotta)" }}>Keep it under 25 minutes.</p>
          <p className="text-xs leading-relaxed mt-0.5" style={{ color: "color-mix(in srgb, var(--color-terracotta) 70%, transparent)" }}>
            Short, consistent family meetings build trust, reduce conflict, and keep everyone aligned. End with something warm — a hug round, a family handshake, or a prayer.
          </p>
        </div>
      </div>

      <p className="text-sm font-medium mb-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
        Agenda for {today}
      </p>

      {/* Agenda grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {DEFAULT_AGENDA.map((section) => (
          <div key={section.id} className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{section.emoji}</span>
              <h3 className="font-serif text-base" style={{ color: "var(--color-charcoal)" }}>{section.title}</h3>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed pl-3 border-l-2"
                  style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)", borderColor: "color-mix(in srgb, var(--color-charcoal) 10%, transparent)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Action items */}
      <div className="card p-5 mb-5">
        <h3 className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>Action Items</h3>
        <div className="space-y-2 mb-4">
          {actionItems.map((item) => (
            <div key={item.id} onClick={() => toggleAction(item.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all"
              style={{
                backgroundColor: item.done ? "color-mix(in srgb, var(--color-sage) 8%, transparent)" : "color-mix(in srgb, var(--color-cream) 60%, white)",
                borderColor: item.done ? "color-mix(in srgb, var(--color-sage) 20%, transparent)" : "color-mix(in srgb, var(--color-charcoal) 8%, transparent)",
              }}>
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                style={{ backgroundColor: item.done ? "var(--color-sage)" : "transparent", borderColor: item.done ? "var(--color-sage)" : "color-mix(in srgb, var(--color-charcoal) 25%, transparent)" }}>
                {item.done && <span style={{ color: "white", fontSize: "0.55rem" }}>✓</span>}
              </div>
              <p className="flex-1 text-sm" style={{ color: item.done ? "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" : "var(--color-charcoal)", textDecoration: item.done ? "line-through" : "none" }}>
                {item.task}
              </p>
              <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-sand) 60%, transparent)", color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
                {item.assignee}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4" style={{ borderColor: "color-mix(in srgb, var(--color-charcoal) 8%, transparent)" }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Add Action Item</p>
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="Task description…" value={newTask} onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAction()} />
            <select className="input w-28" value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}>
              {members.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
              <option value="Everyone">Everyone</option>
            </select>
            <button onClick={addAction} className="btn-primary" style={{ padding: "0.5rem 0.875rem" }}>+</button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card p-5">
        <h3 className="font-serif text-base mb-3" style={{ color: "var(--color-charcoal)" }}>Meeting Notes</h3>
        <textarea className="input resize-none" rows={4}
          placeholder="Capture anything important from this meeting…"
          value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
    </div>
  );
}
