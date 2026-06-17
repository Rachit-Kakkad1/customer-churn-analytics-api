import React, { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    label: "Customers analyzed",
    value: 500000,
    suffix: "+",
    description: "Across 200+ enterprise partners",
  },
  {
    label: "Prediction confidence",
    value: 98,
    suffix: "%",
    description: "Industry-leading accuracy",
  },
  {
    label: "Retention improvement",
    value: 45,
    suffix: "%",
    description: "Average uplift in first 6 months",
  },
  {
    label: "Transactions processed",
    value: 20,
    suffix: "M+",
    description: "Scalable data architecture",
  },
];

const AnimatedNumber = ({ value }: { value: number }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 16;
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCurrent(end);
          clearInterval(timer);
        } else {
          setCurrent(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{current.toLocaleString()}</span>;
};

export const Stats = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter italic">
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white/90">
                  {stat.label}
                </span>
                <span className="text-xs text-white/40">{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
