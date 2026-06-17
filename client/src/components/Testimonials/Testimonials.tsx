import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Churnly has completely transformed how we look at customer retention. The AI insights are scary accurate.",
    author: "Sarah Chen",
    role: "Founder at Bloom",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    quote: "The developer experience is top-notch. Integrating the API was a breeze, and the documentation is excellent.",
    author: "James Wilson",
    role: "CTO at TechFlow",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    quote: "We've seen a 40% reduction in churn within just three months of using the automated retention playbooks.",
    author: "Elena Rodriguez",
    role: "VP Growth at ScaleUp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500">
            Testimonials
          </h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by the world's <br />
            <span className="text-white/40 font-medium">most ambitious teams.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:bg-white/[0.04] transition-colors group"
            >
              <Quote className="w-10 h-10 text-blue-500/20 mb-6 group-hover:text-blue-500/40 transition-colors" />
              <p className="text-lg text-white/80 leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border border-white/10" />
                <div className="flex flex-col">
                  <span className="font-bold text-white">{t.author}</span>
                  <span className="text-xs text-white/40 uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
