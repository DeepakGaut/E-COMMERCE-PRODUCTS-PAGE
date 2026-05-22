import { useState } from "react";
import { Minus, Plus, ShoppingBag, Zap, Heart, Truck, RotateCcw, Shield } from "lucide-react";
import { Stars } from "./Stars";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Product } from "@/data/product";

type Props = {
  product: Product;
  onAddToCart: (qty: number, size: string, color: string) => void;
  onBuyNow: (qty: number, size: string, color: string) => void;
};

export function ProductInfo({ product, onAddToCart, onBuyNow }: Props) {
  const [size, setSize] = useState(product.sizes[1]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => {
    setWishlisted((w) => {
      toast(w ? "Removed from wishlist" : "Saved to wishlist");
      return !w;
    });
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
        <h1 className="mt-2 text-3xl font-display font-medium leading-tight md:text-4xl lg:text-5xl">
          {product.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <Stars rating={product.rating} />
          <span className="font-medium">{product.rating}</span>
          <span className="text-muted-foreground">·</span>
          <a href="#reviews" className="text-muted-foreground underline-offset-4 hover:underline">
            {product.reviewCount.toLocaleString()} reviews
          </a>
        </div>
      </div>

      <div className="flex items-end gap-3">
        <span className="text-3xl font-display font-medium">${product.price}</span>
        <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
        <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-medium text-accent-foreground">
          −{discount}%
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className={cn("h-2 w-2 rounded-full", product.inStock ? "bg-success" : "bg-destructive")} />
        <span className={cn("font-medium", product.inStock ? "text-success" : "text-destructive")}>
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
        <span className="text-muted-foreground">· Ships in 1–2 business days</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Color</span>
          <span className="text-sm text-muted-foreground">{color}</span>
        </div>
        <div className="flex gap-3" role="radiogroup" aria-label="Color">
          {product.colors.map((c) => (
            <button
              key={c.name}
              role="radio"
              aria-checked={color === c.name}
              aria-label={c.name}
              onClick={() => setColor(c.name)}
              className={cn(
                "h-10 w-10 rounded-full ring-1 ring-border transition-all hover:scale-105",
                color === c.name && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Size</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs text-muted-foreground underline-offset-4 hover:underline">Size guide</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Size guide</DialogTitle>
              </DialogHeader>
              <table className="w-full text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-medium">Size</th>
                    <th className="py-2 text-left font-medium">US</th>
                    <th className="py-2 text-left font-medium">EU</th>
                    <th className="py-2 text-left font-medium">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["S", "7", "40", "25"],
                    ["M", "9", "42", "27"],
                    ["L", "11", "44", "29"],
                    ["XL", "13", "46", "31"],
                  ].map(([s, us, eu, cm]) => (
                    <tr key={s} className="border-b border-border last:border-0">
                      <td className="py-2 font-medium">{s}</td>
                      <td className="py-2">{us}</td>
                      <td className="py-2">{eu}</td>
                      <td className="py-2">{cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Size">
          {product.sizes.map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={size === s}
              onClick={() => setSize(s)}
              className={cn(
                "h-12 rounded-lg border text-sm font-medium transition-all",
                size === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:border-foreground/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 items-center justify-between rounded-lg border border-border bg-card px-2 sm:w-36">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          onClick={() => onAddToCart(qty, size, color)}
          variant="outline"
          className="h-12 flex-1 border-foreground/80 text-base hover:bg-foreground hover:text-background"
        >
          <ShoppingBag className="h-4 w-4" /> Add to cart
        </Button>
        <Button
          onClick={() => onBuyNow(qty, size, color)}
          className="h-12 flex-1 bg-foreground text-background text-base hover:bg-foreground/90"
        >
          <Zap className="h-4 w-4" /> Buy now
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={wishlisted}
          onClick={toggleWishlist}
          className="h-12 w-12"
        >
          <Heart className={cn("h-5 w-5 transition", wishlisted && "fill-destructive text-destructive")} />
        </Button>
      </div>

      <ul className="mt-2 grid grid-cols-1 gap-3 border-t border-border pt-6 text-sm sm:grid-cols-3">
        <li className="flex items-center gap-2 text-muted-foreground"><Truck className="h-4 w-4" /> Free shipping over $75</li>
        <li className="flex items-center gap-2 text-muted-foreground"><RotateCcw className="h-4 w-4" /> 60-day returns</li>
        <li className="flex items-center gap-2 text-muted-foreground"><Shield className="h-4 w-4" /> 2-year warranty</li>
      </ul>
    </div>
  );
}
