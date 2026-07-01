"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-section-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-6"
      >
        <div className="text-6xl mb-6">⚡</div>
        <h2 className="text-2xl font-bold text-white mb-4">Signal Interrupted</h2>
        <p className="text-slate-400 mb-8">
          Something went wrong. Our engineers are on it.
        </p>
        <button
          onClick={reset}
          className="px-8 py-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
