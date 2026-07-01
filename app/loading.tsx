"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-section-1 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-sky-500/20 border-t-sky-500 rounded-full mx-auto mb-6"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sky-400 font-medium tracking-widest text-sm uppercase"
        >
          Loading Experience...
        </motion.p>
      </div>
    </div>
  );
}
