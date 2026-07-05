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

      {/* Family Resource Library */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={18} style={{ color: "var(--color-terracotta)" }} />
          <h2 className="font-serif text-2xl" style={{ color: "var(--color-charcoal)" }}>Family Resource Library</h2>
        </div>
        <p className="text-sm mb-8" style={{ color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>
          Curated guides for every dimension of family life — tap any card to explore.
        </p>
        <div className="space-y-5">
          <DateNightSection />
          <SelfCareSection />
          <ChildDevelopmentSection />
          <EatingRainbowSection />
          <GentleButFirmSection />
          <FamilyMeetingSection />
          <SleepScienceSection />
        </div>
      </section>
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

// ── Shared expand/collapse card shell ────────────────────────────────────────
function ResourceCard({
  emoji, title, tagline, accentColor, children,
}: {
  emoji: string; title: string; tagline: string; accentColor: string; children: React.JSX.Element | React.JSX.Element[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border overflow-hidden transition-shadow hover:shadow-sm"
      style={{ borderColor: "color-mix(in srgb, var(--color-charcoal) 9%, transparent)" }}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors"
        style={{ backgroundColor: open ? `color-mix(in srgb, ${accentColor} 5%, transparent)` : "white" }}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl shrink-0">{emoji}</span>
          <div className="min-w-0">
            <p className="font-serif text-base font-medium leading-tight" style={{ color: "var(--color-charcoal)" }}>{title}</p>
            <p className="text-xs mt-0.5 truncate" style={{ color: "color-mix(in srgb, var(--color-charcoal) 48%, transparent)" }}>{tagline}</p>
          </div>
        </div>
        <span className="text-base shrink-0 transition-transform" style={{ color: accentColor, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: "color-mix(in srgb, var(--color-charcoal) 6%, transparent)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Date Night Ideas ──────────────────────────────────────────────────────────
const DATE_NIGHT_CATEGORIES = [
  {
    label: "At Home", emoji: "🏠",
    ideas: [
      "Cook a dish from a country neither of you has visited — pick one each and compete.",
      "DIY spa night: face masks, foot soaks, candles, no screens.",
      "Write letters to each other about your favorite memory from this year. Read them aloud.",
      "Play a strategy board game you've never tried. Winner picks next date.",
      "Stargazing — blanket on the driveway, Stellarium app, hot drinks.",
      "\"Restaurant night\" at home: set the table properly, dress up, phones away.",
      "Watch the documentary that's been on your list for months. Finally.",
      "Recreate your first date at home — same food, same music, same you.",
    ],
  },
  {
    label: "Out & About", emoji: "🗺",
    ideas: [
      "Farmer's market morning, then cook together with whatever you found.",
      "Take a class together: pottery, cooking, improv, salsa dancing.",
      "Museum after-dark event (most have them monthly).",
      "Drive somewhere neither of you has been — no plan, just explore.",
      "Sunrise or sunset hike to somewhere with a view.",
      "Concert or live music in the park — check local listings.",
      "Pick a neighborhood you've never walked through and just wander.",
    ],
  },
  {
    label: "Quick (30 min)", emoji: "⚡",
    ideas: [
      "15-minute walk with phones in pockets. Talk about something other than kids and logistics.",
      "Coffee or tea ritual: sit down, no phones, 20 minutes. That's it.",
      "Read the same short article or essay and discuss it. Pick any topic.",
      "\"High-low-buffalo\" of the week — each share your high, your low, and something unexpected.",
      "Sit outside together in the evening with a drink. No agenda.",
    ],
  },
];

function DateNightSection() {
  const [cat, setCat] = useState(0);
  const current = DATE_NIGHT_CATEGORIES[cat];
  return (
    <ResourceCard emoji="🌙" title="Date Night Ideas" tagline="Stay connected — in and out of the house" accentColor="var(--color-terracotta)">
      <div className="flex gap-2 mb-5 flex-wrap mt-2">
        {DATE_NIGHT_CATEGORIES.map((c, i) => (
          <button key={c.label} onClick={() => setCat(i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{
              backgroundColor: cat === i ? "var(--color-terracotta)" : "transparent",
              color: cat === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: cat === i ? "var(--color-terracotta)" : "var(--color-sand)",
            }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {current.ideas.map((idea, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ backgroundColor: "var(--color-terracotta)", color: "white" }}>{i + 1}</span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{idea}</p>
          </li>
        ))}
      </ul>
    </ResourceCard>
  );
}

// ── Parent Self-Care ──────────────────────────────────────────────────────────
const SELF_CARE_CATEGORIES = [
  {
    label: "Body", emoji: "🧘", color: "var(--color-sage)",
    tips: [
      "10-minute morning stretch before anyone else wakes up — protect this time fiercely.",
      "Walk around the block alone, even 15 minutes. It measurably lowers cortisol.",
      "Drink a full glass of water before coffee — your body is dehydrated every morning.",
      "Make one meal this week that's just for your taste. No compromise.",
      "Sleep before midnight three nights this week. This is non-negotiable.",
      "Put your feet on the ground outside (actual ground, not pavement) for 5 minutes.",
    ],
  },
  {
    label: "Mind", emoji: "🧠", color: "var(--color-forest)",
    tips: [
      "5-minute free-write: \"What do I need right now?\" Don't edit. Just write.",
      "Read 10 pages of something just for pleasure — not parenting, not productivity.",
      "Name one thing you're proud of from this week. Write it somewhere you'll see it.",
      "Voice memo yourself: say out loud what you wish someone would say to you today.",
      "Give yourself a 20-minute block to be genuinely bored. Stare out the window. Resist the phone.",
      "Identify one belief about yourself that you picked up in childhood and question it once.",
    ],
  },
  {
    label: "Social", emoji: "💛", color: "var(--color-ochre)",
    tips: [
      "Text one friend you haven't talked to in over a month — just to say you thought of them.",
      "Frame one solo errand this week as intentional recharge time, not just \"efficient\" time.",
      "Ask your partner: \"What do you need this week?\" and truly listen before responding.",
      "Let someone do something kind for you without deflecting it. Just say \"thank you.\"",
      "Share one real feeling with someone safe this week — not how you're \"doing,\" but how you're feeling.",
    ],
  },
  {
    label: "Quick Resets", emoji: "⚡", color: "var(--color-terracotta)",
    tips: [
      "4-7-8 breathing: inhale 4 counts, hold 7, exhale 8. Three cycles takes 60 seconds.",
      "90 seconds of natural light first thing in the morning — step outside before looking at your phone.",
      "Splash cold water on your face when you feel overwhelmed. It activates the dive reflex and slows your heart rate.",
      "Hum or sing for 30 seconds. Vagal nerve stimulation — it actually works.",
      "End one day this week when you said you would, even if there's more to do.",
      "Name 3 things you can physically see, 2 you can touch, 1 you can hear — instant grounding.",
    ],
  },
];

function SelfCareSection() {
  const [cat, setCat] = useState(0);
  const current = SELF_CARE_CATEGORIES[cat];
  return (
    <ResourceCard emoji="🌿" title="Parent Self-Care Tips" tagline="You can't pour from an empty cup — here's how to refill" accentColor="var(--color-sage)">
      <div className="flex gap-2 mb-5 flex-wrap mt-2">
        {SELF_CARE_CATEGORIES.map((c, i) => (
          <button key={c.label} onClick={() => setCat(i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{
              backgroundColor: cat === i ? c.color : "transparent",
              color: cat === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: cat === i ? c.color : "var(--color-sand)",
            }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {current.tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
            <span className="shrink-0 mt-0.5" style={{ color: current.color }}>✦</span>{tip}
          </li>
        ))}
      </ul>
    </ResourceCard>
  );
}

// ── Child Development Activities ──────────────────────────────────────────────
const DEV_AGES = [
  {
    label: "0–2", title: "Infant & Toddler",
    activities: [
      { name: "Narrate everything", desc: "\"Now I'm rinsing your hands with warm water.\" Language exposure at this stage is foundational — quantity and variety of words matter enormously." },
      { name: "Tummy time play", desc: "Use high-contrast toys or a mirror. Strengthens neck and core, and builds the visual tracking that reading will later depend on." },
      { name: "Peekaboo", desc: "The oldest game is also one of the best. It builds object permanence, attachment, and the understanding that things (and people) still exist when hidden." },
      { name: "Let them be messy", desc: "Allow self-feeding with fingers, banging pots, squishing food. Sensory exploration at this age builds neural pathways at a rate that never happens again." },
      { name: "Read anything aloud", desc: "The rhythm and cadence of your voice matters more than the words at this stage. Read your book to them. They won't care — but their brain will." },
    ],
  },
  {
    label: "3–5", title: "Preschool",
    activities: [
      { name: "Follow their pretend play", desc: "Don't direct it. Ask \"what should I be?\" and take a supporting role. Rich imaginative play is the primary way children this age process the world." },
      { name: "Real-life chores alongside you", desc: "Watering plants, stirring batter, sorting laundry. Not as help — as genuine participation. It builds competence and belonging." },
      { name: "Playdough and building", desc: "Squeezing, shaping, and stacking builds the hand strength that writing will later require. Much more effective than worksheets at this age." },
      { name: "\"What do you think would happen if...?\"", desc: "Ask this constantly. You're building scientific thinking and causal reasoning. Their answers will surprise you." },
      { name: "Build a fort", desc: "Then spend real time inside it with them. The enclosed, cozy space naturally encourages deep conversations and imaginative scenarios." },
    ],
  },
  {
    label: "6–8", title: "Early Elementary",
    activities: [
      { name: "Teach them to make one full meal", desc: "Scrambled eggs, toast, simple pasta. Something real. The pride of feeding the family is a genuine developmental milestone." },
      { name: "Strategy games", desc: "Uno, Spot It, Rummikub, Battleship — games requiring focus and turn-taking build executive function far better than drills." },
      { name: "Give them a small budget", desc: "Let them pick and manage one grocery item. The experience of real money and real decisions teaches math more concretely than worksheets." },
      { name: "Nature journaling", desc: "Draw what you see outside: plants, bugs, clouds, birds. It builds careful observation, a scientific habit of mind, and connection to place." },
      { name: "\"Would you rather\" conversations", desc: "On car rides, at dinner. They're actually practicing moral reasoning and perspective-taking — disguised as a silly game." },
    ],
  },
  {
    label: "9–12", title: "Tween",
    activities: [
      { name: "Give them real ownership", desc: "One household responsibility that is truly theirs — not assigned, not checked. Ownership teaches accountability in a way supervision never can." },
      { name: "Watch a documentary, then talk", desc: "Not a quiz. A genuine conversation. Ask what surprised them, what they disagreed with. You're modeling how to engage with information critically." },
      { name: "Let them teach you something", desc: "Seriously ask. \"Can you show me how to do that thing you love?\" Competence at this age needs witnesses — and you're the most important one." },
      { name: "Share something from your own childhood", desc: "Introduce them to music, books, or hobbies you loved at their age. The connection to your past self is surprisingly powerful for them." },
      { name: "Cook a full family meal together", desc: "Them leading. You assisting. Dinner they made themselves tastes better, and they'll remember making it long after they've forgotten what it was." },
    ],
  },
  {
    label: "13+", title: "Teen",
    activities: [
      { name: "Ask their opinion on real decisions", desc: "Not all decisions — real ones. Where to vacation. What to do about a family challenge. Their input being genuinely considered is deeply validating." },
      { name: "Travel somewhere new together", desc: "Even a day trip. Let them navigate, choose where to eat, manage the map. Competence in the real world builds identity." },
      { name: "Share something vulnerable", desc: "A mistake you made. A fear you have. Something you're still figuring out. It models emotional openness more powerfully than any conversation about it." },
      { name: "Get curious about their interest", desc: "Not to be cool. Not to monitor. Genuinely curious — ask questions, look things up. Being known by a parent is one of the most protective things for a teenager." },
      { name: "Protect their privacy", desc: "Keep their confidences. Don't share what they've told you without asking. A teenager who trusts you will keep talking to you." },
    ],
  },
];

function ChildDevelopmentSection() {
  const [age, setAge] = useState(0);
  const current = DEV_AGES[age];
  return (
    <ResourceCard emoji="🌱" title="Child Development Activities" tagline="Age-appropriate activities rooted in developmental science" accentColor="var(--color-forest)">
      <div className="flex gap-2 mb-5 flex-wrap mt-2">
        {DEV_AGES.map((a, i) => (
          <button key={a.label} onClick={() => setAge(i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{
              backgroundColor: age === i ? "var(--color-forest)" : "transparent",
              color: age === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: age === i ? "var(--color-forest)" : "var(--color-sand)",
            }}>
            {a.label} <span className="ml-1 opacity-70">{a.title}</span>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {current.activities.map((act, i) => (
          <div key={i} className="rounded-xl p-4"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 5%, transparent)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-forest)" }}>{act.name}</p>
            <p className="text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 68%, transparent)" }}>{act.desc}</p>
          </div>
        ))}
      </div>
    </ResourceCard>
  );
}

// ── Eating the Rainbow ────────────────────────────────────────────────────────
const RAINBOW_COLORS = [
  {
    label: "Red", emoji: "🔴", hex: "#D64C4C",
    foods: "Strawberries · Tomatoes · Red bell peppers · Watermelon · Beets · Cherries",
    nutrients: "Lycopene · Vitamin C · Quercetin",
    benefit: "Heart health, reduced inflammation, immune function, and cancer-protective properties from lycopene — especially powerful when tomatoes are cooked.",
    familyIdea: "Make tomato sauce from scratch on a weekend. Kids who make it actually eat it — and cook time concentrates lycopene by up to 5×.",
  },
  {
    label: "Orange", emoji: "🟠", hex: "#E07B39",
    foods: "Carrots · Sweet potatoes · Cantaloupe · Pumpkin · Mango · Apricots",
    nutrients: "Beta-carotene · Vitamin A · Potassium",
    benefit: "Beta-carotene converts to vitamin A, supporting eye health, immune defense, and skin integrity. Fat-soluble — pair with healthy fats for better absorption.",
    familyIdea: "Roast sweet potato wedges with olive oil — the fat boosts beta-carotene absorption by 3-5× compared to eating them plain.",
  },
  {
    label: "Yellow", emoji: "🟡", hex: "#D4A017",
    foods: "Corn · Yellow squash · Pineapple · Bananas · Yellow peppers · Golden beets",
    nutrients: "Lutein · Zeaxanthin · Vitamin B6 · Bromelain",
    benefit: "Lutein and zeaxanthin concentrate in the eye's macula, protecting against macular degeneration. B6 supports brain development and mood regulation.",
    familyIdea: "Smoothies are the most painless way to get yellow foods into picky eaters — pineapple, banana, and mango blend into almost anything.",
  },
  {
    label: "Green", emoji: "💚", hex: "#4A8C5C",
    foods: "Spinach · Broccoli · Kale · Avocado · Peas · Cucumbers · Kiwi · Bok choy",
    nutrients: "Folate · Magnesium · Iron · Chlorophyll · Vitamin K · Calcium",
    benefit: "Folate is critical for cell division and fetal development. Magnesium is involved in 300+ enzymatic reactions. Chlorophyll supports detox pathways and oxygenation.",
    familyIdea: "The \"superpower smoothie\" — blend spinach with banana, frozen mango, and almond milk. Name it together. It turns green and kids think that's amazing.",
  },
  {
    label: "Blue / Purple", emoji: "🫐", hex: "#5B4DA0",
    foods: "Blueberries · Purple cabbage · Eggplant · Concord grapes · Blackberries · Acai",
    nutrients: "Anthocyanins · Resveratrol · Vitamin C · Manganese",
    benefit: "Anthocyanins are among the most potent antioxidants known. They cross the blood-brain barrier and are directly linked to improved memory, learning, and cognitive aging.",
    familyIdea: "Blueberry pancakes are literally brain food. Kids eat them enthusiastically. Frozen blueberries work just as well as fresh — and are often more nutritious.",
  },
  {
    label: "White / Brown", emoji: "⚪", hex: "#8B7355",
    foods: "Garlic · Onions · Cauliflower · Mushrooms · Pears · Bananas · White beans",
    nutrients: "Allicin (garlic) · Quercetin · Selenium · Beta-glucan (mushrooms)",
    benefit: "Often overlooked, but garlic's allicin is one of the most potent anti-viral, anti-bacterial compounds in food. Mushrooms are one of the few food sources of vitamin D.",
    familyIdea: "Roasted cauliflower with garlic, olive oil, and salt — it caramelizes into something surprising. A reliable crowd-pleaser even for vegetable skeptics.",
  },
];

function EatingRainbowSection() {
  const [color, setColor] = useState(0);
  const c = RAINBOW_COLORS[color];
  return (
    <ResourceCard emoji="🌈" title="Food Science: Eating the Rainbow" tagline="Why color variety in food is backed by deep nutrition science" accentColor="var(--color-ochre)">
      <div className="flex gap-2 mb-5 flex-wrap mt-2">
        {RAINBOW_COLORS.map((rc, i) => (
          <button key={rc.label} onClick={() => setColor(i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
            style={{
              backgroundColor: color === i ? rc.hex : "transparent",
              color: color === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: color === i ? rc.hex : "var(--color-sand)",
            }}>
            {rc.emoji} {rc.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl p-5" style={{ backgroundColor: `color-mix(in srgb, ${c.hex} 7%, transparent)`, borderLeft: `3px solid ${c.hex}` }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: c.hex }}>Foods</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-charcoal)" }}>{c.foods}</p>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: c.hex }}>Key Nutrients</p>
        <p className="text-sm mb-4" style={{ color: "var(--color-charcoal)" }}>{c.nutrients}</p>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: c.hex }}>Why it matters</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "color-mix(in srgb, var(--color-charcoal) 68%, transparent)" }}>{c.benefit}</p>
        <div className="rounded-lg p-3 flex items-start gap-2"
          style={{ backgroundColor: `color-mix(in srgb, ${c.hex} 12%, transparent)` }}>
          <span className="text-base shrink-0">👨‍👩‍👧</span>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-charcoal)" }}><strong>Family idea:</strong> {c.familyIdea}</p>
        </div>
      </div>
    </ResourceCard>
  );
}

// ── Gentle but Firm Parenting ─────────────────────────────────────────────────
const GENTLE_TIPS = [
  {
    scenario: "When they say \"I hate you\"",
    response: "\"I know you're really angry. I love you even when you're this upset.\"",
    why: "This is a regulation request, not a declaration. Don't take the bait — holding steady teaches them that relationships survive big feelings.",
  },
  {
    scenario: "When they won't calm down",
    response: "Get close, get low, speak quietly.",
    why: "Loud environment + loud parent = more chaos. Your nervous system is their co-regulator. Lower your voice to lower the temperature of the room.",
  },
  {
    scenario: "When they say \"that's not fair\"",
    response: "\"You're right, it isn't the same — it doesn't need to be. I'm trying to give everyone what they need, not give everyone the same thing.\"",
    why: "This reframes fairness from equality to equity — a life skill worth teaching early.",
  },
  {
    scenario: "When you need to set a limit",
    response: "\"I won't let you [action]. I can see you need [need]. Let's find another way.\"",
    why: "This structure acknowledges the need behind the behavior while holding the boundary — much more effective than \"stop it\" alone.",
  },
  {
    scenario: "When they push back on a rule",
    response: "\"I understand you don't like this rule. It's still the rule. Can we talk about why, later, when we're both calm?\"",
    why: "This honors their need to be heard without negotiating in the heat of the moment, and keeps the door open for real dialogue.",
  },
  {
    scenario: "Before a hard transition",
    response: "Give a 2-minute warning, then a 1-minute warning.",
    why: "Transitions are genuinely hard for young brains — the prefrontal cortex that manages switching isn't developed yet. They're not being difficult. They're being young.",
  },
  {
    scenario: "When you lose your temper",
    response: "\"I raised my voice and that was wrong. I'm sorry. Let me try again.\"",
    why: "Model the repair as loudly as you modeled the rupture. The repair IS the lesson — more than the original mistake.",
  },
  {
    scenario: "Instead of \"stop crying\"",
    response: "\"You're allowed to cry. I'm right here.\"",
    why: "Suppressing emotions doesn't teach regulation — it just teaches them to hide feelings. Presence without fixing is the most powerful response.",
  },
  {
    scenario: "Saying no with empathy",
    response: "\"I know you really want that. AND we still need to [action].\"",
    why: "The word \"and\" instead of \"but\" preserves both truths at once. It doesn't erase their feeling to enforce the limit.",
  },
];

function GentleButFirmSection() {
  const [idx, setIdx] = useState(0);
  const tip = GENTLE_TIPS[idx];
  return (
    <ResourceCard emoji="🌳" title="Gentle but Firm Parenting" tagline="Real scripts for real moments — connection without losing the limit" accentColor="var(--color-forest)">
      <div className="mt-2 mb-4 flex items-center justify-between">
        <p className="text-xs" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Scenario {idx + 1} of {GENTLE_TIPS.length}</p>
        <div className="flex gap-1">
          <button onClick={() => setIdx((i) => (i - 1 + GENTLE_TIPS.length) % GENTLE_TIPS.length)}
            className="w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-colors hover:bg-black/5"
            style={{ borderColor: "var(--color-sand)", color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>‹</button>
          <button onClick={() => setIdx((i) => (i + 1) % GENTLE_TIPS.length)}
            className="w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-colors hover:bg-black/5"
            style={{ borderColor: "var(--color-sand)", color: "color-mix(in srgb, var(--color-charcoal) 50%, transparent)" }}>›</button>
        </div>
      </div>
      <div className="rounded-xl p-5 mb-4"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 6%, transparent)", borderLeft: "3px solid var(--color-forest)" }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>When…</p>
        <p className="font-serif text-base mb-4" style={{ color: "var(--color-charcoal)" }}>{tip.scenario}</p>
        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-forest)" }}>Try saying…</p>
        <p className="text-sm font-medium italic leading-relaxed mb-4" style={{ color: "var(--color-charcoal)" }}>{tip.response}</p>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "color-mix(in srgb, var(--color-charcoal) 40%, transparent)" }}>Why it works</p>
        <p className="text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>{tip.why}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {GENTLE_TIPS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="w-6 h-6 rounded-full text-[10px] font-bold border transition-all"
            style={{
              backgroundColor: idx === i ? "var(--color-forest)" : "transparent",
              color: idx === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 40%, transparent)",
              borderColor: idx === i ? "var(--color-forest)" : "var(--color-sand)",
            }}>{i + 1}</button>
        ))}
      </div>
    </ResourceCard>
  );
}

// ── Family Meeting Starters ───────────────────────────────────────────────────
const MEETING_AGENDAS = [
  {
    name: "Weekly Check-In (15 min)", emoji: "📋",
    steps: [
      { time: "2 min", item: "Rose, Bud, Thorn — each person shares one good thing, one thing to look forward to, one hard thing." },
      { time: "5 min", item: "Logistics: what's happening this week? Any schedule changes, events, or things people need?" },
      { time: "5 min", item: "One family focus for the week — something small you want to do or feel together." },
      { time: "2 min", item: "Appreciation round — each person names something they're grateful for about someone in the room." },
    ],
  },
  {
    name: "Problem-Solving Meeting (20 min)", emoji: "🔧",
    steps: [
      { time: "3 min", item: "Name the problem clearly, without blame. \"We're having trouble with [X]\" — not \"You always [X].\"" },
      { time: "5 min", item: "Everyone brainstorms solutions — no judgment, no editing. Write all of them down." },
      { time: "7 min", item: "Discuss which solutions could work and why. Let kids evaluate their own suggestions." },
      { time: "5 min", item: "Decide together on a plan to try. Set a date to check in on how it's going." },
    ],
  },
  {
    name: "Monthly Family Inventory (30 min)", emoji: "🗺",
    steps: [
      { time: "5 min", item: "Celebrate: what did the family do well this past month? What are you proud of together?" },
      { time: "8 min", item: "Energy check: on a scale of 1–10, how is everyone's energy? What's draining? What's filling?" },
      { time: "8 min", item: "Connection: did everyone feel seen and connected this month? What's one thing you wish happened more?" },
      { time: "7 min", item: "Intentions: what does the family want to prioritize next month? Each person picks one thing." },
      { time: "2 min", item: "Close with something fun — a silly question, a round of jokes, or a group hug." },
    ],
  },
];

function FamilyMeetingSection() {
  const [agenda, setAgenda] = useState(0);
  const current = MEETING_AGENDAS[agenda];
  return (
    <ResourceCard emoji="🗣️" title="Family Meeting Templates" tagline="Structures that make weekly check-ins something the whole family wants" accentColor="var(--color-ochre)">
      <div className="flex gap-2 mb-5 flex-wrap mt-2">
        {MEETING_AGENDAS.map((a, i) => (
          <button key={a.name} onClick={() => setAgenda(i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{
              backgroundColor: agenda === i ? "var(--color-ochre)" : "transparent",
              color: agenda === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: agenda === i ? "var(--color-ochre)" : "var(--color-sand)",
            }}>
            {a.emoji} {a.name}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {current.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 mt-0.5"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-ochre) 15%, transparent)", color: "var(--color-ochre)" }}>
              {step.time}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>{step.item}</p>
          </div>
        ))}
      </div>
    </ResourceCard>
  );
}

// ── Sleep Science for Families ────────────────────────────────────────────────
const SLEEP_SECTIONS = [
  {
    label: "For Parents", emoji: "🧑",
    tips: [
      { title: "Keep a consistent wake time", desc: "Your wake time anchors your circadian rhythm more than your bedtime does. Keep it the same even on weekends." },
      { title: "Light is the master clock", desc: "Get bright natural light within 30 minutes of waking — ideally outside. This sets your cortisol peak and makes melatonin release on time at night." },
      { title: "Wind down starts 60 minutes before bed", desc: "Dim lights, avoid screens (or use blue-light filters), lower room temperature to 65–68°F. Your body drops temperature to initiate sleep." },
      { title: "The 20-minute rule", desc: "If you can't sleep after 20 minutes, get up and do something calm in dim light until you feel sleepy. Lying in bed awake trains your brain to associate the bed with wakefulness." },
      { title: "Caffeine has a 6-hour half-life", desc: "A coffee at 2pm means half of it is still in your system at 8pm. Cut off caffeine by 1pm if you're struggling with sleep quality." },
    ],
  },
  {
    label: "Ages 0–3", emoji: "🍼",
    tips: [
      { title: "Sleep is not a behavior, it's a biological process", desc: "Young babies cannot \"choose\" to sleep. They are driven by circadian rhythm and sleep pressure — both of which take months to develop fully." },
      { title: "Establish a consistent bedtime routine by 6–8 weeks", desc: "Bath → feed → dim lights → sleep. The sequence signals what's coming next, even before the baby can understand language." },
      { title: "Watch for sleep windows", desc: "Put babies down at the first signs of tiredness — eye rubbing, yawning, looking away. Missing the window means cortisol kicks in and makes falling asleep harder." },
      { title: "Dark room = longer sleep", desc: "Blackout curtains dramatically improve nap length and night sleep for children under 3. Light signals \"wake time\" to a young brain." },
    ],
  },
  {
    label: "Ages 4–12", emoji: "🧒",
    tips: [
      { title: "Recommended hours by age", desc: "Ages 4–5: 10–13 hours. Ages 6–12: 9–12 hours. Most school-aged children are chronically under-slept — and it shows in behavior and focus." },
      { title: "Screens in the bedroom disrupt sleep", desc: "Even with the screen off. The presence of a device disrupts sleep quality due to notifications and the anticipation of them. Charge devices outside the bedroom." },
      { title: "Physical activity improves sleep quality significantly", desc: "Kids who move their bodies during the day fall asleep faster and stay asleep longer. 60 minutes of moderate activity is the target." },
      { title: "A predictable bedtime routine still matters at 10, 11, 12", desc: "Bath/shower, quiet activity (reading, journaling), lights out. The routine signals wind-down even for older children who \"don't need\" it." },
    ],
  },
  {
    label: "Teens", emoji: "🧑‍💻",
    tips: [
      { title: "Teens' sleep timing genuinely shifts biologically", desc: "The adolescent circadian clock shifts by 1–3 hours later. This is hormonal, not defiant. A teen who can't fall asleep before 11pm is largely working with biology." },
      { title: "Sleep deprivation mimics intoxication", desc: "17 hours awake = a 0.05% blood alcohol level for cognitive tasks. Most teens are making decisions and driving in this state routinely." },
      { title: "Recommended: 8–10 hours for teens", desc: "Most get 6–7. The chronic deficit accumulates across the week and affects mood, learning, immunity, and mental health — not just alertness." },
      { title: "Weekend sleep-ins don't fully compensate", desc: "\"Social jet lag\" — shifting sleep 2+ hours on weekends — disrupts the clock further. A 1-hour buffer is okay; 3-hour shifts hurt the following week." },
    ],
  },
];

function SleepScienceSection() {
  const [group, setGroup] = useState(0);
  const current = SLEEP_SECTIONS[group];
  return (
    <ResourceCard emoji="💤" title="Sleep Science for Families" tagline="Evidence-based sleep guidance for every age in your household" accentColor="var(--color-forest)">
      <div className="flex gap-2 mb-5 flex-wrap mt-2">
        {SLEEP_SECTIONS.map((s, i) => (
          <button key={s.label} onClick={() => setGroup(i)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{
              backgroundColor: group === i ? "var(--color-forest)" : "transparent",
              color: group === i ? "white" : "color-mix(in srgb, var(--color-charcoal) 60%, transparent)",
              borderColor: group === i ? "var(--color-forest)" : "var(--color-sand)",
            }}>
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {current.tips.map((tip, i) => (
          <div key={i} className="rounded-xl p-4"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-forest) 5%, transparent)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-forest)" }}>{tip.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--color-charcoal) 65%, transparent)" }}>{tip.desc}</p>
          </div>
        ))}
      </div>
    </ResourceCard>
  );
}

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
