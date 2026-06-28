import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import { getFeaturedRecipes } from '@/lib/culture-kitchen/recipes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CultureKitchenHome() {
  const featured = getFeaturedRecipes().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero */}
      <section
        className="rounded-3xl overflow-hidden mb-12 relative"
        style={{ background: 'linear-gradient(135deg, #3B4B3F 0%, #5A6F5E 60%, #D09E5A 100%)' }}
      >
        <div className="px-8 py-14 md:py-20 md:px-16 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 text-xs tracking-widest uppercase" style={{ backgroundColor: '#D09E5A', color: '#3B4B3F' }}>
              Family Heritage Cooking
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-tight mb-4">
              Cook Your Culture.<br />
              <em className="not-italic" style={{ color: '#F5C878' }}>Feed Your Roots.</em>
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#C8D8C4' }}>
              Explore 7 world cuisines with meal plans, recipes, and homeschool lessons
              built around your family&apos;s cultural heritage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" style={{ backgroundColor: '#D09E5A', color: '#3B4B3F' }}>
                <Link href="/culture-kitchen/cultures">🌍 Explore Cultures</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#3B4B3F]">
                <Link href="/culture-kitchen/meal-plan">📅 Build Meal Plan</Link>
              </Button>
            </div>
          </div>
        </div>
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
          <Card key={stat.label} className="text-center p-5">
            <div className="text-3xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-bold font-serif" style={{ color: '#3B4B3F' }}>{stat.value}</div>
            <div className="text-sm" style={{ color: '#8A8070' }}>{stat.label}</div>
          </Card>
        ))}
      </section>

      {/* Featured Cultures */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl md:text-3xl" style={{ color: '#3B4B3F' }}>Explore Cultures</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/culture-kitchen/cultures">View all →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cultures.map((culture) => (
            <Link key={culture.id} href={`/culture-kitchen/cultures/${culture.id}`}>
              <Card className="group p-5 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full">
                <div className="text-4xl mb-3">{culture.emoji}</div>
                <div className="font-semibold text-sm" style={{ color: '#3B4B3F' }}>{culture.name}</div>
                <div className="text-xs mt-1" style={{ color: '#8A8070' }}>{culture.region}</div>
                <div className="mt-3 text-xs font-medium" style={{ color: '#5A6F5E' }}>
                  {culture.recipeIds.length} recipes →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ color: '#3B4B3F' }}>Featured Recipes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((recipe) => (
            <Link key={recipe.id} href={`/culture-kitchen/recipes/${recipe.id}`}>
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden h-full">
                <div
                  className="h-40 flex items-center justify-center text-6xl"
                  style={{ background: 'linear-gradient(135deg, #F3EFE9, #E8DFD0)' }}
                >
                  {recipe.emoji}
                </div>
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="default">{recipe.cultureName}</Badge>
                    <Badge variant={recipe.difficulty as 'easy' | 'medium' | 'hard'} className="capitalize">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm leading-tight">{recipe.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#8A8070' }}>
                    <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                    <span>👥 {recipe.servings}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Trio */}
      <section className="grid md:grid-cols-3 gap-4 mb-12">
        {[
          { href: '/culture-kitchen/meal-plan', emoji: '📅', title: 'Weekly Meal Planner', desc: 'Generate a full 7-day meal plan based on your chosen culture, family size, and budget.' },
          { href: '/culture-kitchen/grocery-list', emoji: '🛒', title: 'Smart Grocery List', desc: 'Auto-combined ingredient list from your meal plan with category grouping.', bg: 'linear-gradient(135deg, #F0F5F0, #E8F0E8)', border: '#C8D8C4' },
          { href: '/culture-kitchen/family-profile', emoji: '👨‍👩‍👧‍👦', title: 'Family Profile', desc: 'Set your heritage backgrounds, dietary needs, family size, and homeschool age range.', bg: 'linear-gradient(135deg, #FBF0F0, #F5E8E8)', border: '#DEC8C4' },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-6 hover:shadow-md transition-all h-full" style={{ background: item.bg, borderColor: item.border }}>
              <div className="text-3xl mb-3">{item.emoji}</div>
              <CardTitle className="text-base mb-1">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </section>

      {/* Homeschool Callout */}
      <section
        className="rounded-3xl p-8 md:p-12"
        style={{ background: 'linear-gradient(135deg, #3B4B3F 0%, #5A6F5E 100%)' }}
      >
        <div className="max-w-2xl">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">Every Recipe is a Lesson</h2>
          <p className="mb-6 leading-relaxed" style={{ color: '#C8D8C4' }}>
            Each recipe includes a built-in homeschool lesson covering history, science, geography,
            math, and social studies — tailored to your child&apos;s age range.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['History', 'Science', 'Geography', 'Math', 'Social Studies', 'Language Arts'].map((subj) => (
              <span
                key={subj}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ backgroundColor: 'rgba(208,158,90,0.3)', color: '#F5C878' }}
              >
                {subj}
              </span>
            ))}
          </div>
          <Button asChild style={{ backgroundColor: '#D09E5A', color: '#3B4B3F' }}>
            <Link href="/culture-kitchen/cultures">Start Learning Through Food →</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
