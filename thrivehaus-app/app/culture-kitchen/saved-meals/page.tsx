'use client';

import { useState } from 'react';
import Link from 'next/link';
import { recipes } from '@/lib/culture-kitchen/recipes';
import { mealPlans } from '@/lib/culture-kitchen/meal-plans';

const SAVED_RECIPE_IDS = ['adobo', 'pho', 'hummus', 'biryani', 'fried-chicken'];
const SAVED_PLAN_IDS = ['filipino-week-1'];

type TabType = 'recipes' | 'plans';

export default function SavedMealsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('recipes');
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(SAVED_RECIPE_IDS);
  const [savedPlanIds] = useState<string[]>(SAVED_PLAN_IDS);

  const savedRecipes = recipes.filter((r) => savedRecipeIds.includes(r.id));
  const savedPlans = mealPlans.filter((p) => savedPlanIds.includes(p.id));

  const unsave = (id: string) => {
    setSavedRecipeIds((prev) => prev.filter((r) => r !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3B4B3F' }}>
          ❤️ Saved Meals
        </h1>
        <p className="text-base" style={{ color: '#8A8070' }}>
          Your family&apos;s personal cookbook and meal plan collection.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b" style={{ borderColor: '#E8DFD0' }}>
        {[
          { id: 'recipes' as TabType, label: `🍽 Recipes (${savedRecipes.length})` },
          { id: 'plans' as TabType, label: `📅 Meal Plans (${savedPlans.length})` },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 text-sm font-medium border-b-2 transition-all"
            style={{
              borderColor: activeTab === tab.id ? '#3B4B3F' : 'transparent',
              color: activeTab === tab.id ? '#3B4B3F' : '#8A8070',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* SAVED RECIPES */}
      {activeTab === 'recipes' && (
        <div>
          {savedRecipes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤍</div>
              <p className="font-serif text-xl mb-2" style={{ color: '#3B4B3F' }}>No saved recipes yet</p>
              <p className="text-sm mb-6" style={{ color: '#8A8070' }}>
                Browse recipes and tap &quot;Save Recipe&quot; to build your cookbook.
              </p>
              <Link href="/culture-kitchen/cultures"
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
                Explore Cultures →
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedRecipes.map((recipe) => (
                <div key={recipe.id} className="rounded-2xl border overflow-hidden group"
                  style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
                  {/* Emoji card */}
                  <div className="h-36 flex items-center justify-center text-7xl relative"
                    style={{ background: 'linear-gradient(135deg, #F3EFE9, #E8DFD0)' }}>
                    {recipe.emoji}
                    <button onClick={() => unsave(recipe.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(255,253,249,0.9)' }}
                      title="Remove from saved">
                      ❤️
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#E8DFD0', color: '#5A6F5E' }}>
                        {recipe.cultureName}
                      </span>
                      <span className="text-xs capitalize" style={{ color: '#8A8070' }}>{recipe.difficulty}</span>
                    </div>
                    <h3 className="font-semibold mb-1" style={{ color: '#3B4B3F' }}>{recipe.name}</h3>
                    <p className="text-xs line-clamp-2 mb-3" style={{ color: '#8A8070' }}>{recipe.description}</p>
                    <div className="flex gap-3 text-xs mb-4" style={{ color: '#8A8070' }}>
                      <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                      <span>👥 serves {recipe.servings}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/culture-kitchen/recipes/${recipe.id}`}
                        className="flex-1 text-center py-2 rounded-xl text-sm font-medium"
                        style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
                        Cook It
                      </Link>
                      <Link href={`/culture-kitchen/lessons/${recipe.id}`}
                        className="flex-1 text-center py-2 rounded-xl text-sm font-medium border"
                        style={{ borderColor: '#5A6F5E', color: '#5A6F5E' }}>
                        Lesson
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {savedRecipes.length > 0 && (
            <div className="mt-8 text-center">
              <Link href="/culture-kitchen/cultures"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border-2"
                style={{ borderColor: '#3B4B3F', color: '#3B4B3F' }}>
                + Browse More Recipes
              </Link>
            </div>
          )}
        </div>
      )}

      {/* SAVED MEAL PLANS */}
      {activeTab === 'plans' && (
        <div>
          {savedPlans.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📅</div>
              <p className="font-serif text-xl mb-2" style={{ color: '#3B4B3F' }}>No saved meal plans yet</p>
              <p className="text-sm mb-6" style={{ color: '#8A8070' }}>
                Generate a weekly meal plan and save it to view it here.
              </p>
              <Link href="/culture-kitchen/meal-plan"
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
                Create Meal Plan →
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {savedPlans.map((plan) => (
                <div key={plan.id} className="rounded-2xl border overflow-hidden"
                  style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
                  {/* Plan header */}
                  <div className="p-5 flex items-center justify-between flex-wrap gap-4"
                    style={{ background: 'linear-gradient(135deg, #3B4B3F, #5A6F5E)' }}>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#C8D8C4' }}>
                        Saved Meal Plan
                      </div>
                      <h2 className="font-serif text-xl text-white">{plan.name}</h2>
                      <div className="text-sm flex gap-4 mt-1" style={{ color: '#C8D8C4' }}>
                        <span>👥 {plan.servings} people</span>
                        <span>💰 ~${plan.estimatedCost}/week</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/culture-kitchen/grocery-list"
                        className="px-4 py-2 rounded-full text-xs font-medium"
                        style={{ backgroundColor: '#D09E5A', color: '#FFFDF9' }}>
                        🛒 Shop
                      </Link>
                    </div>
                  </div>
                  {/* Day preview */}
                  <div className="p-5">
                    <div className="grid grid-cols-7 gap-2">
                      {plan.days.map((day) => (
                        <div key={day.day} className="text-center">
                          <div className="text-xs font-medium mb-2" style={{ color: '#8A8070' }}>
                            {day.day.slice(0, 3)}
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg" title={day.breakfast.name}>{day.breakfast.emoji}</div>
                            <div className="text-lg" title={day.lunch.name}>{day.lunch.emoji}</div>
                            <div className="text-lg" title={day.dinner.name}>{day.dinner.emoji}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Dietary notes */}
                  {plan.dietaryNotes.length > 0 && (
                    <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                      {plan.dietaryNotes.map((note) => (
                        <span key={note} className="text-xs px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: '#F3EFE9', color: '#6B6060' }}>
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
