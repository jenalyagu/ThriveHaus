import LoginForm from "./LoginForm";

export const metadata = { title: "Sign in — ThriveHaus" };

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl mb-2" style={{ color: "var(--color-charcoal)" }}>
          Welcome back
        </h1>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          Sign in to your ThriveHaus account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
