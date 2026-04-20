import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-6xl font-black text-brand-red">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2 text-sm text-neutral-600">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-6 inline-block"><Button>Retour à l&apos;accueil</Button></Link>
    </div>
  );
}
