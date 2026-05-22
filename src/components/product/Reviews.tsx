import { useState } from "react";
import { Stars } from "./Stars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Review } from "@/data/product";

type Props = {
  reviews: Review[];
  averageRating: number;
  onAdd: (r: Omit<Review, "id" | "date">) => void;
};

export function Reviews({ reviews, averageRating, onAdd }: Props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    onAdd({ name: name.trim(), rating, comment: comment.trim() });
    setName("");
    setComment("");
    setRating(5);
  };

  return (
    <section id="reviews" className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <h2 className="text-2xl font-display font-medium md:text-3xl">What people are saying</h2>
        <div className="mt-6 flex items-center gap-4">
          <span className="text-5xl font-display font-medium">{averageRating.toFixed(1)}</span>
          <div>
            <Stars rating={averageRating} size={18} />
            <p className="mt-1 text-sm text-muted-foreground">{reviews.length} reviews</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl bg-surface p-6">
          <h3 className="font-medium">Write a review</h3>
          <div className="space-y-2">
            <Label htmlFor="rev-name">Name</Label>
            <Input id="rev-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <Stars rating={rating} size={24} interactive onChange={setRating} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rev-comment">Comment</Label>
            <Textarea
              id="rev-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
            Submit review
          </Button>
        </form>
      </div>

      <ul className="space-y-6">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-2xl border border-border bg-card p-6 animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-medium">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
