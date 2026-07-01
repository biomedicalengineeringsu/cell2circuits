"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, Bell, Share2 } from "lucide-react";
import { PLACEHOLDERS } from "@/lib/constants";

const benefits = [
  { icon: Bell, text: "Real-time workshop updates and announcements" },
  { icon: Users, text: "Connect with fellow participants before the event" },
  { icon: Share2, text: "Exclusive preparation resources and study materials" },
  { icon: MessageCircle, text: "Direct Q&A with faculty and coordinators" },
];

export function WhatsAppCTA() {
  return (
    <section className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent pointer-events-none" style={{ backgroundPosition: "50% 50%", backgroundSize: "60% 60%" }} />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-10 md:p-14 text-center gradient-border relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-3xl" />

          {/* WhatsApp icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 items-center justify-center shadow-2xl shadow-green-500/30 mb-8"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-display">
            Join Our WhatsApp<br />
            <span className="text-green-400">Community</span>
          </h2>

          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Be the first to know about workshop dates, preparation tips, and connect with other aspiring biomedical engineers from across India.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 glass rounded-xl p-4">
                <Icon className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* QR Placeholder */}
          <div className="glass rounded-2xl w-40 h-40 mx-auto mb-8 flex flex-col items-center justify-center border border-green-500/20">
            <div className="grid grid-cols-3 gap-1 p-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-sm ${[0, 2, 6, 8, 4].includes(i) ? "bg-green-400" : "bg-white/10"}`}
                />
              ))}
            </div>
            <p className="text-green-400/70 text-xs mt-2">Scan to Join</p>
          </div>

          <motion.a
            href={PLACEHOLDERS.WHATSAPP_COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34,197,94,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-bold rounded-full shadow-2xl shadow-green-500/30"
          >
            <MessageCircle className="w-6 h-6" />
            Join WhatsApp Community
          </motion.a>

          <p className="text-slate-500 text-sm mt-6">
            Free to join · No spam · Left after workshop if you prefer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
