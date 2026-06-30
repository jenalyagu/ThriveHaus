import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRecipeById, recipes } from '@/lib/culture-kitchen/recipes';

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  return { title: recipe ? `${recipe.name} | Culture Kitchen` : 'Recipe' };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) notFound();

  const difficultyColor = {
    easy: 'text-green-600 bg-green-50',
    medium: 'text-orange-600 bg-orange-50',
    hard: 'text-red-600 bg-red-50',
  }[recipe.difficulty];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href={`/culture-kitchen/cultures/${recipe.cultureId}`}
          className="text-sm text-[var(--color-terracotta)] mb-2 inline-block"
        >
          ← {recipe.cultureName}
        </Link>
        <div className="flex items-start gap-4">
          <span className="text-4xl">{recipe.emoji}</span>
          <div>
            <h1 className="text-2xl font-serif">{recipe.name}</h1>
            <p className="text-[var(--color-sage)] mt-1">{recipe.description}</p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="bg-[var(--color-sand)] px-3 py-1 rounded-full">⏱ Prep {recipe.prepTime}m</span>
        <span className="bg-[var(--color-sand)] px-3 py-1 rounded-full">🍳 Cook {recipe.cookTime}m</span>
        <span className="bg-[var(--color-sand)] px-3 py-1 rounded-full">👨‍👩‍👧 Serves {recipe.servings}</span>
        <span className={`px-3 py-1 rounded-full capitalize ${difficultyColor}`}>{recipe.difficulty}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span key={tag} className="text-xs bg-[var(--color-sand)] px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>

      {/* Ingredients */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex items-baseline gap-3 text-sm">
              <span className="text-[var(--color-terracotta)] font-medium w-20 shrink-0">
                {ing.amount}{ing.unit ? ` ${ing.unit}` : ''}
              </span>
              <span>{ing.name}</span>
              {ing.notes && <span className="text-[var(--color-sage)] text-xs">({ing.notes})</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-4">Instructions</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step) => (
            <li key={step.step} className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-[var(--color-terracotta)] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.step}
              </span>
              <div>
                <p className="text-sm">{step.instruction}</p>
                {step.tip && (
                  <p className="text-xs text-[var(--color-ochre)] mt-1">💡 {step.tip}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Kids tasks */}
      <div className="card p-6 border-l-4 border-[var(--color-ochre)]">
        <h2 className="font-serif text-xl mb-3">👧 Kid Helper Tasks</h2>
        <ul className="space-y-2">
          {recipe.kidHelperTasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-[var(--color-ochre)] mt-0.5">★</span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      {/* Nutrition */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-4">Nutrition (per serving)</h2>
        <div className="grid grid-cols-5 gap-3 text-center mb-3">
          {[
            { label: 'Calories', value: recipe.nutritionFacts.calories },
            { label: 'Protein', value: `${recipe.nutritionFacts.protein}g` },
            { label: 'Carbs', value: `${recipe.nutritionFacts.carbs}g` },
            { label: 'Fat', value: `${recipe.nutritionFacts.fat}g` },
            { label: 'Fiber', value: `${recipe.nutritionFacts.fiber}g` },
          ].map((n) => (
            <div key={n.label} className="bg-[var(--color-sand)] rounded-xl p-2">
              <div className="font-semibold text-sm">{n.value}</div>
              <div className="text-xs text-[var(--color-sage)]">{n.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--color-sage)]">{recipe.nutritionNotes}</p>
      </div>

      {/* Cultural history */}
      <div className="card p-6">
        <h2 className="font-serif text-xl mb-3">Cultural History</h2>
        <p className="text-sm leading-relaxed text-[var(--color-charcoal)]">{recipe.culturalHistory}</p>
      </div>

      {/* Homeschool lesson */}
      <div className="card p-6 bg-[var(--color-sand)]/50">
        <p className="section-tag mb-2">Homeschool Lesson</p>
        <h2 className="font-serif text-xl mb-1">{recipe.homeschoolLesson.subject}</h2>
        <p className="text-xs text-[var(--color-sage)] mb-4">
          Ages {recipe.homeschoolLesson.ageRange} · {recipe.homeschoolLesson.duration} minutes
        </p>

        <p className="text-sm mb-4">{recipe.homeschoolLesson.activity}</p>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Discussion Questions</h3>
          <ul className="space-y-1">
            {recipe.homeschoolLesson.discussion.map((q, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-[var(--color-terracotta)]">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Fun Facts</h3>
          <ul className="space-y-1">
            {recipe.homeschoolLesson.funFacts.map((f, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span>🌟</span>{f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Vocabulary</h3>
          <div className="flex flex-col gap-2">
            {recipe.homeschoolLesson.vocabulary.map((v) => (
              <div key={v.word} className="text-sm">
                <span className="font-medium">{v.word}</span>
                <span className="text-[var(--color-sage)]"> — {v.definition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
