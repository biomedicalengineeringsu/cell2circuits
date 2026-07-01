"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, Play } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

type GalleryItem = {
  id: number;
  emoji: string;
  label: string;
  color: string;
  size: "large" | "medium" | "small";
  youtubeId?: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1,  emoji: "🔬", label: "Microscopy Session",    color: "from-sky-500/20 to-sky-900/5",     size: "large"  },
  { id: 2,  emoji: "❤️", label: "ECG Recording",         color: "from-rose-500/20 to-rose-900/5",   size: "small"  },
  { id: 3,  emoji: "🧫", label: "Cell Culture Lab",      color: "from-teal-500/20 to-teal-900/5",   size: "small"  },
  { id: 4,  emoji: "⚡", label: "Circuit Wiring",         color: "from-yellow-500/20 to-yellow-900/5", size: "medium" },
  { id: 5,  emoji: "🩸", label: "Blood Grouping",        color: "from-red-500/20 to-red-900/5",     size: "medium" },
  { id: 6,  emoji: "💻", label: "MATLAB Analysis",       color: "from-purple-500/20 to-purple-900/5", size: "small"  },
  { id: 7,  emoji: "🤖", label: "AI Healthcare Demo",    color: "from-violet-500/20 to-violet-900/5", size: "large", youtubeId: "eBX3KZVMhu4" },
  { id: 8,  emoji: "🏆", label: "Certificate Day",       color: "from-emerald-500/20 to-emerald-900/5", size: "small"  },
  { id: 9,  emoji: "🔌", label: "Arduino Programming",   color: "from-orange-500/20 to-orange-900/5", size: "medium" },
  { id: 10, emoji: "🎓", label: "Innovation Challenge",  color: "from-cyan-500/20 to-cyan-900/5",   size: "medium" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Gallery"
          title="Moments from the Lab"
          highlight="Lab"
          subtitle="A glimpse into the hands-on world of our biomedical engineering workshop. Real students, real experiments, real discoveries."
        />

        {/* Gallery notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-8 mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-slate-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Workshop photos will be added here after the event. Preview below shows activity themes.
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="break-inside-avoid"
            >
              <div
                className={`relative group cursor-pointer glass rounded-2xl border bg-gradient-to-br ${item.color} overflow-hidden transition-all duration-300 ${
                  item.youtubeId
                    ? "border-violet-500/40 hover:border-violet-400/70 hover:shadow-lg hover:shadow-violet-500/20"
                    : "border-white/5 hover:border-sky-500/30"
                }`}
                style={{ height: item.size === "large" ? "clamp(140px,22vw,280px)" : item.size === "medium" ? "clamp(110px,16vw,200px)" : "clamp(90px,12vw,160px)" }}
                onClick={() => setLightbox(item)}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                  <span className="text-slate-300 text-sm font-medium px-4 text-center">{item.label}</span>
                  {item.youtubeId && (
                    <span className="mt-2 flex items-center gap-1 text-xs text-violet-300 font-medium">
                      <Play className="w-3 h-3 fill-current" /> Watch Video
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${
                  item.youtubeId ? "bg-violet-500/15" : "bg-sky-500/10"
                }`}>
                  <div className="glass rounded-full p-3">
                    {item.youtubeId
                      ? <Play className="w-6 h-6 text-white fill-white" />
                      : <ZoomIn className="w-5 h-5 text-white" />
                    }
                  </div>
                </div>

                {/* Badge */}
                <div className={`absolute top-3 right-3 text-xs glass px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                  item.youtubeId ? "text-violet-300" : "text-slate-500"
                }`}>
                  {item.youtubeId ? "▶ Shorts" : "Photo"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${lightbox.color} text-center relative overflow-hidden ${
              lightbox.youtubeId ? "w-full max-w-2xl" : "glass p-16 max-w-lg w-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 glass rounded-full p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {lightbox.youtubeId ? (
              /* YouTube embed */
              <div className="relative w-full" style={{ paddingBottom: "177.78%" /* 9:16 for Shorts */ }}>
                <iframe
                  src={`https://www.youtube.com/embed/${lightbox.youtubeId}?autoplay=1&rel=0`}
                  title={lightbox.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-3xl"
                />
              </div>
            ) : (
              /* Placeholder */
              <>
                <span className="text-8xl mb-6 block">{lightbox.emoji}</span>
                <h3 className="text-white text-2xl font-bold mb-3">{lightbox.label}</h3>
                <p className="text-slate-400 text-sm">Workshop photo coming soon after the event.</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
