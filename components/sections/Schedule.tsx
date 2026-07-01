"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Calendar, Microscope, Zap, Cpu, Trophy, BookOpen, FlaskConical } from "lucide-react";

const days = [
  {
    day: 1,
    title: "Biological Foundations",
    theme: "Understanding Life",
    icon: BookOpen,
    color: "sky",
    emoji: "🧬",
    topics: [
      "Introduction to Biomedical Engineering",
      "Biological Sciences & Human Physiology",
      "Blood Components & Blood Types",
      "Blood Grouping Techniques",
      "Laboratory Safety & Protocols",
      "Tour of Biomedical Instrumentation Lab",
    ],
    handson: ["Blood Group Detection using Antisera", "Microscope orientation", "Lab safety demonstration"],
    outcome: "Understand the biological foundations of healthcare engineering and perform your first clinical test.",
  },
  {
    day: 2,
    title: "Microscopy & Cell Biology",
    theme: "Seeing the Invisible",
    icon: Microscope,
    color: "teal",
    emoji: "🔬",
    topics: [
      "Blood Smear Preparation Techniques",
      "Blood Staining (Giemsa, Leishman)",
      "Principles of Light Microscopy",
      "Cell Morphology — RBC, WBC, Platelets",
      "Differential Blood Cell Count",
      "Introduction to Cell Culture",
    ],
    handson: [
      "Prepare and stain a blood smear",
      "Identify RBC, WBC, and platelets under microscope",
      "Visit the Animal Cell Culture Laboratory",
    ],
    outcome: "See living cells with your own eyes and understand the difference between normal and abnormal cell morphology.",
  },
  {
    day: 3,
    title: "Biosignals & Human Physiology",
    theme: "Listening to the Human Body",
    icon: Zap,
    color: "rose",
    emoji: "❤️",
    topics: [
      "Overview of Bioelectrical Signals",
      "Electrocardiogram (ECG) — Heart Signals",
      "Electromyogram (EMG) — Muscle Signals",
      "Electroencephalogram (EEG) — Brain Signals",
      "Pulse & Respiration Monitoring",
      "Signal Acquisition Hardware Overview",
    ],
    handson: [
      "Live ECG recording from student volunteers",
      "EMG signal capture during muscle contraction",
      "Real-time signal visualization on oscilloscope",
    ],
    outcome: "Acquire real biosignals from the human body and understand their physiological significance.",
  },
  {
    day: 4,
    title: "Circuits Behind Healthcare",
    theme: "Engineering the Human Body",
    icon: Cpu,
    color: "yellow",
    emoji: "⚡",
    topics: [
      "Instrumentation Amplifier Theory & Wiring",
      "Circuit Connections for Biosignal Acquisition",
      "Sensor Interfacing Techniques",
      "Arduino & ESP32 Programming",
      "Serial Plotter for Real-time Visualization",
      "MATLAB Signal Visualization",
      "Python for Biomedical Data",
    ],
    handson: [
      "Wire an instrumentation amplifier circuit",
      "Connect biosensors to Arduino/ESP32",
      "Visualize signals in MATLAB and Python",
      "Build a complete biomedical signal acquisition system",
    ],
    outcome: "Build a functional biomedical circuit from scratch and visualize biological signals on a computer screen.",
  },
  {
    day: 5,
    title: "Innovation Challenge",
    theme: "Future Healthcare Innovator",
    icon: Trophy,
    color: "emerald",
    emoji: "🚀",
    topics: [
      "Healthcare Innovation Frameworks",
      "Medical Device Design Process",
      "Startup Ideas in HealthTech",
      "Career Pathways in Biomedical Engineering",
      "University Admissions & Scholarship Guidance",
      "Closing Ceremony",
    ],
    handson: [
      "Mini Project presentation",
      "Innovation Challenge competition",
      "Healthcare startup pitch",
      "Campus tour",
      "Certificate distribution",
    ],
    outcome: "Present a biomedical innovation idea, receive your certificate, and leave with a clear vision of your future in biomedical engineering.",
  },
];

