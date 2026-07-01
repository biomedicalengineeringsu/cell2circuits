"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-section-1 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-medical-blue/10 via-transparent to-medical-teal/10" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 px-6"
      >
        <div className="text-[8rem] font-bold gradient-text leading-none mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          This signal seems to have gone flat. Let us guide you back to the lab.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
