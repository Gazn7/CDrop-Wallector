"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    w: "Week 1",
    t: "Discovery",
    p: "Audit your catalog structure. Map the queries your customers actually run.",
    m: "Output: scoped spec"
  },
  {
    n: "02",
    w: "Week 2",
    t: "Build",
    p: "We wire your catalog into our AI core. You see a working prototype on Friday.",
    m: "Output: live prototype"
  },
  {
    n: "03",
    w: "Week 3",
    t: "Brand & test",
    p: "100% your brand: name, voice, cards, edge cases. Internal QA on real shoppers.",
    m: "Output: branded app"
  },
  {
    n: "04",
    w: "Week 4",
    t: "Launch",
    p: "We submit to the OpenAI store and set up hosting. You get the keys.",
    m: "Output: public app"
  }
];

function FlipCard({ step }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`tl-card${flipped ? " tl-card--flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${step.n} ${step.t}, ${step.w}`}
    >
      <div className="tl-card-inner">
        <div className="tl-face tl-face--front">
          <span className="tl-step">{step.n}</span>
          <span className="tl-week">{step.w}</span>
          <h3>{step.t}</h3>
          <span className="tl-hint">Tap to expand</span>
        </div>
        <div className="tl-face tl-face--back">
          <span className="tl-week">
            {step.w} · {step.t}
          </span>
          <p>{step.p}</p>
          <div className="tl-meta">
            <b>→</b> {step.m}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Timeline() {
  return (
    <section className="section tl-section" id="process">
      <div className="container">
        <Reveal>
          <div className="s-head-row">
            <div className="s-head">
              <span className="eyebrow">How we work</span>
              <h2>
                From zero to live in <em>4 weeks</em>,<br />not 4 quarters
              </h2>
            </div>
            <p style={{ color: "var(--muted-1)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 380 }}>
              Fixed scope, fixed timeline, fixed price. We&rsquo;ve done it before; we know where it gets stuck.
            </p>
          </div>
        </Reveal>

        <div className="tl-grid">
          <div className="tl-line" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <FlipCard step={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
