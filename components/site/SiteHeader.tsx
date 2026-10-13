"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";
import { Mark } from "./Mark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <Mark className="h-5 w-5" />
          <span className="text-[12px] font-medium tracking-[0.18em] uppercase sm:text-[13px] sm:tracking-[0.22em]">
            <span className="sm:hidden">Aegis</span>
            <span className="hidden sm:inline">Aegis Wildlife Systems</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`label !text-[11px] transition-colors ${
                  active ? "!text-cyan" : "hover:!text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="border border-ink bg-ink px-3 py-1.5 text-[11px] tracking-[0.16em] text-canvas uppercase"
          >
            Request briefing
          </Link>
        </nav>

        <button
          type="button"
          className="label md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label !text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="label !text-cyan" onClick={() => setOpen(false)}>
              Request briefing
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
