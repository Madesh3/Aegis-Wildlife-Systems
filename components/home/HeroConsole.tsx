"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FacilityMap } from "@/components/command/FacilityMap";
import { deriveState, initialFlags } from "@/lib/demo/engine";
import { Corners } from "@/components/site/Corners";

export function HeroConsole() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let last = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setElapsed((e) => {
        const next = e + dt;
        return next > 22000 ? 0 : next;
      });
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const state = useMemo(
    () => deriveState(elapsed, initialFlags(), "CAM-04"),
    [elapsed],
  );

  return (
    <div className="relative">
      <Corners />
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="label !text-cyan">Aegis command</span>
          <span className="label">Northridge Wildlife Park</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="label !text-amber">Simulation</span>
          <span className="font-mono text-[12px]">{state.clock}</span>
        </div>
      </div>
      <div className="h-[340px] md:h-[420px]">
        <FacilityMap state={state} compact />
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-2">
        <span className="font-mono text-[11px] text-muted">
          {state.events[0]?.title ?? "All nodes healthy"}
        </span>
        <Link href="/command" className="label !text-cyan">
          Launch full simulation →
        </Link>
      </div>
    </div>
  );
}
