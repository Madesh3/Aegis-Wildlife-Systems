"use client";
import { useState, type ReactNode } from "react";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/site/Icon";
const INTERESTS = [
  "Zoo or wildlife organization",
  "Engineer, designer, or builder",
  "Research, animal care, or safety",
  "Partnership or opportunity",
  "Introduction or support",
  "Just interested in the mission",
];
export function ConnectionForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [message, setMessage] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);
  const subject = encodeURIComponent(
    `Let’s connect about Aegis — ${name || "Introduction"}`,
  );
  const body = encodeURIComponent(
    `Name: ${name}\nOrganization: ${org || "Independent"}\nInterested in: ${interest}\n\n${message}`,
  );
  const href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setDraftOpened(true);
        window.location.href = href;
      }}
    >
      <div className="mb-7">
        <p className="label !text-cyan">Introduce yourself</p>
        <h2 className="mt-3 text-2xl tracking-tight">
          Where could we go together?
        </h2>
      </div>
      <Field label="Your name">
        <input
          required
          autoComplete="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="w-full px-3 py-3"
        />
      </Field>
      <Field label="Organization (optional)">
        <input
          autoComplete="organization"
          name="organization"
          value={org}
          onChange={(event) => setOrg(event.target.value)}
          placeholder="A team, organization, or just you"
          className="w-full px-3 py-3"
        />
      </Field>
      <Field label="What brings you here?">
        <select
          name="interest"
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          className="w-full px-3 py-3"
        >
          {INTERESTS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>
      <Field label="A little about you">
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="What interests you about Aegis? Share an idea, your experience, or a way we might work together."
          className="w-full px-3 py-3"
        />
      </Field>
      <button type="submit" className="aegis-button button-solid w-full">
        Start a conversation
        <Icon name="arrow" size={17} />
      </button>
      <p className="text-xs leading-6 text-muted">
        Opens a draft in your email app for you to review and send. Your details
        aren’t stored on this website.
      </p>
      {draftOpened && (
        <p role="status" className="text-xs leading-6 text-cyan">
          Your email app has been requested. If it didn’t open, email{" "}
          <a href={`mailto:${SITE.contactEmail}`} className="underline">
            {SITE.contactEmail}
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      {children}
    </label>
  );
}
