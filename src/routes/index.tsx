import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import portal from "@/assets/portal.mp4.asset.json";
import portalWebm from "@/assets/portal.webm.asset.json";
import strange from "@/assets/strange.mp4.asset.json";
import strangeWebm from "@/assets/strange.webm.asset.json";
import sparks from "@/assets/sparks.mp4.asset.json";
import sparksWebm from "@/assets/sparks.webm.asset.json";
import orb from "@/assets/orb.mp4.asset.json";
import orbWebm from "@/assets/orb.webm.asset.json";
import smoke from "@/assets/smoke.mp4.asset.json";
import smokeWebm from "@/assets/smoke.webm.asset.json";

import { ScrollVideoStage, type StageClip } from "@/components/ScrollVideoStage";
import { ChapterHead, Section, Sigil, SiteFooter, SiteNav } from "@/components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARADOX 2026 — A Hackathon Beyond Logic" },
      {
        name: "description",
        content:
          "PARADOX is a 36-hour hackathon at IEM Saltlake where impossible ideas become real solutions. Tracks, rules, schedule and FAQ in one scroll.",
      },
      { property: "og:title", content: "PARADOX 2026 — A Hackathon Beyond Logic" },
      {
        property: "og:description",
        content:
          "Step into the multiverse of innovation. XX September 2026, Gurukul Building, IEM Saltlake.",
      },
    ],
  }),
  component: Home,
});

const CLIPS: StageClip[] = [
  { id: "home", src: portal.url, srcWebm: portalWebm.url, tint: "ember", zoom: 1.35 },
  { id: "about", src: strange.url, srcWebm: strangeWebm.url, tint: "gold", zoom: 1.4 },
  { id: "guide", src: sparks.url, srcWebm: sparksWebm.url, tint: "toxic", zoom: 1.3 },
  { id: "schedule", src: orb.url, srcWebm: orbWebm.url, tint: "gold", zoom: 1.45 },
  { id: "faq", src: smoke.url, srcWebm: smokeWebm.url, tint: "mystic", zoom: 1.5 },
];

const STATS = [
  { k: "36h", v: "of unbroken build time" },
  { k: "500+", v: "sorcerers of code" },
  { k: "6", v: "problem dimensions" },
  { k: "\u20b91L+", v: "in prize relics" },
];

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

const DAYS = [
  {
    day: "Day One",
    items: [
      ["08:30", "Check-in & sanctum setup", "Teams verified, kits handed out, wifi charms cast."],
      ["10:00", "Opening ceremony", "Keynote from the masters and the rules of the realm."],
      ["11:00", "Problem reveal", "Six tracks open. The clock starts."],
      ["15:00", "Mentor round I", "Industry mentors walk the floor for scope surgery."],
      ["20:00", "Checkpoint review", "First prototype snapshot from every team."],
      ["23:30", "Midnight ritual", "Games, caffeine and the infamous debugging quiz."],
    ],
  },
  {
    day: "Day Two",
    items: [
      ["06:00", "Sunrise stretch", "Because posture is also a superpower."],
      ["09:00", "Mentor round II", "Final polish, pitch shaping, demo rehearsal."],
      ["13:00", "Code freeze", "Repos locked. Submissions sealed."],
      ["14:00", "Judging rounds", "Table judging, then top 10 stage pitches."],
      ["17:30", "Closing ceremony", "Winners, relics and the portal closes."],
    ],
  },
] as const;

const QA = [
  [
    "Who can participate?",
    "Any undergraduate or postgraduate student with a valid college ID. Cross-college and cross-year teams are welcome.",
  ],
  [
    "Is there a registration fee?",
    "No. PARADOX is free for all shortlisted teams. Meals and overnight access are included.",
  ],
  [
    "How big can a team be?",
    "Two to four members. Solo participants are matched into teams at the opening ceremony.",
  ],
  [
    "Do I need to be an expert?",
    "No. Roughly a third of every cohort are first-time hackers. Mentors are on the floor all 36 hours.",
  ],
  [
    "Can I start building beforehand?",
    "You can plan, research and design. All code must be written after the problem reveal.",
  ],
  [
    "What should I bring?",
    "Laptop, chargers, extension cord, college ID, and any hardware your idea needs. Sleeping bags are allowed.",
  ],
  [
    "Is it offline?",
    "Yes, fully offline at Gurukul Building, IEM Saltlake. Overnight stay is permitted with consent forms.",
  ],
  [
    "How do I submit?",
    "A public repository plus a three-minute demo video, submitted through the portal before code freeze.",
  ],
] as const;

