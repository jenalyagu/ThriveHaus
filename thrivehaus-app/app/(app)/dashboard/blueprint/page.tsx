import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import BlueprintView from "./BlueprintView";

export const metadata = { title: "Family Blueprint — ThriveHaus" };

export default async function BlueprintPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: family } = await db
    .from("families")
    .select("id, name")
    .eq("user_id", user.id)
    .single();

  if (!family) redirect("/intake");

  const { data: blueprint } = await db
    .from("blueprints")
    .select("*")
    .eq("family_id", family.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <DashboardShell userEmail={user.email}>
      <BlueprintView blueprint={blueprint} familyName={family.name} />
    </DashboardShell>
  );
}
