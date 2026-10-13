import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "solid" | "ghost" | "cyan";

const styles: Record<Variant, string> = {
  solid:
    "bg-ink text-canvas hover:bg-white border border-ink",
  ghost:
    "bg-transparent text-ink border border-line hover:border-line-strong hover:bg-panel",
  cyan:
    "bg-transparent text-cyan border border-cyan/40 hover:bg-cyan/10",
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
}) {
  const cls = `inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] tracking-[0.14em] uppercase transition-colors ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={cls}>
      {children}
    </button>
  );
}
