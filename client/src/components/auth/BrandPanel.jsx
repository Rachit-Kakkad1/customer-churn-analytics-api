import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview.jsx";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const BrandPanel = () => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center h-full relative z-10 px-8 lg:px-14 xl:px-20 py-12"
    >
      {/* Logo */}
      <motion.div variants={slideUp} className="mb-10">
        <div className="inline-flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-shadow duration-500">
              <div className="w-5 h-5 bg-black rounded-[4px] relative">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/80 rounded-full" />
              </div>
            </div>
            {/* Orbiting dot */}
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#050508]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="font-bold text-[1.4rem] tracking-[-0.03em] text-white">
            Churnly
          </span>
        </div>
      </motion.div>

      {/* Badge */}
      <motion.div variants={slideUp} className="mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 backdrop-blur-md">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.18em]">
            AI-Powered Retention Intelligence
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={slideUp}
        className="text-4xl lg:text-5xl xl:text-[3.4rem] font-black tracking-[-0.04em] text-white leading-[1.05] mb-5"
      >
        Predict churn{" "}
        <br />
        <span className="relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300">
            before they leave.
          </span>
          {/* Underline accent */}
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={slideUp}
        className="text-base lg:text-lg text-white/45 max-w-md leading-relaxed font-medium mb-8"
      >
        Turn behavioral signals into retention strategies using
        real-time AI analytics and predictive modeling.
      </motion.p>

      {/* Social proof pill */}
      <motion.div variants={slideUp} className="flex items-center gap-3 mb-2">
        <div className="flex -space-x-2">
          {["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"].map((color, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-[#050508] flex items-center justify-center text-[9px] font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {["A", "B", "C", "D"][i]}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-white/40 text-xs font-medium">
          <ChevronRight className="w-3 h-3" />
          <span>Trusted by <span className="text-white/70 font-bold">2,400+</span> companies</span>
        </div>
      </motion.div>

      {/* Dashboard Preview */}
      <DashboardPreview />
    </motion.div>
  );
};
