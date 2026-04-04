export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "default"
}) {
  return (
    <section id={id} className={`section section-${tone}`}>
      <div className="section-inner">
        {(eyebrow || title || description) && (
          <div className="section-heading">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
