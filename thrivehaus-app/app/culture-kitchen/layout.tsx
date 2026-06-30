import CKNav from '@/components/culture-kitchen/CKNav';

export const metadata = {
  title: 'Culture Kitchen | ThriveHaus',
  description: 'Explore world cultures through food, recipes, and homeschool lessons.',
};

export default function CultureKitchenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-8">
        <CKNav />
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
