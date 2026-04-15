"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Section from "./Section";
import MobileMenu from "./MobileMenu";
import ScrollReveal from "./ScrollReveal";

// TODO: replace placeholder images with real frames extracted from demo.mp4
const panels = [
  {
    title: "Ask, don't filter",
    text: "Vague queries work. Incomplete ones too. It reads intent, not just keywords.",
    image: "/images/widget-1.jpg",
    alt: "Conversational search in Wallector"
  },
  {
    title: "It remembers the conversation",
    text: "\u201cShow me something similar but cheaper.\u201d That actually works. Every message builds on the last, giving your users a personal shopper experience. Traditional search engines can\u2019t do that.",
    image: "/images/widget-2.jpg",
    alt: "Conversational memory in Wallector"
  },
  {
    title: "Search by image",
    text: "Upload a photo. The app finds similar works. No keywords needed. The picture is the query.",
    image: "/images/widget-3.jpg",
    alt: "Visual search in Wallector"
  }
];

const steps = [
  {
    number: "01",
    title: "Discovery",
    time: "1 week",
    text: "We look at your catalog, data, and users. We tell you if it fits. No slides, no guessing."
  },
  {
    number: "02",
    title: "Build",
    time: "2\u20133 weeks",
    text: "We adapt our proven core to your specific data model. It\u2019s fully customized and branded for your marketplace."
  },
  {
    number: "03",
    title: "Launch",
    time: "1 week",
    text: "We deploy on Cloud Run, submit to the OpenAI marketplace, hand you the docs."
  }
];

