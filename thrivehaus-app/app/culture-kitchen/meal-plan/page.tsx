'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mealPlans } from '@/lib/culture-kitchen/meal-plans';
import { cultures } from '@/lib/culture-kitchen/cultures';
import type { MealPlan } from '@/lib/culture-kitchen/types';

export default function MealPlanPage() {
  const [selected, setSelected] = useState<MealPlan>(mealPlans[0]);

  return (
    <div className="space-y-6">
      <div>
        <p className="section-tag mb-2">Weekly Planning</p>
        <h1 className="text-2xl font-serif">Meal Plans</h1>
        <p className="text-sm text-[var(--color-sage)] mt-1">
          Choose a culture and get a full week of meals with homeschool themes.
        </p>
      </div>

      {/* Culture selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {mealPlans.map((plan) => {
          const culture = cultures.find((c) => c.id === plan.cultureId);
          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selected.id === plan.id
                  ? 'bg-[var(--color-terracotta)] text-white border-[var(--color-terracotta)]'
                  : 'border-[var(--color-sand)] hover:border-[var(--color-terracotta)]'
              }`}
            >
              <span>{culture?.emoji}</span>
              <span>{plan.cultureName}</span>
            </button>
          );
        })}
      </div>

      {/* Plan summary */}
      <div className="card p-5">
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="text-[var(--color-sage)]">Est. Cost</span>
            <p className="font-semibold">${selected.estimatedCost}/week</p>
          </div>
          <div>
            <span className="text-[var(--color-sage)]">Serves</span>
            <p className="font-semibold">{selected.servings} people</p>
          </div>
          <div className="flex-1">
            <span className="text-[var(--color-sage)]">Homeschool Theme</span>
            <p className="font-semibold">{selected.homeschoolTheme}</p>
          </div>
        </div>
        {selected.dietaryNotes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {selected.dietaryNotes.map((note) => (
              <span key={note} className="text-xs bg-[var(--color-sand)] px-2 py-1 rounded-full">
                {note}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Days */}
      <div className="space-y-3">
        {selected.days.map((day) => (
          <div key={day.day} className="card p-4">
            <h3 className="font-semibold text-sm mb-3 text-[var(--color-terracotta)]">{day.day}</h3>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {[
                { label: '🌅 Breakfast', entry: day.breakfast },
                { label: '☀️ Lunch', entry: day.lunch },
                { label: '🌙 Dinner', entry: day.dinner },
              ].map(({ label, entry }) => (
                <div key={label}>
                  <div className="text-xs text-[var(--color-sage)] mb-0.5">{label}</div>
                  <div className="flex items-center gap-1">
                    <span>{entry.emoji}</span>
                    <span className="text-xs font-medium line-clamp-2">{entry.name}</span>
                  </div>
                </div>
              ))}
            </div>
            {day.snack && (
              <div className="mt-2 pt-2 border-t border-[var(--color-sand)] text-xs text-[var(--color-sage)]">
                🍎 Snack: {day.snack.emoji} {day.snack.name}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/culture-kitchen/grocery-list" className="btn-primary">
          Generate Grocery List
        </Link>
      </div>
    </div>
  );
}
