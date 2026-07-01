"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const cards = [
  {
    emoji: "🫀",
    title: "Medical Devices",
    description: "Design pacemakers, prosthetics, ventilators, and life-saving implants that integrate seamlessly with the human body.",
    gradient: "from-red-500/20 to-rose-900/20",
    border: "border-red-500/20",
    tag: "Hardware",
  },
  {
    emoji: "🧠",
    title: "Artificial Intelligence",
    description: "Build AI systems that diagnose diseases from medical images, predict patient outcomes, and personalize treatment protocols.",
    gradient: "from-purple-500/20 to-violet-900/20",
    border: "border-purple-500/20",
    tag: "AI & ML",
  },
  {
    emoji: "🔍",
    title: "Medical Imaging",
    description: "Engineer MRI, CT, ultrasound, and PET scanners that give doctors a window into the human body without a single incision.",
    gradient: "from-sky-500/20 to-blue-900/20",
    border: "border-sky-500/20",
    tag: "Imaging",
  },
  {
    emoji: "🦾",
    title: "Robotics",
    description: "Develop robotic surgery systems, exoskeletons for rehabilitation, and autonomous surgical assistants that enhance precision.",
    gradient: "from-gray-500/20 to-slate-900/20",
    border: "border-gray-500/20",
    tag: "Robotics",
  },
  {
    emoji: "⌚",
    title: "Wearable Technology",
    description: "Create smartwatches, biosensors, and health monitors that track vital signs continuously and alert to emergencies.",
    gradient: "from-emerald-500/20 to-teal-900/20",
    border: "border-emerald-500/20",
    tag: "Wearables",
  },
  {
    emoji: "🧪",
    title: "Biomaterials",
    description: "Develop bio-compatible materials for stents, bone implants, drug delivery systems, and tissue scaffolds.",
    gradient: "from-yellow-500/20 to-amber-900/20",
    border: "border-yellow-500/20",
    tag: "Materials",
  },
  {
    emoji: "📡",
    title: "Biosensors",
    description: "Engineer sensors that detect diseases at the molecular level — glucose, cancer markers, pathogens — with pinpoint accuracy.",
    gradient: "from-cyan-500/20 to-sky-900/20",
    border: "border-cyan-500/20",
    tag: "Sensors",
  },
  {
    emoji: "🔬",
    title: "Tissue Engineering",
    description: "Grow functional human organs in the lab — skin, cartilage, even hearts — to solve the organ transplant crisis.",
    gradient: "from-pink-500/20 to-rose-900/20",
    border: "border-pink-500/20",
    tag: "Bio-Eng",
  },
  {
    emoji: "💡",
    title: "Healthcare Innovation",
    description: "Transform entire healthcare systems with telemedicine platforms, AI diagnostics, digital health records, and smart hospitals.",
    gradient: "from-orange-500/20 to-red-900/20",
    border: "border-orange-500/20",
    tag: "Innovation",
  },
];

export function WhyBiomedical() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-sky-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Why Biomedical Engineering?"
          title="Engineering the Future of Healthcare"
          highlight="Healthcare"
          subtitle="Biomedical engineering is one of the fastest-growing, highest-impact fields of the 21st century. Here's why the world needs more biomedical engineers."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {cards.map(({ emoji, title, description, gradient, border, tag }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative glass rounded-2xl p-6 border bg-gradient-to-br ${gradient} ${border} card-hover overflow-hidden`}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4 text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full">
                {tag}
              </div>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/3 to-transparent" />

              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-sky-300 transition-colors">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 text-lg mb-6">
            The global biomedical engineering market is projected to exceed{" "}
            <span className="text-sky-400 font-semibold">$700 billion by 2030</span>.
          </p>
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-slate-300 text-sm">
              This workshop is your first step into this world
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
