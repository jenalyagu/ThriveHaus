import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/layout/DashboardShell";
import HomeschoolHub from "./HomeschoolHub";

export const metadata = { title: "Homeschool Hub — ThriveHaus" };

export default async function HomeschoolPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: family } = await db
    .from("families")
    .select("id, name, children(*)")
    .eq("user_id", user.id)
    .single();

  if (!family) redirect("/intake");

  const [{ data: attendance }, { data: portfolio }, { data: settings }, { data: blueprint }] = await Promise.all([
    db.from("homeschool_attendance").select("*").eq("family_id", family.id).order("date", { ascending: false }).limit(200),
    db.from("homeschool_portfolio").select("*").eq("family_id", family.id).order("date", { ascending: false }).limit(50),
    db.from("homeschool_settings").select("id, state, learning_style, lesson_plan").eq("family_id", family.id).maybeSingle(),
    db.from("blueprints").select("content, status").eq("family_id", family.id).eq("status", "complete").maybeSingle(),
  ]);

  const children: { name: string; age?: number }[] = (family.children || []).map((c: { first_name: string; age?: number }) => ({ name: c.first_name, age: c.age }));

  return (
    <DashboardShell userEmail={user.email}>
      <HomeschoolHub
        familyId={family.id}
        familyName={family.name}
        children={children}
        attendance={attendance || []}
        portfolio={portfolio || []}
        settings={settings || null}
        blueprintContent={blueprint?.content ?? null}
      />
    </DashboardShell>
  );
}
