"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  {
    src: "/assets/lab-equipment.png",
    label: "Expérimentation",
    className: "md:col-span-3 md:row-span-2",
  },
  {
    src: "/assets/particle-collision.png",
    label: "Recherche",
    className: "md:col-span-3",
  },
  {
    src: "/assets/glass-objects.png",
    label: "Projets",
    className: "md:col-span-3",
  },
  {
    src: "/assets/physics-equations.png",
    label: "Discussions",
    className: "md:col-span-2",
  },
  {
    src: "/assets/particle-trajectories.png",
    label: "Événements",
    className: "md:col-span-2",
  },
  {
    src: "/assets/photon.png",
    label: "Collaboration",
    className: "md:col-span-2",
  },
];

const lines = ["Des idées.", "Des expériences.", "Des personnes.", "Un univers."];

export default function Community() {
  return (
    <section className="relative w-full bg-void py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mono-label mb-6 text-[10px] text-[var(--color-electric)]">
            Communauté
          </span>
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.src}
              data-cursor="media"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line ${tile.className}`}
            >
              <Image
                src={tile.src}
                alt={tile.label}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
              <span className="mono-label absolute bottom-5 left-5 text-[10px] text-white/85">
                {tile.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
