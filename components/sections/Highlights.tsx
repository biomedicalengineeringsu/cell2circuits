"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Check } from "lucide-react";

const highlights = [
  { emoji: "🩸", title: "Blood Grouping", desc: "Determine ABO and Rh blood type using antisera" },
  { emoji: "🔬", title: "Blood Staining", desc: "Giemsa and Leishman staining for cell differentiation" },
  { emoji: "👁️", title: "Microscopy", desc: "High-resolution examination of blood cells" },
  { emoji: "🧫", title: "Cell Culture Lab", desc: "Visit active animal cell culture facility" },
  { emoji: "❤️", title: "ECG Recording", desc: "Acquire real electrocardiogram signals" },
  { emoji: "💪", title: "EMG Recording", desc: "Capture muscle electrical signals live" },
  { emoji: "🔌", title: "Arduino Programming", desc: "Code microcontrollers for health monitoring" },
  { emoji: "📡", title: "Biomedical Sensors", desc: "Interface real biosensors with electronics" },
  { emoji: "🤖", title: "AI in Healthcare", desc: "Experience machine learning for medical imaging" },
  { emoji: "📊", title: "MATLAB", desc: "Signal analysis and visualization tools" },
  { emoji: "🐍", title: "Python", desc: "Biomedical data processing and plotting" },
  { emoji: "🏆", title: "Innovation Challenge", desc: "Pitch your healthcare startup idea" },
  { emoji: "🏛️", title: "Campus Visit", desc: "Full tour of university facilities" },
  { emoji: "📜", title: "Certificate", desc: "Certified by Shobhit University" },
];

export function Highlights() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="highlights" className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Workshop Highlights"
          title="Everything You Will Experience"
          highlight="Experience"
          subtitle="14 unique hands-on activities across 5 days — every single one is practical, not theoretical. You'll leave with skills, memories, and a certificate."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-16">
          {highlights.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass rounded-2xl p-5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 card-hover"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">{emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <h3 className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors truncate">{title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full experience card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 glass rounded-2xl p-8 gradient-border text-center"
        >
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="text-white font-bold text-2xl mb-3 font-display">
            All Included in Your Workshop Experience
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Lunch, laboratory consumables, workshop materials, access to all facilities, guidance from expert faculty, and a university-issued certificate — everything is provided.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
