'use client';

import { useState } from 'react';
import { generateGroceryList } from '@/lib/culture-kitchen/meal-plans';
import { Check } from 'lucide-react';

const CATEGORIES = ['Protein', 'Produce', 'Pantry', 'Dairy', 'Spices'];

export default function GroceryListPage() {
  const items = generateGroceryList();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(name: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const byCategory: Record<string, typeof items> = {};
  for (const item of items) {
    const cat = CATEGORIES.includes(item.category) ? item.category : 'Other';
    byCategory[cat] = [...(byCategory[cat] || []), item];
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="section-tag mb-2">Shopping</p>
        <h1 className="text-2xl font-serif">Grocery List</h1>
        <p className="text-sm text-[var(--color-sage)] mt-1">
          {items.length} items · {checked.size} checked
        </p>
      </div>

      {Object.entries(byCategory).map(([category, catItems]) => (
        <div key={category}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-sage)] mb-2">
            {category}
          </h2>
          <div className="card divide-y divide-[var(--color-sand)]">
            {catItems.map((item) => {
              const done = checked.has(item.name);
              return (
                <button
                  key={item.name}
                  onClick={() => toggle(item.name)}
                  className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-[var(--color-sand)]/50"
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    done
                      ? 'bg-[var(--color-terracotta)] border-[var(--color-terracotta)]'
                      : 'border-[var(--color-sage)]'
                  }`}>
                    {done && <Check size={12} className="text-white" />}
                  </div>
                  <span className={`flex-1 text-sm ${done ? 'line-through text-[var(--color-sage)]' : ''}`}>
                    {item.name}
                  </span>
                  <span className="text-xs text-[var(--color-sage)]">{item.amount}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={() => setChecked(new Set())}
        className="btn-secondary w-full"
      >
        Clear All
      </button>
    </div>
  );
}
