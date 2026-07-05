"use client";

import { useState } from "react";
import type { BlueprintContent } from "@/types";
import ChoresTab from "./tabs/ChoresTab";
import MealsTab from "./tabs/MealsTab";
import BudgetTab from "./tabs/BudgetTab";
import RhythmsTab from "./tabs/RhythmsTab";
import MaintenanceTab from "./tabs/MaintenanceTab";
import MeetingsTab from "./tabs/MeetingsTab";
import SeasonalTab from "./tabs/SeasonalTab";
import ResetTab from "./tabs/ResetTab";

const TABS = [
  { key: "chores",      label: "Chores",     icon: "✓" },
  { key: "meals",       label: "Meals",      icon: "🍽" },
  { key: "budget",      label: "Budget",     icon: "💰" },
  { key: "rhythms",     label: "Rhythms",    icon: "🌅" },
  { key: "maintenance", label: "Maintenance",icon: "🔧" },
  { key: "meetings",    label: "Meetings",   icon: "👪" },
  { key: "seasonal",    label: "Seasonal",   icon: "☀️" },
  { key: "reset",       label: "Weekly Reset",icon: "♻" },
] as const;

type Tab = typeof TABS[number]["key"];

export interface Member {
  id: string;
  name: string;
  role: string;
}

interface Props {
  familyId: string;
  familyName: string;
  members: Member[];
  blueprintContent: BlueprintContent | null;
}

export default function HomeOpsHub({ familyId, familyName, members, blueprintContent }: Props) {
  const [tab, setTab] = useState<Tab>("chores");

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <span className="section-tag">HomeOps</span>
        <h1 className="font-serif text-3xl font-light mb-1" style={{ color: "var(--color-charcoal)" }}>
          {familyName} Home Systems
        </h1>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
          Chores · Meals · Budget · Rhythms · Maintenance · Meetings · Seasonal · Weekly Reset
        </p>
      </div>

      {/* Scrollable tab bar */}
      <div className="overflow-x-auto -mx-8 px-8 mb-8">
        <div className="flex gap-1 border-b min-w-max" style={{ borderColor: "var(--color-sand)" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                color: tab === t.key ? "var(--color-forest)" : "color-mix(in srgb, var(--color-charcoal) 50%, transparent)",
                borderBottom: tab === t.key ? "2px solid var(--color-forest)" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              <span className="mr-1.5 text-xs">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "chores"      && <ChoresTab members={members} />}
      {tab === "meals"       && <MealsTab mealApproach={blueprintContent?.mealApproach ?? null} />}
      {tab === "budget"      && <BudgetTab />}
      {tab === "rhythms"     && <RhythmsTab />}
      {tab === "maintenance" && <MaintenanceTab />}
      {tab === "meetings"    && <MeetingsTab members={members} />}
      {tab === "seasonal"    && <SeasonalTab />}
      {tab === "reset"       && <ResetTab />}
    </div>
  );
}
