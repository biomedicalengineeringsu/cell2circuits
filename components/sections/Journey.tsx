"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ChevronDown } from "lucide-react";

const journeySteps = [
  {
    emoji: "🧫",
    step: "01",
    title: "Cells",
    subtitle: "The Building Blocks of Life",
    description:
      "Everything in the human body begins with a single cell. Over 37 trillion cells — each with its own electrical potential, membrane dynamics, and biochemical machinery — form the foundation of biological life and biomedical engineering.",
    color: "sky",
    facts: ["37 trillion cells in the human body", "Cell potential: -70mV", "First studied in 1665 by Robert Hooke"],
  },
  {
    emoji: "🩸",
    step: "02",
    title: "Blood",
    subtitle: "The River of Life",
    description:
      "Blood is a living tissue — a complex fluid carrying oxygen, nutrients, hormones, and immune cells. In this workshop, you'll actually type blood, stain it, and examine it under a microscope. Biology becomes tangible.",
    color: "red",
    facts: ["4 blood types (A, B, AB, O)", "5 litres in an adult", "Contains 250 billion red blood cells"],
  },
  {
    emoji: "🔬",
    step: "03",
    title: "Microscopy",
    subtitle: "Seeing the Invisible World",
    description:
      "The microscope changed medicine forever. From Leeuwenhoek's first glimpse of bacteria to modern electron microscopy revealing viral structures — the ability to see small unlocked all of modern biology and medicine.",
    color: "teal",
    facts: ["Resolution: 0.2 micrometers", "RBCs are 6-8 μm diameter", "Invented in 1590"],
  },
  {
    emoji: "🧬",
    step: "04",
    title: "Cell Culture",
    subtitle: "Growing Life in the Lab",
    description:
      "Cell culture technology allows us to grow living cells outside the human body — in controlled laboratory environments. This enables drug testing, vaccine production, cancer research, and the emerging field of tissue engineering.",
    color: "purple",
    facts: ["HeLa cells: first immortal cell line", "Used in COVID-19 vaccine development", "Enables 3D bioprinting"],
  },
  {
    emoji: "❤️",
    step: "05",
    title: "Biosignals",
    subtitle: "The Language of the Body",
    description:
      "Every muscle contraction, every heartbeat, every neural impulse generates an electrical signal. ECG, EMG, EEG — these are the body's native communication protocols, readable by biomedical engineers.",
    color: "rose",
    facts: ["ECG: 0.1-5 mV amplitude", "EMG: 50μV to 30mV", "EEG: 10-100 μV"],
  },
  {
    emoji: "⚡",
    step: "06",
    title: "Electronics",
    subtitle: "Amplifying Life's Signals",
    description:
      "Biosignals are tiny and noisy. Electronic circuits — amplifiers, filters, and analog-to-digital converters — transform these faint biological whispers into clear, measurable data streams.",
    color: "yellow",
    facts: ["Instrumentation amplifier: key component", "CMRR > 100 dB for biosignals", "Sampling rate: 1000 Hz (ECG)"],
  },
  {
    emoji: "🔌",
    step: "07",
    title: "Circuits",
    subtitle: "Engineering the Interface",
    description:
      "You'll wire actual biomedical circuits — connecting sensors to amplifiers to microcontrollers. The circuit board is where biology meets engineering, where the human body connects to the digital world.",
    color: "green",
    facts: ["Arduino: 14 digital I/O pins", "ESP32: built-in WiFi & Bluetooth", "Sampling 16-bit resolution"],
  },
  {
    emoji: "🤖",
    step: "08",
    title: "Artificial Intelligence",
    subtitle: "Machines That Think About Health",
    description:
      "Machine learning models can diagnose pneumonia from chest X-rays with 94% accuracy. AI can predict sepsis 6 hours before symptoms appear. This is the frontier of modern healthcare technology.",
    color: "violet",
    facts: ["CNNs for medical imaging", "RNNs for signal analysis", "Python: the language of health AI"],
  },
  {
    emoji: "🏥",
    step: "09",
    title: "Smart Health Systems",
    subtitle: "The Future of Medicine",
    description:
      "Smart health systems integrate wearables, IoT, AI, and cloud computing to create intelligent healthcare ecosystems. Real-time monitoring, predictive analytics, and automated interventions — this is healthcare 4.0.",
    color: "cyan",
    facts: ["IoMT market: $860B by 2030", "5G enables real-time remote surgery", "Digital twins of human organs"],
  },
  {
    emoji: "🚀",
    step: "10",
    title: "Future Innovator",
    subtitle: "That Future is You",
    description:
      "At the end of this journey, you won't just understand biomedical engineering — you'll have done it. You'll have held a pipette, recorded a heartbeat, wired a circuit, and written code that visualizes biosignals. Your journey begins here.",
    color: "emerald",
    facts: ["Certificate from Shobhit University", "Hands-on portfolio project", "Mentorship & career guidance"],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  sky: { bg: "from-sky-500/20 to-sky-900/5", border: "border-sky-500/30", text: "text-sky-400", dot: "bg-sky-500" },
  red: { bg: "from-red-500/20 to-red-900/5", border: "border-red-500/30", text: "text-red-400", dot: "bg-red-500" },
  teal: { bg: "from-teal-500/20 to-teal-900/5", border: "border-teal-500/30", text: "text-teal-400", dot: "bg-teal-500" },
  purple: { bg: "from-purple-500/20 to-purple-900/5", border: "border-purple-500/30", text: "text-purple-400", dot: "bg-purple-500" },
  rose: { bg: "from-rose-500/20 to-rose-900/5", border: "border-rose-500/30", text: "text-rose-400", dot: "bg-rose-500" },
  yellow: { bg: "from-yellow-500/20 to-yellow-900/5", border: "border-yellow-500/30", text: "text-yellow-400", dot: "bg-yellow-500" },
  green: { bg: "from-green-500/20 to-green-900/5", border: "border-green-500/30", text: "text-green-400", dot: "bg-green-500" },
  violet: { bg: "from-violet-500/20 to-violet-900/5", border: "border-violet-500/30", text: "text-violet-400", dot: "bg-violet-500" },
  cyan: { bg: "from-cyan-500/20 to-cyan-900/5", border: "border-cyan-500/30", text: "text-cyan-400", dot: "bg-cyan-500" },
  emerald: { bg: "from-emerald-500/20 to-emerald-900/5", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-500" },
};

function JourneyCard({ step, index }: { step: typeof journeySteps[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const colors = colorMap[step.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      {/* Connector line (not for last) */}
      {index < journeySteps.length - 1 && (
        <div className="absolute left-1/2 -bottom-4 w-px h-8 bg-gradient-to-b from-sky-500/30 to-transparent" />
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left glass rounded-2xl border bg-gradient-to-br ${colors.bg} ${colors.border} p-6 hover:shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center gap-4">
          {/* Step number */}
          <div className={`w-10 h-10 rounded-full ${colors.dot} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg`}>
            {step.step}
          </div>

          {/* Emoji & title */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl">{step.emoji}</span>
            <div>
              <h3 className={`font-bold text-lg ${colors.text}`}>{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.subtitle}</p>
            </div>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-slate-500 shrink-0"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Expanded content */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-5 mt-5 border-t border-white/10">
            <p className="text-slate-300 leading-relaxed mb-4">{step.description}</p>
            <div className="flex flex-wrap gap-2">
              {step.facts.map((fact) => (
                <span key={fact} className={`text-xs px-3 py-1 rounded-full bg-white/5 ${colors.text}`}>
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          badge="The Journey"
          title="From Cells to Circuits"
          highlight="Circuits"
          subtitle="Every step in this workshop tells a story — from the fundamental units of life to the cutting edge of healthcare technology. Click each stage to explore."
        />

        <div className="mt-16 space-y-4">
          {journeySteps.map((step, i) => (
            <JourneyCard key={step.step} step={step} index={i} />
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="glass rounded-2xl p-6 gradient-border">
            <p className="text-slate-300 text-lg">
              This is the complete journey you will experience in{" "}
              <span className="gradient-text font-bold">5 transformative days</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
