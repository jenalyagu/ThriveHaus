import Link from 'next/link';
import { cultures } from '@/lib/culture-kitchen/cultures';
import { getFeaturedRecipes } from '@/lib/culture-kitchen/recipes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CKJourney from '@/components/culture-kitchen/CKJourney';

export default function CultureKitchenHome() {
  const featured = getFeaturedRecipes().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero */}
      <section
        className="rounded-3xl overflow-hidden mb-12 relative"
        style={{ background: 'linear-gradient(135deg, #1E2D22 0%, #3B4B3F 50%, #5A4A2A 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #D09E5A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8FBF8F 0%, transparent 50%)' }}
        />
        <div className="px-8 py-16 md:py-24 md:px-16 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: 'rgba(208,158,90,0.25)', color: '#F5C878', border: '1px solid rgba(208,158,90,0.4)' }}>
              ✦ Family Heritage Cooking
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-[1.05] mb-6">
              Cook Your<br />
              Culture.<br />
              <em className="not-italic font-semibold" style={{ color: '#F5C878' }}>Feed Your Roots.</em>
            </h1>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#B8CCBC' }}>
              Explore 7 world cuisines with meal plans, recipes, and homeschool lessons
              built around your family&apos;s cultural heritage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="gold">
                <Link href="/culture-kitchen/cultures">🌍 Explore Cultures</Link>
              </Button>
              <Button asChild size="lg" className="rounded-full border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 shadow-none">
                <Link href="/culture-kitchen/meal-plan">📅 Build Meal Plan</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-8 flex flex-col gap-3 opacity-30 select-none hidden md:flex">
          <span className="text-7xl">🍜</span>
          <span className="text-6xl ml-8">🍛</span>
          <span className="text-5xl">🌮</span>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { emoji: '🌍', value: '7', label: 'World Cultures', color: '#E8F0E4' },
          { emoji: '🍽️', value: '14+', label: 'Recipes', color: '#FBF0D8' },
          { emoji: '📚', value: '14+', label: 'Homeschool Lessons', color: '#F0E8F8' },
          { emoji: '📅', value: '∞', label: 'Weekly Plans', color: '#F0F4E8' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center p-6 hover:shadow-[0_8px_24px_rgba(59,75,63,0.12)] hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: stat.color }}>
            <div className="text-4xl mb-3">{stat.emoji}</div>
            <div className="text-3xl font-bold font-serif mb-1" style={{ color: '#3B4B3F' }}>{stat.value}</div>
            <div className="text-xs font-medium uppercase tracking-wide" style={{ color: '#6B7870' }}>{stat.label}</div>
          </Card>
        ))}
      </section>

      {/* Journey tracker — only shows after first culture visited */}
      <CKJourney />

      {/* Featured Cultures */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>Discover</p>
            <h2 className="font-serif text-3xl md:text-4xl" style={{ color: '#3B4B3F' }}>World Cultures</h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/culture-kitchen/cultures">View all →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cultures.map((culture) => (
            <Link key={culture.id} href={`/culture-kitchen/cultures/${culture.id}`}>
              <Card
                className="group hover:shadow-[0_12px_32px_rgba(59,75,63,0.18)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
              >
                <div
                  className="h-24 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${culture.primaryColor}40, ${culture.accentColor}60)` }}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{culture.emoji}</span>
                </div>
                <div className="p-4">
                  <div className="font-serif font-bold text-sm mb-0.5" style={{ color: '#3B4B3F' }}>{culture.name}</div>
                  <div className="text-xs mb-3" style={{ color: '#8A8070' }}>{culture.region}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: '#5A6F5E' }}>
                      {culture.recipeIds.length} recipes
                    </span>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#D09E5A' }}>→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="mb-14">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>This Week</p>
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: '#3B4B3F' }}>Featured Recipes</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((recipe) => (
            <Link key={recipe.id} href={`/culture-kitchen/recipes/${recipe.id}`}>
              <Card className="group hover:shadow-[0_12px_32px_rgba(59,75,63,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full">
                <div
                  className="h-44 flex items-center justify-center text-7xl relative overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, #F3EFE9 0%, #E4DDD0 100%)' }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">{recipe.emoji}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="default">{recipe.cultureName}</Badge>
                    <Badge variant={recipe.difficulty as 'easy' | 'medium' | 'hard'} className="capitalize">{recipe.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-sm leading-tight">{recipe.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 text-xs font-medium" style={{ color: '#8A8070' }}>
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
      <section className="grid md:grid-cols-3 gap-5 mb-14">
        {[
          {
            href: '/culture-kitchen/meal-plan',
            emoji: '📅',
            title: 'Weekly Meal Planner',
            desc: 'Generate a full 7-day meal plan based on your chosen culture, family size, and budget.',
            bg: 'linear-gradient(135deg, #E8F0E4, #D4E8D0)',
            border: '#A8D0A0',
            label: 'Plan',
            labelColor: '#2A5A30',
          },
          {
            href: '/culture-kitchen/grocery-list',
            emoji: '🛒',
            title: 'Smart Grocery List',
            desc: 'Auto-combined ingredient list from your meal plan with category grouping.',
            bg: 'linear-gradient(135deg, #FBF0D8, #F5E4C0)',
            border: '#E0C070',
            label: 'Shop',
            labelColor: '#7A4E00',
          },
          {
            href: '/culture-kitchen/family-profile',
            emoji: '👨‍👩‍👧‍👦',
            title: 'Family Profile',
            desc: 'Set your heritage backgrounds, dietary needs, family size, and homeschool age range.',
            bg: 'linear-gradient(135deg, #F0E8F5, #E8D8F0)',
            border: '#C8A8D8',
            label: 'Profile',
            labelColor: '#5A2A7A',
          },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Card
              className="p-6 hover:shadow-[0_12px_32px_rgba(59,75,63,0.12)] hover:-translate-y-1 transition-all duration-300 h-full group"
              style={{ background: item.bg, borderColor: item.border }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
              <Badge className="mb-3 text-xs" style={{ backgroundColor: `${item.border}60`, color: item.labelColor }}>{item.label}</Badge>
              <CardTitle className="text-base mb-2">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </section>

      {/* Homeschool Callout */}
      <section
        className="rounded-3xl p-8 md:p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E2D22 0%, #3B4B3F 60%, #4A5A3A 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: '#D09E5A' }} />
        <div className="relative z-10 max-w-2xl">
          <div className="text-5xl mb-6">📚</div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Every Recipe is a Lesson</h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: '#B8CCBC' }}>
            Each recipe includes a built-in homeschool lesson covering history, science, geography,
            math, and social studies — tailored to your child&apos;s age range.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['History', 'Science', 'Geography', 'Math', 'Social Studies', 'Language Arts'].map((subj) => (
              <span
                key={subj}
                className="text-xs px-4 py-2 rounded-full font-semibold"
                style={{ backgroundColor: 'rgba(208,158,90,0.2)', color: '#F5C878', border: '1px solid rgba(208,158,90,0.3)' }}
              >
                {subj}
              </span>
            ))}
          </div>
          <Button asChild variant="gold" size="lg">
            <Link href="/culture-kitchen/cultures">Start Learning Through Food →</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
