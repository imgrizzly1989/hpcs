export function TrustStats() {
  const stats = [
    { n: "12", l: "Marques chinoises couvertes" },
    { n: "500+", l: "Références en catalogue" },
    { n: "24-72h", l: "Livraison partout au Maroc" },
  ];
  return (
    <section className="bg-brand-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red">NOTRE ENGAGEMENT</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
            Une entreprise basée à Casablanca, au service de <span className="text-brand-red">tout le Maroc</span>
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-300 leading-relaxed">
            De Tanger à Dakhla, d&apos;Oujda à Agadir — CHINAPAL approvisionne particuliers, garages et revendeurs avec des pièces vérifiées et une expertise dédiée aux voitures chinoises.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.l} className="border-t-4 border-brand-red pt-5">
              <p className="font-display text-5xl md:text-6xl font-black text-white">{s.n}</p>
              <p className="mt-2 text-sm text-neutral-300">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
