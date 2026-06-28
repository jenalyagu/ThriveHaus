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
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3B4B3F' }}>
          🌍 Culture Library
        </h1>
        <p className="text-base" style={{ color: '#8A8070' }}>
          Explore world cuisines — their histories, ingredients, recipes, and homeschool connections.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mb-8 space-y-4">
        <Input
          placeholder="Search cultures or regions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
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
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-full">
              {/* Header band */}
              <div
                className="h-28 flex items-center px-6"
                style={{
                  background: `linear-gradient(135deg, ${culture.primaryColor}22, ${culture.accentColor}33)`,
                }}
              >
                <span className="text-6xl">{culture.emoji}</span>
                <div className="ml-4">
                  <div className="font-serif text-xl font-semibold" style={{ color: '#3B4B3F' }}>
                    {culture.name}
                  </div>
                  <div className="text-xs" style={{ color: '#5A6F5E' }}>{culture.region}</div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#6B6060' }}>
                  {culture.tagline}
                </p>

                <div className="flex items-center gap-4 text-xs mb-4" style={{ color: '#8A8070' }}>
                  <span>🍽 {culture.recipeIds.length} recipes</span>
                  <span>👥 {culture.population}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {culture.commonIngredients.slice(0, 4).map((ing) => (
                    <Badge key={ing} variant="default">{ing}</Badge>
                  ))}
                  {culture.commonIngredients.length > 4 && (
                    <Badge variant="outline">+{culture.commonIngredients.length - 4} more</Badge>
                  )}
                </div>

                <div
                  className="text-sm font-medium group-hover:gap-2 transition-all flex items-center gap-1"
                  style={{ color: '#5A6F5E' }}
                >
                  Explore culture →
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-serif text-lg" style={{ color: '#3B4B3F' }}>No cultures found</p>
          <p className="text-sm mt-1" style={{ color: '#8A8070' }}>Try a different search or region filter</p>
        </div>
      )}
    </div>
  );
}
