'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Globe, BookOpen, Calendar, ShoppingCart, Bookmark, Users } from 'lucide-react';

const navItems = [
  { href: '/culture-kitchen', label: 'Home', icon: Home, exact: true },
  { href: '/culture-kitchen/cultures', label: 'Cultures', icon: Globe },
  { href: '/culture-kitchen/meal-plan', label: 'Meal Plan', icon: Calendar },
  { href: '/culture-kitchen/grocery-list', label: 'Grocery', icon: ShoppingCart },
  { href: '/culture-kitchen/saved-meals', label: 'Saved', icon: Bookmark },
  { href: '/culture-kitchen/family-profile', label: 'Family', icon: Users },
];

export default function CKNav() {
  const pathname = usePathname();

  function isActive(item: typeof navItems[0]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 w-48 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-sage)] px-3 mb-2">
          Culture Kitchen
        </p>
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-[var(--color-terracotta)] text-white'
                  : 'text-[var(--color-charcoal)] hover:bg-[var(--color-sand)]'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-[var(--color-sand)] flex">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                active ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-sage)]'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
