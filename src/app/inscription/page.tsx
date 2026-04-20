"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Compte créé — bienvenue sur HPCS");
    router.push("/compte");
  };
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Inscription" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Créer un compte</h1>
      <p className="mt-1 text-sm text-neutral-600">Rejoignez HPCS en quelques secondes.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-xs font-semibold">Prénom</label><Input required /></div>
          <div><label className="text-xs font-semibold">Nom</label><Input required /></div>
        </div>
        <div><label className="text-xs font-semibold">Email</label><Input type="email" required /></div>
        <div><label className="text-xs font-semibold">Téléphone</label><Input type="tel" required /></div>
        <div><label className="text-xs font-semibold">Mot de passe</label><Input type="password" required /></div>
        <Button type="submit" className="w-full" size="lg">Créer mon compte</Button>
        <p className="text-center text-sm text-neutral-600">Déjà inscrit ? <Link href="/connexion" className="font-semibold text-brand-red hover:underline">Connexion</Link></p>
      </form>
    </div>
  );
}
