type CurrentNumberDisplayProps = {
  number: string;
};

export function CurrentNumberDisplay({ number }: CurrentNumberDisplayProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3">

      <p
        className="text-center font-bold font-pixelify uppercase tracking-[0.3em] text-sm"
      >
        Número actual
      </p>

      <div
        className="
          w-full 
          max-w-[260px] 
          text-center 
          rounded-xl 
          px-6 
          py-3 
          text-base 
          font-bold 
          tracking-widest 
          transition-all 
          duration-300 
          hover:scale-105
          backdrop-blur-md
        "
        style={{
          background: "linear-gradient(135deg, rgba(147,51,234,0.35), rgba(0,229,255,0.35))",
          border: "1px solid rgba(147,51,234,0.6)",
          color: "#ffffff",
          boxShadow: `
            0 0 30px rgba(147,51,234,0.45),
            inset 0 0 25px rgba(0,229,255,0.25)
          `,
        }}
      >
        {number}
      </div>

    </div>
  );
}