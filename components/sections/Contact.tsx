"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PLACEHOLDERS, WORKSHOP, SOCIAL_LINKS, PHONES } from "@/lib/constants";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: PLACEHOLDERS.EMAIL,
    href: `mailto:${PLACEHOLDERS.EMAIL}`,
    color: "sky",
  },
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

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl border border-white/5 overflow-hidden h-full min-h-[400px] flex flex-col">
              {/* Map embed placeholder */}
              <div className="flex-1 bg-gradient-to-br from-sky-500/10 to-teal-500/10 flex flex-col items-center justify-center p-8 relative">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }} />
                <div className="relative text-center">
                  <div className="text-6xl mb-4">📍</div>
                  <h3 className="text-white font-bold text-xl mb-2">Shobhit University</h3>
                  <p className="text-slate-400 text-sm mb-1">NH-58, Modipuram Bypass</p>
                  <p className="text-slate-400 text-sm mb-6">Meerut, Uttar Pradesh 250110</p>
                  <motion.a
                    href={PLACEHOLDERS.GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-sky-500/30"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Maps
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              {/* How to reach */}
              <div className="p-6 border-t border-white/5">
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
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
