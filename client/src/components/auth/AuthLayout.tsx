import React from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export const AuthLayout = ({ leftPanel, rightPanel }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex bg-[#0a0a0a] text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Mobile background ambient */}
      <div className="lg:hidden absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-[55%] relative flex-col">
        {leftPanel}
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {rightPanel}
        </motion.div>
      </div>
    </div>
  );
};
