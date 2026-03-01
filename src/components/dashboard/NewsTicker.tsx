type NewsTickerProps = {
  text?: string;
};

export function NewsTicker({
  text = "Promos activas esta semana · Stock limitado · Escríbenos por WhatsApp para pedidos personalizados.",
}: NewsTickerProps) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--pac-outline)] bg-[var(--pac-dark)] px-3 py-2 text-[11px] uppercase tracking-widest text-[rgb(255,105,180)] md:px-4 md:py-2.5 md:text-xs">
      <div className="marquee whitespace-nowrap">
        <span className="[text-shadow:0_0_6px_rgba(255,105,180,0.8),0_0_12px_rgba(255,105,180,0.6)]">
          {text}
        </span>
        <span className="ml-8 [text-shadow:0_0_8px_rgba(255,105,180,1),0_0_16px_rgba(255,105,180,0.9),0_0_24px_rgba(255,105,180,0.7)]">
          {text}
        </span>
      </div>
    </div>
  );
}