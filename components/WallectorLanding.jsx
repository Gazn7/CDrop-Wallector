import Image from "next/image";
import Section from "./Section";
import VideoPlayer from "./VideoPlayer";
import Lightbox from "./Lightbox";
import {
  featureBadges,
  platformFeatures,
  visualUseCases,
  workflowSteps,
  marketplaceCards,
  closingDetails
} from "./data";

const examplePrompts = [
  "Show me horse artworks under 2,000 EUR.",
  "Find signed prints from the 1930s with strong black and white contrast.",
  "Look for portraits similar to this image and group them by artist.",
  "Which works by Rembrandt are available right now?",
  "Show original prints with female subjects from European sellers.",
  "Find works related to animals and highlight the best-priced options."
];

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
              <a className="button button-primary" href="#demo">See it live</a>
              <a className="hero-nav-link" href="#product">Product overview</a>
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

      {/* Video */}
      <Section id="demo" eyebrow="See it in action" title="Here's what it looks like.">
        <p style={{ maxWidth: "560px", color: "var(--muted-light)", lineHeight: "1.75", marginBottom: "32px", fontSize: "1rem" }}>
          Real session, real data, real catalog. No staging environment.
        </p>
        <div className="video-wrapper">
          <VideoPlayer src="/video/demo.mp4" />
        </div>
      </Section>

      {/* Product overview */}
      <Section
        id="product"
        tone="highlight"
        eyebrow="Product overview"
        title="What the product does."
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

      {/* How it works */}
      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="How it works."
        description="Four steps. No magic, just good engineering."
      >
        <div className="workflow-grid">
          {workflowSteps.map((step) => (
            <article key={step.title} className="workflow-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Visual AI + Prompts */}
      <Section
        tone="highlight"
        title="Visual AI is part of the product."
        description="Images are not decoration. In Wallector they work as search input, similarity signal, and metadata support."
      >
        <div className="visual-lead">
          <div className="visual-panel">
            <span className="stage-label">Image Intelligence</span>
            <div className="stage-photo-frame">
              <Image
                src="/images/widget-3.jpg"
                alt="Wallector image search in ChatGPT"
                width={657}
                height={940}
                className="stage-photo"
              />
            </div>
          </div>
          <div className="visual-copy">
            <div className="stage-chip-group">
              <div className="stage-chip">Search by image</div>
              <div className="stage-chip">Similarity</div>
              <div className="stage-chip">Classification</div>
              <div className="stage-chip">Metadata support</div>
            </div>
            {visualUseCases.map((item) => (
              <div key={item} className="visual-list-item">
                <span className="visual-marker" aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="prompt-panel">
          <div className="prompt-heading">
            <span className="eyebrow">Real queries</span>
            <h3>These aren&apos;t hand-picked demos. They&apos;re the kind of thing users actually type.</h3>
          </div>
          <div className="prompt-grid">
            {examplePrompts.map((prompt) => (
              <div key={prompt} className="prompt-card">
                <span className="prompt-label">Prompt</span>
                <p>{prompt}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Built for any marketplace */}
      <Section
        tone="dark"
        eyebrow="Ready to deploy"
        title="We built this for Wallector. We can build it for you."
      >
        <div className="marketplace-intro">
          <div />
          <p className="marketplace-intro-note">
            70% of the code is already written. What changes is your data model and your catalog.
            We need three things from you: a catalog export, an hour to understand your use cases, and five days.
            Fixed-scope project. We quote before we start.
          </p>
        </div>
        <div className="marketplace-grid">
          {marketplaceCards.map((card) => (
            <div key={card.number} className="marketplace-card">
              <div className="marketplace-card-number">{card.number}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Contact">
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
              Wallector is a project developed by Criticaldrop — a custom ChatGPT app and AI connector
              for the art marketplace.
            </p>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">Navigation</span>
            <a href="#product">Product overview</a>
            <a href="#how-it-works">How it works</a>
            <a href="#demo">Demo</a>
            <a href="#contact">Contact</a>
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
