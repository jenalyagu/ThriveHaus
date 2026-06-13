import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { mealType, day, currentMeals, preferences } = await req.json();

  const Groq = (await import("groq-sdk")).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prefNote = preferences?.length ? ` Preferences: ${preferences.join(", ")}.` : "";
  const avoidList = currentMeals?.length
    ? ` Already on the plan this week: ${currentMeals.filter(Boolean).join(", ")} — suggest something different.`
    : "";

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a family meal planner focused on batch cooking and ingredient efficiency. Suggest meals that share ingredients with other weekly meals to minimize waste and prep time. Respond ONLY with valid JSON.",
      },
      {
        role: "user",
        content: `Suggest one ${mealType} for ${day}.${prefNote}${avoidList} The meal should be realistic for a busy family, ideally reusing proteins or grains cooked in bulk. Return JSON: { "meal": "meal name or short description (under 8 words)" }`,
      },
    ],
    temperature: 0.8,
    max_tokens: 60,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content || "{}";
  const parsed = JSON.parse(raw);
  return NextResponse.json({ meal: parsed.meal || "—" });
}
