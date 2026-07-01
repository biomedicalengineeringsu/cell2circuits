"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PLACEHOLDERS } from "@/lib/constants";

const faqs = [
  {
    question: "Who can attend this workshop?",
    answer:
      "The workshop is open to students currently studying in Class XI or XII with a Science stream (PCB, PCM, or PCMB). No prior engineering knowledge is required — just curiosity and enthusiasm to learn.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes! Every student who completes the 5-day workshop will receive a participation and achievement certificate issued by the School of Biomedical Engineering & Health Sciences, Shobhit Institute of Engineering & Technology (Deemed-to-be University). This is a recognized credential you can add to college applications.",
  },
  {
    question: "What should I bring to the workshop?",
    answer:
      "Bring your curiosity! Practically, you'll need: casual comfortable clothes (lab coat will be provided), a notebook and pen, your student ID, and any prescribed preparation materials from our Preparation Guide (available for download). No laptops required — workstations are provided.",
  },
  {
    question: "How do I register for the workshop?",
    answer: `Click the "Register Now" button anywhere on this page to access the Google Form. Fill in your details, submit, and you'll receive a confirmation email within 24 hours. Seats are limited, so register early. For assistance, email us at ${PLACEHOLDERS.EMAIL} or call ${PLACEHOLDERS.PHONE}.`,
  },
  {
    question: "Can parents visit the campus during the workshop?",
    answer:
      "Parents are welcome to drop off and pick up students at the designated entry points. During Day 5 (Innovation Challenge and Certificate Distribution), there will be an open session where parents can attend the closing ceremony. Specific timings will be shared via WhatsApp community closer to the event.",
  },
  {
    question: "Is accommodation available for outstation students?",
    answer:
      "Yes, Shobhit University has on-campus hostel facilities available for outstation students at an additional cost. Please mention your accommodation requirement in the registration form and we will share details about availability and pricing.",
  },
  {
    question: "What is the eligibility criteria for the Innovation Challenge on Day 5?",
    answer:
      "All registered participants automatically qualify for the Innovation Challenge. You'll be divided into teams on Day 4, given a healthcare problem statement, and asked to propose a creative biomedical engineering solution. It's collaborative, not competitive in the traditional sense — the goal is learning and ideation.",
  },
  {
    question: "Will this help me with medical or engineering college admissions?",
    answer:
      "Absolutely. A Shobhit University-certified hands-on biomedical engineering workshop is a strong addition to your college applications. It demonstrates initiative, scientific curiosity, and practical experience — qualities that top universities look for. Faculty will also provide guidance on NEET, JEE, and direct admission pathways in biomedical engineering.",
  },
  {
    question: "What if I've never touched a circuit board before?",
    answer:
      "Perfect — this workshop was designed for you! Everything is taught from the ground up. By the end of Day 4, students who had never held a soldering iron will have built a working biomedical circuit. Our faculty and lab instructors ensure every student is guided step-by-step.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen ? "border-sky-500/30 bg-sky-500/5" : "border-white/5 hover:border-white/10"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between gap-4 p-6"
      >
        <span className={`font-semibold text-base transition-colors ${isOpen ? "text-sky-300" : "text-white"}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 transition-colors ${isOpen ? "text-sky-400" : "text-slate-500"}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-section-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          highlight="Questions"
          subtitle="Everything you need to know about the workshop, registration, and what to expect. Still have questions? Contact us directly."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-10 glass rounded-2xl p-6 text-center"
        >
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${PLACEHOLDERS.EMAIL}`}
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sky-400 hover:text-white hover:border-sky-500/30 transition-all text-sm"
            >
              ✉️ Email Us
            </a>
            <a
              href={`tel:${PLACEHOLDERS.PHONE}`}
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sky-400 hover:text-white hover:border-sky-500/30 transition-all text-sm"
            >
              📞 Call Us
            </a>
            <a
              href={PLACEHOLDERS.WHATSAPP_COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-full text-green-400 hover:text-white hover:border-green-500/30 transition-all text-sm"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
