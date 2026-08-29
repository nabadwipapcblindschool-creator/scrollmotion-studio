import { createFileRoute } from "@tanstack/react-router";
import orb from "@/assets/orb.mp4.asset.json";
import orbWebm from "@/assets/orb.webm.asset.json";
import { ScrollVideoBackground } from "@/components/ScrollVideoBackground";
import { PageShell, Section } from "@/components/SiteChrome";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — PARADOX 2026 Timeline" },
      {
        name: "description",
        content:
          "Hour-by-hour timeline for PARADOX 2026: check-in, problem reveal, mentor rounds, overnight build, judging and closing ceremony.",
      },
      { property: "og:title", content: "Schedule — PARADOX 2026 Timeline" },
      {
        property: "og:description",
        content: "36 hours across two days. See the full PARADOX timeline.",
      },
    ],
  }),
  component: Schedule,
});

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

function Schedule() {
  return (
    <>
      <ScrollVideoBackground src={orb.url} srcWebm={orbWebm.url} zoom={1.45} tint="gold" dim={0.16} />
      <PageShell
        eyebrow="Chapter III"
        title="The Timeline"
        lede="36 hours, two days, one collapsing deadline. Track every beat of the event."
      >
        {DAYS.map((d) => (
          <Section key={d.day} className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="font-display text-3xl text-ember-gradient">{d.day}</h2>
            <ol className="mt-10 space-y-0 border-l border-border/70 pl-8">
              {d.items.map(([time, title, desc]) => (
                <li key={time} className="relative pb-10">
                  <span
                    className="absolute -left-[41px] top-2 size-3 rounded-full"
                    style={{ background: "var(--gradient-ember)", boxShadow: "var(--shadow-rune)" }}
                  />
                  <p className="font-serif text-sm tracking-[0.28em] text-accent/85">{time}</p>
                  <h3 className="mt-1 text-xl text-foreground/90">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </li>
              ))}
            </ol>
          </Section>
        ))}

        <Section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="rune-panel rounded-3xl p-9 text-center">
            <p className="font-display text-2xl text-ember-gradient">Times are indicative</p>
            <p className="mt-3 text-sm text-muted-foreground">
              The final schedule is shared with registered teams one week before the event.
            </p>
          </div>
        </Section>
      </PageShell>
    </>
  );
}
