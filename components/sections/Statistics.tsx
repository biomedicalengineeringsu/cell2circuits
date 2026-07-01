"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  emoji: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 5, suffix: "", label: "Days of Learning", emoji: "📅", description: "Intensive immersive experience" },
  { value: 20, suffix: "+", label: "Hands-on Activities", emoji: "🔬", description: "Every day is practical" },
  { value: 15, suffix: "+", label: "Faculty Mentors", emoji: "👨‍🏫", description: "Industry & research experts" },
  { value: 6, suffix: "", label: "World-class Labs", emoji: "🏛️", description: "State-of-the-art facilities" },
  { value: 100, suffix: "%", label: "Practical Learning", emoji: "⚡", description: "No boring lectures" },
  { value: 500, suffix: "+", label: "Future Innovators", emoji: "🚀", description: "Join the community" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black gradient-text font-display counter-value">
      {count}{suffix}
    </div>
  );
}

export function Statistics() {
  return (
    <section className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-sky-500/10 via-transparent to-transparent pointer-events-none" style={{ backgroundPosition: "50% 50%", backgroundSize: "60% 60%" }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="By the Numbers"
          title="The Scale of Your Experience"
          highlight="Experience"
          subtitle="Numbers tell only part of the story. But they give you a sense of the depth, breadth, and quality of this workshop."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
          {stats.map(({ value, suffix, label, emoji, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass rounded-2xl p-6 text-center border border-white/5 hover:border-sky-500/20 hover:bg-sky-500/5 transition-all duration-300 card-hover"
            >
              <div className="text-3xl mb-3">{emoji}</div>
              <AnimatedCounter value={value} suffix={suffix} />
              <div className="text-white text-sm font-semibold mt-2 mb-1">{label}</div>
              <div className="text-slate-500 text-xs">{description}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial-style quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-14 glass rounded-3xl p-8 md:p-12 gradient-border text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-teal-500 to-purple-500 rounded-t-3xl" />
          <div className="text-5xl mb-6">💬</div>
          <blockquote className="text-xl md:text-2xl text-slate-300 font-light italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;This workshop doesn&apos;t just teach biomedical engineering — it shows students that they are capable of doing it. The moment a student sees their own heartbeat on a screen they&apos;ve wired themselves, everything changes.&rdquo;
          </blockquote>
          <div className="mt-6 text-sky-400 font-medium">
            — Faculty, School of Biomedical Engineering & Health Sciences
          </div>
        </motion.div>
      </div>
    </section>
  );
}
