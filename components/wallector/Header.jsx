import Image from "next/image";

export default function Header() {
  return (
    <header className="hdr">
      <div className="container hdr-inner">
        <a className="brand" href="#top">
          <Image
            className="brand-cd"
            src="/images/criticaldrop-logo.svg"
            alt="CriticalDrop"
            width={32}
            height={32}
          />
          <span className="brand-x" aria-hidden="true">×</span>
          <Image
            className="brand-logo"
            src="/images/wallector-logo.svg"
            alt="Wallector"
            width={110}
            height={40}
          />
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#how-it-works">How it works</a>
          <a href="#try">Try it</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="hdr-cta">
          <a className="btn btn-primary btn-sm" href="#contact">Book a call →</a>
        </div>
      </div>
    </header>
  );
}
