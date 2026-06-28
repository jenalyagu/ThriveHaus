import type { MealPlan, GroceryItem } from './types';

export const sampleMealPlan: MealPlan = {
  id: 'filipino-week-1',
  name: 'Filipino Heritage Week',
  cultureId: 'filipino',
  cultureName: 'Filipino',
  weekOf: '2026-06-22',
  estimatedCost: 85,
  servings: 4,
  dietaryNotes: ['Contains pork', 'Contains shellfish', 'Contains soy'],
  homeschoolTheme: 'Island Geography & Preservation Science',
  days: [
    {
      day: 'Monday',
      breakfast: { recipeId: 'sinangag', name: 'Sinangag (Garlic Fried Rice)', emoji: '🍳' },
      lunch: { recipeId: 'pancit', name: 'Pancit Canton', emoji: '🍜' },
      dinner: { recipeId: 'adobo', name: 'Chicken Adobo', emoji: '🍗' },
      snack: { recipeId: 'halo-halo', name: 'Fruit & Coconut Snack', emoji: '🥥' },
    },
    {
      day: 'Tuesday',
      breakfast: { recipeId: 'champorado', name: 'Champorado (Chocolate Rice Porridge)', emoji: '🫙' },
      lunch: { recipeId: 'adobo', name: 'Leftover Adobo Rice Bowl', emoji: '🍗' },
      dinner: { recipeId: 'sinigang', name: 'Sinigang na Baboy', emoji: '🍲' },
    },
    {
      day: 'Wednesday',
      breakfast: { recipeId: 'eggs-rice', name: 'Eggs & Garlic Rice', emoji: '🥚' },
      lunch: { recipeId: 'sinigang', name: 'Leftover Sinigang', emoji: '🍲' },
      dinner: { recipeId: 'kare-kare', name: 'Simplified Kare-Kare (Peanut Stew)', emoji: '🥜' },
    },
    {
      day: 'Thursday',
      breakfast: { recipeId: 'pandesal', name: 'Pandesal with Butter & Jam', emoji: '🍞' },
      lunch: { recipeId: 'pancit', name: 'Pancit Canton', emoji: '🍜' },
      dinner: { recipeId: 'bangus', name: 'Daing na Bangus (Fried Milkfish)', emoji: '🐟' },
    },
    {
      day: 'Friday',
      breakfast: { recipeId: 'tapsilog', name: 'Tapsilog (Tapa + Sinangag + Itlog)', emoji: '🍳' },
      lunch: { recipeId: 'lugaw', name: 'Arroz Caldo (Ginger Rice Soup)', emoji: '🍚' },
      dinner: { recipeId: 'lechon', name: 'Family Celebration — Lechon-style Pork Belly', emoji: '🥩' },
    },
    {
      day: 'Saturday',
      breakfast: { recipeId: 'hotsilog', name: 'Hotsilog (Hotdog + Rice + Egg)', emoji: '🌭' },
      lunch: { recipeId: 'sopas', name: 'Sopas (Filipino Creamy Macaroni Soup)', emoji: '🥣' },
      dinner: { recipeId: 'sinigang', name: 'Sinigang (Weekend Feast Version)', emoji: '🍲' },
    },
    {
      day: 'Sunday',
      breakfast: { recipeId: 'pandesal', name: 'Pandesal & Coffee/Hot Chocolate', emoji: '☕' },
      lunch: { recipeId: 'kare-kare', name: 'Kare-Kare with Bagoong Rice', emoji: '🥜' },
      dinner: { recipeId: 'adobo', name: 'Sunday Adobo Feast with Family', emoji: '🍗' },
      snack: { recipeId: 'biko', name: 'Biko (Coconut Sticky Rice Cake)', emoji: '🍡' },
    },
  ],
};

export const sampleMexicanPlan: MealPlan = {
  id: 'mexican-week-1',
  name: 'Mexican Heritage Week',
  cultureId: 'mexican',
  cultureName: 'Mexican',
  weekOf: '2026-06-29',
  estimatedCost: 72,
  servings: 4,
  dietaryNotes: ['Vegetarian options available', 'Contains corn', 'Contains dairy'],
  homeschoolTheme: 'Ancient Civilizations & Three Sisters Agriculture',
  days: [
    {
      day: 'Monday',
      breakfast: { recipeId: 'huevos-rancheros', name: 'Huevos Rancheros', emoji: '🍳' },
      lunch: { recipeId: 'tacos', name: 'Bean & Cheese Tacos', emoji: '🌮' },
      dinner: { recipeId: 'tamales', name: 'Chicken Tamales', emoji: '🌽' },
    },
    {
      day: 'Tuesday',
      breakfast: { recipeId: 'atole', name: 'Atole de Vainilla (Warm Corn Drink)', emoji: '☕' },
      lunch: { recipeId: 'tamales', name: 'Leftover Tamales', emoji: '🌽' },
      dinner: { recipeId: 'pozole', name: 'Pozole Rojo', emoji: '🍲' },
    },
    {
      day: 'Wednesday',
      breakfast: { recipeId: 'horchata', name: 'Horchata + Pan Dulce', emoji: '🥛' },
      lunch: { recipeId: 'sopa', name: 'Sopa de Fideo', emoji: '🍜' },
      dinner: { recipeId: 'enchiladas', name: 'Chicken Enchiladas Verdes', emoji: '🫔' },
    },
    {
      day: 'Thursday',
      breakfast: { recipeId: 'chilaquiles', name: 'Chilaquiles Rojos', emoji: '🫔' },
      lunch: { recipeId: 'esquites', name: 'Esquites (Corn Salad)', emoji: '🌽' },
      dinner: { recipeId: 'mole', name: 'Mole Negro with Chicken', emoji: '🫙' },
    },
    {
      day: 'Friday',
      breakfast: { recipeId: 'horchata', name: 'Horchata Smoothie', emoji: '🥛' },
      lunch: { recipeId: 'tostadas', name: 'Tostadas with Refried Beans', emoji: '🫓' },
      dinner: { recipeId: 'birria', name: 'Birria Tacos (simplified)', emoji: '🌮' },
    },
    {
      day: 'Saturday',
      breakfast: { recipeId: 'molletes', name: 'Molletes (Bean Toast)', emoji: '🍞' },
      lunch: { recipeId: 'caldo', name: 'Caldo de Pollo', emoji: '🍵' },
      dinner: { recipeId: 'tamales', name: 'Tamale-Making Party', emoji: '🌽' },
    },
    {
      day: 'Sunday',
      breakfast: { recipeId: 'pan-dulce', name: 'Pan Dulce Spread', emoji: '🥐' },
      lunch: { recipeId: 'tacos', name: 'Sunday Taco Bar', emoji: '🌮' },
      dinner: { recipeId: 'mole', name: 'Mole Feast with Rice & Beans', emoji: '🫙' },
    },
  ],
};

