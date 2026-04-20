export function ProductSpecs({ specs }: { specs: Record<string, string> }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(specs).map(([k, v], i) => (
            <tr key={k} className={i % 2 === 0 ? "bg-neutral-50" : "bg-white"}>
              <td className="px-4 py-2.5 font-medium text-neutral-600 w-1/2">{k}</td>
              <td className="px-4 py-2.5 text-brand-charcoal">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
