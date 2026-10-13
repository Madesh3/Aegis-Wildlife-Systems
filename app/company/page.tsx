import type { Metadata } from "next";
import { Button } from "@/components/site/Button";
import { MarketingShell } from "@/components/site/MarketingShell";

export const metadata: Metadata = {
  title: "Our mission",
  description:
    "The idea behind Aegis and an invitation to zoo teams, builders, researchers, and like-minded people to help shape its future.",
};

const PRINCIPLES = [
  [
    "Prevent before responding",
    "Detect unsafe approach and boundary behavior as early as practical.",
  ],
  [
    "Physical safety remains primary",
    "Software supplements barriers, locks, procedures, and trained teams.",
  ],
  [
    "Protect humans and animals together",
    "The safest response reduces risk without unnecessary distress.",
  ],
  [
    "Fuse evidence, do not hide uncertainty",
    "Show supporting sensors, confidence, and conflicting or missing data.",
  ],
  [
    "Keep humans in command",
    "AI may detect, prioritize, and recommend. Authorized staff decide and act.",
  ],
  [
    "Degrade safely",
    "Loss of a camera, network, or server must be visible. Never imply an area is protected.",
  ],
  [
    "Design for accountability",
    "Record acknowledgements, approvals, actions, system state, and evidence.",
  ],
  [
    "Validate in the real environment",
    "Weather, darkness, vegetation, crowds, and enclosure geometry change performance.",
  ],
];

export default function CompanyPage() {
  return (
    <MarketingShell>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <p className="label !text-cyan">Our mission</p>
          <h1 className="mt-4 max-w-3xl text-5xl tracking-tight">
            A concept today. A shared mission next.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            I’m developing Aegis around one question: how can technology help
            the people who care for wildlife see risks earlier and respond with
            more clarity? The concept combines sensing, intelligence, and human
            judgment. The next step is building the relationships that can help
            turn it into something useful.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            I’m looking for people who know the problem, people who want to
            build, and people who can open a door. If the mission resonates, I’d
            love to connect.
          </p>
          <div className="mt-8">
            <Button href="/contact">Join the conversation</Button>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="label">The principles guiding the idea</div>
          <div className="mt-8 divide-y divide-line">
            {PRINCIPLES.map(([title, body], i) => (
              <div
                key={title}
                className="grid grid-cols-[64px_1fr] gap-4 py-5 md:grid-cols-[80px_280px_1fr]"
              >
                <span className="font-mono text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="tracking-tight">{title}</h2>
                <p className="col-start-2 text-sm leading-6 text-muted md:col-auto">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:grid md:grid-cols-2 md:gap-16">
          <div>
            <div className="label">The path ahead</div>
            <h2 className="mt-4 text-3xl tracking-tight">
              Staged. Measurable. Reversible.
            </h2>
            <ol className="mt-6 space-y-4 text-sm leading-6 text-muted">
              <li>
                <span className="text-ink">Stage 0.</span> Interviews with
                keepers, veterinarians, security, and operations. One narrow
                scenario.
              </li>
              <li>
                <span className="text-ink">Stage 1.</span> This site:
                simulation-only command, fusion, and playbook.
              </li>
              <li>
                <span className="text-ink">Stage 2–4.</span> Recorded video,
                shadow mode, then advisory live alerts. No physical control.
              </li>
              <li>
                <span className="text-ink">Out of scope.</span> Autonomous
                intervention of any kind.
              </li>
            </ol>
          </div>
          <div>
            <div className="label">An open invitation</div>
            <h2 className="mt-4 text-3xl tracking-tight">
              Your perspective could shape this.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Work at a zoo or sanctuary? Have experience in engineering,
              design, research, or animal care? See a partnership, a relevant
              opportunity, or someone I should meet? There are many ways to
              contribute, and the first step can be a simple introduction.
            </p>
            <div className="mt-8">
              <Button href="/contact">Let’s connect</Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
