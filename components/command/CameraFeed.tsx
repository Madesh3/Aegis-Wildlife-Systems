import Image from "next/image";
import type { DemoState } from "@/lib/demo/types";
export function CameraFeed({ state }: { state: DemoState }) {
  return (
    <div className="camera-feed">
      <Image
        src="/images/tiger-habitat.webp"
        alt="Generated reference still of a tiger in a naturalistic habitat. This is simulation imagery, not live video."
        fill
        sizes="(max-width: 760px) 100vw, 340px"
        className="camera-image"
      />
      <div className="camera-top">
        <span>◉ {state.feedId}</span>
        <span>REFERENCE STILL</span>
      </div>
      <div className="animal-detection">
        <span>TIGER-01</span>
      </div>
      <div className="camera-bottom">
        <span>HAB-01 / CONCEPT IMAGERY</span>
        <span>SIM</span>
      </div>
      {state.phase === "degraded" && (
        <div className="camera-failover">
          Failover scenario · CAM-04 offline
        </div>
      )}
    </div>
  );
}
