export type ScoreKey = "childcare" | "learning" | "household" | "emotional" | "expert";

export const defaultScores: Record<ScoreKey, number> = {
  childcare: 0,
  learning: 0,
  household: 0,
  emotional: 0,
  expert: 0,
};

export const dimensions: { key: ScoreKey; label: string; color: string; description: string }[] = [
  { key: "childcare", label: "Childcare & Playdates",      color: "#C26D50", description: "Shared childcare, drop-in help, and playdate reciprocity" },
  { key: "learning",  label: "Learning & Education",        color: "#D09E5A", description: "Education pods, homeschool support, and learning mentors" },
  { key: "household", label: "Household Operations",        color: "#5A6F5E", description: "Meal swaps, skill-sharing, and neighborhood logistics" },
  { key: "emotional", label: "Emotional & Peer Connection", color: "#3B4B3F", description: "Community belonging, parent friendships, and peer support" },
  { key: "expert",    label: "Expert Guidance",             color: "#D09E5A", description: "Doulas, coaches, tutors, and family specialists" },
];

export function villageLabel(total: number) {
  if (total < 15) return "Your village is just beginning to form.";
  if (total < 30) return "You have a foundation. Let's grow it.";
  if (total < 42) return "Your village is strong — keep nurturing it.";
  return "Thriving. You built the village. 🏡";
}
