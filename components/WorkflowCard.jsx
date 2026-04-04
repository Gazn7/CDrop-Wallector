"use client";

export default function WorkflowCard({ title, text, isOpen, onToggle }) {
  return (
    <div className={`workflow-card${isOpen ? " workflow-card-open" : ""}`}>
      <button
        type="button"
        className="feature-card-toggle feature-card-header"
        onClick={onToggle}
      >
        <h3>{title}</h3>
        <span className="feature-card-chevron" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <p className="feature-card-body">{text}</p>
    </div>
  );
}
