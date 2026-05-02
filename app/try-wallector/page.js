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
    <main className="shell">
      <header className="hdr">
        <div className="container hdr-inner">
          <Link className="brand" href="/wallector">
            <Image
              src="/images/criticaldrop-logo.svg"
              alt="CriticalDrop"
              width={32}
              height={32}
              className="brand-cd"
            />
            <span className="brand-x" aria-hidden="true">×</span>
            <Image
              src="/images/wallector-logo.svg"
              alt="Wallector"
              width={110}
              height={40}
              className="brand-logo"
            />
          </Link>
        </div>
      </header>

      <section className="coming-soon-section">
        <div className="container">
          <div className="coming-soon-panel">
            <span className="eyebrow eyebrow-no-line">Try Wallector</span>
            <h1>Coming soon.</h1>
            <p>
              We&rsquo;re polishing the public ChatGPT app. Drop us a line if you want early access:{" "}
              <a href="mailto:info@criticaldrop.com?subject=Wallector%20early%20access">
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
