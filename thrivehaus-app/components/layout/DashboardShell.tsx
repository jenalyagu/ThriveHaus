"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, MessageCircle, Settings, LogOut, BarChart2, Heart, BookOpen, Star, GraduationCap, Home as HomeIcon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Blueprint", href: "/dashboard/blueprint", icon: FileText },
  { label: "Village AI", href: "/dashboard/chat", icon: MessageCircle },
  { label: "Assessment", href: "/dashboard/assessment", icon: BarChart2 },
  { label: "Co-Care Network", href: "/dashboard/cocare", icon: Heart },
  { label: "Learning Pods", href: "/dashboard/pods", icon: BookOpen },
  { label: "Professional Guild", href: "/dashboard/guild", icon: Star },
  { label: "Homeschool Hub", href: "/dashboard/homeschool", icon: GraduationCap },
  { label: "HomeOps",        href: "/dashboard/homeops",   icon: HomeIcon },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function DashboardShell({ children, userEmail }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-cream)" }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 border-r flex flex-col"
        style={{ backgroundColor: "var(--color-forest)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Logo variant="light" />
          <p className="text-xs mt-1" style={{ color: "rgba(251,249,246,0.5)" }}>
            Family Operating System
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
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

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
