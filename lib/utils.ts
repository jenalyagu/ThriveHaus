import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getAgeLabel(age: number): string {
  if (age < 2) return 'Baby'
  if (age < 5) return 'Toddler'
  if (age < 8) return 'Early Childhood'
  if (age < 13) return 'Middle Childhood'
  return 'Teen'
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const WORK_SCHEDULES = [
  { value: 'full-time', label: 'Full-time (in office)' },
  { value: 'full-time-remote', label: 'Full-time (remote)' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'stay-at-home', label: 'Stay-at-home' },
  { value: 'entrepreneur', label: 'Entrepreneur / Self-employed' },
  { value: 'shift-work', label: 'Shift work' },
  { value: 'flexible', label: 'Flexible schedule' },
]

export const PERSONALITY_TRAITS = [
  'Adventurous', 'Artistic', 'Athletic', 'Bookworm', 'Caring',
  'Competitive', 'Creative', 'Curious', 'Empathetic', 'Energetic',
  'Funny', 'Independent', 'Kind', 'Leader', 'Methodical',
  'Outdoorsy', 'Quiet', 'Social', 'Sensitive', 'Tech-savvy',
]

export const LEARNING_STYLES = [
  { value: 'visual', label: 'Visual (learns by seeing)' },
  { value: 'auditory', label: 'Auditory (learns by hearing)' },
  { value: 'kinesthetic', label: 'Kinesthetic (learns by doing)' },
  { value: 'reading-writing', label: 'Reading/Writing' },
  { value: 'mixed', label: 'Mixed / Not sure' },
]

export const FAMILY_GOALS = [
  'Improve communication', 'Build stronger routines', 'Reduce screen time',
  'Increase family bonding time', 'Support academic success', 'Prioritize health & fitness',
  'Develop financial literacy', 'Foster creativity', 'Build resilience',
  'Create more calm in the home', 'Better work-life balance', 'Travel more together',
]

export const CHALLENGES = [
  'Morning chaos', 'Homework battles', 'Bedtime struggles', 'Too much screen time',
  'Sibling conflict', 'Emotional outbursts', 'Lack of quality time', 'Communication breakdowns',
  'Work-life balance', 'Financial stress', 'Health challenges', 'Organizational overwhelm',
]
