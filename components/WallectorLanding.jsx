import Image from "next/image";
import Section from "./Section";
import VideoPlayer from "./VideoPlayer";
import Lightbox from "./Lightbox";
import {
  platformFeatures,
  workflowSteps,
  closingDetails
} from "./data";

function FeatureCard({ title, text }) {
  return (
    <article className="feature-card">
      <span className="feature-dot" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default function WallectorLanding() {
  return (
    <main className="page-shell">

      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/wallector">
            <span className="site-brand-main">Criticaldrop</span>
            <span className="site-brand-divider">/</span>
            <Image
              src="/images/wallector-logo.svg"
              alt="Wallector"
              width={80}
              height={30}
              className="site-brand-logo"
            />
          </a>
          <nav className="site-nav" aria-label="Primary" />
        </div>
      </header>

      {/* Hero */}
      <Section tone="hero">
        <div className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Criticaldrop / Wallector</span>
            <h1>We built a ChatGPT app for Wallector. Users can search the entire catalog by talking to it.</h1>
            <p className="hero-subtext">
              It&apos;s live. It works on real catalog data. Built for marketplaces that want to stop losing users to bad search.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#how-it-works">See it live</a>
              <a className="hero-nav-link" href="#product">What it does</a>
              <a className="hero-nav-link" href="#how-it-works">How it works</a>
              <a className="button button-secondary" href="#contact">Get in touch</a>
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
          <div className="proof-item">
            <span className="proof-dot" />
            Live on Wallector
          </div>
          <div className="proof-item">
            <span className="proof-dot" />
            Submitted to OpenAI Marketplace
          </div>
          <div className="proof-item">
            <span className="proof-dot" />
            3&ndash;5 days to ship
          </div>
        </div>
      </div>

      {/* What it does */}
      <Section
        id="product"
        tone="highlight"
        eyebrow="Product overview"
        title="Product overview."
        description="Users open ChatGPT, describe what they're looking for, and get results from the actual catalog. No filters, no navigation, no friction."
      >
        <div className="product-showcase">
          <Lightbox>
            <div className="product-shot">
              <Image
                src="/images/widget-2.jpg"
                alt="Wallector product interface"
                width={1056}
                height={768}
                className="product-image"
              />
            </div>
          </Lightbox>
          <div className="feature-grid">
            {platformFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </Section>

      {/* How it works — video + workflow side by side */}
      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="How it works."
        description="Four steps. No magic, just good engineering."
      >
        <div className="howit-grid">
          <div className="video-wrapper">
            <VideoPlayer src="/video/demo.mp4" />
          </div>
          <div className="workflow-grid-2col">
            {workflowSteps.map((step) => (
              <article key={step.title} className="workflow-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Contact" tone="highlight">
        <div className="closing-panel">
          <div className="closing-copy">
            <h2>Let&apos;s talk.</h2>
            <p>
              If you run a marketplace and want to understand if this makes sense for you, reach out.
              No deck, no sales call. Just a technical conversation.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:hello@criticaldrop.com">
                hello@criticaldrop.com
              </a>
            </div>
          </div>
          <div className="closing-detail">
            {closingDetails.map((item) => (
              <div key={item.title} className="closing-detail-item">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-block">
            <span className="footer-label">Project</span>
            <p>
              Wallector is a project developed by Criticaldrop — a custom ChatGPT app and MCP integration
              for the art marketplace.
            </p>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">Navigation</span>
            <a href="#product">What it does</a>
            <a href="#how-it-works">How it works</a>
            <a href="#contact">Get in touch</a>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">Contacts</span>
            <a href="mailto:hello@criticaldrop.com">hello@criticaldrop.com</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
