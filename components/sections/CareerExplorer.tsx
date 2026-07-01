"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ArrowDown } from "lucide-react";

const roadmapSteps = [
  { emoji: "🎓", label: "Class XII Science", desc: "Your starting point" },
  { emoji: "🏛️", label: "B.Tech Biomedical Engineering", desc: "4 years of integrated learning" },
  { emoji: "🔬", label: "Research & Specialization", desc: "M.Tech / Ph.D / Fellowship" },
  { emoji: "🏥", label: "Healthcare Industry", desc: "Hospitals, Clinics, Labs" },
  { emoji: "🏭", label: "Medical Devices", desc: "Philips, GE, Medtronic, Siemens" },
  { emoji: "🤖", label: "Healthcare AI", desc: "Startups, FAANG Health, Research" },
  { emoji: "🌐", label: "Global Healthcare Leader", desc: "Changing lives worldwide" },
];

const careers = [
  {
    title: "Clinical Engineer",
    emoji: "🏥",
    description: "Manage and maintain medical equipment in hospitals. Be the engineer that keeps life-saving machines running.",
    salary: "₹4–15 LPA",
    demand: "High",
    color: "sky",
  },
  {
    title: "Medical Device Engineer",
    emoji: "🔌",
    description: "Design pacemakers, prosthetics, ventilators, and implants at companies like Philips, GE, or Medtronic.",
    salary: "₹6–25 LPA",
    demand: "Very High",
    color: "teal",
  },
  {
    title: "Healthcare AI Engineer",
    emoji: "🤖",
    description: "Build machine learning systems that detect diseases, analyze medical images, and predict patient outcomes.",
    salary: "₹10–40 LPA",
    demand: "Explosive",
    color: "purple",
  },
  {
    title: "Biomedical Researcher",
    emoji: "🔬",
    description: "Lead breakthrough research in cancer biology, regenerative medicine, and next-gen diagnostics.",
    salary: "₹5–20 LPA",
    demand: "Steady",
    color: "rose",
  },
  {
    title: "Health Data Scientist",
    emoji: "📊",
    description: "Extract insights from healthcare data to improve patient outcomes and hospital efficiency at scale.",
    salary: "₹8–30 LPA",
    demand: "Very High",
    color: "yellow",
  },
  {
    title: "Medical Robotics Engineer",
    emoji: "🦾",
    description: "Develop robotic surgery systems, rehabilitation exoskeletons, and autonomous medical robots.",
    salary: "₹12–50 LPA",
    demand: "Growing Fast",
    color: "emerald",
  },
  {
    title: "Rehabilitation Engineer",
    emoji: "♿",
    description: "Create assistive technologies — prosthetics, orthotics, communication devices — for people with disabilities.",
    salary: "₹5–18 LPA",
    demand: "Moderate",
    color: "orange",
  },
  {
    title: "HealthTech Founder",
    emoji: "🚀",
    description: "Build a healthcare startup that solves a real medical problem. Be the next Biocon, Niramai, or Tricog.",
    salary: "Unlimited",
    demand: "Self-driven",
    color: "cyan",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; demand: string }> = {
  sky: { text: "text-sky-400", bg: "from-sky-500/15", border: "border-sky-500/25", demand: "bg-sky-500/20 text-sky-300" },
  teal: { text: "text-teal-400", bg: "from-teal-500/15", border: "border-teal-500/25", demand: "bg-teal-500/20 text-teal-300" },
  purple: { text: "text-purple-400", bg: "from-purple-500/15", border: "border-purple-500/25", demand: "bg-purple-500/20 text-purple-300" },
  rose: { text: "text-rose-400", bg: "from-rose-500/15", border: "border-rose-500/25", demand: "bg-rose-500/20 text-rose-300" },
  yellow: { text: "text-yellow-400", bg: "from-yellow-500/15", border: "border-yellow-500/25", demand: "bg-yellow-500/20 text-yellow-300" },
  emerald: { text: "text-emerald-400", bg: "from-emerald-500/15", border: "border-emerald-500/25", demand: "bg-emerald-500/20 text-emerald-300" },
  orange: { text: "text-orange-400", bg: "from-orange-500/15", border: "border-orange-500/25", demand: "bg-orange-500/20 text-orange-300" },
  cyan: { text: "text-cyan-400", bg: "from-cyan-500/15", border: "border-cyan-500/25", demand: "bg-cyan-500/20 text-cyan-300" },
};

export function CareerExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-sky-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Career Explorer"
          title="Your Future in Biomedical Engineering"
          highlight="Future"
          subtitle="The biomedical engineering field is projected to grow at 7% annually through 2030. Here are the career paths that await you."
        />

        {/* Roadmap */}
        <div className="mt-16 flex flex-col items-center gap-0">
          {roadmapSteps.map(({ emoji, label, desc }, i) => (
            <div key={label} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="glass rounded-2xl px-8 py-4 border border-white/10 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all text-center group"
              >
                <span className="text-2xl mr-3">{emoji}</span>
                <span className="text-white font-semibold">{label}</span>
                <span className="text-slate-500 text-sm ml-3">— {desc}</span>
              </motion.div>
              {i < roadmapSteps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ delay: i * 0.1 + 0.05 }}
                  className="h-8 flex items-center justify-center text-sky-500/40"
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Career cards */}
        <div className="mt-16">
          <h3 className="text-white font-bold text-2xl text-center mb-8 font-display">
            Career Destinations for Biomedical Engineers
          </h3>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {careers.map(({ title, emoji, description, salary, demand, color }, i) => {
              const c = colorMap[color];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`group glass rounded-2xl p-6 border bg-gradient-to-br ${c.bg} to-transparent ${c.border} card-hover flex flex-col`}
                >
                  <div className="text-4xl mb-4">{emoji}</div>
                  <h4 className={`font-bold text-base mb-2 ${c.text} group-hover:text-white transition-colors`}>{title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{description}</p>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <div className="text-slate-500 text-xs mb-0.5">Salary Range</div>
                      <div className="text-white text-sm font-semibold">{salary}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${c.demand}`}>{demand}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
