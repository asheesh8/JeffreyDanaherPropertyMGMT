import { useEffect, useRef, useState } from "react";
import meta from "../imageMeta.json";

type Meta = Record<string, { ar: number; lqip: string }>;
const M = meta as Meta;

export function Img({
  name,
  alt,
  className = "",
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    setShowPlaceholder(true);
    if (ref.current?.complete) setLoaded(true);
  }, [name]);

  // drop the blurred placeholder from the tree once it has faded — a filtered
  // layer parked at opacity 0 keeps compositing and can hide the real photo
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setShowPlaceholder(false), 650);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div className={`img ${className}`} data-loaded={loaded}>
      {showPlaceholder && M[name] && <img className="ph" src={M[name].lqip} alt="" aria-hidden />}
      <img
        ref={ref}
        src={`${import.meta.env.BASE_URL}img/${name}.webp`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
