import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CommandOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0B0F14",
          color: "#E8EEF4",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, letterSpacing: 4, color: "#7DD3E8" }}>
          <span>AEGIS COMMAND</span>
          <span>SIMULATION</span>
        </div>
        <div style={{ marginTop: 48, fontSize: 52, lineHeight: 1.1 }}>
          Northridge Wildlife Park
        </div>
        <div style={{ marginTop: 12, fontSize: 28, color: "#8B9BB0" }}>
          HAB-01 public barrier · tabletop incident
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            gap: 16,
            fontSize: 16,
            letterSpacing: 2,
            color: "#E8B86D",
          }}
        >
          DETECT → CORROBORATE → ALERT → HUMAN COMMAND
        </div>
      </div>
    ),
    { ...size },
  );
}
