import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0F14",
          color: "#E8EEF4",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 6, color: "#7DD3E8" }}>
          AEGIS WILDLIFE SYSTEMS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>
            A common operating picture for animal facilities.
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#8B9BB0", maxWidth: 800 }}>
            Detect earlier. Coordinate under pressure. Humans remain in command.
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 16, letterSpacing: 3, color: "#5C6B7E" }}>
          <span>AEGIS</span>
          <span>SENTINEL</span>
          <span>COMMAND · SIMULATION</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
