import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import HomeOpsHub from "./HomeOpsHub";

export const metadata = { title: "HomeOps — ThriveHaus" };

export default async function HomeOpsPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: family } = await db
    .from("families")
    .select("id, name, parents(*), children(*)")
    .eq("user_id", user.id)
    .single();

  if (!family) redirect("/intake");

  const members: { id: string; name: string; role: string }[] = [
    ...(family.parents || []).map((p: { id: string; first_name: string }) => ({ id: p.id, name: p.first_name, role: "parent" })),
    ...(family.children || []).map((c: { id: string; first_name: string }) => ({ id: c.id, name: c.first_name, role: "child" })),
  ];

  return (
    <DashboardShell userEmail={user.email}>
      <HomeOpsHub familyId={family.id} familyName={family.name} members={members} />
    </DashboardShell>
  );
}
