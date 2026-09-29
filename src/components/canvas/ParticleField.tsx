"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "electric" | "violet" | "white";
  tw: number;
};

const COLORS: Record<Particle["hue"], string> = {
  electric: "56,189,248",
  violet: "139,143,248",
  white: "246,247,251",
};

export default function ParticleField({
  className = "",
  density = 1,
  interactive = true,
  lines = true,
  speed = 1,
}: {
  className?: string;
  density?: number;
  interactive?: boolean;
  lines?: boolean;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const buildParticles = () => {
      const area = width * height;
      const base = Math.round((area / 15000) * density);
      const count = Math.max(24, Math.min(base, 160));
      particles = Array.from({ length: count }, () => {
        const hueRoll = Math.random();
        return {
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-0.12, 0.12) * speed,
          vy: rand(-0.12, 0.12) * speed,
          r: rand(0.6, 1.8),
          hue: hueRoll > 0.82 ? "violet" : hueRoll > 0.55 ? "electric" : "white",
          tw: rand(0, Math.PI * 2),
        };
      });
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMove, { passive: true });
      container.addEventListener("mouseleave", onLeave);
    }

    let raf = 0;
    const linkDist = Math.min(140, Math.max(80, width / 10));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.tw += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const radius = 130;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / radius) * 0.6;
            p.vx += (dx / d) * force * 0.06;
            p.vy += (dy / d) * force * 0.06;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      if (lines) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDist * linkDist) {
              const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.15;
              ctx.strokeStyle = `rgba(139,143,248,${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        const flicker = 0.55 + Math.sin(p.tw) * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${COLORS[p.hue]},${flicker})`;
        ctx.shadowColor = `rgba(${COLORS[p.hue]},0.8)`;
        ctx.shadowBlur = p.hue === "white" ? 2 : 6;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    if (reducedMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      if (interactive) {
        window.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [density, interactive, lines, speed, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
