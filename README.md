# Aegis Wildlife Systems

A concept demonstration for an AI-assisted safety and animal-intelligence layer at zoos, wildlife parks, and sanctuaries.

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
- `/contact` briefing request
- `/media` social copy

## Demo

On `/command`, the scenario walks a visitor toward the public barrier at Tiger Habitat 01, shows single-sensor uncertainty, corroboration, acknowledgement, camera loss, and after-action review. Space pauses. `R` resets.

## Stack

Next.js, TypeScript, Tailwind CSS, React Three Fiber (Sentinel prototype only). No database. No accounts.
