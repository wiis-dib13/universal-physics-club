"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ParticleField from "../canvas/ParticleField";
import { useParallaxMouse } from "@/hooks/useParallaxMouse";

export default function Hero() {
  const { ref, offset } = useParallaxMouse(24);

  return (
    <section
      id="top"
      ref={ref as RefObject<HTMLDivElement>}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-void"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/spacetime-curvature.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-40"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.08)`,
          }}
        />
        <Image
          src="/assets/quantum-particle-field.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-30 mix-blend-screen"
          style={{
            transform: `translate3d(${-offset.x * 1.4}px, ${-offset.y * 1.4}px, 0) scale(1.15)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void" />
      </div>

      <ParticleField className="absolute inset-0 h-full w-full" density={1.1} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,var(--color-void)_78%)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mono-label mb-6 text-[10px] text-[var(--color-electric)] sm:text-xs"
        >
          Club de Physique
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-glow font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          UNIVERSAL<span className="text-[var(--color-electric)]">__</span>
          <br className="sm:hidden" />
          PHYSICS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mono-label mt-7 text-[11px] text-fog sm:text-sm"
        >
          Explorer. Expérimenter. Comprendre.
        </motion.p>

        <motion.a
          href="#rejoindre"
          data-cursor="link"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="group relative mt-12 overflow-hidden rounded-full border border-line-strong px-9 py-4"
        >
          <span className="absolute inset-0 -translate-x-full bg-[var(--color-electric)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="mono-label relative z-10 text-[11px] text-white transition-colors duration-500 group-hover:text-void">
            REJOINDRE LE CLUB
          </span>
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-line-strong p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
