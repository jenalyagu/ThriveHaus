'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cultures } from '@/lib/culture-kitchen/cultures';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const regions = ['All', 'Southeast Asia', 'North America', 'Middle East', 'South Asia', 'Europe', 'North Africa'];

export default function CultureLibraryPage() {
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const filtered = cultures.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = activeRegion === 'All' || c.region.includes(activeRegion);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#D09E5A' }}>Culture Library</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-3" style={{ color: '#3B4B3F' }}>
          🌍 World Cuisines
        </h1>
        <p className="text-base max-w-xl" style={{ color: '#8A8070' }}>
          Explore world cuisines — their histories, ingredients, recipes, and homeschool connections.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mb-10 space-y-4">
        <Input
          placeholder="Search cultures or regions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96"
        />
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <Button
              key={region}
              size="sm"
              variant={activeRegion === region ? 'default' : 'ghost'}
              onClick={() => setActiveRegion(region)}
              className="rounded-full"
            >
              {region}
            </Button>
          ))}
        </div>
      </div>

      {/* Culture Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((culture) => (
          <Link key={culture.id} href={`/culture-kitchen/cultures/${culture.id}`}>
            <Card className="group hover:shadow-[0_16px_40px_rgba(59,75,63,0.16)] hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
              {/* Gradient header with emoji */}
              <div
                className="h-36 flex items-end px-6 pb-5 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${culture.primaryColor}55, ${culture.accentColor}70, ${culture.primaryColor}30)`,
                }}
              >
                <div
                  className="absolute top-4 right-5 text-7xl opacity-40 select-none group-hover:scale-110 group-hover:opacity-60 transition-all duration-500"
                >
                  {culture.emoji}
                </div>
                <div className="relative z-10">
                  <Badge variant="default" className="mb-2 text-xs">{culture.region}</Badge>
                  <div className="font-serif text-2xl font-bold" style={{ color: '#1E2D22', textShadow: '0 1px 2px rgba(255,255,255,0.4)' }}>
                    {culture.name}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#6B6060' }}>
                  {culture.tagline}
                </p>

                <div className="flex items-center gap-4 text-xs mb-4 font-medium" style={{ color: '#8A8070' }}>
                  <span>🍽 {culture.recipeIds.length} recipes</span>
                  <span>👥 {culture.population}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {culture.commonIngredients.slice(0, 4).map((ing) => (
                    <Badge key={ing} variant="default">{ing}</Badge>
                  ))}
                  {culture.commonIngredients.length > 4 && (
                    <Badge variant="outline">+{culture.commonIngredients.length - 4} more</Badge>
                  )}
                </div>

                <div
                  className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all"
                  style={{ color: '#5A6F5E' }}
                >
                  Explore cuisine
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-5">🔍</div>
          <p className="font-serif text-xl mb-2" style={{ color: '#3B4B3F' }}>No cultures found</p>
          <p className="text-sm" style={{ color: '#8A8070' }}>Try a different search or region filter</p>
        </div>
      )}
    </div>
  );
}
