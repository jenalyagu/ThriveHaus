import { getOpenAIClient } from './client'
import type { IntakeFormData, BlueprintContent } from '@/lib/types'

export async function generateFamilyBlueprint(
  intakeData: IntakeFormData
): Promise<BlueprintContent> {
  const childrenSummary = intakeData.children
    .map(
      (c) =>
        `- ${c.full_name}, age ${c.age} (${c.grade}): interests in ${c.interests.join(', ')}; challenges with ${c.challenges.join(', ')}; personality: ${c.personality_traits.join(', ')}; learning style: ${c.learning_style}`
    )
    .join('\n')

  const parentsSummary = intakeData.parents
    .map(
      (p) =>
        `- ${p.full_name} (${p.role}): ${p.work_schedule} schedule; strengths: ${p.strengths.join(', ')}`
    )
    .join('\n')

  const prompt = `You are a compassionate family coach and developmental psychologist creating a personalized Family Blueprint.

Family: ${intakeData.familyName}
${intakeData.familyMotto ? `Family Motto: "${intakeData.familyMotto}"` : ''}

PARENTS:
${parentsSummary}

CHILDREN:
${childrenSummary}

FAMILY GOALS: ${intakeData.familyGoals.join(', ')}
BIGGEST CHALLENGES: ${intakeData.biggestChallenges.join(', ')}
CURRENT WINS: ${intakeData.currentWins.join(', ')}

Create a warm, actionable, and deeply personalized Family Blueprint. Return ONLY valid JSON matching this exact structure:

{
  "overview": "2-3 sentence warm, encouraging overview of this specific family",
  "familyStrengths": ["5 specific strengths based on their data"],
  "growthAreas": ["3-4 growth areas framed positively as opportunities"],
  "morningRoutine": [
    {"time": "6:30 AM", "activity": "activity name", "tip": "brief helpful tip"}
  ],
  "eveningRoutine": [
    {"time": "7:00 PM", "activity": "activity name", "tip": "brief helpful tip"}
  ],
  "weeklyRhythm": [
    {"day": "Monday", "theme": "theme name", "activities": ["activity1", "activity2"]}
  ],
  "childInsights": [
    {
      "name": "child name",
      "strengths": ["2-3 strengths"],
      "suggestions": ["2-3 personalized suggestions"],
      "connectionIdea": "one specific parent-child connection activity"
    }
  ],
  "parentingTips": ["5-6 specific, actionable tips for this family"],
  "thirtyDayFocus": "One specific 30-day focus challenge for this family",
  "affirmation": "A warm, personalized family affirmation"
}

Make it specific to their data. Morning routine should have 5-6 items, evening 5-6 items, weeklyRhythm all 7 days. Be warm, encouraging, and practical.`

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No content from OpenAI')

  return JSON.parse(content) as BlueprintContent
}
