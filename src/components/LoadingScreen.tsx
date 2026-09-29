"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticleField from "./canvas/ParticleField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function LoadingScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const fast = reducedMotion;
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setStage(1), fast ? 120 : 500));
    t.push(setTimeout(() => setStage(2), fast ? 240 : 1250));
    t.push(setTimeout(() => setStage(3), fast ? 360 : 1750));
    t.push(setTimeout(() => setExiting(true), fast ? 600 : 2700));
    t.push(setTimeout(onFinish, fast ? 900 : 3350));
    return () => t.forEach(clearTimeout);
  }, [onFinish, reducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[9996] flex flex-col items-center justify-center overflow-hidden bg-void"
      animate={exiting ? { opacity: 0, filter: "blur(12px)" } : { opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 opacity-70">
        <ParticleField
          className="h-full w-full"
          density={stage === 0 ? 0.15 : stage === 1 ? 0.5 : 1}
          interactive={false}
          lines={stage >= 2}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.05em", scale: 0.9 }}
          animate={
            stage >= 2
              ? { opacity: 1, letterSpacing: "0.02em", scale: 1 }
              : {}
          }
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-3xl font-medium tracking-tight text-white sm:text-5xl"
        >
          UNIVERSAL<span className="text-[var(--color-electric)]">__</span>
          PHYSICS
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mono-label mt-4 text-[10px] text-fog sm:text-xs"
        >
          Comprendre l&rsquo;univers, une question à la fois.
        </motion.p>
      </div>
    </motion.div>
  );
}
