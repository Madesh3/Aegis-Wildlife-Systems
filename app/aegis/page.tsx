import type { Metadata } from "next";
import { Button } from "@/components/site/Button";
import { MarketingShell } from "@/components/site/MarketingShell";

export const metadata: Metadata = {
  title: "Aegis",
  description:
    "The Aegis common operating picture for zoos and wildlife parks — fusion, health, playbooks, and human command.",
};

export default function AegisPage() {
  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <p className="label !text-cyan">Software</p>
          <h1 className="mt-4 max-w-3xl text-5xl tracking-tight">Aegis</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Fragmented cameras become a shared incident picture: where it is,
            which sensors agree, what is uncertain, who has command, and which
            approved check comes next.
          </p>
          <div className="mt-8 flex gap-3">
            <Button href="/command">Open command</Button>
            <Button href="/sentinel" variant="ghost">
              Sentinel nodes
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-line md:grid-cols-3">
          {[
            [
              "Command center",
              "A mission surface, not a wall of video. Map, live views, event stream, and incident chrome on one pane.",
            ],
            [
              "Enclosure intelligence",
              "Each habitat carries live views, movement, observable behavior classes, risk, and component health.",
            ],
            [
              "Incident intelligence",
              "When an event is declared: evidence, timeline, playbook, ownership, and an after-action record.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="bg-canvas p-8">
              <h2 className="text-xl tracking-tight">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="label">Sensor fusion</div>
          <h2 className="mt-4 max-w-2xl text-3xl tracking-tight">
            A camera track plus a quiet gate is not the same as a confirmed entry.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Aegis preserves source, timestamp, quality, and confidence. Conflicting
            evidence stays visible: “camera indicates entry; gate sensor unchanged.”
            Behavior analytics report observable patterns, not medical diagnoses.
          </p>
          <div className="mt-10 overflow-x-auto border border-line">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-panel-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Alone</th>
                  <th className="px-4 py-3">With corroboration</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {[
                  ["Visible camera", "Track, zone, obstruction", "Early warning", "Primary visual evidence"],
                  ["Fence / boundary", "Vibration or break", "Low confidence", "Independent crossing cue"],
                  ["Gate / lock", "State of transfer and public doors", "Health / procedure", "Rules out or confirms path"],
                  ["Access control", "Keeper in authorized zone", "Context", "Reduces nuisance alerts"],
                  ["Edge health", "Power, freeze, tamper", "Coverage map", "Safe degradation"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-line">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:grid md:grid-cols-2 md:gap-16">
          <div>
            <div className="label">Accountability</div>
            <h2 className="mt-4 text-3xl tracking-tight">Every action has an owner.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Acknowledgements, approvals, configuration changes, and exports are
              logged. High-impact actions require stronger control than an
              acknowledgement: role restriction, deliberate confirm, and a clear
              abort path. Exact mechanisms come from site risk analysis — not from
              the demo.
            </p>
          </div>
          <div>
            <div className="label">Limits</div>
            <h2 className="mt-4 text-3xl tracking-tight">Aegis does not act for you.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              No autonomous gates, deterrents, or physical intervention. No claim
              of guaranteed detection. Models are versioned and rollback-capable.
              Safety-critical rules do not ride an unreviewed model update.
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
