import { useEffect, useRef, useState } from "react";

export type StageClip = {
  /** id of the <section> this clip belongs to */
  id: string;
  src: string;
  srcWebm?: string;
  tint?: "ember" | "gold" | "mystic" | "toxic";
  zoom?: number;
};

const TINTS: Record<string, string> = {
  ember:
    "radial-gradient(120% 80% at 50% 10%, color-mix(in oklab, var(--ember) 26%, transparent), transparent 72%)",
  gold: "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--gold) 24%, transparent), transparent 70%)",
  mystic:
    "radial-gradient(120% 80% at 50% 10%, color-mix(in oklab, var(--mystic) 30%, transparent), transparent 70%)",
  toxic:
    "radial-gradient(120% 80% at 50% 10%, color-mix(in oklab, var(--toxic) 22%, transparent), transparent 70%)",
};

/**
 * One fixed video stage for the whole page.
 *
 * - Each clip is bound to a section id; the clip cross-fades in while that
 *   section owns the viewport.
 * - Videos never autoplay: currentTime is scrubbed from the section's own
 *   scroll progress (dense-keyframe encodes make seeking frame-accurate).
 * - Loading is lazy: only the active clip and the next one get a <source>.
 *   Everything else stays an empty <video> element, so mobile downloads
 *   one clip at a time instead of five.
 */
export function ScrollVideoStage({ clips }: { clips: StageClip[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [loadUpTo, setLoadUpTo] = useState(1); // index of the furthest clip allowed to load
  const [active, setActive] = useState(0);
  const stateRef = useRef({ active: 0, progress: 0, eased: 0 });

  useEffect(() => {
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const vh = window.innerHeight;
      let bestIdx = 0;
      let bestVisible = -1;
      let progress = 0;

      clips.forEach((clip, i) => {
        const el = document.getElementById(clip.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        if (visible > bestVisible) {
          bestVisible = visible;
          bestIdx = i;
          const span = r.height + vh;
          progress = span > 0 ? Math.min(1, Math.max(0, (vh - r.top) / span)) : 0;
        }
      });

      stateRef.current.active = bestIdx;
      stateRef.current.progress = progress;
    };

    const tick = () => {
      measure();
      const { active: idx, progress } = stateRef.current;
      stateRef.current.eased += (progress - stateRef.current.eased) * (reduce ? 1 : 0.12);
      const eased = stateRef.current.eased;

      setActive((prev) => (prev === idx ? prev : idx));
      setLoadUpTo((prev) => (idx + 1 > prev ? idx + 1 : prev));

      const video = videoRefs.current[idx];
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        const t = eased * (video.duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.012) video.currentTime = t;
      }

      const zoom = clips[idx]?.zoom ?? 1.3;
      const wrap = containerRef.current;
      if (wrap) {
        wrap.style.transform = `scale(${(1 + (zoom - 1) * eased).toFixed(4)})`;
        wrap.style.filter = `saturate(${(1.05 + eased * 0.4).toFixed(2)}) contrast(${(
          1 + eased * 0.18
        ).toFixed(2)})`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clips]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div ref={containerRef} className="absolute inset-0 will-change-transform">
        {clips.map((clip, i) => {
          const shouldLoad = i <= loadUpTo;
          return (
            <video
              key={clip.id}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              playsInline
              disablePictureInPicture
              preload={i === active ? "auto" : i === active + 1 ? "metadata" : "none"}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              {shouldLoad ? <source src={clip.src} type="video/mp4" /> : null}
              {shouldLoad && clip.srcWebm ? (
                <source src={clip.srcWebm} type="video/webm" />
              ) : null}
            </video>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 veil" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-all duration-700"
        style={{ background: TINTS[clips[active]?.tint ?? "ember"] }}
      />
      <div className="pointer-events-none absolute inset-0 concrete opacity-[0.5]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 3px, oklch(0 0 0 / 0.55) 3px 4px)",
        }}
      />
    </div>
  );
}
