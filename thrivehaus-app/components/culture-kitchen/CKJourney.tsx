'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'ck_visited_cultures';

export function useVisitedCultures() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setVisited(JSON.parse(raw));
    } catch {}
  }, []);

  return visited;
}

export function markCultureVisited(cultureId: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const visited: string[] = raw ? JSON.parse(raw) : [];
    if (!visited.includes(cultureId)) {
      const updated = [...visited, cultureId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {}
}

const LINK_TYPE_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  colonization: { label: 'Colonial history', color: '#F5E8D0', icon: '⚔️' },
  trade:        { label: 'Trade route',      color: '#E8F0D8', icon: '🚢' },
  migration:    { label: 'Migration',        color: '#E8E0F0', icon: '🌍' },
  empire:       { label: 'Shared empire',    color: '#F0E8D0', icon: '👑' },
  geography:    { label: 'Neighbors',        color: '#D8EEF0', icon: '🗺' },
  ingredient:   { label: 'Shared roots',     color: '#F0D8E8', icon: '🌱' },
};

export default function CKJourney() {
  const visited = useVisitedCultures();

  if (visited.length === 0) return null;

  const visitedCultures = cultures.filter((c) => visited.includes(c.id));
  const unvisited = cultures.filter((c) => !visited.includes(c.id));

  // Collect all cross-connections between visited cultures
  const connections: { from: string; to: string; conn: (typeof cultures[0]['connections'][0]) }[] = [];
  for (const culture of visitedCultures) {
    for (const conn of culture.connections) {
      if (visited.includes(conn.cultureId)) {
        const alreadyAdded = connections.some(
          (c) => (c.from === conn.cultureId && c.to === culture.id) ||
                 (c.from === culture.id && c.to === conn.cultureId)
        );
        if (!alreadyAdded) {
          connections.push({ from: culture.id, to: conn.cultureId, conn });
        }
      }
    }
  }

  const getCulture = (id: string) => cultures.find((c) => c.id === id)!;
  const pct = Math.round((visited.length / cultures.length) * 100);

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>
            Your Cultural Journey
          </p>
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: '#3B4B3F' }}>
            {visited.length} of {cultures.length} Cultures Explored
          </h2>
        </div>
        <span className="text-3xl font-bold font-serif" style={{ color: pct === 100 ? '#D09E5A' : '#5A6F5E' }}>
          {pct}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: '#E8E2D8' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3B4B3F, #5A8F5E, #D09E5A)',
          }}
        />
        {cultures.map((c, i) => (
          <div
            key={c.id}
            className="absolute top-0 bottom-0 w-0.5"
            style={{
              left: `${((i + 1) / cultures.length) * 100}%`,
              backgroundColor: 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Explored cultures */}
      <div className="flex flex-wrap gap-3 mb-8">
        {visitedCultures.map((c) => (
          <Link key={c.id} href={`/culture-kitchen/cultures/${c.id}`}>
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{
                background: `linear-gradient(135deg, ${c.primaryColor}25, ${c.accentColor}35)`,
                border: `1.5px solid ${c.primaryColor}50`,
                color: '#3B4B3F',
              }}
            >
              <span className="text-lg">{c.emoji}</span>
              {c.name}
              <span className="text-xs opacity-60">✓</span>
            </div>
          </Link>
        ))}
        {unvisited.map((c) => (
          <Link key={c.id} href={`/culture-kitchen/cultures/${c.id}`}>
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: '#F0EDE8',
                border: '1.5px dashed #C8C0B0',
                color: '#8A8070',
              }}
            >
              <span className="text-lg opacity-40">{c.emoji}</span>
              {c.name}
            </div>
          </Link>
        ))}
      </div>

      {/* Cross-connections unlocked */}
      {connections.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-4" style={{ color: '#5A6F5E' }}>
            🔗 {connections.length} cultural connection{connections.length !== 1 ? 's' : ''} unlocked
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {connections.map(({ from, to, conn }, i) => {
              const fromC = getCulture(from);
              const toC = getCulture(to);
              const meta = LINK_TYPE_LABELS[conn.linkType];
              return (
                <Card
                  key={i}
                  className="p-5 hover:shadow-[0_8px_24px_rgba(59,75,63,0.1)] hover:-translate-y-0.5 transition-all duration-300"
                  style={{ backgroundColor: meta.color }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{fromC.emoji}</span>
                    <span className="text-sm font-bold" style={{ color: '#3B4B3F' }}>
                      {fromC.name}
                    </span>
                    <span className="text-[#8A8070] text-sm">↔</span>
                    <span className="text-xl">{toC.emoji}</span>
                    <span className="text-sm font-bold" style={{ color: '#3B4B3F' }}>
                      {toC.name}
                    </span>
                    <Badge variant="outline" className="ml-auto text-xs shrink-0">
                      {meta.icon} {meta.label}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold mb-1" style={{ color: '#3B4B3F' }}>{conn.headline}</p>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#6B6060' }}>
                    {conn.detail.slice(0, 140)}…
                  </p>
                  {conn.sharedIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {conn.sharedIngredients.slice(0, 4).map((ing) => (
                        <span
                          key={ing}
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: 'rgba(59,75,63,0.1)', color: '#3B4B3F' }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Teaser if 0 connections (visited only 1) */}
      {connections.length === 0 && visited.length === 1 && (
        <Card className="p-6 border-dashed" style={{ borderColor: '#C8C0B0', backgroundColor: '#FAFAF8' }}>
          <p className="text-sm font-medium mb-1" style={{ color: '#3B4B3F' }}>
            🔗 Explore another culture to unlock connections
          </p>
          <p className="text-xs" style={{ color: '#8A8070' }}>
            {visitedCultures[0].name} cuisine has {visitedCultures[0].connections.length} documented cultural links.
            Visit a connected culture to see how they influenced each other.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {visitedCultures[0].connections.map((conn) => {
              const linked = getCulture(conn.cultureId);
              return (
                <Button key={conn.cultureId} asChild variant="outline" size="sm">
                  <Link href={`/culture-kitchen/cultures/${conn.cultureId}`}>
                    {linked.emoji} {linked.name} →
                  </Link>
                </Button>
              );
            })}
          </div>
        </Card>
      )}
    </section>
  );
}
