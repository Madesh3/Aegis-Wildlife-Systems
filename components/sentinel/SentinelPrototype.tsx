"use client";

import dynamic from "next/dynamic";

const SentinelStage = dynamic(
  () => import("./SentinelStage").then((m) => m.SentinelStage),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[420px] items-center justify-center bg-canvas font-mono text-[12px] tracking-[0.18em] text-muted uppercase md:min-h-[560px]">
        Loading prototype
      </div>
    ),
  },
);

export function SentinelPrototype() {
  return <SentinelStage />;
}
