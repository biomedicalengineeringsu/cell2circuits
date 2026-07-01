"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Dna } from "lucide-react";
import { NAV_LINKS, PLACEHOLDERS } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark py-3 shadow-lg shadow-black/20"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all duration-300">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight font-display">
                Cells<span className="gradient-text">2</span>Circuits
              </div>
              <div className="text-sky-400/70 text-[10px] leading-tight">
                Smart Health Systems
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.filter(({ label }) => label !== "Register").map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  activeSection === href.replace("#", "")
                    ? "text-sky-400 bg-sky-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA Button + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href={PLACEHOLDERS.GOOGLE_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300"
            >
              Register Now
            </motion.a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-adaptive-heading p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 glass-dark flex flex-col pt-24 px-6 pb-8 overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="text-left px-4 py-3 text-adaptive-heading hover:text-sky-500 hover:bg-sky-500/10 rounded-xl transition-all duration-200 text-lg font-medium"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-white/10">
              <a
                href={PLACEHOLDERS.GOOGLE_FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-full text-lg"
              >
                Register Now →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
