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
    { day: 'Monday', breakfast: { recipeId: 'sinangag', name: 'Sinangag (Garlic Fried Rice)', emoji: '🍳' }, lunch: { recipeId: 'adobo', name: 'Chicken Adobo Rice Bowl', emoji: '🍗' }, dinner: { recipeId: 'sinigang', name: 'Sinigang na Baboy', emoji: '🍲' } },
    { day: 'Tuesday', breakfast: { recipeId: 'eggs', name: 'Eggs & Garlic Rice', emoji: '🥚' }, lunch: { recipeId: 'sinigang', name: 'Leftover Sinigang', emoji: '🍲' }, dinner: { recipeId: 'adobo', name: 'Chicken Adobo', emoji: '🍗' } },
    { day: 'Wednesday', breakfast: { recipeId: 'pandesal', name: 'Pandesal with Butter', emoji: '🍞' }, lunch: { recipeId: 'adobo', name: 'Adobo Fried Rice', emoji: '🍗' }, dinner: { recipeId: 'kare-kare', name: 'Simplified Kare-Kare (Peanut Stew)', emoji: '🥜' } },
    { day: 'Thursday', breakfast: { recipeId: 'champorado', name: 'Champorado (Chocolate Rice Porridge)', emoji: '🫙' }, lunch: { recipeId: 'pancit', name: 'Pancit Canton', emoji: '🍜' }, dinner: { recipeId: 'bangus', name: 'Daing na Bangus (Fried Milkfish)', emoji: '🐟' } },
    { day: 'Friday', breakfast: { recipeId: 'tapsilog', name: 'Tapsilog (Tapa + Sinangag + Itlog)', emoji: '🍳' }, lunch: { recipeId: 'lugaw', name: 'Arroz Caldo (Ginger Rice Soup)', emoji: '🍚' }, dinner: { recipeId: 'lechon', name: 'Lechon-style Pork Belly', emoji: '🥩' } },
    { day: 'Saturday', breakfast: { recipeId: 'hotsilog', name: 'Hotsilog (Hotdog + Rice + Egg)', emoji: '🌭' }, lunch: { recipeId: 'sopas', name: 'Sopas (Filipino Macaroni Soup)', emoji: '🥣' }, dinner: { recipeId: 'sinigang', name: 'Sinigang Weekend Feast', emoji: '🍲' } },
    { day: 'Sunday', breakfast: { recipeId: 'pandesal', name: 'Pandesal & Coffee', emoji: '☕' }, lunch: { recipeId: 'kare-kare', name: 'Kare-Kare with Bagoong Rice', emoji: '🥜' }, dinner: { recipeId: 'adobo', name: 'Sunday Adobo Feast', emoji: '🍗' }, snack: { recipeId: 'biko', name: 'Biko (Coconut Sticky Rice Cake)', emoji: '🍡' } },
  ],
};

export const sampleMexicanPlan: MealPlan = {
  id: 'mexican-week-1',
  name: 'Mexican Heritage Week',
  cultureId: 'mexican',
  cultureName: 'Mexican',
  weekOf: '2026-06-22',
  estimatedCost: 80,
  servings: 4,
  dietaryNotes: ['Contains gluten in tortillas', 'Dairy optional', 'Easily made vegetarian'],
  homeschoolTheme: 'Ancient Mesoamerican Civilizations & The Three Sisters',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'huevos', name: 'Huevos Rancheros', emoji: '🍳' }, lunch: { recipeId: 'tacos', name: 'Street Tacos with Salsa Verde', emoji: '🌮' }, dinner: { recipeId: 'tamales', name: 'Tamales', emoji: '🫔' } },
    { day: 'Tuesday', breakfast: { recipeId: 'atole', name: 'Atole & Pan Dulce', emoji: '☕' }, lunch: { recipeId: 'tamales', name: 'Leftover Tamales', emoji: '🫔' }, dinner: { recipeId: 'mole', name: 'Chicken Mole', emoji: '🍗' } },
    { day: 'Wednesday', breakfast: { recipeId: 'chilaquiles', name: 'Chilaquiles Verdes', emoji: '🫙' }, lunch: { recipeId: 'mole', name: 'Mole Rice Bowl', emoji: '🍗' }, dinner: { recipeId: 'pozole', name: 'Pozole Rojo', emoji: '🍲' } },
    { day: 'Thursday', breakfast: { recipeId: 'fruit', name: 'Fresh Fruit with Tajín', emoji: '🍉' }, lunch: { recipeId: 'quesadillas', name: 'Quesadillas with Guacamole', emoji: '🫓' }, dinner: { recipeId: 'enchiladas', name: 'Enchiladas Verdes', emoji: '🌯' } },
    { day: 'Friday', breakfast: { recipeId: 'molletes', name: 'Molletes (Bean & Cheese Bread)', emoji: '🍞' }, lunch: { recipeId: 'tacos', name: 'Fish Tacos with Cabbage Slaw', emoji: '🌮' }, dinner: { recipeId: 'tamales', name: 'Friday Tamales Fiesta', emoji: '🫔' } },
    { day: 'Saturday', breakfast: { recipeId: 'huevos', name: 'Huevos a la Mexicana', emoji: '🍳' }, lunch: { recipeId: 'torta', name: 'Torta Ahogada', emoji: '🥪' }, dinner: { recipeId: 'mole', name: 'Grand Mole Dinner', emoji: '🍗' }, snack: { recipeId: 'horchata', name: 'Horchata & Churros', emoji: '🥛' } },
    { day: 'Sunday', breakfast: { recipeId: 'tamales', name: 'Sunday Tamale Brunch', emoji: '🫔' }, lunch: { recipeId: 'caldo', name: 'Caldo de Res (Beef Soup)', emoji: '🍲' }, dinner: { recipeId: 'mole', name: 'Sunday Mole Feast', emoji: '🍗' } },
  ],
};

