"use client";

import { useState } from "react";

export default function WorkflowCard({ title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`workflow-card${open ? " workflow-card-open" : ""}`}>
      <button
        type="button"
        className="feature-card-toggle feature-card-header"
        onClick={() => setOpen((v) => !v)}
      >
        <h3>{title}</h3>
        <span className="feature-card-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <p className="feature-card-body">{text}</p>
    </div>
  );
}
