import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/product";
import { cn } from "@/lib/utils";

export function StickyBar({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
        <img src={product.images[0].src} alt="" className="h-12 w-12 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{product.title}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">${product.price}</span>{" "}
            <span className="line-through">${product.originalPrice}</span>
          </p>
        </div>
        <Button onClick={onAdd} className="bg-foreground text-background hover:bg-foreground/90">
          <ShoppingBag className="h-4 w-4" /> Add to cart
        </Button>
      </div>
    </div>
  );
}
