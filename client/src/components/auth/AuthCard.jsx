import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { LoginForm } from "./LoginForm.jsx";
import { RegisterForm } from "./RegisterForm.jsx";

const contentVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 0.97,
    filter: "blur(4px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
  }),
};

const headerVariants = {
  initial: (direction) => ({
    opacity: 0, y: direction > 0 ? 12 : -12,
  }),
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
  exit: (direction) => ({
    opacity: 0, y: direction > 0 ? -12 : 12,
    transition: { duration: 0.25 },
  }),
};

export const AuthCard = () => {
  const [mode, setMode] = useState("login");
  const [direction, setDirection] = useState(1);

  const switchTo = (next) => {
    setDirection(next === "register" ? 1 : -1);
    setMode(next);
  };

  const isLogin = mode === "login";

  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 28, mass: 1 }}
        className="relative w-full"
      >
        {/* Outer glow shell */}
        <motion.div
          animate={{
            background: isLogin
              ? "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.25) 0%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute -inset-px rounded-3xl pointer-events-none"
        />

        {/* Card shell */}
        <motion.div
          layout
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(8,8,14,0.85)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: isLogin
              ? "0 0 0 1px rgba(99,102,241,0.15), 0 32px 80px -16px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 0 0 1px rgba(139,92,246,0.18), 0 32px 80px -16px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "box-shadow 0.8s ease",
          }}
        >
          {/* Ambient color layer */}
          <motion.div
            animate={{
              background: isLogin
                ? "radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.07) 0%, transparent 60%)"
                : "radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.09) 0%, transparent 60%)",
            }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Mode indicator pill */}
          <div className="absolute top-5 right-5 z-20">
            <div className="flex items-center gap-0.5 p-0.5 bg-white/[0.04] rounded-full border border-white/[0.06]">
              {["login", "register"].map((m) => (
                <motion.button
                  key={m}
                  type="button"
                  onClick={() => switchTo(m)}
                  className="relative px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
                  animate={{ color: mode === m ? "#fff" : "rgba(255,255,255,0.3)" }}
                >
                  {mode === m && (
                    <motion.div
                      layoutId="modePill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: isLogin
                          ? "rgba(99,102,241,0.3)"
                          : "rgba(139,92,246,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{m === "login" ? "Login" : "Register"}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="p-7 sm:p-9">
            {/* Header area */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`header-${mode}`}
                custom={direction}
                variants={headerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-7"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <motion.div
                    animate={{
                      background: isLogin
                        ? "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))"
                        : "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.1))",
                      borderColor: isLogin ? "rgba(99,102,241,0.3)" : "rgba(139,92,246,0.3)",
                    }}
                    className="w-9 h-9 rounded-xl border flex items-center justify-center"
                    transition={{ duration: 0.6 }}
                  >
                    <motion.span className="text-sm" animate={{ rotateY: [0, 360] }} transition={{ duration: 0.5 }}>
                      {isLogin ? "👋" : "✨"}
                    </motion.span>
                  </motion.div>

                  <div>
                    <h2 className="text-xl font-black tracking-[-0.03em] text-white leading-none">
                      {isLogin ? "Welcome back" : "Create account"}
                    </h2>
                    <p className="text-[11px] text-white/35 font-medium mt-0.5">
                      {isLogin
                        ? "Sign in to your analytics dashboard"
                        : "Start your 14-day free trial"}
                    </p>
                  </div>
                </div>

                {/* Register progress bar */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    className="mt-3 h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                      animate={{ width: ["0%", "30%"] }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Form content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`form-${mode}`}
                custom={direction}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {isLogin ? (
                  <LoginForm onSwitch={() => switchTo("register")} />
                ) : (
                  <RegisterForm onSwitch={() => switchTo("login")} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};
