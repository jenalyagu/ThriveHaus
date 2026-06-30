import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import CKJourney from '@/components/culture-kitchen/CKJourney';

export default function CultureKitchenHome() {
  const featured = cultures.filter((c) => c.recipeIds.length > 0).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <p className="section-tag mb-3">Culture Kitchen</p>
        <h1 className="text-3xl md:text-4xl font-serif mb-3">
          Cook the World with Your Kids
        </h1>
        <p className="text-[var(--color-sage)] max-w-lg mx-auto">
          Explore 13 global cultures through recipes, meal plans, and hands-on homeschool lessons.
        </p>
      </div>

      {/* Journey tracker */}
      <CKJourney />

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/culture-kitchen/cultures', emoji: '🌍', label: 'All Cultures' },
          { href: '/culture-kitchen/meal-plan', emoji: '📅', label: 'Meal Plans' },
          { href: '/culture-kitchen/grocery-list', emoji: '🛒', label: 'Grocery List' },
          { href: '/culture-kitchen/saved-meals', emoji: '🔖', label: 'Saved Meals' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card p-4 text-center hover:border-[var(--color-terracotta)] transition-colors"
          >
            <div className="text-2xl mb-1">{item.emoji}</div>
            <div className="text-sm font-medium">{item.label}</div>
          </Link>
        ))}
      </div>

      {/* Featured cultures */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif">Featured Cultures</h2>
          <Link href="/culture-kitchen/cultures" className="text-sm text-[var(--color-terracotta)] font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((culture) => (
            <Link
              key={culture.id}
              href={`/culture-kitchen/cultures/${culture.id}`}
              className="card overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="h-16 flex items-center justify-center text-3xl"
                style={{ background: culture.bgGradient }}
              />
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span>{culture.emoji}</span>
                  <span className="font-semibold text-sm">{culture.name}</span>
                </div>
                <p className="text-xs text-[var(--color-sage)] line-clamp-2">{culture.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
