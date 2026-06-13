import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import IntakeWizard from "./IntakeWizard";

export const metadata = { title: "Family Intake — ThriveHaus" };

export default async function IntakePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // If family already exists, skip to dashboard
  const { data: family } = await supabase
    .from("families")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (family) redirect("/dashboard");

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-tag">Step 1 of 1</span>
          <h1 className="font-serif text-3xl md:text-4xl font-light mb-3" style={{ color: "var(--color-charcoal)" }}>
            Tell us about your family
          </h1>
          <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
            This helps us generate your personalized Family Blueprint.
          </p>
        </div>
        <IntakeWizard userId={user.id} />
      </div>
    </div>
  );
}
