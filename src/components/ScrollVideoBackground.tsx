import { useEffect, useRef } from "react";

type Props = {
  /** CDN url of a dense-keyframe mp4 (every frame is a keyframe, so seeking is instant) */
  src: string;
  /** webm fallback for browsers without H.264 */
  srcWebm?: string;
  /** how much the frame zooms in across the full scroll (1 = none) */
  zoom?: number;
  /** extra opacity of the darkening veil */
  dim?: number;
  /** optional hue tint layer */
  tint?: "ember" | "gold" | "mystic";
};

/**
 * Scroll-scrubbed video background.
 *
 * The video never "plays" — its currentTime is mapped to page scroll progress
 * and eased frame-by-frame with rAF, which is the same effect as decoding the
 * clip into an image sequence and stepping through frames on scroll.
 */
export function ScrollVideoBackground({
  src,
  srcWebm,
  zoom = 1.25,
  dim = 0,
  tint = "ember",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    let raf = 0;
    let target = 0;
    let current = 0;
    let ready = false;

    const readProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const onMeta = () => {
      ready = Number.isFinite(video.duration) && video.duration > 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    onMeta();

    const tick = () => {
      target = readProgress();
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;

      if (ready) {
        const t = current * (video.duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
      }

      const scale = 1 + (zoom - 1) * current;
      wrap.style.transform = `scale(${scale.toFixed(4)})`;
      wrap.style.filter = `saturate(${(1.05 + current * 0.35).toFixed(2)}) contrast(${(
        1 + current * 0.15
      ).toFixed(2)})`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [zoom]);

  const tintClass =
    tint === "gold"
      ? "bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)]"
      : tint === "mystic"
        ? "bg-[radial-gradient(120%_80%_at_50%_10%,color-mix(in_oklab,var(--mystic)_28%,transparent),transparent_70%)]"
        : "bg-[radial-gradient(120%_80%_at_50%_10%,color-mix(in_oklab,var(--ember)_22%,transparent),transparent_72%)]";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div ref={wrapRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
          {srcWebm ? <source src={srcWebm} type="video/webm" /> : null}
        </video>
      </div>
      <div className="pointer-events-none absolute inset-0 veil" />
      <div className={`pointer-events-none absolute inset-0 mix-blend-screen ${tintClass}`} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 3px, oklch(0 0 0 / 0.5) 3px 4px)",
        }}
      />
      {dim > 0 ? (
        <div
          className="pointer-events-none absolute inset-0 bg-background"
          style={{ opacity: dim }}
        />
      ) : null}
    </div>
  );
}
