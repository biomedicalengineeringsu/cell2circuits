"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Heart, Zap, Brain, Activity } from "lucide-react";

const features = [
  {
    icon: Heart,
    color: "from-red-500/20 to-rose-500/10 border-red-500/20",
    iconColor: "text-red-400",
    title: "Biology Meets Technology",
    description:
      "The heart beats. The brain fires. Blood flows. Every biological process is, at its core, an electrical signal — and biomedical engineering is the discipline that listens, interprets, and acts on those signals to save lives.",
  },
  {
    icon: Activity,
    color: "from-sky-500/20 to-cyan-500/10 border-sky-500/20",
    iconColor: "text-sky-400",
    title: "From Observation to Innovation",
    description:
      "When you look through a microscope at a blood cell or record an ECG waveform, you're seeing the interface between the biological world and the engineering world — a frontier where curiosity becomes discovery.",
  },
  {
    icon: Zap,
    color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/20",
    iconColor: "text-yellow-400",
    title: "Engineering Healthcare",
    description:
      "Every MRI machine, pacemaker, glucose monitor, and robotic surgery system was designed by a biomedical engineer who understood both biology and electronics. This is the field shaping the future of medicine.",
  },
  {
    icon: Brain,
    color: "from-purple-500/20 to-violet-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    title: "AI-Powered Medicine",
    description:
      "Artificial intelligence is now reading X-rays, predicting diseases before symptoms appear, and personalizing treatment plans. The biomedical engineer of tomorrow speaks the language of biology, code, and mathematics.",
  },
];

export function Welcome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });

  return (
    <section id="welcome" className="section-padding relative overflow-hidden bg-section-1">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Welcome"
          title="Where Biology Becomes Technology"
          highlight="Technology"
          subtitle="Biomedical engineering isn't just a career — it's a calling. It sits at the intersection of the most complex system ever created (the human body) and humanity's most powerful tools (technology and AI)."
        />

        {/* Story block */}
        <AnimatedSection delay={0.3} className="mt-16 mb-20">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 gradient-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-teal-500 to-purple-500 rounded-t-3xl" />
            <blockquote className="text-xl md:text-2xl text-slate-300 leading-relaxed text-center italic font-light">
              &ldquo;Imagine being the engineer who builds the device that detects cancer six months earlier than before — or the researcher who creates a brain-computer interface that lets a paralyzed patient type with their thoughts. That engineer started exactly where you are: curious, ambitious, and ready to learn.&rdquo;
            </blockquote>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-sky-400 text-sm">
                <div className="w-8 h-px bg-sky-400" />
                School of Biomedical Engineering & Health Sciences
                <div className="w-8 h-px bg-sky-400" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Feature cards */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, color, iconColor, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass rounded-2xl p-8 border bg-gradient-to-br ${color} group card-hover`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual element — Journey preview */}
        <AnimatedSection delay={0.2} className="mt-16">
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            {[
              { emoji: "🧫", label: "Cell" },
              { arrow: true },
              { emoji: "🩸", label: "Blood" },
              { arrow: true },
              { emoji: "🔬", label: "Microscopy" },
              { arrow: true },
              { emoji: "❤️", label: "Signal" },
              { arrow: true },
              { emoji: "⚡", label: "Circuit" },
              { arrow: true },
              { emoji: "🤖", label: "AI" },
              { arrow: true },
              { emoji: "🏥", label: "Healthcare" },
            ].map((item, i) =>
              "arrow" in item ? (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-sky-500/50 text-2xl hidden sm:block"
                >
                  →
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, type: "spring" }}
                  className="flex flex-col items-center gap-2 glass rounded-xl px-4 py-3 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all group cursor-default"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-slate-400 text-xs group-hover:text-sky-400 transition-colors">{item.label}</span>
                </motion.div>
              )
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
