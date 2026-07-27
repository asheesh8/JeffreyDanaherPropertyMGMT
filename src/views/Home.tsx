import type { CSSProperties } from "react";
import { BUSINESS, STATS } from "../data";
import type { ViewId } from "../nav";

const SEASONS = [
  { s: "Spring", w: "Cleanups · Mulch · Beds" },
  { s: "Summer", w: "Mowing · Pools · Ponds" },
  { s: "Autumn", w: "Leaves · Prep · Floors" },
  { s: "Winter", w: "Plowing · Roofs · Ice" },
];

const currentSeason = () => {
  const m = new Date().getMonth();
  return m <= 1 || m === 11 ? "Winter" : m <= 4 ? "Spring" : m <= 7 ? "Summer" : "Autumn";
};

const at = (i: number) => ({ "--i": i } as CSSProperties);

export function Home({ go }: { go: (v: ViewId) => void }) {
  const now = currentSeason();

  return (
    <div className="view home">
      <div className="home__grid">
        <div className="home__main">
          <p className="eyebrow rise" style={at(0)}>
            Est. {new Date().getFullYear() - BUSINESS.yearsInBusiness} · {BUSINESS.location}
          </p>

          <h1 className="display rise" style={at(1)}>
            Expert property care for <em>hassle-free</em> ownership
          </h1>

          <p className="lede home__sub rise" style={at(2)}>
            {BUSINESS.subline}
          </p>

          <div className="home__actions rise" style={at(3)}>
            <button className="cta cta--solid cta--lg" onClick={() => go("contact")}>
              <span>Get a free estimate</span>
              <span aria-hidden>→</span>
            </button>
            <button className="cta cta--ghost cta--lg" onClick={() => go("services")}>
              <span>What we do</span>
            </button>
          </div>
        </div>

        <aside className="home__side rise" style={at(4)}>
          <p className="label">Working now</p>
          <div className="home__seasons">
            {SEASONS.map((x) => (
              <p className="season" key={x.s}>
                <b>{x.s === now ? <s>{x.s}</s> : x.s}</b>
                <span>{x.w}</span>
              </p>
            ))}
          </div>
        </aside>
      </div>

      <div className="stats rise" style={at(5)}>
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <p className="stat__v">{s.value}</p>
            <p className="stat__l">{s.label}</p>
            <p className="stat__n">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
