"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bienvenue sur CHINAPAL");
    router.push("/compte");
  };
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Connexion" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold">Connexion</h1>
      <p className="mt-1 text-sm text-neutral-600">Accédez à votre compte CHINAPAL.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6">
        <div><label className="text-xs font-semibold">Email</label><Input type="email" required /></div>
        <div><label className="text-xs font-semibold">Mot de passe</label><Input type="password" required /></div>
        <Button type="submit" className="w-full" size="lg">Se connecter</Button>
        <p className="text-center text-sm text-neutral-600">Pas encore de compte ? <Link href="/inscription" className="font-semibold text-brand-red hover:underline">Inscription</Link></p>
      </form>
    </div>
  );
}
