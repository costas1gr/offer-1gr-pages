import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { demos } from "@/lib/demos";

export const Route = createFileRoute("/demo/$slug")({
  loader: ({ params }) => {
    const demo = demos.find((d) => d.slug === params.slug);
    if (!demo) throw notFound();
    return demo;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Δείγμα | 1gr pages` },
          { name: "description", content: loaderData.sub },
          { property: "og:title", content: `${loaderData.name} — Δείγμα ιστοσελίδας` },
          { property: "og:description", content: loaderData.sub },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Δεν βρέθηκε | 1gr pages" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="p-20 text-center">
      Το δείγμα δεν βρέθηκε. <Link to="/" className="text-primary underline">Αρχική</Link>
    </div>
  ),
  component: DemoPage,
});

function DemoPage() {
  const d = Route.useLoaderData();
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
        Δείγμα διαφημιστικής ιστοσελίδας από 1gr pages ·{" "}
        <Link to="/" hash="work" className="font-semibold underline">← Επιστροφή στα ενδεικτικά έργα</Link>
      </div>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              hash="work"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
            >
              <span aria-hidden="true">←</span>
              <span className="hidden sm:inline">Ενδεικτικές εργασίες</span>
              <span className="sm:hidden">Ενδεικτικές</span>
            </Link>
            <span className="truncate font-display text-lg font-bold">{d.name}</span>
          </div>
          <a href="#form" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{d.cta}</a>
        </div>
      </header>


      <section className="relative">
        <img src={d.hero} alt={d.name} width={1200} height={800} className="h-[70vh] min-h-[420px] w-full object-cover" />
        <div className="scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-14">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">{d.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{d.sub}</p>
          <a href="#form" className="shadow-glow mt-8 inline-block rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground">{d.cta}</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-20 md:grid-cols-3">
        {d.features.map((f) => (
          <div key={f.t} className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">{f.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 md:grid-cols-2">
        <img src={d.photo} alt={d.name} loading="lazy" width={1200} height={800} className="w-full rounded-2xl border border-border object-cover" />
        <div>
          <h2 className="text-3xl font-bold">Γιατί να μας επιλέξετε</h2>
          <p className="mt-4 text-muted-foreground">Με εμπειρία, συνέπεια και αγάπη για αυτό που κάνουμε, φροντίζουμε κάθε πελάτης να φεύγει ικανοποιημένος.</p>
          <p className="mt-6 text-sm">📞 {d.phone}</p>
          <p className="mt-1 text-sm">📍 {d.address}</p>
        </div>
      </section>

      <section id="form" className="border-t border-border bg-hero">
        <div className="mx-auto max-w-xl px-5 py-20">
          <h2 className="text-center text-3xl font-bold">{d.formTitle}</h2>
          {sent ? (
            <div className="mt-8 rounded-2xl border border-primary bg-card p-8 text-center">
              <p className="text-lg font-semibold text-primary">Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα.</p>
              <p className="mt-2 text-xs text-muted-foreground">(Δείγμα — το μήνυμα δεν αποστέλλεται.)</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
              <input required name="name" placeholder="Ονοματεπώνυμο *" className={input} />
              <input required name="phone" placeholder="Τηλέφωνο *" className={input} />
              <input name="email" type="email" placeholder="Email" className={input} />
              <textarea name="message" rows={4} placeholder="Μήνυμα" className={input} />
              <button type="submit" className="shadow-glow w-full rounded-xl bg-primary py-4 font-semibold text-primary-foreground">Αποστολή</button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {d.name} · Κατασκευή: <Link to="/" className="text-primary">1gr pages</Link>
      </footer>
    </div>
  );
}
