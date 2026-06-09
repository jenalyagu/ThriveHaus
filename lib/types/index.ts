export interface Family {
  id: string
  name: string
  created_by: string
  family_motto?: string
  timezone: string
  intake_completed: boolean
  created_at: string
  updated_at: string
}

export interface Parent {
  id: string
  family_id: string
  user_id?: string
  full_name: string
  role: string
  email?: string
  work_schedule?: string
  strengths: string[]
  notes?: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface Child {
  id: string
  family_id: string
  full_name: string
  age?: number
  grade?: string
  interests: string[]
  challenges: string[]
  personality_traits: string[]
  learning_style?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface BlueprintContent {
  overview: string
  familyStrengths: string[]
  growthAreas: string[]
  morningRoutine: RoutineItem[]
  eveningRoutine: RoutineItem[]
  weeklyRhythm: WeeklyRhythmItem[]
  childInsights: ChildInsight[]
  parentingTips: string[]
  thirtyDayFocus: string
  affirmation: string
}

export interface RoutineItem {
  time: string
  activity: string
  tip?: string
}

export interface WeeklyRhythmItem {
  day: string
  theme: string
  activities: string[]
}

export interface ChildInsight {
  name: string
  strengths: string[]
  suggestions: string[]
  connectionIdea: string
}

export interface Blueprint {
  id: string
  family_id: string
  content: BlueprintContent
  version: number
  is_active: boolean
  generated_at: string
  created_at: string
}

export interface IntakeFormData {
  familyName: string
  familyMotto?: string
  parents: {
    full_name: string
    role: string
    work_schedule: string
    strengths: string[]
    notes?: string
  }[]
  children: {
    full_name: string
    age: number
    grade: string
    interests: string[]
    challenges: string[]
    personality_traits: string[]
    learning_style: string
    notes?: string
  }[]
  familyGoals: string[]
  biggestChallenges: string[]
  currentWins: string[]
}
