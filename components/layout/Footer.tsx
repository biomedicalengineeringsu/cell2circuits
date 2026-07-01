"use client";

import { motion } from "framer-motion";
import { Dna, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { PLACEHOLDERS, WORKSHOP, SOCIAL_LINKS, PHONES, EMAILS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Quick Links": [
      { label: "Home", href: "#home" },
      { label: "About Workshop", href: "#welcome" },
      { label: "Schedule", href: "#schedule" },
      { label: "Laboratories", href: "#laboratories" },
      { label: "Gallery", href: "#gallery" },
    ],
    Programs: [
      { label: "B.Tech Biomedical", href: "#" },
      { label: "M.Tech Biomedical", href: "#" },
      { label: "Ph.D Programs", href: "#" },
      { label: "Research Labs", href: "#" },
      { label: "Publications", href: "#" },
    ],
    "Workshop Info": [
      { label: "Registration", href: "#registration" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
      { label: "Downloads", href: "#downloads" },
      { label: "WhatsApp Group", href: PLACEHOLDERS.WHATSAPP_COMMUNITY_LINK },
    ],
  };

  return (
    <footer className="relative bg-section-footer border-t border-black/10 dark:border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-teal-500/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-sky-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-xl font-display">
                  Cells<span className="gradient-text">2</span>Circuits
                </div>
                <div className="text-sky-400/70 text-xs">Smart Health Systems Workshop</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              A 5-Day immersive biomedical engineering experience that bridges the world of biology and technology â€” from living cells to intelligent circuits.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-sky-400 shrink-0" />
                <span>{WORKSHOP.organizer}, {WORKSHOP.university} {WORKSHOP.designation}, {WORKSHOP.location}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {EMAILS.map(({ label, address }) => (
                    <a
                      key={address}
                      href={`mailto:${address}`}
                      className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-xs transition-colors"
                    >
                      <span className="text-[9px] font-bold text-sky-600 dark:text-sky-500 uppercase tracking-wide min-w-[4.5rem] shrink-0">{label}</span>
                      {address}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {PHONES.map(({ label, number }) => (
                    <a
                      key={number}
                      href={`tel:${number.replace(/\D/g, "")}`}
                      className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-xs transition-colors"
                    >
                      <span className="text-[9px] font-bold text-sky-600 dark:text-sky-500 uppercase tracking-wide w-10 shrink-0">{label === "University" ? "Univ" : "Coord"}</span>
                      {number}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: FaLinkedin,  href: SOCIAL_LINKS.LINKEDIN,  label: "LinkedIn" },
                { Icon: FaInstagram, href: SOCIAL_LINKS.INSTAGRAM, label: "Instagram" },
                { Icon: FaYoutube,   href: SOCIAL_LINKS.YOUTUBE,   label: "YouTube" },
                { Icon: FaFacebook,  href: SOCIAL_LINKS.FACEBOOK,  label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-slate-400 hover:text-sky-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Register CTA */}
        <div className="glass rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ready to Begin Your Journey?</h3>
            <p className="text-slate-400 text-sm">Limited seats available. Register before they fill up.</p>
          </div>
          <motion.a
            href={PLACEHOLDERS.GOOGLE_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-full whitespace-nowrap shadow-lg shadow-sky-500/30"
          >
            Register Now <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 space-y-3">
          {/* Quick contact strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {EMAILS.map(({ address }) => (
              <a
                key={address}
                href={`mailto:${address}`}
                className="flex items-center gap-1.5 text-slate-500 hover:text-sky-400 text-xs transition-colors"
              >
                <Mail className="w-3 h-3 shrink-0" />
                {address}
              </a>
            ))}
            {PHONES.map(({ label, number }) => (
              <a
                key={number}
                href={`tel:${number.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 text-slate-500 hover:text-sky-400 text-xs transition-colors"
              >
                <Phone className="w-3 h-3 shrink-0" />
                <span className="text-[9px] font-bold text-sky-700 dark:text-sky-600 uppercase tracking-wide">
                  {label === "University" ? "Univ" : "Coord"}
                </span>
                {number}
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-600 text-xs text-center sm:text-left">
              Â© {currentYear} {WORKSHOP.organizer}, {WORKSHOP.university}. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">
              Crafted with â¤ï¸ for future biomedical innovators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

