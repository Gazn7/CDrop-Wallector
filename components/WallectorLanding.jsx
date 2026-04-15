"use client";

import Image from "next/image";
import Section from "./Section";
import Lightbox from "./Lightbox";
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
    text: "\u201cShow me something similar but cheaper.\u201d That works. Every message builds on the last. No search engine can do that.",
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

const proofItems = [
  { value: "Live", label: "In production on ChatGPT" },
  { value: "Submitted", label: "OpenAI marketplace review" },
  { value: "3\u20135 days", label: "Average onboarding" },
  { value: "~70%", label: "Code reusable across clients" }
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
    text: "We fork the codebase, remap it to your data model, brand it for your marketplace."
  },
  {
    number: "03",
    title: "Launch",
    time: "1 week",
    text: "We deploy on Cloud Run, submit to the OpenAI marketplace, hand you the docs."
  }
];

export default function WallectorLanding() {
  return (
    <main className="page-shell">

      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/wallector">
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
            <h1>The art catalog that answers back.</h1>
            <p className="hero-subtext">Marketplace users hate filters. We turned your catalog into a ChatGPT app. They just ask.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#how-it-works">See the features</a>
              <a className="hero-nav-link" href="#work-with-us">Work with us</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-header">
                <span>Wallector for ChatGPT</span>
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

      {/* Proof bar */}
      <div className="proof-bar">
        <div className="proof-bar-inner">
          {proofItems.map((item) => (
            <div key={item.value} className="proof-chip">
              <span className="proof-chip-value">{item.value}</span>
              <span className="proof-chip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TODO: future "Try it" embedded prompt widget goes here */}

      {/* How it works (fused: product overview + how it works) */}
      <Section
        id="how-it-works"
        tone="highlight"
        eyebrow="How it works"
        title="How it works"
        description="Wallector connects to your catalog and becomes a ChatGPT app. Your users just talk."
      >
        <div className="panel-grid">
          {panels.map((panel, idx) => (
            <ScrollReveal key={panel.title} animation="reveal" delay={idx * 100}>
              <article className="panel">
                <Lightbox>
                  <div className="panel-image-frame">
                    <Image
                      src={panel.image}
                      alt={panel.alt}
                      width={1056}
                      height={768}
                      className="panel-image"
                    />
                  </div>
                </Lightbox>
                <div className="panel-copy">
                  <h3>{panel.title}</h3>
                  <p>{panel.text}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Work with us */}
      <Section
        id="work-with-us"
        tone="dark"
        eyebrow="Work with us"
        title="From zero to live in 4 weeks"
        description="Three steps. One codebase. Your marketplace gets a ChatGPT app."
      >
        <div className="step-grid">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.number} animation="reveal" delay={idx * 100}>
              <article className="step-card">
                <span className="step-number">{step.number}</span>
                <div className="step-copy">
                  <h3>{step.title} <span className="step-time">{step.time}</span></h3>
                  <p>{step.text}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Contact">
        <div className="closing-panel">
          <ScrollReveal animation="reveal">
            <div className="closing-copy">
              <h2>Let&rsquo;s talk</h2>
              <p>Run a marketplace? Let&rsquo;s see if this fits yours. 30 minutes, no deck.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:info@criticaldrop.com?subject=Wallector%20for%20our%20marketplace">
                  Book a 30-min call
                </a>
                <a className="hero-nav-link" href="mailto:info@criticaldrop.com">
                  info@criticaldrop.com
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
            <a href="#how-it-works">How it works</a>
            <a href="#work-with-us">Work with us</a>
            <a href="#contact">Contact</a>
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
