"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, BookOpen, Calendar, Lightbulb, RefreshCw, Heart } from "lucide-react";
import type { Database } from "@/types/database";
import type { BlueprintContent } from "@/types";
import Spinner from "@/components/ui/Spinner";

type Blueprint = Database["public"]["Tables"]["blueprints"]["Row"];

interface BlueprintViewProps {
  blueprint: Blueprint | null;
  familyName: string;
}

// ── Love Languages data ───────────────────────────────────────────────────────
const LOVE_LANGUAGES = [
  {
    key: "words",
    name: "Words of Affirmation",
    emoji: "💬",
    color: "var(--color-terracotta)",
    bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",
    tagline: "Your words are their inner voice.",
    ideas: [
      "Leave a handwritten note in their lunchbox or on their pillow tonight.",
      "Start tomorrow morning with one specific compliment — name something you actually noticed.",
      "Before bed, tell them one thing you're proud of from today. Be specific, not general.",
      "Start a small jar where you drop in a slip every time you catch them being kind or brave.",
    ],
  },
  {
    key: "quality-time",
    name: "Quality Time",
    emoji: "⏳",
    color: "var(--color-forest)",
    bg: "color-mix(in srgb, var(--color-forest) 7%, transparent)",
    tagline: "Presence is the present.",
    ideas: [
      "Give 10 minutes of undivided 'special time' — child picks the activity, no phone.",
      "Do one errand together this week. Let them narrate the whole trip.",
      "Cook one meal side-by-side. Let them have a real job in the kitchen.",
      "Read aloud before bed together — even older kids love being read to.",
    ],
  },
  {
    key: "physical-touch",
    name: "Physical Touch",
    emoji: "🤗",
    color: "var(--color-sage)",
    bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)",
    tagline: "Connection through closeness.",
    ideas: [
      "Greet them with a hug every morning before a single word about the day.",
      "High-five or fist-bump every small win — make it a ritual.",
      "Give a back scratch or shoulder rub while they're reading or watching something.",
      "Surprise them with a big bear hug at pickup. Make it silly and warm.",
    ],
  },
  {
    key: "acts-of-service",
    name: "Acts of Service",
    emoji: "🛠",
    color: "var(--color-ochre)",
    bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",
    tagline: "Love looks like help.",
    ideas: [
      "Quietly finish something they're struggling with — without being asked.",
      "Set up their favorite activity before they wake up. No announcement needed.",
      "Handle one of their chores this week as a silent gift.",
      "Make their favorite snack and leave it somewhere they'll discover it.",
    ],
  },
  {
    key: "gifts",
    name: "Receiving Gifts",
    emoji: "🎁",
    color: "#7B6EA0",
    bg: "color-mix(in srgb, #7B6EA0 8%, transparent)",
    tagline: "It's the thought, not the price tag.",
    ideas: [
      "Leave a small treasure — a rock, a flower, a sticker — just because.",
      "Pick up their favorite snack on your next errand. No occasion needed.",
      "Make a handmade coupon book: movie night, stay-up-late pass, choose dinner.",
      "Frame a photo of a favorite memory together and leave it by their bed.",
    ],
  },
];

// ISO week number → which language is featured this week
function weeklyLanguageIndex(): number {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week  = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return week % LOVE_LANGUAGES.length;
}

const PILLAR_COLORS = [
  { bg: "color-mix(in srgb, var(--color-terracotta) 10%, transparent)", accent: "var(--color-terracotta)" },
  { bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)", accent: "var(--color-sage)" },
  { bg: "color-mix(in srgb, var(--color-ochre) 10%, transparent)", accent: "var(--color-ochre)" },
  { bg: "color-mix(in srgb, var(--color-forest) 10%, transparent)", accent: "var(--color-forest)" },
];

