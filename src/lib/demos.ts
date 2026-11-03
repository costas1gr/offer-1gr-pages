import cafeImg from "@/assets/example-cafe.jpg";
import gymImg from "@/assets/example-gym.jpg";
import plumberImg from "@/assets/example-plumber.jpg";
import dentalImg from "@/assets/example-dental.jpg";
import cafe2 from "@/assets/demo-cafe-2.jpg";
import gym2 from "@/assets/demo-gym-2.jpg";
import plumber2 from "@/assets/demo-plumber-2.jpg";
import dental2 from "@/assets/demo-dental-2.jpg";

export type DemoTheme = {
  background: string;
  card: string;
  primary: string;
  primaryFg: string;
  mutedFg: string;
  hero: string;
  glow: string;
};

export type Demo = {
  slug: string;
  name: string;
  title: string;
  sub: string;
  cta: string;
  hero: string;
  photo: string;
  features: { t: string; d: string }[];
  formTitle: string;
  phone: string;
  address: string;
  theme: DemoTheme;
};

/** CSS custom properties that re-skin the shared design tokens for one demo page. */
export const themeVars = (t: DemoTheme): Record<string, string> => ({
  "--background": t.background,
  "--card": t.card,
  "--primary": t.primary,
  "--primary-foreground": t.primaryFg,
  "--muted-foreground": t.mutedFg,
  "--ring": t.primary,
  "--accent": `color-mix(in oklab, ${t.primary} 14%, transparent)`,
  "--accent-foreground": t.primary,
  "--gradient-hero": t.hero,
  "--shadow-glow": t.glow,
});

