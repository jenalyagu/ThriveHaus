"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Spinner from "@/components/ui/Spinner";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/intake");
      router.refresh();
    } else {
      setSuccess(true);
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="card p-8 text-center space-y-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 15%, transparent)" }}
        >
          <span style={{ color: "var(--color-sage)", fontSize: "1.5rem" }}>✓</span>
        </div>
        <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
          Check your email
        </h2>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 60%, transparent)" }}>
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-5">
      {error && (
        <div
          className="text-sm px-4 py-3 rounded-xl"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)",
            color: "var(--color-terracotta)",
          }}
        >
          {error}
        </div>
      )}

      <div>
        <label className="label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label className="label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="Minimum 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <div>
        <label className="label" htmlFor="confirm">Confirm password</label>
        <input
          id="confirm"
          type="password"
          className="input"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? <Spinner size="sm" /> : "Create account"}
      </button>

      <p className="text-center text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
        Already have an account?{" "}
        <Link href="/login" className="font-medium" style={{ color: "var(--color-terracotta)" }}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
