import React from "react";
import { Navbar } from "../components/Navbar/Navbar.jsx";
import { Hero } from "../components/Hero/Hero.jsx";
import { Stats } from "../components/Stats/Stats.jsx";
import { FeatureCards } from "../components/FeatureCards/FeatureCards.jsx";
import { AnalyticsPreview } from "../components/AnalyticsPreview/AnalyticsPreview.jsx";
import { Comparison } from "../components/Comparison/Comparison.jsx";
import { Testimonials } from "../components/Testimonials/Testimonials.jsx";
import { CTA } from "../components/CTA/CTA.jsx";
import { Footer } from "../components/Footer/Footer.jsx";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeatureCards />
        <AnalyticsPreview />
        <Comparison />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};
