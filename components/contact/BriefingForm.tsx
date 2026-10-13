"use client";

import { useState, type ReactNode } from "react";
import { SITE } from "@/lib/site";

const ROLES = [
  "Operations / facilities",
  "Animal care / veterinary",
  "Security / emergency",
  "Director / executive",
  "Other",
];

export function BriefingForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [message, setMessage] = useState(
    "I would like a 20-minute tabletop on AEGIS COMMAND with operations and animal care.",
  );

  const subject = encodeURIComponent(`Aegis briefing — ${org || "facility"}`);
  const body = encodeURIComponent(
    `Name: ${name}\nOrganization: ${org}\nRole: ${role}\n\n${message}`,
  );
  const href = `mailto:${SITE.briefingEmail}?subject=${subject}&body=${body}`;

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <Field label="Name">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2.5"
        />
      </Field>
      <Field label="Organization">
        <input
          required
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          className="w-full px-3 py-2.5"
        />
      </Field>
      <Field label="Role">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2.5"
        >
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </Field>
      <Field label="Message">
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2.5"
        />
      </Field>
      <button
        type="submit"
        className="border border-ink bg-ink px-4 py-2.5 text-[13px] tracking-[0.14em] text-canvas uppercase"
      >
        Open email draft
      </button>
      <p className="text-xs leading-5 text-dim">
        Opens your mail client. No account is created. This is a concept
        demonstration, not a procurement portal.
      </p>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      {children}
    </label>
  );
}
