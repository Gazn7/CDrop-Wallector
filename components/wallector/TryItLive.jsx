import MiniChat from "./MiniChat";
import Reveal from "./Reveal";

export default function TryItLive() {
  return (
    <section className="section demo-section" id="try">
      <div className="container demo-grid">
        <div className="demo-side">
          <span className="eyebrow">Try it live</span>
          <h2>
            This is a real chat, on a real catalog<br />
            <em>Type anything</em>
          </h2>
          <p>
            The widget on the right is a sandboxed clone of the production Wallector app.
            Eight artworks, real prices, real intent matching. Same engine that powers our public ChatGPT app.
          </p>
          <div className="demo-points">
            <div className="demo-point">
              <span className="demo-point-num">01</span>
              <div>
                <h4>Try a vague prompt</h4>
                <p>&quot;Show me something moody&quot; or &quot;I want a horse.&quot; It figures it out.</p>
              </div>
            </div>
            <div className="demo-point">
              <span className="demo-point-num">02</span>
              <div>
                <h4>Explore Wallector&rsquo;s catalogue freely</h4>
                <p>Browse by vibe, technique, era, price. No filters, no rules. Just talk.</p>
              </div>
            </div>
            <div className="demo-point">
              <span className="demo-point-num">03</span>
              <div>
                <h4>Add operas directly to your Wallector cart</h4>
                <p>Found your piece? One tap drops it straight into your Wallector shop cart.</p>
              </div>
            </div>
          </div>
        </div>
        <Reveal delay={120}>
          <MiniChat
            suggestions={["I want a horse", "Something moody and blue", "Cheaper than 500", "Non ho molte idee, aiutami"]}
            placeholder="Ask the catalog anything…"
          />
        </Reveal>
      </div>
    </section>
  );
}
