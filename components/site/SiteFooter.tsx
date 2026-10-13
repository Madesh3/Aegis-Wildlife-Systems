import Link from "next/link";
import { Mark } from "./Mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Mark className="h-5 w-5" />
            <span className="text-[13px] tracking-[0.2em] uppercase">
              Aegis Wildlife Systems
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Decision support for zoos, wildlife parks, and sanctuaries. Software
            supplements barriers, locks, procedures, and trained teams. It does
            not replace them.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="label mb-3">Product</div>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/aegis" className="hover:text-ink">
                Aegis
              </Link>
            </li>
            <li>
              <Link href="/sentinel" className="hover:text-ink">
                Sentinel
              </Link>
            </li>
            <li>
              <Link href="/command" className="hover:text-ink">
                Command
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="label mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/company" className="hover:text-ink">
                Mission
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-ink">
                Briefing
              </Link>
            </li>
            <li>
              <Link href="/media" className="hover:text-ink">
                Media
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="label mb-3">Status</div>
          <p className="text-sm leading-6 text-muted">
            Stage 1 concept demonstration. Simulated events and metrics. Not a
            fielded safety system. Not affiliated with Anduril Industries or
            Palantir Technologies.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-4 text-[11px] tracking-wide text-dim sm:px-6 sm:flex-row sm:justify-between">
          <span>© 2026 Aegis Wildlife Systems</span>
          <span>Human authority at every safety-critical boundary</span>
        </div>
      </div>
    </footer>
  );
}
