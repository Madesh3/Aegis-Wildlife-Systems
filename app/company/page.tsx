import type { Metadata } from "next";
import { Button } from "@/components/site/Button";
import { MarketingShell } from "@/components/site/MarketingShell";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Aegis Wildlife Systems builds decision-support software so trained zoo and sanctuary teams can see risk earlier and keep command.",
};

const PRINCIPLES = [
  ["Prevent before responding", "Detect unsafe approach and boundary behavior as early as practical."],
  ["Physical safety remains primary", "Software supplements barriers, locks, procedures, and trained teams."],
  ["Protect humans and animals together", "The safest response reduces risk without unnecessary distress."],
  ["Fuse evidence, do not hide uncertainty", "Show supporting sensors, confidence, and conflicting or missing data."],
  ["Keep humans in command", "AI may detect, prioritize, and recommend. Authorized staff decide and act."],
  ["Degrade safely", "Loss of a camera, network, or server must be visible. Never imply an area is protected."],
  ["Design for accountability", "Record acknowledgements, approvals, actions, system state, and evidence."],
  ["Validate in the real environment", "Weather, darkness, vegetation, crowds, and enclosure geometry change performance."],
];

export default function CompanyPage() {
  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <p className="label !text-cyan">Company</p>
          <h1 className="mt-4 max-w-3xl text-5xl tracking-tight">
            Protect people and animals with a picture operators can trust.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Aegis Wildlife Systems is building an AI-assisted safety and animal
            intelligence layer for managed animal facilities. The engineering
            habits come from mission-critical systems: fuse observations, fail
            visibly, keep a human on the loop. The mission is different.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="label">Principles</div>
          <div className="mt-8 divide-y divide-line">
            {PRINCIPLES.map(([title, body], i) => (
              <div key={title} className="grid grid-cols-[64px_1fr] gap-4 py-5 md:grid-cols-[80px_280px_1fr]">
                <span className="font-mono text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="tracking-tight">{title}</h2>
                <p className="text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:grid md:grid-cols-2 md:gap-16">
          <div>
            <div className="label">Validation path</div>
            <h2 className="mt-4 text-3xl tracking-tight">Staged. Measurable. Reversible.</h2>
            <ol className="mt-6 space-y-4 text-sm leading-6 text-muted">
              <li>
                <span className="text-ink">Stage 0.</span> Interviews with keepers,
                veterinarians, security, and operations. One narrow scenario.
              </li>
              <li>
                <span className="text-ink">Stage 1.</span> This site: simulation-only
                command, fusion, and playbook.
              </li>
              <li>
                <span className="text-ink">Stage 2–4.</span> Recorded video, shadow
                mode, then advisory live alerts. No physical control.
              </li>
              <li>
                <span className="text-ink">Out of scope.</span> Autonomous
                intervention of any kind.
              </li>
            </ol>
          </div>
          <div>
            <div className="label">Affiliation</div>
            <h2 className="mt-4 text-3xl tracking-tight">Independent work.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Aegis Wildlife Systems is not affiliated with, endorsed by, or
              modeled on proprietary technology from Anduril Industries or
              Palantir Technologies. Visual language and systems ideas — sensor
              fusion, resilient edge, operator-centered command — are used here
              for a zoo and sanctuary mission.
            </p>
            <div className="mt-8">
              <Button href="/contact">Request a briefing</Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
