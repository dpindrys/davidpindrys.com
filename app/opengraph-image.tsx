import { ImageResponse } from "next/og";

export const alt = "David Pindrys, Healthcare Product Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card used when the site is shared in LinkedIn, Slack, or email. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F4F2EE",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#0078B3",
              fontWeight: 600,
            }}
          >
            Healthcare Product Design
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#000000",
              fontWeight: 700,
              maxWidth: 940,
            }}
          >
            I design digital healthcare products that make complex clinical
            workflows clearer, safer, and easier to use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(0,0,0,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#000000" }}>
            David Pindrys
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(0,0,0,0.6)" }}>
            davidpindrys.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
