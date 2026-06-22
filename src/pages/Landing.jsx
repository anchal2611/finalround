import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import Preview from "../components/landing/Preview";
import Background from "../components/Background";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      
      <Background />

      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Preview />
          <CTA />
        </main>

        <Footer />
      </div>

    </div>
  );
}