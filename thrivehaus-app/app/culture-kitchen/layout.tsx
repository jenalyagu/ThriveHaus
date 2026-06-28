import CKNav from '@/components/culture-kitchen/CKNav';

export const metadata = {
  title: 'Culture Kitchen™ — Family Heritage Meal Planning',
  description:
    'Build meal plans around your cultural heritage. Learn recipes, food history, geography, and homeschool lessons together as a family.',
};

export default function CultureKitchenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF9' }}>
      <CKNav />
      <main className="pb-20 md:pb-0">{children}</main>
      <footer
        className="border-t mt-16 py-8 px-4 text-center text-sm"
        style={{ borderColor: '#E8DFD0', color: '#8A8070' }}
      >
        <p className="font-serif italic text-base mb-1" style={{ color: '#5A6F5E' }}>
          "Food is our common ground, a universal experience."
        </p>
        <p className="text-xs">— James Beard</p>
        <p className="mt-4">Culture Kitchen™ is part of the ThriveHaus Family Operating System.</p>
      </footer>
    </div>
  );
}
