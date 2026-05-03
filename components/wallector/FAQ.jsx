"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "How is this different from a regular search bar?",
    a: "Search bars match keywords. Wallector reads intent. \"Something cheaper but similar\" works. \"Moodier and bluer\" works. Multi-turn, contextual, no filters required."
  },
  {
    q: "Do my customers need a ChatGPT subscription?",
    a: "No. We publish your app on the OpenAI marketplace, where it's reachable to any ChatGPT user, including the free tier. You can also embed it on your own site."
  },
  {
    q: "What happens to my catalog data?",
    a: "Your catalog stays in your systems. We connect to it via your existing API or a structured export. Nothing is sent to OpenAI for training; the agent retrieves at query-time only."
  },
  {
    q: "How long until we're live?",
    a: "Four weeks from kickoff to a public app on the OpenAI marketplace, assuming a clean catalog. If your data needs work, we tell you on day one, not at launch."
  },
  {
    q: "Will it match my brand?",
    a: "Yes. Custom name, custom voice, custom UI cards. The shopping experience inside ChatGPT looks and reads like your store, not a generic chatbot."
  },
  {
    q: "What does it cost?",
    a: "A fixed build fee plus a flat monthly hosting fee. No per-query pricing, no surprises. Specifics depend on catalog size: we quote on the discovery call."
  }
];

function FAQList() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
          <button
            className="faq-q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span>{f.q}</span>
            <span className="faq-q-icon" aria-hidden="true">+</span>
          </button>
          <div className="faq-a">
            <div className="faq-a-inner">{f.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="faq-grid">
          <Reveal>
            <div className="s-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">FAQ</span>
              <h2>The questions everyone asks</h2>
              <p>If yours isn&rsquo;t here, write us. We answer within a day.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FAQList />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
