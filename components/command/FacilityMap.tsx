import { Corners } from "@/components/site/Corners";
import type { DemoState, MapEntity } from "@/lib/demo/types";

const ENCLOSURES = [
  { id: "HAB-01", label: "TIGER HABITAT 01", d: "M620 72 H910 V300 H620 Z" },
  { id: "HAB-02", label: "ELEPHANT RANGE", d: "M48 80 H310 V330 H48 Z" },
  { id: "HAB-03", label: "PRIMATE 02", d: "M360 120 H560 V300 H360 Z" },
  { id: "HAB-04", label: "AVIAN 01", d: "M64 400 H300 V560 H64 Z" },
  { id: "HAB-05", label: "SAVANNA 03", d: "M360 360 H640 V560 H360 Z" },
];

function entityColor(kind: MapEntity["kind"], selected: boolean) {
  if (selected) return "#7DD3E8";
  switch (kind) {
    case "animal":
      return "#E8B86D";
    case "staff":
      return "#7DD3E8";
    case "visitor":
      return "#E8EEF4";
    case "camera":
      return "#8B9BB0";
    case "gate":
      return "#5BD6A0";
    case "sensor":
      return "#8B9BB0";
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
    <div className="relative h-full min-h-[280px] overflow-hidden bg-[#0b0f14]">
      <Corners />
      <div className="absolute left-3 top-3 z-10 flex items-center gap-3">
        <span className="label !text-cyan">Live facility map</span>
        <span className="label">{state.coverage}</span>
      </div>
      <svg
        viewBox="0 0 1000 640"
        className="h-full w-full"
        role="img"
        aria-label="Northridge Wildlife Park operational map"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b2530" strokeWidth="1" />
          </pattern>
          <radialGradient id="fov" cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="#7DD3E8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7DD3E8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1000" height="640" fill="#0b0f14" />
        <rect width="1000" height="640" fill="url(#grid)" />

        <path d="M20 580 H980" fill="none" stroke="#243040" strokeWidth="18" />
        <path d="M700 580 V340" fill="none" stroke="#243040" strokeWidth="14" />
        <path d="M310 330 V400 H360" fill="none" stroke="#243040" strokeWidth="10" />
        <path d="M560 300 V360" fill="none" stroke="#243040" strokeWidth="10" />

        {ENCLOSURES.map((enc) => (
          <g key={enc.id}>
            <path d={enc.d} fill="#121920" stroke="#2a3948" strokeWidth="1.5" />
            <text
              x={Number(enc.d.match(/M(\d+)/)?.[1] ?? 0) + 14}
              y={Number(enc.d.match(/M\d+ (\d+)/)?.[1] ?? 0) + 22}
              fill="#5c6b7e"
              fontSize={compact ? 9 : 11}
              fontFamily="ui-monospace, monospace"
              letterSpacing="1.6"
            >
              {enc.label}
            </text>
          </g>
        ))}

        <rect x="700" y="470" width="130" height="64" fill="#151c24" stroke="#2a3948" />
        <text x="714" y="496" fill="#8B9BB0" fontSize="10" fontFamily="ui-monospace, monospace">
          COMMAND
        </text>
        <rect x="850" y="430" width="100" height="48" fill="#151c24" stroke="#2a3948" />
        <text x="862" y="458" fill="#8B9BB0" fontSize="10" fontFamily="ui-monospace, monospace">
          VET
        </text>
        <rect x="520" y="500" width="110" height="48" fill="#151c24" stroke="#2a3948" />
        <text x="532" y="528" fill="#8B9BB0" fontSize="10" fontFamily="ui-monospace, monospace">
          KEEPER
        </text>

        <path
          d="M640 300 H900"
          fill="none"
          stroke={alert ? "#E8B86D" : "#3a4a5c"}
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <text x="644" y="292" fill={alert ? "#E8B86D" : "#5c6b7e"} fontSize="10" fontFamily="ui-monospace, monospace">
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
            <rect x="640" y="300" width="140" height="70" fill="rgba(224,82,82,0.08)" />
            <text x="650" y="338" fill="#E05252" fontSize="10" fontFamily="ui-monospace, monospace">
              COVERAGE DEGRADED
            </text>
          </g>
        ) : null}

        <polygon points="748,338 640,300 900,300" fill="url(#fov)" opacity={state.phase === "degraded" ? 0.15 : 0.7} />
        <polygon points="888,188 910,72 910,300" fill="#7DD3E8" opacity="0.05" />

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
              className="cursor-pointer"
              onClick={() => onSelect?.(ent.id)}
            >
              {ent.kind === "camera" ? (
                <g>
                  <rect x="-7" y="-5" width="14" height="10" fill="#151c24" stroke={failed ? "#E05252" : color} />
                  <polygon points="7,-3 13,0 7,3" fill={failed ? "#E05252" : color} />
                </g>
              ) : ent.kind === "gate" ? (
                <rect x="-6" y="-6" width="12" height="12" fill="none" stroke={color} />
              ) : ent.kind === "sensor" ? (
                <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" fill="none" stroke={color} />
              ) : (
                <circle r={selected ? 6 : 4.5} fill={color} />
              )}
              {!compact ? (
                <text
                  x="10"
                  y="4"
                  fill={failed ? "#E05252" : color}
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                >
                  {ent.label}
                  {failed ? " · FAIL" : ""}
                </text>
              ) : null}
            </g>
          );
        })}

        {visitor && (state.phase === "approach" || state.phase === "warning") ? (
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
    </div>
  );
}
