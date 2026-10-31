export function PagePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </section>
  );
}
