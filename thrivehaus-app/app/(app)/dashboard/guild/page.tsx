import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import GuildClient from "./GuildClient";

export const metadata = { title: "Professional Guild — ThriveHaus" };

export default async function GuildPage() {
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

  const { data: members } = await db
    .from("guild_members")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <DashboardShell userEmail={user.email}>
      <GuildClient familyId={family.id} familyName={family.name} members={members || []} />
    </DashboardShell>
  );
}
