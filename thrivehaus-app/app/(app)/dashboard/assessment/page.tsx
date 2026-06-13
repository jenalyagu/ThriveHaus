import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import AssessmentForm from "./AssessmentForm";
import type { ScoreKey } from "@/lib/village";
import { defaultScores } from "@/lib/village";

export const metadata = { title: "Village Assessment — ThriveHaus" };

export default async function AssessmentPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: family } = await db
    .from("families")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!family) redirect("/intake");

  const scores = { ...defaultScores, ...(family.village_scores as Record<ScoreKey, number> || {}) };

  return (
    <DashboardShell userEmail={user.email}>
      <AssessmentForm familyId={family.id} familyName={family.name} initialScores={scores} />
    </DashboardShell>
  );
}
