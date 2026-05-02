/* global React, ReactDOM, MiniChat, Coverflow, FAQ, Reveal,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor, TweakSelect, TweakSlider, TweakToggle */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ef7918",
  "density": "default",
  "heroVariant": "split",
  "showProof": true,
  "showFAQ": true
}/*EDITMODE-END*/;

function SpecFlipCell({ cell }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`spec-cell${flipped ? ' spec-cell--flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
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
          <span className="spec-key">{cell.k} <span className="spec-back-tag">·  more</span></span>
          <p className="spec-back-copy">{cell.back}</p>
        </div>
      </div>
    </button>
  );
}

function FlipCard({ step }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`tl-card${flipped ? ' tl-card--flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
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
          <span className="tl-week">{step.w} · {step.t}</span>
          <p>{step.p}</p>
          <div className="tl-meta"><b>→</b> {step.m}</div>
        </div>
      </div>
    </button>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    // derive a soft + strong from accent
    document.documentElement.style.setProperty('--accent-soft', tweaks.accent + '1f');
    document.body.dataset.density = tweaks.density;
    document.body.dataset.hero = tweaks.heroVariant;
  }, [tweaks]);

  return (
    <div className="shell">
      {/* HEADER */}
      <header className="hdr" data-screen-label="Header">
        <div className="container hdr-inner">
          <a className="brand" href="#top">
            <img className="brand-cd" src="assets/criticaldrop-logo.svg" alt="CriticalDrop" />
            <span className="brand-x" aria-hidden="true">×</span>
            <img className="brand-logo" src="assets/wallector-logo.svg" alt="Wallector" />
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#how-it-works">How it works</a>
            <a href="#try">Try it</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="hdr-cta">
            <a className="btn btn-primary btn-sm" href="#contact">Book a call →</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top" data-screen-label="01 Hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">A service by CriticalDrop</span>
            <h1>Turn your marketplace<br/>into a <em>ChatGPT app</em></h1>
            <p className="hero-sub">
              Your customers hate clicking through 14 filters. So skip them.
              Wallector ships a custom AI search agent for your catalog. Users ask, your inventory answers.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#try">See it work →</a>
              <a className="btn btn-ghost btn-lg" href="#contact">Book a 20-min call</a>
            </div>
            <div className="hero-meta">
              <span><b>4 weeks</b> to live</span>
              <span><b>1 catalog</b> per app</span>
              <span><b>0</b> code on your end</span>
            </div>
          </div>
          <Reveal delay={120}>
            <div className="hero-mock">
              <div className="hero-mock-bar">
                <span className="dot" />
                <span>Wallector · ChatGPT app</span>
                <span className="pill">Live</span>
              </div>
              <div className="hero-mock-frame">
                <img src="assets/widget-2.jpg" alt="Wallector inside ChatGPT" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROOF BAR */}
      {tweaks.showProof && (
        <section className="proof" data-screen-label="02 Proof">
          <div className="container proof-grid">
            <div className="proof-item">
              <div className="proof-num">22<em>k</em></div>
              <div className="proof-label">Artworks indexed</div>
            </div>
            <div className="proof-item">
              <div className="proof-num">3.4<em>×</em></div>
              <div className="proof-label">Avg session depth</div>
            </div>
            <div className="proof-item">
              <div className="proof-num">68<em>%</em></div>
              <div className="proof-label">Multi-turn queries</div>
            </div>
            <div className="proof-item">
              <div className="proof-num">28<em>d</em></div>
              <div className="proof-label">Discovery → live</div>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="section cf-section" id="how-it-works" data-screen-label="03 How it works">
        <div className="container">
          <Reveal>
            <div className="s-head">
              <span className="eyebrow">How it works · Wallector case</span>
              <h2>We built it for the art market<br/>It works for any catalog</h2>
              <p>
                Wallector is the first app we shipped: a custom ChatGPT agent for fine-art prints and originals. Three behaviors that no filter UI can match.
              </p>
            </div>
          </Reveal>

          <Coverflow />

          <Reveal>
            <div className="spec-table">
              {[
                {
                  k: 'Query type',
                  v: <em>Natural</em>,
                  note: 'Plain English. Vague is fine. No required fields.',
                  back: 'No filters, no dropdowns. "A blue thing for above the couch" is a valid query. We parse intent, style, room, palette, scale.',
                },
                {
                  k: 'Modality',
                  v: 'Text · Image',
                  note: 'Type, paste a photo, or describe a vibe. The picture is the query.',
                  back: 'Drop a screenshot of someone\'s living room. We extract palette, mood, era, and surface 6 pieces from your catalog that fit.',
                },
                {
                  k: 'Memory',
                  v: <em>Multi-turn</em>,
                  note: 'Refines on follow-ups. "Cheaper", "moodier", "smaller": all valid.',
                  back: 'Conversation state persists across the session. Customers iterate the way they would with a gallerist — not start from scratch.',
                },
                {
                  k: 'Hosting',
                  v: 'OpenAI store',
                  note: 'Reachable inside ChatGPT. Free + paid tiers. Your brand, our pipes.',
                  back: 'Lives in the OpenAI app store, indexed by ChatGPT. We handle submission, hosting, and updates. You own the listing and the brand.',
                },
              ].map((c) => (
                <SpecFlipCell key={c.k} cell={c} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIVE DEMO (full) */}
      <section className="section demo-section" id="try" data-screen-label="04 Try it">
        <div className="container demo-grid">
          <div className="demo-side">
            <span className="eyebrow">Try it live</span>
            <h2>This is a real chat, on a real catalog<br/><em>Type anything</em></h2>
            <p>
              The widget on the right is a sandboxed clone of the production Wallector app.
              Eight artworks, real prices, real intent matching. Same engine that powers our public ChatGPT app.
            </p>
            <div className="demo-points">
              <div className="demo-point">
                <span className="demo-point-num">01</span>
                <div>
                  <h4>Try a vague prompt</h4>
                  <p>"Show me something moody" or "I want a horse." It figures it out.</p>
                </div>
              </div>
              <div className="demo-point">
                <span className="demo-point-num">02</span>
                <div>
                  <h4>Explore Wallector's catalogue freely</h4>
                  <p>Browse by vibe, technique, era, price. No filters, no rules. Just talk.</p>
                </div>
              </div>
              <div className="demo-point">
                <span className="demo-point-num">03</span>
                <div>
                  <h4>Add operas directly to your Wallector cart</h4>
                  <p>Found your piece? One tap drops it straight into your Wallector shop cart.</p>
                </div>
              </div>
            </div>
          </div>
          <Reveal delay={120}>
            <MiniChat
              suggestions={['I want a horse', 'Something moody and blue', 'Cheaper than 500', 'Non ho molte idee, aiutami']}
              placeholder="Ask the catalog anything…"
            />
          </Reveal>
        </div>
      </section>

      {/* HOW WE WORK · timeline */}
      <section className="section tl-section" id="process" data-screen-label="05 Process">
        <div className="container">
          <Reveal>
            <div className="s-head-row">
              <div className="s-head">
                <span className="eyebrow">How we work</span>
                <h2>From zero to live in <em>4 weeks</em>,<br/>not 4 quarters.</h2>
              </div>
              <p style={{color:'var(--muted-1)', fontSize:'1rem', lineHeight:1.7, maxWidth:380}}>
                Fixed scope, fixed timeline, fixed price. We&rsquo;ve done it before; we know where it gets stuck.
              </p>
            </div>
          </Reveal>

          <div className="tl-grid">
            <div className="tl-line" aria-hidden="true" />
            {[
              { n: '01', w: 'Week 1', t: 'Discovery', p: 'Audit your catalog structure. Map the queries your customers actually run.', m: 'Output: scoped spec' },
              { n: '02', w: 'Week 2', t: 'Build', p: 'We wire your catalog into our AI core. You see a working prototype on Friday.', m: 'Output: live prototype' },
              { n: '03', w: 'Week 3', t: 'Brand & test', p: '100% your brand: name, voice, cards, edge cases. Internal QA on real shoppers.', m: 'Output: branded app' },
              { n: '04', w: 'Week 4', t: 'Launch', p: 'We submit to the OpenAI store and set up hosting. You get the keys.', m: 'Output: public app' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <FlipCard step={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {tweaks.showFAQ && (
        <section className="section" id="faq" data-screen-label="06 FAQ">
          <div className="container">
            <div className="faq-grid">
              <Reveal>
                <div className="s-head" style={{marginBottom:0}}>
                  <span className="eyebrow">FAQ</span>
                  <h2>The questions everyone asks.</h2>
                  <p>If yours isn&rsquo;t here, write us. We answer within a day.</p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <FAQ />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section" id="contact" data-screen-label="07 CTA">
        <div className="container">
          <div className="cta-card">
            <Reveal>
              <div>
                <span className="eyebrow">Let&rsquo;s talk</span>
                <h2 style={{marginTop:18}}>Ready to upgrade<br/>your <em>search?</em></h2>
                <p>
                  20-minute call, no slides, no decks. We&rsquo;ll tell you on the spot whether your catalog is a fit for a ChatGPT app, and what the build would actually look like.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="cta-side">
                <div className="cta-actions">
                  <a className="btn btn-primary btn-lg" href="mailto:info@criticaldrop.com?subject=Wallector%20for%20our%20marketplace">
                    Book a call →
                  </a>
                  <a className="btn btn-ghost btn-lg" href="mailto:info@criticaldrop.com">
                    Send a brief
                  </a>
                </div>
                <dl className="cta-detail">
                  <dt>Email</dt><dd><a href="mailto:info@criticaldrop.com">info@criticaldrop.com</a></dd>
                  <dt>Where</dt><dd>Remote, EU timezones</dd>
                  <dt>Response</dt><dd>Within 24 hours</dd>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr" data-screen-label="08 Footer">
        <div className="container">
          <div className="ftr-grid">
            <div className="ftr-block">
              <span className="ftr-label">Project</span>
              <p>Wallector is a project by CriticalDrop. A custom ChatGPT app for the fine-art marketplace, and a template for any catalog after that.</p>
            </div>
            <div className="ftr-block">
              <span className="ftr-label">Navigation</span>
              <a href="#how-it-works">How it works</a>
              <a href="#try">Try it live</a>
              <a href="#process">Process</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="ftr-block">
              <span className="ftr-label">Contact</span>
              <a href="mailto:info@criticaldrop.com">info@criticaldrop.com</a>
              <a href="#contact">Book a call</a>
            </div>
            <div className="ftr-block">
              <span className="ftr-label">Studio</span>
              <p>CriticalDrop · Remote, EU<br/>Building AI products for catalogs.</p>
            </div>
          </div>
          <div className="ftr-bottom">
            <span>© 2026 CriticalDrop · All rights reserved</span>
            <span>Wallector v1.2 · Built with Claude</span>
          </div>
        </div>
      </footer>

      {/* TWEAKS PANEL */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent">
          <TweakColor label="Brand color" value={tweaks.accent} onChange={v => setTweak('accent', v)} />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Hero"
            value={tweaks.heroVariant}
            options={[{value:'split', label:'Split'}, {value:'wide', label:'Wide'}]}
            onChange={v => setTweak('heroVariant', v)}
          />
          <TweakRadio
            label="Density"
            value={tweaks.density}
            options={[{value:'compact', label:'Compact'}, {value:'default', label:'Default'}, {value:'airy', label:'Airy'}]}
            onChange={v => setTweak('density', v)}
          />
        </TweakSection>
        <TweakSection label="Sections">
          <TweakToggle label="Proof bar" value={tweaks.showProof} onChange={v => setTweak('showProof', v)} />
          <TweakToggle label="FAQ" value={tweaks.showFAQ} onChange={v => setTweak('showFAQ', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
