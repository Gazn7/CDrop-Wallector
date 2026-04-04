"use client";

import { useState } from "react";

export default function WorkflowCard({ title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`workflow-card workflow-card-toggle${open ? " workflow-card-open" : ""}`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="feature-card-header">
        <h3>{title}</h3>
        <span className="feature-card-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </div>
      <p className="feature-card-body">{text}</p>
    </article>
  );
}
