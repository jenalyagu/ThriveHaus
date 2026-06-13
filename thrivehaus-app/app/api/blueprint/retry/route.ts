import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { IntakeData } from "@/types";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { blueprintId } = await req.json();

  // Verify this blueprint belongs to the user
  const { data: blueprint } = await db
    .from("blueprints")
    .select("id, family_id, families(user_id)")
    .eq("id", blueprintId)
    .single();

  if (!blueprint || blueprint.families?.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Reset to generating
  await db.from("blueprints").update({ status: "generating", content: {} }).eq("id", blueprintId);

  // Fetch intake data to rebuild prompt
  const { data: family } = await db
    .from("families")
    .select("*, parents(*), children(*)")
    .eq("id", blueprint.family_id)
    .single();

  const primaryParent = family?.parents?.find((p: { role: string }) => p.role === "primary");

  const intake: Partial<IntakeData> = {
    familyName: family?.name || "Our Family",
    firstName: primaryParent?.first_name || "",
    lastName: primaryParent?.last_name || "",
    hasPartner: family?.parents?.some((p: { role: string }) => p.role === "partner") || false,
    workSchedule: primaryParent?.work_schedule || "",
    topChallenges: primaryParent?.support_needs || [],
    children: family?.children?.map((c: { first_name: string; age: number; stage: string }) => ({
      firstName: c.first_name,
      age: c.age,
      stage: c.stage || "",
      needs: [],
    })) || [],
    primaryGoal: "Thrive — not just get by",
    timeframe: "",
    supportStyle: "",
    zipCode: family?.zip_code || "",
  };

  // Fire-and-forget
  generateBlueprint(blueprintId, intake as IntakeData).catch(async (err) => {
    console.error("Blueprint retry failed:", err.message);
    await db.from("blueprints").update({ status: "error" }).eq("id", blueprintId);
  });

  return NextResponse.json({ ok: true });
}

async function generateBlueprint(blueprintId: string, intake: IntakeData) {
  const Groq = (await import("groq-sdk")).default;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `Generate a personalized Family Blueprint for: ${intake.familyName}
Parent: ${intake.firstName} ${intake.lastName}
Work schedule: ${intake.workSchedule}
Children: ${intake.children.map(c => `${c.firstName} (${c.stage})`).join(", ") || "none listed"}
Top challenges: ${intake.topChallenges.join(", ") || "not specified"}
Primary goal: ${intake.primaryGoal}

Return JSON with: summary (string), pillars (array of {title, description, actions[]}), weeklyRhythm (array of {day, focus, tasks[]}), resources (array of {category, items: [{name, description}]}), affirmation (string). Include 3-4 pillars, 5-7 days, 2-3 resource categories.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are ThriveHaus, a warm AI family support specialist. Respond ONLY with valid JSON — no markdown, no code fences, just raw JSON." },
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
  await (sc as any).from("blueprints").update({ content, status: "complete", updated_at: new Date().toISOString() }).eq("id", blueprintId);
}
