"use client";

import Image from "next/image";
import Section from "./Section";
import VideoPlayer from "./VideoPlayer";
import Lightbox from "./Lightbox";
import FeatureCard from "./FeatureCard";
import WorkflowCard from "./WorkflowCard";
import ClosingDetailCard from "./ClosingDetailCard";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

export default function WallectorLanding() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [activeFeature, setActiveFeature] = useState(null);
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [activeClosing, setActiveClosing] = useState(null);

  return (
    <main className="page-shell">

      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/wallector">
            <span className="site-brand-main">{t.brandMain}</span>
            <span className="site-brand-divider">&times;</span>
            <Image
              src="/images/wallector-logo.svg"
              alt="Wallector"
              width={96}
              height={36}
              className="site-brand-logo"
            />
          </a>
          <div className="header-actions">
            <LanguageToggle />
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section tone="hero">
        <div className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">{t.brandMain} <span className="eyebrow-x">×</span> Wallector</span>
            <h1>{t.h1Line1}<br />{t.h1Line2}</h1>
            <p className="hero-subtext">{t.subtext}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#how-it-works">{t.btnSeeItLive}</a>
              <a className="hero-nav-link" href="#product">{t.btnWhatItDoes}</a>
              <a className="hero-nav-link" href="#how-it-works">{t.btnHowItWorks}</a>
              <a className="button button-secondary" href="#contact">{t.btnGetInTouch}</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-header">
                <span>{t.mockupLabel}</span>
                <span>{t.mockupStatus}</span>
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
          <div className="proof-item"><span className="proof-dot" />{t.proof1}</div>
          <div className="proof-item"><span className="proof-dot" />{t.proof2}</div>
          <div className="proof-item"><span className="proof-dot" />{t.proof3}</div>
        </div>
      </div>

      {/* Product overview */}
      <Section id="product" tone="highlight" eyebrow={t.productEyebrow} title={t.productTitle} description={t.productDesc}>
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
            {t.features.map((feature) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                isOpen={activeFeature === feature.title}
                onToggle={() => setActiveFeature(v => v === feature.title ? null : feature.title)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" eyebrow={t.howEyebrow} title={t.howTitle} description={t.howDesc}>
        <div className="video-wrapper">
          <VideoPlayer src="/video/demo.mp4" />
        </div>
        <div className="workflow-grid-2col howit-below">
          {t.steps.map((step) => (
            <WorkflowCard
              key={step.title}
              {...step}
              isOpen={activeWorkflow === step.title}
              onToggle={() => setActiveWorkflow(v => v === step.title ? null : step.title)}
            />
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow={t.contactEyebrow} tone="highlight">
        <div className="closing-panel">
          <div className="closing-copy">
            <h2>{t.contactTitle}</h2>
            <p>{t.contactDesc}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:info@criticaldrop.com">
                info@criticaldrop.com
              </a>
            </div>
          </div>
          <div className="closing-detail">
            {t.closingDetails.map((item) => (
              <ClosingDetailCard
                key={item.title}
                title={item.title}
                text={item.text}
                isOpen={activeClosing === item.title}
                onToggle={() => setActiveClosing(v => v === item.title ? null : item.title)}
              />
            ))}
          </div>
        </div>
      </Section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-block">
            <span className="footer-label">{t.footerProjectLabel}</span>
            <p>{t.footerProjectText}</p>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">{t.footerNavLabel}</span>
            <a href="#product">{t.footerNav1}</a>
            <a href="#how-it-works">{t.footerNav2}</a>
            <a href="#contact">{t.footerNav3}</a>
          </div>
          <div className="site-footer-block">
            <span className="footer-label">{t.footerContactsLabel}</span>
            <a href="mailto:info@criticaldrop.com">info@criticaldrop.com</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
