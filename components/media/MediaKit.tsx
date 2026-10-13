"use client";

import { useState } from "react";

const POSTS = [
  {
    id: "mission",
    channel: "Short introduction",
    title: "An invitation to build together",
    body: `I’m developing Aegis Wildlife Systems—an early-stage concept for helping zoo and wildlife teams protect people and animals.

I have an idea and a simulation prototype. Now I’m looking for zoo teams, builders, researchers, and like-minded people to help shape what comes next.

If the mission interests you, let’s connect.

aegiswildlife.systems/contact`,
  },
  {
    id: "zoo",
    channel: "For wildlife teams",
    title: "Learn from the people doing the work",
    body: `Do you work at a zoo, wildlife park, or sanctuary? I’d love to learn from your experience.

I’m exploring Aegis: a concept that could bring cameras, sensor information, and team coordination into one shared view. There’s an early simulation to make the idea tangible, but real-world insight is what will help shape it.

A conversation, honest feedback, or an introduction would mean a lot.

aegiswildlife.systems/contact`,
  },
  {
    id: "builders",
    channel: "For collaborators",
    title: "A shared problem to explore",
    body: `I’m looking to connect with engineers, designers, researchers, and animal-care specialists who care about protecting people and wildlife.

Aegis is at the concept and prototype stage. I’m exploring sensing, a common operating picture, and human-led response for wildlife facilities.

If you’d like to exchange ideas, explore building together, or share a relevant opportunity, I’d love to hear from you.

aegiswildlife.systems/contact`,
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
