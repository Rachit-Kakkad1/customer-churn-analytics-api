import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PARTICLE_COUNT = 28;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.4 + 0.1,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * -20,
    driftX: (Math.random() - 0.5) * 60,
    driftY: (Math.random() - 0.5) * 60,
  }));
}

const particles = generateParticles();

export const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 20, mass: 1 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  const blob1X = useTransform(mouseX, [-1, 1], [-30, 30]);
  const blob1Y = useTransform(mouseY, [-1, 1], [-30, 30]);
  const blob2X = useTransform(mouseX, [-1, 1], [20, -20]);
  const blob2Y = useTransform(mouseY, [-1, 1], [20, -20]);
  const blob3X = useTransform(mouseX, [-1, 1], [-15, 15]);
  const blob3Y = useTransform(mouseY, [-1, 1], [10, -10]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    rawMouseX.set(x);
    rawMouseY.set(y);
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, [rawMouseX, rawMouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Deep grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Animated radial glow — follows mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "60%",
          height: "60%",
          left: `${mousePos.x * 100 - 30}%`,
          top: `${mousePos.y * 100 - 30}%`,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          transition: "left 0.8s ease, top 0.8s ease",
        }}
      />

      {/* Primary blob — blue/indigo */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        animate={{
          scale: [1, 1.08, 0.95, 1.05, 1],
          borderRadius: ["60% 40% 55% 45%", "45% 55% 40% 60%", "60% 40% 55% 45%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%] bg-blue-600/[0.18] blur-[120px]"
      />

      {/* Secondary blob — violet */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        animate={{
          scale: [1, 0.92, 1.06, 0.98, 1],
          borderRadius: ["55% 45% 60% 40%", "40% 60% 45% 55%", "55% 45% 60% 40%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] bg-violet-600/[0.16] blur-[130px]"
      />

      {/* Tertiary blob — cyan accent */}
      <motion.div
        style={{ x: blob3X, y: blob3Y }}
        animate={{
          scale: [1, 1.15, 0.9, 1.05, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] left-[20%] w-[35%] h-[35%] bg-cyan-500/10 blur-[100px]"
      />

      {/* Rose accent blob */}
      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["5%", "-3%", "5%"],
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.10, 0.06],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-rose-500/[0.08] blur-[100px]"
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/20 to-[#050508]/70 pointer-events-none" />
      {/* Right edge fade for panel blending */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050508]/60 pointer-events-none" />
    </div>
  );
};
