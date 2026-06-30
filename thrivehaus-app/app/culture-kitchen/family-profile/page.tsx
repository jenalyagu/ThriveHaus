'use client';

import { useState } from 'react';
import { cultures } from '@/lib/culture-kitchen/cultures';
import { DIETARY_OPTIONS, AGE_RANGES } from '@/lib/culture-kitchen/family-profile';

interface Member { id: string; name: string; role: string; age?: number; }

export default function FamilyProfilePage() {
  const [familyName, setFamilyName] = useState('The Reyes Family');
  const [familySize, setFamilySize] = useState(4);
  const [budget, setBudget] = useState(100);
  const [ageRange, setAgeRange] = useState('6-12');
  const [dietary, setDietary] = useState<string[]>([]);
  const [heritages, setHeritages] = useState<string[]>(['filipino']);
  const [preferred, setPreferred] = useState<string[]>(['filipino', 'mediterranean']);
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Parent / Guardian 1', role: 'Parent' },
    { id: '2', name: 'Parent / Guardian 2', role: 'Parent' },
  ]);
  const [saved, setSaved] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Child');

  const toggleDietary = (item: string) => {
    setDietary((prev) => prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]);
  };

  const toggleHeritage = (id: string) => {
    setHeritages((prev) => prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]);
  };

  const togglePreferred = (id: string) => {
    setPreferred((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const addMember = () => {
    if (!newMemberName.trim()) return;
    setMembers((prev) => [...prev, {
      id: String(Date.now()), name: newMemberName, role: newMemberRole
    }]);
    setNewMemberName('');
  };

  const removeMember = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#3B4B3F' }}>
          👨‍👩‍👧‍👦 Family Heritage Profile
        </h1>
        <p className="text-base" style={{ color: '#8A8070' }}>
          Tell us about your family so we can personalize your culture experience.
        </p>
      </div>

      <div className="space-y-8">
        {/* Family Identity */}
        <section className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
          <h2 className="font-serif text-xl mb-5" style={{ color: '#3B4B3F' }}>🏡 Family Identity</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#3B4B3F' }}>Family Name</label>
              <input value={familyName} onChange={(e) => setFamilyName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor: '#E8DFD0', backgroundColor: '#F3EFE9', color: '#3B4B3F', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#3B4B3F' }}>
                Family Size: <strong>{familySize} people</strong>
              </label>
              <input type="range" min={1} max={12} value={familySize}
                onChange={(e) => setFamilySize(+e.target.value)}
                className="w-full" style={{ accentColor: '#3B4B3F' }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: '#8A8070' }}>
                <span>1</span><span>12</span>
              </div>
            </div>
          </div>
        </section>

        {/* Family Members */}
        <section className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
          <h2 className="font-serif text-xl mb-5" style={{ color: '#3B4B3F' }}>👥 Family Members</h2>
          <div className="space-y-3 mb-5">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3.5 rounded-xl border"
                style={{ backgroundColor: '#F3EFE9', borderColor: '#E8DFD0' }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.role === 'Parent' ? '👤' : m.role === 'Child' ? '🧒' : '👴'}</span>
                  <div>
                    <div className="font-medium text-sm" style={{ color: '#3B4B3F' }}>{m.name}</div>
                    <div className="text-xs" style={{ color: '#8A8070' }}>{m.role}</div>
                  </div>
                </div>
                <button onClick={() => removeMember(m.id)}
                  className="text-xs px-2.5 py-1 rounded-lg hover:bg-red-100"
                  style={{ color: '#B05042' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <input value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Name..."
              className="flex-1 px-4 py-2 rounded-xl border text-sm outline-none"
              style={{ borderColor: '#E8DFD0', backgroundColor: '#F3EFE9', color: '#3B4B3F', fontFamily: 'inherit' }}
              onKeyDown={(e) => e.key === 'Enter' && addMember()} />
            <select value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)}
              className="px-3 py-2 rounded-xl border text-sm outline-none"
              style={{ borderColor: '#E8DFD0', backgroundColor: '#F3EFE9', color: '#3B4B3F', fontFamily: 'inherit' }}>
              <option>Parent</option>
              <option>Child</option>
              <option>Grandparent</option>
              <option>Other</option>
            </select>
            <button onClick={addMember}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
              + Add
            </button>
          </div>
        </section>

        {/* Heritage Backgrounds */}
        <section className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
          <h2 className="font-serif text-xl mb-2" style={{ color: '#3B4B3F' }}>🌍 Heritage Backgrounds</h2>
          <p className="text-sm mb-5" style={{ color: '#8A8070' }}>
            Select all cultural heritages in your family tree. We&apos;ll highlight these cultures for you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cultures.map((c) => (
              <button key={c.id} onClick={() => toggleHeritage(c.id)}
                className="flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: heritages.includes(c.id) ? '#3B4B3F' : '#F3EFE9',
                  borderColor: heritages.includes(c.id) ? '#3B4B3F' : '#E8DFD0',
                  color: heritages.includes(c.id) ? '#FFFDF9' : '#3B4B3F',
                }}>
                <span className="text-xl shrink-0">{c.emoji}</span>
                <span className="text-xs font-medium leading-tight">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Preferred Cuisines */}
        <section className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
          <h2 className="font-serif text-xl mb-2" style={{ color: '#3B4B3F' }}>❤️ Preferred Cuisines</h2>
          <p className="text-sm mb-5" style={{ color: '#8A8070' }}>
            Which cuisines does your family love to cook and eat?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cultures.map((c) => (
              <button key={c.id} onClick={() => togglePreferred(c.id)}
                className="flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: preferred.includes(c.id) ? '#D09E5A' : '#F3EFE9',
                  borderColor: preferred.includes(c.id) ? '#D09E5A' : '#E8DFD0',
                  color: preferred.includes(c.id) ? '#FFFDF9' : '#3B4B3F',
                }}>
                <span className="text-xl shrink-0">{c.emoji}</span>
                <span className="text-xs font-medium leading-tight">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Homeschool + Dietary */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4" style={{ color: '#3B4B3F' }}>📚 Homeschool Age Range</h2>
            <div className="space-y-2">
              {AGE_RANGES.map((range) => (
                <button key={range.value} onClick={() => setAgeRange(range.value)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: ageRange === range.value ? '#5A6F5E' : '#F3EFE9',
                    color: ageRange === range.value ? '#FFFDF9' : '#4A4040',
                  }}>
                  {range.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4" style={{ color: '#3B4B3F' }}>🥗 Dietary Needs</h2>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.map((opt) => (
                <button key={opt} onClick={() => toggleDietary(opt)}
                  className="text-sm px-3 py-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: dietary.includes(opt) ? '#3B4B3F' : '#F3EFE9',
                    color: dietary.includes(opt) ? '#FFFDF9' : '#5A6F5E',
                  }}>
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2" style={{ color: '#3B4B3F' }}>
                💰 Weekly Budget: <strong>${budget}</strong>
              </label>
              <input type="range" min={30} max={300} step={10} value={budget}
                onChange={(e) => setBudget(+e.target.value)}
                className="w-full" style={{ accentColor: '#3B4B3F' }} />
              <div className="flex justify-between text-xs mt-1" style={{ color: '#8A8070' }}>
                <span>$30</span><span>$300</span>
              </div>
            </div>
          </section>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button onClick={handleSave}
            className="px-8 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
            style={{ backgroundColor: '#3B4B3F', color: '#FFFDF9' }}>
            {saved ? '✓ Profile Saved!' : 'Save Family Profile'}
          </button>
          {saved && (
            <p className="text-sm" style={{ color: '#5A6F5E' }}>
              Your preferences are saved locally.
            </p>
          )}
        </div>

        {/* AI Teaser */}
        <div className="rounded-2xl p-6 border-2 border-dashed"
          style={{ borderColor: '#D09E5A', backgroundColor: '#FBF4E8' }}>
          <div className="flex items-start gap-4">
            <div className="text-3xl">✨</div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#D09E5A' }}>
                AI Personalization — Coming Soon
              </div>
              <h3 className="font-semibold mb-1" style={{ color: '#3B4B3F' }}>
                Your Family Profile Powers Everything
              </h3>
              <p className="text-sm" style={{ color: '#8A8070' }}>
                Once AI is enabled, your heritage profile will automatically populate meal plans with
                recipes from your family&apos;s cultures, tailor homeschool lessons to your kids&apos; grade levels,
                and generate personalized grocery lists within your budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
