import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40">
      <div>
        <h3 className="text-base font-bold text-white">Visual Appearance</h3>
        <p className="text-xs text-neutral-400 mt-1">Customize the interface aesthetic environment.</p>
      </div>

      {/* Switcher Option Buttons Grid */}
      <div className="grid grid-cols-3 gap-3 mt-5 p-1 rounded-lg border border-white/5 bg-white/[0.01]">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = theme === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className="relative flex flex-col items-center justify-center py-3.5 rounded-md text-xs font-semibold select-none cursor-pointer transition-colors duration-200"
            >
              {/* Animated Background Slide Selection Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeThemeBg"
                  className="absolute inset-0 rounded-md bg-white/[0.04] border border-white/5 shadow-inner backdrop-blur-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon & Label */}
              <span className={`relative z-10 flex flex-col items-center gap-1.5 ${isActive ? 'text-indigo-400' : 'text-neutral-400 hover:text-neutral-300'}`}>
                <Icon className="h-4 w-4" />
                <span>{opt.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
