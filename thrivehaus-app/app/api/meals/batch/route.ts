import { NextRequest, NextResponse } from "next/server";
import type { DayMeals } from "@/lib/homeops";

export async function POST(req: NextRequest) {
  const { meals, preferences }: { meals: DayMeals[]; preferences?: string[] } = await req.json();

  const Groq = (await import("groq-sdk")).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const mealList = meals
    .map((d) => `${d.day}: breakfast=${d.breakfast}, lunch=${d.lunch}, dinner=${d.dinner}, snack=${d.snack}`)
    .join("\n");

  const prefNote = preferences?.length ? ` Family preferences: ${preferences.join(", ")}.` : "";

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a batch-cooking meal planner. Your goal is to redesign a family's weekly meal plan so that 1-2 big cook sessions cover most of the week. Anchor meals around shared proteins, grains, and sauces. Respond ONLY with valid JSON.",
      },
      {
        role: "user",
        content: `Current meal plan:\n${mealList}\n${prefNote}

Redesign this week's meals for maximum batch efficiency. Use 2-3 anchor proteins/bases that transform across meals (e.g. rotisserie chicken → tacos → grain bowl → soup). Keep meals realistic, simple, and family-friendly.

Return JSON with this structure:
{
  "meals": [
    { "day": "Monday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." }
  ],
  "batchSessions": [
    {
      "label": "Sunday Prep (45 min)",
      "tasks": ["Cook 3 cups brown rice", "Roast sheet pan of chicken thighs", "Chop veggies for the week"]
    }
  ],
  "anchors": [
    { "ingredient": "Chicken thighs", "usedIn": ["Monday dinner", "Tuesday lunch wraps", "Wednesday soup"] }
  ],
  "tip": "One sentence encouragement about the batch approach"
}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1200,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content || "{}";
  const parsed = JSON.parse(raw);
  return NextResponse.json(parsed);
}
