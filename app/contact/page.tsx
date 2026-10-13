import type { Metadata } from "next";
import { BriefingForm } from "@/components/contact/BriefingForm";
import { MarketingShell } from "@/components/site/MarketingShell";

export const metadata: Metadata = {
  title: "Request a briefing",
  description:
    "Request a 20-minute Aegis tabletop with zoo operations, animal care, and security leads.",
};

export default function ContactPage() {
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-[1400px] gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="label !text-cyan">Contact</p>
          <h1 className="mt-4 text-5xl tracking-tight">Request a briefing</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Intended for directors of operations, animal care leadership, and
            security at zoos, parks, and sanctuaries. Bring the people who own
            the current emergency procedure.
          </p>
          <ul className="mt-8 space-y-3 text-sm leading-6 text-muted">
            <li>— 20 minutes, tabletop, simulation only</li>
            <li>— One narrow scenario: public-side barrier approach</li>
            <li>— We will not ask you to connect live cameras</li>
            <li>— No autonomous intervention is on the table</li>
          </ul>
        </div>
        <BriefingForm />
      </section>
    </MarketingShell>
  );
}
