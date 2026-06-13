"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Spinner from "@/components/ui/Spinner";
import type { Database } from "@/types/database";
import type { User } from "@supabase/supabase-js";

type Family = (Database["public"]["Tables"]["families"]["Row"] & {
  parents: Database["public"]["Tables"]["parents"]["Row"][];
}) | null;

interface SettingsViewProps {
  user: User;
  family: Family;
}

export default function SettingsView({ user, family }: SettingsViewProps) {
  const supabase = createClient();
  const primaryParent = family?.parents?.find((p) => p.role === "primary");

  const [familyName, setFamilyName] = useState(family?.name || "");
  const [firstName, setFirstName] = useState(primaryParent?.first_name || "");
  const [lastName, setLastName] = useState(primaryParent?.last_name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    if (family) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("families").update({ name: familyName }).eq("id", family.id);
    }
    if (primaryParent) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("parents")
        .update({ first_name: firstName, last_name: lastName })
        .eq("id", primaryParent.id);
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    setPwSaving(true);
    setPwError("");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setPwError(error.message);
    else {
      setPwSaved(true);
      setNewPassword("");
      setTimeout(() => setPwSaved(false), 3000);
    }
    setPwSaving(false);
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <span className="section-tag">Account</span>
        <h1 className="font-serif text-3xl font-light" style={{ color: "var(--color-charcoal)" }}>
          Settings
        </h1>
      </div>

      {/* Profile */}
      <div className="card p-6 mb-6">
        <h2 className="font-serif text-lg mb-5" style={{ color: "var(--color-charcoal)" }}>
          Profile
        </h2>
        <form onSubmit={saveProfile} className="space-y-4">
          {error && (
            <div className="text-sm px-4 py-3 rounded-xl"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)", color: "var(--color-terracotta)" }}>
              {error}
            </div>
          )}
          <div>
            <label className="label">Email</label>
            <input className="input opacity-60 cursor-not-allowed" value={user.email || ""} disabled />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">First name</label>
              <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="label">Last name</label>
              <input className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Family name</label>
            <input className="input" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? <Spinner size="sm" /> : "Save changes"}
            </button>
            {saved && (
              <span className="text-sm" style={{ color: "var(--color-sage)" }}>
                ✓ Saved
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Password */}
      <div className="card p-6">
        <h2 className="font-serif text-lg mb-5" style={{ color: "var(--color-charcoal)" }}>
          Change password
        </h2>
        <form onSubmit={changePassword} className="space-y-4">
          {pwError && (
            <div className="text-sm px-4 py-3 rounded-xl"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)", color: "var(--color-terracotta)" }}>
              {pwError}
            </div>
          )}
          <div>
            <label className="label">New password</label>
            <input className="input" type="password" placeholder="Minimum 8 characters"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-secondary" disabled={pwSaving || !newPassword}>
              {pwSaving ? <Spinner size="sm" /> : "Update password"}
            </button>
            {pwSaved && (
              <span className="text-sm" style={{ color: "var(--color-sage)" }}>
                ✓ Password updated
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
