import { useEffect, useRef } from "react";

export function Backdrop({ dim }: { dim: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 0.62;
    const kick = () => void v.play().catch(() => {});
    kick();
    document.addEventListener("pointerdown", kick, { once: true });
    return () => document.removeEventListener("pointerdown", kick);
  }, []);

  return (
    <div className="backdrop">
      <video
        ref={ref}
        className="backdrop__video"
        src={`${import.meta.env.BASE_URL}video/mowing.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        style={{
          opacity: dim ? 0.3 : 1,
          filter: dim
            ? "saturate(0.5) contrast(1.04) brightness(0.6) blur(3px)"
            : "saturate(0.9) contrast(1.04) brightness(0.95)",
        }}
      />
      <div className="backdrop__scrim" />
      <div className="backdrop__tint" />
    </div>
  );
}
