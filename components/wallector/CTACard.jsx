import Reveal from "./Reveal";

export default function CTACard() {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-card">
          <Reveal>
            <div>
              <span className="eyebrow">Let&rsquo;s talk</span>
              <h2 style={{ marginTop: 18 }}>
                Ready to upgrade<br />your <em>search?</em>
              </h2>
              <p>
                20-minute call, no slides, no decks. We&rsquo;ll tell you on the spot whether your catalog is a fit for a ChatGPT app, and what the build would actually look like.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="cta-side">
              <div className="cta-actions">
                <a
                  className="btn btn-primary btn-lg"
                  href="mailto:info@criticaldrop.com?subject=Wallector%20for%20our%20marketplace"
                >
                  Book a call →
                </a>
                <a className="btn btn-ghost btn-lg" href="mailto:info@criticaldrop.com">
                  Send a brief
                </a>
              </div>
              <dl className="cta-detail">
                <dt>Email</dt>
                <dd>
                  <a href="mailto:info@criticaldrop.com">info@criticaldrop.com</a>
                </dd>
                <dt>Where</dt>
                <dd>Remote, EU timezones</dd>
                <dt>Response</dt>
                <dd>Within 24 hours</dd>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
