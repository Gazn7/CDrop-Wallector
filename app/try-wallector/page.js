import Image from "next/image";
import Link from "next/link";

// TODO: replace this Coming Soon page with a redirect or embed of the public
// Wallector ChatGPT app once the OpenAI marketplace submission is approved.

export const metadata = {
  title: "Try Wallector | Coming soon",
  description: "The public Wallector ChatGPT app is launching soon. Drop us a line for early access."
};

export default function TryWallectorPage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="site-brand" href="/wallector">
            <Image
              src="/images/criticaldrop-logo.svg"
              alt="CriticalDrop"
              width={36}
              height={36}
              className="site-brand-cd"
            />
            <span className="site-brand-x" aria-hidden="true">×</span>
            <Image
              src="/images/wallector-logo.svg"
              alt="Wallector"
              width={120}
              height={44}
              className="site-brand-logo"
            />
          </Link>
        </div>
      </header>

      <section className="section section-hero coming-soon-section">
        <div className="section-inner">
          <div className="coming-soon-panel">
            <span className="hero-eyebrow">Try Wallector</span>
            <h1>Coming soon.</h1>
            <p>
              We&rsquo;re polishing the public ChatGPT app. Drop us a line if you want early access:{" "}
              <a className="coming-soon-mail" href="mailto:info@criticaldrop.com?subject=Wallector%20early%20access">
                info@criticaldrop.com
              </a>
            </p>
            <Link className="coming-soon-back" href="/wallector">
              <span aria-hidden="true">&larr;</span> Back to Wallector
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
