"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Email invalide");
    toast.success("Merci, vous êtes inscrit à la newsletter HPCS");
    setEmail("");
  };
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="overflow-hidden rounded-3xl bg-brand-charcoal p-8 text-white md:p-12">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Restez informé</h2>
            <p className="mt-2 text-sm text-neutral-300">Nouveautés, promos et disponibilité des pièces directement dans votre boîte mail.</p>
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre email" className="bg-white" />
            <Button type="submit">S&apos;inscrire</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
