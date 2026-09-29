"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  size: number;
  hue: number;
};

export default function TextParticles({
  text,
  progress,
  className = "",
}: {
  text: string;
  /** 0 -> scattered, 1 -> fully formed. Ref so we can drive from rAF/scroll without re-render. */
  progress: MutableRefObject<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const buildTargets = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) return;

      const isSmall = width < 640;
      const fontSize = Math.min(width / (isSmall ? 6.2 : 9), 150);
      octx.fillStyle = "#fff";
      octx.font = `600 ${fontSize}px var(--font-space-grotesk), sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, width / 2, height / 2);

      const data = octx.getImageData(0, 0, width, height).data;
      const stride = isSmall ? 4 : 3;
      const targets: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 128) targets.push({ x, y });
        }
      }

      const spread = Math.min(width, height);
      particles = targets.map((t) => {
        const angle = rand(0, Math.PI * 2);
        const radius = rand(spread * 0.25, spread * 0.58);
        return {
          x: t.x,
          y: t.y,
          tx: t.x,
          ty: t.y,
          sx: width / 2 + Math.cos(angle) * radius,
          sy: height / 2 + Math.sin(angle) * radius,
          size: rand(1, 2.1),
          hue: Math.random(),
        };
      });
    };

    const ro = new ResizeObserver(buildTargets);
    ro.observe(container);
    buildTargets();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const p = easeOutCubic(Math.min(Math.max(progress.current, 0), 1));
      const t = performance.now() / 1000;

      for (const particle of particles) {
        const jitter = (1 - p) * 14;
        const x =
          particle.sx +
          (particle.tx - particle.sx) * p +
          Math.sin(t * 1.5 + particle.hue * 10) * jitter;
        const y =
          particle.sy +
          (particle.ty - particle.sy) * p +
          Math.cos(t * 1.3 + particle.hue * 10) * jitter;

        const color =
          particle.hue > 0.82
            ? "139,143,248"
            : particle.hue > 0.5
              ? "56,189,248"
              : "246,247,251";

        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${0.5 + p * 0.5})`;
        ctx.shadowColor = `rgba(${color},0.9)`;
        ctx.shadowBlur = 4 + p * 4;
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, progress, reducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
