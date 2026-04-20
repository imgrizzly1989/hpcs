"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCart } from "@/store/cartStore";
import { useFavorites } from "@/store/favoritesStore";

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartCount = useCart((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const favCount = useFavorites((s) => s.ids.length);

  const items = [
    { href: "/", label: "Accueil", Icon: Home, badge: 0 },
    { href: "/favoris", label: "Favoris", Icon: Heart, badge: favCount },
    { href: "/panier", label: "Panier", Icon: ShoppingBag, badge: cartCount },
    { href: "/compte", label: "Compte", Icon: User, badge: 0 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur">
      <ul className="grid grid-cols-4">
        {items.map(({ href, label, Icon, badge }) => {
          const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium",
                  active ? "text-brand-red" : "text-neutral-500"
                )}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" />
                  {badge > 0 && (
                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{badge}</span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
