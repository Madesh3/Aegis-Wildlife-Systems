export const SENTINEL_PARTS = [
  "housing",
  "optic",
  "thermal",
  "compute",
  "comms",
  "health",
  "mount",
] as const;

export type SentinelPart = (typeof SENTINEL_PARTS)[number];

export const PART_COPY: Record<
  SentinelPart,
  { title: string; spec: string; body: string }
> = {
  housing: {
    title: "Weather housing",
    spec: "Concept · sealed enclosure",
    body: "Fixed node intended for approach zones, public barriers, transfer areas, and keeper work sightlines. Placement still requires a site survey.",
  },
  optic: {
    title: "Day / low-light optic",
    spec: "Visible-light · labeled observations",
    body: "Primary camera for person and animal detection in approved zones. Overlapping fields of view are required so one failure does not silently remove coverage.",
  },
  thermal: {
    title: "Optional thermal bay",
    spec: "Only where validated",
    body: "Thermal is not assumed. It is considered only where it provides a measured benefit in darkness, vegetation, or glare — and is otherwise omitted.",
  },
  compute: {
    title: "Edge module",
    spec: "Local detect · store-and-forward",
    body: "Selected analysis stays near the camera so time-sensitive detection can continue during network loss. Event evidence is buffered and signed before uplink.",
  },
  comms: {
    title: "Secure uplink",
    spec: "Authenticated · encrypted",
    body: "Device identity, controlled updates, and revocation. Camera infrastructure is segmented from general business networks.",
  },
  health: {
    title: "Health telemetry",
    spec: "Tamper · obstruction · power",
    body: "Lens obstruction, frozen feed, power, and tamper states are first-class. A lost camera must display as uncovered, never as green.",
  },
  mount: {
    title: "Rail mount",
    spec: "Stable · inspectable",
    body: "Mounting accounts for vibration, vegetation growth, glare, and seasonal change. Scheduled inspection is part of the system, not an afterthought.",
  },
};
