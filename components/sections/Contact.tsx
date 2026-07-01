"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PLACEHOLDERS, WORKSHOP, SOCIAL_LINKS, PHONES, EMAILS } from "@/lib/constants";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: `${WORKSHOP.organizer}, ${WORKSHOP.university} ${WORKSHOP.designation}, NH-58, Modipuram, ${WORKSHOP.location}`,
    href: PLACEHOLDERS.GOOGLE_MAPS_LINK,
    color: "emerald",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday – Saturday: 9:00 AM – 5:00 PM",
    href: null,
    color: "purple",
  },
];


const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  sky: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  teal: { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
};

export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-section-1">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-teal-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Contact"
          title="Get in Touch"
          highlight="Touch"
          subtitle="We're here to answer your questions and help you prepare for the workshop. Reach out through any channel — we typically respond within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Email */}
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => {
              const c = colorMap[color];
              const content = (
                <div className={`group glass rounded-2xl p-6 border ${c.border} hover:bg-white/3 transition-all flex items-start gap-4 card-hover`}>
                  <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</div>
                    <div className={`text-white font-medium text-sm leading-relaxed group-hover:${c.text} transition-colors`}>{value}</div>
                    {href && <div className={`${c.text} text-xs mt-1 flex items-center gap-1`}>Click to connect <ExternalLink className="w-3 h-3" /></div>}
                  </div>
                </div>
              );

              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}

            {/* Email — multi-address card */}
            <div className="glass rounded-2xl p-4 border border-sky-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-slate-500 text-xs uppercase tracking-wider">Email</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {EMAILS.map(({ label, address }) => (
                  <a
                    key={address}
                    href={`mailto:${address}`}
                    className="group/em flex items-center gap-1.5 rounded-lg px-2.5 py-2 hover:bg-sky-500/10 transition-all"
                  >
                    <span className="text-[9px] font-bold text-sky-500 bg-sky-500/10 px-1.5 py-0.5 rounded-full shrink-0 uppercase tracking-wide">
                      {label}
                    </span>
                    <span className="text-white text-xs font-medium group-hover/em:text-sky-400 transition-colors break-all">
                      {address}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Phone — compact multi-number card */}
            <div className="glass rounded-2xl p-4 border border-teal-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-teal-400" />
                </div>
                <span className="text-slate-500 text-xs uppercase tracking-wider">Phone</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {PHONES.map(({ label, number }) => (
                  <a
                    key={number}
                    href={`tel:${number.replace(/\D/g, "")}`}
                    className="group/num flex items-center gap-1.5 rounded-lg px-2.5 py-2 hover:bg-teal-500/10 transition-all"
                  >
                    <span className="text-[9px] font-bold text-teal-500 bg-teal-500/10 px-1.5 py-0.5 rounded-full shrink-0 uppercase tracking-wide">
                      {label === "University" ? "Univ" : "Coord"}
                    </span>
                    <span className="text-white text-xs font-medium group-hover/num:text-teal-400 transition-colors truncate">
                      {number}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { Icon: FaLinkedin,  href: SOCIAL_LINKS.LINKEDIN,  label: "LinkedIn",  color: "hover:text-blue-400"  },
                  { Icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM, label: "Instagram", color: "hover:text-pink-400"  },
                  { Icon: FaYoutube,   href: SOCIAL_LINKS.YOUTUBE,   label: "YouTube",   color: "hover:text-red-400"   },
                  { Icon: FaFacebook,  href: SOCIAL_LINKS.FACEBOOK,  label: "Facebook",  color: "hover:text-blue-500"  },
                ].map(({ Icon, href, label, color: c }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    className={`w-11 h-11 glass rounded-xl flex items-center justify-center text-slate-400 ${c} transition-colors`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl border border-white/5 overflow-hidden h-full flex flex-col">
              {/* Google Maps embed */}
              <div className="relative flex-1 min-h-[320px]">
                <iframe
                  src="https://maps.google.com/maps?q=Shobhit+University+NH-58+Modipuram+Meerut+Uttar+Pradesh&output=embed&z=15"
                  className="w-full h-full min-h-[320px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shobhit University Location"
                />
                {/* Overlay button */}
                <motion.a
                  href={PLACEHOLDERS.GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-sky-500/40 text-sm whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>

              {/* How to reach */}
              <div className="p-5 border-t border-white/5">
                <h4 className="text-white font-semibold mb-3 text-sm">How to Reach</h4>
                <div className="space-y-2">
                  {[
                    { emoji: "🚆", text: "Meerut Cantt. Railway Station — 8 km, 20 mins" },
                    { emoji: "🚌", text: "ISBT Meerut — 6 km, 15 mins" },
                    { emoji: "✈️", text: "Delhi IGI Airport — 75 km, 90 mins" },
                  ].map(({ emoji, text }) => (
                    <div key={text} className="flex items-center gap-3 text-slate-400 text-xs">
                      <span>{emoji}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                  {/* NamoBharat RRTS */}
                  <a
                    href="https://namobharat.ncrtc.in/web/dashboard/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sky-400 hover:text-sky-300 text-xs transition-colors group"
                  >
                    <span>🚄</span>
                    <span>
                      NamoBharat RRTS (Rapid Rail) — Delhi–Meerut corridor
                      <ExternalLink className="w-3 h-3 inline ml-1 opacity-60 group-hover:opacity-100" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
