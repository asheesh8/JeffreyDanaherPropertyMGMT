import { useMemo, useState } from "react";
import { BUSINESS, CONSENT_MARKETING, CONSENT_TRANSACTIONAL, FORM_SERVICES } from "../data";

/**
 * Set to a Formspree / GoHighLevel webhook URL to capture leads server-side.
 * While null, the form composes a pre-filled email to the owner instead.
 */
const FORM_ENDPOINT: string | null = null;

type Data = {
  name: string; email: string; phone: string;
  street: string; city: string; state: string; postal: string;
  services: string[]; other: string;
  details: string; extra: string; start: string;
  marketing: boolean; transactional: boolean;
};

const EMPTY: Data = {
  name: "", email: "", phone: "",
  street: "", city: "", state: "VT", postal: "",
  services: [], other: "",
  details: "", extra: "", start: "",
  marketing: false, transactional: false,
};

const STEPS = ["Contact", "Property", "Services", "Details", "Send"];

const Check = ({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) => (
  <button type="button" className="check" data-on={on} onClick={onClick} aria-pressed={on}>
    <span className="check__box" aria-hidden>
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.4L3.3 5.7 8 1" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
    <span>{label}</span>
  </button>
);

export function Contact() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(EMPTY);
  const [showErr, setShowErr] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((p) => ({ ...p, [k]: v }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Data, string>> = {};
    if (step === 0) {
      if (!d.name.trim()) e.name = "Required";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) e.email = "Valid email required";
      if (d.phone.replace(/\D/g, "").length < 10) e.phone = "10-digit phone required";
    }
    if (step === 3 && !d.details.trim()) e.details = "Please describe the job";
    return e;
  }, [step, d]);

  const blocked = Object.keys(errors).length > 0;

  const next = () => {
    if (blocked) return setShowErr(true);
    setShowErr(false);
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => {
    setShowErr(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    const picked = [...d.services, d.other.trim() && `Other: ${d.other.trim()}`].filter(Boolean);
    const lines = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone}`,
      `Address: ${[d.street, d.city, d.state, d.postal].filter(Boolean).join(", ") || "—"}`,
      `Services: ${picked.join("; ") || "—"}`,
      `Expected start: ${d.start || "—"}`,
      "",
      "Job description:",
      d.details,
      d.extra ? `\nAdditional notes:\n${d.extra}` : "",
      "",
      `Marketing texts: ${d.marketing ? "yes" : "no"}`,
      `Service texts: ${d.transactional ? "yes" : "no"}`,
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n");

    if (FORM_ENDPOINT) {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, summary: lines }),
      }).catch(() => {});
    } else {
      window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
        `Estimate request — ${d.name}`
      )}&body=${encodeURIComponent(lines)}`;
    }
    setSent(true);
  };

  return (
    <div className="view svc">
      <header className="view__head">
        <div>
          <p className="eyebrow">05 — Contact</p>
          <h2 className="h-view">
            Tell us about the
            <br />
            property. It’s free.
          </h2>
        </div>
      </header>

      <div className="contact__body">
        <aside className="contact__aside">
          <div className="cline">
            <span className="label">Call or text</span>
            <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a>
          </div>
          <div className="cline">
            <span className="label">Email</span>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </div>
          <div className="cline">
            <span className="label">Service hours</span>
            <span>{BUSINESS.hours}</span>
          </div>
          <div className="cline">
            <span className="label">Based in</span>
            <span>{BUSINESS.location}</span>
          </div>
          <div className="contact__note">
            <p className="body-sm">
              Serving {BUSINESS.region}. Fully insured, commercial and residential, {BUSINESS.yearsInBusiness} years
              in business.
            </p>
          </div>
        </aside>

        {sent ? (
          <div className="done">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Received</p>
            <h3 className="h-view">Thanks — we’ll be in touch.</h3>
            <p className="lede" style={{ maxWidth: "42ch" }}>
              {FORM_ENDPOINT
                ? "Your request is in. Jeffrey usually replies the same day during service hours."
                : "Your email app should have opened with the request ready to send. If it didn’t, call or text us directly."}
            </p>
            <a className="cta cta--solid cta--lg" href={`tel:${BUSINESS.phoneRaw}`}>
              <span>{BUSINESS.phone}</span>
            </a>
          </div>
        ) : (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="steps">
              {STEPS.map((s, idx) => (
                <span className="step-pip" key={s} data-done={idx <= step} title={s}>
                  <i />
                </span>
              ))}
            </div>

            <div className="fieldset stepin" key={step}>
                {step === 0 && (
                  <>
                    <div className="field">
                      <label htmlFor="f-name">Full name <b>*</b></label>
                      <input
                        id="f-name" value={d.name} onChange={(e) => set("name", e.target.value)}
                        placeholder="Jane Smith" autoComplete="name"
                        aria-invalid={showErr && !!errors.name}
                      />
                      {showErr && errors.name && <span className="err">{errors.name}</span>}
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label htmlFor="f-email">Email <b>*</b></label>
                        <input
                          id="f-email" type="email" value={d.email} onChange={(e) => set("email", e.target.value)}
                          placeholder="jane@example.com" autoComplete="email"
                          aria-invalid={showErr && !!errors.email}
                        />
                        {showErr && errors.email && <span className="err">{errors.email}</span>}
                      </div>
                      <div className="field">
                        <label htmlFor="f-phone">Phone <b>*</b></label>
                        <input
                          id="f-phone" type="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)}
                          placeholder="(802) 555-0134" autoComplete="tel"
                          aria-invalid={showErr && !!errors.phone}
                        />
                        {showErr && errors.phone && <span className="err">{errors.phone}</span>}
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="field">
                      <label htmlFor="f-street">Street address</label>
                      <input id="f-street" value={d.street} onChange={(e) => set("street", e.target.value)}
                        placeholder="12 Maple Street" autoComplete="street-address" />
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label htmlFor="f-city">City</label>
                        <input id="f-city" value={d.city} onChange={(e) => set("city", e.target.value)}
                          placeholder="Essex" autoComplete="address-level2" />
                      </div>
                      <div className="field">
                        <label htmlFor="f-state">State</label>
                        <input id="f-state" value={d.state} onChange={(e) => set("state", e.target.value)}
                          placeholder="VT" autoComplete="address-level1" />
                      </div>
                      <div className="field">
                        <label htmlFor="f-postal">Postal code</label>
                        <input id="f-postal" value={d.postal} onChange={(e) => set("postal", e.target.value)}
                          placeholder="05452" autoComplete="postal-code" />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="field">
                      <label>Services needed — check all that apply</label>
                      <div className="checks">
                        {FORM_SERVICES.map((s) => (
                          <Check
                            key={s} label={s} on={d.services.includes(s)}
                            onClick={() =>
                              set("services", d.services.includes(s)
                                ? d.services.filter((x) => x !== s)
                                : [...d.services, s])
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="f-other">If other, please specify</label>
                      <input id="f-other" value={d.other} onChange={(e) => set("other", e.target.value)}
                        placeholder="Anything else you need handled" />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="field">
                      <label htmlFor="f-details">Brief description of the job <b>*</b></label>
                      <textarea
                        id="f-details" rows={3} value={d.details} onChange={(e) => set("details", e.target.value)}
                        placeholder="Half-acre lot, weekly mowing plus spring cleanup and mulch on three beds."
                        aria-invalid={showErr && !!errors.details}
                      />
                      {showErr && errors.details && <span className="err">{errors.details}</span>}
                    </div>
                    <div className="frow">
                      <div className="field">
                        <label htmlFor="f-extra">Additional info or questions</label>
                        <textarea id="f-extra" rows={2} value={d.extra} onChange={(e) => set("extra", e.target.value)}
                          placeholder="Gate code, dog on property, preferred day…" />
                      </div>
                      <div className="field">
                        <label htmlFor="f-start">Expected start date</label>
                        <input id="f-start" type="date" value={d.start} onChange={(e) => set("start", e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div className="consent">
                    <Check on={d.marketing} label={CONSENT_MARKETING} onClick={() => set("marketing", !d.marketing)} />
                    <Check
                      on={d.transactional} label={CONSENT_TRANSACTIONAL}
                      onClick={() => set("transactional", !d.transactional)}
                    />
                    <p className="body-sm" style={{ marginTop: "0.4rem" }}>
                      Consent is optional — we’ll still get your request either way.
                    </p>
                  </div>
                )}
            </div>

            <div className="form__foot">
              <button type="button" className="linkbtn" onClick={back} disabled={step === 0}>
                ← Back
              </button>
              <span className="label" style={{ textAlign: "center" }}>
                Step {step + 1} of {STEPS.length} — {STEPS[step]}
              </span>
              {step < STEPS.length - 1 ? (
                <button type="button" className="cta" onClick={next}>
                  <span>Continue</span>
                  <span aria-hidden>→</span>
                </button>
              ) : (
                <button type="button" className="cta cta--solid" onClick={submit}>
                  <span>Send request</span>
                  <span aria-hidden>→</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
