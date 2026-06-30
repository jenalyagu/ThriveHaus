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
}

export interface RecipeStep {
  step: number;
  instruction: string;
  tip?: string;
}

export interface VocabWord {
  word: string;
  definition: string;
}

export interface HomeschoolLesson {
  subject: string;
  ageRange: string;
  duration: number;
  activity: string;
  discussion: string[];
  funFacts: string[];
  vocabulary: VocabWord[];
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  name: string;
  cultureId: string;
  cultureName: string;
  emoji: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  isFeatured: boolean;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  kidHelperTasks: string[];
  nutritionNotes: string;
  nutritionFacts: NutritionFacts;
  culturalHistory: string;
  homeschoolLesson: HomeschoolLesson;
  aiHint: string;
}

export interface MealEntry {
  recipeId: string;
  name: string;
  emoji: string;
}

export interface DayPlan {
  day: string;
  breakfast: MealEntry;
  lunch: MealEntry;
  dinner: MealEntry;
  snack?: MealEntry;
}

export interface MealPlan {
  id: string;
  name: string;
  cultureId: string;
  cultureName: string;
  weekOf: string;
  estimatedCost: number;
  servings: number;
  dietaryNotes: string[];
  homeschoolTheme: string;
  days: DayPlan[];
}

export interface GroceryItem {
  name: string;
  amount: string;
  unit?: string;
  category: string;
  recipeIds: string[];
  recipeNames: string[];
}
