import type { Metadata } from "next";
import { MediaKit } from "@/components/media/MediaKit";
import { MarketingShell } from "@/components/site/MarketingShell";

export const metadata: Metadata = {
  title: "Media",
  description: "Ready posts and screenshot guidance for Aegis Wildlife Systems.",
  robots: { index: false, follow: false },
};

export default function MediaPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
        <p className="label !text-cyan">Media kit</p>
        <h1 className="mt-4 text-4xl tracking-tight">Post without overselling.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Use a 16:9 crop of Command with SIMULATION visible in the chrome, or
          the Sentinel hardware hero. Always say tabletop / concept. Do not
          claim fielded detection, affiliation with other companies, or physical
          intervention.
        </p>
        <div className="mt-12">
          <MediaKit />
        </div>
      </section>
    </MarketingShell>
  );
}
