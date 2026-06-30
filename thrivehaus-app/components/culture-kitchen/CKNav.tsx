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
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: '#FFFDF9',
        borderColor: '#E8DFD0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/culture-kitchen" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🍳</span>
            <div className="leading-tight">
              <div
                className="font-serif font-semibold text-base leading-none"
                style={{ color: '#3B4B3F' }}
              >
                Culture Kitchen
              </div>
              <Link href="/dashboard" className="text-xs font-sans hover:underline" style={{ color: '#5A6F5E' }}>
                ™ by ThriveHaus
              </Link>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                link.href === '/culture-kitchen'
                  ? pathname === '/culture-kitchen'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: active ? '#3B4B3F' : 'transparent',
                    color: active ? '#FFFDF9' : '#5A6F5E',
                  }}
                >
                  <span>{link.emoji}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#3B4B3F' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: '#E8DFD0', backgroundColor: '#FFFDF9' }}>
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: active ? '#3B4B3F' : 'transparent',
                  color: active ? '#FFFDF9' : '#3B4B3F',
                }}
              >
                <span className="text-lg">{link.emoji}</span>
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
