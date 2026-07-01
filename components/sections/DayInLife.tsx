"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const dayEvents = [
  {
    time: "10:00 AM",
    emoji: "☀️",
    title: "Welcome & Morning Briefing",
    description: "Start the day with a quick overview of today's journey. Meet your lab partners, collect your guide materials, check your equipment, and get ready to explore.",
    color: "yellow",
  },
  {
    time: "10:20 AM",
    emoji: "🔬",
    title: "Laboratory Session I",
    description: "Dive into hands-on experimentation. Today you might be staining blood cells, grouping blood using antisera, or wiring your first instrumentation amplifier circuit.",
    color: "sky",
  },
  {
    time: "11:20 AM",
    emoji: "📖",
    title: "Theory & Context",
    description: "A faculty expert connects what you just did to the broader world — how does your experiment relate to real clinical practice, diagnostics, and biomedical research?",
    color: "teal",
  },
  {
    time: "11:50 AM",
    emoji: "☕",
    title: "Refreshment Break",
    description: "Recharge with tea, snacks, and good conversation. Connect with fellow participants, mentors, and faculty in a relaxed setting. Refreshments are complimentary.",
    color: "emerald",
  },
  {
    time: "12:10 PM",
    emoji: "💻",
    title: "Laboratory Session II",
    description: "The second session goes deeper. Programme an Arduino, record your own ECG in real time, run MATLAB signal analysis, or build a complete biosignal acquisition system.",
    color: "purple",
  },
  {
    time: "12:50 PM",
    emoji: "💡",
    title: "Reflection & Day Wrap",
    description: "Conclude with a quick team discussion — what did you build today? What questions came up? Faculty summarise key takeaways and preview tomorrow's session.",
    color: "rose",
  },
  {
    time: "1:00 PM",
    emoji: "🌟",
    title: "Day Complete",
    description: "Head out energised. Every day you leave with new practical skills, new connections, and a clearer picture of your future in biomedical engineering.",
    color: "orange",
  },
];

const colorMap: Record<string, { dot: string; text: string; border: string; bg: string }> = {
  yellow: { dot: "bg-yellow-500", text: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/10" },
  sky: { dot: "bg-sky-500", text: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/10" },
  teal: { dot: "bg-teal-500", text: "text-teal-400", border: "border-teal-500/20", bg: "bg-teal-500/10" },
  emerald: { dot: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10" },
  purple: { dot: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10" },
  rose: { dot: "bg-rose-500", text: "text-rose-400", border: "border-rose-500/20", bg: "bg-rose-500/10" },
  orange: { dot: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/10" },
  cyan: { dot: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/10" },
};

export function DayInLife() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute left-0 top-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          badge="A Day in the Life"
          title="What Your Day Looks Like"
          highlight="Day"
          subtitle="Each 3-hour session (10:00 AM – 1:00 PM) is packed with hands-on experiments, expert theory, and live demonstrations. Refreshments and all guide materials are included."
        />

        <div ref={ref} className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-sky-500/50 via-teal-500/30 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {dayEvents.map(({ time, emoji, title, description, color }, i) => {
              const c = colorMap[color];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  {/* Timeline dot */}
                  <div className="relative shrink-0 hidden sm:flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full ${c.dot} flex items-center justify-center text-xl shadow-lg z-10`}>
                      {emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 glass rounded-2xl p-5 border ${c.border} hover:bg-white/3 transition-all group`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-mono ${c.text} ${c.bg} px-2 py-1 rounded-full`}>{time}</span>
                      <span className="sm:hidden text-xl">{emoji}</span>
                    </div>
                    <h3 className={`font-bold text-lg text-white group-hover:${c.text} transition-colors mb-2`}>{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Inclusions note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 glass rounded-2xl px-6 py-5 border border-teal-500/20 flex flex-wrap items-center justify-center gap-6 text-sm"
          >
            {[
              { emoji: "☕", label: "Refreshments Provided", sub: "Tea & snacks included" },
              { emoji: "📚", label: "Guide Materials Included", sub: "Lab manuals & reference notes" },
              { emoji: "🧪", label: "Lab Consumables Provided", sub: "All materials & reagents" },
              { emoji: "🏅", label: "Certificate of Participation", sub: "Awarded on completion" },
            ].map(({ emoji, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <div className="font-semibold text-adaptive-heading">{label}</div>
                  <div className="text-xs text-adaptive-muted">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
