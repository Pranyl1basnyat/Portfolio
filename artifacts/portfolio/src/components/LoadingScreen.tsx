import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    "Initializing system...",
    "Loading neural networks...",
    "Compiling portfolio data...",
    "Rendering interface...",
    "System ready.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 6;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 700);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    setPhase(Math.min(Math.floor(progress / 22), phases.length - 1));
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-background flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-secondary/8 rounded-full blur-[80px]" />

      {/* Grid lines background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-md px-8">
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="text-4xl font-bold font-mono tracking-tighter">
            <span className="text-primary">&lt;</span>
            <span className="text-white">Pranyl</span>
            <span className="text-primary">/&gt;</span>
          </div>
          <div className="text-xs font-mono text-muted-foreground/60 uppercase tracking-[0.25em]">
            AI Engineer · Full Stack · Flutter
          </div>
        </motion.div>

        {/* Spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full"
          style={{
            border: "2px solid transparent",
            background:
              "linear-gradient(#030712, #030712) padding-box, conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, transparent 75%) border-box",
          }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.9)]"
            />
          </div>
        </motion.div>

        {/* Status text */}
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-5 text-sm font-mono text-primary/80"
        >
          {phases[phase]}
        </motion.div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="h-px bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                boxShadow: "0 0 10px rgba(59,130,246,0.7)",
              }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest">Loading</span>
            <span className="text-xs font-mono text-primary/60">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Scanning lines */}
        <motion.div
          animate={{ y: ["0%", "800%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
          style={{ top: "10%" }}
        />
      </div>
    </motion.div>
  );
}