export const groceryListFromPlan: GroceryItem[] = [
  { name: 'Chicken thighs', amount: '4', unit: 'lbs', category: 'Meat & Seafood', recipeNames: ['Chicken Adobo'] },
  { name: 'Pork ribs', amount: '2', unit: 'lbs', category: 'Meat & Seafood', recipeNames: ['Sinigang na Baboy'] },
  { name: 'Shrimp', amount: '½', unit: 'lb', category: 'Meat & Seafood', recipeNames: ['Pancit Canton'] },
  { name: 'Soy sauce', amount: '1', unit: 'bottle', category: 'Pantry', recipeNames: ['Chicken Adobo', 'Pancit Canton'] },
  { name: 'White cane vinegar', amount: '1', unit: 'bottle', category: 'Pantry', recipeNames: ['Chicken Adobo'] },
  { name: 'Fish sauce (patis)', amount: '1', unit: 'bottle', category: 'Pantry', recipeNames: ['Sinigang na Baboy', 'Pancit Canton'] },
  { name: 'Garlic', amount: '2', unit: 'heads', category: 'Produce', recipeNames: ['Chicken Adobo', 'Pancit Canton'] },
  { name: 'Bay leaves', amount: '1', unit: 'pack', category: 'Pantry', recipeNames: ['Chicken Adobo'] },
  { name: 'Tamarind paste', amount: '1', unit: 'jar', category: 'Pantry', recipeNames: ['Sinigang na Baboy'] },
  { name: 'Tomatoes', amount: '4', unit: 'medium', category: 'Produce', recipeNames: ['Sinigang na Baboy'] },
  { name: 'Onions', amount: '3', unit: 'large', category: 'Produce', recipeNames: ['Sinigang na Baboy', 'Pancit Canton'] },
  { name: 'Long green beans', amount: '1', unit: 'bunch', category: 'Produce', recipeNames: ['Sinigang na Baboy'] },
  { name: 'Eggplant', amount: '1', unit: 'medium', category: 'Produce', recipeNames: ['Sinigang na Baboy'] },
  { name: 'Baby spinach', amount: '1', unit: 'bag', category: 'Produce', recipeNames: ['Sinigang na Baboy'] },
  { name: 'Canton noodles', amount: '8', unit: 'oz', category: 'Pasta & Grains', recipeNames: ['Pancit Canton'] },
  { name: 'Cabbage', amount: '1', unit: 'small head', category: 'Produce', recipeNames: ['Pancit Canton'] },
  { name: 'Carrots', amount: '2', unit: 'medium', category: 'Produce', recipeNames: ['Pancit Canton'] },
  { name: 'Celery', amount: '1', unit: 'bunch', category: 'Produce', recipeNames: ['Pancit Canton'] },
  { name: 'Oyster sauce', amount: '1', unit: 'bottle', category: 'Pantry', recipeNames: ['Pancit Canton'] },
  { name: 'Chicken broth', amount: '2', unit: 'cartons', category: 'Pantry', recipeNames: ['Pancit Canton', 'Sinigang na Baboy'] },
  { name: 'Jasmine rice', amount: '5', unit: 'lbs', category: 'Pasta & Grains', recipeNames: ['Chicken Adobo', 'Sinigang na Baboy', 'Pancit Canton'] },
  { name: 'Neutral cooking oil', amount: '1', unit: 'bottle', category: 'Pantry', recipeNames: ['Chicken Adobo', 'Pancit Canton'] },
  { name: 'Scallions', amount: '1', unit: 'bunch', category: 'Produce', recipeNames: ['Chicken Adobo', 'Pancit Canton'] },
  { name: 'Calamansi limes (or regular limes)', amount: '4', category: 'Produce', recipeNames: ['Pancit Canton'] },
  { name: 'Chicken breast', amount: '1', unit: 'lb', category: 'Meat & Seafood', recipeNames: ['Pancit Canton'] },
];

export function generateGroceryList(mealPlan: MealPlan): GroceryItem[] {
  return groceryListFromPlan;
}

export const mealPlans = [sampleMealPlan, sampleMexicanPlan];
