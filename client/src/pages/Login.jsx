import React from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "../components/auth/AnimatedBackground.jsx";
import { BrandPanel } from "../components/auth/BrandPanel.jsx";
import { AuthCard } from "../components/auth/AuthCard.jsx";

export const Login = () => {
  return (
    <div className="min-h-screen w-full flex bg-[#050508] text-white selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Left Panel — 55% */}
      <div className="hidden lg:flex w-[55%] relative flex-col overflow-hidden">
        <AnimatedBackground />
        <BrandPanel />
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:block absolute left-[55%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent z-30" />

      {/* Right Panel — 45% */}
      <div className="w-full lg:w-[45%] relative flex items-center justify-center p-6 sm:p-10 lg:p-14 z-20">
        {/* Right panel subtle bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.06)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.04)_0%,transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </div>

        {/* Mobile ambient blobs */}
        <div className="lg:hidden absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="lg:hidden absolute -bottom-32 -right-32 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6 z-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-[10px] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <div className="w-4 h-4 bg-black rounded-[3px] relative">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/80 rounded-full" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-[-0.02em]">Churnly</span>
          </div>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px]"
        >
          <AuthCard />

          {/* Security footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            {["SOC 2 Type II", "256-bit AES", "GDPR Ready"].map((badge) => (
              <span key={badge} className="text-[9px] font-bold text-white/15 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-white/15 inline-block" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
