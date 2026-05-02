export default function ProofBar() {
  return (
    <section className="proof">
      <div className="container proof-grid">
        <div className="proof-item">
          <div className="proof-num">22<em>k</em></div>
          <div className="proof-label">Artworks indexed</div>
        </div>
        <div className="proof-item">
          <div className="proof-num">3.4<em>×</em></div>
          <div className="proof-label">Avg session depth</div>
        </div>
        <div className="proof-item">
          <div className="proof-num">68<em>%</em></div>
          <div className="proof-label">Multi-turn queries</div>
        </div>
        <div className="proof-item">
          <div className="proof-num">28<em>d</em></div>
          <div className="proof-label">Discovery → live</div>
        </div>
      </div>
    </section>
  );
}
