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
          <h1 className="mt-4 text-5xl tracking-tight">
            Intelligence.
            <br />
            At the edge.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Sentinel is a hardware concept for local sensing at wildlife
            facilities. The interactive model explores the idea. I’m looking to
            connect with hardware builders, researchers, and animal-care teams
            to understand what a useful, responsible field system would need.
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
            <Button href="/contact">Explore collaborating</Button>
            <Button href="/command" variant="ghost">
              View the simulation
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
