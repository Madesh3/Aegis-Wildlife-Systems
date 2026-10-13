"use client";
import Link from "next/link";
import { useState } from "react";
import { FacilityMap } from "@/components/command/FacilityMap";
import { deriveState, initialFlags } from "@/lib/demo/engine";
import { Icon } from "@/components/site/Icon";
const SCENES = [
  { label: "Observe", time: 0 },
  { label: "Detect", time: 9000 },
  { label: "Corroborate", time: 18000 },
];
export function HeroConsole() {
  const [scene, setScene] = useState(0);
  const state = deriveState(SCENES[scene].time, initialFlags(), "CAM-04");
  return (
    <div className="hero-console">
      <div className="console-top">
        <span>
          <Icon name="grid" size={16} /> AEGIS <b>COMMAND</b>
        </span>
        <span className="console-site">
          Northridge Wildlife Park <span className="status-dot" />
        </span>
        <span className="simulation-tag">SIMULATION</span>
      </div>
      <div className="console-body">
        <div className="console-map">
          <FacilityMap state={state} compact />
        </div>
        <div className="console-intel">
          <div className="eyebrow">FACILITY INTELLIGENCE</div>
          <h3>
            Awareness,
            <br />
            without the noise.
          </h3>
          <div className="console-metric">
            <span>Coverage status</span>
            <strong className="text-ok">{state.coverage}</strong>
          </div>
          <div className="console-metric">
            <span>Risk assessment</span>
            <strong className={state.risk === "LOW" ? "text-ok" : "text-amber"}>
              {state.risk}
            </strong>
          </div>
          <div className="intel-note">
            <Icon name="scan" size={20} />
            <p>{state.uncertainty}</p>
          </div>
          <Link href="/command" className="text-link">
            Open simulation <Icon name="arrow" />
          </Link>
        </div>
      </div>
      <div className="console-bottom">
        <div className="scene-tabs" aria-label="Preview incident stage">
          {SCENES.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={scene === i}
              onClick={() => setScene(i)}
            >
              <span>0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <span className="console-hint">
          SELECT A STAGE TO EXPLORE <Icon name="arrow" size={14} />
        </span>
      </div>
    </div>
  );
}
