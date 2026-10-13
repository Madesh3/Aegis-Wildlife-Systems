import type { Metadata } from "next";
import { ConnectionForm } from "@/components/contact/ConnectionForm";
import { MarketingShell } from "@/components/site/MarketingShell";
import { SITE } from "@/lib/site";
export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Connect with the person behind Aegis. Share experience, explore collaboration, make an introduction, or bring an opportunity to help protect people and wildlife.",
};
export default function ContactPage() {
  return (
    <MarketingShell>
      <section className="contact-section page-width grid gap-12 py-20 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="label !text-cyan">Get involved</p>
          <h1 className="mt-4 text-5xl tracking-tight">
            Good things start
            <br />
            with a conversation.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            I have a concept, a prototype, and a mission I care about. Now I’m
            looking for the people who can help take it further.
          </p>
          <p className="mt-5 text-base leading-8 text-muted">
            Whether you work at a zoo, build technology, study animal welfare,
            or see an opportunity to work together—I’d like to hear from you.
          </p>
          <ul className="mt-8 space-y-3 text-sm leading-6 text-muted">
            <li>Share practical experience or feedback</li>
            <li>Explore building or researching together</li>
            <li>Introduce someone who shares the mission</li>
            <li>Bring a partnership, support, or another opportunity</li>
          </ul>
          <div className="mt-10 border-t border-line pt-6">
            <p className="label">Prefer a direct introduction?</p>
            <a className="text-link mt-2" href={`mailto:${SITE.contactEmail}`}>
              {SITE.contactEmail} ↗
            </a>
            <p className="mt-4 text-xs leading-6 text-muted">
              You don’t need a formal proposal. A short hello is a good place to
              start.
            </p>
          </div>
        </div>
        <ConnectionForm />
      </section>
    </MarketingShell>
  );
}
