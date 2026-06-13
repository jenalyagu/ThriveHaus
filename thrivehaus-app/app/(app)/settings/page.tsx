import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import SettingsView from "./SettingsView";

export const metadata = { title: "Settings — ThriveHaus" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: family } = await supabase
    .from("families")
    .select("*, parents(*)")
    .eq("user_id", user.id)
    .single();

  return (
    <DashboardShell userEmail={user.email}>
      <SettingsView user={user} family={family} />
    </DashboardShell>
  );
}
