import cafeImg from "@/assets/example-cafe.jpg";
import gymImg from "@/assets/example-gym.jpg";
import plumberImg from "@/assets/example-plumber.jpg";
import dentalImg from "@/assets/example-dental.jpg";
import cafe2 from "@/assets/demo-cafe-2.jpg";
import gym2 from "@/assets/demo-gym-2.jpg";
import plumber2 from "@/assets/demo-plumber-2.jpg";
import dental2 from "@/assets/demo-dental-2.jpg";

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
};

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
  },
];
