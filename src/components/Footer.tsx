import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-line bg-void py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 text-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image
            src="/logo.png"
            alt="Logo Universal Physics"
            fill
            sizes="80px"
            className="scale-110 object-cover"
          />
        </div>
        <span className="mono-label text-xs text-white/80">
          UNIVERSAL<span className="text-[var(--color-electric)]">__</span>
          PHYSICS
        </span>
        <p className="mono-label text-[10px] text-fog-dim">
          Explore. Question. Understand.
        </p>
        <p className="text-xs text-white/60 sm:text-sm">
          Université Abou Bekr Belkaïd — Tlemcen
        </p>
        <p className="mono-label text-[10px] text-fog-dim/70">
          © 2026 Universal Physics
        </p>

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-line pt-5 text-[11px] text-fog-dim">
          <span>
            Créé par{" "}
            <span className="text-white/70">DIB WISSEM</span>
          </span>
          <span className="flex items-center gap-3">
            <a
              href="mailto:dibwissem7@gmail.com"
              data-cursor="link"
              className="transition-colors hover:text-[var(--color-electric)]"
            >
              dibwissem7@gmail.com
            </a>
            <span className="opacity-40">·</span>
            <a
              href="https://github.com/wiis-dib13"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="transition-colors hover:text-[var(--color-electric)]"
            >
              github.com/wiis-dib13
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
