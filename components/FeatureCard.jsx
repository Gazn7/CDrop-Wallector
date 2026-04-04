"use client";

export default function FeatureCard({ title, text, isOpen, onToggle }) {
  return (
    <div className={`feature-card${isOpen ? " feature-card-open" : ""}`}>
      <button
        type="button"
        className="feature-card-toggle feature-card-header"
        onClick={onToggle}
      >
        <span className="feature-dot" aria-hidden="true" />
        <h3>{title}</h3>
        <span className="feature-card-chevron" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <p className="feature-card-body">{text}</p>
    </div>
  );
}
