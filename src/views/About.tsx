import { useState, type CSSProperties } from "react";
import { ABOUT_PARAGRAPHS, ABOUT_PULLQUOTE, CREDENTIALS } from "../data";
import { Img } from "../components/Img";

const at = (i: number) => ({ "--i": i } as CSSProperties);

const half = Math.ceil(ABOUT_PARAGRAPHS.length / 2);
const COLS = [ABOUT_PARAGRAPHS.slice(0, half), ABOUT_PARAGRAPHS.slice(half)];

export function About() {
  const [page, setPage] = useState(0);
  const next = (dir: 1 | -1) =>
    setPage((p) => (p + dir + ABOUT_PARAGRAPHS.length) % ABOUT_PARAGRAPHS.length);

  return (
    <div className="view svc">
      <header className="view__head">
        <div>
          <p className="eyebrow">03 — About</p>
          <h2 className="h-view">
            Thirty-three years of
            <br />
            showing up on time.
          </h2>
        </div>
      </header>

      <div className="about__body">
        <div className="about__left rise" style={at(0)}>
          <figure className="about__figure">
            <Img name="thank-you" alt="A hand-drawn thank you note from children at a local YMCA" eager />
            <figcaption className="about__cap">
              “Thank you Danaher — for keeping our school clean and our bodies safe &amp; healthy.”
              <br />
              Left for the crew at a local YMCA
            </figcaption>
          </figure>
          <p className="pullquote">{ABOUT_PULLQUOTE}</p>
        </div>

        <div className="about__text">
          <div className="about__cols about__cols--desktop body-sm rise" style={at(1)}>
            {COLS.map((col, ci) => (
              <div key={ci}>
                {col.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="about__mobile body-sm rise" style={at(1)}>
            <p>{ABOUT_PARAGRAPHS[page]}</p>
            <div className="about__pager">
              <button type="button" className="cta cta--ghost" onClick={() => next(-1)} aria-label="Previous about note">
                <span aria-hidden>←</span>
              </button>
              <span className="label">
                {String(page + 1).padStart(2, "0")} / {String(ABOUT_PARAGRAPHS.length).padStart(2, "0")}
              </span>
              <button type="button" className="cta cta--ghost" onClick={() => next(1)} aria-label="Next about note">
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          <dl className="creds rise" style={at(2)}>
            {CREDENTIALS.map((c) => (
              <div className="cred" key={c.k}>
                <dt>{c.k}</dt>
                <dd>{c.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