const colorConfig: Record<string, { bg: string; border: string; text: string; button: string; tag: string }> = {
  sky: {
    bg: "from-sky-500/20 to-sky-900/5",
    border: "border-sky-500/30",
    text: "text-sky-400",
    button: "bg-sky-500",
    tag: "bg-sky-500/20 text-sky-300",
  },
  teal: {
    bg: "from-teal-500/20 to-teal-900/5",
    border: "border-teal-500/30",
    text: "text-teal-400",
    button: "bg-teal-500",
    tag: "bg-teal-500/20 text-teal-300",
  },
  rose: {
    bg: "from-rose-500/20 to-rose-900/5",
    border: "border-rose-500/30",
    text: "text-rose-400",
    button: "bg-rose-500",
    tag: "bg-rose-500/20 text-rose-300",
  },
  yellow: {
    bg: "from-yellow-500/20 to-yellow-900/5",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    button: "bg-yellow-500",
    tag: "bg-yellow-500/20 text-yellow-300",
  },
  emerald: {
    bg: "from-emerald-500/20 to-emerald-900/5",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    button: "bg-emerald-500",
    tag: "bg-emerald-500/20 text-emerald-300",
  },
};

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const current = days[activeDay];
  const colors = colorConfig[current.color];
  const Icon = current.icon;

  return (
    <section id="schedule" className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="5-Day Schedule"
          title="Your Workshop Journey"
          highlight="Journey"
          subtitle="Every day is a new discovery. Each session builds on the last — taking you from biological fundamentals to engineering and AI in just five immersive days."
        />

        {/* Day selector */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-8">
          {days.map((d, i) => {
            const isActive = i === activeDay;
            const c = colorConfig[d.color];
            return (
              <motion.button
                key={d.day}
                onClick={() => setActiveDay(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                  isActive
                    ? `${c.button} text-white border-transparent shadow-lg`
                    : `glass ${c.text} border-white/10 hover:border-white/20`
                }`}
              >
                <span className="font-bold text-sm">Day {d.day}</span>
                <span className="text-lg">{d.emoji}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Day content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`glass rounded-3xl border bg-gradient-to-br ${colors.bg} ${colors.border} overflow-hidden`}
          >
            {/* Header */}
            <div className="p-4 sm:p-8 border-b border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${colorConfig[current.color].button} flex items-center justify-center shadow-xl shrink-0`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${colors.text} uppercase tracking-widest mb-1`}>
                    Day {current.day} · Theme: {current.theme}
                  </div>
                  <h3 className="text-white font-black text-xl sm:text-3xl font-display">{current.title}</h3>
                </div>
                <div className="sm:ml-auto text-6xl">{current.emoji}</div>
              </div>
            </div>

            {/* Content grid */}
            <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Topics */}
              <div>
                <h4 className={`font-semibold ${colors.text} text-sm uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  <BookOpen className="w-4 h-4" /> Topics Covered
                </h4>
                <ul className="space-y-3">
                  {current.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${colorConfig[current.color].button} mt-1.5 shrink-0`} />
                      <span className="text-slate-300 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hands-on */}
              <div>
                <h4 className={`font-semibold ${colors.text} text-sm uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  <FlaskConical className="w-4 h-4" /> Hands-on Activities
                </h4>
                <ul className="space-y-3">
                  {current.handson.map((activity) => (
                    <li key={activity} className="glass rounded-xl px-4 py-3 text-slate-300 text-sm">
                      🔬 {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome */}
              <div>
                <h4 className={`font-semibold ${colors.text} text-sm uppercase tracking-wider mb-4 flex items-center gap-2`}>
                  <Calendar className="w-4 h-4" /> Learning Outcome
                </h4>
                <div className={`glass rounded-2xl p-5 bg-gradient-to-br ${colors.bg} ${colors.border} border`}>
                  <p className="text-slate-200 text-sm leading-relaxed">{current.outcome}</p>
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
                    disabled={activeDay === 0}
                    className="flex-1 py-3 glass rounded-xl text-slate-400 hover:text-white disabled:opacity-30 transition-all text-sm"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveDay(Math.min(days.length - 1, activeDay + 1))}
                    disabled={activeDay === days.length - 1}
                    className="flex-1 py-3 glass rounded-xl text-slate-400 hover:text-white disabled:opacity-30 transition-all text-sm"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
