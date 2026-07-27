import { useState } from "react";
import { SERVICES } from "../data";
import { Img } from "../components/Img";
import type { ViewId } from "../nav";

export function Services({ go }: { go: (v: ViewId) => void }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const active = SERVICES[i];
  const wrap = (idx: number) => (idx + SERVICES.length) % SERVICES.length;
  const mobileServices = [
    { idx: wrap(i - 1), slot: "prev", label: "Previous service" },
    { idx: i, slot: "current", label: "Current service" },
    { idx: wrap(i + 1), slot: "next", label: "Next service" },
  ];

  const pick = (idx: number) => {
    if (idx === i) return;
    setPrev(i);
    setI(idx);
  };

  return (
    <div className="view svc">
      <header className="view__head">
        <div>
          <p className="eyebrow">02 — Services</p>
          <h2 className="h-view">
            Nine trades, one crew,
            <br />
            one phone number.
          </h2>
        </div>
        <button className="cta" onClick={() => go("contact")}>
          <span>Request a quote</span>
          <span aria-hidden>→</span>
        </button>
      </header>

      <div className="svc__body">
        <div className="svc__list" role="tablist" aria-label="Services">
          {SERVICES.map((s, idx) => (
            <button
              key={s.id}
              className="svc__row"
              role="tab"
              aria-selected={idx === i}
              data-on={idx === i}
              onClick={() => pick(idx)}
              onMouseEnter={() => pick(idx)}
              onFocus={() => pick(idx)}
            >
              <span className="svc__n">{s.n}</span>
              <span className="svc__t">{s.title}</span>
              <span className="svc__s">{s.season}</span>
            </button>
          ))}
        </div>

        <div className="svc__mobile-loop" role="tablist" aria-label="Services" key={`mobile-${i}`}>
          {mobileServices.map(({ idx, slot, label }) => {
            const s = SERVICES[idx];
            return (
              <button
                key={`${slot}-${s.id}`}
                className="svc__peek"
                role="tab"
                aria-label={`${label}: ${s.title}`}
                aria-selected={idx === i}
                data-slot={slot}
                data-on={idx === i}
                onClick={() => pick(idx)}
              >
                <span className="svc__n">{s.n}</span>
                <span className="svc__t">{s.short}</span>
                <span className="svc__s">{s.season}</span>
              </button>
            );
          })}
        </div>

        <div className="svc__panel">
          <div className="svc__figure">
            <div className="layer" key={`c-${i}`}>
              <Img name={active.img} alt={active.title} eager />
            </div>
            {prev !== null && (
              <div
                className="layer"
                data-prev="true"
                key={`p-${prev}`}
                onAnimationEnd={() => setPrev(null)}
              >
                <Img name={SERVICES[prev].img} alt="" eager />
              </div>
            )}
            <span className="svc__tag">{active.short}</span>
          </div>

          <div className="svc__copy stepin" key={active.id}>
            <p className="body-sm">{active.body}</p>
            <ul className="svc__bullets">
              {active.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
