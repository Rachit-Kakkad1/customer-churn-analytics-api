import React from "react";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/utils.js";

const dataSegments = [
  { name: "Power Users", value: "32%", change: "+4.2%", trend: "up", color: "text-blue-400" },
  { name: "At Risk", value: "12%", change: "-2.1%", trend: "down", color: "text-red-400" },
  { name: "Dormant", value: "24%", change: "+0.8%", trend: "up", color: "text-white/40" },
];

export const AnalyticsPreview = () => {
  return (
    <section id="analytics" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
                Data Showcase
              </h2>
              <p className="text-4xl md:text-5xl font-bold tracking-tight">
                Insights that drive <br />
                <span className="text-white/40 font-medium">real-world action.</span>
              </p>
              <p className="text-lg text-white/50 leading-relaxed max-w-lg">
                Stop guessing why customers leave. Our platform breaks down
                user behavior into actionable segments, giving you a clear
                roadmap to improve Lifetime Value (LTV).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {dataSegments.map((segment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-2 p-5 rounded-[1.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/[0.08] transition-colors"
                  >
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">{segment.name}</span>
                    <div className="flex items-end gap-2">
                      <span className={cn("text-3xl font-bold tracking-tighter", segment.color)}>{segment.value}</span>
                      <div className={cn("flex items-center text-[10px] font-bold pb-1", segment.trend === "up" ? "text-green-400" : "text-red-400")}>
                        {segment.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {segment.change}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group perspective-[2000px]">
            <motion.div
              initial={{ opacity: 0, rotateY: 10, rotateX: 5, z: -100 }}
              whileInView={{ opacity: 1, rotateY: -5, rotateX: 2, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[4/3] rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 p-[1px] shadow-[0_0_100px_-20px_rgba(168,85,247,0.3)] transform-style-3d"
            >
              <div className="w-full h-full bg-[#050505] rounded-[2rem] overflow-hidden flex flex-col relative shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                {/* Top Bar */}
                <div className="h-14 bg-white/[0.02] border-b border-white/5 flex items-center px-6 justify-between backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <div className="h-7 w-48 bg-black/50 border border-white/5 rounded-full flex items-center px-3 shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse" />
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Churn Model v4.1</span>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 flex flex-col gap-6 relative">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-3 bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05] backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Revenue at risk</span>
                        <span className="text-sm font-bold text-red-400">$240,412</span>
                      </div>
                      <div className="h-1.5 w-full bg-black rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "66%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05] backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Retention Health</span>
                        <span className="text-sm font-bold text-green-400">Stable</span>
                      </div>
                      <div className="h-1.5 w-full bg-black rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Chart */}
                  <div className="flex-1 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] rounded-[1.5rem] p-6 relative z-10 overflow-hidden group/chart">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-sm font-bold text-white/80">Activity Index</span>
                      </div>
                      <div className="flex gap-1 p-1 bg-black/50 rounded-lg border border-white/5">
                        <div className="px-3 py-1 bg-white/10 rounded-md text-[10px] font-bold text-white shadow-sm">7D</div>
                        <div className="px-3 py-1 hover:bg-white/5 rounded-md text-[10px] font-bold text-white/40 transition-colors">30D</div>
                      </div>
                    </div>

                    <div className="absolute inset-x-6 bottom-6 top-24 flex items-end justify-between gap-1.5">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const height = Math.random() * 70 + 20;
                        return (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: i * 0.02 }}
                            className="w-full bg-gradient-to-t from-purple-500/10 to-purple-400/30 rounded-t-md relative group/bar border-t border-purple-400/20"
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-purple-400/50 opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white text-black text-[9px] font-bold py-1 px-2 rounded">
                              {Math.floor(height)}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
