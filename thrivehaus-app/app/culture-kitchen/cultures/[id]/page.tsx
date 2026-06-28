'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCultureById } from '@/lib/culture-kitchen/cultures';
import { getRecipesByCulture } from '@/lib/culture-kitchen/recipes';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CultureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const culture = getCultureById(id);
  if (!culture) notFound();
  const recipes = getRecipesByCulture(id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8 font-medium" style={{ color: '#8A8070' }}>
        <Link href="/culture-kitchen" className="hover:text-[#3B4B3F] transition-colors">Home</Link>
        <span>›</span>
        <Link href="/culture-kitchen/cultures" className="hover:text-[#3B4B3F] transition-colors">Cultures</Link>
        <span>›</span>
        <span style={{ color: '#3B4B3F' }}>{culture.name}</span>
      </nav>

      {/* Hero */}
      <div
        className="rounded-3xl overflow-hidden mb-10 relative"
        style={{ background: `linear-gradient(135deg, ${culture.primaryColor}30 0%, ${culture.accentColor}40 50%, #2A3A2E 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 0%, transparent 70%)' }}
        />
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-6xl shrink-0 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${culture.primaryColor}60, ${culture.accentColor}80)` }}
          >
            {culture.emoji}
          </div>
          <div className="flex-1">
            <Badge variant="default" className="mb-3">{culture.region}</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2" style={{ color: '#1E2D22' }}>
              {culture.name} Cuisine
            </h1>
            <p className="text-lg italic font-serif mb-5" style={{ color: '#4A5E4E' }}>{culture.tagline}</p>
            <div className="flex flex-wrap gap-5 text-sm font-medium" style={{ color: '#5A6F5E' }}>
              <span>🌐 {culture.country}</span>
              <span>👥 {culture.population}</span>
              <span>🗣 {culture.languages.slice(0, 2).join(', ')}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Button asChild variant="default">
              <Link href={`/culture-kitchen/meal-plan?culture=${culture.id}`}>📅 Plan a Week</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/culture-kitchen/grocery-list?culture=${culture.id}`}>🛒 Shop Ingredients</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">🗺 Overview</TabsTrigger>
          <TabsTrigger value="recipes">🍽 Recipes ({recipes.length})</TabsTrigger>
          <TabsTrigger value="history">📖 History</TabsTrigger>
          <TabsTrigger value="nutrition">🥗 Nutrition</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-[0_8px_24px_rgba(59,75,63,0.1)] transition-shadow">
                <CardHeader>
                  <CardTitle>About this Cuisine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B6060' }}>{culture.description}</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-[0_8px_24px_rgba(59,75,63,0.1)] transition-shadow">
                <CardHeader>
                  <CardTitle>🗺 Geography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B6060' }}>{culture.geographyNotes}</p>
                  <div className="rounded-xl p-4 text-sm italic" style={{ backgroundColor: '#F0EDE8', color: '#5A6F5E', borderLeft: '3px solid #D09E5A' }}>
                    💡 <strong>Map Fact:</strong> {culture.mapFact}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader><CardTitle>🧂 Pantry Staples</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {culture.commonIngredients.map((ing) => (
                    <Badge key={ing} variant="default">{ing}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>🗣 Languages Spoken</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {culture.languages.map((lang) => (
                    <Badge key={lang} variant="sage">{lang}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI teaser */}
            <Card className="border-2 border-dashed" style={{ borderColor: '#D09E5A', background: 'linear-gradient(135deg, #FBF4E8, #F5E8D0)' }}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">✨</span>
                  <div>
                    <Badge variant="gold" className="mb-2 text-xs tracking-widest uppercase">AI Personalization — Coming Soon</Badge>
                    <CardTitle className="text-base mb-1">Get recipes tailored to your family</CardTitle>
                    <CardDescription>
                      Soon, Culture Kitchen will use AI to generate {culture.name} recipes personalized
                      to your family size, dietary needs, kids&apos; ages, and available pantry ingredients.
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recipes */}
        <TabsContent value="recipes">
          <div className="space-y-4">
            <p className="text-sm font-medium" style={{ color: '#8A8070' }}>
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} in the {culture.name} collection
            </p>
            {recipes.map((recipe) => (
              <Link key={recipe.id} href={`/culture-kitchen/recipes/${recipe.id}`}>
                <Card className="flex items-center gap-5 p-5 group hover:shadow-[0_8px_24px_rgba(59,75,63,0.12)] hover:-translate-y-0.5 transition-all duration-300">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${culture.primaryColor}30, ${culture.accentColor}40)` }}
                  >
                    {recipe.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: '#3B4B3F' }}>{recipe.name}</span>
                      <Badge variant={recipe.difficulty as 'easy' | 'medium' | 'hard'} className="capitalize">{recipe.difficulty}</Badge>
                    </div>
                    <p className="text-sm line-clamp-1 mb-2" style={{ color: '#8A8070' }}>{recipe.description}</p>
                    <div className="flex gap-4 text-xs font-medium" style={{ color: '#8A8070' }}>
                      <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                      <span>👥 serves {recipe.servings}</span>
                      <span>📚 {recipe.homeschoolLesson.subject}</span>
                    </div>
                  </div>
                  <span className="text-base font-bold shrink-0 group-hover:translate-x-1.5 transition-transform" style={{ color: '#5A6F5E' }}>→</span>
                </Card>
              </Link>
            ))}
            {recipes.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🍳</div>
                <p className="font-serif text-lg" style={{ color: '#3B4B3F' }}>More recipes coming soon!</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">📖 Food History of {culture.name} Cuisine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-loose" style={{ color: '#4A4040' }}>{culture.foodHistory}</p>
              </CardContent>
            </Card>
            <h3 className="font-serif text-xl font-semibold" style={{ color: '#3B4B3F' }}>Stories Behind the Dishes</h3>
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-[0_4px_16px_rgba(59,75,63,0.08)] transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{recipe.emoji}</span>
                    <CardTitle className="text-base">{recipe.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B6060' }}>{recipe.culturalHistory}</p>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/culture-kitchen/recipes/${recipe.id}`}>Make this recipe →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Nutrition */}
        <TabsContent value="nutrition">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>🥗 Nutrition Themes</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {culture.nutritionThemes.map((theme, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#EDF5EC' }}>
                      <span className="text-green-600 font-bold text-lg shrink-0 mt-0.5">✓</span>
                      <p className="text-sm" style={{ color: '#2A4A2E' }}>{theme}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <h3 className="font-serif text-xl font-semibold" style={{ color: '#3B4B3F' }}>Nutrition Per Recipe</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-[0_8px_24px_rgba(59,75,63,0.1)] transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{recipe.emoji}</span>
                      <div>
                        <CardTitle className="text-sm">{recipe.name}</CardTitle>
                        <CardDescription>Per serving</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {[
                        { label: 'Cal', value: recipe.nutritionFacts.calories, unit: '' },
                        { label: 'Protein', value: recipe.nutritionFacts.protein, unit: 'g' },
                        { label: 'Carbs', value: recipe.nutritionFacts.carbs, unit: 'g' },
                        { label: 'Fat', value: recipe.nutritionFacts.fat, unit: 'g' },
                        { label: 'Fiber', value: recipe.nutritionFacts.fiber, unit: 'g' },
                      ].map((fact) => (
                        <div key={fact.label} className="text-center p-2 rounded-xl" style={{ backgroundColor: '#F0F5EE' }}>
                          <div className="font-bold text-sm" style={{ color: '#3B4B3F' }}>{fact.value}{fact.unit}</div>
                          <div className="text-xs" style={{ color: '#8A8070' }}>{fact.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#8A8070' }}>{recipe.nutritionNotes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
