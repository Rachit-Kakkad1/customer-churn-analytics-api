import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Activity, Zap, BrainCircuit } from "lucide-react";

export const DashboardPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-lg mx-auto mt-12 perspective-[2000px]"
    >
      <motion.div
        animate={{ rotateX: [2, -2, 2], rotateY: [-2, 2, -2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-full bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] p-6 transform-style-3d relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-400" />
             </div>
             <div>
                <h3 className="text-sm font-bold text-white/90 tracking-wide">Live Intelligence</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Global metrics</p>
             </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {/* Card 1 */}
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Retention</span>
            <div className="mt-2 flex items-end justify-between">
               <span className="text-2xl font-bold tracking-tighter">92.3%</span>
               <span className="text-[10px] font-bold text-green-400 flex items-center"><ArrowUpRight className="w-3 h-3" />+12%</span>
            </div>
            <div className="mt-4 h-1 w-full bg-black/50 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-green-500/80" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Revenue Risk</span>
            <div className="mt-2 flex items-end justify-between">
               <span className="text-2xl font-bold tracking-tighter text-red-400">$124k</span>
               <span className="text-[10px] font-bold text-red-400 flex items-center"><ArrowDownRight className="w-3 h-3" />-4%</span>
            </div>
            <div className="mt-4 h-1 w-full bg-black/50 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ delay: 0.7, duration: 1 }} className="h-full bg-red-500/80" />
            </div>
          </div>

          {/* AI Panel */}
          <div className="col-span-2 bg-gradient-to-r from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-2xl p-4 flex items-start gap-4">
             <div className="p-2 bg-purple-500/20 rounded-xl">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
             </div>
             <div>
                <h4 className="text-xs font-bold text-white/90 uppercase tracking-widest mb-1">AI Insight</h4>
                <p className="text-sm text-white/60 leading-snug">
                  High churn risk detected in <span className="text-purple-300 font-bold">Enterprise</span> segment. Suggested action: <span className="text-white border-b border-white/20 pb-0.5 cursor-pointer">Initiate Email Campaign</span>
                </p>
             </div>
          </div>

          {/* Mini Chart */}
          <div className="col-span-2 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 h-24 flex items-end gap-1.5 relative overflow-hidden group">
             <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live Activity</span>
             </div>
             {[34, 62, 45, 78, 23, 56, 41, 68, 89, 52, 33, 71, 48, 82, 37, 65, 29, 74].map((height, i) => (
               <motion.div
                 key={i}
                 initial={{ height: "10%" }}
                 animate={{ height: `${height}%` }}
                 transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                 className="flex-1 bg-gradient-to-t from-blue-500/40 to-blue-400/20 rounded-t-sm"
               />
             ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
