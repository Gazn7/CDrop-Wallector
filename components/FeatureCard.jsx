"use client";

import { useState } from "react";

export default function FeatureCard({ title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`feature-card feature-card-toggle${open ? " feature-card-open" : ""}`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="feature-card-header">
        <span className="feature-dot" aria-hidden="true" />
        <h3>{title}</h3>
        <span className="feature-card-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </div>
      {open && <p className="feature-card-body">{text}</p>}
    </article>
  );
}
