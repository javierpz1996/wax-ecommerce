import Link from "next/link";

const baseClasses =
  "inline-flex items-center justify-center px-5 h-11 text-sm font-bold bg-white text-black";

export function Button({ href, className = "", children, ...rest }) {
  const classes = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line react/button-has-type
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

