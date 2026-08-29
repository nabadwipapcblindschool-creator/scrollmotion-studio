import { createFileRoute, Link } from "@tanstack/react-router";
import portal from "@/assets/portal.mp4.asset.json";
import portalWebm from "@/assets/portal.webm.asset.json";
import { ScrollVideoBackground } from "@/components/ScrollVideoBackground";
import { Section, Sigil, SiteFooter, SiteNav } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARADOX 2026 — A Hackathon Beyond Logic" },
      {
        name: "description",
        content:
          "PARADOX is a 24-hour hackathon at IEM Saltlake where impossible ideas become real solutions. Code. Create. Defy reality.",
      },
      { property: "og:title", content: "PARADOX 2026 — A Hackathon Beyond Logic" },
      {
        property: "og:description",
        content: "Step into the multiverse of innovation. XX September 2026, Gurukul Building, IEM Saltlake.",
      },
    ],
  }),
  component: Home,
});

const STATS = [
  { k: "36h", v: "of unbroken build time" },
  { k: "500+", v: "sorcerers of code" },
  { k: "6", v: "problem dimensions" },
  { k: "\u20b91L+", v: "in prize relics" },
];

function Home() {
  return (
    <>
      <ScrollVideoBackground src={portal.url} srcWebm={portalWebm.url} zoom={1.35} tint="ember" />
      <SiteNav />

      <main className="relative z-10">
        <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-28">
          <div className="relative">
            <Sigil className="absolute -left-24 -top-24 hidden size-72 opacity-40 lg:block" />
            <p className="text-[11px] uppercase tracking-[0.55em] text-accent/85 animate-flicker">
              Code. Create. Defy reality.
            </p>
            <h1 className="mt-6 font-display text-[clamp(3.2rem,11vw,9rem)] leading-[0.9] text-ember-gradient glow-text">
              PARADOX
            </h1>
            <p className="mt-4 font-serif text-sm uppercase tracking-[0.42em] text-foreground/70 sm:text-base">
              A hackathon beyond logic
            </p>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/80">
              Step into the multiverse of innovation. Where impossible ideas become real
              solutions. Break the limits — rewrite what&rsquo;s possible.
            </p>

            <div className="mt-10 flex w-fit flex-col gap-6 rounded-2xl rune-panel px-6 py-5 sm:flex-row sm:items-center sm:gap-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-accent/80">Date</p>
                <p className="mt-1 font-serif text-lg">XX September, 2026</p>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-accent/80">Venue</p>
                <p className="mt-1 font-serif text-lg">Gurukul Building, IEM Saltlake</p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-4" id="register">
              <a
                href="#register"
                className="rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:scale-[1.04]"
                style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}
              >
                Register now
              </a>
              <Link
                to="/about"
                className="rounded-full border border-accent/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent transition-colors hover:bg-accent/10"
              >
                Explore more
              </Link>
            </div>
          </div>
        </section>

        <Section className="mx-auto max-w-6xl px-6 py-28">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.k} className="bg-background/70 px-7 py-10 backdrop-blur">
                <p className="font-display text-4xl text-ember-gradient">{s.k}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-accent/85">
                The multiverse opens
              </p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                Every timeline needs a builder who refuses the rules.
              </h2>
              <p className="mt-6 max-w-lg text-foreground/75">
                Across dimensions of technology and creativity, teams gather to solve real
                problems with extraordinary ideas. Bring three to four sorcerers, one impossible
                thesis, and enough caffeine to bend spacetime.
              </p>
              <Link
                to="/guide"
                className="mt-8 inline-block border-b border-accent/50 pb-1 text-xs uppercase tracking-[0.3em] text-accent"
              >
                Read the hackers guide
              </Link>
            </div>
            <div className="relative aspect-square">
              <Sigil className="absolute inset-0 animate-float-soft" />
              <div className="absolute inset-[26%] grid place-items-center rounded-full rune-panel text-center">
                <p className="px-6 font-serif text-sm uppercase leading-relaxed tracking-[0.24em] text-foreground/80">
                  One reality
                  <br />
                  <span className="text-ember-gradient">limitless</span>
                  <br />
                  possibilities
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
