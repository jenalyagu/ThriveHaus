import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCultureById, cultures } from '@/lib/culture-kitchen/cultures';

export function generateStaticParams() {
  return cultures.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const culture = getCultureById(id);
  return { title: culture ? `${culture.name} | Culture Kitchen` : 'Culture' };
}

export default async function CultureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const culture = getCultureById(id);
  if (!culture) notFound();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: culture.bgGradient }}
      >
        <div className="text-5xl mb-3">{culture.emoji}</div>
        <h1 className="text-3xl font-serif text-white drop-shadow">{culture.name}</h1>
        <p className="text-white/80 mt-2 max-w-md mx-auto">{culture.tagline}</p>
        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          {culture.languages.map((lang) => (
            <span key={lang} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Region', value: culture.region },
          { label: 'Population', value: culture.population },
          { label: 'Country', value: culture.country },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-xs text-[var(--color-sage)] mb-1">{stat.label}</div>
            <div className="font-semibold text-sm">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-3">About {culture.name} Food</h2>
        <p className="text-[var(--color-charcoal)] leading-relaxed mb-4">{culture.description}</p>
        <p className="text-sm text-[var(--color-sage)]">{culture.foodHistory}</p>
      </div>

      {/* Map fact */}
      <div className="card p-4 border-l-4" style={{ borderColor: culture.primaryColor }}>
        <p className="text-sm font-medium mb-1">🗺 Did You Know?</p>
        <p className="text-sm text-[var(--color-sage)]">{culture.mapFact}</p>
      </div>

      {/* Common ingredients */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-4">Key Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {culture.commonIngredients.map((ing) => (
            <span key={ing} className="bg-[var(--color-sand)] px-3 py-1.5 rounded-full text-sm">
              {ing}
            </span>
          ))}
        </div>
      </div>

      {/* Nutrition themes */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-4">Nutrition Themes</h2>
        <ul className="space-y-2">
          {culture.nutritionThemes.map((theme) => (
            <li key={theme} className="flex items-start gap-2 text-sm">
              <span className="text-[var(--color-terracotta)] mt-0.5">●</span>
              {theme}
            </li>
          ))}
        </ul>
      </div>

      {/* Connections */}
      {culture.connections.length > 0 && (
        <div className="card p-6">
          <h2 className="font-serif text-xl mb-4">Cultural Connections</h2>
          <div className="space-y-4">
            {culture.connections.map((conn) => {
              const linked = getCultureById(conn.cultureId);
              return (
                <div key={conn.cultureId} className="border border-[var(--color-sand)] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    {linked && <span className="text-xl">{linked.emoji}</span>}
                    <div>
                      <span className="font-semibold text-sm">{conn.headline}</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        conn.strength === 'strong'
                          ? 'bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)]'
                          : 'bg-[var(--color-sand)] text-[var(--color-sage)]'
                      }`}>
                        {conn.linkType}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-sage)] mb-2">{conn.detail}</p>
                  {conn.sharedIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-[var(--color-sage)]">Shared:</span>
                      {conn.sharedIngredients.map((ing) => (
                        <span key={ing} className="text-xs bg-[var(--color-sand)] px-2 py-0.5 rounded-full">
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recipes CTA */}
      <div className="text-center py-4">
        <p className="text-[var(--color-sage)] text-sm mb-4">
          {culture.recipeIds.length} recipes from {culture.name} culture
        </p>
        <Link href="/culture-kitchen/meal-plan" className="btn-primary">
          See {culture.name} Meal Plan
        </Link>
      </div>
    </div>
  );
}
