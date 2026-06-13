export type AttendanceStatus =
  | "present" | "absent" | "field-trip" | "nature-day"
  | "sick" | "independent" | "family-learning" | "none";

export const attendanceConfig: Record<AttendanceStatus, { label: string; color: string; bg: string }> = {
  present:          { label: "Present",           color: "#5A6F5E", bg: "#D4E3D8" },
  absent:           { label: "Absent",            color: "#9A9790", bg: "#E8E7E5" },
  "field-trip":     { label: "Field Trip",        color: "#D09E5A", bg: "#F5E5C0" },
  "nature-day":     { label: "Nature Day",        color: "#3B4B3F", bg: "#C5D9C5" },
  sick:             { label: "Sick Day",          color: "#C26D50", bg: "#F0D5CB" },
  independent:      { label: "Independent Study", color: "#7B6EA0", bg: "#E8E4F5" },
  "family-learning":{ label: "Family Learning",   color: "#A25540", bg: "#F5D8D0" },
  none:             { label: "—",                 color: "#C0BEBB", bg: "transparent" },
};

export const SUBJECTS = [
  "Language Arts", "Mathematics", "Science", "History", "Art",
  "Nature Study", "Music", "Physical Education", "Life Skills",
];

export const EVIDENCE_TYPES = ["photo", "writing", "art", "project", "field-trip", "reading-log"];

export const AI_PORTFOLIO_LANGUAGE: Record<string, string> = {
  photo:           "Student demonstrated hands-on engagement and applied learning through documented activity. Evidence reflects developing practical skills and real-world application of academic concepts.",
  writing:         "Student produced written work demonstrating comprehension, voice, and growing command of written conventions. Notable development in structure, clarity, and original expression.",
  art:             "Student engaged in creative visual expression, demonstrating aesthetic sensibility and fine motor development. Work evidences growing capacity for intentional artistic decision-making.",
  project:         "Student engaged in extended project-based learning, applying research skills and synthesizing information across multiple subject areas.",
  "field-trip":    "Student participated in experiential learning through community-based activity. Subsequent reflection demonstrated strong synthesis, observation, and personal connection to learning.",
  "reading-log":   "Student maintained consistent independent reading practice, demonstrating growing reading stamina, comprehension, and literary appreciation.",
};

export const CURRICULUM_LIBRARY = [
  { id: 1, title: "Ambleside Online",          category: "free",        style: "Charlotte Mason",     description: "A free Charlotte Mason curriculum with rich book lists, nature study, and gentle structure.", ages: "6–18", cost: "Free" },
  { id: 2, title: "Khan Academy",              category: "free",        style: "Self-paced",           description: "World-class math and science instruction. Excellent supplement for any homeschool style.", ages: "4–18", cost: "Free" },
  { id: 3, title: "All About Reading",         category: "low-cost",    style: "Structured literacy",  description: "A systematic, phonics-based reading program. Highly effective for emerging readers.", ages: "4–10", cost: "$40–$80/level" },
  { id: 4, title: "Math-U-See",               category: "hands-on",    style: "Mastery",              description: "Manipulative-based math curriculum that builds deep conceptual understanding.", ages: "5–15", cost: "$40–$140/level" },
  { id: 5, title: "Story of the World",        category: "open-and-go", style: "Classical",            description: "Narrative history curriculum for elementary. Beautiful read-alouds with activity guides.", ages: "6–14", cost: "$20–$35" },
  { id: 6, title: "Moving Beyond the Page",   category: "open-and-go", style: "Integrated",           description: "Literature-based, integrated curriculum with clear daily lessons.", ages: "4–14", cost: "$75–$150/unit" },
  { id: 7, title: "Oak Meadow",               category: "waldorf",     style: "Waldorf-inspired",     description: "Gentle, arts-infused curriculum rooted in Waldorf philosophy.", ages: "5–12", cost: "$300–$500/year" },
  { id: 8, title: "Wild + Free",              category: "nature",      style: "Nature-based",         description: "Community and curriculum resources for nature-based, slow homeschooling families.", ages: "4–14", cost: "$10–$40" },
  { id: 9, title: "Sonlight",                 category: "faith",       style: "Literature-based",     description: "Christian, literature-rich curriculum with comprehensive book packages.", ages: "5–18", cost: "$400–$800/year" },
  { id: 10, title: "Torchlight Curriculum",   category: "secular",     style: "Charlotte Mason",      description: "Secular Charlotte Mason curriculum with thoughtful, diverse literature choices.", ages: "5–14", cost: "$100–$200/year" },
];

