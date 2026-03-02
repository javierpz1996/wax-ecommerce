type CurrentNumberDisplayProps = {
  number: string;
};

export function CurrentNumberDisplay({ number }: CurrentNumberDisplayProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      
      <p
        className="text-center font-bold font-pixelify uppercase tracking-[0.25em]"
        style={{
          color: "rgb(255,105,180)",
          textShadow: `
            0 0 6px rgb(255,105,180),
            0 0 12px rgba(255,105,180,0.8),
            0 0 24px rgba(255,105,180,0.6)
          `,
        }}
      >
        Nuestro número
      </p>

      <div
        className="w-full max-w-xs text-center rounded-xl bg-black px-8 py-5 text-lg font-bold tracking-widest transition-all duration-300 hover:scale-105"
        style={{
          color: "rgb(255,105,180)",
          border: "2px solid rgb(255,105,180)",
          textShadow: `
            0 0 8px rgb(255,105,180),
            0 0 18px rgba(255,105,180,0.9),
            0 0 30px rgba(255,105,180,0.6)
          `,
          boxShadow: `
            0 0 15px rgba(255,105,180,0.6),
            0 0 40px rgba(255,105,180,0.4)
          `,
        }}
      >
        {number}
      </div>

    </div>
  );
}