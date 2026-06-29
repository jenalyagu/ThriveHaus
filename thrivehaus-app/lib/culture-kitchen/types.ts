export interface CultureConnection {
  cultureId: string;
  strength: 'strong' | 'moderate';
  linkType: 'colonization' | 'trade' | 'migration' | 'empire' | 'geography' | 'ingredient';
  headline: string;
  detail: string;
  sharedIngredients: string[];
}

export interface Culture {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  region: string;
  country: string;
  commonIngredients: string[];
  recipeIds: string[];
  geographyNotes: string;
  foodHistory: string;
  nutritionThemes: string[];
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  mapFact: string;
  languages: string[];
  population: string;
  connections: CultureConnection[];
}

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
  notes?: string;
  isCommon?: boolean;
}

export interface RecipeStep {
  step: number;
  instruction: string;
  tip?: string;
}

export interface HomeschoolLesson {
  subject: string;
  ageRange: string;
  duration: number;
  activity: string;
  discussion: string[];
  funFacts: string[];
  vocabulary: { word: string; definition: string }[];
}

export interface Recipe {
  id: string;
  name: string;
  cultureId: string;
  cultureName: string;
  description: string;
  emoji: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  kidHelperTasks: string[];
  nutritionNotes: string;
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  culturalHistory: string;
  homeschoolLesson: HomeschoolLesson;
  aiHint?: string;
  isFeatured?: boolean;
}

export interface MealPlanDay {
  day: string;
  breakfast: { recipeId: string; name: string; emoji: string };
  lunch: { recipeId: string; name: string; emoji: string };
  dinner: { recipeId: string; name: string; emoji: string };
  snack?: { recipeId: string; name: string; emoji: string };
}

export interface MealPlan {
  id: string;
  name: string;
  cultureId: string;
  cultureName: string;
  weekOf: string;
  days: MealPlanDay[];
  estimatedCost: number;
  servings: number;
  dietaryNotes: string[];
  homeschoolTheme: string;
}

export interface GroceryItem {
  name: string;
  amount: string;
  unit?: string;
  category: string;
  recipeNames: string[];
  checked?: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  age?: number;
  dietaryRestrictions: string[];
}

export interface FamilyProfile {
  familyName: string;
  heritageBackgrounds: string[];
  preferredCultures: string[];
  familySize: number;
  budgetPerWeek: number;
  dietaryNeeds: string[];
  homeschoolAgeRange: string;
  members: FamilyMember[];
  savedMealPlanIds: string[];
  savedRecipeIds: string[];
}
