import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const baseClasses =
  "inline-flex items-center justify-center px-5 h-11 text-sm font-bold bg-white text-black transition hover:opacity-80";

export function Button({
  href,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
