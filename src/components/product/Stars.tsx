import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  rating: number;
  size?: number;
  className?: string;
  interactive?: boolean;
  onChange?: (n: number) => void;
};

export function Stars({ rating, size = 16, className, interactive, onChange }: Props) {
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} role={interactive ? "radiogroup" : "img"} aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(rating);
        const Cmp = interactive ? "button" : "span";
        return (
          <Cmp
            key={n}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onChange?.(n) : undefined}
            aria-label={interactive ? `${n} star${n > 1 ? "s" : ""}` : undefined}
            aria-checked={interactive ? n === Math.round(rating) : undefined}
            role={interactive ? "radio" : undefined}
            className={cn(interactive && "cursor-pointer transition-transform hover:scale-110")}
          >
            <Star
              width={size}
              height={size}
              className={cn(filled ? "fill-[var(--rating)] text-[var(--rating)]" : "fill-transparent text-muted-foreground/40")}
            />
          </Cmp>
        );
      })}
    </div>
  );
}
