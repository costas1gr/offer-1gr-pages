import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { demos, themeVars } from "@/lib/demos";


export const Route = createFileRoute("/demo/$slug")({
  loader: ({ params }) => {
    const demo = demos.find((d) => d.slug === params.slug);
    if (!demo) throw notFound();
    return demo;
  },
  staticData: { sitemap: true },
  head: ({ loaderData, params }) => {
    const url = `https://pages.1gr.site/demo/${params.slug}`;
    const desc = loaderData ? `${loaderData.sub} Δείγμα διαφημιστικής ιστοσελίδας από την 1gr pages.` : "";
    return {
      meta: loaderData
        ? [
            { title: `${loaderData.name} — Δείγμα διαφημιστικής ιστοσελίδας | 1gr pages` },
            { name: "description", content: desc },
            { property: "og:title", content: `${loaderData.name} — Δείγμα ιστοσελίδας` },
            { property: "og:description", content: desc },
            { property: "og:type", content: "website" },
            { property: "og:url", content: url },
            { property: "og:locale", content: "el_GR" },
            { name: "twitter:card", content: "summary_large_image" },
          ]
        : [{ title: "Δεν βρέθηκε | 1gr pages" }, { name: "robots", content: "noindex" }],
      links: loaderData ? [{ rel: "canonical", href: url }] : [],
    };
  },
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
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = d.theme.background;
    return () => { document.body.style.backgroundColor = prev; };
  }, [d.theme.background]);

  const input = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background" style={themeVars(d.theme) as CSSProperties}>
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium leading-relaxed text-primary-foreground">
        Δείγμα διαφημιστικής ιστοσελίδας από 1gr pages ·{" "}
        <Link to="/" hash="work" className="font-semibold underline">← Επιστροφή στα ενδεικτικά έργα</Link>
      </div>
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              hash="work"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
            >
              <span aria-hidden="true">←</span><span className="sr-only sm:hidden">Ενδεικτικές εργασίες</span>
              <span className="hidden sm:inline">Ενδεικτικές εργασίες</span>
            </Link>
            <span className="truncate font-display text-base font-bold sm:text-lg">{d.name}</span>
          </div>
          <a href="#form" className="shrink-0 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm font-semibold sm:px-4 text-primary-foreground">{d.cta}</a>
        </div>
      </header>


      <section className="relative">
        <img src={d.hero} alt={d.name} width={1200} height={800} className="h-[78svh] min-h-[460px] max-h-[820px] w-full object-cover sm:h-[70vh]" />
        <div className="scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 sm:px-5 sm:pb-14">
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">{d.title}</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">{d.sub}</p>
          <a href="#form" className="shadow-glow mt-6 block w-full rounded-xl bg-primary px-8 py-4 text-center sm:mt-8 sm:inline-block sm:w-auto font-semibold text-primary-foreground">{d.cta}</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:gap-5 sm:px-5 sm:py-20 md:grid-cols-3">
        {d.features.map((f) => (
          <div key={f.t} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h3 className="text-lg font-semibold">{f.t}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-sm">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-12 sm:gap-10 sm:px-5 sm:pb-20 md:grid-cols-2">
        <img src={d.photo} alt={d.name} loading="lazy" width={1200} height={800} className="aspect-[3/2] h-auto w-full rounded-2xl border border-border object-cover" />
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Γιατί να μας επιλέξετε</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground sm:mt-4">Με εμπειρία, συνέπεια και αγάπη για αυτό που κάνουμε, φροντίζουμε κάθε πελάτης να φεύγει ικανοποιημένος.</p>
          <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="mt-5 inline-block py-1 text-base font-semibold text-primary">📞 {d.phone}</a>
          <p className="mt-1 text-base sm:text-sm">📍 {d.address}</p>
        </div>
      </section>

      <section id="form" className="border-t border-border bg-hero">
        <div className="mx-auto max-w-xl px-4 py-12 sm:px-5 sm:py-20">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">{d.formTitle}</h2>
          {sent ? (
            <div className="mt-8 rounded-2xl border border-primary bg-card p-8 text-center">
              <p className="text-lg font-semibold text-primary">Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα.</p>
              <p className="mt-2 text-xs text-muted-foreground">(Δείγμα — το μήνυμα δεν αποστέλλεται.)</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-4 sm:mt-8 sm:p-6">
              <input required name="name" autoComplete="name" aria-label="Ονοματεπώνυμο" placeholder="Ονοματεπώνυμο *" className={input} />
              <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-label="Τηλέφωνο" placeholder="Τηλέφωνο *" className={input} />
              <input name="email" type="email" inputMode="email" autoComplete="email" aria-label="Email" placeholder="Email" className={input} />
              <textarea name="message" rows={4} aria-label="Μήνυμα" placeholder="Μήνυμα" className={input} />
              <button type="submit" className="shadow-glow w-full rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground">Αποστολή</button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>
          <Link to="/" hash="work" className="font-semibold text-primary underline">
            ← Επιστροφή στα ενδεικτικά έργα
          </Link>
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} {d.name} · Κατασκευή: <Link to="/" className="text-primary">1gr pages</Link>
        </p>
      </footer>
    </div>

  );
}
