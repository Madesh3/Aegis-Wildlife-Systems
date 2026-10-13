"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Mark } from "@/components/site/Mark";
import { Icon, type IconName } from "@/components/site/Icon";
import { CameraFeed } from "./CameraFeed";
import { FacilityMap } from "./FacilityMap";
import { AfterAction } from "./AfterAction";
import { deriveState, initialFlags } from "@/lib/demo/engine";
import type { DemoFlags } from "@/lib/demo/types";

const VIEWS: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "map" },
  { label: "Entities", icon: "scan" },
  { label: "Timeline", icon: "clock" },
  { label: "System health", icon: "activity" },
];
const PHASE_LABELS = {
  idle: "Monitoring facility",
  approach: "Approach detected",
  warning: "Boundary warning",
  corroborated: "Evidence corroborated",
  incident: "Operator action required",
  acknowledged: "Response in progress",
  degraded: "Coverage degraded",
  resolved: "Incident resolved",
};

export function CommandApp() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [flags, setFlags] = useState<DemoFlags>(initialFlags);
  const [selectedId, setSelectedId] = useState("CAM-04");
  const [view, setView] = useState("Overview");
  const state = useMemo(
    () => deriveState(elapsed, flags, selectedId),
    [elapsed, flags, selectedId],
  );
  useEffect(() => {
    if (
      !playing ||
      state.waitingForAck ||
      state.waitingForResolve ||
      state.resolved
    )
      return;
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(now - last, 250);
      last = now;
      if (!document.hidden) setElapsed((e) => e + dt);
    }, 100);
    return () => window.clearInterval(id);
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
      const target = e.target as HTMLElement;
      if (
        e.repeat ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        target.closest(
          "input,textarea,select,button,a,dialog,[contenteditable=true],[role=button]",
        )
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
      if (e.key.toLowerCase() === "r") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);
  const selected = state.entities.find((e) => e.id === state.selectedId);
  const waiting =
    state.waitingForAck || state.waitingForResolve || state.resolved;
  const riskColor =
    state.risk === "LOW"
      ? "text-ok"
      : state.risk === "CRITICAL"
        ? "text-crit"
        : "text-amber";
  return (
    <div className="command-app">
      <header className="command-header">
        <Link href="/" className="command-brand" aria-label="Aegis home">
          <Mark className="h-7 w-7" />
          <span>
            AEGIS <b>COMMAND</b>
          </span>
        </Link>
        <div className="command-facility">
          <span className="status-dot" />
          Northridge Wildlife Park
          <Icon name="chevron" size={13} />
          <span>Operations</span>
        </div>
        <div className="command-header-right">
          <span className="simulation-tag">SIMULATION ONLY</span>
          <span className="command-clock">
            {state.clock}
            <small>SCENARIO TIME</small>
          </span>
        </div>
      </header>
      <div className="command-layout">
        <aside className="command-sidebar">
          <div className="sidebar-section-label">WORKSPACE</div>
          <nav aria-label="Command views">
            {VIEWS.map((item) => (
              <button
                type="button"
                key={item.label}
                aria-pressed={view === item.label}
                onClick={() => setView(item.label)}
              >
                <Icon name={item.icon} size={17} />
                <span>{item.label}</span>
                {item.label === "Timeline" && (
                  <small>{state.events.length}</small>
                )}
              </button>
            ))}
          </nav>
          <div className="sidebar-site">
            <div className="sidebar-section-label">CONNECTED FACILITY</div>
            <strong>Northridge</strong>
            <p>NW-01 / Training environment</p>
            <div className="site-health-label">
              <span
                className={
                  state.system === "DEGRADED" ? "text-amber" : "text-ok"
                }
              >
                ●{" "}
                {state.system === "DEGRADED"
                  ? "Coverage degraded"
                  : "Simulation connected"}
              </span>
            </div>
          </div>
          <div className="sidebar-health">
            <div className="sidebar-section-label">SYSTEM TELEMETRY</div>
            {Object.entries(state.health).map(([key, value]) => (
              <div className="health-meter" key={key}>
                <div>
                  <span>{key}</span>
                  <strong>{value}%</strong>
                </div>
                <div>
                  <i
                    style={{
                      width: `${value}%`,
                      background: value < 95 ? "var(--amber)" : "#8dba7c",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar-bottom">
            <Icon name="shield" size={19} />
            <div>
              Human authority<small>at every critical boundary</small>
            </div>
          </div>
        </aside>
        <main className="command-main">
          <div className="command-page-heading">
            <div>
              <div className="eyebrow">WORKSPACE / {view.toUpperCase()}</div>
              <h1>{view === "Overview" ? "Facility overview" : view}</h1>
            </div>
            <div className="scenario-controls">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                disabled={waiting}
                aria-label={playing ? "Pause simulation" : "Resume simulation"}
              >
                <Icon name={playing ? "pause" : "play"} size={14} />
                {playing ? "Pause" : "Resume"}
              </button>
              <button
                type="button"
                onClick={reset}
                aria-label="Reset simulation"
              >
                <Icon name="reset" size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
          <div className="command-stats">
            <div>
              <span>FACILITY RISK</span>
              <strong className={riskColor}>
                {state.risk.toLowerCase()}
                <i className={riskColor}>●</i>
              </strong>
            </div>
            <div>
              <span>CAMERA HEALTH</span>
              <strong>
                {state.health.cameras}
                <small>%</small>
                <Icon name="scan" size={18} />
              </strong>
            </div>
            <div>
              <span>ACTIVE INCIDENTS</span>
              <strong>
                {state.waitingForAck || (flags.acknowledged && !flags.resolved)
                  ? "01"
                  : "00"}
                <Icon name="shield" size={18} />
              </strong>
            </div>
            <div>
              <span>RESPONSE STATUS</span>
              <strong className="stat-response">
                {flags.resolved
                  ? "Complete"
                  : flags.acknowledged
                    ? "Assigned"
                    : "Standby"}
                <Icon name="activity" size={18} />
              </strong>
            </div>
          </div>
          <div
            className={`scenario-banner ${state.waitingForAck ? "needs-action" : ""}`}
            role="status"
          >
            <span className="scenario-phase">
              <span className={riskColor}>●</span>
              {PHASE_LABELS[state.phase]}
            </span>
            <span>
              {state.waitingForAck
                ? "Review the evidence and assume command."
                : state.waitingForResolve
                  ? "Confirm the simulated all-clear to complete the exercise."
                  : "HAB-01 · Public boundary scenario"}
            </span>
          </div>
          {view === "Overview" && (
            <div className="command-map-panel">
              <div className="map-panel-header">
                <span>
                  <Icon name="map" size={15} />
                  Operational map
                </span>
                <span>
                  NW-01 <i /> {state.coverage}
                </span>
              </div>
              <div className="command-map">
                <FacilityMap state={state} onSelect={setSelectedId} />
              </div>
            </div>
          )}
          {view === "Entities" && (
            <section className="workspace-panel">
              <div className="workspace-panel-title">
                <h2>Tracked entities</h2>
                <span>{state.entities.length} in this scenario</span>
              </div>
              <div className="entity-grid">
                {state.entities.map((entity) => (
                  <button
                    key={entity.id}
                    type="button"
                    aria-pressed={entity.id === selectedId}
                    onClick={() => setSelectedId(entity.id)}
                  >
                    <Icon
                      name={
                        entity.kind === "camera"
                          ? "scan"
                          : entity.kind === "animal"
                            ? "crosshair"
                            : "shield"
                      }
                      size={22}
                    />
                    <span>
                      <strong>{entity.label}</strong>
                      <small>{entity.kind}</small>
                    </span>
                    <span
                      className={
                        entity.online === false ? "text-crit" : "text-ok"
                      }
                    >
                      {entity.online === false
                        ? "Offline"
                        : entity.health
                          ? `${entity.health}%`
                          : "Tracked"}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}
          {view === "System health" && (
            <section className="workspace-panel">
              <div className="workspace-panel-title">
                <h2>Coverage & resilience</h2>
                <span>Simulated telemetry</span>
              </div>
              <div className="system-grid">
                {Object.entries(state.health).map(([name, value]) => (
                  <article key={name}>
                    <Icon name="activity" size={24} />
                    <h3>{name}</h3>
                    <strong className={value < 95 ? "text-amber" : "text-ok"}>
                      {value}
                      <small>%</small>
                    </strong>
                    <p>
                      {value < 95
                        ? "Degraded · overlapping coverage active. Inspect CAM-04."
                        : "Available in the training scenario."}
                    </p>
                  </article>
                ))}
              </div>
              <p className="system-note">
                Sensor and camera loss remain visible. The simulation switches
                the reference view to CAM-05 after CAM-04 fails.
              </p>
            </section>
          )}
          <section
            className={`event-panel ${view === "Timeline" ? "expanded-timeline" : ""}`}
          >
            <div className="workspace-panel-title">
              <h2>
                <Icon name="clock" size={15} />
                {view === "Timeline" ? "Incident timeline" : "Recent activity"}
              </h2>
              <span>
                {state.events.length} events <i className="status-dot" />
              </span>
            </div>
            <div className="event-list">
              {state.events.length === 0 ? (
                <p className="event-empty">
                  Waiting for the first scenario event…
                </p>
              ) : (
                state.events.map((ev) => (
                  <div className="event-row" key={ev.id}>
                    <time>{ev.clock}</time>
                    <span
                      className={`event-kind event-${ev.kind.toLowerCase()}`}
                    >
                      {ev.kind}
                    </span>
                    <div>
                      <strong>{ev.title}</strong>
                      {view === "Timeline" && <p>{ev.note}</p>}
                    </div>
                    <span className="event-location">{ev.location}</span>
                  </div>
                ))
              )}
            </div>
          </section>
          <div className="command-bottom-note">
            <span>SIMULATED DATA · NO LIVE INFRASTRUCTURE</span>
            <span>
              SPACE Pause / resume <b>·</b> R Reset
            </span>
          </div>
        </main>
        <aside className="intelligence-panel">
          <div className="intelligence-title">
            <span>
              <Icon name="scan" size={16} />
              Habitat intelligence
            </span>
            <span>HAB-01</span>
          </div>
          <CameraFeed state={state} />
          <div className="intelligence-content">
            <div className="habitat-heading">
              <div className="eyebrow">ENCLOSURE / 01</div>
              <h2>Tiger habitat</h2>
              <span className={riskColor}>
                ● {state.risk.toLowerCase()} risk
              </span>
            </div>
            <div className="selected-entity">
              <span>Selected entity</span>
              <strong>{selected?.label ?? selectedId}</strong>
              <small>
                {selected?.kind} {selected?.online === false ? "· offline" : ""}
              </small>
            </div>
            <div className="intel-status-grid">
              <div>
                <span>ANIMAL ACTIVITY</span>
                <strong>{state.animalStatus}</strong>
              </div>
              <div>
                <span>VISITOR STATUS</span>
                <strong>{state.visitorStatus}</strong>
              </div>
            </div>
            <div className="intel-section">
              <h3>
                Assessment <span>ADVISORY</span>
              </h3>
              <p>{state.uncertainty}</p>
            </div>
            <div className="intel-section">
              <h3>
                Supporting evidence <span>{state.evidence.length} SOURCES</span>
              </h3>
              <div className="evidence-list">
                {state.evidence.map((item) => (
                  <article key={item.source}>
                    <div>
                      <strong>{item.source}</strong>
                      <span
                        className={
                          item.status === "degraded" ||
                          item.status === "conflicting"
                            ? "text-crit"
                            : item.status === "missing"
                              ? "text-amber"
                              : "text-ok"
                        }
                      >
                        {Math.round(item.confidence * 100)}%
                      </span>
                    </div>
                    <p>{item.claim}</p>
                    <small>{item.status}</small>
                  </article>
                ))}
              </div>
            </div>
            <div className="intel-section">
              <h3>
                Response playbook <Icon name="shield" size={15} />
              </h3>
              <ol className="playbook-list">
                {state.playbook.map((step, i) => (
                  <li key={step.id}>
                    <span className={step.done ? "step-done" : ""}>
                      {step.done ? (
                        <Icon name="check" size={13} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <div>
                      {step.label}
                      <small>{step.owner}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {state.waitingForAck && (
            <div className="command-action">
              <button type="button" onClick={acknowledge}>
                Acknowledge & assume command
                <Icon name="arrow" size={15} />
              </button>
            </div>
          )}
          {state.waitingForResolve && (
            <div className="command-action">
              <button type="button" onClick={resolve}>
                Record simulated all-clear
                <Icon name="check" size={15} />
              </button>
            </div>
          )}
        </aside>
      </div>
      {state.resolved && (
        <AfterAction
          stateClock={state.clock}
          elapsed={elapsed}
          flags={flags}
          onReset={reset}
        />
      )}
    </div>
  );
}
