'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/culture-kitchen/recipes';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  if (!recipe) notFound();
  return <RecipeDetail recipe={recipe} />;
}

function RecipeDetail({ recipe }: { recipe: NonNullable<ReturnType<typeof getRecipeById>> }) {
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [servings, setServings] = useState(recipe.servings);
  const [saved, setSaved] = useState(false);

  const multiplier = servings / recipe.servings;
  const toggleStep = (step: number) => {
    setCheckedSteps((prev) => { const n = new Set(prev); n.has(step) ? n.delete(step) : n.add(step); return n; });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8A8070' }}>
        <Link href="/culture-kitchen" className="hover:underline">Home</Link>
        <span>›</span>
        <Link href={`/culture-kitchen/cultures/${recipe.cultureId}`} className="hover:underline">{recipe.cultureName}</Link>
        <span>›</span>
        <span style={{ color: '#3B4B3F' }}>{recipe.name}</span>
      </nav>

      {/* Hero */}
      <Card className="overflow-hidden mb-8" style={{ background: 'linear-gradient(135deg, #F3EFE9, #E8DFD0)' }}>
        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="text-9xl md:text-[120px] leading-none shrink-0">{recipe.emoji}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="default">{recipe.cultureName}</Badge>
              <Badge variant={recipe.difficulty as 'easy' | 'medium' | 'hard'} className="capitalize">{recipe.difficulty}</Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl mb-3" style={{ color: '#3B4B3F' }}>{recipe.name}</h1>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#6B6060' }}>{recipe.description}</p>

            <div className="flex flex-wrap gap-5 text-sm mb-5" style={{ color: '#6B6060' }}>
              {[
                { emoji: '⏱', value: `${recipe.prepTime} min`, label: 'Prep' },
                { emoji: '🔥', value: `${recipe.cookTime} min`, label: 'Cook' },
                { emoji: '👥', value: `${recipe.servings}`, label: 'Serves' },
                { emoji: '📚', value: recipe.homeschoolLesson.subject, label: 'Lesson' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="text-lg">{s.emoji}</span>
                  <div>
                    <div className="font-medium">{s.value}</div>
                    <div className="text-xs" style={{ color: '#8A8070' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.map((tag) => <Badge key={tag} variant="outline">#{tag}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button variant={saved ? 'default' : 'outline'} onClick={() => setSaved(!saved)}>
          {saved ? '❤️ Saved!' : '🤍 Save Recipe'}
        </Button>
        <Button asChild variant="outline" style={{ borderColor: '#D09E5A', color: '#B08030' }}>
          <Link href="/culture-kitchen/grocery-list">🛒 Add to Grocery List</Link>
        </Button>
        <Button asChild variant="outline" style={{ borderColor: '#5A6F5E', color: '#5A6F5E' }}>
          <Link href={`/culture-kitchen/lessons/${recipe.id}`}>📚 Open Full Lesson</Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="recipe">
        <TabsList>
          <TabsTrigger value="recipe">🍳 Recipe</TabsTrigger>
          <TabsTrigger value="lesson">📚 Lesson</TabsTrigger>
          <TabsTrigger value="nutrition">🥗 Nutrition</TabsTrigger>
          <TabsTrigger value="history">📖 History</TabsTrigger>
        </TabsList>

        {/* RECIPE */}
        <TabsContent value="recipe">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Ingredients</CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => setServings(Math.max(1, servings - 1))}
                        className="w-7 h-7 rounded-full border flex items-center justify-center font-bold"
                        style={{ borderColor: '#E8DFD0', color: '#3B4B3F' }}
                      >−</button>
                      <span className="w-6 text-center font-medium" style={{ color: '#3B4B3F' }}>{servings}</span>
                      <button
                        onClick={() => setServings(servings + 1)}
                        className="w-7 h-7 rounded-full border flex items-center justify-center font-bold"
                        style={{ borderColor: '#E8DFD0', color: '#3B4B3F' }}
                      >+</button>
                      <span className="text-xs" style={{ color: '#8A8070' }}>servings</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-0">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>
                        <div className="flex items-start gap-2 py-2.5 text-sm">
                          <span className="w-20 shrink-0 font-medium" style={{ color: '#3B4B3F' }}>
                            {(() => {
                              const amt = parseFloat(ing.amount);
                              if (!isNaN(amt)) {
                                const scaled = amt * multiplier;
                                return (scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1)) + (ing.unit ? ' ' + ing.unit : '');
                              }
                              return ing.amount + (ing.unit ? ' ' + ing.unit : '');
                            })()}
                          </span>
                          <span style={{ color: '#4A4040' }}>
                            {ing.name}
                            {ing.notes && <span className="text-xs ml-1" style={{ color: '#8A8070' }}>({ing.notes})</span>}
                          </span>
                        </div>
                        {i < recipe.ingredients.length - 1 && <Separator />}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Steps */}
            <div className="md:col-span-3 space-y-4">
              <h2 className="font-serif text-xl" style={{ color: '#3B4B3F' }}>Instructions</h2>
              {recipe.steps.map((step) => (
                <button
                  key={step.step}
                  onClick={() => toggleStep(step.step)}
                  className="w-full text-left p-5 rounded-2xl border transition-all"
                  style={{
                    backgroundColor: checkedSteps.has(step.step) ? '#F0F5F0' : '#FFFDF9',
                    borderColor: checkedSteps.has(step.step) ? '#C8D8C4' : '#E8DFD0',
                    opacity: checkedSteps.has(step.step) ? 0.7 : 1,
                  }}
                >
                  <div className="flex gap-4 items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{
                        backgroundColor: checkedSteps.has(step.step) ? '#5A6F5E' : '#E8DFD0',
                        color: checkedSteps.has(step.step) ? '#FFFDF9' : '#3B4B3F',
                      }}
                    >
                      {checkedSteps.has(step.step) ? '✓' : step.step}
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: '#4A4040',
                          textDecoration: checkedSteps.has(step.step) ? 'line-through' : 'none',
                        }}
                      >
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <div className="mt-2 text-xs px-3 py-2 rounded-lg italic" style={{ backgroundColor: '#FBF4E8', color: '#B08030' }}>
                          💡 Tip: {step.tip}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}

              {/* Kid Tasks */}
              <Card style={{ backgroundColor: '#FBF4E8', borderColor: '#E8CFA0' }}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base" style={{ color: '#7A5A20' }}>👶 Kid Helper Tasks</CardTitle>
                    <Badge variant="gold">Ages {recipe.homeschoolLesson.ageRange}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.kidHelperTasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#7A5A20' }}>
                        <span className="shrink-0 mt-0.5">⭐</span> {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* LESSON */}
        <TabsContent value="lesson">
          <div className="space-y-6">
            <Card style={{ backgroundColor: '#F0F5F0', borderColor: '#C8D8C4' }}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl">📚</span>
                  <div>
                    <CardTitle>{recipe.homeschoolLesson.subject} Lesson</CardTitle>
                    <CardDescription>Ages {recipe.homeschoolLesson.ageRange} • {recipe.homeschoolLesson.duration} minutes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl p-4" style={{ backgroundColor: '#FFFDF9' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4040' }}>
                    <strong>Activity:</strong> {recipe.homeschoolLesson.activity}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-5">
              <Card>
                <CardHeader><CardTitle className="text-base">💬 Discussion Questions</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.homeschoolLesson.discussion.map((q, i) => (
                      <li key={i} className="text-sm p-3 rounded-xl" style={{ backgroundColor: '#F3EFE9', color: '#4A4040' }}>
                        <span className="font-medium mr-1">{i + 1}.</span> {q}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">🌟 Fun Facts</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.homeschoolLesson.funFacts.map((fact, i) => (
                      <li key={i} className="text-sm p-3 rounded-xl flex gap-2" style={{ backgroundColor: '#FBF4E8', color: '#6A4A20' }}>
                        <span>🌟</span> {fact}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader><CardTitle className="text-base">📝 Vocabulary Words</CardTitle></CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {recipe.homeschoolLesson.vocabulary.map((vocab) => (
                    <div key={vocab.word} className="p-4 rounded-xl border" style={{ backgroundColor: '#F3EFE9', borderColor: '#E8DFD0' }}>
                      <div className="font-semibold text-sm mb-1" style={{ color: '#3B4B3F' }}>{vocab.word}</div>
                      <div className="text-xs leading-relaxed" style={{ color: '#6B6060' }}>{vocab.definition}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button asChild>
              <Link href={`/culture-kitchen/lessons/${recipe.id}`}>📖 Open Full Lesson Page →</Link>
            </Button>
          </div>
        </TabsContent>

        {/* NUTRITION */}
        <TabsContent value="nutrition">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Calories', value: Math.round(recipe.nutritionFacts.calories * multiplier), unit: 'kcal', bg: '#F5E8E8' },
                { label: 'Protein', value: Math.round(recipe.nutritionFacts.protein * multiplier), unit: 'g', bg: '#E8F0E8' },
                { label: 'Carbs', value: Math.round(recipe.nutritionFacts.carbs * multiplier), unit: 'g', bg: '#FBF4E8' },
                { label: 'Fat', value: Math.round(recipe.nutritionFacts.fat * multiplier), unit: 'g', bg: '#F3EFE9' },
                { label: 'Fiber', value: Math.round(recipe.nutritionFacts.fiber * multiplier), unit: 'g', bg: '#E8EDF5' },
              ].map((fact) => (
                <div key={fact.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: fact.bg }}>
                  <div className="text-2xl font-bold font-serif mb-1" style={{ color: '#3B4B3F' }}>
                    {fact.value}<span className="text-sm font-sans ml-0.5">{fact.unit}</span>
                  </div>
                  <div className="text-xs" style={{ color: '#6B6060' }}>{fact.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: '#8A8070' }}>*Values shown for {servings} serving{servings !== 1 ? 's' : ''}.</p>
            <Card>
              <CardHeader><CardTitle className="text-base">🌿 Nutrition Notes</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4040' }}>{recipe.nutritionNotes}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* HISTORY */}
        <TabsContent value="history">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-2xl">📖 The Story of {recipe.name}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-base leading-loose" style={{ color: '#4A4040' }}>{recipe.culturalHistory}</p>
              </CardContent>
            </Card>
            {recipe.aiHint && (
              <Card className="border-2 border-dashed" style={{ borderColor: '#D09E5A', backgroundColor: '#FBF4E8' }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">✨</span>
                    <div>
                      <Badge variant="gold" className="mb-2 text-xs tracking-widest uppercase">AI Personalization — Coming Soon</Badge>
                      <p className="text-sm" style={{ color: '#8A8070' }}>{recipe.aiHint}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <Button asChild variant="outline">
              <Link href={`/culture-kitchen/cultures/${recipe.cultureId}`}>← Back to {recipe.cultureName} Culture</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
