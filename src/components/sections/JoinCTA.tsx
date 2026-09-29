"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TextParticles from "../canvas/TextParticles";
import ParticleField from "../canvas/ParticleField";

export default function JoinCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 1;
      progress.current = p;
      setRevealed((prev) => (p > 0.94 ? true : p < 0.85 ? false : prev));
      raf = requestAnimationFrame(compute);
    };
    raf = requestAnimationFrame(compute);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => {
      document
        .getElementById("rejoindre-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 260);
    setTimeout(() => setFlash(false), 900);
  };

  return (
    <section
      id="rejoindre"
      ref={sectionRef}
      className="relative h-[260vh] w-full bg-void"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <ParticleField
          className="absolute inset-0 h-full w-full opacity-50"
          density={0.7}
          interactive={false}
          lines={false}
          speed={0.4}
        />
        <TextParticles
          text="UNIVERSAL__PHYSICS"
          progress={progress}
          className="absolute inset-0 h-full w-full"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,var(--color-void)_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
          style={{ marginTop: "38vh" }}
        >
          <p className="mono-label mb-8 text-xs text-fog sm:text-sm">
            Prêt à entrer dans l&rsquo;univers&nbsp;?
          </p>
          <button
            onClick={handleClick}
            data-cursor="link"
            className="group relative overflow-hidden rounded-full border border-line-strong px-9 py-4"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--color-electric)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="mono-label relative z-10 text-[11px] text-white transition-colors duration-500 group-hover:text-void">
              REJOINDRE UNIVERSAL__PHYSICS
            </span>
          </button>
        </motion.div>
      </div>

      {flash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.85, times: [0, 0.35, 1] }}
          className="pointer-events-none fixed inset-0 z-[9995] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.9),var(--color-void)_70%)]"
        />
      )}
    </section>
  );
}
