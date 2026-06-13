export type ChoreFrequency = "daily" | "weekly" | "monthly" | "seasonal";
export type ChoreArea = "kitchen" | "living-room" | "bedroom" | "bathroom" | "outdoor" | "laundry" | "general";

export interface Chore {
  id: string;
  title: string;
  assignee: string;
  frequency: ChoreFrequency;
  area: ChoreArea;
  completed: boolean;
  notes?: string;
}

export interface DayMeals {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

export interface RhythmItem {
  time?: string;
  label: string;
  emoji?: string;
  homeschoolOnly?: boolean;
}

export interface RhythmBlock {
  id: string;
  name: string;
  emoji: string;
  accentColor: string;
  items: RhythmItem[];
}

export interface ResetTask {
  id: string;
  category: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedMinutes?: number;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  done: boolean;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  area: string;
  frequency: string;
  nextDue: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  notes?: string;
}

export interface SeasonalItem {
  id: string;
  title: string;
  category: string;
  date?: string;
  completed: boolean;
}

export interface BudgetCategory {
  id: string;
  name: string;
  emoji: string;
  budgeted: number;
  spent: number;
}

export const CHORE_AREAS: ChoreArea[] = ["kitchen","living-room","bedroom","bathroom","outdoor","laundry","general"];
export const CHORE_FREQUENCIES: ChoreFrequency[] = ["daily","weekly","monthly","seasonal"];

// ── Home-as-a-Business role system ──────────────────────────────────────────

export type RoleTier = "c-suite" | "director" | "manager" | "team-lead" | "associate" | "trainee";
export type Department = "kitchen" | "facilities" | "logistics" | "grounds" | "admin";

export interface HomeRole {
  title: string;
  emoji: string;
  tier: RoleTier;
  department: Department;
  chores: string[];   // recommended chore titles for this role
  perks: string;      // fun business perk line
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number | null;   // null = adult
  isAdult: boolean;
  currentRole?: HomeRole;
}

export const DEPARTMENTS: Record<Department, { label: string; emoji: string; description: string; color: string }> = {
  kitchen:    { label: "Kitchen Ops",   emoji: "🍳", description: "Meals, dishes, food prep & grocery",    color: "var(--color-terracotta)" },
  facilities: { label: "Facilities",    emoji: "🧹", description: "Cleaning, tidying, bathroom & surfaces", color: "var(--color-sage)" },
  logistics:  { label: "Logistics",     emoji: "📦", description: "Laundry, errands, organization & storage",color: "var(--color-ochre)" },
  grounds:    { label: "Grounds & Care",emoji: "🌿", description: "Outdoor, plants, pets & yard",           color: "#5A7A4A" },
  admin:      { label: "Admin & Finance",emoji: "📋", description: "Scheduling, budget, planning & comms",  color: "var(--color-forest)" },
};

// Age → tier
export function ageTier(age: number | null, isAdult: boolean): RoleTier {
  if (isAdult || age === null || age >= 18) return "c-suite";
  if (age >= 14) return "director";
  if (age >= 11) return "manager";
  if (age >= 8)  return "team-lead";
  if (age >= 5)  return "associate";
  return "trainee";
}

// Tier → title options per department
const ROLE_TITLES: Record<RoleTier, Record<Department, string>> = {
  "c-suite":   { kitchen: "Chief Culinary Officer", facilities: "Chief Home Officer",   logistics: "Chief Operations Officer", grounds: "Chief Grounds Officer",  admin: "Chief Executive Officer" },
  "director":  { kitchen: "Director of Dining",      facilities: "Director of Facilities",logistics: "Director of Logistics",    grounds: "Director of Grounds",    admin: "Director of Operations" },
  "manager":   { kitchen: "Kitchen Manager",         facilities: "Facilities Manager",   logistics: "Logistics Manager",         grounds: "Grounds Manager",        admin: "Operations Manager" },
  "team-lead": { kitchen: "Kitchen Team Lead",       facilities: "Clean Team Lead",      logistics: "Laundry Team Lead",         grounds: "Yard Team Lead",         admin: "Planning Lead" },
  "associate": { kitchen: "Kitchen Associate",       facilities: "Tidy Associate",       logistics: "Sort & Store Associate",    grounds: "Garden Associate",       admin: "Jr. Admin Associate" },
  "trainee":   { kitchen: "Kitchen Trainee",         facilities: "Tidy Trainee",         logistics: "Errand Trainee",            grounds: "Grounds Trainee",        admin: "Learning Trainee" },
};

// Chores by tier + department
const ROLE_CHORES: Record<RoleTier, Record<Department, string[]>> = {
  "c-suite":   {
    kitchen:    ["Plan weekly meals","Grocery run","Cook 2–3 dinners","Manage pantry inventory"],
    facilities: ["Deep clean bathrooms (weekly)","Organize closets","Coordinate home projects"],
    logistics:  ["Manage all laundry cycles","Schedule maintenance","Run errands"],
    grounds:    ["Seasonal garden planning","Lawn mowing","Oversee pet care"],
    admin:      ["Weekly budget review","Manage family calendar","Lead family meetings"],
  },
  "director": {
    kitchen:    ["Cook 1 dinner/week","Load & unload dishwasher","Wipe counters after meals"],
    facilities: ["Vacuum living room & bedrooms","Clean bathroom sink & toilet","Mop kitchen"],
    logistics:  ["Do own laundry start to finish","Help with grocery unloading","Organize shared spaces"],
    grounds:    ["Water all plants","Sweep patio & porch","Help with yardwork"],
    admin:      ["Keep shared family calendar updated","Help plan weekend activities"],
  },
  "manager": {
    kitchen:    ["Clear & wipe table after every meal","Help with simple meal prep","Unload dishwasher"],
    facilities: ["Vacuum assigned rooms","Clean bathroom sink","Tidy living room daily"],
    logistics:  ["Fold & put away laundry","Sort recycling","Organize backpacks & gear"],
    grounds:    ["Water indoor plants","Pick up yard","Sweep front porch"],
    admin:      ["Track weekly reading & school tasks","Help with errand lists"],
  },
  "team-lead": {
    kitchen:    ["Set & clear the table","Rinse & stack dishes","Help prepare simple breakfasts"],
    facilities: ["Make bed daily","Tidy own bedroom","Wipe bathroom mirror"],
    logistics:  ["Sort laundry by color","Match & fold socks","Put away clean clothes"],
    grounds:    ["Water specific plants","Pick up toys from yard","Help with garden watering"],
    admin:      ["Pack own school bag","Track homework with parent help"],
  },
  "associate": {
    kitchen:    ["Carry own dishes to sink","Help set the table (napkins, cups)","Wipe spills"],
    facilities: ["Put toys in bins","Push in chairs","Straighten pillows on sofa"],
    logistics:  ["Carry small groceries inside","Put shoes away","Hang up backpack"],
    grounds:    ["Water small plants with small can","Pick up sticks in yard"],
    admin:      ["Put library books away","Help sort mail into piles"],
  },
  "trainee": {
    kitchen:    ["Carry napkins to the table","Throw away own wrappers","Help wipe with a cloth"],
    facilities: ["Put one toy away at a time","Help fluff pillows"],
    logistics:  ["Carry one small item inside","Put shoes on shoe rack"],
    grounds:    ["Water one plant with parent","Pick up one thing from yard"],
    admin:      ["Bring parent one item when asked"],
  },
};

const ROLE_PERKS: Record<RoleTier, string> = {
  "c-suite":   "Corner office (the whole house). Unlimited coffee.",
  "director":  "Flexible hours and a say in family decisions.",
  "manager":   "Extra screen time for hitting weekly KPIs.",
  "team-lead": "Gets to assign tasks to trainees.",
  "associate": "Earns stars toward a special activity.",
  "trainee":   "Completes tasks = gets a high-five from the CEO.",
};

// Departments that rotate for each tier
const ROTATION_CYCLE: Record<RoleTier, Department[]> = {
  "c-suite":   ["kitchen","facilities","logistics","grounds","admin"],
  "director":  ["kitchen","facilities","logistics","grounds"],
  "manager":   ["kitchen","facilities","logistics","grounds"],
  "team-lead": ["kitchen","facilities","logistics","grounds"],
  "associate": ["kitchen","facilities","logistics","grounds"],
  "trainee":   ["kitchen","facilities","logistics","grounds"],
};

export function assignRole(member: FamilyMember, rotationWeek: number): HomeRole {
  const tier = ageTier(member.age, member.isAdult);
  const cycle = ROTATION_CYCLE[tier];
  const dept: Department = cycle[rotationWeek % cycle.length];
  return {
    title:  ROLE_TITLES[tier][dept],
    emoji:  DEPARTMENTS[dept].emoji,
    tier,
    department: dept,
    chores: ROLE_CHORES[tier][dept],
    perks:  ROLE_PERKS[tier],
  };
}

export const TIER_BADGE: Record<RoleTier, { label: string; color: string; bg: string }> = {
  "c-suite":   { label: "C-Suite",   color: "var(--color-forest)",     bg: "color-mix(in srgb, var(--color-forest) 10%, transparent)" },
  "director":  { label: "Director",  color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)" },
  "manager":   { label: "Manager",   color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 12%, transparent)" },
  "team-lead": { label: "Team Lead", color: "var(--color-sage)",       bg: "color-mix(in srgb, var(--color-sage) 14%, transparent)" },
  "associate": { label: "Associate", color: "#7B6EA0",                 bg: "color-mix(in srgb, #7B6EA0 10%, transparent)" },
  "trainee":   { label: "Trainee",   color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)", bg: "color-mix(in srgb, var(--color-charcoal) 6%, transparent)" },
};

export const CHORE_AGE_SUGGESTIONS = [
  { ageRange: "2–3 years",  tasks: ["Put toys in a bin","Wipe up small spills","Help carry groceries","Put books back on shelf"] },
  { ageRange: "4–5 years",  tasks: ["Clear own dishes","Wipe table after meals","Sort laundry by color","Water small plants","Make their bed (loosely)","Feed pets with help"] },
  { ageRange: "6–8 years",  tasks: ["Load dishwasher","Vacuum a room","Fold towels","Set and clear table","Sweep floor","Pack own bag"] },
  { ageRange: "9–12 years", tasks: ["Cook simple meals","Do own laundry","Clean bathroom","Mow lawn with supervision","Wash dishes","Grocery shop with list"] },
];

export const DEFAULT_MEALS: DayMeals[] = [
  { day: "Sunday",    breakfast: "Pancakes + fresh fruit",       lunch: "Leftovers + salad",             dinner: "Slow cooker chicken tacos",         snack: "Apple slices + peanut butter" },
  { day: "Monday",    breakfast: "Scrambled eggs, toast, fruit", lunch: "Quesadillas + cucumber slices", dinner: "Chicken rice bowls",                snack: "Yogurt + berries" },
  { day: "Tuesday",   breakfast: "Oatmeal + banana",             lunch: "PB&J + carrot sticks",          dinner: "One-pot pasta with vegetables",     snack: "Cheese + crackers" },
  { day: "Wednesday", breakfast: "Egg muffins (batch-cooked)",   lunch: "Bean quesadillas + salsa",      dinner: "Baked chicken thighs + roasted veg",snack: "Fruit salad" },
  { day: "Thursday",  breakfast: "Overnight oats + berries",     lunch: "Grilled cheese + tomato soup",  dinner: "Beef and veggie stir fry + rice",   snack: "Hummus + veggies" },
  { day: "Friday",    breakfast: "Cereal + milk + fruit",        lunch: "Leftover rice bowls",           dinner: "Homemade pizza night",              snack: "Popcorn + apple" },
  { day: "Saturday",  breakfast: "Big family breakfast — waffles",lunch: "Sandwiches + soup",            dinner: "BBQ chicken + corn + coleslaw",    snack: "Smoothie" },
];

export const DEFAULT_GROCERY: GroceryItem[] = [
  { id: "g1",  name: "Chicken thighs (family pack)", category: "Protein",  checked: false },
  { id: "g2",  name: "Eggs (2 dozen)",               category: "Protein",  checked: false },
  { id: "g3",  name: "Cheddar cheese (block)",       category: "Dairy",    checked: false },
  { id: "g4",  name: "Greek yogurt (large)",         category: "Dairy",    checked: false },
  { id: "g5",  name: "Bananas",                      category: "Produce",  checked: false },
  { id: "g6",  name: "Apples (bag)",                 category: "Produce",  checked: false },
  { id: "g7",  name: "Baby carrots",                 category: "Produce",  checked: false },
  { id: "g8",  name: "Jasmine rice (5 lb bag)",      category: "Pantry",   checked: false },
  { id: "g9",  name: "Pasta (2 boxes)",              category: "Pantry",   checked: false },
  { id: "g10", name: "Black beans (canned x3)",      category: "Pantry",   checked: false },
  { id: "g11", name: "Whole wheat tortillas",        category: "Bread",    checked: false },
  { id: "g12", name: "Peanut butter",                category: "Pantry",   checked: false },
];

export const DEFAULT_RHYTHMS: RhythmBlock[] = [
  {
    id: "morning", name: "Morning", emoji: "🌅", accentColor: "var(--color-ochre)",
    items: [
      { time: "7:00",  label: "Wake up, make bed",          emoji: "☀️" },
      { time: "7:15",  label: "Breakfast together",          emoji: "🍳" },
      { time: "7:45",  label: "Get dressed and ready",       emoji: "👗" },
      { time: "8:15",  label: "Morning basket / devotional", emoji: "📖", homeschoolOnly: true },
      { time: "8:30",  label: "Outdoor time / nature walk",  emoji: "🌿" },
      { time: "9:00",  label: "Main lesson block",           emoji: "✏️", homeschoolOnly: true },
    ],
  },
  {
    id: "afternoon", name: "Afternoon", emoji: "🌤", accentColor: "var(--color-sage)",
    items: [
      { time: "12:00", label: "Lunch",                           emoji: "🥗" },
      { time: "12:30", label: "Quiet time / rest",               emoji: "💤" },
      { time: "1:30",  label: "Free project or creative play",   emoji: "🎨" },
      { time: "2:30",  label: "Afternoon snack",                 emoji: "🍎" },
      { time: "3:00",  label: "Errands or appointments",         emoji: "🚗" },
    ],
  },
  {
    id: "evening", name: "Evening", emoji: "🌙", accentColor: "var(--color-forest)",
    items: [
      { time: "5:30",  label: "Start dinner",                emoji: "🍽" },
      { time: "6:00",  label: "Family dinner together",       emoji: "👪" },
      { time: "6:30",  label: "Family 10-min pickup",         emoji: "🧹" },
      { time: "6:45",  label: "Baths and showers",            emoji: "🛁" },
      { time: "7:15",  label: "Books and read-aloud",         emoji: "📚" },
      { time: "7:45",  label: "Lights out (little ones)",     emoji: "🌛" },
    ],
  },
];

export const DEFAULT_RESET_TASKS: ResetTask[] = [
  { id: "r1",  category: "Home",     title: "Family 20-minute pickup",    description: "Everyone picks up their spaces together",  completed: false, estimatedMinutes: 20 },
  { id: "r2",  category: "Laundry",  title: "Start a load of laundry",    description: "Wash, dry, fold, and put away",            completed: false, estimatedMinutes: 90 },
  { id: "r3",  category: "Laundry",  title: "Put away all clean laundry", description: "Clear the laundry pile",                   completed: false, estimatedMinutes: 20 },
  { id: "r4",  category: "Meals",    title: "Plan next week meals",        description: "Decide on 5–7 dinners, check the pantry", completed: false, estimatedMinutes: 15 },
  { id: "r5",  category: "Meals",    title: "Write grocery list",          description: "Based on meal plan and pantry gaps",       completed: false, estimatedMinutes: 10 },
  { id: "r6",  category: "Meals",    title: "Do the grocery run",          description: "Or order for pickup/delivery",             completed: false, estimatedMinutes: 45 },
  { id: "r7",  category: "Calendar", title: "Review next week calendar",   description: "Check appointments, plan childcare needs", completed: false, estimatedMinutes: 10 },
  { id: "r8",  category: "Budget",   title: "Quick budget check-in",       description: "Review spending from the past week",       completed: false, estimatedMinutes: 10 },
  { id: "r9",  category: "Family",   title: "Prep family meeting agenda",  description: "Wins, challenges, needs, upcoming events", completed: false, estimatedMinutes: 5  },
];

export const DEFAULT_MAINTENANCE: MaintenanceTask[] = [
  { id: "m1",  title: "Replace HVAC air filter",      area: "HVAC",     frequency: "monthly",   nextDue: "2026-06-01", priority: "high",   completed: false },
  { id: "m2",  title: "Test smoke & CO detectors",    area: "Safety",   frequency: "quarterly", nextDue: "2026-06-01", priority: "high",   completed: false },
  { id: "m3",  title: "Clean dryer vent",             area: "Laundry",  frequency: "bi-annual", nextDue: "2026-06-01", priority: "high",   completed: false },
  { id: "m4",  title: "Flush water heater sediment",  area: "Plumbing", frequency: "annual",    nextDue: "2026-09-01", priority: "medium", completed: false },
  { id: "m5",  title: "Clean gutters",                area: "Exterior", frequency: "bi-annual", nextDue: "2026-05-01", priority: "medium", completed: false },
  { id: "m6",  title: "Check caulking around windows",area: "Exterior", frequency: "annual",    nextDue: "2026-10-01", priority: "low",    completed: false },
  { id: "m7",  title: "Pest inspection",              area: "General",  frequency: "annual",    nextDue: "2026-05-01", priority: "medium", completed: false },
  { id: "m8",  title: "Deep clean oven",              area: "Kitchen",  frequency: "quarterly", nextDue: "2026-06-01", priority: "low",    completed: false },
];

export const DEFAULT_SEASONAL: SeasonalItem[] = [
  { id: "s1", title: "Summer reading program sign-up", category: "school",   date: "2026-06-10", completed: false },
  { id: "s2", title: "Fourth of July celebration",     category: "holiday",  date: "2026-07-04", completed: false },
  { id: "s3", title: "Summer travel planning",         category: "travel",   completed: false },
  { id: "s4", title: "Back-to-school prep",            category: "school",   date: "2026-08-15", completed: false },
  { id: "s5", title: "Summer deep clean",              category: "cleaning", completed: false },
  { id: "s6", title: "Declutter + donate (biannual)",  category: "cleaning", completed: false },
  { id: "s7", title: "Garden prep and planting",       category: "garden",   date: "2026-06-15", completed: false },
  { id: "s8", title: "Review summer budget",           category: "budget",   completed: false },
];

export const SEASONAL_CATEGORY_CONFIG: Record<string, { emoji: string }> = {
  holiday:  { emoji: "🎉" },
  birthday: { emoji: "🎂" },
  travel:   { emoji: "✈️" },
  school:   { emoji: "📚" },
  cleaning: { emoji: "🧹" },
  budget:   { emoji: "💰" },
  garden:   { emoji: "🌱" },
  general:  { emoji: "📋" },
};

export const DEFAULT_BUDGET: BudgetCategory[] = [
  { id: "b1", name: "Groceries",       emoji: "🛒", budgeted: 700,  spent: 580  },
  { id: "b2", name: "Dining Out",      emoji: "🍕", budgeted: 150,  spent: 200  },
  { id: "b3", name: "Gas & Transport", emoji: "⛽", budgeted: 200,  spent: 145  },
  { id: "b4", name: "Kids Activities", emoji: "🎨", budgeted: 100,  spent: 65   },
  { id: "b5", name: "Home & Supplies", emoji: "🏠", budgeted: 200,  spent: 230  },
  { id: "b6", name: "Subscriptions",   emoji: "📱", budgeted: 80,   spent: 74   },
  { id: "b7", name: "Emergency Fund",  emoji: "🛡️", budgeted: 300,  spent: 300  },
  { id: "b8", name: "Fun & Family",    emoji: "✨", budgeted: 150,  spent: 90   },
];

export const BUDGET_ROUTINES = [
  { title: "Sunday meal plan",           description: "Plan the week before shopping to cut food waste by 30%",           frequency: "Weekly",  impact: "Saves ~$80/mo" },
  { title: "Shop with a list",           description: "Never enter a store without a written list tied to your meal plan", frequency: "Weekly",  impact: "Saves ~$50/mo" },
  { title: "Monthly subscription audit", description: "Review every auto-charge and cancel anything unused",              frequency: "Monthly", impact: "Saves ~$30–100/mo" },
  { title: "Weekly spending check-in",   description: "10 minutes every Sunday to review the week and adjust",            frequency: "Weekly",  impact: "Builds awareness" },
  { title: "Batch cook Sunday",          description: "Prep 2–3 proteins and grains to simplify the week",               frequency: "Weekly",  impact: "Saves ~$60/mo" },
];
