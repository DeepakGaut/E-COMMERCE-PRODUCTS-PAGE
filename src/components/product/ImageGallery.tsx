import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

type Image = { src: string; alt: string };

export function ImageGallery({ images }: { images: Image[] }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y });
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-3 md:flex-col" role="tablist" aria-label="Product images">
        {images.map((img, i) => (
          <button
            key={img.src}
            role="tab"
            aria-selected={i === active}
            aria-label={`Show image ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface transition-all md:h-24 md:w-24",
              "ring-1 ring-border hover:ring-foreground/40",
              i === active && "ring-2 ring-foreground"
            )}
          >
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" width={96} height={96} />
          </button>
        ))}
      </div>

      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setZoom(null)}
        className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-surface cursor-zoom-in"
      >
        <img
          key={images[active].src}
          src={images[active].src}
          alt={images[active].alt}
          width={1024}
          height={1024}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300 ease-out animate-fade-in",
            zoom ? "scale-[1.8]" : "scale-100"
          )}
          style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur opacity-0 group-hover:opacity-100 transition">
          Hover to zoom
        </div>
      </div>
    </div>
  );
}
