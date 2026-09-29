"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "media">(
    "default"
  );

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!isFine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let dotX = ringX;
    let dotY = ringY;
    let raf = 0;

    const move = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;

      const target = e.target as HTMLElement;
      const media = target.closest("[data-cursor='media']");
      const link = target.closest("a, button, [data-cursor='link']");
      setVariant(media ? "media" : link ? "link" : "default");
    };

    const tick = () => {
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--color-electric)]"
        style={{ transition: "opacity 0.2s ease" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: variant === "link" ? 56 : variant === "media" ? 96 : 32,
          height: variant === "link" ? 56 : variant === "media" ? 96 : 32,
          borderColor:
            variant === "media"
              ? "rgba(139,143,248,0.6)"
              : "rgba(56,189,248,0.5)",
          backgroundColor:
            variant === "link" ? "rgba(56,189,248,0.08)" : "transparent",
        }}
        aria-hidden="true"
      />
    </>
  );
}
