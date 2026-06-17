import React from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "../../lib/utils.js";

const features = [
  { name: "Predictive Analytics", traditional: false, basic: true, churnly: true },
  { name: "Real-time Monitoring", traditional: false, basic: false, churnly: true },
  { name: "AI Insight Engine", traditional: false, basic: false, churnly: true },
  { name: "Automated Retention", traditional: false, basic: false, churnly: true },
  { name: "Custom Aggregations", traditional: true, basic: true, churnly: true },
  { name: "Scalable Infrastructure", traditional: false, basic: true, churnly: true },
  { name: "Enterprise Security", traditional: false, basic: true, churnly: true },
];

export const Comparison = () => {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-4 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              The Unfair Advantage
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Leave the competition <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">in the dust.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 right-0 w-[30%] lg:w-[35%] bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl -z-10 animate-pulse opacity-50" />

          <div className="bg-[#0a0a0a] rounded-[3rem] border border-white/[0.08] shadow-[0_0_80px_-20px_rgba(0,0,0,1)] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-8 w-[40%]">
                      <span className="text-sm font-bold uppercase tracking-widest text-white/30">Feature Category</span>
                    </th>
                    <th className="p-8 text-center w-[20%]">
                      <span className="text-lg font-bold text-white/60">Legacy CRM</span>
                    </th>
                    <th className="p-8 text-center w-[20%]">
                      <span className="text-lg font-bold text-white/60">Basic Dashboards</span>
                    </th>
                    <th className="p-8 text-center w-[20%] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent border-x border-t border-blue-500/20 rounded-t-[2rem] pointer-events-none" />
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-[2rem]" />
                      <div className="flex flex-col items-center justify-center gap-1 relative z-10">
                        <span className="text-2xl font-bold text-white tracking-tight">Churnly</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">The Standard</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group border-t border-white/5 hover:bg-white/[0.02] transition-colors relative"
                    >
                      <td className="p-8 relative">
                        <span className="text-base font-semibold text-white/90 tracking-wide">{feature.name}</span>
                      </td>
                      <td className="p-8 text-center">
                        {feature.traditional ? (
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                            <Check className="w-4 h-4 text-white/40" />
                          </div>
                        ) : (
                          <Minus className="w-5 h-5 text-white/10 mx-auto" />
                        )}
                      </td>
                      <td className="p-8 text-center">
                        {feature.basic ? (
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                            <Check className="w-4 h-4 text-white/60" />
                          </div>
                        ) : (
                          <Minus className="w-5 h-5 text-white/10 mx-auto" />
                        )}
                      </td>
                      <td className="p-8 text-center relative bg-blue-500/[0.02] group-hover:bg-blue-500/[0.05] transition-colors">
                        <div className="absolute inset-0 border-x border-blue-500/10 pointer-events-none" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] relative z-10">
                          <Check className="w-5 h-5 text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  <tr>
                    <td className="p-4 border-t border-white/5" />
                    <td className="p-4 border-t border-white/5" />
                    <td className="p-4 border-t border-white/5" />
                    <td className="p-4 border-t border-white/5 relative bg-blue-500/[0.02]">
                      <div className="absolute inset-0 border-x border-b border-blue-500/20 rounded-b-[2rem] pointer-events-none bg-gradient-to-t from-blue-500/5 to-transparent" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
