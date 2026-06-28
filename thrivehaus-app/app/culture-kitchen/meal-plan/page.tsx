'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import {
  sampleMealPlan,
  sampleMexicanPlan,
  sampleVietnamesePlan,
  samplePersianPlan,
  sampleIndianPlan,
  sampleSouthernPlan,
  sampleMediterraneanPlan,
} from '@/lib/culture-kitchen/meal-plans';
import { AGE_RANGES, DIETARY_OPTIONS, BUDGET_OPTIONS } from '@/lib/culture-kitchen/family-profile';
import type { MealPlan } from '@/lib/culture-kitchen/types';

const MEAL_PLANS_BY_CULTURE: Record<string, MealPlan> = {
  filipino: sampleMealPlan,
  mexican: sampleMexicanPlan,
  vietnamese: sampleVietnamesePlan,
  persian: samplePersianPlan,
  indian: sampleIndianPlan,
  southern: sampleSouthernPlan,
  mediterranean: sampleMediterraneanPlan,
};

export default function MealPlanPage() {
  const [selectedCulture, setSelectedCulture] = useState('filipino');
  const [familySize, setFamilySize] = useState(4);
  const [budget, setBudget] = useState(100);
  const [ageRange, setAgeRange] = useState('6-12');
  const [dietary, setDietary] = useState<string[]>([]);
  const [generated, setGenerated] = useState<MealPlan | null>(sampleMealPlan);
  const [generating, setGenerating] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const plan = MEAL_PLANS_BY_CULTURE[selectedCulture] || sampleMealPlan;
      setGenerated({ ...plan, servings: familySize, estimatedCost: budget * 0.85 });
      setGenerating(false);
    }, 1200);
  };

  const toggleDietary = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const culture = cultures.find((c) => c.id === selectedCulture);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3B4B3F' }}>
          📅 Weekly Meal Planner
        </h1>
        <p className="text-base" style={{ color: '#8A8070' }}>
          Generate a 7-day heritage meal plan tailored to your family.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Config Panel */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border p-6 sticky top-24 space-y-6"
            style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-lg" style={{ color: '#3B4B3F' }}>Plan Settings</h2>

            {/* Culture select */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3B4B3F' }}>
                🌍 Choose a Culture
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cultures.map((c) => (
                  <button key={c.id} onClick={() => setSelectedCulture(c.id)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border text-sm transition-all text-left"
                    style={{
                      backgroundColor: selectedCulture === c.id ? '#3B4B3F' : '#F3EFE9',
                      borderColor: selectedCulture === c.id ? '#3B4B3F' : '#E8DFD0',
                      color: selectedCulture === c.id ? '#FFFDF9' : '#3B4B3F',
                    }}>
                    <span>{c.emoji}</span>
                    <span className="leading-tight text-xs">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Family size */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3B4B3F' }}>
                👨‍👩‍👧‍👦 Family Size: <strong>{familySize}</strong>
              </label>
              <input type="range" min={1} max={10} value={familySize}
                onChange={(e) => setFamilySize(+e.target.value)}
                className="w-full accent-current"
                style={{ accentColor: '#3B4B3F' }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: '#8A8070' }}>
                <span>1 person</span><span>10 people</span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3B4B3F' }}>
                💰 Weekly Budget
              </label>
              <div className="space-y-1.5">
                {BUDGET_OPTIONS.map((opt) => (
                  <button key={opt.value} onClick={() => setBudget(opt.value)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                    style={{
                      backgroundColor: budget === opt.value ? '#D09E5A' : '#F3EFE9',
                      color: budget === opt.value ? '#FFFDF9' : '#4A4040',
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Homeschool age */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3B4B3F' }}>
                📚 Homeschool Age Range
              </label>
              <div className="space-y-1.5">
                {AGE_RANGES.map((range) => (
                  <button key={range.value} onClick={() => setAgeRange(range.value)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                    style={{
                      backgroundColor: ageRange === range.value ? '#5A6F5E' : '#F3EFE9',
                      color: ageRange === range.value ? '#FFFDF9' : '#4A4040',
                    }}>
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#3B4B3F' }}>
                🥗 Dietary Needs
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DIETARY_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => toggleDietary(opt)}
                    className="text-xs px-2.5 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: dietary.includes(opt) ? '#3B4B3F' : '#F3EFE9',
                      color: dietary.includes(opt) ? '#FFFDF9' : '#5A6F5E',
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleGenerate} disabled={generating}
              className="w-full py-3 rounded-full font-medium text-sm transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
              {generating ? '⏳ Generating...' : `✨ Generate ${culture?.name || ''} Meal Plan`}
            </button>
          </div>
        </div>

        {/* Meal Plan Output */}
        <div className="lg:col-span-2">
          {generating && (
            <div className="flex flex-col items-center justify-center h-64 rounded-2xl border"
              style={{ borderColor: '#E8DFD0', backgroundColor: '#F3EFE9' }}>
              <div className="text-5xl mb-4 animate-bounce">🍳</div>
              <p className="font-serif text-lg" style={{ color: '#3B4B3F' }}>
                Cooking up your {culture?.name} meal plan…
              </p>
              <p className="text-sm mt-1" style={{ color: '#8A8070' }}>Selecting the best recipes for your family</p>
            </div>
          )}

          {!generating && generated && (
            <div>
              {/* Plan header */}
              <div className="rounded-2xl p-5 mb-6 flex items-center justify-between flex-wrap gap-4"
                style={{ background: `linear-gradient(135deg, #3B4B3F, #5A6F5E)` }}>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#C8D8C4' }}>
                    Week of June 22, 2026
                  </div>
                  <h2 className="font-serif text-xl text-white">{generated.name}</h2>
                  <div className="text-sm mt-1 flex gap-4" style={{ color: '#C8D8C4' }}>
                    <span>👥 {generated.servings} people</span>
                    <span>💰 ~${Math.round(generated.estimatedCost)}/week</span>
                    <span>📚 {generated.homeschoolTheme}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setView('grid')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: view === 'grid' ? '#FFFDF9' : 'transparent', color: view === 'grid' ? '#3B4B3F' : '#C8D8C4' }}>
                    Grid
                  </button>
                  <button onClick={() => setView('list')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: view === 'list' ? '#FFFDF9' : 'transparent', color: view === 'list' ? '#3B4B3F' : '#C8D8C4' }}>
                    List
                  </button>
                </div>
              </div>

              {/* Grid view */}
              {view === 'grid' && (
                <div className="space-y-3">
                  {generated.days.map((day) => (
                    <div key={day.day} className="rounded-2xl border overflow-hidden"
                      style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
                      <div className="px-5 py-3 border-b font-semibold text-sm"
                        style={{ backgroundColor: '#F3EFE9', borderColor: '#E8DFD0', color: '#3B4B3F' }}>
                        {day.day}
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-4 divide-x divide-stone-200">
                        {[
                          { label: '🌅 Breakfast', meal: day.breakfast },
                          { label: '☀️ Lunch', meal: day.lunch },
                          { label: '🌙 Dinner', meal: day.dinner },
                          { label: '🍎 Snack', meal: day.snack },
                        ].map(({ label, meal }) => meal ? (
                          <div key={label} className="p-4">
                            <div className="text-xs mb-1.5" style={{ color: '#8A8070' }}>{label}</div>
                            <div className="text-xl mb-1">{meal.emoji}</div>
                            <div className="text-xs font-medium leading-tight" style={{ color: '#3B4B3F' }}>
                              {meal.name}
                            </div>
                          </div>
                        ) : null)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* List view */}
              {view === 'list' && (
                <div className="space-y-2">
                  {generated.days.map((day) => (
                    <div key={day.day} className="rounded-2xl border p-4"
                      style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
                      <div className="font-semibold text-sm mb-3" style={{ color: '#3B4B3F' }}>{day.day}</div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        {[
                          { label: '🌅', meal: day.breakfast },
                          { label: '☀️', meal: day.lunch },
                          { label: '🌙', meal: day.dinner },
                          day.snack ? { label: '🍎', meal: day.snack } : null,
                        ].filter(Boolean).map((item) => item && (
                          <span key={item.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                            style={{ backgroundColor: '#F3EFE9', color: '#4A4040' }}>
                            {item.meal.emoji} {item.meal.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/culture-kitchen/grocery-list"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#D09E5A', color: '#FFFDF9' }}>
                  🛒 Generate Grocery List
                </Link>
                <Link href="/culture-kitchen/saved-meals"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2"
                  style={{ borderColor: '#3B4B3F', color: '#3B4B3F' }}>
                  ❤️ Save This Plan
                </Link>
              </div>

              {/* AI Teaser */}
              <div className="mt-6 rounded-2xl p-5 border-2 border-dashed"
                style={{ borderColor: '#D09E5A', backgroundColor: '#FBF4E8' }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>
                      AI Personalization — Coming Soon
                    </div>
                    <p className="text-sm" style={{ color: '#8A8070' }}>
                      Future versions will use Claude AI to generate custom {generated.cultureName} recipes
                      tailored exactly to your family&apos;s pantry, budget, and dietary needs — with homeschool
                      lessons matched to your children&apos;s grade level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
