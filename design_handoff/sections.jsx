/* global React, MiniChat */
const { useState, useEffect, useRef } = React;

// ----- Coverflow: How it works -----
const PANELS = [
  {
    num: '01',
    title: "Ask, don't search",
    text: "Vague queries work. Incomplete ones too. The agent reads intent, not just keywords.",
    img: 'assets/widget-1.jpg'
  },
  {
    num: '02',
    title: 'Follow the thread',
    text: '"Show me something similar but cheaper." That works. Every message builds on the last: a personal shopper, not a search bar.',
    img: 'assets/widget-2.jpg'
  },
  {
    num: '03',
    title: 'Search by image',
    text: "Upload a photo. The app finds similar works. No keywords. The picture is the query.",
    img: 'assets/widget-3.jpg'
  }
];

function Coverflow() {
  const [active, setActive] = useState(1);
  const total = PANELS.length;
  return (
    <>
      <div className="cf-stage">
        {PANELS.map((p, idx) => {
          const offset = (idx - active + total) % total;
          const cls = offset === 0 ? 'active' : offset === 1 ? 'right' : offset === total - 1 ? 'left' : 'hidden';
          return (
            <button
              key={p.num}
              type="button"
              className={`cf-panel cf-panel--${cls}`}
              onClick={() => setActive(idx)}
              aria-label={p.title}
            >
              <div className="cf-frame"><img src={p.img} alt={p.title} /></div>
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
            className={`cf-dot${idx === active ? ' cf-dot--active' : ''}`}
            onClick={() => setActive(idx)}
            aria-label={p.title}
          />
        ))}
      </div>
    </>
  );
}

// ----- FAQ -----
const FAQS = [
  { q: 'How is this different from a regular search bar?',
    a: 'Search bars match keywords. Wallector reads intent. "Something cheaper but similar" works. "Moodier and bluer" works. Multi-turn, contextual, no filters required.' },
  { q: 'Do my customers need a ChatGPT subscription?',
    a: 'No. We publish your app on the OpenAI marketplace, where it\'s reachable to any ChatGPT user, including the free tier. You can also embed it on your own site.' },
  { q: 'What happens to my catalog data?',
    a: 'Your catalog stays in your systems. We connect to it via your existing API or a structured export. Nothing is sent to OpenAI for training; the agent retrieves at query-time only.' },
  { q: 'How long until we\'re live?',
    a: 'Four weeks from kickoff to a public app on the OpenAI marketplace, assuming a clean catalog. If your data needs work, we tell you on day one, not at launch.' },
  { q: 'Will it match my brand?',
    a: 'Yes. Custom name, custom voice, custom UI cards. The shopping experience inside ChatGPT looks and reads like your store, not a generic chatbot.' },
  { q: 'What does it cost?',
    a: 'A fixed build fee plus a flat monthly hosting fee. No per-query pricing, no surprises. Specifics depend on catalog size: we quote on the discovery call.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{f.q}</span>
            <span className="faq-q-icon" aria-hidden="true">+</span>
          </button>
          <div className="faq-a"><div className="faq-a-inner">{f.a}</div></div>
        </div>
      ))}
    </div>
  );
}

// ----- Reveal-on-scroll wrapper -----
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal${shown ? ' in' : ''}`}>{children}</div>;
}

window.Coverflow = Coverflow;
window.FAQ = FAQ;
window.Reveal = Reveal;
window.PANELS = PANELS;
