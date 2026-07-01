"use client";

import { motion } from "framer-motion";
import { Download, FileText, MapPin, BookOpen, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PLACEHOLDERS } from "@/lib/constants";

const downloads = [
  {
    icon: FileText,
    title: "Workshop Brochure",
    description: "Complete overview of the workshop — activities, faculty, facilities, and registration details. Share with your family and school.",
    format: "PDF · ~2 MB",
    href: PLACEHOLDERS.BROCHURE_LINK,
    color: "sky",
    emoji: "📄",
  },
  {
    icon: Calendar,
    title: "Detailed Schedule",
    description: "Hour-by-hour schedule for all 5 days with laboratory sessions, activity timings, and important information.",
    format: "PDF · ~500 KB",
    href: PLACEHOLDERS.SCHEDULE_LINK,
    color: "teal",
    emoji: "📅",
  },
  {
    icon: BookOpen,
    title: "Preparation Guide",
    description: "What to read, watch, and prepare before Day 1. Basic biology and electronics concepts that will make your experience richer.",
    format: "PDF · ~1 MB",
    href: PLACEHOLDERS.PREP_GUIDE_LINK,
    color: "purple",
    emoji: "📚",
  },
  {
    icon: MapPin,
    title: "Campus Map",
    description: "Detailed map of Shobhit University campus with lab locations, cafeteria, accommodation, and transport information.",
    format: "PDF · ~3 MB",
    href: PLACEHOLDERS.CAMPUS_MAP_LINK,
    color: "emerald",
    emoji: "🗺️",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; button: string }> = {
  sky: { text: "text-sky-400", bg: "from-sky-500/15", border: "border-sky-500/20", button: "bg-sky-500 hover:bg-sky-400" },
  teal: { text: "text-teal-400", bg: "from-teal-500/15", border: "border-teal-500/20", button: "bg-teal-500 hover:bg-teal-400" },
  purple: { text: "text-purple-400", bg: "from-purple-500/15", border: "border-purple-500/20", button: "bg-purple-500 hover:bg-purple-400" },
  emerald: { text: "text-emerald-400", bg: "from-emerald-500/15", border: "border-emerald-500/20", button: "bg-emerald-500 hover:bg-emerald-400" },
};

export function Downloads() {
  return (
    <section id="downloads" className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          badge="Downloads"
          title="Resources & Documents"
          highlight="Documents"
          subtitle="Everything you need to prepare for the workshop, share with your family, and navigate the campus."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
          {downloads.map(({ title, description, format, href, color, emoji }, i) => {
            const c = colorMap[color];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group glass rounded-2xl p-6 border bg-gradient-to-br ${c.bg} to-transparent ${c.border} card-hover`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-white text-lg mb-2 group-hover:${c.text} transition-colors`}>
                      {title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
                    <div className="flex items-center justify-between gap-4">
                      <span className={`text-xs ${c.text} font-mono`}>{format}</span>
                      <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 ${c.button} text-white text-sm font-semibold rounded-full transition-all`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
