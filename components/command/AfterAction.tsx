"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Corners } from "@/components/site/Corners";
import { T } from "@/lib/demo/engine";
import type { DemoFlags } from "@/lib/demo/types";

export function AfterAction({
  stateClock,
  elapsed,
  flags,
  onReset,
}: {
  stateClock: string;
  elapsed: number;
  flags: DemoFlags;
  onReset: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  const detect = (T.warning / 500).toFixed(0);
  const corroborate = (T.cross / 500).toFixed(0);
  const ack = flags.ackAt != null ? (flags.ackAt / 500).toFixed(0) : "—";
  return (
    <dialog
      ref={dialog}
      className="after-action-dialog"
      aria-labelledby="review-title"
    >
      <div className="relative w-full max-w-xl border border-line bg-panel p-6">
        <Corners />
        <div className="label mb-3">After-action review</div>
        <h2 id="review-title" className="text-xl tracking-tight">
          HAB-01 public barrier · closed
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Operator-led resolution at {stateClock}. AI detections remained
          advisory. CAM-04 failed after acknowledgement; CAM-05 provided
          overlapping coverage.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-[12px]">
          <div>
            <dt className="label">Detect</dt>
            <dd>T+{detect}s</dd>
          </div>
          <div>
            <dt className="label">Corroborate</dt>
            <dd>T+{corroborate}s</dd>
          </div>
          <div>
            <dt className="label">Acknowledge</dt>
            <dd>T+{ack}s</dd>
          </div>
          <div>
            <dt className="label">Scenario runtime</dt>
            <dd>{(elapsed / 1000).toFixed(1)}s</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="border border-ink bg-ink px-4 py-2 text-[12px] tracking-[0.14em] text-canvas uppercase"
          >
            Run again
          </button>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="border border-line px-4 py-2 text-xs"
          >
            Review facility
          </button>
          <Link
            href="/contact"
            className="border border-line px-4 py-2 text-[12px] tracking-[0.14em] uppercase"
          >
            Share your perspective
          </Link>
        </div>
      </div>
    </dialog>
  );
}