export default function BlueprintView({ blueprint, familyName }: BlueprintViewProps) {
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState("");

  // Auto-refresh while generating
  useEffect(() => {
    if (!blueprint || blueprint.status !== "generating") return;
    const id = setInterval(() => router.refresh(), 5000);
    return () => clearInterval(id);
  }, [blueprint, router]);

  async function handleRetry() {
    if (!blueprint) return;
    setRetrying(true);
    setRetryError("");
    const res = await fetch("/api/blueprint/retry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blueprintId: blueprint.id }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setRetryError(body.error || "Retry failed.");
      setRetrying(false);
    }
  }

  if (!blueprint || blueprint.status === "generating") {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" />
        <p className="font-serif text-xl" style={{ color: "var(--color-charcoal)" }}>
          Generating your blueprint…
        </p>
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          Hang tight — checking every 5 seconds.
        </p>
      </div>
    );
  }

  if (blueprint.status === "error") {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <p className="font-serif text-xl" style={{ color: "var(--color-charcoal)" }}>
          Blueprint generation failed
        </p>
        <p className="text-sm max-w-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          This is usually an AI service hiccup. Hit retry and it should work.
        </p>
        {retryError && (
          <p className="text-sm" style={{ color: "var(--color-terracotta)" }}>{retryError}</p>
        )}
        <button onClick={handleRetry} disabled={retrying} className="btn-primary gap-2">
          {retrying ? <Spinner size="sm" /> : <RefreshCw size={15} />}
          {retrying ? "Retrying…" : "Retry blueprint generation"}
        </button>
      </div>
    );
  }

  const content = blueprint.content as unknown as BlueprintContent;
  if (!content || !content.pillars) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
          Blueprint content not available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">

      <div className="mb-10">
        <span className="section-tag">Family Blueprint</span>
        <h1 className="font-serif text-3xl md:text-4xl font-light mb-3" style={{ color: "var(--color-charcoal)" }}>
          {familyName}
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
          {content.summary}
        </p>
        {content.affirmation && (
          <div
            className="mt-4 px-5 py-4 rounded-xl border-l-4"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",
              borderColor: "var(--color-ochre)",
            }}
          >
            <p className="font-serif italic text-base" style={{ color: "var(--color-charcoal)" }}>
              &ldquo;{content.affirmation}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Parenting Tips */}
      <ParentingTipsBox />

      {/* Pillars */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb size={18} style={{ color: "var(--color-terracotta)" }} />
          <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
            Your Support Pillars
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {content.pillars.map((pillar, i) => {
            const colors = PILLAR_COLORS[i % PILLAR_COLORS.length];
            return (
              <div
                key={pillar.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: colors.bg, border: `1px solid ${colors.bg}` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-4"
                  style={{ backgroundColor: colors.accent, color: "white" }}
                >
                  {i + 1}
                </div>
                <h3 className="font-serif text-lg mb-2" style={{ color: "var(--color-charcoal)" }}>
                  {pillar.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
                  {pillar.description}
                </p>
                <ul className="space-y-2">
                  {pillar.actions.map((action, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-charcoal)" }}>
                      <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: colors.accent }} />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weekly Rhythm */}
      {content.weeklyRhythm && content.weeklyRhythm.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar size={18} style={{ color: "var(--color-terracotta)" }} />
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              Your Weekly Rhythm
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {content.weeklyRhythm.map((day) => (
              <div key={day.day} className="card p-4 flex flex-col gap-2">
                <div className="rounded-lg px-2 py-1 text-center"
                  style={{ backgroundColor: "var(--color-sand)" }}>
                  <p className="text-xs font-semibold" style={{ color: "var(--color-charcoal)" }}>{day.day.slice(0, 3)}</p>
                </div>
                <p className="text-xs font-semibold leading-snug" style={{ color: "var(--color-terracotta)" }}>
                  {day.focus}
                </p>
                <ul className="space-y-1.5 flex-1">
                  {day.tasks.map((task, i) => (
                    <li key={i} className="text-xs leading-snug flex items-start gap-1"
                      style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>
                      <span className="shrink-0 mt-0.5" style={{ color: "var(--color-terracotta)" }}>·</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Love Languages */}
      <LoveLanguagesSection />

      {/* Meal Approach */}
      {content.mealApproach && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ fontSize: 18 }}>🍽</span>
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>Meal Approach</h2>
          </div>
          <div className="card p-6">
            <p className="text-sm leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--color-charcoal) 70%, transparent)" }}>
              {content.mealApproach.philosophy}
            </p>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--color-charcoal)" }}>
              Weekly anchor: <span className="font-normal">{content.mealApproach.weeklyAnchor}</span>
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Quick wins</p>
              <ul className="space-y-1.5">
                {content.mealApproach.quickWins.map((win, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-charcoal)" }}>
                    <span style={{ color: "var(--color-ochre)" }}>✓</span> {win}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Village Strategy */}
      {content.villageStrategy && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ fontSize: 18 }}>◎</span>
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>Village Strategy</h2>
          </div>
          <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--color-forest)", color: "var(--color-cream)" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(251,249,246,0.75)" }}>
              {content.villageStrategy.currentGap}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(251,249,246,0.5)" }}>
              Immediate actions
            </p>
            <ul className="space-y-2 mb-4">
              {content.villageStrategy.immediateActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-cream)" }}>
                  <span style={{ color: "var(--color-ochre)" }}>→</span> {action}
                </li>
              ))}
            </ul>
            <p className="text-sm italic" style={{ color: "rgba(251,249,246,0.6)" }}>
              {content.villageStrategy.longerTerm}
            </p>
          </div>
        </section>
      )}

      {/* Resources */}
      {content.resources && content.resources.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={18} style={{ color: "var(--color-terracotta)" }} />
            <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
              Curated Resources
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {content.resources.map((category) => (
              <div key={category.category} className="card p-6">
                <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--color-charcoal)" }}>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{item.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Love Languages Section ────────────────────────────────────────────────────
function LoveLanguagesSection() {
  const [activeIdx, setActiveIdx] = useState(weeklyLanguageIndex);

  const featured = LOVE_LANGUAGES[activeIdx];
  const prev = () => setActiveIdx((i) => (i - 1 + LOVE_LANGUAGES.length) % LOVE_LANGUAGES.length);
  const next = () => setActiveIdx((i) => (i + 1) % LOVE_LANGUAGES.length);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-2">
        <Heart size={18} style={{ color: "var(--color-terracotta)" }} />
        <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>
          Connection Ideas
        </h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
        Inspired by <em>The Five Love Languages</em> — rotating weekly so you never run out of ways to connect.
      </p>

      {/* Featured language card */}
      <div className="rounded-2xl p-6 mb-4" style={{ backgroundColor: featured.bg, border: `1px solid color-mix(in srgb, ${featured.color} 18%, transparent)` }}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{featured.emoji}</span>
              <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ backgroundColor: featured.color, color: "white" }}>
                This week
              </span>
            </div>
            <h3 className="font-serif text-xl mt-1" style={{ color: "var(--color-charcoal)" }}>{featured.name}</h3>
            <p className="text-sm italic mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 55%, transparent)" }}>
              {featured.tagline}
            </p>
          </div>
          <div className="flex gap-1 shrink-0">
            <button onClick={prev}
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:bg-white/60 text-sm"
              style={{ borderColor: `color-mix(in srgb, ${featured.color} 25%, transparent)`, color: featured.color }}>
              ‹
            </button>
            <button onClick={next}
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:bg-white/60 text-sm"
              style={{ borderColor: `color-mix(in srgb, ${featured.color} 25%, transparent)`, color: featured.color }}>
              ›
            </button>
          </div>
        </div>

        <ul className="space-y-2.5">
          {featured.ideas.map((idea, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: featured.color, color: "white" }}>
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{idea}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* All five as compact pills */}
      <div className="flex flex-wrap gap-2">
        {LOVE_LANGUAGES.map((lang, i) => (
          <button key={lang.key} onClick={() => setActiveIdx(i)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
            style={{
              backgroundColor: activeIdx === i ? lang.color : "transparent",
              color: activeIdx === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: activeIdx === i ? lang.color : "var(--color-sand)",
            }}>
            <span>{lang.emoji}</span> {lang.name}
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Parenting Tips — sourced from leading early childhood books ───────────────
interface ParentingTip {
  book: string;
  author: string;
  color: string;
  bg: string;
  tip: string;
}

const PARENTING_TIPS: ParentingTip[] = [
  // The Whole-Brain Child — Siegel & Bryson
  { book: "The Whole-Brain Child",           author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",  tip: "Connect first, redirect second. When a child is upset, the emotional brain is running the show — logic won't land until you acknowledge the feeling first." },
  { book: "The Whole-Brain Child",           author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",  tip: "Name it to tame it: help your child put words to what they're feeling. Naming an emotion activates the thinking brain and literally calms the body." },
  { book: "The Whole-Brain Child",           author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",  tip: "Move it to lose it — when big emotions hit, physical movement (jumping, running, even a walk) helps the nervous system discharge stress and return to calm." },

  // No-Drama Discipline — Siegel & Bryson
  { book: "No-Drama Discipline",             author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",        tip: "Ask yourself: 'Is my child giving me a hard time, or having a hard time?' The answer completely changes what your response should be." },
  { book: "No-Drama Discipline",             author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",        tip: "Discipline means teaching, not punishing. The goal isn't compliance — it's building the skills your child needs to handle life better next time." },
  { book: "No-Drama Discipline",             author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",        tip: "Reframe misbehavior as a teachable moment, not a battle. Kids' brains aren't fully developed — they genuinely need your help learning to regulate." },

  // How to Talk So Kids Will Listen — Faber & Mazlish
  { book: "How to Talk So Kids Will Listen & Listen So Kids Will Talk", author: "Adele Faber & Elaine Mazlish", color: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)", tip: "Instead of denying a feeling ('you're fine'), acknowledge it: 'That sounds really frustrating.' Children who feel heard are far more likely to cooperate." },
  { book: "How to Talk So Kids Will Listen & Listen So Kids Will Talk", author: "Adele Faber & Elaine Mazlish", color: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)", tip: "Describe the problem instead of blaming the child. 'There's a wet towel on the floor' invites action. 'You always leave a mess' invites defensiveness." },
  { book: "How to Talk So Kids Will Listen & Listen So Kids Will Talk", author: "Adele Faber & Elaine Mazlish", color: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)", tip: "Give children choices within limits — it honors their need for autonomy while keeping you in the driver's seat. 'Bath now or in five minutes?'" },

  // The Power of Showing Up — Siegel & Bryson
  { book: "The Power of Showing Up",         author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-forest)",     bg: "color-mix(in srgb, var(--color-forest) 7%, transparent)",       tip: "Children need to feel safe, seen, soothed, and secure. You don't have to be perfect — you just have to show up. Repair after rupture matters more than avoiding rupture." },
  { book: "The Power of Showing Up",         author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-forest)",     bg: "color-mix(in srgb, var(--color-forest) 7%, transparent)",       tip: "A genuine 'I handled that wrong earlier and I'm sorry' teaches your child more about relationships than any deliberate lesson could." },
  { book: "The Power of Showing Up",         author: "Daniel J. Siegel & Tina Payne Bryson",   color: "var(--color-forest)",     bg: "color-mix(in srgb, var(--color-forest) 7%, transparent)",       tip: "Secure attachment isn't built in the big moments — it's built in thousands of small, consistent moments of presence and responsiveness." },

  // Peaceful Parent, Happy Kids — Laura Markham
  { book: "Peaceful Parent, Happy Kids",     author: "Dr. Laura Markham",                       color: "#7B6EA0",                 bg: "color-mix(in srgb, #7B6EA0 8%, transparent)",                    tip: "You can't regulate your child's emotions if you can't regulate your own. Your nervous system is the co-regulator. Pause before you parent." },
  { book: "Peaceful Parent, Happy Kids",     author: "Dr. Laura Markham",                       color: "#7B6EA0",                 bg: "color-mix(in srgb, #7B6EA0 8%, transparent)",                    tip: "Every time you set a limit with empathy instead of anger, you're building your child's emotional intelligence — and your own relationship." },
  { book: "Peaceful Parent, Happy Kids",     author: "Dr. Laura Markham",                       color: "#7B6EA0",                 bg: "color-mix(in srgb, #7B6EA0 8%, transparent)",                    tip: "Special one-on-one time — even 10 minutes a day of your child leading the play — fills their connection tank and reduces acting-out dramatically." },

  // Simplicity Parenting — Kim John Payne
  { book: "Simplicity Parenting",            author: "Kim John Payne",                          color: "var(--color-sage)",       bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)",         tip: "Too many toys, choices, and activities overwhelms children's nervous systems. Simplify their environment and watch their focus, creativity, and calm increase." },
  { book: "Simplicity Parenting",            author: "Kim John Payne",                          color: "var(--color-sage)",       bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)",         tip: "Rhythm is the gift of predictability. When children know what to expect throughout their day, they feel safe enough to relax and just be kids." },
  { book: "Simplicity Parenting",            author: "Kim John Payne",                          color: "var(--color-sage)",       bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)",         tip: "Protect childhood from the pace of adulthood. Children are not small adults — they need unhurried time, outdoor freedom, and imaginative unscheduled play." },

  // Hunt, Gather, Parent — Michaeleen Doucleff
  { book: "Hunt, Gather, Parent",            author: "Michaeleen Doucleff",                     color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",   tip: "Invite children to work alongside you — not as a lesson, just as a natural part of life. Kids who contribute feel a sense of belonging that no reward chart can replicate." },
  { book: "Hunt, Gather, Parent",            author: "Michaeleen Doucleff",                     color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",   tip: "Minimize praise and commands. Instead, model calmly, stay physically close, and let children observe and join in. Cooperation grows out of connection, not instruction." },

  // Positive Discipline — Jane Nelsen
  { book: "Positive Discipline",             author: "Jane Nelsen",                             color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Children do better when they feel better. Punishment makes them feel worse — and a child who feels bad behaves worse. Kind and firm is the goal." },
  { book: "Positive Discipline",             author: "Jane Nelsen",                             color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Involve children in creating the family's agreements and routines. When they help make the rules, they're far more likely to follow them." },
  { book: "Positive Discipline",             author: "Jane Nelsen",                             color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Mistakes are wonderful opportunities to learn — for children and parents. Model how to handle mistakes gracefully rather than hiding or punishing them." },

  // Mind in the Making — Ellen Galinsky
  { book: "Mind in the Making",              author: "Ellen Galinsky",                          color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Focus and self-control are the foundation of all learning — and they're built through play, not drilling. Every game of Simon Says or hide-and-seek is a brain-building exercise." },
  { book: "Mind in the Making",              author: "Ellen Galinsky",                          color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Perspective-taking — understanding that others have different thoughts and feelings — is one of the most critical life skills a child can develop. Nurture it by asking 'How do you think she felt when that happened?'" },
  { book: "Mind in the Making",              author: "Ellen Galinsky",                          color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Children learn to take on challenges when adults model a 'not yet' mindset: struggling with something hard, staying with it, and saying out loud 'I haven't figured this out yet — but I will.'" },
  { book: "Mind in the Making",              author: "Ellen Galinsky",                          color: "var(--color-ochre)",      bg: "color-mix(in srgb, var(--color-ochre) 8%, transparent)",         tip: "Making connections — linking new information to what they already know — is how children build real understanding. Ask 'Does this remind you of anything?' instead of just 'What did you learn?'" },

  // Between Parent and Child — Haim Ginott
  { book: "Between Parent and Child",        author: "Dr. Haim G. Ginott",                      color: "var(--color-forest)",     bg: "color-mix(in srgb, var(--color-forest) 7%, transparent)",        tip: "Acknowledge the feeling before addressing the behavior. 'You're really angry right now' lands better than any instruction you can give in that moment." },
  { book: "Between Parent and Child",        author: "Dr. Haim G. Ginott",                      color: "var(--color-forest)",     bg: "color-mix(in srgb, var(--color-forest) 7%, transparent)",        tip: "Praise the effort and describe the action, not the child. 'You worked really hard on that' builds resilience. 'You're so smart' builds fragility." },

  // The Explosive Child — Ross Greene
  { book: "The Explosive Child",             author: "Dr. Ross W. Greene",                      color: "#7B6EA0",                 bg: "color-mix(in srgb, #7B6EA0 8%, transparent)",                    tip: "Kids do well when they can. If a child isn't doing well, they're missing a skill — not motivation. Identify the lagging skill, then teach it collaboratively." },
  { book: "The Explosive Child",             author: "Dr. Ross W. Greene",                      color: "#7B6EA0",                 bg: "color-mix(in srgb, #7B6EA0 8%, transparent)",                    tip: "Solve problems with children, not for them or to them. Collaborative problem-solving builds trust and produces solutions that actually stick." },

  // Raising Good Humans — Hunter Clarke-Fields
  { book: "Raising Good Humans",             author: "Hunter Clarke-Fields",                    color: "var(--color-sage)",       bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)",         tip: "Your mindfulness practice is your parenting practice. The more you can observe your own reactivity without acting on it, the more choice you have in hard moments." },
  { book: "Raising Good Humans",             author: "Hunter Clarke-Fields",                    color: "var(--color-sage)",       bg: "color-mix(in srgb, var(--color-sage) 10%, transparent)",         tip: "You don't have to fix your child's feelings — just be with them in those feelings. Presence is regulation. Presence is enough." },

  // The Montessori Toddler — Simone Davies
  { book: "The Montessori Toddler",          author: "Simone Davies",                           color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",   tip: "Slow down and observe before intervening. Children are naturally motivated to learn and master their environment — your job is to prepare the space, then trust the process." },
  { book: "The Montessori Toddler",          author: "Simone Davies",                           color: "var(--color-terracotta)", bg: "color-mix(in srgb, var(--color-terracotta) 8%, transparent)",   tip: "Get on their level — literally. Kneel down to make eye contact when talking with young children. It signals respect and makes connection possible." },
];

function dailyTipIndex(): number {
  const now        = new Date();
  const start      = new Date(now.getFullYear(), 0, 0);
  const dayOfYear  = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return dayOfYear % PARENTING_TIPS.length;
}

function ParentingTipsBox() {
  const [idx, setIdx] = useState(dailyTipIndex);

  const tip    = PARENTING_TIPS[idx % PARENTING_TIPS.length];
  const prev   = () => setIdx((i) => (i - 1 + PARENTING_TIPS.length) % PARENTING_TIPS.length);
  const next   = () => setIdx((i) => (i + 1) % PARENTING_TIPS.length);

  return (
    <div className="mb-10 rounded-2xl border overflow-hidden"
      style={{ borderColor: "color-mix(in srgb, var(--color-charcoal) 8%, transparent)" }}>

      {/* Header */}
      <div className="px-5 py-3.5 flex items-center justify-between gap-3"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-charcoal) 4%, transparent)", borderBottom: "1px solid color-mix(in srgb, var(--color-charcoal) 7%, transparent)" }}>
        <div className="flex items-center gap-2">
          <span className="text-base">📚</span>
          <p className="font-serif text-base font-medium" style={{ color: "var(--color-charcoal)" }}>From the Bookshelf</p>
          <span className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 38%, transparent)" }}>— a new tip every day</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px]" style={{ color: "color-mix(in srgb, var(--color-charcoal) 35%, transparent)" }}>
            {(idx % PARENTING_TIPS.length) + 1} / {PARENTING_TIPS.length}
          </span>
          <div className="flex gap-1">
            <button onClick={prev}
              className="w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-colors hover:bg-black/5"
              style={{ borderColor: "var(--color-sand)", color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
              ‹
            </button>
            <button onClick={next}
              className="w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-colors hover:bg-black/5"
              style={{ borderColor: "var(--color-sand)", color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Tip body */}
      <div className="px-6 py-5" style={{ backgroundColor: tip.bg }}>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-charcoal)" }}>
          &ldquo;{tip.tip}&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-8 rounded-full shrink-0" style={{ backgroundColor: tip.color }} />
          <div>
            <p className="text-xs font-semibold leading-tight" style={{ color: tip.color }}>{tip.book}</p>
            <p className="text-[10px] mt-0.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 45%, transparent)" }}>{tip.author}</p>
          </div>
        </div>
      </div>

      {/* Book pill strip */}
      <div className="px-4 py-3 flex flex-wrap gap-1.5 overflow-x-auto"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--color-charcoal) 7%, transparent)", backgroundColor: "white" }}>
        {Array.from(new Set(PARENTING_TIPS.map((t) => t.book))).map((book) => {
          const bookTip  = PARENTING_TIPS.find((t) => t.book === book)!;
          const bookIdx  = PARENTING_TIPS.findIndex((t) => t.book === book);
          const isCurrent = PARENTING_TIPS[idx % PARENTING_TIPS.length].book === book;
          return (
            <button key={book} onClick={() => setIdx(bookIdx)}
              className="text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all whitespace-nowrap"
              style={{
                backgroundColor: isCurrent ? bookTip.color : "transparent",
                color: isCurrent ? "white" : "color-mix(in srgb, var(--color-charcoal) 55%, transparent)",
                borderColor: isCurrent ? bookTip.color : "var(--color-sand)",
              }}>
              {book.length > 28 ? book.slice(0, 28) + "…" : book}
            </button>
          );
        })}
      </div>
    </div>
  );
}
