import React from "react";
import { motion } from "framer-motion";
import { AuthCard } from "./AuthCard.jsx";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-[#050508] text-white selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Left Panel slot */}
      <div className="hidden lg:flex w-[55%] relative flex-col overflow-hidden">
        <div id="brand-panel-slot" className="w-full h-full" />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[45%] relative flex items-center justify-center p-6 sm:p-10 lg:p-12 z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/[0.06] via-transparent to-violet-900/[0.06] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Mobile background blobs */}
        <div className="lg:hidden absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="w-4 h-4 bg-black rounded-[3px] relative">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight">Churnly</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <AuthCard />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-[10px] text-white/20 font-medium"
          >
            Protected by enterprise-grade encryption. SOC 2 Type II certified.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
