"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ParticleField from "./canvas/ParticleField";

export default function SuccessScreen() {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden py-24 text-center">
      <ParticleField
        className="absolute inset-0 h-full w-full"
        density={1.4}
        interactive={false}
        speed={0.6}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,var(--color-void)_78%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-8 h-20 w-20 sm:h-24 sm:w-24"
      >
        <Image src="/assets/emblem.svg" alt="" fill sizes="96px" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="text-glow relative z-10 font-display text-3xl font-medium tracking-tight sm:text-5xl"
      >
        BIENVENUE DANS L&rsquo;UNIVERS.
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mono-label relative z-10 mt-6 text-[11px] text-fog sm:text-sm"
      >
        Nous avons hâte de te compter parmi nous. 🤍
      </motion.p>
    </div>
  );
}
