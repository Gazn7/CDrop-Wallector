import ScrollReveal from "./ScrollReveal";

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
          <ScrollReveal animation="reveal">
            <div className="section-heading">
              {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              {title ? <h2>{title}</h2> : null}
              {description ? <p>{description}</p> : null}
            </div>
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  );
}
