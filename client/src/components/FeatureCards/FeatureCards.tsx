import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  BarChart3,
  Database,
  Search,
  Filter,
  Zap,
  Lock,
  Layers,
  Cpu,
} from "lucide-react";
import { cn } from "../../lib/utils";

const features = [
  {
    title: "JWT Authentication",
    description: "Enterprise-grade security with stateless token-based auth.",
    icon: ShieldCheck,
    size: "large",
    color: "blue",
  },
  {
    title: "Real-time Metrics",
    description: "Live updates as customers interact with your store.",
    icon: Zap,
    size: "small",
    color: "yellow",
  },
  {
    title: "MongoDB Aggregations",
    description: "High-performance data processing at scale.",
    icon: Database,
    size: "small",
    color: "green",
  },
  {
    title: "Advanced Search",
    description: "Find any customer or transaction in milliseconds.",
    icon: Search,
    size: "medium",
    color: "purple",
  },
  {
    title: "Protected APIs",
    description: "Role-based access control for all endpoints.",
    icon: Lock,
    size: "medium",
    color: "red",
  },
  {
    title: "Scalable Architecture",
    description: "Built to handle millions of requests with ease.",
    icon: Layers,
    size: "small",
    color: "orange",
  },
  {
    title: "Customer Analytics",
    description: "Deep dive into behavioral patterns and cohorts.",
    icon: BarChart3,
    size: "large",
    color: "cyan",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const SpotlightCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      variants={item}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-[2.5rem] bg-[#0a0a0a] overflow-hidden group shadow-[0_0_40px_-20px_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {/* Dynamic Border Gradient wrapper */}
      <div className="absolute inset-0 z-0 p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent mask-image-custom" />
      
      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      
      {/* Inner Content Area */}
      <div className="relative z-20 h-full p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col justify-between overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export const FeatureCards = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-4 mb-20 items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            <SparklesIcon className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Powerful Capabilities
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Built for scale. <br />
            <span className="text-white/40 font-medium">Designed for speed.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed mt-4">
             Everything you need to analyze, segment, and retain your customers 
             in one incredibly fast platform.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]"
        >
          {features.map((feature, i) => (
            <SpotlightCard
              key={i}
              className={cn(
                feature.size === "large" ? "md:col-span-2 md:row-span-2" : "",
                feature.size === "medium" ? "md:col-span-2" : ""
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                <feature.icon className="w-32 h-32 blur-[2px]" />
              </div>

              <div className="flex flex-col gap-4 relative">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_var(--glow)]",
                    feature.color === "blue" && "[--glow:theme(colors.blue.500)] bg-blue-500/10 border-blue-500/20 text-blue-400",
                    feature.color === "green" && "[--glow:theme(colors.green.500)] bg-green-500/10 border-green-500/20 text-green-400",
                    feature.color === "purple" && "[--glow:theme(colors.purple.500)] bg-purple-500/10 border-purple-500/20 text-purple-400",
                    feature.color === "yellow" && "[--glow:theme(colors.yellow.500)] bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
                    feature.color === "red" && "[--glow:theme(colors.red.500)] bg-red-500/10 border-red-500/20 text-red-400",
                    feature.color === "orange" && "[--glow:theme(colors.orange.500)] bg-orange-500/10 border-orange-500/20 text-orange-400",
                    feature.color === "cyan" && "[--glow:theme(colors.cyan.500)] bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                  )}
                >
                  <feature.icon className="w-6 h-6 drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
              </div>
              <p className="text-white/50 leading-relaxed max-w-[260px] text-sm md:text-base font-medium relative">
                {feature.description}
              </p>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)
