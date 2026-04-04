"use client";

import { useState } from "react";

export default function ClosingDetailCard({ title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`closing-detail-item closing-detail-card${open ? " closing-detail-card-open" : ""}`}>
      <button
        type="button"
        className="closing-detail-toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <strong>{title}</strong>
        <span className="closing-detail-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <p className="closing-detail-body">{text}</p>
    </div>
  );
}
