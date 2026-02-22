import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

function classes(variant: Variant) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2";
  if (variant === "primary")
    return `${base} bg-black text-white hover:opacity-90 focus:ring-black`;
  if (variant === "secondary")
    return `${base} bg-white text-black border border-black/15 hover:bg-black/5 focus:ring-black`;
  return `${base} text-black hover:bg-black/5 focus:ring-black`;
}

export function AppButton(props: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  ariaLabel?: string;
}) {
  const { href, children, variant = "primary", external = false, ariaLabel } = props;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classes(variant)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes(variant)}>
      {children}
    </Link>
  );
}
