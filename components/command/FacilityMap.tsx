import { useId } from "react";
import type { DemoState, MapEntity } from "@/lib/demo/types";

const ENCLOSURES = [
  {
    id: "HAB-01",
    label: "TIGER HABITAT 01",
    d: "M640 72 L874 72 Q916 80 910 120 L910 268 Q908 300 875 300 H645 Q620 300 620 272 V110 Q620 76 640 72 Z",
  },
  {
    id: "HAB-02",
    label: "ELEPHANT RANGE",
    d: "M80 80 L254 65 Q310 90 310 145 V285 Q300 330 265 330 H85 Q48 300 48 254 V135 Q45 95 80 80 Z",
  },
  {
    id: "HAB-03",
    label: "PRIMATE 02",
    d: "M392 120 H526 Q560 120 560 157 V261 Q552 300 522 300 H390 Q360 290 360 258 V160 Q360 130 392 120 Z",
  },
  {
    id: "HAB-04",
    label: "AVIAN 01",
    d: "M93 400 H253 Q300 415 300 450 V530 Q300 560 270 560 H105 Q64 560 64 515 V440 Q64 407 93 400 Z",
  },
  {
    id: "HAB-05",
    label: "SAVANNA 03",
    d: "M389 360 H597 Q641 360 640 403 V519 Q620 560 590 560 H408 Q360 545 360 510 V400 Q360 366 389 360 Z",
  },
];

function entityColor(kind: MapEntity["kind"], selected: boolean) {
  if (selected) return "#bfceb1";
  switch (kind) {
    case "animal":
      return "#E8B86D";
    case "staff":
      return "#bfceb1";
    case "visitor":
      return "#E8EEF4";
    case "camera":
      return "#b0bca5";
    case "gate":
      return "#5BD6A0";
    case "sensor":
      return "#b0bca5";
  }
}

