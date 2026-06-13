import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import ChatWindow from "./ChatWindow";

export const metadata = { title: "Village AI — ThriveHaus" };

export default async function ChatPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data: family } = await db
    .from("families")
    .select("id, name, parents(first_name, role)")
    .eq("user_id", user.id)
    .single();

  if (!family) redirect("/intake");

  const { data: history } = await db
    .from("messages")
    .select("id, role, content, created_at")
    .eq("family_id", family.id)
    .order("created_at", { ascending: true })
    .limit(50);

  const primaryParent = family.parents?.find((p: { role: string }) => p.role === "primary");

  return (
    <DashboardShell userEmail={user.email}>
      <ChatWindow
        familyId={family.id}
        firstName={primaryParent?.first_name || ""}
        initialMessages={history || []}
      />
    </DashboardShell>
  );
}
