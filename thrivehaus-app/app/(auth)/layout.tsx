import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-cream)" }}>
      <header className="p-6">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <footer className="p-6 text-center text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>
        © {new Date().getFullYear()} ThriveHaus ·{" "}
        <Link href="/" className="underline">Back to home</Link>
      </footer>
    </div>
  );
}