export const sampleVietnamesePlan: MealPlan = {
  id: 'vietnamese-week-1',
  name: 'Vietnamese Heritage Week',
  cultureId: 'vietnamese',
  cultureName: 'Vietnamese',
  weekOf: '2026-06-22',
  estimatedCost: 78,
  servings: 4,
  dietaryNotes: ['Contains fish sauce', 'Contains gluten (soy sauce)', 'Easily made vegetarian'],
  homeschoolTheme: 'Five Flavor Balance & Vietnamese Geography',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'pho', name: 'Phở Gà (Chicken Pho)', emoji: '🍜' }, lunch: { recipeId: 'spring-rolls', name: 'Fresh Spring Rolls (Gỏi Cuốn)', emoji: '🥗' }, dinner: { recipeId: 'pho', name: 'Phở Bò (Beef Pho)', emoji: '🍜' } },
    { day: 'Tuesday', breakfast: { recipeId: 'banh-mi', name: 'Bánh Mì Breakfast', emoji: '🥖' }, lunch: { recipeId: 'pho', name: 'Leftover Pho', emoji: '🍜' }, dinner: { recipeId: 'bun-cha', name: 'Bún Chả (Grilled Pork with Noodles)', emoji: '🍝' } },
    { day: 'Wednesday', breakfast: { recipeId: 'chao', name: 'Cháo (Vietnamese Rice Porridge)', emoji: '🍚' }, lunch: { recipeId: 'spring-rolls', name: 'Spring Rolls with Peanut Sauce', emoji: '🥗' }, dinner: { recipeId: 'pho', name: 'Phở Special Edition', emoji: '🍜' } },
    { day: 'Thursday', breakfast: { recipeId: 'banh-mi', name: 'Bánh Mì with Pâté', emoji: '🥖' }, lunch: { recipeId: 'com', name: 'Cơm Tấm (Broken Rice with Pork)', emoji: '🍚' }, dinner: { recipeId: 'canh-chua', name: 'Canh Chua (Sour Tamarind Soup)', emoji: '🍲' } },
    { day: 'Friday', breakfast: { recipeId: 'pho', name: 'Friday Morning Pho', emoji: '🍜' }, lunch: { recipeId: 'spring-rolls', name: 'Fried Spring Rolls (Chả Giò)', emoji: '🥗' }, dinner: { recipeId: 'bun-cha', name: 'Bún Chả Hà Nội', emoji: '🍝' } },
    { day: 'Saturday', breakfast: { recipeId: 'banh-cuon', name: 'Bánh Cuốn (Steamed Rice Rolls)', emoji: '🫓' }, lunch: { recipeId: 'pho', name: 'Saturday Pho Feast', emoji: '🍜' }, dinner: { recipeId: 'lau', name: 'Lẩu (Vietnamese Hot Pot)', emoji: '🍲' }, snack: { recipeId: 'che', name: 'Chè (Sweet Bean Dessert Soup)', emoji: '🍵' } },
    { day: 'Sunday', breakfast: { recipeId: 'pho', name: 'Sunday Pho Tradition', emoji: '🍜' }, lunch: { recipeId: 'spring-rolls', name: 'Spring Roll Making Party', emoji: '🥗' }, dinner: { recipeId: 'bun-bo-hue', name: 'Bún Bò Huế (Spicy Beef Noodle Soup)', emoji: '🌶️' } },
  ],
};

export const samplePersianPlan: MealPlan = {
  id: 'persian-week-1',
  name: 'Persian Heritage Week',
  cultureId: 'persian',
  cultureName: 'Persian',
  weekOf: '2026-06-22',
  estimatedCost: 90,
  servings: 4,
  dietaryNotes: ['Contains lamb and chicken', 'Dairy optional (kashk)', 'Nut alert (walnuts, pistachios)'],
  homeschoolTheme: 'Ancient Persia & The Silk Road Spice Trade',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'noon', name: 'Noon Barbari with Feta & Honey', emoji: '🍞' }, lunch: { recipeId: 'ghormeh-sabzi', name: 'Ghormeh Sabzi with Rice', emoji: '🌿' }, dinner: { recipeId: 'tahdig', name: 'Tahdig with Herb Rice', emoji: '🍚' } },
    { day: 'Tuesday', breakfast: { recipeId: 'eggs', name: 'Omelet with Herbs & Feta', emoji: '🥚' }, lunch: { recipeId: 'ghormeh-sabzi', name: 'Leftover Ghormeh Sabzi', emoji: '🌿' }, dinner: { recipeId: 'fesenjan', name: 'Fesenjan (Walnut Pomegranate Stew)', emoji: '🍇' } },
    { day: 'Wednesday', breakfast: { recipeId: 'halim', name: 'Halim (Wheat & Meat Porridge)', emoji: '🥣' }, lunch: { recipeId: 'fesenjan', name: 'Fesenjan Rice Bowl', emoji: '🍇' }, dinner: { recipeId: 'kebab', name: 'Kofte Kebab with Lavash', emoji: '🥩' } },
    { day: 'Thursday', breakfast: { recipeId: 'noon', name: 'Sangak Bread with Jam', emoji: '🍞' }, lunch: { recipeId: 'ash', name: 'Ash Reshteh (Herb Noodle Soup)', emoji: '🍲' }, dinner: { recipeId: 'tahdig', name: 'Saffron Rice Tahdig with Chicken', emoji: '🍚' } },
    { day: 'Friday', breakfast: { recipeId: 'omelet', name: 'Kookoo Sabzi (Herb Frittata)', emoji: '🥚' }, lunch: { recipeId: 'ghormeh-sabzi', name: 'Ghormeh Sabzi Friday Special', emoji: '🌿' }, dinner: { recipeId: 'fesenjan', name: 'Friday Fesenjan Feast', emoji: '🍇' } },
    { day: 'Saturday', breakfast: { recipeId: 'halim', name: 'Saturday Halim Brunch', emoji: '🥣' }, lunch: { recipeId: 'tahdig', name: 'Tahdig Picnic', emoji: '🍚' }, dinner: { recipeId: 'lamb', name: 'Slow-Roasted Lamb Shank', emoji: '🍖' }, snack: { recipeId: 'bastani', name: 'Bastani (Persian Saffron Ice Cream)', emoji: '🍦' } },
    { day: 'Sunday', breakfast: { recipeId: 'noon', name: 'Sunday Bread & Cheese Spread', emoji: '🍞' }, lunch: { recipeId: 'ghormeh-sabzi', name: 'Sunday Ghormeh Sabzi', emoji: '🌿' }, dinner: { recipeId: 'tahdig', name: 'Grand Tahdig Feast', emoji: '🍚' } },
  ],
};

