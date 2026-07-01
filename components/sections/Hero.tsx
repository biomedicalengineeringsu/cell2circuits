"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ExternalLink, MessageCircle, Download } from "lucide-react";
import { PLACEHOLDERS, WORKSHOP } from "@/lib/constants";

/* ─────────────────────────────────────────────────────────
   DNA 3D HELIX  (left side, full-height)
───────────────────────────────────────────────────────── */
function DNAHelix3D() {
  const COUNT = 24;
  const strands = Array.from({ length: COUNT }).map((_, i) => {
    const t = i / (COUNT - 1);
    const y = 4 + t * 92;
    const phase = t * Math.PI * 5.5;
    const x1 = 50 + Math.sin(phase) * 36;
    const x2 = 50 - Math.sin(phase) * 36;
    const d1 = (Math.sin(phase) + 1) / 2;
    const d2 = 1 - d1;
    return { y, x1, x2, d1, d2, i };
  });

  const pts1 = strands.map(s => `${s.x1},${s.y}`).join(" ");
  const pts2 = strands.map(s => `${s.x2},${s.y}`).join(" ");

  return (
    <div className="absolute left-0 top-0 h-full pointer-events-none"
      style={{ width: "clamp(100px,14vw,200px)", opacity: 0.78 }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="dna-glow">
            <feGaussianBlur stdDeviation="1.8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="rung" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>

        {/* Strand curves */}
        <polyline points={pts1} fill="none" stroke="rgba(45,212,191,0.22)" strokeWidth="0.6" />
        <polyline points={pts2} fill="none" stroke="rgba(96,165,250,0.22)" strokeWidth="0.6" />

        {/* Rungs + nodes (back first, then front) */}
        {strands.map(s => (
          <g key={s.i}>
            <motion.line x1={s.x1} y1={s.y} x2={s.x2} y2={s.y}
              stroke="url(#rung)"
              strokeWidth={0.3 + s.d1 * 0.9}
              opacity={0.2 + s.d1 * 0.4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 + s.d1 * 0.4 }}
              transition={{ delay: s.i * 0.055 }}
            />
            {/* back node */}
            <motion.circle cx={s.x2} cy={s.y} r={1.5 + s.d2 * 2.2}
              fill="#60a5fa" opacity={0.25 + s.d2 * 0.55}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: s.i * 0.055 + 0.03 }}
              filter={s.d2 > 0.75 ? "url(#dna-glow)" : undefined}
            />
            {/* front node */}
            <motion.circle cx={s.x1} cy={s.y} r={1.5 + s.d1 * 2.2}
              fill="#2dd4bf" opacity={0.25 + s.d1 * 0.55}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: s.i * 0.055 }}
              filter={s.d1 > 0.75 ? "url(#dna-glow)" : undefined}
            />
          </g>
        ))}

        {/* Travelling pulse */}
        <motion.circle cx="50" cy="4" r="3.5" fill="white" opacity="0.9"
          filter="url(#dna-glow)"
          animate={{ cy: [4, 96] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.8, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   BEATING HEART  (center-right background)
───────────────────────────────────────────────────────── */
function BeatingHeart() {
  return (
    <div className="absolute pointer-events-none"
      style={{
        right: "clamp(20px,10vw,140px)",
        top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(160px,18vw,260px)",
        opacity: 0.60,
      }}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="hrt-glow" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.35)" />
            <stop offset="100%" stopColor="rgba(239,68,68,0)" />
          </radialGradient>
          <linearGradient id="hrt-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.75)" />
            <stop offset="45%" stopColor="rgba(126,34,206,0.55)" />
            <stop offset="100%" stopColor="rgba(220,38,38,0.75)" />
          </linearGradient>
          <filter id="hrt-blur">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <ellipse cx="100" cy="115" rx="68" ry="62" fill="url(#hrt-glow)" />

        {/* Heart body — animated beat */}
        <motion.g
          style={{ transformOrigin: "100px 115px" }}
          animate={{ scale: [1, 1.07, 0.97, 1.04, 1] }}
          transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 0.65, ease: [0.4, 0, 0.6, 1] }}
        >
          {/* Main heart fill */}
          <path
            d="M100,168 C62,148 24,116 24,82 C24,52 46,38 66,40 C80,42 92,52 100,65 C108,52 120,42 134,40 C154,38 176,52 176,82 C176,116 138,148 100,168 Z"
            fill="url(#hrt-fill)"
            stroke="rgba(239,68,68,0.45)" strokeWidth="1.5"
          />
          {/* Highlight */}
          <path
            d="M100,168 C62,148 24,116 24,82 C24,52 46,38 66,40 C80,42 92,52 100,65 C108,52 120,42 134,40 C154,38 176,52 176,82 C176,116 138,148 100,168 Z"
            fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1"
          />
          {/* Septum */}
          <path d="M100,68 C100,90 100,130 100,155"
            fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="5 3"
          />
          {/* Coronary vessels */}
          <path d="M85,72 C72,80 60,100 58,120"
            fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="2" strokeLinecap="round"
          />
          <path d="M115,72 C128,82 138,102 136,122"
            fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeLinecap="round"
          />
        </motion.g>

        {/* Aortic arch */}
        <path d="M96,66 C92,50 87,34 82,24 C77,14 70,11 64,16 C59,21 60,30 66,33"
          fill="none" stroke="rgba(220,38,38,0.7)" strokeWidth="4.5" strokeLinecap="round"
        />
        {/* Pulmonary artery */}
        <path d="M104,66 C120,56 130,46 136,38 C142,30 142,22 137,18"
          fill="none" stroke="rgba(59,130,246,0.65)" strokeWidth="3.5" strokeLinecap="round"
        />
        {/* Superior vena cava */}
        <path d="M66,40 C65,30 67,22 70,15"
          fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="3" strokeLinecap="round"
        />

        {/* Ripple pulse */}
        <motion.ellipse cx="100" cy="115" rx="68" ry="62"
          fill="none" stroke="rgba(239,68,68,0.35)" strokeWidth="2.5"
          animate={{ rx: [68, 92], ry: [62, 84], opacity: [0.55, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 0.65 }}
        />
        <motion.ellipse cx="100" cy="115" rx="68" ry="62"
          fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5"
          animate={{ rx: [68, 110], ry: [62, 100], opacity: [0.4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.1, delay: 0.2 }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MICROSCOPE CELL VIEW  (bottom-left)
───────────────────────────────────────────────────────── */
function MicroscopeCellView() {
  const cells = [
    { x: 34, y: 34, r: 14, nr: 5.5 },
    { x: 62, y: 27, r: 11, nr: 4 },
    { x: 22, y: 58, r: 13, nr: 4.5 },
    { x: 55, y: 57, r: 15, nr: 6 },
    { x: 78, y: 48, r: 11, nr: 4 },
    { x: 41, y: 78, r: 12, nr: 4.5 },
    { x: 70, y: 74, r: 10, nr: 3.8 },
    { x: 73, y: 20, r: 9, nr: 3.2 },
  ];

  return (
    <div className="absolute pointer-events-none"
      style={{
        bottom: "clamp(60px,10vh,110px)",
        left: "clamp(12px,4vw,60px)",
        width: "clamp(110px,13vw,175px)",
        height: "clamp(110px,13vw,175px)",
        opacity: 0.78,
      }}>
      {/* Microscope frame rings */}
      <div className="absolute -inset-2 rounded-full"
        style={{ border: "1px solid rgba(96,165,250,0.15)", boxShadow: "0 0 24px rgba(96,165,250,0.12)" }} />
      <div className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: "2.5px solid rgba(96,165,250,0.45)",
          boxShadow: "0 0 30px rgba(96,165,250,0.18), inset 0 0 20px rgba(126,34,206,0.08)",
        }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Slide background */}
          <rect width="100" height="100" fill="rgba(12,8,32,0.95)" />
          <radialGradient id="slide-g" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(88,28,135,0.22)" />
            <stop offset="100%" stopColor="rgba(12,8,32,0)" />
          </radialGradient>
          <rect width="100" height="100" fill="url(#slide-g)" />

          {/* Cells with nuclei */}
          {cells.map((c, i) => (
            <g key={i}>
              <motion.circle cx={c.x} cy={c.y} r={c.r}
                fill="rgba(147,51,234,0.11)"
                stroke="rgba(167,139,250,0.52)" strokeWidth="0.65"
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.5 + i * 0.28, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.circle cx={c.x} cy={c.y} r={c.nr}
                fill="rgba(126,34,206,0.38)"
                stroke="rgba(192,132,252,0.6)" strokeWidth="0.5"
                animate={{ r: [c.nr, c.nr * 1.12, c.nr] }}
                transition={{ duration: 2 + i * 0.22, repeat: Infinity, delay: i * 0.25 }}
              />
              <circle cx={c.x + 0.8} cy={c.y - 0.5} r={c.nr * 0.36}
                fill="rgba(216,180,254,0.45)" />
            </g>
          ))}
          {/* Lens glare */}
          <ellipse cx="28" cy="24" rx="14" ry="9" fill="rgba(255,255,255,0.035)" />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CIRCUIT CHIP  (top-right corner)
───────────────────────────────────────────────────────── */
function CircuitChip() {
  return (
    <div className="absolute top-20 pointer-events-none hidden md:block"
      style={{
        right: "clamp(8px,3vw,36px)",
        width: "clamp(120px,16vw,220px)",
        height: "clamp(120px,16vw,220px)",
        opacity: 0.42,
      }}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <filter id="chip-g">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Chip body */}
        <rect x="55" y="55" width="90" height="90" rx="8"
          fill="rgba(8,14,30,0.92)" stroke="rgba(96,165,250,0.72)" strokeWidth="1.5"
        />
        {/* Internal grid */}
        {[70, 83, 96, 109, 122].map(v => (
          <g key={v}>
            <line x1={v} y1="60" x2={v} y2="140" stroke="rgba(96,165,250,0.14)" strokeWidth="0.4" />
            <line x1="60" y1={v} x2="140" y2={v} stroke="rgba(96,165,250,0.14)" strokeWidth="0.4" />
          </g>
        ))}
        {/* Pins top & bottom */}
        {[70, 84, 98, 112, 126].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="55" x2={x} y2="44" stroke="rgba(96,165,250,0.62)" strokeWidth="1.2" />
            <line x1={x} y1="145" x2={x} y2="156" stroke="rgba(96,165,250,0.62)" strokeWidth="1.2" />
          </g>
        ))}
        {/* Pins left & right */}
        {[70, 84, 98, 112, 126].map((y, i) => (
          <g key={i}>
            <line x1="55" y1={y} x2="44" y2={y} stroke="rgba(96,165,250,0.62)" strokeWidth="1.2" />
            <line x1="145" y1={y} x2="156" y2={y} stroke="rgba(96,165,250,0.62)" strokeWidth="1.2" />
          </g>
        ))}
        {/* Internal nodes */}
        {([
          [75, 75], [100, 75], [125, 75],
          [75, 100], [100, 100], [125, 100],
          [75, 125], [100, 125], [125, 125],
        ] as [number, number][]).map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="3.5"
            fill="rgba(96,165,250,0.55)"
            animate={{ opacity: [0.18, 1, 0.18], scale: [0.7, 1.4, 0.7] }}
            transition={{ duration: 1.6, delay: i * 0.14, repeat: Infinity }}
          />
        ))}
        {/* Diagonal corner traces */}
        {([
          ["M55,55 L36,36 H16 M36,36 V16", "rgba(96,165,250,0.38)"],
          ["M145,55 L164,36 H184 M164,36 V16", "rgba(167,139,250,0.38)"],
          ["M145,145 L164,164 H184 M164,164 V184", "rgba(45,212,191,0.38)"],
          ["M55,145 L36,164 H16 M36,164 V184", "rgba(52,211,153,0.32)"],
        ] as [string, string][]).map(([d, stroke], i) => (
          <motion.path key={i} d={d} fill="none" stroke={stroke} strokeWidth="1.2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.3, ease: "easeOut" }}
          />
        ))}
        {/* Corner junction dots */}
        {([
          [36, 36, "rgba(96,165,250,0.9)"],
          [164, 36, "rgba(167,139,250,0.9)"],
          [164, 164, "rgba(45,212,191,0.9)"],
          [36, 164, "rgba(52,211,153,0.9)"],
        ] as [number, number, string][]).map(([cx, cy, fill], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="4" fill={fill}
            filter="url(#chip-g)"
            animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
        {/* Traveling signal */}
        <motion.circle cx="44" cy="84" r="3" fill="rgba(167,139,250,0.95)"
          filter="url(#chip-g)"
          animate={{ cx: [44, 55, 55, 100, 100, 145, 145, 156] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "linear" }}
        />
        <motion.circle cx="100" cy="44" r="3" fill="rgba(45,212,191,0.9)"
          filter="url(#chip-g)"
          animate={{ cy: [44, 55, 55, 100, 100, 145, 145, 156] }}
          transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, repeatDelay: 1.8, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ECG WAVE
───────────────────────────────────────────────────────── */
function ECGWave() {
  return (
    <svg className="absolute bottom-14 left-0 right-0 w-full pointer-events-none"
      viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none"
      style={{ opacity: 0.52 }}>
      <motion.path
        d="M0,40 L130,40 L150,40 L167,6 L184,74 L201,10 L218,70 L235,40 L350,40 L368,40 L382,4 L396,76 L412,8 L428,72 L444,40 L660,40 L674,40 L690,8 L706,72 L722,10 L738,70 L754,40 L980,40 L994,40 L1010,6 L1026,74 L1042,10 L1058,70 L1074,40 L1440,40"
        stroke="url(#ecg-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 0.35 }}
      />
      <defs>
        <linearGradient id="ecg-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(34,197,94,0)" />
          <stop offset="18%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="82%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="rgba(96,165,250,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   MOLECULE NET  (left mid — bridges DNA + heart)
───────────────────────────────────────────────────────── */
function MoleculeNet() {
  const nodes: [number, number][] = [
    [8, 22], [16, 32], [10, 46], [20, 55], [7, 66], [17, 76],
  ];
  const edges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[1,3],[2,4]];

  return (
    <div className="absolute left-0 inset-y-0 w-1/4 pointer-events-none overflow-hidden hidden lg:block">
      <svg className="w-full h-full" viewBox="0 0 30 100" preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.18 }}>
        {edges.map(([a, b], i) => (
          <motion.line key={i}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            stroke="rgba(45,212,191,0.5)" strokeWidth="0.45"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
        {nodes.map(([nx, ny], i) => (
          <motion.circle key={i} cx={nx} cy={ny} r="1.8"
            fill="rgba(45,212,191,0.35)" stroke="rgba(45,212,191,0.6)" strokeWidth="0.4"
            animate={{ r: [1.8, 2.6, 1.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.22 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FLOW PARTICLES  (bio → circuit)
───────────────────────────────────────────────────────── */
function FlowParticle({ delay, yPct, color }: {
  delay: number; yPct: number; color: string;
}) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ top: `${yPct}%` }}
      initial={{ left: "10%", opacity: 0 }}
      animate={{ left: ["10%", "50%", "90%"], opacity: [0, 1, 0.8, 0], scale: [0.5, 1.3, 0.8, 0.3] }}
      transition={{ duration: 5 + delay, delay, repeat: Infinity, repeatDelay: 2 + delay * 0.5, ease: "easeInOut" }}
    >
      <div className="w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   SCAN LINE
───────────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div className="absolute left-0 right-0 pointer-events-none"
      style={{
        height: "100px",
        background: "linear-gradient(to bottom, transparent, rgba(96,165,250,0.04), transparent)",
      }}
      animate={{ y: ["-5%", "105%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const flowParticles = [
    { delay: 0,   yPct: 38, color: "rgba(45,212,191,0.9)" },
    { delay: 1.8, yPct: 50, color: "rgba(96,165,250,0.9)" },
    { delay: 3.5, yPct: 44, color: "rgba(239,68,68,0.75)" },
    { delay: 5.0, yPct: 58, color: "rgba(52,211,153,0.85)" },
    { delay: 2.4, yPct: 34, color: "rgba(167,139,250,0.8)" },
    { delay: 6.5, yPct: 48, color: "rgba(45,212,191,0.7)" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #06101e 0%, #091828 40%, #0c1d38 70%, #07101e 100%)" }}
    >
      {/* ── ZONE ATMOSPHERE ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-2/5 h-full"
          style={{ background: "radial-gradient(ellipse at 0% 45%, rgba(45,212,191,0.09) 0%, transparent 62%)" }} />
        <div className="absolute right-0 top-0 w-2/5 h-full"
          style={{ background: "radial-gradient(ellipse at 100% 45%, rgba(220,38,38,0.08) 0%, transparent 62%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(96,165,250,0.05) 0%, transparent 65%)" }} />
      </div>

      {/* ── GRID ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(96,165,250,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(96,165,250,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "54px 54px",
      }} />

      {/* ── SCAN LINE ── */}
      <ScanLine />

      {/* ── SCIENCE BACKGROUND ELEMENTS ── */}
      <DNAHelix3D />
      <MicroscopeCellView />
      <CircuitChip />
      <BeatingHeart />
      <MoleculeNet />
      <ECGWave />

      {/* ── FLOW PARTICLES ── */}
      {flowParticles.map((p, i) => <FlowParticle key={i} {...p} />)}

      {/* ── AMBIENT ORBS ── */}
      <div className="absolute pointer-events-none blur-3xl"
        style={{ top: "28%", left: "20%", width: 200, height: 200, borderRadius: "50%", background: "rgba(45,212,191,0.06)" }} />
      <div className="absolute pointer-events-none blur-3xl"
        style={{ bottom: "28%", right: "20%", width: 240, height: 240, borderRadius: "50%", background: "rgba(220,38,38,0.06)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none blur-3xl"
        style={{ width: 320, height: 240, borderRadius: "50%", background: "rgba(96,165,250,0.04)" }} />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y, opacity: contentOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-28 pb-20"
      >
        {/* Flyer-inspired top announcement bar */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 font-bold text-sm tracking-wide"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            color: "#431407",
            boxShadow: "0 4px 24px rgba(245,158,11,0.35)",
          }}
        >
          ⚡ 5-DAY HANDS-ON WORKSHOP ·{" "}
          <span className="font-black">CLASS XII SCIENCE STUDENTS</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-black leading-[0.9] mb-4 font-display tracking-tight"
          style={{ fontSize: "clamp(3.2rem, 11vw, 8rem)" }}
        >
          <span className="block mb-1" style={{ color: "rgba(255,255,255,0.92)" }}>FROM</span>
          <span className="block" style={{
            background: "linear-gradient(135deg, #2dd4bf 0%, #60a5fa 55%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(45,212,191,0.45))",
          }}>
            CELLS
          </span>
          <span className="block my-1"
            style={{ fontSize: "clamp(2rem, 7vw, 5rem)", color: "rgba(255,255,255,0.48)" }}>to</span>
          <span className="block" style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 55%, #f0abfc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(96,165,250,0.45))",
          }}>
            CIRCUITS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 mb-2 text-base md:text-lg font-medium tracking-wide uppercase"
          style={{ color: "rgba(45,212,191,0.9)" }}
        >
          A Smart Health Systems Journey
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10 text-slate-400/75 text-sm"
        >
          {WORKSHOP.organizer} · {WORKSHOP.university} · {WORKSHOP.location}
        </motion.p>

        {/* Topic pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {([
            ["🧫 Cells",       "rgba(45,212,191,0.12)",  "rgba(45,212,191,0.32)"],
            ["🩸 Blood",       "rgba(220,38,38,0.10)",   "rgba(220,38,38,0.30)"],
            ["🔬 Microscopy",  "rgba(167,139,250,0.12)", "rgba(167,139,250,0.30)"],
            ["❤️ Biosignals",  "rgba(239,68,68,0.10)",   "rgba(239,68,68,0.28)"],
            ["⚡ Electronics", "rgba(96,165,250,0.12)",  "rgba(96,165,250,0.30)"],
            ["🔌 Circuits",    "rgba(96,165,250,0.10)",  "rgba(96,165,250,0.26)"],
            ["🤖 AI",          "rgba(167,139,250,0.12)", "rgba(167,139,250,0.30)"],
            ["🏥 Smart Health","rgba(52,211,153,0.12)",  "rgba(52,211,153,0.30)"],
          ] as [string, string, string][]).map(([label, bg, border], i) => (
            <motion.span key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="text-slate-300 text-xs md:text-sm px-3 py-1.5 rounded-full backdrop-blur-sm cursor-default"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={PLACEHOLDERS.GOOGLE_FORM_LINK}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 22px 44px rgba(45,212,191,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 text-white text-lg font-semibold rounded-full"
            style={{
              background: "linear-gradient(135deg, #2dd4bf, #60a5fa)",
              boxShadow: "0 8px 32px rgba(45,212,191,0.28)",
            }}
          >
            Register Now <ExternalLink className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={PLACEHOLDERS.WHATSAPP_COMMUNITY_LINK}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 glass text-white text-lg font-semibold rounded-full border border-white/10 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-green-400" />
            Join WhatsApp
          </motion.a>
          <motion.a
            href={PLACEHOLDERS.BROCHURE_LINK}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 glass text-white text-lg font-semibold rounded-full border border-white/10 transition-all"
          >
            <Download className="w-5 h-5 text-sky-400" />
            Brochure
          </motion.a>
        </motion.div>

        {/* Stats row — flyer dates/time/venue strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="mt-14 pt-7 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {([
            { icon: "📅", label: "7–11 July 2026", sub: "Tue – Sat", color: "#2dd4bf" },
            { icon: "🕙", label: "10:00 AM – 1:00 PM", sub: "Daily", color: "#60a5fa" },
            { icon: "📍", label: "Shobhit University", sub: "Campus, Meerut", color: "#a78bfa" },
            { icon: "🏅", label: "Certificate", sub: "All Participants", color: "#34d399" },
          ]).map(({ icon, label, sub, color }, i) => (
            <motion.div key={i} className="text-center" whileHover={{ scale: 1.08 }}>
              <div className="text-xl mb-0.5">{icon}</div>
              <div className="text-xs font-semibold" style={{ color }}>{label}</div>
              <div className="text-slate-600 text-xs mt-0.5">{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.button
        onClick={() => document.querySelector("#welcome")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors z-20"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
