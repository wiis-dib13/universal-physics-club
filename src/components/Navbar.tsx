"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleField from "./canvas/ParticleField";

const LINKS = [
  { label: "LE CLUB", href: "#club" },
  { label: "EXPÉRIENCES", href: "#experiences" },
  { label: "REJOINDRE", href: "#rejoindre" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <button
            onClick={() => handleNav("#top")}
            className="mono-label text-[11px] tracking-[0.28em] text-white/90 md:text-xs"
            data-cursor="link"
          >
            UNIVERSAL<span className="text-[var(--color-electric)]">__</span>
            PHYSICS
          </button>

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="mono-label group relative text-[11px] text-fog transition-colors hover:text-white"
                  data-cursor="link"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-electric)] transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Menu"
            data-cursor="link"
          >
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void md:hidden"
          >
            <ParticleField className="absolute inset-0 h-full w-full" density={0.8} />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  onClick={() => handleNav(link.href)}
                  className="font-display text-3xl tracking-wide text-white"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
