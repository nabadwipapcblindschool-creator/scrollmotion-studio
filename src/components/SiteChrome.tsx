import { useEffect, useRef, useState, type ReactNode } from "react";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "guide", label: "Hackers Guide" },
  { id: "schedule", label: "Schedule" },
  { id: "faq", label: "FAQ" },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Sigil({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      <div
        className="absolute inset-0 rounded-full opacity-70 animate-spin-slow"
        style={{
          background: "var(--gradient-spray)",
          mask: "radial-gradient(circle, transparent 62%, #000 63%, #000 66%, transparent 67%)",
        }}
      />
      <div
        className="absolute inset-[12%] rounded-full opacity-60 animate-spin-slower"
        style={{
          background: "var(--gradient-sigil)",
          mask: "radial-gradient(circle, transparent 70%, #000 71%, #000 74%, transparent 75%)",
        }}
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
    <div className="fixed inset-x-0 top-0 z-50 h-[4px] bg-background/50">
      <div
        ref={ref}
        className="h-full origin-left"
        style={{ background: "var(--gradient-spray)", boxShadow: "var(--shadow-rune)" }}
      />
    </div>
  );
}

/** highlights the nav item whose section owns the viewport */
function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      let best = "home";
      let bestVisible = -1;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        if (visible > bestVisible) {
          bestVisible = visible;
          best = s.id;
        }
      }
      setActive((p) => (p === best ? p : best));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <ScrollProgress />
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl pasteup px-4 py-2.5 sm:px-6">
        <button onClick={() => scrollToId("home")} className="group flex items-center gap-2.5">
          <span className="relative grid size-8 place-items-center">
            <Sigil className="absolute inset-0" />
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--gold)]" />
          </span>
          <span className="font-tag text-lg tracking-wide text-spray-gradient">Paradox</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToId(item.id)}
                className={`relative rounded-md px-3.5 py-1.5 font-display text-[15px] uppercase tracking-[0.16em] transition-colors ${
                  active === item.id
                    ? "text-accent marker-underline"
                    : "text-foreground/65 hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToId("register")}
            className="hidden -rotate-2 rounded-md px-4 py-2 font-display text-[14px] uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:rotate-0 hover:scale-[1.05] sm:inline-block"
            style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}
          >
            Register
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid size-9 place-items-center rounded-md border border-border text-foreground/80 md:hidden"
          >
            <span className="text-lg leading-none">{open ? "\u00d7" : "\u2261"}</span>
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-2xl pasteup p-3 md:hidden">
          {SECTIONS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setOpen(false);
                  scrollToId(item.id);
                }}
                className="block w-full rounded-md px-3 py-2 text-left font-display text-base uppercase tracking-[0.16em] text-foreground/80"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-10 border-t-2 border-accent/30 bg-background/75 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-tag text-3xl text-spray-gradient">Paradox</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A hackathon beyond logic. Presented by IEEE IEM–UEM Student Branch.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-display text-base uppercase tracking-[0.22em] text-accent/85">
            Dimensions
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {SECTIONS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollToId(n.id)}
                  className="transition-colors hover:text-accent"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-display text-base uppercase tracking-[0.22em] text-accent/85">
            Sanctum
          </p>
          <p className="text-muted-foreground">Gurukul Building, IEM Saltlake</p>
          <p className="mt-2 text-muted-foreground">XX September, 2026</p>
          <p className="mt-4 font-tag text-base text-foreground/60">
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
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-[900ms] ease-out ${
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-[6px]"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/** big stencilled chapter heading with a spray-tag eyebrow */
export function ChapterHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="relative">
      <span className="inline-block -rotate-2 tape px-3 py-1 font-display text-xs uppercase tracking-[0.28em]">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.92] uppercase text-spray-gradient spray-shadow">
        {title}
      </h2>
      {lede ? <p className="mt-4 max-w-xl text-foreground/75">{lede}</p> : null}
    </div>
  );
}