export const sampleIndianPlan: MealPlan = {
  id: 'indian-week-1',
  name: 'Indian Heritage Week',
  cultureId: 'indian',
  cultureName: 'Indian',
  weekOf: '2026-06-22',
  estimatedCost: 82,
  servings: 4,
  dietaryNotes: ['Easily made vegetarian/vegan', 'Contains dairy (ghee, paneer)', 'Gluten in roti/naan'],
  homeschoolTheme: 'Spice Trade History & Ayurvedic Nutrition',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'idli', name: 'Idli with Sambar & Chutney', emoji: '🫓' }, lunch: { recipeId: 'dal-tadka', name: 'Dal Tadka with Rice', emoji: '🫘' }, dinner: { recipeId: 'biryani', name: 'Chicken Biryani', emoji: '🍚' } },
    { day: 'Tuesday', breakfast: { recipeId: 'paratha', name: 'Aloo Paratha with Yogurt', emoji: '🫓' }, lunch: { recipeId: 'biryani', name: 'Leftover Biryani', emoji: '🍚' }, dinner: { recipeId: 'dal-tadka', name: 'Dal Makhani with Naan', emoji: '🫘' } },
    { day: 'Wednesday', breakfast: { recipeId: 'upma', name: 'Upma (Semolina Porridge)', emoji: '🥣' }, lunch: { recipeId: 'dal-tadka', name: 'Dal & Roti Lunch', emoji: '🫘' }, dinner: { recipeId: 'paneer', name: 'Paneer Tikka Masala', emoji: '🍛' } },
    { day: 'Thursday', breakfast: { recipeId: 'poha', name: 'Poha (Flattened Rice Breakfast)', emoji: '🍚' }, lunch: { recipeId: 'biryani', name: 'Vegetable Biryani', emoji: '🍚' }, dinner: { recipeId: 'dal-tadka', name: 'Dal Tadka with Jeera Rice', emoji: '🫘' } },
    { day: 'Friday', breakfast: { recipeId: 'dosa', name: 'Masala Dosa', emoji: '🫓' }, lunch: { recipeId: 'chole', name: 'Chole Bhature (Chickpea Curry)', emoji: '🫘' }, dinner: { recipeId: 'biryani', name: 'Friday Biryani Feast', emoji: '🍚' } },
    { day: 'Saturday', breakfast: { recipeId: 'paratha', name: 'Saturday Paratha Brunch', emoji: '🫓' }, lunch: { recipeId: 'thali', name: 'Full Vegetarian Thali', emoji: '🍛' }, dinner: { recipeId: 'dal-tadka', name: 'Saturday Dal & Roti', emoji: '🫘' }, snack: { recipeId: 'kheer', name: 'Kheer (Rice Pudding)', emoji: '🍮' } },
    { day: 'Sunday', breakfast: { recipeId: 'idli', name: 'Sunday Idli & Filter Coffee', emoji: '☕' }, lunch: { recipeId: 'biryani', name: 'Sunday Grand Biryani', emoji: '🍚' }, dinner: { recipeId: 'dal-tadka', name: 'Simple Dal & Rice', emoji: '🫘' } },
  ],
};

