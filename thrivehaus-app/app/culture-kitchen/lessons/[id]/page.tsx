'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/culture-kitchen/recipes';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  if (!recipe) notFound();
  return <LessonDetail recipe={recipe} />;
}

function LessonDetail({ recipe }: { recipe: NonNullable<ReturnType<typeof getRecipeById>> }) {
  const lesson = recipe.homeschoolLesson;
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [completedVocab, setCompletedVocab] = useState<Set<string>>(new Set());

  const toggleActivity = (i: number) => {
    setCompletedActivities((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleVocab = (word: string) => {
    setCompletedVocab((prev) => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      return next;
    });
  };

  const SUBJECT_ICONS: Record<string, string> = {
    'Science': '🔬', 'History': '📖', 'Geography': '🗺', 'Math': '📐',
    'Social Studies': '🌍', 'Health': '🥗', 'Language Arts': '✏️',
    'Science + History': '🔬', 'Geography + Biology': '🌿',
    'Science + World Cultures': '🌐', 'History + Chemistry': '⚗️',
    'History + Science': '🔬', 'Health + Fine Motor Skills': '✋',
    'Math + History': '📐', 'Geography + Math': '🗺',
    'History + Sensory Science': '👃', 'Science + Ancient History': '🏺',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#8A8070' }}>
        <Link href="/culture-kitchen" className="hover:underline">Home</Link>
        <span>›</span>
        <Link href={`/culture-kitchen/cultures/${recipe.cultureId}`} className="hover:underline">{recipe.cultureName}</Link>
        <span>›</span>
        <Link href={`/culture-kitchen/recipes/${recipe.id}`} className="hover:underline">{recipe.name}</Link>
        <span>›</span>
        <span style={{ color: '#3B4B3F' }}>Homeschool Lesson</span>
      </div>

      {/* Hero */}
      <div className="rounded-3xl p-8 md:p-10 mb-8"
        style={{ background: 'linear-gradient(135deg, #3B4B3F, #5A6F5E)' }}>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="text-7xl">{recipe.emoji}</div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C8D8C4' }}>
              Homeschool Lesson
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-white mb-2">
              {SUBJECT_ICONS[lesson.subject] || '📚'} {lesson.subject}
            </h1>
            <p className="text-lg font-serif italic mb-4" style={{ color: '#C8D8C4' }}>
              Through the lens of {recipe.name}
            </p>
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#C8D8C4' }}>
              <span>🎂 Ages {lesson.ageRange}</span>
              <span>⏱ {lesson.duration} minutes</span>
              <span>🌍 {recipe.cultureName} Culture</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">

          {/* Main Activity */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4 flex items-center gap-2" style={{ color: '#3B4B3F' }}>
              🧪 Main Activity
            </h2>
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#F0F5F0' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#3B4B3F' }}>{lesson.activity}</p>
            </div>
          </div>

          {/* Discussion Questions */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h2 className="font-serif text-xl mb-4" style={{ color: '#3B4B3F' }}>
              💬 Discussion Questions
            </h2>
            <p className="text-xs mb-4" style={{ color: '#8A8070' }}>
              Tap a question to mark it as discussed
            </p>
            <div className="space-y-3">
              {lesson.discussion.map((q, i) => (
                <button key={i} onClick={() => toggleActivity(i)}
                  className="w-full text-left p-4 rounded-xl border transition-all"
                  style={{
                    backgroundColor: completedActivities.has(i) ? '#F0F5F0' : '#F3EFE9',
                    borderColor: completedActivities.has(i) ? '#C8D8C4' : '#E8DFD0',
                  }}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg shrink-0">
                      {completedActivities.has(i) ? '✅' : '💬'}
                    </span>
                    <p className="text-sm leading-relaxed"
                      style={{ color: completedActivities.has(i) ? '#8A8070' : '#4A4040' }}>
                      {q}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Connection to Recipe */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: '#FBF4E8', borderColor: '#E8CFA0' }}>
            <h2 className="font-serif text-xl mb-3" style={{ color: '#7A5A20' }}>
              🍳 Cook & Learn Together
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#7A5A20' }}>
              This lesson pairs best with making <strong>{recipe.name}</strong> together.
              Use the cooking process itself as a teaching moment — measure ingredients (math!),
              discuss the spices&apos; origins (geography!), and explore the preservation techniques (science!).
            </p>
            <div className="space-y-2">
              {recipe.kidHelperTasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#7A5A20' }}>
                  <span>⭐</span> {task}
                </div>
              ))}
            </div>
            <Link href={`/culture-kitchen/recipes/${recipe.id}`}
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#D09E5A', color: '#FFFDF9' }}>
              🍳 Open Recipe →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Fun Facts */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#3B4B3F' }}>🌟 Fun Facts</h3>
            <div className="space-y-3">
              {lesson.funFacts.map((fact, i) => (
                <div key={i} className="p-3 rounded-xl text-xs leading-relaxed"
                  style={{ backgroundColor: '#F3EFE9', color: '#5A5050' }}>
                  <span className="font-bold mr-1">#{i + 1}</span> {fact}
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#3B4B3F' }}>📝 Vocabulary</h3>
            <p className="text-xs mb-3" style={{ color: '#8A8070' }}>Tap a word once your child knows the definition</p>
            <div className="space-y-2">
              {lesson.vocabulary.map((vocab) => (
                <button key={vocab.word} onClick={() => toggleVocab(vocab.word)}
                  className="w-full text-left p-3 rounded-xl border transition-all"
                  style={{
                    backgroundColor: completedVocab.has(vocab.word) ? '#E8F0E8' : '#F3EFE9',
                    borderColor: completedVocab.has(vocab.word) ? '#C8D8C4' : '#E8DFD0',
                  }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs" style={{ color: '#3B4B3F' }}>{vocab.word}</span>
                    {completedVocab.has(vocab.word) && <span className="text-green-600 text-xs">✓ learned</span>}
                  </div>
                  <p className="text-xs" style={{ color: '#6B6060' }}>{vocab.definition}</p>
                </button>
              ))}
            </div>
            {lesson.vocabulary.length > 0 && (
              <p className="text-xs mt-3 text-center" style={{ color: '#8A8070' }}>
                {completedVocab.size}/{lesson.vocabulary.length} words learned
              </p>
            )}
          </div>

          {/* Related Subjects */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#FFFDF9', borderColor: '#E8DFD0' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#3B4B3F' }}>🔗 Also Covers</h3>
            <div className="flex flex-wrap gap-2">
              {['History', 'Science', 'Geography', 'Math', 'Social Studies', 'Language Arts'].map((subj) => (
                <span key={subj} className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: '#F3EFE9', color: '#5A6F5E' }}>
                  {subj}
                </span>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#F0F5F0', borderColor: '#C8D8C4' }}>
            <h3 className="font-semibold mb-2" style={{ color: '#3B4B3F' }}>📊 Lesson Progress</h3>
            <div className="space-y-2 text-sm" style={{ color: '#5A6F5E' }}>
              <div className="flex justify-between">
                <span>Discussion</span>
                <span>{completedActivities.size}/{lesson.discussion.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Vocabulary</span>
                <span>{completedVocab.size}/{lesson.vocabulary.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
