import { Search, ShoppingBag, User, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

type Props = {
  cart: CartItem[];
  onRemove: (idx: number) => void;
  onClear: () => void;
};

const navLinks = ["Men", "Women", "Collections", "Journal"];

export function Header({ cart, onRemove, onClear }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
        <Link to="/" className="font-display text-xl font-medium tracking-tight">
          Northbound
        </Link>
        <nav className="hidden gap-8 text-sm md:flex" aria-label="Primary">
          {navLinks.map((label) => (
            <button
              key={label}
              onClick={() => toast(`${label} collection`, { description: "Coming soon to the storefront." })}
              className="hover:text-accent-foreground"
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Search */}
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted">
                <Search className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search Northbound</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!query.trim()) return;
                  toast.success(`Searching for "${query}"`, { description: "Results would appear here." });
                  setSearchOpen(false);
                  setQuery("");
                }}
                className="space-y-3"
              >
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search shoes, apparel, brands…"
                />
                <div className="flex flex-wrap gap-2">
                  {["Atlas Runner", "Trail", "White sneakers", "Wool"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full bg-secondary px-3 py-1 text-xs hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Search
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Account */}
          <Dialog open={accountOpen} onOpenChange={setAccountOpen}>
            <DialogTrigger asChild>
              <button aria-label="Account" className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted">
                <User className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign in</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Signed in", { description: "Welcome back." });
                  setAccountOpen(false);
                }}
                className="space-y-3"
              >
                <Input type="email" placeholder="Email" required />
                <Input type="password" placeholder="Password" required />
                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Continue
                </Button>
                <button
                  type="button"
                  onClick={() => toast("Create account", { description: "Sign-up flow coming soon." })}
                  className="block w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Create an account
                </button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Cart */}
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={`Cart, ${cartCount} items`}
                className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-muted"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your cart ({cartCount})</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto py-4">
                {cart.length === 0 ? (
                  <div className="grid place-items-center py-16 text-center text-sm text-muted-foreground">
                    <ShoppingBag className="mb-3 h-8 w-8 opacity-40" />
                    Your cart is empty.
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item, i) => (
                      <li key={`${item.id}-${i}`} className="flex gap-3 rounded-lg border border-border p-3">
                        <img src={item.image} alt="" className="h-16 w-16 rounded-md object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.color} · Size {item.size} · Qty {item.qty}
                          </p>
                          <p className="mt-1 text-sm font-medium">${(item.price * item.qty).toFixed(0)}</p>
                        </div>
                        <button
                          onClick={() => onRemove(i)}
                          aria-label="Remove item"
                          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {cart.length > 0 && (
                <SheetFooter className="flex-col gap-3 border-t border-border pt-4 sm:flex-col">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(0)}</span>
                  </div>
                  <Button
                    onClick={() => {
                      toast.success("Checkout started", { description: "Redirecting to secure checkout…" });
                      setCartOpen(false);
                    }}
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    Checkout
                  </Button>
                  <button
                    onClick={onClear}
                    className="inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3" /> Clear cart
                  </button>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
