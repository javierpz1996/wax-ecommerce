type CurrentNumberDisplayProps = {
  number: string;
};

export function CurrentNumberDisplay({ number }: CurrentNumberDisplayProps) {
  return (
    <div className="mt-4 md:mt-6 flex flex-col items-center gap-3 md:gap-4">
      <p className="text-center font-bold font-pixelify uppercase tracking-[0.3em] text-sm text-white/80">
        Número actual
      </p>
      <div className="relative group w-full max-w-[260px]">

        {/* Glow exterior */}
        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md group-hover:opacity-100 transition duration-300" />

        {/* Botón principal */}
        <div className="
          relative
          rounded-xl
          bg-black
          px-6
          py-3
          text-base
          font-bold
          tracking-widest
          text-white
          text-center
          border border-white/10
          transition-all
          duration-300
          group-hover:scale-105
        ">
          {number}
        </div>

      </div>
    </div>
  );
}