export const CURRICULUM_CATEGORIES = [
  { key: "all",         label: "All" },
  { key: "free",        label: "Free" },
  { key: "low-cost",    label: "Low-Cost" },
  { key: "open-and-go", label: "Open & Go" },
  { key: "hands-on",    label: "Hands-On" },
  { key: "waldorf",     label: "Waldorf/Montessori" },
  { key: "nature",      label: "Nature-Based" },
  { key: "secular",     label: "Secular" },
  { key: "faith",       label: "Faith-Based" },
];

export type StateInfo = {
  options: string[];
  attendance: string;
  portfolio: string;
  filing: string;
  contact: string;
};

export const STATE_COMPLIANCE: Record<string, StateInfo> = {
  California: {
    options: [
      "File as a private school (PSA) through the California Department of Education",
      "Enroll in an independent study program through a public school",
      "Use a private school satellite program (PSP)",
      "Hire a credentialed private tutor",
    ],
    attendance: "If filing as a private school, you must maintain attendance records for 175 days of instruction per year.",
    portfolio:  "No mandatory portfolio submission required when filing as a private school. Keep records for your own protection.",
    filing:     "Private School Affidavit must be filed annually between October 1–15 through the CDE website.",
    contact:    "California Homeschool Network (californiahomeschool.net)",
  },
  Texas: {
    options: [
      "Homeschool as a private school — no notification required",
      "Must teach: reading, spelling, grammar, mathematics, and good citizenship",
    ],
    attendance: "No mandatory attendance record requirement. Recommended to keep records.",
    portfolio:  "No portfolio requirement. Keeping records is strongly advised.",
    filing:     "No filing required with the state. Texas is one of the least regulated states.",
    contact:    "Texas Home School Coalition (thsc.org)",
  },
  Florida: {
    options: [
      "File a Notice of Intent with your county school superintendent",
      "Maintain a portfolio of educational materials and records",
      "Annual evaluation by a certified teacher, psychologist, or other approved evaluator",
    ],
    attendance: "Must maintain a portfolio — including samples of work, activities log, and books/materials used.",
    portfolio:  "Portfolio must be maintained and available for annual evaluation. Keep 1 year after evaluation.",
    filing:     "Notice of Intent due within 30 days of beginning homeschool. Must refile within 30 days of moving.",
    contact:    "Florida Parent-Educators Association (fpea.com)",
  },
  "New York": {
    options: [
      "File an Individualized Home Instruction Plan (IHIP) with your school district",
      "Quarterly reports required throughout the year",
      "Annual assessment required (standardized test or portfolio evaluation)",
    ],
    attendance: "Must provide 900 hours of instruction per year (grades 1–6) or 990 hours (grades 7–12).",
    portfolio:  "Portfolio or assessment required annually. Maintain records of all subjects and hours.",
    filing:     "IHIP due by July 1 (or within 4 weeks of beginning). Quarterly reports due throughout the year.",
    contact:    "Loving Education at Home (leah.org)",
  },
};

export const ALL_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

export const LEARNING_STYLES = ["Charlotte Mason", "Classical", "Eclectic", "Montessori", "Waldorf", "Unschooling", "Traditional"];

export const WEEK_THEMES = [
  "The American Frontier","Ancient Egypt","The Solar System","Botany & Garden Science",
  "American Revolution","Medieval Life","Ocean Ecosystems","Great Inventors","World Geography","Mythology",
];
