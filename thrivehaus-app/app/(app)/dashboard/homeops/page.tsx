import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import HomeOpsHub from "./HomeOpsHub";
import type { BlueprintContent } from "@/types";

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

  const { data: blueprint } = family
    ? await db.from("blueprints").select("content, status").eq("family_id", family.id).eq("status", "complete").order("created_at", { ascending: false }).limit(1).maybeSingle()
    : { data: null };

  if (!family) redirect("/intake");

  const members: { id: string; name: string; role: string }[] = [
    ...(family.parents || []).map((p: { id: string; first_name: string }) => ({ id: p.id, name: p.first_name, role: "parent" })),
    ...(family.children || []).map((c: { id: string; first_name: string }) => ({ id: c.id, name: c.first_name, role: "child" })),
  ];

  const blueprintContent = (blueprint?.content ?? null) as BlueprintContent | null;

  return (
    <DashboardShell userEmail={user.email}>
      <HomeOpsHub familyId={family.id} familyName={family.name} members={members} blueprintContent={blueprintContent} />
    </DashboardShell>
  );
}
