"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const outcomes = [
  { emoji: "🧬", text: "Understand the fundamentals of Biomedical Engineering" },
  { emoji: "🩸", text: "Perform Blood Grouping using standard laboratory techniques" },
  { emoji: "🔬", text: "Observe and analyze Blood Cells under the microscope" },
  { emoji: "🧫", text: "Explore an active Animal Cell Culture Laboratory" },
  { emoji: "❤️", text: "Acquire and visualize real ECG (Electrocardiogram) signals" },
  { emoji: "💪", text: "Record EMG (Electromyogram) signals from muscles" },
  { emoji: "📡", text: "Understand the nature and types of Biosignals" },
  { emoji: "⚡", text: "Wire functional Biomedical Electronic Circuits" },
  { emoji: "🔌", text: "Interface biosensors with Arduino and ESP32" },
  { emoji: "💻", text: "Program microcontrollers for health monitoring" },
  { emoji: "📊", text: "Visualize biosignals in real-time on a computer" },
  { emoji: "🔧", text: "Use MATLAB for signal analysis and processing" },
  { emoji: "🐍", text: "Apply Python for biomedical data visualization" },
  { emoji: "🤖", text: "Explore Artificial Intelligence applications in Healthcare" },
  { emoji: "🏗️", text: "Build a Mini Biomedical System as a capstone project" },
  { emoji: "🚀", text: "Understand career pathways in Biomedical Engineering" },
];

export function LearningOutcomes() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Learning Outcomes"
          title="What You Will Be Able to Do"
          highlight="Do"
          subtitle="After 5 days in our labs, you won't just know about biomedical engineering — you'll have done it. Each outcome is a real, practical skill."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {outcomes.map(({ emoji, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group glass rounded-xl p-4 flex items-start gap-3 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all duration-300 cursor-default"
            >
              <span className="text-xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">{emoji}</span>
              <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-8 gradient-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { num: "16+", label: "Distinct Skills" },
              { num: "5", label: "Laboratory Days" },
              { num: "100%", label: "Hands-on Learning" },
              { num: "1", label: "Certificate Awarded" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black gradient-text mb-1 font-display">{num}</div>
                <div className="text-slate-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
