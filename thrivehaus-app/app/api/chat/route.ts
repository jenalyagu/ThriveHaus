import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await req.json();
  if (!message?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

  // Load family context
  const { data: family } = await db
    .from("families")
    .select("*, parents(*), children(*)")
    .eq("user_id", user.id)
    .single();

  if (!family) return NextResponse.json({ error: "No family found" }, { status: 404 });

  const { data: blueprint } = await db
    .from("blueprints")
    .select("content, status")
    .eq("family_id", family.id)
    .eq("status", "complete")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Load recent conversation history (last 20 messages)
  const { data: history } = await db
    .from("messages")
    .select("role, content")
    .eq("family_id", family.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const recentHistory = (history || []).reverse();

  // Build system prompt with family context
  const systemPrompt = buildSystemPrompt(family, blueprint?.content);

  // Save user message
  await db.from("messages").insert({
    family_id: family.id,
    role: "user",
    content: message.trim(),
  });

  // Build messages for Groq
  const chatMessages = [
    { role: "system" as const, content: systemPrompt },
    ...recentHistory.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: message.trim() },
  ];

  // Stream the response
  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: chatMessages,
    stream: true,
    temperature: 0.8,
    max_tokens: 1024,
  });

  let fullResponse = "";

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content || "";
          if (delta) {
            fullResponse += delta;
            controller.enqueue(new TextEncoder().encode(delta));
          }
        }
      } finally {
        if (fullResponse) {
          const { createClient: createSC } = await import("@/lib/supabase/server");
          const sc = await createSC();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (sc as any).from("messages").insert({
            family_id: family.id,
            role: "assistant",
            content: fullResponse,
          });
        }
        controller.close();
      }
    },
  });

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildSystemPrompt(family: any, blueprintContent: any): string {
  const primaryParent = family.parents?.find((p: { role: string }) => p.role === "primary");
  const partner = family.parents?.find((p: { role: string }) => p.role === "partner");
  const children = family.children || [];

  const childrenDesc = children.length
    ? children.map((c: { first_name: string; age: number; stage: string }) =>
        `${c.first_name}${c.age ? ` (${c.age} years old)` : ""}${c.stage ? `, ${c.stage}` : ""}`
      ).join("; ")
    : "No children listed yet";

  const challenges = primaryParent?.support_needs?.length
    ? primaryParent.support_needs.join(", ")
    : "not specified";

  const blueprintSummary = blueprintContent?.summary
    ? `\n\nTheir Family Blueprint summary: "${blueprintContent.summary}"`
    : "";

  const pillars = blueprintContent?.pillars?.length
    ? `\n\nBlueprint pillars: ${blueprintContent.pillars.map((p: { title: string }) => p.title).join(", ")}`
    : "";

  return `You are the ThriveHaus Family Guide — a warm, wise, and practical AI support companion for modern families.

You are having a conversation with ${primaryParent?.first_name || "a parent"} from ${family.name}.

FAMILY CONTEXT:
- Family: ${family.name}
- Primary parent: ${primaryParent?.first_name} ${primaryParent?.last_name || ""}, ${primaryParent?.work_schedule || "work schedule not listed"}
${partner ? `- Partner: ${partner.first_name} ${partner.last_name || ""}, ${partner.work_schedule || "work schedule not listed"}` : "- No partner / single parent"}
- Children: ${childrenDesc}
- Top challenges: ${challenges}
- Location: ${family.zip_code || "not specified"}${blueprintSummary}${pillars}

YOUR ROLE:
You are not a therapist or medical professional. You are a knowledgeable, experienced family support guide — like the brilliant friend who has seen it all, reads everything, and gives real, specific, actionable advice without judgment.

YOUR VOICE:
- Warm but direct — no fluff, no empty affirmations
- Specific to THIS family — you know their names, their kids' stages, their challenges
- Practical first — always land on something actionable
- Honest — if something is hard, say so; don't sugarcoat
- Brief when the question is simple, thorough when the situation calls for it
- Never use bullet points for emotional topics — use conversational prose
- Use bullet points only for step-by-step practical guidance

ThriveHaus PHILOSOPHY:
- Every family deserves a village — a support system that actually shows up
- Modern parenthood is harder than it needs to be, and that's a structural problem, not a personal failure
- The goal is not perfection — it's sustainable rhythms and genuine support
- "Build Your Village" is the north star

BOUNDARIES:
- Refer to medical professionals for health/safety concerns
- Refer to licensed therapists for clinical mental health support
- You can hold space, but you don't diagnose

Always address ${primaryParent?.first_name || "the parent"} by name occasionally to keep it personal. You already know this family — act like it.`;
}
