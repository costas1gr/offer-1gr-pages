import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Κατασκευή Landing Page | 1gr pages" },
      { name: "description", content: "Επαγγελματικές landing pages που φέρνουν πελάτες. Γρήγορη παράδοση, σύγχρονος σχεδιασμός, τεχνική υποστήριξη." },
      { property: "og:title", content: "Κατασκευή Landing Page | 1gr pages" },
      { property: "og:description", content: "Landing pages που μετατρέπουν επισκέπτες σε πελάτες." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const plans = [
  { id: "basic", name: "Βασικό Πακέτο", price: "100€", note: "εφάπαξ", desc: "Για γρήγορη παρουσία στο διαδίκτυο.", features: ["Landing page μίας σελίδας", "Responsive σχεδιασμός", "Φόρμα επικοινωνίας", "Βασικό SEO", "Παράδοση σε 5–7 ημέρες"] },
  { id: "support", name: "Πακέτο Υποστήριξης", price: "200€", note: "+ 15€/μήνα", desc: "Ολοκληρωμένη λύση με μηνιαία τεχνική υποστήριξη.", features: ["Όλα του Βασικού", "Μηνιαία τεχνική υποστήριξη", "Αλλαγές περιεχομένου", "Analytics & αναφορές", "Προτεραιότητα στην εξυπηρέτηση"], featured: true },
  { id: "custom", name: "Επεκτάσιμο Πακέτο", price: "Κατόπιν προσφοράς", note: "", desc: "Εξατομικευμένη λύση βάσει των αναγκών σας.", features: ["Πολυσέλιδο site ή e-shop", "Custom λειτουργίες & integrations", "Πολυγλωσσικό περιεχόμενο", "Αποκλειστικός υπεύθυνος έργου", "Χρονοδιάγραμμα κατά συμφωνία"] },
];

const benefits = [
  { t: "Περισσότεροι πελάτες", d: "Μια στοχευμένη σελίδα με ένα σαφές μήνυμα μετατρέπει επισκέπτες σε αιτήματα." },
  { t: "Αξιοπιστία", d: "Ένας σύγχρονος, επαγγελματικός ιστότοπος χτίζει εμπιστοσύνη από το πρώτο δευτερόλεπτο." },
  { t: "Ταχύτητα", d: "Βελτιστοποιημένος κώδικας για άμεση φόρτωση σε κινητά και υπολογιστές." },
  { t: "Μετρήσιμα αποτελέσματα", d: "Ιδανική για διαφημίσεις Google & Meta, με πλήρη παρακολούθηση απόδοσης." },
];

const faqs = [
  { q: "Περιλαμβάνεται η φιλοξενία (hosting);", a: "Ναι, ο πρώτος χρόνος φιλοξενίας περιλαμβάνεται σε όλα τα πακέτα. Στη συνέχεια η ανανέωση κοστίζει από 60€/έτος, ή περιλαμβάνεται στο Πακέτο Υποστήριξης." },
  { q: "Τι γίνεται με το domain name;", a: "Το domain (π.χ. .gr ή .com) δεν περιλαμβάνεται στην τιμή και κατοχυρώνεται στο δικό σας όνομα. Αναλαμβάνουμε δωρεάν την κατοχύρωση και σύνδεσή του. Αν έχετε ήδη domain, το συνδέουμε." },
  { q: "Σε πόσο καιρό παραδίδεται η σελίδα;", a: "Βασικό Πακέτο: 5–7 εργάσιμες. Πακέτο Υποστήριξης: 7–10 εργάσιμες. Επεκτάσιμο: βάσει χρονοδιαγράμματος. Ο χρόνος μετράει από την παραλαβή του υλικού σας." },
  { q: "Χρειάζεται να δώσω κείμενα και φωτογραφίες;", a: "Ιδανικά ναι, αλλά μπορούμε να βοηθήσουμε με συγγραφή κειμένων και επιλογή επαγγελματικών εικόνων." },
  { q: "Πώς γίνεται η πληρωμή;", a: "50% προκαταβολή με την έναρξη και 50% με την παράδοση. Δεχόμαστε τραπεζική κατάθεση και κάρτα." },
];

const schema = z.object({
  name: z.string().trim().min(2, "Συμπληρώστε το όνομά σας").max(100),
  email: z.string().trim().email("Μη έγκυρο email").max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+\s()-]*$/, "Μη έγκυρο τηλέφωνο"),
  plan: z.enum(["basic", "support", "custom"]),
  message: z.string().trim().max(1000, "Έως 1000 χαρακτήρες"),
});

