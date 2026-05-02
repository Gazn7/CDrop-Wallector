import Header from "./wallector/Header";
import Hero from "./wallector/Hero";
import ProofBar from "./wallector/ProofBar";
import HowItWorks from "./wallector/HowItWorks";
import TryItLive from "./wallector/TryItLive";
import Timeline from "./wallector/Timeline";
import FAQ from "./wallector/FAQ";
import CTACard from "./wallector/CTACard";
import Footer from "./wallector/Footer";

export default function WallectorLanding() {
  return (
    <main className="shell">
      <Header />
      <Hero />
      <ProofBar />
      <HowItWorks />
      <TryItLive />
      <Timeline />
      <FAQ />
      <CTACard />
      <Footer />
    </main>
  );
}
