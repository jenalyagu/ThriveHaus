'use client';

import { useState } from 'react';
import { groceryListFromPlan } from '@/lib/culture-kitchen/meal-plans';
import type { GroceryItem } from '@/lib/culture-kitchen/types';

const CATEGORIES = ['All', 'Meat & Seafood', 'Produce', 'Pantry', 'Pasta & Grains', 'Dairy'];

const CATEGORY_ICONS: Record<string, string> = {
  'Meat & Seafood': '🥩',
  'Produce': '🥦',
  'Pantry': '🫙',
  'Pasta & Grains': '🌾',
  'Dairy': '🥛',
};

export default function GroceryListPage() {
  const [items, setItems] = useState<(GroceryItem & { checked: boolean })[]>(
    groceryListFromPlan.map((item) => ({ ...item, checked: false }))
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const toggleItem = (index: number) => {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const checkAll = () => setItems((prev) => prev.map((item) => ({ ...item, checked: true })));
  const clearAll = () => setItems((prev) => prev.map((item) => ({ ...item, checked: false })));

  const filtered = items.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped = CATEGORIES.slice(1).reduce<Record<string, typeof items>>((acc, cat) => {
    const catItems = filtered.filter((i) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  const checkedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;
  const progress = Math.round((checkedCount / totalCount) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3B4B3F' }}>
          🛒 Grocery List
        </h1>
        <p className="text-sm" style={{ color: '#8A8070' }}>
          Ingredients from your Filipino Heritage Week meal plan
        </p>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl p-5 mb-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#3B4B3F' }}>
            {checkedCount} of {totalCount} items collected
          </span>
          <span className="text-sm font-bold" style={{ color: checkedCount === totalCount ? '#5A6F5E' : '#8A8070' }}>
            {progress}%
          </span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8DFD0' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: '#5A6F5E' }} />
        </div>
        {checkedCount === totalCount && (
          <p className="text-sm mt-3 text-center font-medium" style={{ color: '#5A6F5E' }}>
            🎉 Shopping complete! Time to cook.
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2 rounded-xl border text-sm outline-none"
          style={{ borderColor: '#E8DFD0', backgroundColor: '#FFFDF9', color: '#3B4B3F', fontFamily: 'inherit' }}
        />
        <button onClick={checkAll} className="text-xs px-3 py-2 rounded-lg border"
          style={{ borderColor: '#C8D8C4', color: '#5A6F5E' }}>
          Check All
        </button>
        <button onClick={clearAll} className="text-xs px-3 py-2 rounded-lg border"
          style={{ borderColor: '#E8DFD0', color: '#8A8070' }}>
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: activeCategory === cat ? '#3B4B3F' : '#F3EFE9',
              color: activeCategory === cat ? '#FFFDF9' : '#5A6F5E',
            }}>
            {CATEGORY_ICONS[cat] && <span className="mr-1">{CATEGORY_ICONS[cat]}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* Grouped by category */}
      <div className="space-y-6">
        {activeCategory === 'All' ? (
          Object.entries(grouped).map(([category, catItems]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{CATEGORY_ICONS[category]}</span>
                <h3 className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#5A6F5E' }}>
                  {category}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8DFD0', color: '#6B6060' }}>
                  {catItems.filter((i) => i.checked).length}/{catItems.length}
                </span>
              </div>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#E8DFD0' }}>
                {catItems.map((item, idx) => {
                  const globalIdx = items.findIndex((i) => i.name === item.name);
                  return (
                    <button key={idx} onClick={() => toggleItem(globalIdx)}
                      className="w-full flex items-start gap-4 px-5 py-4 border-b last:border-0 text-left transition-all hover:bg-stone-50"
                      style={{ borderColor: '#F3EFE9', backgroundColor: item.checked ? '#F5FAF5' : '#FFFDF9' }}>
                      <div className="w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor: item.checked ? '#5A6F5E' : '#C8C0B0',
                          backgroundColor: item.checked ? '#5A6F5E' : 'transparent',
                        }}>
                        {item.checked && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-medium text-sm"
                            style={{ color: item.checked ? '#8A8070' : '#3B4B3F',
                              textDecoration: item.checked ? 'line-through' : 'none' }}>
                            {item.name}
                          </span>
                          <span className="text-xs shrink-0" style={{ color: '#8A8070' }}>
                            {item.amount} {item.unit || ''}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.recipeNames.map((rn) => (
                            <span key={rn} className="text-xs px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: '#F3EFE9', color: '#8A8070' }}>
                              {rn}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#E8DFD0' }}>
            {filtered.map((item, idx) => {
              const globalIdx = items.findIndex((i) => i.name === item.name);
              return (
                <button key={idx} onClick={() => toggleItem(globalIdx)}
                  className="w-full flex items-start gap-4 px-5 py-4 border-b last:border-0 text-left transition-all"
                  style={{ borderColor: '#F3EFE9', backgroundColor: item.checked ? '#F5FAF5' : '#FFFDF9' }}>
                  <div className="w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: item.checked ? '#5A6F5E' : '#C8C0B0',
                      backgroundColor: item.checked ? '#5A6F5E' : 'transparent',
                    }}>
                    {item.checked && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-medium text-sm"
                        style={{ color: item.checked ? '#8A8070' : '#3B4B3F',
                          textDecoration: item.checked ? 'line-through' : 'none' }}>
                        {item.name}
                      </span>
                      <span className="text-xs shrink-0" style={{ color: '#8A8070' }}>
                        {item.amount} {item.unit || ''}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-serif text-base" style={{ color: '#3B4B3F' }}>No items found</p>
        </div>
      )}

      {/* Print / Share */}
      <div className="flex gap-3 mt-8">
        <button onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2"
          style={{ borderColor: '#3B4B3F', color: '#3B4B3F' }}>
          🖨️ Print List
        </button>
      </div>
    </div>
  );
}
