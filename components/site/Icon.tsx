import type { CSSProperties } from "react";
export type IconName =
  | "arrow"
  | "external"
  | "shield"
  | "scan"
  | "layers"
  | "activity"
  | "map"
  | "grid"
  | "clock"
  | "chevron"
  | "play"
  | "pause"
  | "reset"
  | "check"
  | "close"
  | "menu"
  | "crosshair";
const paths: Record<IconName, string> = {
  arrow: "M4 12h16m-6-6 6 6-6 6",
  external: "M6 18 18 6M6 6h12v12",
  shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z M8 12l3 3 5-6",
  scan: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M7 12h10M12 7v10",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5",
  activity: "M2 12h5l3-8 4 16 3-8h5",
  map: "m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  clock: "M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  chevron: "m9 5 7 7-7 7",
  play: "m8 5 11 7-11 7V5Z",
  pause: "M8 5v14M16 5v14",
  reset: "M3 10a9 9 0 1 1 1 7M3 3v7h7",
  check: "m5 12 4 4L19 6",
  close: "m5 5 14 14M5 19 19 5",
  menu: "M3 6h18M3 12h18M3 18h18",
  crosshair:
    "M12 2v4m0 12v4M2 12h4m12 0h4M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z",
};
export function Icon({
  name,
  size = 18,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
