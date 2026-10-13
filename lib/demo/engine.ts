import type {
  DemoEvent,
  DemoFlags,
  DemoState,
  EvidenceItem,
  MapEntity,
  Phase,
  PlaybookStep,
  Risk,
  SystemMode,
} from "./types";

const START_SEC = 20 * 3600 + 17 * 60 + 40;

export const T = {
  approach: 4000,
  warning: 9000,
  fence: 13000,
  cross: 17500,
  incident: 19000,
  degradeAfterAck: 8000,
} as const;

function formatClock(elapsed: number) {
  const sec = START_SEC + Math.floor(elapsed / 500);
  const h = Math.floor(sec / 3600) % 24;
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

function phaseOf(elapsed: number, flags: DemoFlags): Phase {
  if (flags.resolved) return "resolved";
  if (flags.acknowledged) {
    if (flags.ackAt != null && elapsed >= flags.ackAt + T.degradeAfterAck) {
      return "degraded";
    }
    return "acknowledged";
  }
  if (elapsed >= T.incident) return "incident";
  if (elapsed >= T.cross) return "corroborated";
  if (elapsed >= T.warning) return "warning";
  if (elapsed >= T.approach) return "approach";
  return "idle";
}

function riskOf(phase: Phase): Risk {
  switch (phase) {
    case "idle":
      return "LOW";
    case "approach":
      return "ELEVATED";
    case "warning":
      return "ELEVATED";
    case "corroborated":
      return "HIGH";
    case "incident":
      return "CRITICAL";
    case "acknowledged":
      return "HIGH";
    case "degraded":
      return "HIGH";
    case "resolved":
      return "LOW";
  }
}

const SCRIPT: Omit<DemoEvent, "clock">[] = [
  {
    id: "e0",
    at: 400,
    kind: "SYS",
    title: "Edge heartbeat verified",
    location: "ALL NODES",
    note: "12 cameras, 9 sensors, 4 edge units",
  },
  {
    id: "e1",
    at: 2800,
    kind: "OPS",
    title: "Keeper entered authorized zone",
    location: "KPR-03 · SECTOR B",
    note: "Access control + CAM-11",
  },
  {
    id: "e2",
    at: 6200,
    kind: "ANI",
    title: "Animal movement detected",
    location: "TIGER-01 · HAB-01",
    note: "Pacing near northern boundary",
  },
  {
    id: "e3",
    at: T.warning,
    kind: "WARN",
    title: "Approach on public barrier",
    location: "CAM-04 · VIS-07",
    note: "Single-sensor. No independent corroboration.",
  },
  {
    id: "e4",
    at: T.fence,
    kind: "SENS",
    title: "Fence vibration",
    location: "FENCE-12",
    note: "Low confidence. May be environmental.",
  },
  {
    id: "e5",
    at: T.cross,
    kind: "ALERT",
    title: "Restricted-zone crossing",
    location: "CAM-04 + FENCE-12",
    note: "Two sources agree at the public barrier.",
  },
  {
    id: "e6",
    at: T.incident,
    kind: "INC",
    title: "Incident opened — HAB-01 barrier",
    location: "TIGER HABITAT 01",
    note: "Awaiting operator acknowledgement.",
  },
];

function entitiesAt(elapsed: number, phase: Phase): MapEntity[] {
  const pace = (Math.sin(elapsed / 900) + 1) / 2;
  const tigerX = 740 + Math.sin(elapsed / 1400) * 28;
  const tigerY = 168 + Math.cos(elapsed / 1600) * 18;

  let visX = 742;
  let visY = 560;
  if (elapsed >= T.approach) {
    visY = lerp(560, 352, (elapsed - T.approach) / (T.warning - T.approach));
  }
  if (elapsed >= T.warning) {
    visY = lerp(352, 318, (elapsed - T.warning) / (T.cross - T.warning));
  }
  if (elapsed >= T.cross) {
    visY = lerp(318, 292, Math.min(1, (elapsed - T.cross) / 2500));
  }
  if (phase === "acknowledged" || phase === "degraded") {
    visY = 338;
    visX = 728;
  }
  if (phase === "resolved") {
    visY = 548;
    visX = 760;
  }

  const cam4Online = phase !== "degraded";

  return [
    {
      id: "TIGER-01",
      kind: "animal",
      label: "TIGER-01",
      x: tigerX,
      y: phase === "incident" || phase === "acknowledged" || phase === "degraded" ? tigerY - 12 : tigerY,
      heading: 210 + pace * 20,
    },
    {
      id: "KPR-03",
      kind: "staff",
      label: "KPR-03",
      x: 430 + (elapsed > 2800 ? 8 : 0),
      y: 268,
    },
    {
      id: "VIS-07",
      kind: "visitor",
      label: "VIS-07",
      x: visX,
      y: visY,
    },
    { id: "CAM-04", kind: "camera", label: "CAM-04", x: 748, y: 338, online: cam4Online, health: cam4Online ? 98 : 0 },
    { id: "CAM-05", kind: "camera", label: "CAM-05", x: 888, y: 188, online: true, health: 99 },
    { id: "CAM-06", kind: "camera", label: "CAM-06", x: 612, y: 156, online: true, health: 97 },
    { id: "CAM-11", kind: "camera", label: "CAM-11", x: 168, y: 210, online: true, health: 99 },
    { id: "CAM-21", kind: "camera", label: "CAM-21", x: 470, y: 430, online: true, health: 96 },
    { id: "FENCE-12", kind: "sensor", label: "FENCE-12", x: 748, y: 312 },
    { id: "GATE-T1", kind: "gate", label: "GATE-T1", x: 628, y: 214 },
    { id: "GATE-T2", kind: "gate", label: "GATE-T2", x: 870, y: 248 },
  ];
}

function evidenceFor(phase: Phase): EvidenceItem[] {
  const base: EvidenceItem[] = [
    {
      source: "CAM-04",
      claim: "Person near HAB-01 public barrier",
      confidence: phase === "idle" ? 0.12 : phase === "approach" ? 0.44 : 0.78,
      status: phase === "degraded" ? "degraded" : "supporting",
    },
    {
      source: "FENCE-12",
      claim: "Vibration on south mesh",
      confidence: phase === "idle" || phase === "approach" ? 0.08 : phase === "warning" ? 0.38 : 0.71,
      status:
        phase === "warning"
          ? "missing"
          : phase === "idle" || phase === "approach"
            ? "missing"
            : "supporting",
    },
    {
      source: "GATE-T1",
      claim: "Transfer lock closed",
      confidence: 0.99,
      status: "supporting",
    },
    {
      source: "CAM-05",
      claim: "Overlap on east HAB-01",
      confidence: phase === "degraded" ? 0.86 : 0.55,
      status: "supporting",
    },
  ];

  if (phase === "warning") {
    base[1] = {
      ...base[1],
      status: "missing",
      claim: "No independent fence event yet",
      confidence: 0.18,
    };
  }
  if (phase === "degraded") {
    base[0] = {
      ...base[0],
      status: "degraded",
      claim: "Feed frozen / obstructed",
      confidence: 0,
    };
  }
  return base;
}

function playbookFor(phase: Phase, flags: DemoFlags): PlaybookStep[] {
  const ack = flags.acknowledged;
  const degraded = phase === "degraded" || phase === "resolved";
  const resolved = flags.resolved;
  return [
    { id: "p1", label: "Acknowledge and assume incident lead", owner: "OPS-01", done: ack },
    { id: "p2", label: "Hold public at plaza / viewing rail", owner: "SEC-02", done: ack },
    { id: "p3", label: "Confirm visual CAM-04 and overlapping CAM-05", owner: "OPS-01", done: ack },
    { id: "p4", label: "Keeper net: KPR-03, animal position, no entry", owner: "KPR-LEAD", done: ack },
    { id: "p5", label: "Verify GATE-T1 / GATE-T2 locked", owner: "FAC-01", done: ack },
    { id: "p6", label: "Treat south HAB-01 as coverage-degraded", owner: "OPS-01", done: degraded },
    { id: "p7", label: "Incident lead records all-clear", owner: "OPS-01", done: resolved },
  ];
}

function uncertaintyFor(phase: Phase): string {
  switch (phase) {
    case "idle":
      return "All primary sensors reporting. No corroborated risk at HAB-01.";
    case "approach":
      return "Motion on the public path. Identity not confirmed. Animal remains inside habitat.";
    case "warning":
      return "CAM-04 indicates approach. Fence and gate sensors are unchanged. Do not treat this as a confirmed crossing.";
    case "corroborated":
      return "CAM-04 track and FENCE-12 now agree on a restricted-zone crossing. Gate locks still closed.";
    case "incident":
      return "Incident is open and unacknowledged. AI has not confirmed identity or intent. Human command is required.";
    case "acknowledged":
      return "Incident lead assigned. Playbook active. Animal position estimated from CAM-05/06. Visitor held at rail.";
    case "degraded":
      return "CAM-04 unavailable. South sightline is degraded. CAM-05 overlap remains. Do not assume the barrier is fully observed.";
    case "resolved":
      return "Incident closed by operator. Coverage still lists CAM-04 as failed pending inspection.";
  }
}

export function deriveState(
  elapsed: number,
  flags: DemoFlags,
  selectedId: string,
): DemoState {
  const phase = phaseOf(elapsed, flags);
  const clock = formatClock(elapsed);
  const events: DemoEvent[] = SCRIPT.filter((e) => elapsed >= e.at).map((e) => ({
    ...e,
    clock: formatClock(e.at),
  }));

  if (flags.acknowledged && flags.ackAt != null) {
    events.push({
      id: "e-ack",
      at: flags.ackAt,
      clock: formatClock(flags.ackAt),
      kind: "OPS",
      title: "Acknowledged — OPS-01 has command",
      location: "COMMAND",
      note: "Human authority assumed.",
    });
  }
  if (phase === "degraded" || phase === "resolved") {
    const at = (flags.ackAt ?? T.incident) + T.degradeAfterAck;
    events.push({
      id: "e-deg",
      at,
      clock: formatClock(at),
      kind: "SYS",
      title: "CAM-04 coverage lost",
      location: "HAB-01 SOUTH",
      note: "Obstruction / frozen frame. Failover CAM-05.",
    });
  }
  if (flags.resolved && flags.resolveAt != null) {
    events.push({
      id: "e-res",
      at: flags.resolveAt,
      clock: formatClock(flags.resolveAt),
      kind: "INC",
      title: "Incident resolved by incident lead",
      location: "HAB-01",
      note: "After-action record opened.",
    });
  }

  events.sort((a, b) => b.at - a.at);

  const feedDegraded = phase === "degraded" || phase === "resolved";
  const system: SystemMode =
    phase === "resolved" ? "RESOLVED" : phase === "degraded" ? "DEGRADED" : "ONLINE";

  return {
    elapsed,
    clock,
    phase,
    risk: riskOf(phase),
    system,
    selectedId,
    events,
    entities: entitiesAt(elapsed, phase),
    evidence: evidenceFor(phase),
    playbook: playbookFor(phase, flags),
    uncertainty: uncertaintyFor(phase),
    feedId: feedDegraded ? "CAM-05" : "CAM-04",
    feedLabel: feedDegraded ? "CAM-05 · EAST OVERLAP" : "CAM-04 · SOUTH BARRIER",
    feedOnline: true,
    acknowledged: flags.acknowledged,
    resolved: flags.resolved,
    waitingForAck: phase === "incident",
    waitingForResolve: phase === "degraded",
    animalStatus:
      phase === "idle"
        ? "REST / SHORT PACE"
        : phase === "resolved"
          ? "BASELINE"
          : "ACTIVE · NORTH SIDE",
    visitorStatus:
      phase === "idle"
        ? "PLAZA"
        : phase === "approach" || phase === "warning"
          ? "APPROACHING BARRIER"
          : phase === "resolved"
            ? "CLEARED TO PLAZA"
            : "RESTRICTED ZONE / HELD",
    coverage: phase === "degraded" || phase === "resolved" ? "DEGRADED · CAM-04 DOWN" : "NOMINAL",
    health: {
      cameras: phase === "degraded" || phase === "resolved" ? 91 : 98,
      sensors: 99,
      edge: 100,
      network: 97,
    },
  };
}

export function initialFlags(): DemoFlags {
  return { acknowledged: false, ackAt: null, resolved: false, resolveAt: null };
}

export { type EvidenceItem, type MapEntity, type PlaybookStep };
