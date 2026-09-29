"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FLOATING_WORDS = [
  { label: "QUANTUM", top: "14%", left: "8%", dx: 14, dy: -18, delay: 0 },
  { label: "MATTER", top: "22%", left: "78%", dx: -16, dy: 14, delay: 0.6 },
  { label: "ENERGY", top: "68%", left: "12%", dx: 12, dy: 16, delay: 1.1 },
  { label: "SPACE", top: "8%", left: "48%", dx: -10, dy: 20, delay: 1.6 },
  { label: "TIME", top: "82%", left: "62%", dx: 18, dy: -12, delay: 0.3 },
  { label: "WAVES", top: "40%", left: "88%", dx: -14, dy: -16, delay: 2.1 },
  { label: "LIGHT", top: "88%", left: "30%", dx: 10, dy: -20, delay: 0.9 },
  { label: "COSMOS", top: "50%", left: "4%", dx: -12, dy: 12, delay: 1.4 },
];

const headline = [
  "LA PHYSIQUE",
  "N'EST PAS SEULEMENT",
  "UNE MATIÈRE.",
];

export default function ClubIntro() {
  return (
    <section id="club" className="relative w-full overflow-hidden bg-void py-32 md:py-44">
      <div className="absolute inset-0">
        <Image
          src="/assets/cosmic-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {FLOATING_WORDS.map((w) => (
          <span
            key={w.label}
            className="float-word mono-label absolute text-[11px] text-fog/70"
            style={
              {
                top: w.top,
                left: w.left,
                "--dx": `${w.dx}px`,
                "--dy": `${w.dy}px`,
                animationDelay: `${w.delay}s`,
              } as CSSProperties
            }
          >
            {w.label}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {headline.map((line, li) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${li === 1 ? "text-[var(--color-electric)]" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mono-label mt-8 max-w-md text-[11px] leading-relaxed text-fog sm:text-sm"
        >
          Un espace pour apprendre, expérimenter, partager et découvrir.
        </motion.p>
      </div>
    </section>
  );
}
