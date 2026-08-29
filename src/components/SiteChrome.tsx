import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/guide", label: "Hackers Guide" },
  { to: "/schedule", label: "Schedule" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Sigil({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      <div
        className="absolute inset-0 rounded-full opacity-70 animate-spin-slow"
        style={{ background: "var(--gradient-sigil)", mask: "radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%)" }}
      />
      <div
        className="absolute inset-[12%] rounded-full opacity-60 animate-spin-slower"
        style={{ background: "var(--gradient-sigil)", mask: "radial-gradient(circle, transparent 70%, #000 71%, #000 74%, transparent 75%)" }}
      />
      <div className="absolute inset-[30%] rounded-full border border-accent/40" />
      <div className="absolute inset-[42%] rotate-45 border border-primary/50" />
    </div>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-background/40">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-rune)" }}
      />
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <ScrollProgress />
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-full rune-panel px-4 py-2.5 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative grid size-8 place-items-center">
            <Sigil className="absolute inset-0" />
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--gold)]" />
          </span>
          <span className="font-display text-sm tracking-[0.32em] text-foreground/90">PARADOX</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-accent" }}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#register"
            className="hidden rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.04] sm:inline-block"
            style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}
          >
            Register
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid size-9 place-items-center rounded-full border border-border text-foreground/80 md:hidden"
          >
            <span className="text-lg leading-none">{open ? "\u00d7" : "\u2261"}</span>
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-2xl rune-panel p-3 md:hidden">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-accent" }}
                className="block rounded-lg px-3 py-2 text-sm uppercase tracking-[0.18em] text-foreground/75"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg tracking-[0.24em] text-ember-gradient">PARADOX</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A hackathon beyond logic. Presented by IEEE IEM–UEM Student Branch.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 uppercase tracking-[0.22em] text-accent/80">Dimensions</p>
          <ul className="space-y-2 text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 uppercase tracking-[0.22em] text-accent/80">Sanctum</p>
          <p className="text-muted-foreground">Gurukul Building, IEM Saltlake</p>
          <p className="mt-2 text-muted-foreground">XX September, 2026</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
            One reality. Limitless possibilities.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShown(true);
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[6px]"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function PageShell({
  children,
  eyebrow,
  title,
  lede,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <>
      <SiteNav />
      <main className="relative z-10">
        <header className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 pt-32">
          <p className="text-[11px] uppercase tracking-[0.5em] text-accent/85">{eyebrow}</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ember-gradient glow-text sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/75">{lede}</p>
          <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-foreground/45">
            <span className="h-px w-16 bg-linear-to-r from-primary to-transparent" />
            scroll to bend reality
          </div>
        </header>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
