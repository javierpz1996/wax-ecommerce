type WhatsappButtonProps = {
  label?: string;
  href?: string;
};

export function WhatsappButton({
  label = "Escribir por WhatsApp",
  href = "https://wa.me/5491112345678",
}: WhatsappButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-[var(--pac-outline)] bg-[#00d29480] py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--pac-outline)] transition-all hover:brightness-110 active:translate-y-0.5 active:shadow-none md:rounded-lg md:py-4 md:text-base"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10 md:h-6 md:w-6">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 md:h-4 md:w-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M20.52 3.48A11.77 11.77 0 0 0 12.04 0C5.74.03.6 5.2.62 11.49c0 2.03.53 4 1.54 5.74L0 24l7-2.11a11.9 11.9 0 0 0 5.03 1.14h.01c6.3-.03 11.44-5.2 11.42-11.5a11.7 11.7 0 0 0-3.94-7.95m-8.48 17.3h-.01c-1.6 0-3.17-.43-4.54-1.24l-.33-.2-4.16 1.25 1.28-4.05-.22-.34a9.37 9.37 0 0 1-1.45-5.02C2.6 6.38 6.7 2.3 12 2.3c2.48 0 4.81.97 6.57 2.73a9.2 9.2 0 0 1 2.72 6.57c.01 5.31-4.08 9.4-9.25 9.42m5.08-7.07c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.08-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.33.41-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.55-.46-.47-.64-.48h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43 0 1.43 1.03 2.8 1.18 2.99.14.19 2.03 3.21 4.92 4.5.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.33"
          />
        </svg>
      </span>
      <span>{label}</span>
    </a>
  );
}