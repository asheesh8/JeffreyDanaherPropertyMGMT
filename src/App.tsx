import { useEffect, useState } from "react";
import { Backdrop } from "./components/Backdrop";
import { BUSINESS } from "./data";
import { isViewId, VIEWS, type ViewId } from "./nav";
import { Home } from "./views/Home";
import { Services } from "./views/Services";
import { About } from "./views/About";
import { Work } from "./views/Work";
import { Contact } from "./views/Contact";

const readHash = (): ViewId => {
  const h = window.location.hash.replace("#", "");
  return isViewId(h) ? h : "home";
};

export default function App() {
  const [view, setView] = useState<ViewId>(readHash);
  const [menu, setMenu] = useState(false);
  const [booting, setBooting] = useState(true);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1150);
    const safety = setTimeout(() => setGone(true), 2600);
    return () => {
      clearTimeout(t);
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    const onHash = () => setView(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (v: ViewId) => {
    setMenu(false);
    window.location.hash = v;
    setView(v);
  };

  useEffect(() => {
    const meta = VIEWS.find((v) => v.id === view);
    document.title =
      view === "home"
        ? `${BUSINESS.name} — Essex, Vermont`
        : `${meta?.label} — ${BUSINESS.short} Property Management`;
  }, [view]);

  return (
    <>
      <Backdrop dim={view !== "home"} />
      <div className="gridlines" aria-hidden>
        <i /><i /><i />
      </div>
      <div className="vignette" aria-hidden />
      <div className="grain" aria-hidden />

      <div className="shell">
        <header className="bar">
          <a className="brand" href="#home" onClick={() => go("home")}>
            <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="" />
            <span className="brand__txt">
              <span className="brand__name">Jeffrey Danaher</span>
              <span className="brand__sub">Property Management</span>
            </span>
          </a>

          <nav className="nav">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                className="nav__item"
                data-on={view === v.id}
                onClick={() => go(v.id)}
                aria-current={view === v.id ? "page" : undefined}
              >
                <i>{v.n}</i>
                {v.label}
              </button>
            ))}
          </nav>

          <a className="bar__phone" href={`tel:${BUSINESS.phoneRaw}`}>
            {BUSINESS.phone}
          </a>
          <button
            className="burger"
            data-open={menu}
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
          >
            <i /><i />
          </button>
        </header>

        <main className="stage">
          <div key={view} style={{ position: "absolute", inset: 0 }}>
            {view === "home" && <Home go={go} />}
            {view === "services" && <Services go={go} />}
            {view === "about" && <About />}
            {view === "work" && <Work />}
            {view === "contact" && <Contact />}
          </div>
        </main>

        <footer className="footbar">
          <span>
            <span className="dot" aria-hidden />
            {BUSINESS.location} · {BUSINESS.region}
          </span>
          <span className="footbar__mid">
            {VIEWS.find((v) => v.id === view)?.n} / {String(VIEWS.length).padStart(2, "0")} —{" "}
            {VIEWS.find((v) => v.id === view)?.label}
          </span>
          <span>
            <span className="sep">Hours</span> {BUSINESS.hours}
          </span>
        </footer>
      </div>

      {menu && (
        <div className="drawer">
          {VIEWS.map((v) => (
            <button key={v.id} onClick={() => go(v.id)}>
              <span>{v.n}</span>
              {v.label}
            </button>
          ))}
          <a className="cta cta--solid cta--lg" href={`tel:${BUSINESS.phoneRaw}`}>
            <span>Call {BUSINESS.phone}</span>
          </a>
        </div>
      )}

      {!gone && (
        <div className="intro" data-done={!booting} onAnimationEnd={() => !booting && setGone(true)}>
          <p className="brand__name" style={{ fontSize: "clamp(1.1rem,3vw,1.6rem)" }}>
            Jeffrey Danaher
          </p>
          <div className="intro__bar">
            <i />
          </div>
          <p className="brand__sub">Property Management · Essex, Vermont</p>
        </div>
      )}
    </>
  );
}