export const sampleSouthernPlan: MealPlan = {
  id: 'southern-week-1',
  name: 'Southern American Heritage Week',
  cultureId: 'southern',
  cultureName: 'Southern American',
  weekOf: '2026-06-22',
  estimatedCost: 85,
  servings: 4,
  dietaryNotes: ['Contains pork and chicken', 'Dairy in biscuits and grits', 'Cast iron recommended'],
  homeschoolTheme: 'African American Food History & Soul Food Roots',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'biscuits', name: 'Buttermilk Biscuits with Gravy', emoji: '🍞' }, lunch: { recipeId: 'fried-chicken', name: 'Fried Chicken with Collard Greens', emoji: '🍗' }, dinner: { recipeId: 'shrimp-grits', name: 'Shrimp & Grits', emoji: '🦐' } },
    { day: 'Tuesday', breakfast: { recipeId: 'grits', name: 'Cheese Grits with Eggs', emoji: '🥚' }, lunch: { recipeId: 'shrimp-grits', name: 'Leftover Shrimp & Grits', emoji: '🦐' }, dinner: { recipeId: 'fried-chicken', name: 'Sunday Fried Chicken (Tuesday Edition)', emoji: '🍗' } },
    { day: 'Wednesday', breakfast: { recipeId: 'cornbread', name: 'Skillet Cornbread with Honey Butter', emoji: '🌽' }, lunch: { recipeId: 'beans', name: 'Black-Eyed Peas & Rice', emoji: '🫘' }, dinner: { recipeId: 'catfish', name: 'Cornmeal-Crusted Catfish', emoji: '🐟' } },
    { day: 'Thursday', breakfast: { recipeId: 'biscuits', name: 'Biscuits & Jam', emoji: '🍞' }, lunch: { recipeId: 'fried-chicken', name: 'Chicken Sandwich', emoji: '🍗' }, dinner: { recipeId: 'shrimp-grits', name: 'Shrimp & Grits with Andouille', emoji: '🦐' } },
    { day: 'Friday', breakfast: { recipeId: 'grits', name: 'Friday Morning Grits', emoji: '🥚' }, lunch: { recipeId: 'potato-salad', name: 'Potato Salad & BBQ', emoji: '🥔' }, dinner: { recipeId: 'fried-chicken', name: 'Friday Fried Chicken Feast', emoji: '🍗' } },
    { day: 'Saturday', breakfast: { recipeId: 'pancakes', name: 'Buttermilk Pancakes with Sorghum', emoji: '🥞' }, lunch: { recipeId: 'gumbo', name: 'Chicken & Sausage Gumbo', emoji: '🍲' }, dinner: { recipeId: 'shrimp-grits', name: 'Saturday Shrimp & Grits', emoji: '🦐' }, snack: { recipeId: 'peach-cobbler', name: 'Peach Cobbler with Ice Cream', emoji: '🍑' } },
    { day: 'Sunday', breakfast: { recipeId: 'biscuits', name: 'Sunday Biscuits & Sausage Gravy', emoji: '🍞' }, lunch: { recipeId: 'fried-chicken', name: 'Sunday Fried Chicken Dinner', emoji: '🍗' }, dinner: { recipeId: 'beans', name: 'Slow-Cooked Pinto Beans & Cornbread', emoji: '🫘' } },
  ],
};

export const sampleMediterraneanPlan: MealPlan = {
  id: 'mediterranean-week-1',
  name: 'Mediterranean Heritage Week',
  cultureId: 'mediterranean',
  cultureName: 'Mediterranean',
  weekOf: '2026-06-22',
  estimatedCost: 88,
  servings: 4,
  dietaryNotes: ['Contains dairy (feta, halloumi)', 'Easily made vegan', 'Contains gluten in pita/pasta'],
  homeschoolTheme: 'Ancient Civilizations & The Mediterranean Diet',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'yogurt', name: 'Greek Yogurt with Honey & Walnuts', emoji: '🍯' }, lunch: { recipeId: 'hummus', name: 'Hummus & Pita Plate', emoji: '🫓' }, dinner: { recipeId: 'moussaka', name: 'Moussaka', emoji: '🍆' } },
    { day: 'Tuesday', breakfast: { recipeId: 'eggs', name: 'Shakshuka (Eggs in Tomato Sauce)', emoji: '🍳' }, lunch: { recipeId: 'greek-salad', name: 'Greek Salad with Feta', emoji: '🥗' }, dinner: { recipeId: 'pasta', name: 'Pasta with Olive Oil & Herbs', emoji: '🍝' } },
    { day: 'Wednesday', breakfast: { recipeId: 'yogurt', name: "Labneh with Za'atar & Olive Oil", emoji: '🫙' }, lunch: { recipeId: 'hummus', name: 'Hummus Bowl with Roasted Vegetables', emoji: '🫓' }, dinner: { recipeId: 'lamb-chops', name: 'Herb-Crusted Lamb Chops', emoji: '🍖' } },
    { day: 'Thursday', breakfast: { recipeId: 'avocado', name: 'Avocado Toast with Dukkah', emoji: '🥑' }, lunch: { recipeId: 'greek-salad', name: 'Fattoush Salad', emoji: '🥗' }, dinner: { recipeId: 'fish', name: 'Baked Fish with Lemon & Herbs', emoji: '🐟' } },
    { day: 'Friday', breakfast: { recipeId: 'eggs', name: 'Spanish Tortilla', emoji: '🍳' }, lunch: { recipeId: 'hummus', name: 'Mezze Plate — Hummus, Baba Ganoush, Tabbouleh', emoji: '🫓' }, dinner: { recipeId: 'moussaka', name: 'Friday Moussaka', emoji: '🍆' } },
    { day: 'Saturday', breakfast: { recipeId: 'yogurt', name: 'Full Greek Breakfast Spread', emoji: '🍯' }, lunch: { recipeId: 'greek-salad', name: 'Saturday Greek Salad Feast', emoji: '🥗' }, dinner: { recipeId: 'shakshuka', name: 'Sunday Shakshuka Brunch', emoji: '🍳' }, snack: { recipeId: 'baklava', name: 'Pistachio Baklava', emoji: '🍯' } },
    { day: 'Sunday', breakfast: { recipeId: 'eggs', name: 'Sunday Shakshuka Brunch', emoji: '🍳' }, lunch: { recipeId: 'lamb-chops', name: 'Sunday Lamb & Roasted Vegetables', emoji: '🍖' }, dinner: { recipeId: 'pasta', name: 'Pasta Night', emoji: '🍝' } },
  ],
};

