import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="w-full relative flex items-center justify-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all duration-300 font-medium text-white shadow-sm overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <FaGoogle className="w-4 h-4 text-white/80" />
        Continue with Google
      </button>

      <button
        type="button"
        className="w-full relative flex items-center justify-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all duration-300 font-medium text-white shadow-sm overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <FaGithub className="w-4 h-4 text-white/80" />
        Continue with Github
      </button>

      <div className="relative flex items-center py-4">
        <div className="flex-grow border-t border-white/10" />
        <span className="flex-shrink-0 mx-4 text-xs font-medium uppercase tracking-widest text-white/40">Or</span>
        <div className="flex-grow border-t border-white/10" />
      </div>
    </div>
  );
};
