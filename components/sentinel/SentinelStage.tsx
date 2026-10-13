"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Corners } from "@/components/site/Corners";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SentinelModel } from "./SentinelModel";
import { PART_COPY, SENTINEL_PARTS, type SentinelPart } from "./parts";

export function SentinelStage() {
  const reducedMotion = useReducedMotion();
  const [exploded, setExploded] = useState(false);
  const [ortho, setOrtho] = useState(false);
  const [selected, setSelected] = useState<SentinelPart>("housing");
  const copy = PART_COPY[selected];

  return (
    <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="relative h-[440px] bg-canvas md:h-[600px]">
        <Corners />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={exploded}
            onClick={() => setExploded((v) => !v)}
            className={`label border px-2 py-1 ${exploded ? "border-cyan !text-cyan" : "border-line"}`}
          >
            Exploded
          </button>
          <button
            type="button"
            aria-pressed={ortho}
            onClick={() => setOrtho((v) => !v)}
            className={`label border px-2 py-1 ${ortho ? "border-cyan !text-cyan" : "border-line"}`}
          >
            Orthographic
          </button>
        </div>
        <div className="absolute right-4 bottom-4 z-10 label">
          SENTINEL · SN-04 · CONCEPT
        </div>
        <Canvas
          key={ortho ? "ortho" : "persp"}
          orthographic={ortho}
          camera={
            ortho
              ? { position: [2.6, 1.5, 3.1], zoom: 100 }
              : { position: [3.4, 2.2, 4.2], fov: 35 }
          }
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#141c12"]} />
          <ambientLight intensity={1.4} />
          <hemisphereLight args={["#e3e8d8", "#4c5941", 1.8]} />
          <directionalLight position={[4, 6, 3]} intensity={3.2} />
          <directionalLight
            position={[-4, 2, -2]}
            intensity={1.8}
            color="#c8dbab"
          />
          <SentinelModel
            reducedMotion={reducedMotion}
            exploded={exploded}
            selected={selected}
            onSelect={setSelected}
          />
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
                aria-pressed={selected === part}
                onClick={() => setSelected(part)}
                className={`border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${
                  selected === part
                    ? "border-cyan text-cyan"
                    : "border-line text-muted"
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
