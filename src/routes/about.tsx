import { createFileRoute } from "@tanstack/react-router";
import strange from "@/assets/strange.mp4.asset.json";
import strangeWebm from "@/assets/strange.webm.asset.json";
import { ScrollVideoBackground } from "@/components/ScrollVideoBackground";
import { PageShell, Section } from "@/components/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PARADOX — Gateway to Infinite Possibilities" },
      {
        name: "description",
        content:
          "PARADOX is more than a hackathon. Inspired by the mystic arts of bending reality, it challenges you to question conventions and build impact.",
      },
      { property: "og:title", content: "About PARADOX — Gateway to Infinite Possibilities" },
      {
        property: "og:description",
        content: "One reality. Limitless possibilities. Learn what PARADOX is about.",
      },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    n: "01",
    t: "Question conventions",
    d: "Every accepted answer is just a timeline that stopped branching. We reward the teams that branch again.",
  },
  {
    n: "02",
    t: "Explore the unknown",
    d: "Unfamiliar stacks, unfamiliar domains, unfamiliar teammates. Discomfort is the price of discovery.",
  },
  {
    n: "03",
    t: "Build real impact",
    d: "Demos fade. Working solutions to real-world problems outlive the weekend and the applause.",
  },
];

function About() {
  return (
    <>
      <ScrollVideoBackground src={strange.url} srcWebm={strangeWebm.url} zoom={1.4} tint="gold" dim={0.12} />
      <PageShell
        eyebrow="Chapter I"
        title="About Paradox"
        lede="A gateway to infinite possibilities, disguised as a hackathon."
      >
        <Section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rune-panel rounded-3xl p-9">
              <p className="text-lg leading-relaxed text-foreground/85">
                PARADOX is more than a hackathon — it&rsquo;s a gateway to infinite possibilities.
                Inspired by the mystic arts of bending reality, this hackathon challenges you to
                question conventions, explore the unknown, and build solutions that create impact.
              </p>
              <p className="mt-6 leading-relaxed text-foreground/70">
                Across dimensions of technology and creativity, come together to solve real-world
                problems with extraordinary ideas. The only limit is your imagination.
              </p>
              <p className="mt-8 font-display text-xl text-ember-gradient">
                ONE REALITY. LIMITLESS POSSIBILITIES.
              </p>
            </div>
            <div className="space-y-5">
              {PILLARS.map((p) => (
                <div
                  key={p.n}
                  className="group rounded-2xl border border-border/70 bg-background/55 p-7 backdrop-blur transition-colors hover:border-accent/50"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl text-accent/70">{p.n}</span>
                    <h3 className="font-serif text-xl tracking-wide">{p.t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="mx-auto max-w-4xl px-6 pb-32 text-center">
          <blockquote className="font-display text-3xl leading-snug text-foreground/90 sm:text-4xl">
            &ldquo;In the multiverse of ideas, you are the anomaly that{" "}
            <span className="text-ember-gradient">changes everything</span>.&rdquo;
          </blockquote>
          <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-accent/75">
            IEEE IEM–UEM Student Branch
          </p>
        </Section>
      </PageShell>
    </>
  );
}