export const sampleJapanesePlan: MealPlan = {
  id: 'japanese-week-1',
  name: 'Japanese Heritage Week',
  cultureId: 'japanese',
  cultureName: 'Japanese',
  weekOf: '2026-06-22',
  estimatedCost: 90,
  servings: 4,
  dietaryNotes: ['Contains soy', 'Contains seafood', 'Contains gluten'],
  homeschoolTheme: 'Umami Science & Japanese Food Philosophy',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'miso-soup', name: 'Miso Soup & Rice', emoji: '🍵' }, lunch: { recipeId: 'onigiri', name: 'Onigiri Rice Balls', emoji: '🍙' }, dinner: { recipeId: 'ramen', name: 'Chicken Shoyu Ramen', emoji: '🍜' }, snack: { recipeId: 'edamame', name: 'Salted Edamame', emoji: '🫘' } },
    { day: 'Tuesday', breakfast: { recipeId: 'tamago', name: 'Tamagoyaki & Rice', emoji: '🥚' }, lunch: { recipeId: 'ramen', name: 'Leftover Ramen', emoji: '🍜' }, dinner: { recipeId: 'teriyaki', name: 'Chicken Teriyaki with Rice', emoji: '🍗' } },
    { day: 'Wednesday', breakfast: { recipeId: 'onigiri', name: 'Onigiri Lunchbox', emoji: '🍙' }, lunch: { recipeId: 'miso-soup', name: 'Miso Soup with Tofu & Vegetables', emoji: '🍵' }, dinner: { recipeId: 'gyoza', name: 'Pan-Fried Gyoza with Rice', emoji: '🥟' } },
    { day: 'Thursday', breakfast: { recipeId: 'okayu', name: 'Okayu (Japanese Rice Porridge)', emoji: '🍚' }, lunch: { recipeId: 'onigiri', name: 'Salmon Onigiri', emoji: '🍙' }, dinner: { recipeId: 'ramen', name: 'Vegetable Ramen Bowl', emoji: '🍜' } },
    { day: 'Friday', breakfast: { recipeId: 'toast', name: 'Japanese Milk Toast with Honey', emoji: '🍞' }, lunch: { recipeId: 'soba', name: 'Cold Soba Noodles', emoji: '🍝' }, dinner: { recipeId: 'katsu', name: 'Chicken Katsu', emoji: '🍱' } },
    { day: 'Saturday', breakfast: { recipeId: 'pancakes', name: 'Japanese Fluffy Pancakes', emoji: '🥞' }, lunch: { recipeId: 'onigiri', name: 'Onigiri Picnic', emoji: '🍙' }, dinner: { recipeId: 'sukiyaki', name: 'Family Sukiyaki Hot Pot', emoji: '🍲' } },
    { day: 'Sunday', breakfast: { recipeId: 'miso-soup', name: 'Traditional Japanese Breakfast', emoji: '🍵' }, lunch: { recipeId: 'ramen', name: 'Sunday Ramen Feast', emoji: '🍜' }, dinner: { recipeId: 'sushi', name: 'Hand-Roll Sushi Night', emoji: '🍣' }, snack: { recipeId: 'mochi', name: 'Mochi Ice Cream', emoji: '🍡' } },
  ],
};

export const sampleKoreanPlan: MealPlan = {
  id: 'korean-week-1',
  name: 'Korean Heritage Week',
  cultureId: 'korean',
  cultureName: 'Korean',
  weekOf: '2026-06-22',
  estimatedCost: 85,
  servings: 4,
  dietaryNotes: ['Contains soy', 'Contains sesame', 'Kimchi contains fish sauce'],
  homeschoolTheme: 'Fermentation Science & Korean History',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'egg-rice', name: 'Gyeran Bap (Egg Rice Bowl)', emoji: '🥚' }, lunch: { recipeId: 'bibimbap', name: 'Bibimbap', emoji: '🥗' }, dinner: { recipeId: 'japchae', name: 'Japchae Glass Noodles', emoji: '🍝' }, snack: { recipeId: 'kimchi', name: 'Kimchi & Rice Crackers', emoji: '🥬' } },
    { day: 'Tuesday', breakfast: { recipeId: 'congee', name: 'Juk (Korean Rice Congee)', emoji: '🍚' }, lunch: { recipeId: 'japchae', name: 'Leftover Japchae', emoji: '🍝' }, dinner: { recipeId: 'bulgogi', name: 'Beef Bulgogi with Banchan', emoji: '🥩' } },
    { day: 'Wednesday', breakfast: { recipeId: 'toast', name: 'Korean Street Toast', emoji: '🍳' }, lunch: { recipeId: 'bibimbap', name: 'Leftover Bibimbap', emoji: '🥗' }, dinner: { recipeId: 'jjigae', name: 'Sundubu Jjigae (Soft Tofu Stew)', emoji: '🍲' } },
    { day: 'Thursday', breakfast: { recipeId: 'banana-milk', name: 'Korean Banana Milk & Toast', emoji: '🍌' }, lunch: { recipeId: 'kimbap', name: 'Kimbap (Korean Rice Rolls)', emoji: '🍱' }, dinner: { recipeId: 'japchae', name: 'Japchae with Kimchi Banchan', emoji: '🍝' } },
    { day: 'Friday', breakfast: { recipeId: 'hobak-juk', name: 'Hobak Juk (Pumpkin Porridge)', emoji: '🎃' }, lunch: { recipeId: 'bibimbap', name: 'Dolsot Bibimbap', emoji: '🥗' }, dinner: { recipeId: 'samgyeopsal', name: 'Grilled Pork Belly', emoji: '🥓' } },
    { day: 'Saturday', breakfast: { recipeId: 'pancake', name: 'Pajeon (Korean Scallion Pancake)', emoji: '🥞' }, lunch: { recipeId: 'japchae', name: 'Japchae Celebration Lunch', emoji: '🍝' }, dinner: { recipeId: 'galbi', name: 'Galbi (Korean Short Ribs)', emoji: '🍖' }, snack: { recipeId: 'bingsu', name: 'Bingsu (Shaved Ice)', emoji: '🧊' } },
    { day: 'Sunday', breakfast: { recipeId: 'doenjang', name: 'Doenjang Guk & Rice', emoji: '🍵' }, lunch: { recipeId: 'bibimbap', name: 'Sunday Family Bibimbap', emoji: '🥗' }, dinner: { recipeId: 'dakgalbi', name: 'Spicy Stir-Fried Chicken', emoji: '🍗' }, snack: { recipeId: 'tteok', name: 'Tteok (Rice Cake) Dessert', emoji: '🍡' } },
  ],
};

