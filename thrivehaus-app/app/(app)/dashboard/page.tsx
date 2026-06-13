import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import DashboardHome from "./DashboardHome";
import type { Database } from "@/types/database";
import { defaultScores, type ScoreKey } from "@/lib/village";

type FamilyWithRelations = Database["public"]["Tables"]["families"]["Row"] & {
  parents: Database["public"]["Tables"]["parents"]["Row"][];
  children: Database["public"]["Tables"]["children"]["Row"][];
  village_scores?: Record<ScoreKey, number>;
};

export const metadata = { title: "Dashboard — ThriveHaus" };

export default async function DashboardPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: rawFamily, error: familyError } = await db
    .from("families")
    .select("*, parents(*), children(*)")
    .eq("user_id", user.id)
    .single();

  if (familyError) console.error("Family fetch error:", familyError.message);

  if (!rawFamily) redirect("/intake");

  const family = rawFamily as FamilyWithRelations;
  family.village_scores = { ...defaultScores, ...(rawFamily.village_scores || {}) };

  const blueprintUnlocked: boolean = !!(rawFamily as { blueprint_unlocked?: boolean }).blueprint_unlocked;

  const { data: blueprint } = blueprintUnlocked
    ? await db
        .from("blueprints")
        .select("*")
        .eq("family_id", family.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
    : { data: null };

  return (
    <DashboardShell userEmail={user.email}>
      <DashboardHome family={family} blueprint={blueprint} blueprintUnlocked={blueprintUnlocked} />
    </DashboardShell>
  );
}
