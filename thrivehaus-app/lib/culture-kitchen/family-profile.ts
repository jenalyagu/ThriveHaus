import type { FamilyProfile } from './types';

export const defaultFamilyProfile: FamilyProfile = {
  familyName: 'Your Family',
  heritageBackgrounds: [],
  preferredCultures: [],
  familySize: 4,
  budgetPerWeek: 100,
  dietaryNeeds: [],
  homeschoolAgeRange: '6-12',
  members: [],
  savedMealPlanIds: ['filipino-week-1'],
  savedRecipeIds: ['adobo', 'hummus', 'pho'],
};

export const DIETARY_OPTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
  'Nut-Free', 'Halal', 'Kosher', 'Low-Sodium', 'Diabetic-Friendly',
];

export const AGE_RANGES = [
  { value: '0-5', label: 'Toddler (0–5 yrs)' },
  { value: '6-8', label: 'Early Elementary (6–8 yrs)' },
  { value: '9-12', label: 'Upper Elementary (9–12 yrs)' },
  { value: '13-16', label: 'Middle/High School (13–16 yrs)' },
  { value: 'mixed', label: 'Mixed Ages' },
];

export const BUDGET_OPTIONS = [
  { value: 50, label: 'Tight Budget ($50/week)' },
  { value: 75, label: 'Moderate ($75/week)' },
  { value: 100, label: 'Comfortable ($100/week)' },
  { value: 150, label: 'Generous ($150/week)' },
  { value: 200, label: 'Premium ($200+/week)' },
];
