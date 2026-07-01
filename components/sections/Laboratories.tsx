"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Activity, Cpu, Brain, FlaskConical, Microscope, Wrench } from "lucide-react";

const labs = [
  {
    icon: Activity,
    title: "Biomedical Instrumentation Lab",
    emoji: "🫀",
    color: "from-sky-500/20 to-sky-900/5",
    border: "border-sky-500/20",
    iconBg: "bg-sky-500",
    equipment: ["ECG Machine", "EMG Acquisition System", "Patient Simulator", "Multi-parameter Monitor", "Oscilloscope"],
    applications: ["Cardiac monitoring", "Neuromuscular assessment", "Vital signs measurement", "Signal processing"],
    experience: "Record your own heartbeat and muscle signals on professional-grade biomedical equipment used in hospitals worldwide.",
  },
  {
    icon: Microscope,
    title: "Cell Culture Laboratory",
    emoji: "🧫",
    color: "from-teal-500/20 to-teal-900/5",
    border: "border-teal-500/20",
    iconBg: "bg-teal-500",
    equipment: ["CO₂ Incubator", "Laminar Flow Cabinet", "Inverted Microscope", "Centrifuge", "Haemocytometer"],
    applications: ["Cell line maintenance", "Tissue engineering research", "Drug testing", "Vaccine development"],
    experience: "Step inside a sterile laboratory where living animal cells are grown and maintained for cutting-edge biomedical research.",
  },
  {
    icon: Cpu,
    title: "Medical Electronics Lab",
    emoji: "⚡",
    color: "from-yellow-500/20 to-yellow-900/5",
    border: "border-yellow-500/20",
    iconBg: "bg-yellow-500",
    equipment: ["Soldering Stations", "Instrumentation Amplifiers", "Arduino & ESP32 Boards", "Function Generators", "Power Supplies"],
    applications: ["Biosensor interfacing", "Circuit prototyping", "Embedded health systems", "IoMT development"],
    experience: "Wire actual electronic circuits that capture and process biological signals — the same circuits found inside medical devices.",
  },
  {
    icon: FlaskConical,
    title: "Signal Processing Lab",
    emoji: "📊",
    color: "from-purple-500/20 to-purple-900/5",
    border: "border-purple-500/20",
    iconBg: "bg-purple-500",
    equipment: ["High-Performance Workstations", "MATLAB Licenses", "Python Environment", "EEGLAB", "Signal Analyzers"],
    applications: ["ECG analysis", "EMG pattern recognition", "Filter design", "Real-time visualization"],
    experience: "Process real biosignals using MATLAB and Python — visualize, filter, and analyze the same data that clinical engineers use.",
  },
  {
    icon: Brain,
    title: "AI & Healthcare Laboratory",
    emoji: "🤖",
    color: "from-rose-500/20 to-rose-900/5",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500",
    equipment: ["GPU Workstations", "Medical Imaging Datasets", "TensorFlow & PyTorch", "Cloud Computing Access", "Demo Models"],
    applications: ["Medical image classification", "Disease prediction", "NLP for clinical notes", "Wearable data analysis"],
    experience: "See live AI models classify medical images and predict health conditions — the technology revolutionizing diagnostics.",
  },
  {
    icon: Wrench,
    title: "Innovation Maker Space",
    emoji: "🔧",
    color: "from-emerald-500/20 to-emerald-900/5",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500",
    equipment: ["3D Printers", "Laser Cutters", "Rapid Prototyping Tools", "Design Workstations", "Component Library"],
    applications: ["Medical device prototyping", "Enclosure design", "Wearable device design", "Startup incubation"],
    experience: "Build a physical prototype of your healthcare innovation using industry-standard rapid prototyping tools.",
  },
];

export function Laboratories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="laboratories" className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="World-Class Facilities"
          title="State-of-the-Art Laboratories"
          highlight="Laboratories"
          subtitle="Our laboratories are equipped with professional-grade biomedical instruments, giving students hands-on experience with the same technology used in research hospitals and medical device companies."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {labs.map(({ icon: Icon, title, emoji, color, border, iconBg, equipment, applications, experience }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group glass rounded-2xl border bg-gradient-to-br ${color} ${border} overflow-hidden card-hover flex flex-col`}
            >
              {/* Image placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                <span className="text-6xl">{emoji}</span>
                <div className={`absolute top-4 right-4 w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-sky-300 transition-colors">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{experience}</p>

                <div className="mt-auto space-y-4">
                  {/* Equipment */}
                  <div>
                    <h4 className="text-slate-500 text-xs uppercase tracking-wider mb-2">Key Equipment</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {equipment.slice(0, 3).map((item) => (
                        <span key={item} className="text-xs glass px-2 py-1 rounded-full text-slate-300">
                          {item}
                        </span>
                      ))}
                      {equipment.length > 3 && (
                        <span className="text-xs glass px-2 py-1 rounded-full text-slate-500">
                          +{equipment.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="text-slate-500 text-xs uppercase tracking-wider mb-2">Applications</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {applications.slice(0, 2).map((app) => (
                        <span key={app} className="text-xs bg-white/5 px-2 py-1 rounded-full text-sky-400">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
