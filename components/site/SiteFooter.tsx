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
            An early-stage idea for protecting people and wildlife. Looking for
            zoo teams, collaborators, and like-minded people to help bring it to
            life.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="label mb-3">Explore the idea</div>
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
          <div className="label mb-3">Connect</div>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/company" className="hover:text-ink">
                Mission
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-ink">
                Get involved
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
            Concept & prototype. Open to feedback, introductions, and
            collaboration. All demonstrations use simulated data. Not a deployed
            safety system.
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
