'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

const STORAGE_KEY = 'ck_saved_recipes';

function getSaved(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function SavedMealsPage() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setSaved(getSaved());
  }, []);

  if (saved.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <p className="section-tag mb-2">Collection</p>
          <h1 className="text-2xl font-serif">Saved Meals</h1>
        </div>
        <div className="card p-12 text-center">
          <Bookmark className="mx-auto mb-3 text-[var(--color-sage)]" size={32} />
          <p className="text-[var(--color-sage)] mb-4">No saved meals yet.</p>
          <Link href="/culture-kitchen/cultures" className="btn-primary">
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="section-tag mb-2">Collection</p>
        <h1 className="text-2xl font-serif">Saved Meals</h1>
        <p className="text-sm text-[var(--color-sage)] mt-1">{saved.length} saved</p>
      </div>

      <div className="grid gap-3">
        {saved.map((id) => (
          <Link
            key={id}
            href={`/culture-kitchen/recipes/${id}`}
            className="card p-4 flex items-center gap-3 hover:border-[var(--color-terracotta)] transition-colors"
          >
            <Bookmark size={16} className="text-[var(--color-terracotta)]" />
            <span className="font-medium text-sm capitalize">{id.replace(/-/g, ' ')}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
