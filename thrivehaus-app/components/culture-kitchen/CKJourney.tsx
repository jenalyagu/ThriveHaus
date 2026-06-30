'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import type { Culture } from '@/lib/culture-kitchen/types';

const STORAGE_KEY = 'ck_visited_cultures';

function getVisited(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function markCultureVisited(cultureId: string) {
  if (typeof window === 'undefined') return;
  const visited = getVisited();
  if (!visited.includes(cultureId)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited, cultureId]));
  }
}

export default function CKJourney() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getVisited());
    const handler = () => setVisited(getVisited());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const total = cultures.length;
  const pct = Math.round((visited.length / total) * 100);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Your Journey</h3>
        <span className="text-xs text-[var(--color-sage)]">{visited.length}/{total} cultures</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[var(--color-sand)] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[var(--color-terracotta)] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Culture pills */}
      <div className="flex flex-wrap gap-2">
        {cultures.map((c: Culture) => {
          const done = visited.includes(c.id);
          return (
            <Link
              key={c.id}
              href={`/culture-kitchen/cultures/${c.id}`}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                done
                  ? 'border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)]'
                  : 'border-[var(--color-sand)] bg-[var(--color-sand)] text-[var(--color-sage)]'
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
              {done && <span>✓</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
