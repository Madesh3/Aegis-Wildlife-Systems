import { Suspense, type ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="label flex items-center justify-between border-b border-line bg-panel-2 px-4 py-1.5 sm:px-6">
        <span>Concept demonstration</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ok" />
          Simulation only
        </span>
      </div>
      <Suspense
        fallback={<div className="h-14 border-b border-line bg-canvas/85" />}
      >
        <SiteHeader />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