export const sampleWestAfricanPlan: MealPlan = {
  id: 'west-african-week-1',
  name: 'West African Heritage Week',
  cultureId: 'west-african',
  cultureName: 'West African',
  weekOf: '2026-06-22',
  estimatedCost: 80,
  servings: 4,
  dietaryNotes: ['Contains palm oil', 'Contains peanuts', 'Dried fish — check for allergies'],
  homeschoolTheme: 'Diaspora History & West African Culinary Roots',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'akara', name: 'Akara (Black-Eyed Pea Fritters)', emoji: '🫘' }, lunch: { recipeId: 'jollof-rice', name: 'Jollof Rice', emoji: '🍚' }, dinner: { recipeId: 'egusi-soup', name: 'Egusi Soup with Fufu', emoji: '🍲' } },
    { day: 'Tuesday', breakfast: { recipeId: 'ogi', name: 'Ogi (Corn Porridge) with Honey', emoji: '🍯' }, lunch: { recipeId: 'jollof-rice', name: 'Leftover Jollof with Fried Plantains', emoji: '🍚' }, dinner: { recipeId: 'peanut-soup', name: 'West African Peanut Soup', emoji: '🥜' } },
    { day: 'Wednesday', breakfast: { recipeId: 'bread', name: 'Agege Bread with Butter & Tea', emoji: '🍞' }, lunch: { recipeId: 'egusi-soup', name: 'Leftover Egusi Soup with Rice', emoji: '🍲' }, dinner: { recipeId: 'jollof-rice', name: 'Party Jollof Rice', emoji: '🍚' }, snack: { recipeId: 'plantains', name: 'Fried Sweet Plantains (Dodo)', emoji: '🍌' } },
    { day: 'Thursday', breakfast: { recipeId: 'akara', name: 'Akara with Hot Pepper Sauce', emoji: '🫘' }, lunch: { recipeId: 'moin-moin', name: 'Moin Moin (Steamed Bean Pudding)', emoji: '🟤' }, dinner: { recipeId: 'peanut-soup', name: 'Peanut Soup with Yam Balls', emoji: '🥜' } },
    { day: 'Friday', breakfast: { recipeId: 'ogi', name: 'Pap with Moin Moin', emoji: '🍯' }, lunch: { recipeId: 'jollof-rice', name: 'Jollof Rice with Grilled Chicken', emoji: '🍚' }, dinner: { recipeId: 'egusi-soup', name: 'Egusi Soup with Pounded Yam', emoji: '🍲' }, snack: { recipeId: 'chin-chin', name: 'Chin Chin (Fried Dough Snack)', emoji: '🍩' } },
    { day: 'Saturday', breakfast: { recipeId: 'toast', name: 'Bread & Eggs with Tomato Stew', emoji: '🍳' }, lunch: { recipeId: 'suya', name: 'Suya (Spiced Grilled Beef Skewers)', emoji: '🍢' }, dinner: { recipeId: 'jollof-rice', name: 'Saturday Party Jollof Rice Feast', emoji: '🍚' }, snack: { recipeId: 'puff-puff', name: 'Puff Puff (Nigerian Doughnuts)', emoji: '🍩' } },
    { day: 'Sunday', breakfast: { recipeId: 'akara', name: 'Sunday Akara & Ogi', emoji: '🫘' }, lunch: { recipeId: 'egusi-soup', name: 'Sunday Egusi Feast', emoji: '🍲' }, dinner: { recipeId: 'jollof-rice', name: 'Sunday Jollof with Fried Fish', emoji: '🍚' } },
  ],
};