export const demos: Demo[] = [
  {
    slug: "kafeteria-aigli", name: "Καφετέρια Αίγλη", title: "Ο καφές σας, σε μία σελίδα",
    sub: "Specialty καφές, φρέσκα γλυκά και brunch κάθε μέρα στην καρδιά της πόλης.",
    cta: "Κάντε κράτηση", hero: cafeImg, photo: cafe2,
    features: [
      { t: "Specialty καφές", d: "Κόκκοι από μικρούς παραγωγούς, καβουρδισμένοι φρέσκοι." },
      { t: "Brunch όλη μέρα", d: "Pancakes, αυγά benedict και σπιτικά κρουασάν." },
      { t: "Ζεστός χώρος", d: "Ιδανικός για δουλειά, ραντεβού ή χαλάρωση." },
    ],
    formTitle: "Κράτηση τραπεζιού", phone: "210 000 0000", address: "Οδός Παραδείγματος 1, Αθήνα",
    theme: {
      background: "oklch(0.19 0.028 62)",
      card: "oklch(0.25 0.032 62)",
      primary: "oklch(0.81 0.13 72)",
      primaryFg: "oklch(0.21 0.03 62)",
      mutedFg: "oklch(0.77 0.035 68)",
      hero: "radial-gradient(60% 50% at 70% 0%, oklch(0.81 0.13 72 / 24%), transparent 70%), radial-gradient(50% 40% at 0% 30%, oklch(0.42 0.11 42 / 34%), transparent 70%)",
      glow: "0 10px 40px -10px oklch(0.81 0.13 72 / 55%)",
    },
  },
  {
    slug: "fitzone-gym", name: "FitZone Gym", title: "Γράψου. Ξεκίνα σήμερα.",
    sub: "Σύγχρονος εξοπλισμός, ομαδικά προγράμματα και προσωπικοί προπονητές.",
    cta: "Κλείσε δωρεάν πρόβα", hero: gymImg, photo: gym2,
    features: [
      { t: "Personal training", d: "Πρόγραμμα φτιαγμένο για τους δικούς σου στόχους." },
      { t: "Ομαδικά τμήματα", d: "Cross training, pilates, yoga και spinning." },
      { t: "Ανοιχτά 6:00–23:00", d: "Προπονήσου όποτε σε βολεύει." },
    ],
    formTitle: "Κλείσε δωρεάν πρόβα", phone: "210 000 0001", address: "Λεωφόρος Παραδείγματος 10, Αθήνα",
    theme: {
      background: "oklch(0.18 0.02 150)",
      card: "oklch(0.24 0.026 150)",
      primary: "oklch(0.85 0.18 128)",
      primaryFg: "oklch(0.2 0.03 145)",
      mutedFg: "oklch(0.77 0.03 145)",
      hero: "radial-gradient(60% 50% at 70% 0%, oklch(0.85 0.18 128 / 22%), transparent 70%), radial-gradient(50% 40% at 0% 30%, oklch(0.4 0.12 155 / 34%), transparent 70%)",
      glow: "0 10px 40px -10px oklch(0.85 0.18 128 / 55%)",
    },
  },
  {
    slug: "ydravlikos-papadakis", name: "Υδραυλικός Παπαδάκης", title: "Υδραυλικός 24/7 — στην πόρτα σας",
    sub: "Άμεση εξυπηρέτηση για διαρροές, βουλώματα και νέες εγκαταστάσεις.",
    cta: "Ζητήστε προσφορά", hero: plumberImg, photo: plumber2,
    features: [
      { t: "Άμεση ανταπόκριση", d: "Είμαστε κοντά σας μέσα σε 60 λεπτά." },
      { t: "Διαφανείς τιμές", d: "Δωρεάν εκτίμηση πριν ξεκινήσει η εργασία." },
      { t: "Εγγύηση εργασίας", d: "Ποιοτικά υλικά και εγγύηση σε κάθε επισκευή." },
    ],
    formTitle: "Ζητήστε προσφορά", phone: "690 000 0000", address: "Εξυπηρέτηση σε όλη την Αττική",
    theme: {
      background: "oklch(0.19 0.025 255)",
      card: "oklch(0.25 0.03 255)",
      primary: "oklch(0.74 0.17 32)",
      primaryFg: "oklch(0.2 0.02 60)",
      mutedFg: "oklch(0.76 0.025 250)",
      hero: "radial-gradient(60% 50% at 70% 0%, oklch(0.74 0.17 32 / 24%), transparent 70%), radial-gradient(50% 40% at 0% 30%, oklch(0.45 0.14 255 / 34%), transparent 70%)",
      glow: "0 10px 40px -10px oklch(0.74 0.17 32 / 55%)",
    },
  },
  {
    slug: "odontiatreio-lampsi", name: "Οδοντιατρείο Λάμψη", title: "Το χαμόγελό σας, σε έμπιστα χέρια",
    sub: "Σύγχρονη οδοντιατρική φροντίδα για όλη την οικογένεια, χωρίς άγχος.",
    cta: "Κλείστε ραντεβού", hero: dentalImg, photo: dental2,
    features: [
      { t: "Λεύκανση δοντιών", d: "Ασφαλής λεύκανση με άμεσα αποτελέσματα." },
      { t: "Εμφυτεύματα", d: "Μόνιμη λύση με σύγχρονα υλικά." },
      { t: "Παιδοδοντιατρική", d: "Φιλικό περιβάλλον για τους μικρούς μας φίλους." },
    ],
    formTitle: "Κλείστε ραντεβού", phone: "210 000 0002", address: "Οδός Παραδείγματος 5, Θεσσαλονίκη",
    theme: {
      background: "oklch(0.18 0.03 185)",
      card: "oklch(0.24 0.035 185)",
      primary: "oklch(0.86 0.11 172)",
      primaryFg: "oklch(0.2 0.03 180)",
      mutedFg: "oklch(0.78 0.03 178)",
      hero: "radial-gradient(60% 50% at 70% 0%, oklch(0.86 0.11 172 / 22%), transparent 70%), radial-gradient(50% 40% at 0% 30%, oklch(0.42 0.11 200 / 34%), transparent 70%)",
      glow: "0 10px 40px -10px oklch(0.86 0.11 172 / 55%)",
    },
  },
];
