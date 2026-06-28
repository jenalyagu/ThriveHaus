'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/culture-kitchen', label: 'Home', emoji: '🏠' },
  { href: '/culture-kitchen/cultures', label: 'Cultures', emoji: '🌍' },
  { href: '/culture-kitchen/meal-plan', label: 'Meal Plan', emoji: '📅' },
  { href: '/culture-kitchen/grocery-list', label: 'Grocery', emoji: '🛒' },
  { href: '/culture-kitchen/saved-meals', label: 'Saved', emoji: '❤️' },
  { href: '/culture-kitchen/family-profile', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
];

export default function CKNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(251,249,246,0.92)',
          borderColor: '#E0D8CC',
          boxShadow: '0 1px 0 rgba(59,75,63,0.06), 0 4px 12px rgba(59,75,63,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/culture-kitchen" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-shadow" style={{ background: 'linear-gradient(135deg, #3B4B3F, #5A6F5E)' }}>
                🍳
              </div>
              <div className="leading-tight">
                <div className="font-serif font-bold text-base leading-none" style={{ color: '#3B4B3F' }}>
                  Culture Kitchen
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#D09E5A' }}>
                  ™ by ThriveHaus
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active =
                  link.href === '/culture-kitchen'
                    ? pathname === '/culture-kitchen'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: active ? '#3B4B3F' : 'transparent',
                      color: active ? '#FFFDF9' : '#5A6F5E',
                      boxShadow: active ? '0 2px 8px rgba(59,75,63,0.25)' : 'none',
                    }}
                  >
                    <span className="text-base">{link.emoji}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
              style={{ color: '#3B4B3F', backgroundColor: menuOpen ? '#F0EDE8' : 'transparent' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t px-3 py-3 space-y-1"
            style={{ borderColor: '#E0D8CC', backgroundColor: 'rgba(251,249,246,0.98)' }}
          >
            {navLinks.map((link) => {
              const active =
                link.href === '/culture-kitchen'
                  ? pathname === '/culture-kitchen'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: active ? '#3B4B3F' : 'transparent',
                    color: active ? '#FFFDF9' : '#3B4B3F',
                    boxShadow: active ? '0 2px 8px rgba(59,75,63,0.25)' : 'none',
                  }}
                >
                  <span className="text-xl w-8 text-center">{link.emoji}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Mobile bottom tab bar — always visible on phones */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          backgroundColor: 'rgba(251,249,246,0.96)',
          borderColor: '#E0D8CC',
          boxShadow: '0 -4px 16px rgba(59,75,63,0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-1.5 pb-safe">
          {navLinks.map((link) => {
            const active =
              link.href === '/culture-kitchen'
                ? pathname === '/culture-kitchen'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 min-w-0"
                style={{ color: active ? '#3B4B3F' : '#8A8070' }}
              >
                <span className="text-2xl leading-none">{link.emoji}</span>
                <span
                  className="text-[9px] font-bold uppercase tracking-wide leading-none truncate"
                  style={{ color: active ? '#3B4B3F' : '#A09080' }}
                >
                  {link.label}
                </span>
                {active && (
                  <div className="w-4 h-0.5 rounded-full mt-0.5" style={{ backgroundColor: '#3B4B3F' }} />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom padding on mobile so content doesn't hide behind tab bar */}
      <div className="md:hidden h-16" />
    </>
  );
}
