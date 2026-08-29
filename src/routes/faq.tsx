import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import smoke from "@/assets/smoke.mp4.asset.json";
import smokeWebm from "@/assets/smoke.webm.asset.json";
import { ScrollVideoBackground } from "@/components/ScrollVideoBackground";
import { PageShell, Section } from "@/components/SiteChrome";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — PARADOX 2026" },
      {
        name: "description",
        content:
          "Answers about eligibility, team size, fees, travel, hardware and submissions for the PARADOX 2026 hackathon at IEM Saltlake.",
      },
      { property: "og:title", content: "FAQ — PARADOX 2026" },
      {
        property: "og:description",
        content: "Everything participants ask before entering the multiverse.",
      },
    ],
  }),
  component: Faq,
});

const QA = [
  ["Who can participate?", "Any undergraduate or postgraduate student with a valid college ID. Cross-college and cross-year teams are welcome."],
  ["Is there a registration fee?", "No. PARADOX is free for all shortlisted teams. Meals and overnight access are included."],
  ["How big can a team be?", "Two to four members. Solo participants are matched into teams at the opening ceremony."],
  ["Do I need to be an expert?", "No. Roughly a third of every cohort are first-time hackers. Mentors are on the floor all 36 hours."],
  ["Can I start building beforehand?", "You can plan, research and design. All code must be written after the problem reveal."],
  ["What should I bring?", "Laptop, chargers, extension cord, college ID, and any hardware your idea needs. Sleeping bags are allowed."],
  ["Is it offline?", "Yes, fully offline at Gurukul Building, IEM Saltlake. Overnight stay is permitted with consent forms."],
  ["How do I submit?", "A public repository plus a three-minute demo video, submitted through the portal before code freeze."],
] as const;

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <ScrollVideoBackground src={smoke.url} srcWebm={smokeWebm.url} zoom={1.5} tint="mystic" dim={0.05} />
      <PageShell
        eyebrow="Chapter IV"
        title="Questions Across Timelines"
        lede="The answers that stayed constant in every version of this event."
      >
        <Section className="mx-auto max-w-3xl px-6 py-20">
          <div className="space-y-3">
            {QA.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div
                  key={q}
                  className={`overflow-hidden rounded-2xl border backdrop-blur transition-colors ${
                    isOpen ? "border-accent/50 bg-background/70" : "border-border/70 bg-background/50"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-serif text-lg text-foreground/90">{q}</span>
                    <span
                      className={`text-accent transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="mx-auto max-w-3xl px-6 pb-28 text-center">
          <div className="rune-panel rounded-3xl p-10">
            <h2 className="font-display text-3xl text-ember-gradient">Still uncertain?</h2>
            <p className="mt-3 text-muted-foreground">
              Reach the organising sanctum at paradox@ieee-iem.org — we answer across all timelines.
            </p>
            <a
              href="#register"
              className="mt-8 inline-block rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
              style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}
            >
              Register now
            </a>
          </div>
        </Section>
      </PageShell>
    </>
  );
}
