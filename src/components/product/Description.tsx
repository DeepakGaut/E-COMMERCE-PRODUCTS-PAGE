import { Check } from "lucide-react";
import type { Product } from "@/data/product";

export function Description({ product }: { product: Product }) {
  return (
    <section className="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl font-display font-medium md:text-3xl">Built for the long haul.</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
        <ul className="mt-6 space-y-3">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-foreground text-background">
                <Check className="h-3 w-3" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-surface p-6 md:p-8">
        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Specifications</h3>
        <dl className="mt-6 divide-y divide-border">
          {product.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-2 gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">{s.label}</dt>
              <dd className="font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