function Index() {
  const [plan, setPlan] = useState("support");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "phone" | "message", string>>>({});
  const [sent, setSent] = useState(false);

  const choose = (id: string) => {
    setPlan(id);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs as typeof errors);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const input = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-display text-lg font-bold">1gr <span className="text-primary">pages</span></a>
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#services" className="hover:text-foreground">Υπηρεσίες</a>
            <a href="#pricing" className="hover:text-foreground">Τιμές</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <a href="#contact" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Επικοινωνία</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="grid-lines absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:py-36">
          <span className="inline-block rounded-full border border-primary/30 bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">Κατασκευή Landing Pages</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Η σελίδα που μετατρέπει <span className="text-primary">επισκέπτες σε πελάτες</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Σχεδιάζουμε γρήγορες, σύγχρονες landing pages για την επιχείρησή σας — έτοιμες μέσα σε λίγες ημέρες.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" className="shadow-glow rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition hover:-translate-y-0.5">Ζητήστε προσφορά</a>
            <a href="#pricing" className="rounded-xl border border-border px-8 py-4 font-semibold hover:bg-secondary">Δείτε τα πακέτα</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Γιατί η επιχείρησή σας χρειάζεται landing page</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">Ένα εργαλείο, ένας στόχος: να φέρνει αποτελέσματα.</p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-display font-bold text-accent-foreground">0{i + 1}</div>
              <h3 className="text-lg font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Πακέτα & Τιμές</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">Διαφανείς τιμές χωρίς κρυφές χρεώσεις. Οι τιμές δεν περιλαμβάνουν ΦΠΑ.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.id} className={`relative flex flex-col rounded-2xl border bg-card p-8 ${p.featured ? "shadow-glow border-primary" : "border-border"}`}>
                {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Δημοφιλέστερο</span>}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-6">
                  <span className="font-display text-3xl font-extrabold">{p.price}</span>
                  {p.note && <span className="ml-2 text-sm text-muted-foreground">{p.note}</span>}
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-primary">✓</span>{f}</li>
                  ))}
                </ul>
                <button onClick={() => choose(p.id)} className={`mt-8 rounded-xl px-6 py-3 font-semibold transition ${p.featured ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>
                  Επιλογή πακέτου
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Συχνές Ερωτήσεις</h2>
        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5 open:border-primary/40">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}<span className="ml-4 text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-primary/30 bg-accent p-5 text-sm text-accent-foreground">
          <strong>Σημείωση:</strong> Hosting 1ου έτους δωρεάν • Domain με χρέωση πελάτη, στο όνομά σας • Παράδοση 5–10 εργάσιμες ανάλογα το πακέτο.
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border bg-hero">
        <div className="mx-auto max-w-2xl px-5 py-24">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Παραγγελία & Επικοινωνία</h2>
          <p className="mt-4 text-center text-muted-foreground">Επιλέξτε πακέτο και αφήστε τα στοιχεία σας. Θα επικοινωνήσουμε εντός 24 ωρών.</p>
          {sent ? (
            <div className="mt-10 rounded-2xl border border-primary bg-card p-10 text-center">
              <h3 className="text-2xl font-bold text-primary">Ευχαριστούμε!</h3>
              <p className="mt-3 text-muted-foreground">Λάβαμε το αίτημά σας και θα σας απαντήσουμε σύντομα.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm text-primary underline">Νέο αίτημα</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input name="name" placeholder="Ονοματεπώνυμο *" className={input} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <input name="email" type="email" placeholder="Email *" className={input} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div>
                <input name="phone" placeholder="Τηλέφωνο" className={input} />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <select name="plan" value={plan} onChange={(e) => setPlan(e.target.value)} className={input}>
                {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <div>
                <textarea name="message" rows={4} placeholder="Πείτε μας για την επιχείρησή σας..." className={input} />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button type="submit" className="shadow-glow w-full rounded-xl bg-primary py-4 font-semibold text-primary-foreground">Αποστολή αιτήματος</button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} 1gr pages. Με επιφύλαξη παντός δικαιώματος.
      </footer>
    </div>
  );
}
