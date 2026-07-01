"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { PLACEHOLDERS } from "@/lib/constants";

const benefits = [
  "5 days of immersive biomedical engineering",
  "Hands-on laboratory experience",
  "Expert faculty mentorship",
  "Refreshments & guide materials included",
  "University-issued certificate",
  "Campus tour & networking",
];

export function Registration() {
  return (
    <section id="registration" className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-sky-500/10 via-transparent to-transparent pointer-events-none" style={{ backgroundPosition: "50% 50%", backgroundSize: "50% 60%" }} />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          badge="Registration"
          title="Secure Your Spot"
          highlight="Spot"
          subtitle="Seats are limited to ensure every student gets a personal laboratory experience. Register early to avoid disappointment."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 gradient-border flex flex-col"
          >
            <div className="text-5xl mb-6">🎓</div>
            <h3 className="text-white font-bold text-2xl mb-2 font-display">What&apos;s Included</h3>
            <p className="text-slate-400 text-sm mb-8">
              Everything you need for 5 days of world-class biomedical engineering education.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300 text-sm">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto glass rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-emerald-300 text-sm font-medium text-center">
                🏆 Certificate issued by<br />
                <span className="text-white font-bold">Shobhit Institute of Engineering & Technology</span><br />
                (Deemed-to-be University)
              </p>
            </div>
          </motion.div>

          {/* Registration CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 gradient-border flex flex-col items-center justify-center text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Registration Open
            </div>

            <div className="text-6xl mb-6">📋</div>

            <h3 className="text-white font-bold text-2xl mb-3 font-display">Ready to Join?</h3>
            <p className="text-slate-400 text-sm mb-10 max-w-xs">
              Click below to open the registration form. Fill in your details and you&apos;re in — seats are limited, so register early.
            </p>

            <motion.a
              href={PLACEHOLDERS.GOOGLE_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(14,165,233,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-sky-500/30 mb-4"
            >
              Open Registration Form <ExternalLink className="w-5 h-5" />
            </motion.a>

            <p className="text-slate-500 text-xs">
              Hosted on Google Forms · Secure &amp; Private
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
