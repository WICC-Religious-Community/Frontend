export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-display-sm font-semibold text-ink">{value}</p>
      <p className="text-subtle mt-1 text-label uppercase tracking-wide">{label}</p>
    </div>
  );
}
