import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Hero } from "../components/Hero/Hero";
import { Stats } from "../components/Stats/Stats";
import { FeatureCards } from "../components/FeatureCards/FeatureCards";
import { AnalyticsPreview } from "../components/AnalyticsPreview/AnalyticsPreview";
import { Comparison } from "../components/Comparison/Comparison";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { CTA } from "../components/CTA/CTA";
import { Footer } from "../components/Footer/Footer";

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