function Home() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <ScrollVideoStage clips={CLIPS} />
      <SiteNav />

      <main className="relative z-10">
        {/* ---------------- HOME ---------------- */}
        <section id="home" className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-28">
          <div className="relative">
            <Sigil className="absolute -left-24 -top-24 hidden size-72 opacity-40 lg:block" />
            <span className="inline-block -rotate-3 tape px-3 py-1 font-display text-xs uppercase tracking-[0.3em] animate-tag-wobble">
              Code. Create. Defy reality.
            </span>
            <h1 className="mt-6 font-display text-[clamp(4rem,16vw,13rem)] leading-[0.82] uppercase text-spray-gradient spray-shadow">
              Paradox
            </h1>
            <p className="mt-2 font-tag text-2xl text-accent/90 sm:text-3xl">
              a hackathon beyond logic
            </p>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/80">
              Step into the multiverse of innovation. Where impossible ideas become real solutions.
              Break the limits — rewrite what&rsquo;s possible.
            </p>

            <div className="mt-10 flex w-fit flex-col gap-6 rounded-2xl pasteup px-6 py-5 sm:flex-row sm:items-center sm:gap-10">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-accent/85">Date</p>
                <p className="mt-1 font-serif text-lg">XX September, 2026</p>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block" />
              <div>
                <p className="font-display text-xs uppercase tracking-[0.3em] text-accent/85">Venue</p>
                <p className="mt-1 font-serif text-lg">Gurukul Building, IEM Saltlake</p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#register"
                className="-rotate-1 rounded-md px-8 py-3.5 font-display text-base uppercase tracking-[0.22em] text-primary-foreground transition-transform hover:rotate-0 hover:scale-[1.04]"
                style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}
              >
                Register now
              </a>
              <a
                href="#about"
                className="rotate-1 rounded-md border-2 border-accent/50 px-8 py-3.5 font-display text-base uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent/10"
              >
                Explore more
              </a>
            </div>

            <p className="mt-14 font-tag text-sm text-foreground/45">scroll to bend reality ↓</p>
          </div>
        </section>

        <Section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.k}
                className="pasteup rounded-xl px-7 py-9"
                style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}
              >
                <p className="font-display text-5xl text-spray-gradient">{s.k}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- ABOUT ---------------- */}
        <Section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
          <ChapterHead
            eyebrow="Chapter I"
            title="About Paradox"
            lede="A gateway to infinite possibilities, disguised as a hackathon."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="pasteup -rotate-1 rounded-2xl p-9">
              <p className="text-lg leading-relaxed text-foreground/85">
                PARADOX is more than a hackathon — it&rsquo;s a gateway to infinite possibilities.
                Inspired by the mystic arts of bending reality, it challenges you to question
                conventions, explore the unknown, and build solutions that create impact.
              </p>
              <p className="mt-6 leading-relaxed text-foreground/70">
                Across dimensions of technology and creativity, come together to solve real-world
                problems with extraordinary ideas. The only limit is your imagination.
              </p>
              <p className="mt-8 font-tag text-2xl text-spray-gradient">
                One reality. Limitless possibilities.
              </p>
            </div>
            <div className="space-y-5">
              {PILLARS.map((p) => (
                <div
                  key={p.n}
                  className="group rounded-xl border-2 border-border/70 bg-background/55 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/60"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl text-accent/70">{p.n}</span>
                    <h3 className="font-serif text-lg tracking-wide">{p.t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <blockquote className="mx-auto max-w-3xl font-tag text-3xl leading-snug text-foreground/90 sm:text-4xl">
              &ldquo;In the multiverse of ideas, you are the anomaly that{" "}
              <span className="text-spray-gradient">changes everything</span>.&rdquo;
            </blockquote>
            <p className="mt-6 font-display text-sm uppercase tracking-[0.36em] text-accent/75">
              IEEE IEM–UEM Student Branch
            </p>
          </div>
        </Section>

        {/* ---------------- GUIDE ---------------- */}
        <Section id="guide" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
          <ChapterHead
            eyebrow="Chapter II"
            title="Hackers Guide"
            lede="Rules, tracks and judging — so you can focus on building the impossible."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <div
                key={t.t}
                className="rounded-xl border-2 border-border/70 bg-background/55 p-7 backdrop-blur transition-transform hover:-translate-y-1.5 hover:border-accent/60"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                <h3 className="font-display text-2xl uppercase tracking-wide text-accent/90">
                  {t.t}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="font-tag text-3xl text-spray-gradient">The rules of the realm</h3>
              <ol className="mt-8 space-y-5">
                {RULES.map((r, i) => (
                  <li key={r} className="flex gap-5">
                    <span className="font-display text-2xl text-accent/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-foreground/80">{r}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="pasteup h-fit rotate-1 rounded-2xl p-8">
              <h3 className="font-display text-2xl uppercase tracking-wide">Judging weights</h3>
              <div className="mt-6 space-y-5">
                {JUDGING.map((j) => (
                  <div key={j.k}>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/80">{j.k}</span>
                      <span className="text-accent">{j.v}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${j.v * 2}%`, background: "var(--gradient-spray)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------- SCHEDULE ---------------- */}
        <Section id="schedule" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
          <ChapterHead
            eyebrow="Chapter III"
            title="The Timeline"
            lede="36 hours, two days, one collapsing deadline."
          />
          {DAYS.map((d) => (
            <div key={d.day} className="mt-14">
              <h3 className="font-tag text-3xl text-spray-gradient">{d.day}</h3>
              <ol className="mt-8 space-y-0 border-l-2 border-accent/35 pl-8">
                {d.items.map(([time, title, desc]) => (
                  <li key={time} className="relative pb-10">
                    <span
                      className="absolute -left-[42px] top-2 size-3.5 rounded-full"
                      style={{
                        background: "var(--gradient-spray)",
                        boxShadow: "var(--shadow-rune)",
                      }}
                    />
                    <p className="font-display text-lg tracking-[0.2em] text-accent/90">{time}</p>
                    <h4 className="mt-1 text-xl text-foreground/90">{title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <div className="pasteup mt-6 -rotate-1 rounded-2xl p-9 text-center">
            <p className="font-tag text-2xl text-spray-gradient">Times are indicative</p>
            <p className="mt-3 text-sm text-muted-foreground">
              The final schedule is shared with registered teams one week before the event.
            </p>
          </div>
        </Section>

        {/* ---------------- FAQ ---------------- */}
        <Section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28">
          <ChapterHead
            eyebrow="Chapter IV"
            title="Questions Across Timelines"
            lede="The answers that stayed constant in every version of this event."
          />
          <div className="mt-12 space-y-3">
            {QA.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div
                  key={q}
                  className={`overflow-hidden rounded-xl border-2 backdrop-blur transition-colors ${
                    isOpen
                      ? "border-accent/60 bg-background/70"
                      : "border-border/70 bg-background/50"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-serif text-base text-foreground/90">{q}</span>
                    <span
                      className={`text-2xl text-accent transition-transform duration-300 ${
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

          <div id="register" className="pasteup mt-16 scroll-mt-28 rounded-2xl p-10 text-center">
            <h3 className="font-display text-4xl uppercase text-spray-gradient spray-shadow">
              Claim your slot
            </h3>
            <p className="mt-3 text-muted-foreground">
              Reach the organising sanctum at paradox@ieee-iem.org — we answer across all timelines.
            </p>
            <a
              href="mailto:paradox@ieee-iem.org"
              className="mt-8 inline-block -rotate-1 rounded-md px-8 py-3.5 font-display text-base uppercase tracking-[0.22em] text-primary-foreground transition-transform hover:rotate-0 hover:scale-[1.04]"
              style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-ember)" }}
            >
              Register now
            </a>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
