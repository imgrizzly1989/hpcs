"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cartStore";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const disabled = product.stock === 0;

  const onClick = () => {
    add(product, qty);
    toast.success(`${qty} × ${product.name} ajouté au panier`);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-2xl border border-neutral-300">
        <button
          aria-label="Diminuer"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-11 w-11 flex items-center justify-center hover:bg-neutral-50"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center text-sm font-semibold">{qty}</span>
        <button
          aria-label="Augmenter"
          onClick={() => setQty((q) => q + 1)}
          className="h-11 w-11 flex items-center justify-center hover:bg-neutral-50"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button onClick={onClick} disabled={disabled} size="lg" className="flex-1">
        <ShoppingBag className="h-5 w-5" />
        {disabled ? "Indisponible" : "Ajouter au panier"}
      </Button>
    </div>
  );
}
