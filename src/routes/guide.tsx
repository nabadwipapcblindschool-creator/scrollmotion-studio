import { createFileRoute } from "@tanstack/react-router";
import sparks from "@/assets/sparks.mp4.asset.json";
import sparksWebm from "@/assets/sparks.webm.asset.json";
import { ScrollVideoBackground } from "@/components/ScrollVideoBackground";
import { PageShell, Section } from "@/components/SiteChrome";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Hackers Guide — PARADOX 2026" },
      {
        name: "description",
        content:
          "Rules, tracks, eligibility, judging criteria and survival tips for PARADOX 2026. Your spellbook to innovate.",
      },
      { property: "og:title", content: "Hackers Guide — PARADOX 2026" },
      {
        property: "og:description",
        content: "Everything you need to know before you build the impossible at PARADOX.",
      },
    ],
  }),
  component: Guide,
});

const TRACKS = [
  { t: "Mystic AI", d: "Agents, LLM tooling and models that reason across dimensions." },
  { t: "Open Sanctum", d: "Anything goes — if it bends a rule, it belongs here." },
  { t: "Sustain the Realm", d: "Climate, energy and resource intelligence." },
  { t: "HealthArts", d: "Diagnostics, accessibility and human wellbeing." },
  { t: "FinSpell", d: "Payments, fraud detection and financial inclusion." },
  { t: "Reality Interfaces", d: "AR/VR, spatial UI and human-computer sorcery." },
];

const RULES = [
  "Teams of 2–4. Solo sorcerers may be matched at the opening ceremony.",
  "All code must be written during the event; boilerplate and OSS libraries are fine.",
  "Any stack, any language, any cloud. Bring your own laptops and charms.",
  "Public repository at submission, with a 3-minute demo video.",
  "Plagiarism collapses your timeline instantly — disqualification, no appeal.",
];

const JUDGING = [
  { k: "Impact", v: 30 },
  { k: "Innovation", v: 25 },
  { k: "Execution", v: 25 },
  { k: "Design", v: 20 },
];

function Guide() {
  return (
    <>
      <ScrollVideoBackground src={sparks.url} srcWebm={sparksWebm.url} zoom={1.3} tint="ember" dim={0.1} />
      <PageShell
        eyebrow="Your spellbook to innovate"
        title="Hackers Guide"
        lede="Everything you need to know. All in one place — rules, tracks, judging and tips so you focus on building the impossible."
      >
        <Section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-ember-gradient">Tracks</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((t) => (
              <div
                key={t.t}
                className="rounded-2xl border border-border/70 bg-background/55 p-7 backdrop-blur transition-transform hover:-translate-y-1 hover:border-accent/50"
              >
                <h3 className="font-serif text-xl">{t.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-3xl text-ember-gradient">The Rules of the Realm</h2>
            <ol className="mt-8 space-y-5">
              {RULES.map((r, i) => (
                <li key={r} className="flex gap-5">
                  <span className="font-display text-lg text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground/80">{r}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rune-panel h-fit rounded-3xl p-8">
            <h3 className="font-serif text-xl">Judging weights</h3>
            <div className="mt-6 space-y-5">
              {JUDGING.map((j) => (
                <div key={j.k}>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/80">{j.k}</span>
                    <span className="text-accent">{j.v}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${j.v}%`, background: "var(--gradient-ember)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </PageShell>
    </>
  );
}
