import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import CoCareClient from "./CoCareClient";

export const metadata = { title: "Co-Care Network — ThriveHaus" };

export default async function CoCarePage() {
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

  const { data: myEntry } = await db
    .from("cocare_families")
    .select("*")
    .eq("family_id", family.id)
    .maybeSingle();

  const { data: network } = await db
    .from("cocare_families")
    .select("*")
    .neq("family_id", family.id)
    .limit(20);

  return (
    <DashboardShell userEmail={user.email}>
      <CoCareClient
        familyId={family.id}
        familyName={family.name}
        myEntry={myEntry}
        network={network || []}
      />
    </DashboardShell>
  );
}
