"use client";

import { useState } from "react";

export default function FeatureCard({ title, text }) {
  const [open, setOpen] = useState(false);

  const toggle = (e) => {
    if (e.type === "touchend") e.preventDefault();
    setOpen((v) => !v);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      className={`feature-card feature-card-toggle${open ? " feature-card-open" : ""}`}
      onTouchEnd={toggle}
      onClick={toggle}
    >
      <div className="feature-card-header">
        <span className="feature-dot" aria-hidden="true" />
        <h3>{title}</h3>
        <span className="feature-card-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </div>
      <p className="feature-card-body">{text}</p>
    </article>
  );
}