export function FacilityMap({
  state,
  onSelect,
  compact = false,
}: {
  state: DemoState;
  onSelect?: (id: string) => void;
  compact?: boolean;
}) {
  const mapId = useId().replace(/:/g, "");
  const visitor = state.entities.find((e) => e.id === "VIS-07");
  const tiger = state.entities.find((e) => e.id === "TIGER-01");
  const alert =
    state.phase === "warning" ||
    state.phase === "corroborated" ||
    state.phase === "incident" ||
    state.phase === "acknowledged" ||
    state.phase === "degraded";
  const critical = state.phase === "incident" || state.phase === "corroborated";

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden bg-[#141d16]">
      <div className="absolute left-3 top-3 z-10 flex items-center gap-3">
        <span className="label !text-cyan">Facility overview</span>
        <span className="label">{state.coverage}</span>
      </div>
      <svg
        viewBox="0 0 1000 640"
        className="facility-svg h-full w-full"
        role="group"
        aria-label="Northridge Wildlife Park operational map"
      >
        <defs>
          <pattern
            id={`${mapId}-grid`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#293629"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id={`${mapId}-fov`} cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="#bfceb1" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#bfceb1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1000" height="640" fill="#141d16" />
        <rect width="1000" height="640" fill={`url(#${mapId}-grid)`} />

        <g fill="none" stroke="#7c9264" strokeOpacity=".13" strokeWidth="1">
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={i}
              d={`M${-100 + i * 18} 640 Q${220 + i * 13} ${450 - i * 20} ${60 + i * 33} ${310 - i * 16} T${80 + i * 70} -80`}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${600 + i * 35} 700 Q${810 + i * 25} 500 ${900 + i * 22} 430 T${900 + i * 30} -40`}
            />
          ))}
        </g>
        <path
          d="M0 367 C100 330 115 390 225 367 S450 310 540 331 S880 395 1000 330"
          fill="none"
          stroke="#263a35"
          strokeWidth="18"
        />
        <path
          d="M0 367 C100 330 115 390 225 367 S450 310 540 331 S880 395 1000 330"
          fill="none"
          stroke="#52766b"
          strokeOpacity=".4"
          strokeWidth="1"
        />
        <path d="M20 580 H980" fill="none" stroke="#394332" strokeWidth="18" />
        <path d="M700 580 V340" fill="none" stroke="#394332" strokeWidth="14" />
        <path
          d="M310 330 V400 H360"
          fill="none"
          stroke="#394332"
          strokeWidth="10"
        />
        <path d="M560 300 V360" fill="none" stroke="#394332" strokeWidth="10" />

        {ENCLOSURES.map((enc) => (
          <g key={enc.id}>
            <path d={enc.d} fill="#273724" stroke="#5b7150" strokeWidth="1.5" />
            <text
              x={Number(enc.d.match(/M(\d+)/)?.[1] ?? 0) + 8}
              y={Number(enc.d.match(/M\d+ (\d+)/)?.[1] ?? 0) + 22}
              fill="#a0b190"
              fontSize={13}
              fontFamily="ui-monospace, monospace"
              letterSpacing="1.6"
            >
              {enc.label}
            </text>
          </g>
        ))}

        <rect
          x="700"
          y="470"
          width="130"
          height="64"
          fill="#24301f"
          stroke="#5b7150"
        />
        <text
          x="714"
          y="496"
          fill="#b0bca5"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
        >
          COMMAND
        </text>
        <rect
          x="850"
          y="430"
          width="100"
          height="48"
          fill="#24301f"
          stroke="#5b7150"
        />
        <text
          x="862"
          y="458"
          fill="#b0bca5"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
        >
          VET
        </text>
        <rect
          x="520"
          y="500"
          width="110"
          height="48"
          fill="#24301f"
          stroke="#5b7150"
        />
        <text
          x="532"
          y="528"
          fill="#b0bca5"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
        >
          KEEPER
        </text>

        <path
          d="M640 300 H900"
          fill="none"
          stroke={alert ? "#E8B86D" : "#6b7e5c"}
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <text
          x="644"
          y="292"
          fill={alert ? "#E8B86D" : "#a0b190"}
          fontSize="12"
          fontFamily="ui-monospace, monospace"
        >
          PUBLIC BARRIER · RESTRICTED
        </text>

        {alert ? (
          <rect
            x="700"
            y="300"
            width="160"
            height="50"
            fill={critical ? "rgba(224,82,82,0.12)" : "rgba(232,184,109,0.1)"}
            stroke={critical ? "#E05252" : "#E8B86D"}
            strokeWidth="1"
            className={critical ? "pulse-crit" : "pulse-amber"}
          />
        ) : null}

        {state.phase === "degraded" || state.phase === "resolved" ? (
          <g>
            <rect
              x="640"
              y="300"
              width="140"
              height="70"
              fill="rgba(224,82,82,0.08)"
            />
            <text
              x="650"
              y="338"
              fill="#E05252"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              COVERAGE DEGRADED
            </text>
          </g>
        ) : null}

        <polygon
          points="748,338 640,300 900,300"
          fill={`url(#${mapId}-fov)`}
          opacity={state.phase === "degraded" ? 0.15 : 0.7}
        />
        <polygon
          points="888,188 910,72 910,300"
          fill="#bfceb1"
          opacity="0.05"
        />

        {tiger ? (
          <path
            d={`M${tiger.x},${tiger.y} C ${tiger.x + 18},${tiger.y + 30} ${tiger.x - 10},${tiger.y + 70} 748,300`}
            fill="none"
            stroke="#E8B86D"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
        ) : null}

        {state.entities.map((ent) => {
          const selected = ent.id === state.selectedId;
          const color = entityColor(ent.kind, selected);
          const failed = ent.kind === "camera" && ent.online === false;
          return (
            <g
              key={ent.id}
              transform={`translate(${ent.x}, ${ent.y})`}
              className={onSelect ? "map-entity cursor-pointer" : undefined}
              role={onSelect ? "button" : undefined}
              tabIndex={onSelect ? 0 : undefined}
              aria-label={onSelect ? `Select ${ent.label}` : undefined}
              aria-pressed={onSelect ? selected : undefined}
              onKeyDown={
                onSelect
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(ent.id);
                      }
                    }
                  : undefined
              }
              onClick={() => onSelect?.(ent.id)}
            >
              <circle r="18" fill="transparent" />
              {selected ? (
                <circle
                  r="15"
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              ) : null}
              {ent.kind === "camera" ? (
                <g>
                  <rect
                    x="-7"
                    y="-5"
                    width="14"
                    height="10"
                    fill="#24301f"
                    stroke={failed ? "#E05252" : color}
                  />
                  <polygon
                    points="7,-3 13,0 7,3"
                    fill={failed ? "#E05252" : color}
                  />
                </g>
              ) : ent.kind === "gate" ? (
                <rect
                  x="-6"
                  y="-6"
                  width="12"
                  height="12"
                  fill="none"
                  stroke={color}
                />
              ) : ent.kind === "sensor" ? (
                <rect
                  x="-4"
                  y="-4"
                  width="8"
                  height="8"
                  transform="rotate(45)"
                  fill="none"
                  stroke={color}
                />
              ) : (
                <circle r={selected ? 6 : 4.5} fill={color} />
              )}
              {!compact ? (
                <text
                  x="10"
                  y="4"
                  fill={failed ? "#E05252" : color}
                  fontSize="12"
                  fontFamily="ui-monospace, monospace"
                >
                  {ent.label}
                  {failed ? " · FAIL" : ""}
                </text>
              ) : null}
            </g>
          );
        })}

        {visitor &&
        (state.phase === "approach" || state.phase === "warning") ? (
          <line
            x1={visitor.x}
            y1={visitor.y}
            x2={visitor.x}
            y2={310}
            stroke="#E8B86D"
            strokeDasharray="3 4"
            strokeWidth="1"
          />
        ) : null}
      </svg>
      <div className="map-legend">
        <span>
          <i style={{ background: "#e8b86d" }} />
          Animal
        </span>
        <span>
          <i style={{ background: "#bfceb1" }} />
          Personnel
        </span>
        <span>
          <i style={{ background: "#8b9bb0" }} />
          Sensor
        </span>
        <span className="map-scale">0 ━━━ 50 m</span>
      </div>
      <div className="map-north" aria-hidden="true">
        N<span>↑</span>
      </div>
    </div>
  );
}
