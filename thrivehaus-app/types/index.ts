export interface IntakeData {
  // Parent info
  firstName: string;
  lastName: string;
  partnerFirstName?: string;
  partnerLastName?: string;
  hasPartner: boolean;
  familyName: string;
  zipCode: string;
  state: string;

  // Children
  children: {
    firstName: string;
    age: number | null;
    stage: string;
    needs: string[];
  }[];

  // Support needs
  topChallenges: string[];
  supportStyle: string;
  workSchedule: string;
  partnerWorkSchedule?: string;

  // Goals
  primaryGoal: string;
  timeframe: string;

  // Home & Life (step 5)
  homeschooling: boolean;
  familyValues: string[];
  mealPreferences: string[];
  budgetPriority: string;
  extendedSupport: string;
  housingType: string;
}

export interface BlueprintContent {
  summary: string;
  pillars: {
    title: string;
    description: string;
    actions: string[];
  }[];
  weeklyRhythm: {
    day: string;
    focus: string;
    tasks: string[];
  }[];
  mealApproach?: {
    philosophy: string;
    weeklyAnchor: string;
    quickWins: string[];
  };
  villageStrategy?: {
    currentGap: string;
    immediateActions: string[];
    longerTerm: string;
  };
  resources: {
    category: string;
    items: { name: string; description: string }[];
  }[];
  affirmation: string;
}
