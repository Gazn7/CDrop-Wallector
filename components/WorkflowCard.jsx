"use client";

import { useState } from "react";

export default function WorkflowCard({ title, text }) {
  const [open, setOpen] = useState(false);

  const toggle = (e) => {
    if (e.type === "touchend") e.preventDefault();
    setOpen((v) => !v);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      className={`workflow-card workflow-card-toggle${open ? " workflow-card-open" : ""}`}
      onTouchEnd={toggle}
      onClick={toggle}
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
