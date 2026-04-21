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
    toast.success("Merci, vous êtes inscrit à la newsletter CHINAPAL");
    setEmail("");
  };
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">NEWSLETTER</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
              Recevez nos nouveautés et promotions par email
            </h2>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre email" className="sm:w-72" />
            <Button type="submit" size="lg">S&apos;inscrire</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
