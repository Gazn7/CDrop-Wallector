"use client";

export default function ClosingDetailCard({ title, text, isOpen, onToggle }) {
  return (
    <div className={`closing-detail-item closing-detail-card${isOpen ? " closing-detail-card-open" : ""}`}>
      <button
        type="button"
        className="closing-detail-toggle"
        onClick={onToggle}
      >
        <strong>{title}</strong>
        <span className="closing-detail-chevron" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <p className="closing-detail-body">{text}</p>
    </div>
  );
}
