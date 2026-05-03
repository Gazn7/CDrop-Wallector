import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">A service by CriticalDrop</span>
          <h1>
            Turn your marketplace into a <em>ChatGPT app</em>
          </h1>
          <p className="hero-sub">
            Your customers hate clicking through 14 filters. So skip them.
            Wallector ships a custom AI search agent for your catalog. Users ask, your inventory answers.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#try">See it work →</a>
            <a className="btn btn-ghost btn-lg" href="#contact">Book a 20-min call</a>
          </div>
          <div className="hero-meta">
            <span><b>4 weeks</b> to live</span>
            <span><b>1 catalog</b> per app</span>
            <span><b>0</b> code on your end</span>
          </div>
        </div>
        <Reveal delay={120}>
          <div className="hero-mock">
            <div className="hero-mock-bar">
              <span className="dot" />
              <span>Wallector · ChatGPT app</span>
              <span className="pill">Live</span>
            </div>
            <div className="hero-mock-frame">
              <Image
                src="/images/widget-2.jpg"
                alt="Wallector inside ChatGPT"
                width={1200}
                height={900}
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
