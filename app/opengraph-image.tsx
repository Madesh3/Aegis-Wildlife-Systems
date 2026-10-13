import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#141c12",
        color: "#eeeee6",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 18,
          letterSpacing: 6,
          color: "#bfceb1",
        }}
      >
        AEGIS WILDLIFE SYSTEMS
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>
          Protect what cannot be replaced.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#b5c2a8",
            maxWidth: 800,
          }}
        >
          An early-stage vision. Looking for zoo teams, builders, and
          collaborators to bring it to life.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 32,
          fontSize: 16,
          letterSpacing: 3,
          color: "#95a785",
        }}
      >
        <span>CONNECT</span>
        <span>COLLABORATE</span>
        <span>BUILD TOGETHER</span>
      </div>
    </div>,
    { ...size },
  );
}
