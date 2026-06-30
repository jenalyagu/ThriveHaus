import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';

export const metadata = { title: 'All Cultures | Culture Kitchen' };

export default function CulturesPage() {
  return (
    <div>
      <div className="mb-6">
        <p className="section-tag mb-2">Explore</p>
        <h1 className="text-2xl font-serif">13 World Cultures</h1>
        <p className="text-sm text-[var(--color-sage)] mt-1">
          Click any culture to explore its food, history, and homeschool lessons.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cultures.map((culture) => (
          <Link
            key={culture.id}
            href={`/culture-kitchen/cultures/${culture.id}`}
            className="card overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div
              className="h-20 flex items-center justify-center"
              style={{ background: culture.bgGradient }}
            >
              <span className="text-4xl">{culture.emoji}</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold">{culture.name}</h2>
                <span className="text-xs text-[var(--color-sage)] bg-[var(--color-sand)] px-2 py-0.5 rounded-full">
                  {culture.region}
                </span>
              </div>
              <p className="text-sm text-[var(--color-sage)] line-clamp-2">{culture.tagline}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {culture.commonIngredients.slice(0, 3).map((ing) => (
                  <span key={ing} className="text-xs bg-[var(--color-sand)] px-2 py-0.5 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
