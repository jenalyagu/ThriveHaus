import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  const { children, learningStyle, familyName, blueprintContent } = await req.json();

  const Groq = (await import("groq-sdk")).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  // Pull relevant context from blueprint
  const bpSummary: string = blueprintContent?.summary || "";
  const bpValues: string  = blueprintContent?.pillars?.map((p: { title: string }) => p.title).join(", ") || "";
  const bpRhythm: string  = blueprintContent?.weeklyRhythm
    ? blueprintContent.weeklyRhythm.map((d: { day: string; focus: string }) => `${d.day}: ${d.focus}`).join(", ")
    : "";

  const childrenDesc = (children as { name: string; age?: number }[])
    .map((c) => `${c.name}${c.age ? `, age ${c.age}` : ""}`)
    .join("; ");

  const prompt = `You are ThriveHaus, an expert homeschool curriculum designer. Generate a rich, personalized weekly lesson plan for a homeschool family.

=== FAMILY CONTEXT ===
Family name: ${familyName}
Children: ${childrenDesc || "one child, age unspecified"}
Learning style: ${learningStyle || "Eclectic"}
Blueprint summary: ${bpSummary || "A family committed to intentional learning."}
Family pillars / values: ${bpValues || "connection, growth, joy"}
Weekly rhythm themes: ${bpRhythm || "not specified"}

=== YOUR TASK ===
Design a complete, realistic 5-day lesson plan (Monday–Friday) aligned with the ${learningStyle || "Eclectic"} approach. Ground every subject in the family's values and make the content age-appropriate for their children. Be specific — real book titles, real activities, real materials. Reference children by name.

Return ONLY valid JSON:
{
  "theme": "A compelling weekly theme that ties all subjects together (e.g., 'The Wild Ocean' or 'Ancient Builders')",
  "learningStyle": "${learningStyle || "Eclectic"}",
  "styleNote": "One sentence explaining how this plan reflects their specific learning style",
  "subjects": [
    {
      "name": "Subject name (e.g. Language Arts)",
      "emoji": "📚",
      "color": "one of: terracotta, sage, ochre, forest",
      "weeklyGoal": "What the child will accomplish this week in this subject",
      "lessons": [
        {
          "title": "Lesson title",
          "description": "2-3 sentence description of the activity — specific and engaging",
          "duration": "e.g. 25 min",
          "materials": ["item 1", "item 2"],
          "days": ["Monday", "Wednesday"]
        }
      ]
    }
  ],
  "dailyFlow": [
    {
      "day": "Monday",
      "blocks": [
        { "subject": "Language Arts", "activity": "Short description of today's activity", "duration": "25 min" }
      ]
    }
  ],
  "weeklyAnchor": "The single most important hands-on activity or project for the week",
  "resourceSpotlight": { "title": "One book or resource name", "why": "One grammatically correct sentence on why it fits this family — use 'an' before vowel sounds (e.g. 'an engaging', 'an excellent')" },
  "encouragement": "A warm 1-sentence note to ${familyName} about this week's learning journey"
}

Requirements:
- 4–5 subjects appropriate for the children's ages
- Each subject has 2–3 lessons spread across the week
- dailyFlow covers all 5 days, each with 3–5 blocks
- Match lesson complexity to children's ages
- If learning style is Charlotte Mason: use living books, nature study, narration, short lessons
- If Classical: use Socratic discussion, history cycles, grammar, logic
- If Montessori: use self-directed work, hands-on materials, real-world application
- If Waldorf: use seasonal themes, artistic integration, rhythm and movement
- If Unschooling: follow child's natural curiosity with rich environmental prompts
- If Eclectic: blend 2–3 styles that fit the family's rhythm
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are ThriveHaus, a homeschool curriculum designer. Respond ONLY with valid JSON — no markdown, no code fences." },
        { role: "user", content: prompt },
      ],
      temperature: 0.75,
      max_tokens: 2500,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content || "{}";
    const parsed = JSON.parse(raw.replace(/^```json\n?|\n?```$/g, "").trim());

    // Fix common AI grammar slip: "a [vowel-sound word]" → "an [vowel-sound word]"
    if (parsed.resourceSpotlight?.why) {
      parsed.resourceSpotlight.why = parsed.resourceSpotlight.why.replace(/\b(a)\s+([aeiouAEIOU])/g, "an $2");
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    const message = (err as { error?: { message?: string } }).error?.message || (err as Error).message || "Unknown error";
    console.error("[lesson-plan] Groq error:", status, message);

    if (status === 401) {
      return NextResponse.json({ error: "API key invalid or expired. Please update GROQ_API_KEY." }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: status ?? 500 });
  }
}
