import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070a] p-4 text-center select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative max-w-md w-full rounded-2xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-8 shadow-2xl shadow-black/85 backdrop-blur-md overflow-hidden"
      >
        {/* Soft Background Alert Glow */}
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-rose-500/[0.02] blur-3xl pointer-events-none" />

        {/* Warning Icon Badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 mb-5 shadow-lg shadow-rose-500/5 animate-pulse">
          <ShieldAlert className="h-7 w-7" />
        </div>

        {/* Headline */}
        <h1 className="text-xl font-bold text-white tracking-tight">Something went wrong</h1>
        <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto leading-relaxed">
          The application telemetry stream encountered an unhandled execution error.
        </p>

        {/* Error Details Container */}
        {error && (
          <div className="mt-5 rounded-lg border border-white/5 bg-white/[0.01] p-3 text-left">
            <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider block">Diagnostics Message</span>
            <p className="text-xs font-mono text-neutral-400 mt-1 max-h-24 overflow-y-auto custom-scrollbar break-all leading-normal">
              {error.message || error.toString()}
            </p>
          </div>
        )}

        {/* Actions Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-white/5">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Restart Stream
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/5 px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
          >
            <Home className="h-3.5 w-3.5" />
            Go Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;
