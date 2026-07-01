"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Check } from "lucide-react";

const streams = [
  {
    code: "PCB",
    name: "Physics, Chemistry & Biology",
    emoji: "🔬",
    desc: "Ideal blend of life sciences and physical sciences — perfect for aspiring doctors and biomedical researchers.",
    color: "from-green-500/20 to-emerald-900/10 border-green-500/30",
    textColor: "text-green-400",
  },
  {
    code: "PCM",
    name: "Physics, Chemistry & Maths",
    emoji: "⚡",
    desc: "Strong engineering foundation — ideal for those who want to build the technology that drives modern medicine.",
    color: "from-sky-500/20 to-blue-900/10 border-sky-500/30",
    textColor: "text-sky-400",
  },
  {
    code: "PCMB",
    name: "Physics, Chemistry, Maths & Biology",
    emoji: "🧬",
    desc: "The ultimate combination — you speak both languages. Biomedical engineering was literally designed for you.",
    color: "from-purple-500/20 to-violet-900/10 border-purple-500/30",
    textColor: "text-purple-400",
  },
];

const interests = [
  { emoji: "🩺", label: "Medicine & Healthcare" },
  { emoji: "🧪", label: "Biology & Life Sciences" },
  { emoji: "💻", label: "Technology & AI" },
  { emoji: "⚙️", label: "Engineering & Electronics" },
  { emoji: "🔬", label: "Research & Innovation" },
  { emoji: "🏥", label: "Medical Technology" },
  { emoji: "🤖", label: "Robotics & Automation" },
  { emoji: "📊", label: "Data & Analytics" },
];

const requirements = [
  "Currently studying in Class XI or XII",
  "Science stream (PCB / PCM / PCMB)",
  "Curiosity about how technology and biology connect",
  "Enthusiasm to learn hands-on laboratory skills",
  "Interest in exploring a career in healthcare or engineering",
  "No prior engineering experience required",
];

export function WhoShouldAttend() {
  return (
    <section className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-sky-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Who Should Attend"
          title="Built for Science Students Like You"
          highlight="You"
          subtitle="You don't need to be an engineer to attend — you need to be curious. This workshop is designed for Class XII science students who want to see what biomedical engineering truly feels like."
        />

        {/* Stream cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {streams.map(({ code, name, emoji, desc, color, textColor }, i) => (
            <AnimatedSection key={code} delay={i * 0.1}>
              <div className={`glass rounded-2xl p-8 border bg-gradient-to-br ${color} card-hover group h-full`}>
                <div className="text-5xl mb-4">{emoji}</div>
                <div className={`inline-block ${textColor} font-black text-3xl mb-2 font-display`}>{code}</div>
                <h3 className="text-white font-semibold mb-3 text-sm">{name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Interests */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="glass rounded-2xl p-8 gradient-border">
              <h3 className="text-white font-bold text-xl mb-6">You&apos;ll Love This If You&apos;re Passionate About</h3>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(({ emoji, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-3 glass rounded-xl p-3 cursor-default hover:border-sky-500/30 transition-colors"
                  >
                    <span className="text-xl">{emoji}</span>
                    <span className="text-slate-300 text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Requirements */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="glass rounded-2xl p-8 gradient-border">
              <h3 className="text-white font-bold text-xl mb-6">What You Need to Attend</h3>
              <ul className="space-y-4">
                {requirements.map((req, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{req}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <p className="text-sky-300 text-sm text-center font-medium">
                  🎯 No prior engineering knowledge required — just bring your curiosity!
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
