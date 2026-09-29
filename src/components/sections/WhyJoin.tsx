"use client";

import { motion, type Variants } from "framer-motion";

const WORDS: {
  label: string;
  align: string;
  variant: Variants;
}[] = [
  {
    label: "LEARN",
    align: "justify-start",
    variant: {
      hidden: { opacity: 0, x: -60 },
      show: { opacity: 1, x: 0 },
    },
  },
  {
    label: "EXPERIMENT",
    align: "justify-end",
    variant: {
      hidden: { opacity: 0, x: 60 },
      show: { opacity: 1, x: 0 },
    },
  },
  {
    label: "CREATE",
    align: "justify-center",
    variant: {
      hidden: { opacity: 0, scale: 0.7 },
      show: { opacity: 1, scale: 1 },
    },
  },
  {
    label: "CONNECT",
    align: "justify-start",
    variant: {
      hidden: { opacity: 0, y: 50, rotate: -4 },
      show: { opacity: 1, y: 0, rotate: 0 },
    },
  },
  {
    label: "DISCOVER",
    align: "justify-end",
    variant: {
      hidden: { opacity: 0, filter: "blur(14px)" },
      show: { opacity: 1, filter: "blur(0px)" },
    },
  },
];

export default function WhyJoin() {
  return (
    <section className="relative w-full bg-void py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,143,248,0.08),transparent_55%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-2 px-6 sm:gap-4 md:px-10">
        {WORDS.map((w) => (
          <motion.div
            key={w.label}
            className={`flex ${w.align}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            variants={w.variant}
          >
            <span className="font-display text-[15vw] font-medium leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
              {w.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mono-label relative z-10 mt-20 text-center text-[11px] text-[var(--color-electric)] sm:text-sm"
      >
        Ta curiosité est déjà un bon début.
      </motion.p>
    </section>
  );
}
