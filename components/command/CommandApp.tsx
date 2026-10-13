"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Mark } from "@/components/site/Mark";
import { Corners } from "@/components/site/Corners";
import { CameraFeed } from "@/components/command/CameraFeed";
import { FacilityMap } from "@/components/command/FacilityMap";
import { deriveState, initialFlags, T } from "@/lib/demo/engine";
import type { DemoFlags, Phase } from "@/lib/demo/types";

const NAV_ITEMS = [
  "Overview",
  "Operations",
  "Enclosures",
  "Animals",
  "Personnel",
  "Incidents",
  "Analytics",
  "Settings",
];

function riskClass(risk: string) {
  if (risk === "CRITICAL") return "text-crit";
  if (risk === "HIGH") return "text-amber";
  if (risk === "ELEVATED") return "text-amber";
  return "text-ok";
}

function kindClass(kind: string) {
  if (kind === "ALERT" || kind === "INC") return "text-crit";
  if (kind === "WARN") return "text-amber";
  if (kind === "SYS") return "text-dim";
  if (kind === "ANI") return "text-amber";
  return "text-cyan";
}

export function CommandApp() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [flags, setFlags] = useState<DemoFlags>(initialFlags);
  const [selectedId, setSelectedId] = useState("CAM-04");
  const [nav, setNav] = useState("Overview");

  const state = useMemo(
    () => deriveState(elapsed, flags, selectedId),
    [elapsed, flags, selectedId],
  );

  useEffect(() => {
    if (!playing) return;
    if (state.waitingForAck || state.waitingForResolve || state.resolved) return;
    let last = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setElapsed((e) => e + dt);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [playing, state.waitingForAck, state.waitingForResolve, state.resolved]);

  const acknowledge = useCallback(() => {
    setFlags((f) =>
      f.acknowledged ? f : { ...f, acknowledged: true, ackAt: elapsed },
    );
    setPlaying(true);
  }, [elapsed]);

  const resolve = useCallback(() => {
    setFlags((f) =>
      f.resolved ? f : { ...f, resolved: true, resolveAt: elapsed },
    );
    setPlaying(false);
  }, [elapsed]);

  const reset = useCallback(() => {
    setElapsed(0);
    setFlags(initialFlags());
    setSelectedId("CAM-04");
    setPlaying(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
      if (e.key === "r" || e.key === "R") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  const selected = state.entities.find((e) => e.id === state.selectedId);

  return (
    <div className="relative flex h-dvh flex-col bg-canvas text-[13px] text-ink">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line bg-panel-2 px-3 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-ink">
            <Mark className="h-4 w-4" />
            <span className="tracking-[0.22em] uppercase">Aegis</span>
          </Link>
          <span className="hidden text-dim sm:inline">/</span>
          <span className="hidden tracking-[0.16em] text-muted uppercase sm:inline">
            Command
          </span>
        </div>
        <div className="label !text-[10px] !text-muted">
          Northridge Wildlife Park · HAB-01 tabletop
        </div>
        <div className="flex items-center justify-end gap-4">
          <span className="label !text-amber">Simulation</span>
          <span className={`label ${state.system === "DEGRADED" ? "!text-crit" : "!text-ok"}`}>
            <span
              className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${
                state.system === "DEGRADED" ? "bg-crit pulse-crit" : "bg-ok"
              }`}
            />
            System {state.system}
          </span>
          <span className="font-mono tabular-nums tracking-wider">{state.clock}</span>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)_320px]">
        <aside className="hidden border-r border-line lg:block">
          <div className="label px-4 py-3">Overview</div>
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setNav(item)}
                className={`px-4 py-2.5 text-left tracking-[0.12em] uppercase ${
                  nav === item
                    ? "border-l-2 border-cyan bg-panel text-cyan"
                    : "border-l-2 border-transparent text-muted hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="mt-8 px-4">
            <div className="label mb-2">Site health</div>
            <HealthRow label="Cameras" value={state.health.cameras} />
            <HealthRow label="Sensors" value={state.health.sensors} />
            <HealthRow label="Edge" value={state.health.edge} />
            <HealthRow label="Network" value={state.health.network} />
          </div>
        </aside>

        <section className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1 p-2">
            <FacilityMap state={state} onSelect={setSelectedId} />
          </div>
          <div className="border-t border-line">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="label">Event stream</span>
              <DemoControls
                playing={playing}
                phase={state.phase}
                waitingForAck={state.waitingForAck}
                waitingForResolve={state.waitingForResolve}
                onPlay={() => setPlaying((p) => !p)}
                onReset={reset}
                onAck={acknowledge}
                onResolve={resolve}
              />
            </div>
            <div className="scrollbar-thin max-h-40 overflow-auto border-t border-line">
              {state.events.map((ev) => (
                <div
                  key={ev.id}
                  className="grid grid-cols-[72px_56px_1fr_minmax(0,180px)] gap-2 border-b border-line/70 px-3 py-1.5 font-mono text-[11px]"
                >
                  <span className="text-dim">{ev.clock}</span>
                  <span className={kindClass(ev.kind)}>{ev.kind}</span>
                  <span>{ev.title}</span>
                  <span className="truncate text-muted">{ev.location}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="flex min-h-0 flex-col border-t border-line lg:border-t-0 lg:border-l">
          <div className="label flex items-center justify-between px-3 py-2">
            <span>Live intelligence</span>
            <span className={riskClass(state.risk)}>Risk {state.risk}</span>
          </div>
          <CameraFeed state={state} />
          <div className="grid grid-cols-2 gap-px border-y border-line bg-line">
            <Meta label="Entity" value={selected?.id ?? state.selectedId} />
            <Meta label="Animal" value={state.animalStatus} />
            <Meta label="Visitor" value={state.visitorStatus} />
            <Meta label="Coverage" value={state.coverage} />
          </div>
          <div className="border-b border-line px-3 py-3">
            <div className="label mb-2">Uncertainty</div>
            <p className="text-[12.5px] leading-5 text-muted">{state.uncertainty}</p>
          </div>
          <div className="border-b border-line px-3 py-3">
            <div className="label mb-2">Evidence</div>
            <div className="space-y-2">
              {state.evidence.map((item) => (
                <div key={item.source} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[11px] text-cyan">{item.source}</div>
                    <div className="text-[12px] text-muted">{item.claim}</div>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <div
                      className={
                        item.status === "degraded" || item.status === "conflicting"
                          ? "text-crit"
                          : item.status === "missing"
                            ? "text-amber"
                            : "text-ok"
                      }
                    >
                      {item.status}
                    </div>
                    <div className="text-dim">{Math.round(item.confidence * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-3 py-3">
            <div className="label mb-2">Approved playbook</div>
            <ol className="space-y-2">
              {state.playbook.map((step, i) => (
                <li key={step.id} className="flex gap-2 font-mono text-[11px]">
                  <span className={step.done ? "text-ok" : "text-dim"}>
                    {step.done ? "▣" : "□"} {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={step.done ? "text-muted" : "text-ink"}>
                    {step.label}
                    <span className="mt-0.5 block text-dim">{step.owner}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {state.waitingForAck ? (
            <div className="border-t border-line p-3">
              <button
                type="button"
                onClick={acknowledge}
                className="w-full border border-amber bg-amber/10 py-2 tracking-[0.14em] text-amber uppercase"
              >
                Acknowledge / assume command
              </button>
            </div>
          ) : null}
          {state.waitingForResolve ? (
            <div className="border-t border-line p-3">
              <button
                type="button"
                onClick={resolve}
                className="w-full border border-ok bg-ok/10 py-2 tracking-[0.14em] text-ok uppercase"
              >
                Record all-clear
              </button>
            </div>
          ) : null}
        </aside>
      </div>

      {state.resolved ? <AfterAction stateClock={state.clock} elapsed={elapsed} flags={flags} onReset={reset} /> : null}
    </div>
  );
}

function HealthRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-2">
      <div className="mb-1 flex justify-between font-mono text-[10px] text-dim">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-px bg-line">
        <div
          className={`h-px ${value < 95 ? "bg-crit" : "bg-cyan"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel px-3 py-2">
      <div className="label">{label}</div>
      <div className="mt-1 font-mono text-[11px]">{value}</div>
    </div>
  );
}

function DemoControls({
  playing,
  phase,
  waitingForAck,
  waitingForResolve,
  onPlay,
  onReset,
  onAck,
  onResolve,
}: {
  playing: boolean;
  phase: Phase;
  waitingForAck: boolean;
  waitingForResolve: boolean;
  onPlay: () => void;
  onReset: () => void;
  onAck: () => void;
  onResolve: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="label !text-[10px]">{phase}</span>
      <button type="button" onClick={onPlay} className="label hover:!text-ink">
        {playing ? "Pause" : "Play"}
      </button>
      <button type="button" onClick={onReset} className="label hover:!text-ink">
        Reset
      </button>
      {waitingForAck ? (
        <button type="button" onClick={onAck} className="label !text-amber">
          Ack
        </button>
      ) : null}
      {waitingForResolve ? (
        <button type="button" onClick={onResolve} className="label !text-ok">
          Resolve
        </button>
      ) : null}
    </div>
  );
}

function AfterAction({
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
  const detect = (T.warning / 500).toFixed(0);
  const corroborate = (T.cross / 500).toFixed(0);
  const ack = flags.ackAt != null ? (flags.ackAt / 500).toFixed(0) : "—";
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-canvas/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl border border-line bg-panel p-6">
        <Corners />
        <div className="label mb-3">After-action review</div>
        <h2 className="text-xl tracking-tight">HAB-01 public barrier · closed</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Operator-led resolution at {stateClock}. AI detections remained advisory.
          CAM-04 failed after acknowledgement; CAM-05 provided overlapping coverage.
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
            <dt className="label">Elapsed</dt>
            <dd>{(elapsed / 1000).toFixed(1)}s wall</dd>
          </div>
        </dl>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="border border-ink bg-ink px-4 py-2 text-[12px] tracking-[0.14em] text-canvas uppercase"
          >
            Run again
          </button>
          <Link
            href="/contact"
            className="border border-line px-4 py-2 text-[12px] tracking-[0.14em] uppercase"
          >
            Request briefing
          </Link>
        </div>
      </div>
    </div>
  );
}
