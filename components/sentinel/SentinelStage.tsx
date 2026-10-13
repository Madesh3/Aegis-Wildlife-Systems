"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Corners } from "@/components/site/Corners";
import { SentinelModel } from "./SentinelModel";
import { PART_COPY, SENTINEL_PARTS, type SentinelPart } from "./parts";

export function SentinelStage() {
  const [exploded, setExploded] = useState(false);
  const [ortho, setOrtho] = useState(false);
  const [selected, setSelected] = useState<SentinelPart>("housing");
  const copy = PART_COPY[selected];

  return (
    <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="relative min-h-[420px] bg-canvas md:min-h-[560px]">
        <Corners />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setExploded((v) => !v)}
            className={`label border px-2 py-1 ${exploded ? "border-cyan !text-cyan" : "border-line"}`}
          >
            Exploded
          </button>
          <button
            type="button"
            onClick={() => setOrtho((v) => !v)}
            className={`label border px-2 py-1 ${ortho ? "border-cyan !text-cyan" : "border-line"}`}
          >
            Orthographic
          </button>
        </div>
        <div className="absolute right-4 top-4 z-10 label">SENTINEL · SN-04 · CONCEPT</div>
        <Canvas
          key={ortho ? "ortho" : "persp"}
          orthographic={ortho}
          camera={
            ortho
              ? { position: [2.6, 1.5, 3.1], zoom: 120 }
              : { position: [2.4, 1.35, 2.9], fov: 32 }
          }
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#0b0f14"]} />
          <hemisphereLight args={["#9aafc2", "#0b0f14", 0.7]} />
          <directionalLight position={[4, 6, 3]} intensity={1.35} />
          <directionalLight position={[-4, 2, -2]} intensity={0.28} color="#7dd3e8" />
          <SentinelModel exploded={exploded} selected={selected} onSelect={setSelected} />
          <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={8} blur={2.4} />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={7} />
        </Canvas>
      </div>
      <div className="bg-panel">
        <div className="border-b border-line px-4 py-3">
          <div className="label">Subsystem</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SENTINEL_PARTS.map((part) => (
              <button
                key={part}
                type="button"
                onClick={() => setSelected(part)}
                className={`border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${
                  selected === part ? "border-cyan text-cyan" : "border-line text-muted"
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-4">
          <h3 className="text-lg tracking-tight">{copy.title}</h3>
          <div className="label mt-2 !text-cyan">{copy.spec}</div>
          <p className="mt-3 text-sm leading-6 text-muted">{copy.body}</p>
        </div>
      </div>
    </div>
  );
}
