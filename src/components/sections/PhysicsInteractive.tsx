"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = [
  {
    title: ["QUANTUM", "PARTICLES"],
    image: "/assets/quantum-wavefunction.png",
    note: "Fonction d'onde & probabilité",
  },
  {
    title: ["WAVES", "INTERFERENCE"],
    image: "/assets/wave-interference.png",
    note: "Superposition & diffraction",
  },
  {
    title: ["SPACE", "TIME"],
    image: "/assets/spacetime-curvature.png",
    note: "Courbure & relativité",
  },
  {
    title: ["ENERGY", "FIELDS"],
    image: "/assets/electromagnetic-field.png",
    note: "Champs & interactions",
  },
  {
    title: ["MATTER", "LIGHT"],
    image: "/assets/atomic-structure.png",
    note: "Structure & rayonnement",
  },
];

export default function PhysicsInteractive() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="experiences"
      className="relative w-full bg-void py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mono-label mb-16 block text-center text-[10px] text-[var(--color-electric)]"
        >
          Phénomènes
        </motion.span>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {ITEMS.map((item, i) => (
              <li key={item.title.join("")}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="media"
                  className="group flex w-full items-baseline justify-between py-7 text-left transition-colors"
                >
                  <span
                    className={`font-display text-2xl font-medium tracking-tight transition-colors duration-300 sm:text-4xl ${
                      active === i ? "text-white" : "text-fog-dim"
                    }`}
                  >
                    {item.title[0]}{" "}
                    <span
                      className={
                        active === i
                          ? "text-[var(--color-electric)]"
                          : "text-fog-dim"
                      }
                    >
                      {item.title[1]}
                    </span>
                  </span>
                  <span className="mono-label hidden text-[10px] text-fog-dim sm:block">
                    0{i + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div
            data-cursor="media"
            className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line md:aspect-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={ITEMS[active].image}
                initial={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={ITEMS[active].image}
                  alt={ITEMS[active].title.join(" ")}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 z-10">
              <span className="mono-label text-[10px] text-white/80">
                {ITEMS[active].note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
