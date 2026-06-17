import React from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BrandPanel } from "../components/auth/BrandPanel";
import { AnimatedBackground } from "../components/auth/AnimatedBackground";
import { LoginForm } from "../components/auth/LoginForm";
import { SocialLogin } from "../components/auth/SocialLogin";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <AuthLayout
      leftPanel={
        <>
          <AnimatedBackground />
          <BrandPanel />
        </>
      }
      rightPanel={
        <div className="flex flex-col w-full relative">
          {/* Subtle mobile logo */}
          <div className="lg:hidden flex justify-center mb-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center rotate-12">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Churnly</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 mb-8"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="text-sm text-white/50 font-medium">
              Continue managing customer intelligence.
            </p>
          </motion.div>

          <div className="bg-[#0a0a0a]/50 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)] relative">
             <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl pointer-events-none" />
             
             <div className="relative z-10">
               <SocialLogin />
               <LoginForm />
             </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8 text-sm text-white/40"
          >
            Don't have an account?{" "}
            <a href="#" className="text-white font-medium hover:text-blue-400 transition-colors relative group">
              Create Account
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.p>
        </div>
      }
    />
  );
};
