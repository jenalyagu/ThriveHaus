"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import type { IntakeData } from "@/types";

const CHILD_STAGES = [
  "Newborn (0–3 months)",
  "Infant (3–12 months)",
  "Toddler (1–3 years)",
  "Preschool (3–5 years)",
  "School-age (6–12 years)",
  "Teen (13–18 years)",
];

const CHALLENGES = [
  "Sleep deprivation",
  "Postpartum mental health",
  "Work–life balance",
  "Childcare gaps",
  "Partner support",
  "Household management",
  "Financial stress",
  "Social isolation",
  "Extended family dynamics",
  "Child's behavioral needs",
];

const SUPPORT_STYLES = [
  "Practical (tasks, logistics)",
  "Emotional (listening, connection)",
  "Educational (information, resources)",
  "Community (finding my village)",
];

const WORK_SCHEDULES = [
  "Stay-at-home parent",
  "Full-time remote",
  "Full-time in-office",
  "Part-time",
  "Freelance / flexible",
  "Night shift",
];

const FAMILY_VALUES = [
  "Connection", "Rest", "Simplicity", "Learning", "Gratitude",
  "Adventure", "Faith", "Service", "Creativity", "Nature",
  "Financial security", "Community",
];

const MEAL_PREFERENCES = [
  "Whole foods", "Budget-friendly", "Kid-approved", "Minimal prep",
  "Batch cooking", "Vegetarian / plant-based", "Gluten-free", "Cultural / traditional recipes",
];

const CHILD_NEEDS = [
  "Sensory sensitivities", "Developmental delays", "Food allergies",
  "Behavioral support", "Medical needs", "Gifted / advanced",
  "Learning differences", "Extra emotional support",
];

const PRIMARY_GOALS = [
  "Survive the newborn phase",
  "Build more support around me",
  "Improve our family rhythms",
  "Address a specific challenge",
  "Thrive — not just get by",
];

interface IntakeWizardProps {
  userId: string;
}

type StepKey = "parents" | "children" | "challenges" | "goals" | "homelife";
const STEPS: StepKey[] = ["parents", "children", "challenges", "goals", "homelife"];

const STEP_LABELS: Record<StepKey, string> = {
  parents: "About You",
  children: "Your Children",
  challenges: "Your Challenges",
  goals: "Your Goals",
  homelife: "Home & Life",
};

