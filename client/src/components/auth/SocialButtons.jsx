import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ArrowRight, Loader2 } from "lucide-react";

const buttonVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

export const SocialButtons = ({ mode }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocial = async (provider) => {
    setLoadingProvider(provider);
    await new Promise((r) => setTimeout(r, 1800));
    setLoadingProvider(null);
  };

  const providers = [
    {
      key: "google",
      label: "Google",
      icon: <FaGoogle className="w-4 h-4" />,
      hoverClass: "hover:border-blue-500/40 hover:bg-blue-500/5",
    },
    {
      key: "github",
      label: "GitHub",
      icon: <FaGithub className="w-4 h-4" />,
      hoverClass: "hover:border-white/20 hover:bg-white/[0.04]",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {providers.map((provider, i) => {
          const isLoading = loadingProvider === provider.key;
          return (
            <motion.button
              key={provider.key}
              custom={i}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              type="button"
              onClick={() => handleSocial(provider.key)}
              disabled={!!loadingProvider}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 text-sm font-semibold transition-all duration-300 ${provider.hoverClass} disabled:opacity-50 disabled:pointer-events-none overflow-hidden group`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.7 }}
              />
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                provider.icon
              )}
              <span>{provider.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        <span className="text-[11px] font-semibold text-white/25 uppercase tracking-widest">or</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </div>
    </div>
  );
};

/* ───────── Magnetic Submit Button ───────── */
export const SubmitButton = ({ isSubmitting, label }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={isSubmitting}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }); }}
      animate={{ x: hovered ? pos.x : 0, y: hovered ? pos.y : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-white text-black font-bold text-sm mt-2 overflow-hidden group disabled:opacity-70 disabled:pointer-events-none"
      style={{
        boxShadow: hovered
          ? "0 0 0 1px rgba(255,255,255,0.3), 0 8px 32px -8px rgba(255,255,255,0.4), 0 0 60px -15px rgba(139,92,246,0.5)"
          : "0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px -8px rgba(255,255,255,0.2)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.7 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white/90 opacity-100" />

      <span className="relative z-10 flex items-center gap-2">
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {label}
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400 }}>
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </>
        )}
      </span>
    </motion.button>
  );
};
