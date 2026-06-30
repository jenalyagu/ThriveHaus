'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCultureById } from '@/lib/culture-kitchen/cultures';
import { getRecipesByCulture } from '@/lib/culture-kitchen/recipes';
import { use } from 'react';

export default function CultureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const culture = getCultureById(id);

  if (!culture) notFound();

  const recipes = getRecipesByCulture(id);

  return <CultureDetail culture={culture} recipes={recipes} />;
}

function CultureDetail({ culture, recipes }: { culture: ReturnType<typeof getCultureById> & object; recipes: ReturnType<typeof getRecipesByCulture> }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'recipes' | 'history' | 'nutrition'>('overview');

  const tabs = [
    { id: 'overview', label: '🗺 Overview' },
    { id: 'recipes', label: '🍽 Recipes' },
    { id: 'history', label: '📖 History' },
    { id: 'nutrition', label: '🥗 Nutrition' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8A8070' }}>
        <Link href="/culture-kitchen" className="hover:underline">Home</Link>
        <span>›</span>
        <Link href="/culture-kitchen/cultures" className="hover:underline">Cultures</Link>
        <span>›</span>
        <span style={{ color: '#3B4B3F' }}>{culture!.name}</span>
      </div>

      {/* Hero card */}
      <div className="rounded-3xl overflow-hidden mb-8 relative"
        style={{ background: `linear-gradient(135deg, ${culture!.primaryColor}33, ${culture!.accentColor}44, #F3EFE9)` }}>
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="text-8xl">{culture!.emoji}</div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-2" style={{ color: '#5A6F5E' }}>{culture!.region}</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2" style={{ color: '#3B4B3F' }}>
              {culture!.name} Cuisine
            </h1>
            <p className="text-lg italic font-serif mb-4" style={{ color: '#5A6F5E' }}>
              {culture!.tagline}
            </p>
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#6B6060' }}>
              <span>🌐 {culture!.country}</span>
              <span>👥 {culture!.population}</span>
              <span>🗣 {culture!.languages.slice(0, 2).join(', ')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href={`/culture-kitchen/meal-plan?culture=${culture!.id}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-center transition-all hover:scale-105"
              style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
              📅 Plan a Week
            </Link>
            <Link href={`/culture-kitchen/grocery-list?culture=${culture!.id}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-center border-2 transition-all"
              style={{ borderColor: '#3B4B3F', color: '#3B4B3F' }}>
              🛒 Shop Ingredients
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b overflow-x-auto" style={{ borderColor: '#E8DFD0' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all"
            style={{
              borderColor: activeTab === tab.id ? '#3B4B3F' : 'transparent',
              color: activeTab === tab.id ? '#3B4B3F' : '#8A8070',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Description */}
            <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <h2 className="font-serif text-xl mb-3" style={{ color: '#3B4B3F' }}>About this Cuisine</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6060' }}>{culture!.description}</p>
            </div>

            {/* Geography */}
            <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <h2 className="font-serif text-xl mb-3" style={{ color: '#3B4B3F' }}>🗺 Geography</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B6060' }}>{culture!.geographyNotes}</p>
              <div className="rounded-xl p-4 text-sm italic" style={{ backgroundColor: '#F3EFE9', color: '#5A6F5E' }}>
                💡 <strong>Map Fact:</strong> {culture!.mapFact}
              </div>
            </div>
          </div>

          {/* Common Ingredients */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4" style={{ color: '#3B4B3F' }}>🧂 Pantry Staples</h2>
            <div className="flex flex-wrap gap-2">
              {culture!.commonIngredients.map((ing) => (
                <span key={ing}
                  className="px-3 py-1.5 rounded-full text-sm border"
                  style={{ backgroundColor: '#F3EFE9', borderColor: '#E8DFD0', color: '#5A6F5E' }}>
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4" style={{ color: '#3B4B3F' }}>🗣 Languages Spoken</h2>
            <div className="flex flex-wrap gap-2">
              {culture!.languages.map((lang) => (
                <span key={lang} className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#E8DFD0', color: '#3B4B3F' }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* AI Personalization Teaser */}
          <div className="rounded-2xl p-6 border-2 border-dashed"
            style={{ borderColor: '#D09E5A', backgroundColor: '#FBF4E8' }}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>
                  AI Personalization — Coming Soon
                </div>
                <h3 className="font-semibold mb-1" style={{ color: '#3B4B3F' }}>
                  Get recipes tailored to your family
                </h3>
                <p className="text-sm" style={{ color: '#8A8070' }}>
                  Soon, Culture Kitchen will use AI to generate {culture!.name}{' '}recipes personalized
                  to your family size, dietary needs, kids&apos; ages, and available pantry ingredients.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Recipes */}
      {activeTab === 'recipes' && (
        <div className="space-y-4">
          <p className="text-sm mb-6" style={{ color: '#8A8070' }}>
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} in the {culture!.name} collection
          </p>
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/culture-kitchen/recipes/${recipe.id}`}
              className="flex items-center gap-5 p-5 rounded-2xl border group hover:shadow-md transition-all"
              style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl shrink-0"
                style={{ backgroundColor: '#F3EFE9' }}>
                {recipe.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold" style={{ color: '#3B4B3F' }}>{recipe.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{
                      backgroundColor: recipe.difficulty === 'easy' ? '#E8F0E8' : recipe.difficulty === 'medium' ? '#FBF4E8' : '#F5E8E8',
                      color: recipe.difficulty === 'easy' ? '#5A6F5E' : recipe.difficulty === 'medium' ? '#B08030' : '#B05042',
                    }}>
                    {recipe.difficulty}
                  </span>
                </div>
                <p className="text-sm line-clamp-1 mb-2" style={{ color: '#8A8070' }}>{recipe.description}</p>
                <div className="flex gap-4 text-xs" style={{ color: '#8A8070' }}>
                  <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>👥 serves {recipe.servings}</span>
                  <span>📚 {recipe.homeschoolLesson.subject}</span>
                </div>
              </div>
              <div className="text-sm font-medium shrink-0 group-hover:translate-x-1 transition-transform"
                style={{ color: '#5A6F5E' }}>→</div>
            </Link>
          ))}

          {recipes.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🍳</div>
              <p className="font-serif text-lg" style={{ color: '#3B4B3F' }}>More recipes coming soon!</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-8 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-2xl mb-5" style={{ color: '#3B4B3F' }}>
              📖 Food History of {culture!.name} Cuisine
            </h2>
            <p className="text-base leading-loose" style={{ color: '#4A4040' }}>
              {culture!.foodHistory}
            </p>
          </div>

          {/* Recipe Histories */}
          <h3 className="font-serif text-xl" style={{ color: '#3B4B3F' }}>Stories Behind the Dishes</h3>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{recipe.emoji}</span>
                <h4 className="font-semibold" style={{ color: '#3B4B3F' }}>{recipe.name}</h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6060' }}>{recipe.culturalHistory}</p>
              <Link href={`/culture-kitchen/recipes/${recipe.id}`}
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium hover:underline"
                style={{ color: '#5A6F5E' }}>
                Make this recipe →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Nutrition */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4" style={{ color: '#3B4B3F' }}>
              🥗 Nutrition Themes
            </h2>
            <div className="space-y-3">
              {culture!.nutritionThemes.map((theme, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: '#F3EFE9' }}>
                  <span className="text-green-600 font-bold text-lg shrink-0">✓</span>
                  <p className="text-sm" style={{ color: '#4A4040' }}>{theme}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Per-Recipe Nutrition */}
          <h3 className="font-serif text-xl" style={{ color: '#3B4B3F' }}>Nutrition Per Recipe</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{recipe.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#3B4B3F' }}>{recipe.name}</div>
                    <div className="text-xs" style={{ color: '#8A8070' }}>Per serving</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'Cal', value: recipe.nutritionFacts.calories, unit: '' },
                    { label: 'Protein', value: recipe.nutritionFacts.protein, unit: 'g' },
                    { label: 'Carbs', value: recipe.nutritionFacts.carbs, unit: 'g' },
                    { label: 'Fat', value: recipe.nutritionFacts.fat, unit: 'g' },
                    { label: 'Fiber', value: recipe.nutritionFacts.fiber, unit: 'g' },
                  ].map((fact) => (
                    <div key={fact.label} className="text-center p-2 rounded-lg"
                      style={{ backgroundColor: '#F3EFE9' }}>
                      <div className="font-bold text-sm" style={{ color: '#3B4B3F' }}>
                        {fact.value}{fact.unit}
                      </div>
                      <div className="text-xs" style={{ color: '#8A8070' }}>{fact.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3 leading-relaxed" style={{ color: '#8A8070' }}>
                  {recipe.nutritionNotes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
