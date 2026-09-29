import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-line bg-void py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 text-center">
        <div className="relative h-8 w-8 opacity-80">
          <Image src="/assets/emblem.svg" alt="" fill sizes="32px" />
        </div>
        <span className="mono-label text-xs text-white/80">
          UNIVERSAL<span className="text-[var(--color-electric)]">__</span>
          PHYSICS
        </span>
        <p className="mono-label text-[10px] text-fog-dim">
          Explore. Question. Understand.
        </p>
        <p className="mono-label text-[10px] text-fog-dim/70">
          © 2026 Universal Physics
        </p>
      </div>
    </footer>
  );
}
