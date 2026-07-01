"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Trophy } from "lucide-react";

const placementImages = [
  "729823181_18102208124140419_5033004721483409226_n.jfif",
  "730015493_18102208106140419_5965525478451731076_n.jfif",
  "731697936_18102208097140419_4157628925093103608_n.jfif",
  "731761154_18102208070140419_2169230527616727592_n.jfif",
  "731761321_18102208088140419_8342245587048521257_n.jfif",
  "731787316_18102208133140419_6244372971705090766_n.jfif",
  "731808193_18102208052140419_3102096413186409815_n.jfif",
  "733868650_18102208061140419_5565743876560827812_n.jfif",
  "734644763_18102208079140419_8598058506609778857_n.jfif",
  "735658284_18102208142140419_5297628325027031492_n.jfif",
];

export function PlacedStudents() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-teal-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Our Students"
          title="From Our Labs to the World"
          highlight="World"
          subtitle="These are real students from the School of Biomedical Engineering & Health Sciences — securing PhD positions, research fellowships, and placements at institutions worldwide. This could be you."
        />

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 mb-14">
          {[
            { emoji: "🎓", stat: "PhD Positions", sub: "International Universities" },
            { emoji: "🌐", stat: "Global Placements", sub: "Across 10+ countries" },
            { emoji: "🏥", stat: "Healthcare Careers", sub: "Hospitals & Research Labs" },
            { emoji: "🏆", stat: "Fellowships", sub: "Funded Research Programs" },
          ].map(({ emoji, stat, sub }) => (
            <div key={stat} className="flex items-center gap-3 glass rounded-xl px-5 py-3 border border-yellow-500/15">
              <span className="text-2xl">{emoji}</span>
              <div>
                <div className="text-white font-semibold text-sm">{stat}</div>
                <div className="text-slate-500 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Image grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4"
        >
          {placementImages.map((filename, i) => (
            <motion.div
              key={filename}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/40 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 hover:shadow-xl"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${filename}`}
                alt={`Placed student from School of Biomedical Engineering`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white text-xs font-medium">Biomedical Engineering</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom motivational quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-6 md:p-8 border border-yellow-500/15 text-center"
        >
          <div className="text-4xl mb-4">🌟</div>
          <p className="text-slate-300 text-base md:text-lg font-light italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;Every name in these announcements was once a Class XII student wondering if biomedical engineering was the right path. Five days in our lab changed everything for them — and it can for you too.&rdquo;
          </p>
          <div className="mt-4 text-yellow-400 font-medium text-sm">
            — School of Biomedical Engineering & Health Sciences, Shobhit University
          </div>
        </motion.div>
      </div>
    </section>
  );
}
