import type { Metadata } from "next";
import { Button } from "@/components/site/Button";
import { MarketingShell } from "@/components/site/MarketingShell";
import { SentinelPrototype } from "@/components/sentinel/SentinelPrototype";

export const metadata: Metadata = {
  title: "Sentinel",
  description:
    "Sentinel is a concept edge camera and sensor node for animal-facility barriers — observe, detect, verify, communicate.",
};

export default function SentinelPage() {
  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <p className="label !text-cyan">Hardware · concept</p>
          <h1 className="mt-4 text-5xl tracking-tight">Sentinel</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            A ruggedized fixed node that watches approach zones and public
            barriers. Sentinel observes, detects, verifies, and communicates. It
            is a safety system, not a weapon system.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <SentinelPrototype />
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
          <div className="label mb-6">Concept specifications</div>
          <p className="mb-8 max-w-2xl text-sm text-amber">
            Marketing numbers do not establish coverage. A production node is
            selected and aimed from a formal site survey, species, enclosure
            geometry, and lighting.
          </p>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Form", "Fixed enclosure node"],
              ["Sensing", "Day / low-light + optional thermal"],
              ["Compute", "On-node detect, track, buffer"],
              ["Health", "Tamper, obstruction, freeze, power"],
              ["Comms", "Authenticated encrypted uplink"],
              ["Degrade", "Store-and-forward + coverage flag"],
              ["Power", "Site power + battery hold-up"],
              ["Status", "Concept · not fielded"],
            ].map(([k, v]) => (
              <div key={k} className="bg-canvas px-5 py-4">
                <div className="label">{k}</div>
                <div className="mt-2 text-sm">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-3">
            <Button href="/command">See it in command</Button>
            <Button href="/contact" variant="ghost">
              Talk to operations
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
