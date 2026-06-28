'use client';

import { useState } from 'react';
import { groceryListFromPlan } from '@/lib/culture-kitchen/meal-plans';
import type { GroceryItem } from '@/lib/culture-kitchen/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const CATEGORIES = ['All', 'Meat & Seafood', 'Produce', 'Pantry', 'Pasta & Grains', 'Dairy'];
const CATEGORY_ICONS: Record<string, string> = {
  'Meat & Seafood': '🥩', 'Produce': '🥦', 'Pantry': '🫙', 'Pasta & Grains': '🌾', 'Dairy': '🥛',
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
  const progress = Math.round((checkedCount / items.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3B4B3F' }}>🛒 Grocery List</h1>
        <p className="text-sm" style={{ color: '#8A8070' }}>Ingredients from your Filipino Heritage Week meal plan</p>
      </div>

      {/* Progress */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: '#3B4B3F' }}>
            {checkedCount} of {items.length} items collected
          </span>
          <Badge variant={progress === 100 ? 'sage' : 'default'}>{progress}%</Badge>
        </div>
        <Progress value={progress} />
        {progress === 100 && (
          <p className="text-sm mt-3 text-center font-medium" style={{ color: '#5A6F5E' }}>
            🎉 Shopping complete! Time to cook.
          </p>
        )}
      </Card>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <Input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0"
        />
        <Button size="sm" variant="outline" onClick={checkAll}>Check All</Button>
        <Button size="sm" variant="ghost" onClick={clearAll}>Clear All</Button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={activeCategory === cat ? 'default' : 'ghost'}
            className="rounded-full"
            onClick={() => setActiveCategory(cat)}
          >
            {CATEGORY_ICONS[cat] && <span>{CATEGORY_ICONS[cat]}</span>}
            {cat}
          </Button>
        ))}
      </div>

      {/* Grouped items */}
      <div className="space-y-6">
        {activeCategory === 'All' ? (
          Object.entries(grouped).map(([category, catItems]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{CATEGORY_ICONS[category]}</span>
                <h3 className="font-semibold text-sm uppercase tracking-wider" style={{ color: '#5A6F5E' }}>
                  {category}
                </h3>
                <Badge variant="outline">
                  {catItems.filter((i) => i.checked).length}/{catItems.length}
                </Badge>
              </div>
              <Card className="overflow-hidden">
                {catItems.map((item, idx) => {
                  const globalIdx = items.findIndex((i) => i.name === item.name);
                  return (
                    <div key={idx}>
                      <button
                        onClick={() => toggleItem(globalIdx)}
                        className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F3EFE9]"
                        style={{ backgroundColor: item.checked ? '#F5FAF5' : undefined }}
                      >
                        <div
                          className="w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                          style={{
                            borderColor: item.checked ? '#5A6F5E' : '#C8C0B0',
                            backgroundColor: item.checked ? '#5A6F5E' : 'transparent',
                          }}
                        >
                          {item.checked && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <span
                              className="font-medium text-sm"
                              style={{
                                color: item.checked ? '#8A8070' : '#3B4B3F',
                                textDecoration: item.checked ? 'line-through' : 'none',
                              }}
                            >
                              {item.name}
                            </span>
                            <span className="text-xs shrink-0" style={{ color: '#8A8070' }}>
                              {item.amount} {item.unit || ''}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.recipeNames.map((rn) => (
                              <Badge key={rn} variant="default" className="text-xs">{rn}</Badge>
                            ))}
                          </div>
                        </div>
                      </button>
                      {idx < catItems.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </Card>
            </div>
          ))
        ) : (
          <Card className="overflow-hidden">
            {filtered.map((item, idx) => {
              const globalIdx = items.findIndex((i) => i.name === item.name);
              return (
                <div key={idx}>
                  <button
                    onClick={() => toggleItem(globalIdx)}
                    className="w-full flex items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F3EFE9]"
                    style={{ backgroundColor: item.checked ? '#F5FAF5' : undefined }}
                  >
                    <div
                      className="w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0"
                      style={{
                        borderColor: item.checked ? '#5A6F5E' : '#C8C0B0',
                        backgroundColor: item.checked ? '#5A6F5E' : 'transparent',
                      }}
                    >
                      {item.checked && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className="font-medium text-sm"
                          style={{
                            color: item.checked ? '#8A8070' : '#3B4B3F',
                            textDecoration: item.checked ? 'line-through' : 'none',
                          }}
                        >
                          {item.name}
                        </span>
                        <span className="text-xs shrink-0" style={{ color: '#8A8070' }}>
                          {item.amount} {item.unit || ''}
                        </span>
                      </div>
                    </div>
                  </button>
                  {idx < filtered.length - 1 && <Separator />}
                </div>
              );
            })}
          </Card>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-serif text-base" style={{ color: '#3B4B3F' }}>No items found</p>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <Button variant="outline" onClick={() => window.print()}>🖨️ Print List</Button>
      </div>
    </div>
  );
}
