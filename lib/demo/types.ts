export type Phase =
  | "idle"
  | "approach"
  | "warning"
  | "corroborated"
  | "incident"
  | "acknowledged"
  | "degraded"
  | "resolved";

export type Risk = "LOW" | "ELEVATED" | "HIGH" | "CRITICAL";
export type SystemMode = "ONLINE" | "DEGRADED" | "RESOLVED";

export type EventKind = "SYS" | "OPS" | "ANI" | "WARN" | "SENS" | "ALERT" | "INC";

export type DemoEvent = {
  id: string;
  at: number;
  clock: string;
  kind: EventKind;
  title: string;
  location: string;
  note?: string;
};

export type MapEntity = {
  id: string;
  kind: "animal" | "staff" | "visitor" | "camera" | "gate" | "sensor";
  label: string;
  x: number;
  y: number;
  heading?: number;
  health?: number;
  online?: boolean;
};

export type EvidenceItem = {
  source: string;
  claim: string;
  confidence: number;
  status: "supporting" | "conflicting" | "missing" | "degraded";
};

export type PlaybookStep = {
  id: string;
  label: string;
  owner: string;
  done: boolean;
};

export type DemoState = {
  elapsed: number;
  clock: string;
  phase: Phase;
  risk: Risk;
  system: SystemMode;
  selectedId: string;
  events: DemoEvent[];
  entities: MapEntity[];
  evidence: EvidenceItem[];
  playbook: PlaybookStep[];
  uncertainty: string;
  feedId: string;
  feedLabel: string;
  feedOnline: boolean;
  acknowledged: boolean;
  resolved: boolean;
  waitingForAck: boolean;
  waitingForResolve: boolean;
  animalStatus: string;
  visitorStatus: string;
  coverage: string;
  health: {
    cameras: number;
    sensors: number;
    edge: number;
    network: number;
  };
};

export type DemoFlags = {
  acknowledged: boolean;
  ackAt: number | null;
  resolved: boolean;
  resolveAt: number | null;
};
