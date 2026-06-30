'use client';

import { useState } from 'react';
import { AGE_RANGES, DIETARY_OPTIONS, BUDGET_OPTIONS } from '@/lib/culture-kitchen/family-profile';

const STORAGE_KEY = 'ck_family_profile';

interface Profile {
  familyName: string;
  ageRanges: string[];
  dietary: string[];
  budget: number;
}

function loadProfile(): Profile {
  if (typeof window === 'undefined') return { familyName: '', ageRanges: [], dietary: [], budget: 100 };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || { familyName: '', ageRanges: [], dietary: [], budget: 100 };
  } catch {
    return { familyName: '', ageRanges: [], dietary: [], budget: 100 };
  }
}

export default function FamilyProfilePage() {
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [saved, setSaved] = useState(false);

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggle<K extends 'ageRanges' | 'dietary'>(field: K, value: string) {
    setProfile((p) => ({
      ...p,
      [field]: p[field].includes(value)
        ? p[field].filter((v: string) => v !== value)
        : [...p[field], value],
    }));
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <p className="section-tag mb-2">Setup</p>
        <h1 className="text-2xl font-serif">Family Profile</h1>
        <p className="text-sm text-[var(--color-sage)] mt-1">
          Personalize meal plans and lessons for your family.
        </p>
      </div>

      <div className="card p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="label">Family Name</label>
          <input
            className="input w-full"
            placeholder="e.g. The Johnsons"
            value={profile.familyName}
            onChange={(e) => setProfile((p) => ({ ...p, familyName: e.target.value }))}
          />
        </div>

        {/* Ages */}
        <div>
          <label className="label">Ages in Your Family</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {AGE_RANGES.map((ar) => (
              <button
                key={ar.value}
                onClick={() => toggle('ageRanges', ar.value)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  profile.ageRanges.includes(ar.value)
                    ? 'bg-[var(--color-terracotta)] text-white border-[var(--color-terracotta)]'
                    : 'border-[var(--color-sand)] hover:border-[var(--color-terracotta)]'
                }`}
              >
                {ar.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary */}
        <div>
          <label className="label">Dietary Preferences</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {DIETARY_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => toggle('dietary', opt)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  profile.dietary.includes(opt)
                    ? 'bg-[var(--color-forest)] text-white border-[var(--color-forest)]'
                    : 'border-[var(--color-sand)] hover:border-[var(--color-forest)]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="label">Weekly Budget</label>
          <div className="flex flex-col gap-2 mt-2">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setProfile((p) => ({ ...p, budget: opt.value }))}
                className={`text-sm px-4 py-2 rounded-xl border text-left transition-colors ${
                  profile.budget === opt.value
                    ? 'bg-[var(--color-ochre)]/20 border-[var(--color-ochre)] font-medium'
                    : 'border-[var(--color-sand)] hover:border-[var(--color-ochre)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={save} className="btn-primary w-full">
          {saved ? '✓ Saved!' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
