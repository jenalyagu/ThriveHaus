"use client";

import { useState } from "react";
import CurriculumTab from "./tabs/CurriculumTab";
import AttendanceTab from "./tabs/AttendanceTab";
import PortfolioTab from "./tabs/PortfolioTab";
import ComplianceTab from "./tabs/ComplianceTab";

const TABS = [
  { key: "curriculum", label: "Curriculum", icon: "◈" },
  { key: "attendance", label: "Attendance", icon: "✓" },
  { key: "portfolio",  label: "Portfolio",  icon: "📁" },
  { key: "compliance", label: "Compliance", icon: "⚖" },
] as const;

type Tab = typeof TABS[number]["key"];

export interface HsAttendance {
  id: string;
  date: string;
  child_name: string;
  status: string;
}

export interface HsPortfolio {
  id: string;
  child_name: string;
  subject: string;
  date: string;
  activity: string;
  evidence_type: string;
  notes?: string;
  ai_language?: string;
}

export interface HsSettings {
  id: string;
  state: string;
  learning_style: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lesson_plan?: any;
}

interface Props {
  familyId: string;
  familyName: string;
  children: { name: string; age?: number }[];
  attendance: HsAttendance[];
  portfolio: HsPortfolio[];
  settings: HsSettings | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blueprintContent: any | null;
}

export default function HomeschoolHub({ familyId, familyName, children, attendance, portfolio, settings, blueprintContent }: Props) {
  const [tab, setTab] = useState<Tab>("curriculum");
  // Plan state lives here so it survives tab switches
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plan, setPlan] = useState<any | null>(settings?.lesson_plan ?? null);

  const childNames = children.length > 0 ? children.map((c) => c.name) : ["Child 1"];

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <span className="section-tag">Homeschool Hub</span>
        <h1 className="font-serif text-3xl font-light mb-1" style={{ color: "var(--color-charcoal)" }}>
          {familyName} School
        </h1>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
          Curriculum · Attendance · Portfolio · Compliance
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-8 border-b overflow-x-auto" style={{ borderColor: "var(--color-sand)" }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap"
            style={{
              color: tab === t.key ? "var(--color-forest)" : "color-mix(in srgb, var(--color-charcoal) 50%, transparent)",
              borderBottom: tab === t.key ? "2px solid var(--color-forest)" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            <span className="mr-1.5 text-xs">{t.icon}</span>
            {t.label}
            {t.key === "curriculum" && plan && (
              <span className="ml-1.5 inline-flex w-1.5 h-1.5 rounded-full align-middle"
                style={{ backgroundColor: "var(--color-sage)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "curriculum" && (
        <CurriculumTab
          familyId={familyId}
          children={children}
          learningStyle={settings?.learning_style || null}
          familyName={familyName}
          blueprintContent={blueprintContent}
          plan={plan}
          onPlanChange={setPlan}
        />
      )}
      {tab === "attendance" && <AttendanceTab familyId={familyId} childNames={childNames} initialAttendance={attendance} state={settings?.state || "California"} />}
      {tab === "portfolio"  && <PortfolioTab familyId={familyId} childNames={childNames} initialEntries={portfolio} />}
      {tab === "compliance" && <ComplianceTab familyId={familyId} initialState={settings?.state || "California"} settingsId={settings?.id} />}
    </div>
  );
}
