type NewsTickerProps = {
  text?: string;
};

export function NewsTicker({
  text = "Promos activas esta semana Stock limitado Escríbenos por WhatsApp para pedidos personalizados ",
}: NewsTickerProps) {
  return (
    <div
      className="overflow-hidden rounded-md py-3 text-[12px] uppercase tracking-widest text-pink-400"
      style={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,150,0.08) 50%, rgba(0,0,0,1) 100%)",
      }}
    >
      <div className="flex w-max animate-marquee">

        <span className="animate-neon font-extrabold whitespace-nowrap [text-shadow:
          0_0_4px_#fff,
          0_0_10px_#ff00aa,
          0_0_20px_#ff00aa,
          0_0_40px_#ff0080,
          0_0_80px_#ff0080,
          0_0_120px_#ff0080]">
          {text}
        </span>

        <span className="animate-neon font-extrabold whitespace-nowrap [text-shadow:
          0_0_4px_#fff,
          0_0_10px_#ff00aa,
          0_0_20px_#ff00aa,
          0_0_40px_#ff0080,
          0_0_80px_#ff0080,
          0_0_120px_#ff0080]">
          {text}
        </span>

        <span className="animate-neon font-extrabold whitespace-nowrap [text-shadow:
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