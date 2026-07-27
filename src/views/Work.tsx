import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "../data";
import { Img } from "../components/Img";
import { aspect } from "../imageUtils";

const clampAr = (n: number) => Math.min(1.85, Math.max(0.64, n));

export function Work() {
  const rail = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState(false);
  const [prog, setProg] = useState({ w: 12, l: 0 });
  const [open, setOpen] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const w = Math.max(6, (el.clientWidth / el.scrollWidth) * 100);
    setProg({ w, l: max > 0 ? (el.scrollLeft / max) * (100 - w) : 0 });
  }, []);

  useEffect(() => {
    measure();
    const el = rail.current;
    el?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // vertical wheel → horizontal pan
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let down = false;
    let sx = 0;
    let sl = 0;
    let moved = 0;

    // a real drag ends in a click on whichever tile was under the cursor;
    // swallow that one click so panning never opens the lightbox
    const swallow = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const start = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      moved = 0;
      sx = e.clientX;
      sl = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!down) return;
      const d = e.clientX - sx;
      moved = Math.max(moved, Math.abs(d));
      if (moved > 5) {
        setDrag(true);
        el.scrollLeft = sl - d;
      }
    };
    const end = () => {
      if (!down) return;
      down = false;
      setDrag(false);
      if (moved > 5) {
        el.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(() => el.removeEventListener("click", swallow, true), 60);
      }
    };

    el.addEventListener("pointerdown", start);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    return () => {
      el.removeEventListener("pointerdown", start);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) {
        if (e.key === "Escape") setOpen(null);
        if (e.key === "ArrowRight") setOpen((v) => (v === null ? v : (v + 1) % GALLERY.length));
        if (e.key === "ArrowLeft") setOpen((v) => (v === null ? v : (v - 1 + GALLERY.length) % GALLERY.length));
        return;
      }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const shot = open === null ? null : GALLERY[open];

  return (
    <div className="view work">
      <header className="view__head">
        <div>
          <p className="eyebrow">04 — Work</p>
          <h2 className="h-view">
            Properties we keep
            <br />
            looking after.
          </h2>
        </div>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button className="cta cta--ghost" onClick={() => step(-1)} aria-label="Previous images">
            <span aria-hidden>←</span>
          </button>
          <button className="cta cta--ghost" onClick={() => step(1)} aria-label="Next images">
            <span aria-hidden>→</span>
          </button>
        </div>
      </header>

      <div className="rail-wrap">
        <div className="rail" ref={rail} data-drag={drag}>
          {GALLERY.map((s, idx) => (
            <button
              className="shot"
              key={s.img + idx}
              style={{ aspectRatio: String(clampAr(aspect(s.img))) }}
              onClick={() => setOpen(idx)}
              aria-label={`View ${s.title}`}
            >
              <Img name={s.img} alt={s.title} eager={idx < 4} />
              <span className="shot__idx">{String(idx + 1).padStart(2, "0")}</span>
              <span className="shot__meta">
                <span className="shot__t">{s.title}</span>
                <span className="shot__m">{s.meta}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="railfoot">
        <p className="railhint">
          Drag or scroll
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
            <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" />
          </svg>
        </p>
        <div className="progress">
          <i style={{ width: `${prog.w}%`, left: `${prog.l}%` }} />
        </div>
        <p className="railhint">{GALLERY.length} photographs · click to enlarge</p>
      </div>

      {shot && (
        <div
          className="lb"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={shot.title}
        >
            <button className="cta cta--ghost lb__close" onClick={() => setOpen(null)}>
              <span>Close</span>
            </button>
            <button
              className="lb__nav"
              data-d="prev"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => (v === null ? v : (v - 1 + GALLERY.length) % GALLERY.length));
              }}
              aria-label="Previous"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M16 4L7 13l9 9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <button
              className="lb__nav"
              data-d="next"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => (v === null ? v : (v + 1) % GALLERY.length));
              }}
              aria-label="Next"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M10 4l9 9-9 9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>

          <figure className="lb__frame" key={shot.img} onClick={(e) => e.stopPropagation()}>
            <img
              className="lb__img"
              src={`${import.meta.env.BASE_URL}img/${shot.img}.webp`}
              alt={shot.title}
            />
            <figcaption className="lb__meta">
              <span className="h-view" style={{ fontSize: "clamp(1.1rem,2.4vh,1.5rem)" }}>
                {shot.title}
              </span>
              <span className="label">
                {shot.meta} · {String(open! + 1).padStart(2, "0")} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
