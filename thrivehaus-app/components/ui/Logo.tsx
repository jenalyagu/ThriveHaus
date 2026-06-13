import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const colorClass = variant === "light" ? "text-cream" : "text-charcoal";

  return (
    <Link href="/" className={`font-serif font-medium ${sizeClasses[size]} ${colorClass} no-underline`}>
      ThriveHaus
    </Link>
  );
}
