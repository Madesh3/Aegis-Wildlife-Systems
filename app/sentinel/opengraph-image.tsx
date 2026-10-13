import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SentinelOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0B0F14",
          color: "#E8EEF4",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 6, color: "#7DD3E8" }}>HARDWARE · CONCEPT</div>
        <div style={{ marginTop: 20, fontSize: 72 }}>SENTINEL</div>
        <div style={{ marginTop: 16, fontSize: 26, color: "#8B9BB0", maxWidth: 820 }}>
          Fixed edge node for public barriers. Observe, detect, verify, communicate.
        </div>
      </div>
    ),
    { ...size },
  );
}
