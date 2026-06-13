import SignupForm from "./SignupForm";

export const metadata = { title: "Create account — ThriveHaus" };

export default function SignupPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl mb-2" style={{ color: "var(--color-charcoal)" }}>
          Start building your village
        </h1>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          Create your free ThriveHaus account
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
