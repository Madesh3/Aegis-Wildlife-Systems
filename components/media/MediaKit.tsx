"use client";

import { useState } from "react";

const POSTS = [
  {
    id: "x1",
    channel: "X",
    title: "Operating picture, not another wall of cameras",
    body: `A common operating picture for zoos — not another wall of cameras.

AEGIS fuses cameras, gate state, and boundary sensors so keepers see what happened, what is uncertain, and who has command.

Simulation only. Humans stay in control.

aegiswildlife.systems/command`,
  },
  {
    id: "x2",
    channel: "X",
    title: "The barrier moment",
    body: `If a visitor approaches a restricted boundary, staff should not have to hunt through feeds.

AEGIS COMMAND is a tabletop of that moment: corroboration, degraded coverage, an approved playbook.

Built for animal facilities. Software does not replace steel or trained teams.

aegiswildlife.systems`,
  },
  {
    id: "x3",
    channel: "X",
    title: "Sentinel node",
    body: `SENTINEL is a concept edge node: day/night optic, optional thermal, local buffer, signed health.

Coverage still starts with a site survey.

Looking for zoo operations and animal-care leads for a 20-minute tabletop.

aegiswildlife.systems/sentinel`,
  },
  {
    id: "li-zoo",
    channel: "LinkedIn",
    title: "For zoo / wildlife operations",
    body: `I'm building Aegis Wildlife Systems — an AI-assisted safety layer for zoos, wildlife parks, and sanctuaries.

The problem is not a lack of cameras. When something happens at a public barrier, staff need a verified location, the relevant views, independent sensor agreement, system health, and a playbook with a named owner.

AEGIS COMMAND is a simulation-only tabletop of that workflow. SENTINEL is a concept edge node: observe, detect, verify, communicate. It does not replace barriers, locks, or trained teams, and it does not act on its own.

If you lead operations, animal care, or emergency response at a managed animal facility, I would value a 20-minute conversation — not a sales pitch.

aegiswildlife.systems`,
  },
  {
    id: "li-eng",
    channel: "LinkedIn",
    title: "Systems / portfolio version",
    body: `I designed and built Aegis Wildlife Systems: a simulation-only command system for animal-facility safety.

The work is operator-centered decision support — sensor fusion with visible uncertainty, human-in-the-loop incident command, explicit coverage degradation, audit-friendly playbooks, and a ruggedized edge-node concept.

I care about systems that still tell the truth when a camera fails, a network drops, or two sensors disagree. That is the standard I want to be measured by.

Demo: aegiswildlife.systems/command`,
  },
  {
    id: "dm",
    channel: "First DM",
    title: "Zoo operations / director",
    body: `Hello — I'm building a tabletop command system for zoo safety (public-barrier approach / crossing). It is simulation-only and keeps keepers and vets in command.

Would you or your operations / animal-care lead be open to a 20-minute look? Happy to send the link first: aegiswildlife.systems/command`,
  },
];

export function MediaKit() {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {POSTS.map((post) => (
        <article key={post.id} className="border border-line">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <div className="label">{post.channel}</div>
              <h2 className="mt-1 tracking-tight">{post.title}</h2>
            </div>
            <button
              type="button"
              className="label border border-line px-2 py-1 hover:!text-ink"
              onClick={async () => {
                await navigator.clipboard.writeText(post.body);
                setCopied(post.id);
                setTimeout(() => setCopied(null), 1500);
              }}
            >
              {copied === post.id ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="whitespace-pre-wrap px-4 py-4 font-sans text-sm leading-7 text-muted">
            {post.body}
          </pre>
        </article>
      ))}
    </div>
  );
}
