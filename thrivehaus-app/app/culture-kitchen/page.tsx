import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import { getFeaturedRecipes } from '@/lib/culture-kitchen/recipes';

export default function CultureKitchenHome() {
  const featured = getFeaturedRecipes().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero */}
      <section className="rounded-3xl overflow-hidden mb-12 relative"
        style={{ background: 'linear-gradient(135deg, #3B4B3F 0%, #5A6F5E 60%, #D09E5A 100%)' }}>
        <div className="px-8 py-14 md:py-20 md:px-16 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
              style={{ backgroundColor: '#D09E5A', color: '#3B4B3F' }}>
              Family Heritage Cooking
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight mb-4">
              Cook Your Culture.<br />
              <em className="not-italic" style={{ color: '#F5C878' }}>Feed Your Roots.</em>
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#C8D8C4' }}>
              Explore 7 world cuisines with meal plans, recipes, and homeschool lessons
              built around your family&apos;s cultural heritage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/culture-kitchen/cultures"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
                style={{ backgroundColor: '#D09E5A', color: '#3B4B3F' }}>
                🌍 Explore Cultures
              </Link>
              <Link href="/culture-kitchen/meal-plan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border-2 border-white text-white transition-all hover:bg-white"
                style={{ color: 'white' }}
              >
                📅 Build Meal Plan
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative food emojis */}
        <div className="absolute top-6 right-8 text-6xl opacity-20 select-none hidden md:block">🍜🍛🌮</div>
        <div className="absolute bottom-4 right-12 text-5xl opacity-15 select-none hidden md:block">🫒🍗🌿</div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { emoji: '🌍', value: '7', label: 'World Cultures' },
          { emoji: '🍽️', value: '14+', label: 'Recipes' },
          { emoji: '📚', value: '14+', label: 'Homeschool Lessons' },
          { emoji: '📅', value: '∞', label: 'Weekly Plans' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl p-5 text-center border"
            style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <div className="text-3xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-bold font-serif" style={{ color: '#3B4B3F' }}>{stat.value}</div>
            <div className="text-sm" style={{ color: '#8A8070' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Cultures */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl md:text-3xl" style={{ color: '#3B4B3F' }}>
            Explore Cultures
          </h2>
          <Link href="/culture-kitchen/cultures"
            className="text-sm font-medium hover:underline flex items-center gap-1"
            style={{ color: '#5A6F5E' }}>
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cultures.map((culture) => (
            <Link key={culture.id} href={`/culture-kitchen/cultures/${culture.id}`}
              className="group rounded-2xl p-5 border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              <div className="text-4xl mb-3">{culture.emoji}</div>
              <div className="font-semibold text-sm" style={{ color: '#3B4B3F' }}>{culture.name}</div>
              <div className="text-xs mt-1 line-clamp-2" style={{ color: '#8A8070' }}>{culture.region}</div>
              <div className="mt-3 text-xs font-medium" style={{ color: '#5A6F5E' }}>
                {culture.recipeIds.length} recipes →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl md:text-3xl" style={{ color: '#3B4B3F' }}>
            Featured Recipes
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((recipe) => (
            <Link key={recipe.id} href={`/culture-kitchen/recipes/${recipe.id}`}
              className="group rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
              {/* Image placeholder */}
              <div className="h-40 flex items-center justify-center text-6xl"
                style={{ background: 'linear-gradient(135deg, #F3EFE9, #E8DFD0)' }}>
                {recipe.emoji}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: '#E8DFD0', color: '#5A6F5E' }}>
                    {recipe.cultureName}
                  </span>
                  <span className="text-xs" style={{ color: '#8A8070' }}>
                    {recipe.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: '#3B4B3F' }}>
                  {recipe.name}
                </h3>
                <p className="text-xs line-clamp-2 mb-3" style={{ color: '#8A8070' }}>
                  {recipe.description}
                </p>
                <div className="flex items-center gap-3 text-xs" style={{ color: '#8A8070' }}>
                  <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                  <span>👥 {recipe.servings}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Weekly Themes Banner */}
      <section className="grid md:grid-cols-3 gap-4 mb-12">
        <Link href="/culture-kitchen/meal-plan"
          className="rounded-2xl p-6 border group hover:shadow-md transition-all"
          style={{ background: 'linear-gradient(135deg, #FBF4E8, #F3EFE9)', borderColor: '#E8DFD0' }}>
          <div className="text-3xl mb-3">📅</div>
          <h3 className="font-semibold mb-1" style={{ color: '#3B4B3F' }}>Weekly Meal Planner</h3>
          <p className="text-sm" style={{ color: '#8A8070' }}>
            Generate a full 7-day meal plan based on your chosen culture, family size, and budget.
          </p>
        </Link>
        <Link href="/culture-kitchen/grocery-list"
          className="rounded-2xl p-6 border group hover:shadow-md transition-all"
          style={{ background: 'linear-gradient(135deg, #F0F5F0, #E8F0E8)', borderColor: '#C8D8C4' }}>
          <div className="text-3xl mb-3">🛒</div>
          <h3 className="font-semibold mb-1" style={{ color: '#3B4B3F' }}>Smart Grocery List</h3>
          <p className="text-sm" style={{ color: '#8A8070' }}>
            Auto-combined ingredient list from your meal plan with category grouping.
          </p>
        </Link>
        <Link href="/culture-kitchen/family-profile"
          className="rounded-2xl p-6 border group hover:shadow-md transition-all"
          style={{ background: 'linear-gradient(135deg, #FBF0F0, #F5E8E8)', borderColor: '#DEC8C4' }}>
          <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
          <h3 className="font-semibold mb-1" style={{ color: '#3B4B3F' }}>Family Profile</h3>
          <p className="text-sm" style={{ color: '#8A8070' }}>
            Set your heritage backgrounds, dietary needs, family size, and homeschool age range.
          </p>
        </Link>
      </section>

      {/* Homeschool Callout */}
      <section className="rounded-3xl p-8 md:p-12"
        style={{ background: 'linear-gradient(135deg, #3B4B3F 0%, #5A6F5E 100%)' }}>
        <div className="max-w-2xl">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
            Every Recipe is a Lesson
          </h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#C8D8C4' }}>
            Each recipe includes a built-in homeschool lesson covering history, science, geography,
            math, and social studies — tailored to your child&apos;s age range.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['History', 'Science', 'Geography', 'Math', 'Social Studies', 'Language Arts'].map((subj) => (
              <span key={subj} className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ backgroundColor: 'rgba(208, 158, 90, 0.3)', color: '#F5C878' }}>
                {subj}
              </span>
            ))}
          </div>
          <Link href="/culture-kitchen/cultures"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm"
            style={{ backgroundColor: '#D09E5A', color: '#3B4B3F' }}>
            Start Learning Through Food →
          </Link>
        </div>
      </section>
    </div>
  );
}
