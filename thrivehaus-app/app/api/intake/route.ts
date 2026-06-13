import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { IntakeData } from "@/types";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: { userId: string; data: IntakeData } = await req.json();
  const { data: intake } = body;

  // 1. Create family
  const { data: family, error: familyError } = await db
    .from("families")
    .insert({ user_id: user.id, name: intake.familyName, zip_code: intake.zipCode || null })
    .select()
    .single();

  if (familyError) {
    return NextResponse.json({ error: familyError.message }, { status: 500 });
  }

  // 2. Create primary parent
  await db.from("parents").insert({
    family_id: family.id,
    user_id: user.id,
    first_name: intake.firstName,
    last_name: intake.lastName,
    email: user.email!,
    role: "primary",
    work_schedule: intake.workSchedule || null,
    support_needs: intake.topChallenges,
  });

  // 3. Create partner if present
  if (intake.hasPartner && intake.partnerFirstName) {
    await db.from("parents").insert({
      family_id: family.id,
      user_id: user.id,
      first_name: intake.partnerFirstName,
      last_name: intake.partnerLastName || "",
      email: "",
      role: "partner",
      work_schedule: intake.partnerWorkSchedule || null,
      support_needs: [],
    });
  }

  // 4. Create children
  if (intake.children.length > 0) {
    await db.from("children").insert(
      intake.children
        .filter((c: IntakeData["children"][0]) => c.firstName)
        .map((c: IntakeData["children"][0]) => ({
          family_id: family.id,
          first_name: c.firstName,
          age: c.age,
          stage: c.stage || null,
          needs: c.needs,
        }))
    );
  }

  // 5. Create blueprint record (status: generating), then trigger AI
  const { data: blueprint, error: bpError } = await db
    .from("blueprints")
    .insert({ family_id: family.id, status: "generating", content: {} })
    .select()
    .single();

  if (bpError) {
    return NextResponse.json({ error: bpError.message }, { status: 500 });
  }

  // 6. Fire-and-forget blueprint generation
  generateBlueprint(family.id, blueprint.id, intake).catch(async (err) => {
    console.error("Blueprint generation failed:", err.message);
    const { createClient: createSC } = await import("@/lib/supabase/server");
    const sc = await createSC();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (sc as any).from("blueprints").update({ status: "error" }).eq("id", blueprint.id);
  });

  return NextResponse.json({ familyId: family.id, blueprintId: blueprint.id });
}

async function generateBlueprint(familyId: string, blueprintId: string, intake: IntakeData) {
  const Groq = (await import("groq-sdk")).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = buildPrompt(intake);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are ThriveHaus, an AI family support specialist. You help modern families build sustainable rhythms and village support systems. You write with warmth, specificity, and practical wisdom. Respond ONLY with valid JSON — no markdown, no code fences, just raw JSON." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2048,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content || "{}";
  const content = JSON.parse(raw.replace(/^```json\n?|\n?```$/g, "").trim());

  const { createClient: createSC } = await import("@/lib/supabase/server");
  const sc = await createSC();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (sc as any)
    .from("blueprints")
    .update({ content, status: "complete", updated_at: new Date().toISOString() })
    .eq("id", blueprintId);
}

function buildPrompt(intake: IntakeData): string {
  const childrenDesc = intake.children
    .filter((c) => c.firstName)
    .map((c) => {
      const needs = c.needs?.length ? ` (needs: ${c.needs.join(", ")})` : "";
      return `${c.firstName}, age ${c.age ?? "?"}, ${c.stage || "unknown stage"}${needs}`;
    })
    .join("\n  - ");

  const isHomeschool = intake.homeschooling;
  const isSingleParent = !intake.hasPartner;
  const values = intake.familyValues?.join(", ") || "not specified";
  const meals = intake.mealPreferences?.join(", ") || "not specified";
  const budget = intake.budgetPriority || "not specified";
  const support = intake.extendedSupport || "not specified";
  const housing = intake.housingType || "not specified";

  return `You are generating a deeply personalized Family Blueprint for a real family. Use every detail below to make this blueprint feel like it was written specifically for them — not a generic template.

=== FAMILY PROFILE ===
Family name: ${intake.familyName}
Location: ${intake.state || intake.zipCode || "not provided"}
Housing: ${housing}

Primary parent: ${intake.firstName} ${intake.lastName}
Work schedule: ${intake.workSchedule || "not specified"}
${intake.hasPartner ? `Partner: ${intake.partnerFirstName} ${intake.partnerLastName}\nPartner work schedule: ${intake.partnerWorkSchedule || "not specified"}` : "Family structure: Single parent (no co-parent listed)"}

Children:
  - ${childrenDesc || "No children listed"}

Homeschooling: ${isHomeschool ? "YES — factor this heavily into rhythms, learning, and resources" : "No"}

=== WHAT MATTERS TO THEM ===
Family values: ${values}
Meal preferences: ${meals}
Budget approach: ${budget}
Extended family / community support available: ${support}

=== THEIR CHALLENGES & GOALS ===
Top challenges right now: ${intake.topChallenges.join(", ") || "not specified"}
How they prefer to receive support: ${intake.supportStyle || "not specified"}
Primary goal: ${intake.primaryGoal}
Timeframe for change: ${intake.timeframe}

=== YOUR TASK ===
Generate a comprehensive, specific Family Blueprint. Do NOT use generic advice. Reference their children by name. Acknowledge their specific challenges. Respect their values. If they're ${isSingleParent ? "a single parent, acknowledge that reality — they need systems that work for one adult" : "a two-parent family, suggest how both parents can share load"}. If budget is tight, suggest free or low-cost solutions. If they homeschool, weave that into rhythms and resources.

Return ONLY a valid JSON object with this exact structure:
{
  "summary": "3-4 sentence warm, specific overview that references their family by name, acknowledges their real situation, and frames what this blueprint will do for them",
  "pillars": [
    {
      "title": "Pillar name (specific to their challenges)",
      "description": "2-3 sentences grounded in their specific situation",
      "actions": ["specific action 1", "specific action 2", "specific action 3", "specific action 4"]
    }
  ],
  "weeklyRhythm": [
    {
      "day": "Monday",
      "focus": "Short theme tied to their values or goals",
      "tasks": ["specific task 1", "specific task 2", "specific task 3"]
    }
  ],
  "mealApproach": {
    "philosophy": "1-2 sentences on their meal approach based on preferences and budget",
    "weeklyAnchor": "One specific meal prep strategy for their situation",
    "quickWins": ["quick meal idea 1", "quick meal idea 2", "quick meal idea 3"]
  },
  "villageStrategy": {
    "currentGap": "Honest 1-2 sentence assessment of their village gap based on support available",
    "immediateActions": ["village-building action 1", "village-building action 2", "village-building action 3"],
    "longerTerm": "One longer-term village vision sentence"
  },
  "resources": [
    {
      "category": "Category name",
      "items": [
        { "name": "Resource name", "description": "1 sentence — why it fits THIS family" }
      ]
    }
  ],
  "affirmation": "A warm, personal, 1-2 sentence affirmation that speaks directly to ${intake.firstName} and her specific journey"
}

Requirements:
- 4-5 pillars that directly address their stated challenges
- 7 days in weekly rhythm (Mon–Sun) with tasks tied to their values and schedule
- mealApproach based on their stated meal preferences and budget
- villageStrategy that reflects their current support level (${support})
- 3 resource categories, each with 2-3 items suited to their situation${isHomeschool ? "\n- Include a homeschool-specific resource category" : ""}
- Reference children by name where natural
- Affirmation should mention ${intake.firstName} by name
`;
}
