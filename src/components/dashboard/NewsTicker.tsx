type NewsTickerProps = {
  text?: string;
};

export function NewsTicker({
  text = "Promos activas esta semana · Stock limitado · Escríbenos por WhatsApp para pedidos personalizados.",
}: NewsTickerProps) {
  return (
    <div className="overflow-hidden rounded-md border-2 border-pink-500 bg-black px-4 py-3 text-[15px] uppercase tracking-widest text-pink-400 shadow-[0_0_25px_rgba(255,0,150,0.8),inset_0_0_15px_rgba(255,0,150,0.4)]">
      
      <div className="marquee whitespace-nowrap">

        <span className="animate-neon font-extrabold [text-shadow:
          0_0_4px_#fff,
          0_0_10px_#ff00aa,
          0_0_20px_#ff00aa,
          0_0_40px_#ff0080,
          0_0_80px_#ff0080,
          0_0_120px_#ff0080]">
          {text}
        </span>

        <span className="ml-2 animate-neon font-extrabold [text-shadow:
          0_0_4px_#fff,
          0_0_10px_#ff00aa,
          0_0_20px_#ff00aa,
          0_0_40px_#ff0080,
          0_0_80px_#ff0080,
          0_0_120px_#ff0080]">
          {text}
        </span>

      </div>
    </div>
  );
}