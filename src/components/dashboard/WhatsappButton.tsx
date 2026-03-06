type WhatsappButtonProps = {
  label?: string;
  href?: string;
};

export function WhatsappButton({
  label = "Escribinos por WhatsApp",
  href = "https://wa.me/5491112345678",
}: WhatsappButtonProps) {
  return (
    <div className="mt-6 flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full max-w-[260px]"
      >
        {/* Glow exterior */}
        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 opacity-70 blur-md transition duration-300 group-hover:opacity-100" />

        {/* Botón */}
        <div
          className="
            relative
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-black
            px-6
            py-3
            text-sm
            font-bold
            tracking-wide
            border border-white/10
            transition-all
            duration-300
            group-hover:scale-105
          "
        >
          {/* Icono WhatsApp real */}
          <svg
            viewBox="0 0 32 32"
            className="h-4 w-4 text-green-400 drop-shadow-[0_0_6px_#22c55e]"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2.1 7.8L0 32l8.4-2.5c2.3 1.2 4.8 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.5 1.5-4.8-.3-.5C3.8 20.7 3.2 18.4 3.2 16 3.2 8.8 8.8 3.2 16 3.2S28.8 8.8 28.8 16 23.2 28.7 16 28.7zm7.2-9.7c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8 0 1.6 1.2 3.2 1.4 3.4.2.2 2.3 3.6 5.6 5 .8.3 1.3.5 1.8.7.8.3 1.6.3 2.2.2.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5z"
            />
          </svg>

          <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_6px_#22c55e]">
            {label}
          </span>
        </div>
      </a>
    </div>
  );
}