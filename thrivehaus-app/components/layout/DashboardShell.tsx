"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home, FileText, MessageCircle, Settings, LogOut, BarChart2,
  Heart, BookOpen, Star, GraduationCap, Home as HomeIcon,
  UtensilsCrossed, Menu, X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard",          href: "/dashboard",             icon: Home },
  { label: "Blueprint",          href: "/dashboard/blueprint",   icon: FileText },
  { label: "Village AI",         href: "/dashboard/chat",        icon: MessageCircle },
  { label: "Assessment",         href: "/dashboard/assessment",  icon: BarChart2 },
  { label: "Co-Care Network",    href: "/dashboard/cocare",      icon: Heart },
  { label: "Learning Pods",      href: "/dashboard/pods",        icon: BookOpen },
  { label: "Professional Guild", href: "/dashboard/guild",       icon: Star },
  { label: "Homeschool Hub",     href: "/dashboard/homeschool",  icon: GraduationCap },
  { label: "HomeOps",            href: "/dashboard/homeops",     icon: HomeIcon },
  { label: "Culture Kitchen",    href: "/culture-kitchen",       icon: UtensilsCrossed },
  { label: "Settings",           href: "/settings",              icon: Settings },
];

// Primary 4 tabs shown in the mobile bottom bar
const mobileTabItems = [
  { label: "Home",       href: "/dashboard",            icon: Home },
  { label: "Blueprint",  href: "/dashboard/blueprint",  icon: FileText },
  { label: "Village AI", href: "/dashboard/chat",       icon: MessageCircle },
  { label: "Assess",     href: "/dashboard/assessment", icon: BarChart2 },
];

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function DashboardShell({ children, userEmail }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-cream)" }}>

      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <aside
        className="hidden md:flex w-64 shrink-0 border-r flex-col"
        style={{ backgroundColor: "var(--color-forest)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Logo variant="light" />
          <p className="text-xs mt-1" style={{ color: "rgba(251,249,246,0.5)" }}>
            Family Operating System
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
                style={{
                  color: active ? "var(--color-cream)" : "rgba(251,249,246,0.6)",
                  backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {userEmail && (
            <p className="text-xs mb-3 truncate px-3" style={{ color: "rgba(251,249,246,0.4)" }}>
              {userEmail}
            </p>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors duration-150"
            style={{ color: "rgba(251,249,246,0.6)" }}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile top header ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b"
        style={{ backgroundColor: "var(--color-forest)", borderColor: "rgba(255,255,255,0.08)" }}>
        <Logo variant="light" />
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg"
          style={{ color: "rgba(251,249,246,0.8)" }}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setDrawerOpen(false)}
        >
          {/* backdrop */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />

          {/* drawer panel */}
          <div
            className="relative w-72 max-w-[85vw] h-full flex flex-col overflow-y-auto"
            style={{ backgroundColor: "var(--color-forest)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <Logo variant="light" />
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" style={{ color: "rgba(251,249,246,0.7)" }}>
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-150"
                    style={{
                      color: active ? "var(--color-cream)" : "rgba(251,249,246,0.65)",
                      backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
                    }}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {userEmail && (
                <p className="text-xs mb-3 truncate px-3" style={{ color: "rgba(251,249,246,0.4)" }}>
                  {userEmail}
                </p>
              )}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium w-full"
                style={{ color: "rgba(251,249,246,0.65)" }}
              >
                <LogOut size={17} />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0 pb-20 md:pb-0">
        {children}
      </main>

      {/* ── Mobile bottom tab bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch border-t"
        style={{
          backgroundColor: "rgba(251,249,246,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "var(--color-sand)",
        }}
        aria-label="Mobile navigation"
      >
        {mobileTabItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2.5 text-center"
              style={{ color: active ? "var(--color-terracotta)" : "var(--color-charcoal)", opacity: active ? 1 : 0.45 }}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span style={{ fontSize: "10px", fontWeight: active ? 600 : 400, letterSpacing: "0.02em" }}>
                {label}
              </span>
            </Link>
          );
        })}

        {/* "More" tab opens the drawer */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2.5"
          style={{ color: "var(--color-charcoal)", opacity: 0.45 }}
          aria-label="More navigation options"
        >
          <Menu size={20} strokeWidth={1.5} />
          <span style={{ fontSize: "10px", fontWeight: 400, letterSpacing: "0.02em" }}>More</span>
        </button>
      </nav>
    </div>
  );
}
