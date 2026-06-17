import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const checks = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.met).length;

  const segments = [
    { color: "bg-red-500", label: "Weak" },
    { color: "bg-amber-500", label: "Fair" },
    { color: "bg-blue-500", label: "Good" },
    { color: "bg-emerald-500", label: "Strong" },
  ];

  const activeColor = score === 0
    ? "text-white/30"
    : segments[score - 1]?.color.replace("bg-", "text-");
  const label = score === 0 ? "" : segments[score - 1]?.label;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-2 space-y-2">
        {/* Strength bar */}
        <div className="flex gap-1">
          {segments.map((seg, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${i < score ? seg.color : "bg-transparent"}`}
                initial={{ width: 0 }}
                animate={{ width: i < score ? "100%" : "0%" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
            </div>
          ))}
        </div>

        {/* Label + checks */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            {checks.map((check) => (
              <motion.span
                key={check.label}
                animate={{ color: check.met ? "#6ee7b7" : "rgba(255,255,255,0.3)" }}
                className="text-[10px] font-semibold flex items-center gap-1"
              >
                <motion.span
                  animate={{ scale: check.met ? [1, 1.4, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {check.met ? "✓" : "·"}
                </motion.span>
                {check.label}
              </motion.span>
            ))}
          </div>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[10px] font-bold ${activeColor}`}
            >
              {label}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
