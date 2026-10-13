import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
type Variant = "solid" | "ghost" | "cyan";
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
  const cls = `aegis-button button-${variant} ${className}`;
  const content = (
    <>
      {children}
      <Icon name="arrow" size={17} />
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {content}
    </Link>
  ) : (
    <button type={type ?? "button"} className={cls}>
      {content}
    </button>
  );
}
