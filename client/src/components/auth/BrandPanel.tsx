import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";

export const BrandPanel = () => {
  return (
    <div className="flex flex-col justify-center h-full relative z-10 px-8 lg:px-16 xl:px-24">
      {/* Brand Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <div className="w-5 h-5 bg-black rounded-sm" />
        </div>
        <span className="font-bold text-2xl tracking-tight text-white">Churnly</span>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            AI Powered Customer Intelligence
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Predict churn <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            before customers leave.
          </span>
        </h1>

        <p className="text-lg text-white/50 max-w-lg leading-relaxed font-medium">
          Transform customer behavior into actionable retention strategies through 
          real-time analytics and predictive modeling.
        </p>
      </motion.div>

      {/* Floating Dashboard Preview */}
      <DashboardPreview />
    </div>
  );
};
