"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, MeshStandardMaterial } from "three";
import type { SentinelPart } from "./parts";

const BODY = "#1a222c";
const PLATE = "#2b3542";
const DARK = "#0e141a";
const GLASS = "#08141c";
const RING = "#8aa0b0";
const CYAN = "#7dd3e8";

const EXPLODE: Record<SentinelPart, [number, number, number]> = {
  housing: [0, 0, 0],
  optic: [0, 0, 0.42],
  thermal: [0.55, 0.06, 0.16],
  compute: [0, -0.48, -0.1],
  comms: [0.08, 0.55, -0.06],
  health: [0.32, 0.22, 0.32],
  mount: [0, -0.16, -0.55],
};

function selectMat(selected: boolean, base: string) {
  return {
    color: base,
    metalness: 0.78,
    roughness: 0.36,
    emissive: selected ? CYAN : "#000000",
    emissiveIntensity: selected ? 0.08 : 0,
  };
}

export function SentinelModel({
  exploded,
  selected,
  onSelect,
}: {
  exploded: boolean;
  selected: SentinelPart;
  onSelect: (part: SentinelPart) => void;
}) {
  const group = useRef<Group>(null);
  const target = useMemo(() => ({ e: exploded ? 1 : 0 }), [exploded]);
  const current = useRef(0);
  const led = useRef<MeshStandardMaterial>(null);

  useFrame((_, dt) => {
    current.current += (target.e - current.current) * Math.min(1, dt * 5);
    const k = current.current;
    if (!group.current) return;
    group.current.children.forEach((child) => {
      const part = child.userData.part as SentinelPart | undefined;
      if (!part) return;
      const [x, y, z] = EXPLODE[part];
      child.position.set(x * k, y * k, z * k);
    });
    if (led.current) {
      led.current.emissiveIntensity = 0.55 + Math.sin(performance.now() / 280) * 0.25;
    }
  });

  const pick = (part: SentinelPart) => (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSelect(part);
  };

  return (
    <group ref={group} rotation={[0.28, 0.72, 0]}>
      <group userData={{ part: "mount" }} onClick={pick("mount")}>
        <mesh position={[0, -0.62, -0.22]} castShadow>
          <boxGeometry args={[0.7, 0.1, 1.35]} />
          <meshStandardMaterial {...selectMat(selected === "mount", PLATE)} />
        </mesh>
        <mesh position={[0, -0.48, -0.05]}>
          <boxGeometry args={[0.28, 0.22, 0.28]} />
          <meshStandardMaterial color={BODY} metalness={0.8} roughness={0.32} />
        </mesh>
      </group>

      <group userData={{ part: "housing" }} onClick={pick("housing")}>
        <mesh castShadow>
          <boxGeometry args={[1.28, 0.78, 0.86]} />
          <meshStandardMaterial {...selectMat(selected === "housing", BODY)} />
        </mesh>
        <mesh position={[0, 0.44, 0.02]}>
          <boxGeometry args={[1.32, 0.08, 0.92]} />
          <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.05, 0.44]}>
          <boxGeometry args={[0.7, 0.16, 0.06]} />
          <meshStandardMaterial color={DARK} metalness={0.4} roughness={0.55} />
        </mesh>
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.18, 0.44]}>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 10]} />
            <meshStandardMaterial color={RING} metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      <group userData={{ part: "optic" }} onClick={pick("optic")}>
        <mesh position={[0, 0.06, 0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.3, 0.38, 40]} />
          <meshStandardMaterial {...selectMat(selected === "optic", PLATE)} />
        </mesh>
        <mesh position={[0, 0.06, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 40]} />
          <meshStandardMaterial color={RING} metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.06, 0.84]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 40]} />
          <meshStandardMaterial
            color={GLASS}
            metalness={0.15}
            roughness={0.04}
            emissive="#163846"
            emissiveIntensity={0.55}
          />
        </mesh>
        <mesh position={[0, 0.28, 0.7]}>
          <boxGeometry args={[0.62, 0.08, 0.34]} />
          <meshStandardMaterial color={DARK} metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      <group userData={{ part: "thermal" }} onClick={pick("thermal")}>
        <mesh position={[0.52, 0.04, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.28, 24]} />
          <meshStandardMaterial {...selectMat(selected === "thermal", PLATE)} />
        </mesh>
        <mesh position={[0.52, 0.04, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 24]} />
          <meshStandardMaterial color="#4a2218" metalness={0.35} roughness={0.18} />
        </mesh>
      </group>

      <group userData={{ part: "compute" }} onClick={pick("compute")}>
        <mesh position={[0, -0.28, -0.16]} castShadow>
          <boxGeometry args={[0.82, 0.26, 0.5]} />
          <meshStandardMaterial {...selectMat(selected === "compute", PLATE)} />
        </mesh>
        {[-0.24, -0.08, 0.08, 0.24].map((x) => (
          <mesh key={x} position={[x, -0.28, -0.42]}>
            <boxGeometry args={[0.06, 0.2, 0.1]} />
            <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.48} />
          </mesh>
        ))}
      </group>

      <group userData={{ part: "comms" }} onClick={pick("comms")}>
        <mesh position={[0.34, 0.62, -0.12]}>
          <cylinderGeometry args={[0.028, 0.034, 0.62, 12]} />
          <meshStandardMaterial {...selectMat(selected === "comms", RING)} />
        </mesh>
        <mesh position={[0.34, 0.96, -0.12]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.4} />
        </mesh>
      </group>

      <group userData={{ part: "health" }} onClick={pick("health")}>
        <mesh position={[0.54, 0.26, 0.22]}>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshStandardMaterial
            ref={led}
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}