export const sampleEthiopianPlan: MealPlan = {
  id: 'ethiopian-week-1',
  name: 'Ethiopian Heritage Week',
  cultureId: 'ethiopian',
  cultureName: 'Ethiopian',
  weekOf: '2026-06-22',
  estimatedCost: 75,
  servings: 4,
  dietaryNotes: ['Vegan-friendly fasting dishes available', 'Contains berbere (spicy)', 'Teff in injera'],
  homeschoolTheme: 'Ancient Trade Routes & Ethiopian Orthodox Fasting Traditions',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'firfir', name: 'Injera Firfir with Berbere', emoji: '🫓' }, lunch: { recipeId: 'misir-wat', name: 'Misir Wat with Injera', emoji: '🫘' }, dinner: { recipeId: 'doro-wat', name: 'Doro Wat with Injera', emoji: '🍗' }, snack: { recipeId: 'coffee', name: 'Ethiopian Coffee Ceremony', emoji: '☕' } },
    { day: 'Tuesday', breakfast: { recipeId: 'genfo', name: 'Genfo (Barley Porridge with Spiced Butter)', emoji: '🍵' }, lunch: { recipeId: 'doro-wat', name: 'Leftover Doro Wat', emoji: '🍗' }, dinner: { recipeId: 'tibs', name: 'Sautéed Lamb Tibs with Injera', emoji: '🥩' } },
    { day: 'Wednesday', breakfast: { recipeId: 'firfir', name: 'Shiro Firfir Breakfast', emoji: '🫓' }, lunch: { recipeId: 'misir-wat', name: 'Misir Wat & Gomen (Collard Greens)', emoji: '🫘' }, dinner: { recipeId: 'doro-wat', name: 'Doro Wat Feast Night', emoji: '🍗' } },
    { day: 'Thursday', breakfast: { recipeId: 'breakfast-injera', name: 'Injera with Honey & Spiced Butter', emoji: '🍯' }, lunch: { recipeId: 'shiro', name: 'Shiro Wat with Injera', emoji: '🟡' }, dinner: { recipeId: 'misir-wat', name: 'Misir Wat & Ayib Cheese', emoji: '🫘' }, snack: { recipeId: 'popcorn', name: 'Ethiopian Popcorn', emoji: '🍿' } },
    { day: 'Friday', breakfast: { recipeId: 'genfo', name: 'Genfo with Berbere Butter', emoji: '🍵' }, lunch: { recipeId: 'misir-wat', name: 'Fasting Plate — Misir + Gomen + Tikil Gomen', emoji: '🫘' }, dinner: { recipeId: 'doro-wat', name: 'Friday Doro Wat Special', emoji: '🍗' } },
    { day: 'Saturday', breakfast: { recipeId: 'fuul', name: 'Fuul (Fava Bean Breakfast)', emoji: '🫘' }, lunch: { recipeId: 'kitfo', name: 'Kitfo with Injera', emoji: '🥩' }, dinner: { recipeId: 'doro-wat', name: 'Saturday Celebration Doro Wat', emoji: '🍗' }, snack: { recipeId: 'coffee', name: 'Full Ethiopian Coffee Ceremony', emoji: '☕' } },
    { day: 'Sunday', breakfast: { recipeId: 'firfir', name: 'Sunday Morning Firfir', emoji: '🫓' }, lunch: { recipeId: 'misir-wat', name: 'Vegetarian Fasting Plate with 4 Wats', emoji: '🫘' }, dinner: { recipeId: 'doro-wat', name: 'Sunday Feast — Full Ethiopian Spread', emoji: '🍗' }, snack: { recipeId: 'himbasha', name: 'Himbasha (Ethiopian Celebration Bread)', emoji: '🍞' } },
  ],
};

export const sampleBrazilianPlan: MealPlan = {
  id: 'brazilian-week-1',
  name: 'Brazilian Heritage Week',
  cultureId: 'brazilian',
  cultureName: 'Brazilian',
  weekOf: '2026-06-22',
  estimatedCost: 88,
  servings: 4,
  dietaryNotes: ['Contains pork', 'Contains dairy (pão de queijo)', 'Gluten-free options available'],
  homeschoolTheme: 'Amazon Biodiversity & Three Cultures of Brazil',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'pao-de-queijo', name: 'Pão de Queijo with Coffee', emoji: '🧀' }, lunch: { recipeId: 'rice-beans', name: 'Arroz e Feijão (Rice & Beans)', emoji: '🍚' }, dinner: { recipeId: 'feijoada', name: 'Feijoada', emoji: '🫕' } },
    { day: 'Tuesday', breakfast: { recipeId: 'acai', name: 'Açaí Bowl with Granola & Banana', emoji: '🫐' }, lunch: { recipeId: 'feijoada', name: 'Leftover Feijoada with Farofa', emoji: '🫕' }, dinner: { recipeId: 'moqueca', name: 'Moqueca (Coconut Fish Stew)', emoji: '🐟' } },
    { day: 'Wednesday', breakfast: { recipeId: 'pao-de-queijo', name: 'Fresh Pão de Queijo', emoji: '🧀' }, lunch: { recipeId: 'coxinha', name: 'Coxinha (Chicken Croquettes)', emoji: '🍗' }, dinner: { recipeId: 'feijoada', name: 'Feijoada with Collard Greens & Orange', emoji: '🫕' }, snack: { recipeId: 'caipirinha-juice', name: 'Fresh Lime Juice', emoji: '🍹' } },
    { day: 'Thursday', breakfast: { recipeId: 'mingau', name: 'Mingau de Aveia (Oat Porridge)', emoji: '🥣' }, lunch: { recipeId: 'rice-beans', name: 'Rice & Beans with Vinagrete', emoji: '🍚' }, dinner: { recipeId: 'churrasco', name: 'Churrasco (Brazilian BBQ)', emoji: '🥩' } },
    { day: 'Friday', breakfast: { recipeId: 'pao-de-queijo', name: 'Pão de Queijo & Fresh Fruit', emoji: '🧀' }, lunch: { recipeId: 'caldo', name: 'Caldo Verde (Collard Green Soup)', emoji: '🥬' }, dinner: { recipeId: 'feijoada', name: 'Friday Feijoada with the Family', emoji: '🫕' } },
    { day: 'Saturday', breakfast: { recipeId: 'tapioca', name: 'Tapioca Crepe with Cheese & Honey', emoji: '🫓' }, lunch: { recipeId: 'feijoada', name: 'Saturday Feijoada — the National Meal', emoji: '🫕' }, dinner: { recipeId: 'churrasco', name: 'Backyard Churrasco Night', emoji: '🥩' }, snack: { recipeId: 'brigadeiro', name: 'Brigadeiro (Chocolate Truffles)', emoji: '🍫' } },
    { day: 'Sunday', breakfast: { recipeId: 'pao-de-queijo', name: 'Pão de Queijo & Café com Leite', emoji: '🧀' }, lunch: { recipeId: 'rice-beans', name: 'Sunday Arroz e Feijão with Farofa', emoji: '🍚' }, dinner: { recipeId: 'feijoada', name: 'Grand Sunday Feijoada Feast', emoji: '🫕' }, snack: { recipeId: 'pudim', name: 'Pudim de Leite (Brazilian Flan)', emoji: '🍮' } },
  ],
};

