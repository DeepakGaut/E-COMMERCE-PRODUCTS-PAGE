import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { product, initialReviews, type Review } from "@/data/product";
import { Header, type CartItem } from "@/components/product/Header";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Description } from "@/components/product/Description";
import { Reviews } from "@/components/product/Reviews";
import { StickyBar } from "@/components/product/StickyBar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Runner — Northbound" },
      { name: "description", content: "Atlas Runner everyday trainer. Recycled mesh upper, dual-density EVA midsole, 60-day returns." },
      { property: "og:title", content: "Atlas Runner — Northbound" },
      { property: "og:description", content: "Built for the long haul. Designed in Portland, tested on six continents." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addToCart = (qty: number, size: string, color: string) => {
    setCart((c) => [
      ...c,
      {
        id: product.id,
        title: product.title,
        image: product.images[0].src,
        price: product.price,
        size,
        color,
        qty,
      },
    ]);
    toast.success("Added to cart", {
      description: `${product.title} · ${color} · Size ${size} · Qty ${qty}`,
    });
  };

  const buyNow = (qty: number, size: string, color: string) => {
    addToCart(qty, size, color);
    setTimeout(() => toast("Proceeding to checkout…"), 250);
  };

  const removeFromCart = (idx: number) =>
    setCart((c) => c.filter((_, i) => i !== idx));

  const clearCart = () => {
    setCart([]);
    toast("Cart cleared");
  };

  const addReview = (r: Omit<Review, "id" | "date">) => {
    setReviews((prev) => [
      {
        ...r,
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      ...prev,
    ]);
    toast.success("Thanks for the review!");
  };

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const breadcrumbToast = (label: string) =>
    toast(label, { description: "Coming soon to the storefront." });

  return (
    <div className="min-h-dvh bg-background">
      <Header cart={cart} onRemove={removeFromCart} onClear={clearCart} />

      <main className="mx-auto max-w-7xl px-4 pb-32 pt-8 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-foreground">Home</button></li>
            <li>/</li>
            <li><button onClick={() => breadcrumbToast("Men")} className="hover:text-foreground">Men</button></li>
            <li>/</li>
            <li><button onClick={() => breadcrumbToast("Footwear")} className="hover:text-foreground">Footwear</button></li>
            <li>/</li>
            <li className="text-foreground">Atlas Runner</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageGallery images={product.images} />
          <ProductInfo product={product} onAddToCart={addToCart} onBuyNow={buyNow} />
        </div>

        <div className="mt-24">
          <Description product={product} />
        </div>

        <div className="mt-24">
          <Reviews reviews={reviews} averageRating={avg} onAdd={addReview} />
        </div>
      </main>

      <StickyBar product={product} onAdd={() => addToCart(1, "M", product.colors[0].name)} />
      <Toaster />
    </div>
  );
}
