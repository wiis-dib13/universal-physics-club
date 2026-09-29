"use client";

import { useEffect, useRef, useState } from "react";

export function useParallaxMouse(strength = 1) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!isFine.matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: px * strength, y: py * strength });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);

  return { ref, offset };
}
