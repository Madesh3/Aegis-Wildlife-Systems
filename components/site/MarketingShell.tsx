import { Suspense, type ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Suspense fallback={<div className="h-20" />}>
        <SiteHeader />
      </Suspense>
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
