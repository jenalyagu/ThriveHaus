'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/culture-kitchen/recipes';
import { use } from 'react';

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  if (!recipe) notFound();
  return <RecipeDetail recipe={recipe} />;
}

function RecipeDetail({ recipe }: { recipe: NonNullable<ReturnType<typeof getRecipeById>> }) {
  const [activeTab, setActiveTab] = useState<'recipe' | 'lesson' | 'nutrition' | 'history'>('recipe');
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [servings, setServings] = useState(recipe.servings);
  const [saved, setSaved] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(true);

  const multiplier = servings / recipe.servings;

  const tabs = [
    { id: 'recipe', label: '🍳 Recipe' },
    { id: 'lesson', label: '📚 Lesson' },
    { id: 'nutrition', label: '🥗 Nutrition' },
    { id: 'history', label: '📖 History' },
  ] as const;

  const toggleStep = (step: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      next.has(step) ? next.delete(step) : next.add(step);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8A8070' }}>
        <Link href="/culture-kitchen" className="hover:underline">Home</Link>
        <span>›</span>
        <Link href="/culture-kitchen/cultures" className="hover:underline">Cultures</Link>
        <span>›</span>
        <Link href={`/culture-kitchen/cultures/${recipe.cultureId}`} className="hover:underline">{recipe.cultureName}</Link>
        <span>›</span>
        <span style={{ color: '#3B4B3F' }}>{recipe.name}</span>
      </div>

      {/* Hero */}
      <div className="rounded-3xl overflow-hidden mb-8"
        style={{ background: 'linear-gradient(135deg, #F3EFE9, #E8DFD0)' }}>
        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="text-9xl md:text-[120px] leading-none">{recipe.emoji}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link href={`/culture-kitchen/cultures/${recipe.cultureId}`}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: '#E8DFD0', color: '#5A6F5E' }}>
                {recipe.cultureName}
              </Link>
              <span className="text-xs px-3 py-1 rounded-full capitalize font-medium"
                style={{
                  backgroundColor: recipe.difficulty === 'easy' ? '#E8F0E8' : recipe.difficulty === 'medium' ? '#FBF4E8' : '#F5E8E8',
                  color: recipe.difficulty === 'easy' ? '#5A6F5E' : recipe.difficulty === 'medium' ? '#B08030' : '#B05042',
                }}>
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl mb-3" style={{ color: '#3B4B3F' }}>
              {recipe.name}
            </h1>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#6B6060' }}>
              {recipe.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 text-sm mb-5" style={{ color: '#6B6060' }}>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">⏱</span>
                <div>
                  <div className="font-medium">{recipe.prepTime} min</div>
                  <div className="text-xs" style={{ color: '#8A8070' }}>Prep</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🔥</span>
                <div>
                  <div className="font-medium">{recipe.cookTime} min</div>
                  <div className="text-xs" style={{ color: '#8A8070' }}>Cook</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">👥</span>
                <div>
                  <div className="font-medium">{recipe.servings}</div>
                  <div className="text-xs" style={{ color: '#8A8070' }}>Serves</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">📚</span>
                <div>
                  <div className="font-medium">{recipe.homeschoolLesson.subject}</div>
                  <div className="text-xs" style={{ color: '#8A8070' }}>Lesson</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: '#F3EFE9', color: '#8A8070' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save / Actions */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setSaved(!saved)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all"
          style={{
            backgroundColor: saved ? '#3B4B3F' : 'transparent',
            borderColor: '#3B4B3F',
            color: saved ? '#FFFDF9' : '#3B4B3F',
          }}>
          {saved ? '❤️ Saved!' : '🤍 Save Recipe'}
        </button>
        <Link href="/culture-kitchen/grocery-list"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all"
          style={{ borderColor: '#D09E5A', color: '#B08030' }}>
          🛒 Add to Grocery List
        </Link>
        <Link href={`/culture-kitchen/lessons/${recipe.id}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all"
          style={{ borderColor: '#5A6F5E', color: '#5A6F5E' }}>
          📚 Open Full Lesson
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b overflow-x-auto" style={{ borderColor: '#E8DFD0' }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all"
            style={{
              borderColor: activeTab === tab.id ? '#3B4B3F' : 'transparent',
              color: activeTab === tab.id ? '#3B4B3F' : '#8A8070',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* RECIPE TAB */}
      {activeTab === 'recipe' && (
        <div className="grid md:grid-cols-5 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-2">
            <div className="rounded-2xl p-5 border sticky top-24" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl" style={{ color: '#3B4B3F' }}>Ingredients</h2>
                <div className="flex items-center gap-2 text-sm">
                  <button onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center border font-bold"
                    style={{ borderColor: '#E8DFD0', color: '#3B4B3F' }}>−</button>
                  <span className="font-medium w-6 text-center" style={{ color: '#3B4B3F' }}>{servings}</span>
                  <button onClick={() => setServings(servings + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center border font-bold"
                    style={{ borderColor: '#E8DFD0', color: '#3B4B3F' }}>+</button>
                  <span className="text-xs" style={{ color: '#8A8070' }}>servings</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm py-2 border-b last:border-0"
                    style={{ borderColor: '#F3EFE9' }}>
                    <span className="w-20 shrink-0 font-medium" style={{ color: '#3B4B3F' }}>
                      {(() => {
                        const amt = parseFloat(ing.amount);
                        if (!isNaN(amt)) return (amt * multiplier % 1 === 0 ? (amt * multiplier).toString() : (amt * multiplier).toFixed(1)) + (ing.unit ? ' ' + ing.unit : '');
                        return ing.amount + (ing.unit ? ' ' + ing.unit : '');
                      })()}
                    </span>
                    <span style={{ color: '#4A4040' }}>
                      {ing.name}
                      {ing.notes && <span className="text-xs ml-1" style={{ color: '#8A8070' }}>({ing.notes})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="font-serif text-xl" style={{ color: '#3B4B3F' }}>Instructions</h2>
            {recipe.steps.map((step) => (
              <button key={step.step} onClick={() => toggleStep(step.step)}
                className="w-full text-left p-5 rounded-2xl border transition-all"
                style={{
                  backgroundColor: checkedSteps.has(step.step) ? '#F0F5F0' : '#FFFDF9',
                  borderColor: checkedSteps.has(step.step) ? '#C8D8C4' : '#E8DFD0',
                  opacity: checkedSteps.has(step.step) ? 0.7 : 1,
                }}>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                    style={{
                      backgroundColor: checkedSteps.has(step.step) ? '#5A6F5E' : '#E8DFD0',
                      color: checkedSteps.has(step.step) ? '#FFFDF9' : '#3B4B3F',
                    }}>
                    {checkedSteps.has(step.step) ? '✓' : step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed" style={{
                      color: '#4A4040',
                      textDecoration: checkedSteps.has(step.step) ? 'line-through' : 'none',
                    }}>
                      {step.instruction}
                    </p>
                    {step.tip && (
                      <div className="mt-2 text-xs px-3 py-2 rounded-lg italic"
                        style={{ backgroundColor: '#FBF4E8', color: '#B08030' }}>
                        💡 Tip: {step.tip}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {/* Kid Helper Tasks */}
            <div className="rounded-2xl p-5 border mt-6"
              style={{ backgroundColor: '#FBF4E8', borderColor: '#E8CFA0' }}>
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#7A5A20' }}>
                👶 Kid Helper Tasks
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#D09E5A', color: '#FFFDF9' }}>
                  Ages {recipe.homeschoolLesson.ageRange}
                </span>
              </h3>
              <ul className="space-y-2">
                {recipe.kidHelperTasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#7A5A20' }}>
                    <span className="shrink-0 mt-0.5">⭐</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            {/* Homeschool Lesson Card */}
            <div className="rounded-2xl border mt-6 overflow-hidden" style={{ borderColor: '#C8D8C4' }}>
              <button
                onClick={() => setLessonOpen((o) => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                style={{ backgroundColor: '#F0F5F0' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📚</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#3B4B3F' }}>
                      {recipe.homeschoolLesson.subject} Lesson
                    </div>
                    <div className="text-xs" style={{ color: '#5A6F5E' }}>
                      Ages {recipe.homeschoolLesson.ageRange} · {recipe.homeschoolLesson.duration} min
                    </div>
                  </div>
                </div>
                <span className="text-lg" style={{ color: '#5A6F5E' }}>{lessonOpen ? '▲' : '▼'}</span>
              </button>

              {lessonOpen && (
                <div className="p-5 space-y-5" style={{ backgroundColor: '#FFFDF9' }}>
                  {/* Activity */}
                  <div className="rounded-xl p-4" style={{ backgroundColor: '#F0F5F0' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A4040' }}>
                      <strong>Activity:</strong> {recipe.homeschoolLesson.activity}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Discussion */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5" style={{ color: '#3B4B3F' }}>
                        💬 Discussion Questions
                      </h4>
                      <ul className="space-y-2">
                        {recipe.homeschoolLesson.discussion.map((q, i) => (
                          <li key={i} className="text-xs p-2.5 rounded-lg" style={{ backgroundColor: '#F3EFE9', color: '#4A4040' }}>
                            <span className="font-medium mr-1">{i + 1}.</span>{q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fun Facts */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5" style={{ color: '#3B4B3F' }}>
                        🌟 Fun Facts
                      </h4>
                      <ul className="space-y-2">
                        {recipe.homeschoolLesson.funFacts.map((fact, i) => (
                          <li key={i} className="text-xs p-2.5 rounded-lg flex gap-1.5"
                            style={{ backgroundColor: '#FBF4E8', color: '#6A4A20' }}>
                            <span className="shrink-0">🌟</span>{fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Vocabulary */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2" style={{ color: '#3B4B3F' }}>📝 Vocabulary</h4>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {recipe.homeschoolLesson.vocabulary.map((vocab) => (
                        <div key={vocab.word} className="p-3 rounded-xl border"
                          style={{ backgroundColor: '#F3EFE9', borderColor: '#E8DFD0' }}>
                          <div className="font-semibold text-xs mb-0.5" style={{ color: '#3B4B3F' }}>{vocab.word}</div>
                          <div className="text-xs leading-relaxed" style={{ color: '#6B6060' }}>{vocab.definition}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('lesson')}
                    className="text-xs font-medium underline underline-offset-2"
                    style={{ color: '#5A6F5E' }}>
                    Open full lesson tab →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LESSON TAB */}
      {activeTab === 'lesson' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#F0F5F0', borderColor: '#C8D8C4' }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-3xl">📚</span>
              <div>
                <div className="font-serif text-xl" style={{ color: '#3B4B3F' }}>{recipe.homeschoolLesson.subject} Lesson</div>
                <div className="text-sm" style={{ color: '#5A6F5E' }}>
                  Ages {recipe.homeschoolLesson.ageRange} • {recipe.homeschoolLesson.duration} minutes
                </div>
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: '#FFFDF9' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#4A4040' }}>
                <strong>Activity:</strong> {recipe.homeschoolLesson.activity}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Discussion */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#3B4B3F' }}>
                💬 Discussion Questions
              </h3>
              <ul className="space-y-3">
                {recipe.homeschoolLesson.discussion.map((q, i) => (
                  <li key={i} className="text-sm p-3 rounded-xl" style={{ backgroundColor: '#F3EFE9', color: '#4A4040' }}>
                    <span className="font-medium mr-1">{i + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fun Facts */}
            <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#3B4B3F' }}>
                🌟 Fun Facts
              </h3>
              <ul className="space-y-3">
                {recipe.homeschoolLesson.funFacts.map((fact, i) => (
                  <li key={i} className="text-sm p-3 rounded-xl flex gap-2"
                    style={{ backgroundColor: '#FBF4E8', color: '#6A4A20' }}>
                    <span>🌟</span> {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vocabulary */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h3 className="font-semibold mb-4" style={{ color: '#3B4B3F' }}>📝 Vocabulary Words</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {recipe.homeschoolLesson.vocabulary.map((vocab) => (
                <div key={vocab.word} className="p-4 rounded-xl border" style={{ backgroundColor: '#F3EFE9', borderColor: '#E8DFD0' }}>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#3B4B3F' }}>{vocab.word}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#6B6060' }}>{vocab.definition}</div>
                </div>
              ))}
            </div>
          </div>

          <Link href={`/culture-kitchen/lessons/${recipe.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
            📖 Open Full Lesson Page →
          </Link>
        </div>
      )}

      {/* NUTRITION TAB */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Calories', value: Math.round(recipe.nutritionFacts.calories * multiplier), unit: 'kcal', color: '#F5E8E8' },
              { label: 'Protein', value: Math.round(recipe.nutritionFacts.protein * multiplier), unit: 'g', color: '#E8F0E8' },
              { label: 'Carbs', value: Math.round(recipe.nutritionFacts.carbs * multiplier), unit: 'g', color: '#FBF4E8' },
              { label: 'Fat', value: Math.round(recipe.nutritionFacts.fat * multiplier), unit: 'g', color: '#F3EFE9' },
              { label: 'Fiber', value: Math.round(recipe.nutritionFacts.fiber * multiplier), unit: 'g', color: '#E8EDF5' },
            ].map((fact) => (
              <div key={fact.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: fact.color }}>
                <div className="text-2xl font-bold font-serif mb-1" style={{ color: '#3B4B3F' }}>
                  {fact.value}<span className="text-sm font-sans ml-0.5">{fact.unit}</span>
                </div>
                <div className="text-xs" style={{ color: '#6B6060' }}>{fact.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#8A8070' }}>
            *Values shown for {servings} serving{servings !== 1 ? 's' : ''}. Adjust servings above.
          </p>

          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#3B4B3F' }}>🌿 Nutrition Notes</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#4A4040' }}>{recipe.nutritionNotes}</p>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="rounded-2xl p-8 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-2xl mb-5" style={{ color: '#3B4B3F' }}>
              📖 The Story of {recipe.name}
            </h2>
            <p className="text-base leading-loose" style={{ color: '#4A4040' }}>
              {recipe.culturalHistory}
            </p>
          </div>

          {recipe.aiHint && (
            <div className="rounded-2xl p-6 border-2 border-dashed"
              style={{ borderColor: '#D09E5A', backgroundColor: '#FBF4E8' }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">✨</div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>
                    AI Personalization — Coming Soon
                  </div>
                  <p className="text-sm" style={{ color: '#8A8070' }}>{recipe.aiHint}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Link href={`/culture-kitchen/cultures/${recipe.cultureId}`}
              className="px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all"
              style={{ borderColor: '#5A6F5E', color: '#5A6F5E' }}>
              ← Back to {recipe.cultureName} Culture
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
