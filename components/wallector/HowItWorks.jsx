"use client";

import { useState, useRef } from "react";
import Reveal from "./Reveal";

const PANELS = [
  {
    num: "01",
    title: "Ask, don't search",
    text: "Vague queries work. Incomplete ones too. The agent reads intent, not just keywords.",
    img: "/images/widget-1.jpg"
  },
  {
    num: "02",
    title: "Follow the thread",
    text: "\"Show me something similar but cheaper.\" That works. Every message builds on the last: a personal shopper, not a search bar.",
    img: "/images/widget-2.jpg"
  },
  {
    num: "03",
    title: "Search by image",
    text: "Upload a photo. The app finds similar works. No keywords. The picture is the query.",
    img: "/images/widget-3.jpg"
  }
];

const SPEC_CELLS = [
  {
    k: "Query type",
    v: <em>Natural</em>,
    note: "Plain English. Vague is fine. No required fields.",
    back:
      "No filters, no dropdowns. \"A blue thing for above the couch\" is a valid query. We parse intent, style, room, palette, scale."
  },
  {
    k: "Modality",
    v: "Text · Image",
    note: "Type, paste a photo, or describe a vibe. The picture is the query.",
    back:
      "Drop a screenshot of someone's living room. We extract palette, mood, era, and surface 6 pieces from your catalog that fit."
  },
  {
    k: "Memory",
    v: <em>Multi-turn</em>,
    note: "Refines on follow-ups. \"Cheaper\", \"moodier\", \"smaller\": all valid.",
    back:
      "Conversation state persists across the session. Customers iterate the way they would with a gallerist — not start from scratch."
  },
  {
    k: "Hosting",
    v: "OpenAI store",
    note: "Reachable inside ChatGPT. Free + paid tiers. Your brand, our pipes.",
    back:
      "Lives in the OpenAI app store, indexed by ChatGPT. We handle submission, hosting, and updates. You own the listing and the brand."
  }
];

function Coverflow() {
  const [active, setActive] = useState(1);
  const total = PANELS.length;
  const touchX = useRef(null);

  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (delta < -40) setActive((a) => (a + 1) % total);
    else if (delta > 40) setActive((a) => (a - 1 + total) % total);
  }

  return (
    <>
      <div className="cf-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {PANELS.map((p, idx) => {
          const offset = (idx - active + total) % total;
          const cls =
            offset === 0
              ? "active"
              : offset === 1
              ? "right"
              : offset === total - 1
              ? "left"
              : "hidden";
          return (
            <button
              key={p.num}
              type="button"
              className={`cf-panel cf-panel--${cls}`}
              onClick={() => setActive(idx)}
              aria-label={p.title}
            >
              <div className="cf-frame">
                <img src={p.img} alt={p.title} />
              </div>
            </button>
          );
        })}
      </div>
      <div className="cf-caption" key={active}>
        <span className="cf-num">Step {PANELS[active].num}</span>
        <h3>{PANELS[active].title}</h3>
        <p>{PANELS[active].text}</p>
      </div>
      <div className="cf-dots" role="tablist">
        {PANELS.map((p, idx) => (
          <button
            key={p.num}
            className={`cf-dot${idx === active ? " cf-dot--active" : ""}`}
            onClick={() => setActive(idx)}
            aria-label={p.title}
          />
        ))}
      </div>
    </>
  );
}

function SpecFlipCell({ cell }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`spec-cell${flipped ? " spec-cell--flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${cell.k} details`}
    >
      <div className="spec-inner">
        <div className="spec-face spec-face--front">
          <span className="spec-key">{cell.k}</span>
          <span className="spec-val">{cell.v}</span>
          <span className="spec-note">{cell.note}</span>
        </div>
        <div className="spec-face spec-face--back">
          <span className="spec-key">
            {cell.k} <span className="spec-back-tag">·  more</span>
          </span>
          <p className="spec-back-copy">{cell.back}</p>
        </div>
      </div>
    </button>
  );
}

export default function HowItWorks() {
  return (
    <section className="section cf-section" id="how-it-works">
      <div className="container">
        <Reveal>
          <div className="s-head">
            <span className="eyebrow">How it works · Wallector case</span>
            <h2>
              We built it for the art market<br />It works for any catalog
            </h2>
            <p>
              Wallector is the first app we shipped: a custom ChatGPT agent for fine-art prints and originals. Three behaviors that no filter UI can match.
            </p>
          </div>
        </Reveal>

        <Coverflow />

        <Reveal>
          <div className="spec-table">
            {SPEC_CELLS.map((c) => (
              <SpecFlipCell key={c.k} cell={c} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
