"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Spinner from "@/components/ui/Spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
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
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? <Spinner size="sm" /> : "Sign in"}
      </button>

      <p className="text-center text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium"
          style={{ color: "var(--color-terracotta)" }}
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
