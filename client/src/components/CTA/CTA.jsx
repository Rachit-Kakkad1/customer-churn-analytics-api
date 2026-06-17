import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col items-center gap-8 relative">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Ready to predict the <br />
              <span className="text-white/40">future of your growth?</span>
            </h2>

            <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Join 200+ enterprise brands that are already using Churnly to
              transform their customer data into high-performing retention engines.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <button className="bg-white text-black font-bold px-10 py-5 rounded-full hover:bg-white/90 transition-all flex items-center gap-2 group text-lg">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-lg font-medium">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