export default function IntakeWizard({ userId }: IntakeWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<IntakeData>({
    firstName: "",
    lastName: "",
    partnerFirstName: "",
    partnerLastName: "",
    hasPartner: false,
    familyName: "",
    zipCode: "",
    state: "",
    children: [{ firstName: "", age: null, stage: "", needs: [] }],
    topChallenges: [],
    supportStyle: "",
    workSchedule: "",
    partnerWorkSchedule: "",
    primaryGoal: "",
    timeframe: "",
    homeschooling: false,
    familyValues: [],
    mealPreferences: [],
    budgetPriority: "",
    extendedSupport: "",
    housingType: "",
  });

  function updateData(partial: Partial<IntakeData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function updateChild(idx: number, partial: Partial<IntakeData["children"][0]>) {
    const children = [...data.children];
    children[idx] = { ...children[idx], ...partial };
    updateData({ children });
  }

  function addChild() {
    updateData({ children: [...data.children, { firstName: "", age: null, stage: "", needs: [] }] });
  }

  function removeChild(idx: number) {
    updateData({ children: data.children.filter((_, i) => i !== idx) });
  }

  function toggleChallenge(c: string) {
    const updated = data.topChallenges.includes(c)
      ? data.topChallenges.filter((x) => x !== c)
      : [...data.topChallenges, c];
    updateData({ topChallenges: updated });
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, data }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard?onboarding=true");
    router.refresh();
  }

  const currentStep = STEPS[step];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0 transition-all"
              style={{
                backgroundColor: i <= step ? "var(--color-terracotta)" : "var(--color-sand)",
                color: i <= step ? "var(--color-cream)" : "color-mix(in srgb, var(--color-charcoal) 40%, transparent)",
              }}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span
              className="text-xs font-medium hidden sm:block"
              style={{ color: i === step ? "var(--color-charcoal)" : "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}
            >
              {STEP_LABELS[s]}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className="h-px flex-1"
                style={{ backgroundColor: i < step ? "var(--color-terracotta)" : "var(--color-sand)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="card p-8">
        {error && (
          <div className="text-sm px-4 py-3 rounded-xl mb-5"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)", color: "var(--color-terracotta)" }}>
            {error}
          </div>
        )}

        {/* Step: Parents */}
        {currentStep === "parents" && (
          <div className="space-y-5">
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              About you
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">First name *</label>
                <input className="input" placeholder="Jennifer" value={data.firstName}
                  onChange={(e) => updateData({ firstName: e.target.value })} required />
              </div>
              <div>
                <label className="label">Last name *</label>
                <input className="input" placeholder="Aguilar" value={data.lastName}
                  onChange={(e) => updateData({ lastName: e.target.value })} required />
              </div>
            </div>

            <div>
              <label className="label">Family name *</label>
              <input className="input" placeholder="The Aguilar Family" value={data.familyName}
                onChange={(e) => updateData({ familyName: e.target.value })} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">ZIP code</label>
                <input className="input" placeholder="90210" value={data.zipCode}
                  onChange={(e) => updateData({ zipCode: e.target.value })} maxLength={10} />
              </div>
              <div>
                <label className="label">State</label>
                <select className="input" value={data.state} onChange={(e) => updateData({ state: e.target.value })}>
                  <option value="">Select state</option>
                  {["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Your work schedule</label>
              <select className="input" value={data.workSchedule} onChange={(e) => updateData({ workSchedule: e.target.value })}>
                <option value="">Select one</option>
                {WORK_SCHEDULES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium" style={{ color: "color-mix(in srgb, var(--color-charcoal) 70%, transparent)" }}>
                <input type="checkbox" checked={data.hasPartner}
                  onChange={(e) => updateData({ hasPartner: e.target.checked })}
                  className="rounded" />
                I have a co-parent / partner
              </label>
            </div>

            {data.hasPartner && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: "var(--color-sand)" }}>
                <div>
                  <label className="label">Partner&apos;s first name</label>
                  <input className="input" placeholder="Alex" value={data.partnerFirstName}
                    onChange={(e) => updateData({ partnerFirstName: e.target.value })} />
                </div>
                <div>
                  <label className="label">Partner&apos;s last name</label>
                  <input className="input" placeholder="Aguilar" value={data.partnerLastName}
                    onChange={(e) => updateData({ partnerLastName: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className="label">Partner&apos;s work schedule</label>
                  <select className="input" value={data.partnerWorkSchedule}
                    onChange={(e) => updateData({ partnerWorkSchedule: e.target.value })}>
                    <option value="">Select one</option>
                    {WORK_SCHEDULES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step: Children */}
        {currentStep === "children" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              Your children
            </h2>

            {data.children.map((child, idx) => (
              <div key={idx} className="p-5 rounded-xl border relative space-y-4"
                style={{ borderColor: "var(--color-sand)", backgroundColor: "rgba(251,249,246,0.5)" }}>
                {data.children.length > 1 && (
                  <button onClick={() => removeChild(idx)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-red-50"
                    style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
                    <Trash2 size={14} />
                  </button>
                )}
                <h3 className="text-sm font-semibold" style={{ color: "var(--color-charcoal)" }}>
                  Child {idx + 1}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">First name</label>
                    <input className="input" placeholder="Sophia" value={child.firstName}
                      onChange={(e) => updateChild(idx, { firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Age (years)</label>
                    <input className="input" type="number" placeholder="2" min={0} max={18}
                      value={child.age ?? ""}
                      onChange={(e) => updateChild(idx, { age: e.target.value ? Number(e.target.value) : null })} />
                  </div>
                </div>
                <div>
                  <label className="label">Life stage</label>
                  <select className="input" value={child.stage} onChange={(e) => updateChild(idx, { stage: e.target.value })}>
                    <option value="">Select stage</option>
                    {CHILD_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Any specific needs? <span style={{ fontWeight: 400 }}>(optional)</span></label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {CHILD_NEEDS.map((n) => {
                      const sel = child.needs.includes(n);
                      return (
                        <button key={n} type="button" onClick={() => updateChild(idx, { needs: sel ? child.needs.filter((x) => x !== n) : [...child.needs, n] })}
                          className="text-xs px-3 py-1.5 rounded-full border transition-all"
                          style={{ backgroundColor: sel ? "color-mix(in srgb, var(--color-terracotta) 10%, transparent)" : "transparent", color: sel ? "var(--color-terracotta)" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)", borderColor: sel ? "var(--color-terracotta)" : "var(--color-sand)" }}>
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium" style={{ color: "color-mix(in srgb, var(--color-charcoal) 70%, transparent)" }}>
                <input type="checkbox" checked={data.homeschooling} onChange={(e) => updateData({ homeschooling: e.target.checked })} />
                We homeschool (or are considering it)
              </label>
            </div>

            <button onClick={addChild} className="btn-secondary w-full gap-2">
              <Plus size={16} /> Add another child
            </button>
          </div>
        )}

        {/* Step: Challenges */}
        {currentStep === "challenges" && (
          <div className="space-y-5">
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              What&apos;s most challenging right now?
            </h2>
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
              Select all that apply.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CHALLENGES.map((c) => {
                const selected = data.topChallenges.includes(c);
                return (
                  <button key={c} onClick={() => toggleChallenge(c)}
                    className="text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      borderColor: selected ? "var(--color-terracotta)" : "var(--color-sand)",
                      backgroundColor: selected ? "color-mix(in srgb, var(--color-terracotta) 8%, transparent)" : "white",
                      color: selected ? "var(--color-terracotta)" : "var(--color-charcoal)",
                    }}>
                    {c}
                  </button>
                );
              })}
            </div>

            <div>
              <label className="label">How do you prefer to receive support?</label>
              <div className="space-y-2">
                {SUPPORT_STYLES.map((s) => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="supportStyle" value={s}
                      checked={data.supportStyle === s}
                      onChange={(e) => updateData({ supportStyle: e.target.value })} />
                    <span className="text-sm" style={{ color: "var(--color-charcoal)" }}>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step: Goals */}
        {currentStep === "goals" && (
          <div className="space-y-5">
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              What&apos;s your primary goal?
            </h2>
            <div className="space-y-2">
              {PRIMARY_GOALS.map((g) => {
                const selected = data.primaryGoal === g;
                return (
                  <button key={g} onClick={() => updateData({ primaryGoal: g })}
                    className="w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      borderColor: selected ? "var(--color-terracotta)" : "var(--color-sand)",
                      backgroundColor: selected ? "color-mix(in srgb, var(--color-terracotta) 8%, transparent)" : "white",
                      color: selected ? "var(--color-terracotta)" : "var(--color-charcoal)",
                    }}>
                    {g}
                  </button>
                );
              })}
            </div>

            <div>
              <label className="label">Ideal timeframe for seeing change</label>
              <select className="input" value={data.timeframe} onChange={(e) => updateData({ timeframe: e.target.value })}>
                <option value="">Select one</option>
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="3 months">Within 3 months</option>
                <option value="6 months">Within 6 months</option>
                <option value="No rush">No rush — just building a foundation</option>
              </select>
            </div>
          </div>
        )}

        {/* Step: Home & Life */}
        {currentStep === "homelife" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              Your home &amp; life
            </h2>
            <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
              The more context you share, the more tailored your Family Blueprint will be.
            </p>

            <div>
              <label className="label">What does your family value most? <span style={{ fontWeight: 400 }}>(pick up to 5)</span></label>
              <div className="flex flex-wrap gap-2 mt-2">
                {FAMILY_VALUES.map((v) => {
                  const sel = data.familyValues.includes(v);
                  return (
                    <button key={v} type="button"
                      onClick={() => updateData({ familyValues: sel ? data.familyValues.filter((x) => x !== v) : data.familyValues.length < 5 ? [...data.familyValues, v] : data.familyValues })}
                      className="text-sm px-4 py-2 rounded-full border transition-all"
                      style={{ backgroundColor: sel ? "color-mix(in srgb, var(--color-forest) 10%, transparent)" : "white", color: sel ? "var(--color-forest)" : "color-mix(in srgb, var(--color-charcoal) 65%, transparent)", borderColor: sel ? "var(--color-forest)" : "var(--color-sand)" }}>
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="label">Meal preferences</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {MEAL_PREFERENCES.map((m) => {
                  const sel = data.mealPreferences.includes(m);
                  return (
                    <button key={m} type="button"
                      onClick={() => updateData({ mealPreferences: sel ? data.mealPreferences.filter((x) => x !== m) : [...data.mealPreferences, m] })}
                      className="text-sm px-4 py-2 rounded-full border transition-all"
                      style={{ backgroundColor: sel ? "color-mix(in srgb, var(--color-ochre) 12%, transparent)" : "white", color: sel ? "var(--color-ochre)" : "color-mix(in srgb, var(--color-charcoal) 65%, transparent)", borderColor: sel ? "var(--color-ochre)" : "var(--color-sand)" }}>
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Housing situation</label>
                <select className="input" value={data.housingType} onChange={(e) => updateData({ housingType: e.target.value })}>
                  <option value="">Select one</option>
                  <option value="Own a house">Own a house</option>
                  <option value="Rent a house">Rent a house</option>
                  <option value="Own an apartment/condo">Own an apartment/condo</option>
                  <option value="Rent an apartment">Rent an apartment</option>
                  <option value="Multigenerational home">Multigenerational home</option>
                  <option value="In transition">In transition</option>
                </select>
              </div>

              <div>
                <label className="label">Budget approach</label>
                <select className="input" value={data.budgetPriority} onChange={(e) => updateData({ budgetPriority: e.target.value })}>
                  <option value="">Select one</option>
                  <option value="Very tight — every dollar counts">Very tight — every dollar counts</option>
                  <option value="Careful — watching closely">Careful — watching closely</option>
                  <option value="Comfortable — some flexibility">Comfortable — some flexibility</option>
                  <option value="Flexible — not the main concern">Flexible — not the main concern</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="label">Extended family / community support</label>
                <select className="input" value={data.extendedSupport} onChange={(e) => updateData({ extendedSupport: e.target.value })}>
                  <option value="">Select one</option>
                  <option value="None — we're on our own">None — we&apos;re on our own</option>
                  <option value="Some — occasional help">Some — occasional help</option>
                  <option value="Nearby family — regular support">Nearby family — regular support</option>
                  <option value="Strong community — lots of support">Strong community — lots of support</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t" style={{ borderColor: "var(--color-sand)" }}>
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="btn-secondary"
            style={{ opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? "none" : "auto" }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="btn-primary"
              disabled={!data.firstName || !data.familyName}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary" disabled={submitting || !data.primaryGoal}>
              {submitting ? <><Spinner size="sm" /> Generating blueprint…</> : <>Generate my blueprint <Sparkles size={16} /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Sparkles({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z" />
      <path d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" />
    </svg>
  );
}
