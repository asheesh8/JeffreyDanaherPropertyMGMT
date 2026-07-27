import { useState } from "react";
import { SERVICES } from "../data";
import { Img } from "../components/Img";
import type { ViewId } from "../nav";

export function Services({ go }: { go: (v: ViewId) => void }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const active = SERVICES[i];

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
