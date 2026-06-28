import type { Culture } from './types';

export const cultures: Culture[] = [
  {
    id: 'filipino',
    name: 'Filipino',
    emoji: '🇵🇭',
    tagline: 'The hearty, sour, and savory soul of Southeast Asia',
    description:
      'Filipino cuisine is a vibrant blend of Malay, Chinese, Spanish, and American influences, shaped by over 7,000 islands and centuries of trade. It celebrates bold contrasts — sour and salty, sweet and savory — with fermented ingredients, vinegar-braises, and tropical fruits at its core.',
    region: 'Southeast Asia',
    country: 'Philippines',
    commonIngredients: [
      'Vinegar', 'Soy sauce', 'Garlic', 'Pork belly', 'Fish sauce (patis)',
      'Calamansi lime', 'Coconut milk', 'Tamarind', 'Banana blossom', 'Bagoong (shrimp paste)',
      'Lemongrass', 'Annatto seeds', 'Longanisa', 'Rice', 'Palm sugar',
    ],
    recipeIds: ['adobo', 'sinigang', 'pancit'],
    geographyNotes:
      'The Philippines is an archipelago of 7,641 islands in Southeast Asia, bordered by the South China Sea to the west, the Philippine Sea to the east, and the Celebes Sea to the south. The country sits along the Pacific Ring of Fire.',
    foodHistory:
      'Pre-colonial Filipino cuisine centered on rice, seafood, and tropical produce. Spanish colonization (1565–1898) introduced tomatoes, corn, chiles, and stewing techniques. Chinese traders brought noodles, tofu, and soy sauce. American influence added canned goods and fast food culture. Today, Filipino cuisine is experiencing a global renaissance led by chefs celebrating ancestral ingredients.',
    nutritionThemes: [
      'High in protein from fish, pork, and chicken',
      'Rich in probiotics from fermented ingredients',
      'Abundant tropical fruit antioxidants',
      'Complex carbohydrates from rice',
      'Heart-healthy coconut',
    ],
    primaryColor: '#D4393B',
    accentColor: '#FCD116',
    bgGradient: 'from-red-50 to-yellow-50',
    mapFact: 'The Philippines spans over 300,000 km² and has more than 175 spoken languages.',
    languages: ['Filipino (Tagalog)', 'English', 'Cebuano', 'Ilocano'],
    population: '115 million',
  },
  {
    id: 'mexican',
    name: 'Mexican',
    emoji: '🇲🇽',
    tagline: 'Ancient corn civilizations meet Spanish fire and flavor',
    description:
      'Mexican cuisine — a UNESCO Intangible Cultural Heritage — is one of the world\'s most complex culinary traditions. Built on the "Three Sisters" of corn, beans, and squash, it layers indigenous Aztec and Maya traditions with Spanish, Caribbean, and African influences into layers of chile-spiced, slow-cooked brilliance.',
    region: 'North America / Mesoamerica',
    country: 'Mexico',
    commonIngredients: [
      'Corn (masa, tortillas)', 'Dried chile peppers', 'Tomatoes & tomatillos', 'Avocado',
      'Black beans & pinto beans', 'Cilantro', 'Lime', 'Cumin', 'Epazote', 'Mexican oregano',
      'Chocolate (cacao)', 'Pumpkin seeds (pepitas)', 'Chayote', 'Nopales (cactus)', 'Queso fresco',
    ],
    recipeIds: ['tamales', 'mole', 'horchata'],
    geographyNotes:
      'Mexico sits in North America, bordered by the US to the north, the Pacific Ocean to the west, and the Gulf of Mexico and Caribbean Sea to the east. It spans diverse biomes from desert highlands to tropical coasts.',
    foodHistory:
      'Mexican food traces back 9,000 years to ancient Mesoamerican civilizations who domesticated corn. The Aztec empire cultivated cacao, vanilla, and tomatoes unknown to the rest of the world. Spanish conquistadors (1519) merged these with Mediterranean ingredients, creating "mestizo" cuisine. Each of Mexico\'s 32 states has distinct culinary traditions.',
    nutritionThemes: [
      'Complete protein from corn + beans combination',
      'Lycopene-rich tomatoes and tomatillos',
      'Monounsaturated fats from avocado',
      'Antioxidants from dark chocolate and chiles',
      'High fiber from legumes and vegetables',
    ],
    primaryColor: '#006847',
    accentColor: '#CE1126',
    bgGradient: 'from-green-50 to-red-50',
    mapFact: 'Mexico is the 13th largest country by area and home to 68 recognized indigenous languages.',
    languages: ['Spanish', 'Nahuatl', 'Yucatec Maya', 'Zapotec'],
    population: '130 million',
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    emoji: '🇻🇳',
    tagline: 'Fresh herbs, bright broths, and the art of balance',
    description:
      'Vietnamese cuisine is celebrated for its delicate balance of five fundamental tastes: spicy, sour, bitter, salty, and sweet. It emphasizes fresh herbs, minimal oil, and pure flavors. The long, narrow country\'s geography creates three distinct regional cuisines — northern, central, and southern — each with its own character.',
    region: 'Southeast Asia',
    country: 'Vietnam',
    commonIngredients: [
      'Rice noodles (pho, bun)', 'Fish sauce (nuoc mam)', 'Lemongrass', 'Fresh mint & basil',
      'Bean sprouts', 'Lime', 'Star anise', 'Cinnamon', 'Ginger', 'Shallots',
      'Hoisin sauce', 'Sriracha', 'Shrimp paste', 'Jasmine rice', 'Pork belly',
    ],
    recipeIds: ['pho', 'spring-rolls', 'bun-cha'],
    geographyNotes:
      'Vietnam stretches 1,650 km along the eastern edge of the Indochina Peninsula, bordered by China, Laos, Cambodia, and the South China Sea. Its S-shaped coastline and diverse terrain — from the Red River Delta to the Mekong Delta — shapes regional cuisines.',
    foodHistory:
      'Vietnamese cuisine developed over 4,000 years, strongly influenced by Chinese rule (111 BCE–938 CE), which introduced chopsticks, woks, and soy-based sauces. French colonization (1887–1954) added baguettes, pâté, and coffee culture, visible in bánh mì sandwiches. The Vietnamese concept of yin-yang balance in food — cooling and heating ingredients — remains central today.',
    nutritionThemes: [
      'High in fresh vegetables and herbs',
      'Lean protein from seafood and pork',
      'Probiotic-rich fermented ingredients',
      'Low fat cooking methods (steaming, boiling)',
      'Collagen-rich bone broths',
    ],
    primaryColor: '#DA251D',
    accentColor: '#FFCD00',
    bgGradient: 'from-red-50 to-amber-50',
    mapFact: 'Vietnam has over 3,200 km of coastline and is one of the world\'s top rice exporters.',
    languages: ['Vietnamese', 'Khmer', 'Cham', 'Muong'],
    population: '98 million',
  },
  {
    id: 'persian',
    name: 'Persian',
    emoji: '🇮🇷',
    tagline: 'Saffron-gilded poetry on a plate from ancient Persia',
    description:
      'Persian cuisine is one of the world\'s oldest and most sophisticated culinary traditions, dating back 2,500 years to the Achaemenid Empire. It is defined by the artful use of dried fruits, nuts, fragrant rice, and precious spices like saffron, combining sweet and sour notes with incredible complexity and elegance.',
    region: 'Middle East / Central Asia',
    country: 'Iran',
    commonIngredients: [
      'Saffron', 'Rose water', 'Barberries (zereshk)', 'Dried limes (limu omani)',
      'Walnuts', 'Pomegranate molasses', 'Fresh dill, parsley, cilantro, fenugreek',
      'Lamb', 'Long-grain basmati rice', 'Split chickpeas', 'Kashk (whey)',
      'Turmeric', 'Dried apricots', 'Chickpeas', 'Ghee',
    ],
    recipeIds: ['ghormeh-sabzi', 'fesenjan', 'tahdig'],
    geographyNotes:
      'Iran (ancient Persia) spans 1.6 million km² in the Middle East, bordered by Turkey, Iraq, the Caspian Sea, Russia, Turkmenistan, Afghanistan, and Pakistan. Its central plateau, mountain ranges, and diverse climate zones allow extraordinary agricultural diversity.',
    foodHistory:
      'Persian food culture stretches back to the Achaemenid Empire (550–330 BCE), when Persia was the world\'s largest empire. Persian food spread through Silk Road trade routes to influence Indian Mughal cuisine, Ottoman Turkish cooking, and Arab traditions. The concept of the Persian "sofreh" (table spread) as an act of hospitality and generosity remains central to the culture.',
    nutritionThemes: [
      'Rich in omega-3s from walnuts and fish',
      'Antioxidants from pomegranate and saffron',
      'Anti-inflammatory turmeric and herbs',
      'Plant-forward cooking with legumes',
      'Probiotic kashk and fermented dairy',
    ],
    primaryColor: '#239F40',
    accentColor: '#DA0000',
    bgGradient: 'from-green-50 to-rose-50',
    mapFact: 'Iran is home to one of the oldest civilizations on Earth, with settlements dating back 7,000+ years.',
    languages: ['Persian (Farsi)', 'Azerbaijani', 'Kurdish', 'Arabic'],
    population: '87 million',
  },
  {
    id: 'indian',
    name: 'Indian',
    emoji: '🇮🇳',
    tagline: 'A spice-trader\'s paradise with 5,000 years of flavor',
    description:
      'Indian cuisine is not one cuisine but a vast constellation of regional traditions spanning 28 states, shaped by geography, religion, season, and ancient Ayurvedic principles. From the buttery richness of Punjab to the coconut-laced curries of Kerala, the fiery street food of Mumbai to the delicate vegetarian thalis of Gujarat — India feeds the world\'s culinary imagination.',
    region: 'South Asia',
    country: 'India',
    commonIngredients: [
      'Turmeric', 'Cumin', 'Coriander', 'Cardamom', 'Garam masala', 'Mustard seeds',
      'Ghee', 'Paneer', 'Lentils (dal)', 'Basmati rice', 'Coconut milk', 'Tamarind',
      'Fenugreek seeds', 'Curry leaves', 'Hing (asafoetida)', 'Chana (chickpeas)',
    ],
    recipeIds: ['biryani', 'dal-tadka', 'kheer'],
    geographyNotes:
      'India is the 7th largest country, spanning from the Himalayas in the north to tropical coastlines in the south. The Gangetic Plain, Deccan Plateau, Thar Desert, and coastal regions each produce unique ingredients that define regional cuisines.',
    foodHistory:
      'Indian culinary history spans 5,000+ years, from Indus Valley civilization seeds to Vedic-era cooking texts. The Silk Road brought spices westward to Rome and Europe, making Indian spices the engine of world trade. Mughal emperors (1526–1857) created biryani and korma. British colonization (1858–1947) influenced tea culture. India\'s independence movement was even partly sparked by salt.',
    nutritionThemes: [
      'Complete protein from dal + rice or roti',
      'Anti-inflammatory spice compounds (curcumin)',
      'Probiotic-rich lassi, yogurt, and fermented dosas',
      'Fiber from legumes and vegetables',
      'Ayurvedic balance of six tastes',
    ],
    primaryColor: '#FF9933',
    accentColor: '#138808',
    bgGradient: 'from-orange-50 to-green-50',
    mapFact: 'India is home to over 22 official languages and more than 1,600 dialects.',
    languages: ['Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Urdu', 'English'],
    population: '1.4 billion',
  },
  {
    id: 'southern',
    name: 'Southern American',
    emoji: '🌽',
    tagline: 'Soul food, smoke, and the roots of American cooking',
    description:
      'Southern American cuisine is the deeply soulful cooking tradition born from the American South — a fusion of West African, Native American, and European culinary traditions forged through resilience and community. It\'s the food of barbecue pits, church potlucks, Sunday suppers, and front-porch storytelling, rich with history and love in every bite.',
    region: 'North America',
    country: 'United States (South)',
    commonIngredients: [
      'Cornmeal & grits', 'Collard greens', 'Black-eyed peas', 'Sweet potatoes', 'Okra',
      'Buttermilk', 'Lard & bacon fat', 'Smoked pork', 'Hot sauce', 'Molasses',
      'Peanuts', 'Peaches', 'Sorghum syrup', 'Cast iron cookware', 'Church lady seasoning',
    ],
    recipeIds: ['fried-chicken', 'shrimp-grits', 'peach-cobbler'],
    geographyNotes:
      'The American South encompasses states from Virginia to Texas, including the Mississippi River Delta, Appalachian Mountains, Gulf Coast, and Atlantic coastal lowlands. Each sub-region has distinct food traditions: Creole Louisiana, Appalachian cooking, Low Country South Carolina, and Texas BBQ.',
    foodHistory:
      'Southern food is inseparable from the history of African enslavement. Enslaved Africans brought okra, black-eyed peas, rice cultivation, and technique to American kitchens, yet were denied credit for centuries. Native Americans contributed corn, beans, squash, and game. West African, Scottish, Irish, and French settlers each added layers. Modern chefs are now rightfully centering Black Southern culinary heritage.',
    nutritionThemes: [
      'High fiber from beans, peas, and greens',
      'Potassium and vitamins from sweet potatoes',
      'Probiotic-rich fermented hot sauces',
      'Plant diversity in seasonal produce',
      'Iron from cast-iron cooking methods',
    ],
    primaryColor: '#8B4513',
    accentColor: '#DAA520',
    bgGradient: 'from-amber-50 to-orange-50',
    mapFact: 'The Mississippi Delta region is called the "cradle of American music and food culture."',
    languages: ['English', 'Gullah Geechee', 'Louisiana Creole'],
    population: '130 million (US South)',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    emoji: '🫒',
    tagline: 'Olive oil, sunshine, and the world\'s healthiest diet',
    description:
      'Mediterranean cuisine encompasses the cooking traditions of countries bordering the Mediterranean Sea — Greece, Italy, Spain, Morocco, Lebanon, Turkey, and more. United by olive oil, fresh vegetables, legumes, whole grains, seafood, and wine, it is consistently ranked the world\'s healthiest dietary pattern and a UNESCO cultural heritage.',
    region: 'Europe / Middle East / North Africa',
    country: 'Multiple (Greece, Italy, Spain, Lebanon, Morocco)',
    commonIngredients: [
      'Extra-virgin olive oil', 'Kalamata olives', 'Feta & halloumi cheese', 'Tomatoes',
      'Eggplant (aubergine)', 'Lamb', 'Chickpeas', 'Tahini', 'Lemon', 'Oregano & thyme',
      'Za\'atar', 'Grape leaves', 'Pomegranate', 'Capers', 'Pine nuts',
    ],
    recipeIds: ['greek-salad', 'hummus', 'moussaka'],
    geographyNotes:
      'The Mediterranean Sea is bordered by 21 countries across three continents. The climate — hot, dry summers and mild, wet winters — is perfect for olive trees, grapes, wheat, and citrus. The sea itself provides abundant seafood central to the regional diet.',
    foodHistory:
      'Mediterranean food traces back to ancient Greek and Roman civilizations, which spread olive cultivation, wine production, and bread-making across Europe. The Ottoman Empire unified many of these traditions across Turkey, the Middle East, and North Africa. The Mediterranean Diet was formalized by nutritionist Ancel Keys in the 1960s after he observed lower heart disease rates in Mediterranean populations.',
    nutritionThemes: [
      'Heart-healthy monounsaturated fats from olive oil',
      'Anti-inflammatory polyphenols in olives and wine',
      'Omega-3 fatty acids from fresh fish',
      'High fiber from legumes and whole grains',
      'Antioxidant-rich vegetables and herbs',
    ],
    primaryColor: '#1E6FBF',
    accentColor: '#C0A060',
    bgGradient: 'from-blue-50 to-amber-50',
    mapFact: 'The Mediterranean Sea covers 2.5 million km² and has been a center of world trade for 5,000 years.',
    languages: ['Greek', 'Italian', 'Spanish', 'Arabic', 'Turkish', 'French', 'Hebrew'],
    population: '500 million (Mediterranean basin)',
  },
];

export function getCultureById(id: string): Culture | undefined {
  return cultures.find((c) => c.id === id);
}
