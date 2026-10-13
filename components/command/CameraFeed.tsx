"use client";

import { useEffect, useRef } from "react";
import { Corners } from "@/components/site/Corners";
import type { DemoState } from "@/lib/demo/types";

export function CameraFeed({ state }: { state: DemoState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#0a1014";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#132018";
      ctx.fillRect(0, h * 0.28, w, h * 0.5);
      ctx.fillStyle = "#1a2a20";
      ctx.beginPath();
      ctx.ellipse(w * 0.62, h * 0.46, 90, 48, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#3a4a3a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.72);
      ctx.lineTo(w, h * 0.58);
      ctx.stroke();

      const tigerX = w * 0.58 + Math.sin(t * 0.7) * 18;
      const tigerY = h * 0.42 + Math.cos(t * 0.5) * 8;
      ctx.fillStyle = "#c4a05a";
      ctx.beginPath();
      ctx.ellipse(tigerX, tigerY, 22, 11, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#7DD3E8";
      ctx.lineWidth = 1;
      ctx.strokeRect(tigerX - 30, tigerY - 18, 60, 36);
      ctx.fillStyle = "#7DD3E8";
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("TIGER-01", tigerX - 28, tigerY - 22);

      if (state.phase !== "idle" && state.phase !== "resolved") {
        const visY =
          state.phase === "approach"
            ? h * 0.82
            : state.phase === "warning"
              ? h * 0.7
              : h * 0.62;
        ctx.strokeStyle = state.phase === "incident" ? "#E05252" : "#E8B86D";
        ctx.strokeRect(w * 0.28, visY - 28, 44, 56);
        ctx.fillStyle = state.phase === "incident" ? "#E05252" : "#E8B86D";
        ctx.fillText("VIS-07", w * 0.28, visY - 32);
        ctx.fillStyle = "#d8d0c4";
        ctx.fillRect(w * 0.34, visY - 10, 10, 28);
      }

      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }

      if (state.phase === "degraded" && state.feedId === "CAM-05") {
        ctx.fillStyle = "rgba(11,15,20,0.15)";
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [state.phase, state.feedId]);

  return (
    <div className="relative overflow-hidden bg-black">
      <Corners />
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 px-3 py-2">
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crit pulse-crit" />
          <span className="label truncate !text-ink">{state.feedId}</span>
        </span>
        <span className="label shrink-0">SIM</span>
      </div>
      <canvas ref={canvasRef} width={640} height={360} className="h-[200px] w-full object-cover md:h-[220px]" />
      {state.phase === "degraded" ? (
        <div className="absolute inset-x-0 top-10 mx-3 border border-crit/40 bg-canvas/70 px-2 py-1 text-[10px] tracking-[0.14em] text-crit uppercase">
          Failover active · CAM-04 no signal
        </div>
      ) : null}
    </div>
  );
}
