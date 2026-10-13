# Aegis Wildlife Systems

An early-stage concept and prototype for an AI-assisted safety and animal-intelligence layer at zoos, wildlife parks, and sanctuaries.

The website’s primary goal is to connect with zoo and wildlife teams, builders, researchers, and potential partners. The main invitation is **Join the conversation**; the prototype supports the idea and helps people give concrete feedback.

**AEGIS** is the common operating picture. **SENTINEL** is a ruggedized edge node. **COMMAND** is a simulation-only incident console.

This is Stage 1: tabletop software. It does not connect to live cameras, does not control infrastructure, and does not replace barriers, locks, staffing, or emergency procedures. Aegis Wildlife Systems is not affiliated with Anduril Industries or Palantir Technologies.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` company site
- `/aegis` software
- `/sentinel` hardware prototype
- `/command` incident simulation
- `/company` mission and principles
- `/contact` introductions, collaboration, and opportunities
- `/media` social copy

## Demo

On `/command`, the scenario walks a visitor toward the public barrier at Tiger Habitat 01, shows single-sensor uncertainty, corroboration, acknowledgement, camera loss, and after-action review. Space pauses. `R` resets.

## Design

The redesign uses immersive landscape imagery, restrained typography, fine architectural rules, and an operational workspace with working navigation. See [design notes and generated-image provenance](docs/design-redesign.md).

The contact form opens an email draft; it does not store submissions or send mail from a backend.

## Stack

Next.js, TypeScript, Tailwind CSS, React Three Fiber (Sentinel prototype only). No database. No accounts.
