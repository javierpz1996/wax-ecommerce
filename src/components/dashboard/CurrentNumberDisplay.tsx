type CurrentNumberDisplayProps = {
  number: string;
};

export function CurrentNumberDisplay({ number }: CurrentNumberDisplayProps) {
  return (
    <div className="space-y-2 md:space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--pac-yellow)] md:text-sm" style={{ textShadow: "0 0 8px rgba(255,230,0,0.6), 0 0 0 2px var(--pac-outline)" }}>
        Número actual
      </p>
      <div className="rounded-md border-2 border-[var(--pac-outline)] bg-black px-4 py-3 text-center text-sm font-bold tracking-widest text-[var(--pac-yellow)] md:rounded-lg md:px-6 md:py-4 md:text-base" style={{ textShadow: "0 0 10px rgba(255,230,0,0.5)" }}>
        {number}
      </div>
    </div>
  );
}