export const sampleMoroccanPlan: MealPlan = {
  id: 'moroccan-week-1',
  name: 'Moroccan Heritage Week',
  cultureId: 'moroccan',
  cultureName: 'Moroccan',
  weekOf: '2026-06-22',
  estimatedCost: 82,
  servings: 4,
  dietaryNotes: ['Contains lamb and chicken', 'Harissa is spicy', 'Gluten in couscous and bread'],
  homeschoolTheme: 'Spice Trade History & Moroccan Architecture',
  days: [
    { day: 'Monday', breakfast: { recipeId: 'msemen', name: 'Msemen (Moroccan Flatbread) with Honey', emoji: '🫓' }, lunch: { recipeId: 'harira', name: 'Harira Soup with Dates', emoji: '🍵' }, dinner: { recipeId: 'chicken-tagine', name: 'Chicken Tagine with Preserved Lemon', emoji: '🏺' } },
    { day: 'Tuesday', breakfast: { recipeId: 'baghrir', name: 'Baghrir (Honeycomb Pancakes) with Butter', emoji: '🥞' }, lunch: { recipeId: 'chicken-tagine', name: 'Leftover Tagine with Couscous', emoji: '🏺' }, dinner: { recipeId: 'couscous', name: 'Seven-Vegetable Couscous', emoji: '🍲' } },
    { day: 'Wednesday', breakfast: { recipeId: 'msemen', name: 'Msemen with Argan Oil', emoji: '🫓' }, lunch: { recipeId: 'harira', name: 'Leftover Harira', emoji: '🍵' }, dinner: { recipeId: 'chicken-tagine', name: 'Chicken Tagine with Olives', emoji: '🏺' }, snack: { recipeId: 'sfenj', name: 'Sfenj (Moroccan Doughnuts)', emoji: '🍩' } },
    { day: 'Thursday', breakfast: { recipeId: 'tea', name: 'Moroccan Mint Tea & Biscuits', emoji: '🍵' }, lunch: { recipeId: 'zaalouk', name: 'Zaalouk (Eggplant & Tomato Salad) with Bread', emoji: '🍆' }, dinner: { recipeId: 'harira', name: 'Harira & Stuffed Dates', emoji: '🍵' } },
    { day: 'Friday', breakfast: { recipeId: 'msemen', name: 'Msemen & Mint Tea', emoji: '🫓' }, lunch: { recipeId: 'chicken-tagine', name: 'Friday Tagine Lunch', emoji: '🏺' }, dinner: { recipeId: 'couscous', name: 'Friday Couscous (traditional weekly meal)', emoji: '🍲' } },
    { day: 'Saturday', breakfast: { recipeId: 'chebakia', name: 'Chebakia (Honey Sesame Cookies) & Coffee', emoji: '🍪' }, lunch: { recipeId: 'harira', name: 'Harira with Lemon & Cilantro', emoji: '🍵' }, dinner: { recipeId: 'chicken-tagine', name: 'Saturday Celebration Tagine', emoji: '🏺' }, snack: { recipeId: 'pastilla', name: 'Bastilla (Sweet-Savory Pigeon Pie)', emoji: '🥧' } },
    { day: 'Sunday', breakfast: { recipeId: 'msemen', name: 'Sunday Msemen Brunch', emoji: '🫓' }, lunch: { recipeId: 'harira', name: 'Grand Harira Soup with Bread & Dates', emoji: '🍵' }, dinner: { recipeId: 'chicken-tagine', name: 'Sunday Family Tagine Feast', emoji: '🏺' } },
  ],
};

export const mealPlans = [
  sampleMealPlan,
  sampleMexicanPlan,
  sampleVietnamesePlan,
  samplePersianPlan,
  sampleIndianPlan,
  sampleSouthernPlan,
  sampleMediterraneanPlan,
  sampleJapanesePlan,
  sampleKoreanPlan,
  sampleWestAfricanPlan,
  sampleEthiopianPlan,
  sampleBrazilianPlan,
  sampleMoroccanPlan,
];

const groceryListFromPlan: GroceryItem[] = [
  { name: 'Chicken thighs', amount: '3 lbs', category: 'Protein', recipeIds: ['adobo'] },
  { name: 'Soy sauce', amount: '1 bottle', category: 'Pantry', recipeIds: ['adobo'] },
  { name: 'White vinegar', amount: '1 bottle', category: 'Pantry', recipeIds: ['adobo'] },
  { name: 'Garlic', amount: '2 heads', category: 'Produce', recipeIds: ['adobo', 'sinigang'] },
  { name: 'Jasmine rice', amount: '5 lbs', category: 'Pantry', recipeIds: ['adobo', 'sinigang'] },
  { name: 'Pork ribs', amount: '2 lbs', category: 'Protein', recipeIds: ['sinigang'] },
  { name: 'Tamarind paste', amount: '1 package', category: 'Pantry', recipeIds: ['sinigang'] },
  { name: 'Bok choy', amount: '1 bunch', category: 'Produce', recipeIds: ['sinigang'] },
  { name: 'Tomatoes', amount: '4', category: 'Produce', recipeIds: ['sinigang'] },
];

export function generateGroceryList(): GroceryItem[] {
  return groceryListFromPlan;
}
