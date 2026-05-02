export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr-grid">
          <div className="ftr-block">
            <span className="ftr-label">Project</span>
            <p>
              Wallector is a project by CriticalDrop. A custom ChatGPT app for the fine-art marketplace, and a template for any catalog after that.
            </p>
          </div>
          <div className="ftr-block">
            <span className="ftr-label">Navigation</span>
            <a href="#how-it-works">How it works</a>
            <a href="#try">Try it live</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="ftr-block">
            <span className="ftr-label">Contact</span>
            <a href="mailto:info@criticaldrop.com">info@criticaldrop.com</a>
            <a href="#contact">Book a call</a>
          </div>
          <div className="ftr-block">
            <span className="ftr-label">Studio</span>
            <p>
              CriticalDrop · Remote, EU<br />Building AI products for catalogs.
            </p>
          </div>
        </div>
        <div className="ftr-bottom">
          <span>© 2026 CriticalDrop · All rights reserved</span>
          <span>Wallector v1.2 · Built with Claude</span>
        </div>
      </div>
    </footer>
  );
}
