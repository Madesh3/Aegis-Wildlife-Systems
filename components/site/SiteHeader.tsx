"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { Mark } from "./Mark";
import { Icon } from "./Icon";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          href="/"
          aria-label="Aegis Wildlife Systems home"
          className="brand"
        >
          <Mark className="brand-mark" />
          <span className="brand-name">
            AEGIS<span>WILDLIFE SYSTEMS</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
              <span className="nav-dot" />
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-cta">
          Get involved <Icon name="external" size={15} />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="mobile-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...NAV, { href: "/contact", label: "Get involved" }].map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