export default function WallectorLanding() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [flippedSteps, setFlippedSteps] = useState([false, false, false]);

  const toggleStep = (idx) => {
    setFlippedSteps((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const handlePanelClick = (idx) => {
    if (idx === activeIndex) {
      setExpanded(true);
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <main className="page-shell">

      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/wallector">
            <Image
              src="/images/criticaldrop-logo.svg"
              alt="CriticalDrop"
              width={36}
              height={36}
              className="site-brand-cd"
            />
            <span className="site-brand-x" aria-hidden="true">×</span>
            <Image
              src="/images/wallector-logo.svg"
              alt="Wallector"
              width={120}
              height={44}
              className="site-brand-logo"
            />
          </a>
          <div className="header-actions">
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section tone="hero">
        <div className="hero-panel">
          <div className="hero-copy">
            <span className="hero-eyebrow">A service by CriticalDrop</span>
            <h1>Turn your marketplace into a ChatGPT App</h1>
            <p className="hero-subtext">
              Users hate clicking through endless search
              <br />
              We enable you with a custom search agent for your catalog
              <br />
              Users ask, your catalog answers
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-header">
                <span>Wallector&rsquo;s app in ChatGPT</span>
                <span>Live</span>
              </div>
              <div className="mockup-image-frame">
                <Image
                  src="/images/widget-1.jpg"
                  alt="Wallector interface in ChatGPT"
                  width={1056}
                  height={768}
                  className="mockup-image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TODO: future "Try it" embedded prompt widget goes here */}

      {/* How it works (Wallector case study + coverflow 3D) */}
      <Section
        id="how-it-works"
        tone="highlight"
        eyebrow={"How it works \u2014 Wallector case"}
        title="See it in action: Wallector"
        description={
          <>
            We built Wallector to solve search friction in the fine art market
            <br />
            No more filters, just natural conversation
          </>
        }
      >
        <div className="coverflow-stage" role="group" aria-label="Feature showcase">
          {panels.map((panel, idx) => {
            const total = panels.length;
            const offset = (idx - activeIndex + total) % total;
            const positionClass =
              offset === 0
                ? "active"
                : offset === 1
                  ? "right"
                  : offset === total - 1
                    ? "left"
                    : "hidden";
            const isActive = offset === 0;
            return (
              <button
                key={panel.title}
                type="button"
                className={`coverflow-panel coverflow-panel--${positionClass}`}
                onClick={() => handlePanelClick(idx)}
                aria-label={isActive ? `Expand ${panel.title}` : `Show ${panel.title}`}
                aria-pressed={isActive}
              >
                <div className="coverflow-panel-frame">
                  <Image
                    src={panel.image}
                    alt={panel.alt}
                    width={1056}
                    height={768}
                    className="coverflow-panel-image"
                  />
                </div>
              </button>
            );
          })}
        </div>
        {expanded && (
          <div
            className="coverflow-expanded-overlay"
            onClick={() => setExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label={panels[activeIndex].title}
          >
            <div className="coverflow-expanded-content">
              <div
                className="coverflow-expanded-image-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={panels[activeIndex].image}
                  alt={panels[activeIndex].alt}
                  width={1920}
                  height={1440}
                  className="coverflow-expanded-image"
                  priority
                />
              </div>
              <div className="coverflow-expanded-caption">
                <h3>{panels[activeIndex].title}</h3>
                <p>{panels[activeIndex].text}</p>
              </div>
            </div>
            <button
              type="button"
              className="coverflow-expanded-close"
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div className="coverflow-caption" key={activeIndex}>
          <h3>{panels[activeIndex].title}</h3>
          <p>{panels[activeIndex].text}</p>
        </div>
        <div className="coverflow-dots" role="tablist" aria-label="Choose feature">
          {panels.map((panel, idx) => (
            <button
              key={panel.title}
              type="button"
              role="tab"
              className={`coverflow-dot${idx === activeIndex ? " coverflow-dot--active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={panel.title}
              aria-selected={idx === activeIndex}
            />
          ))}
        </div>

        <div className="try-wallector-block">
          <div className="try-wallector-divider" aria-hidden="true" />
          <div className="try-wallector-row">
            <p className="try-wallector-text">
              Try the live ChatGPT app and see how it completely changes the browsing experience
            </p>
            {/* TODO: replace href with the real public ChatGPT app URL when available */}
            <a className="button button-primary try-wallector-cta" href="/try-wallector">
              Try Wallector Live <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </Section>

      {/* How we work + Let's talk (fused) */}
      <Section
        id="how-we-work"
        tone="dark"
        eyebrow="How we work"
        title="From zero to live in 4 weeks"
        description="Three steps. One codebase. Your marketplace gets a ChatGPT app."
      >
        <div className="step-grid">
          <span className="step-line" aria-hidden="true" />
          {steps.map((step, idx) => {
            const isFlipped = flippedSteps[idx];
            return (
              <ScrollReveal key={step.number} animation="reveal" delay={idx * 100}>
                <button
                  type="button"
                  className={`step-card${isFlipped ? " step-card--flipped" : ""}`}
                  onClick={() => toggleStep(idx)}
                  aria-pressed={isFlipped}
                  aria-label={`${step.number} ${step.title}, ${step.time}`}
                >
                  <div className="step-card-inner">
                    <div className="step-card-face step-card-face--front">
                      <span className="step-front-number">{step.number}</span>
                      <span className="step-front-title">{step.title}</span>
                      <span className="step-front-time">{step.time}</span>
                    </div>
                    <div className="step-card-face step-card-face--back">
                      <span className="step-number">{step.number}</span>
                      <div className="step-copy">
                        <h3>{step.title} <span className="step-time">{step.time}</span></h3>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="closing-panel closing-panel--after-steps">
          <ScrollReveal animation="reveal">
            <div className="closing-copy">
              <h2>Ready to upgrade your search?</h2>
              <p>Let&rsquo;s see if your catalog is a good fit for a ChatGPT integration. No strings attached.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:info@criticaldrop.com?subject=Wallector%20for%20our%20marketplace">
                  Contact us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-block">
            <span className="footer-label">Project</span>
            <p>Wallector is a project by CriticalDrop. A custom ChatGPT app for the art marketplace.</p>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">Navigation</span>
            <a href="#how-it-works">Wallector case</a>
            <a href="#how-we-work">How we work</a>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">Contacts</span>
            <a href="mailto:info@criticaldrop.com">info@criticaldrop.com</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
