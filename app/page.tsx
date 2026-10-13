import Link from "next/link";
import { HeroConsole } from "@/components/home/HeroConsole";
import { Button } from "@/components/site/Button";
import { Corners } from "@/components/site/Corners";
import { MarketingShell } from "@/components/site/MarketingShell";

export default function Home() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-bg vignette absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28">
          <p className="label !text-cyan">Aegis Wildlife Systems</p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight text-ink sm:text-6xl md:text-[72px]">
            A common operating picture for animal facilities.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Detect earlier. Coordinate under pressure. Keep people and animals
            under human command.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/command">Launch command</Button>
            <Button href="/contact" variant="ghost">
              Request a briefing
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 text-[11px] tracking-[0.16em] text-dim uppercase">
            <span>Zoos</span>
            <span>Wildlife parks</span>
            <span>Sanctuaries</span>
            <span>Aquariums</span>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
          <HeroConsole />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          <ProductCard
            kicker="Software"
            title="Aegis"
            body="Fuse cameras, gates, boundary sensors, and staff events into one incident picture. Show confidence, conflict, and what the system cannot see."
            href="/aegis"
          />
          <ProductCard
            kicker="Hardware"
            title="Sentinel"
            body="A ruggedized edge node for public barriers and keeper zones. Local detection, health telemetry, and store-and-forward when the network drops."
            href="/sentinel"
            last
          />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="label">Principles</div>
          <h2 className="mt-4 max-w-2xl text-3xl tracking-tight">
            Mission-critical habits. A different mission.
          </h2>
          <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Prevent first", "Detect unsafe approach before a response is required."],
              ["Fuse, don’t hide", "Every alert carries source, confidence, and missing data."],
              ["Humans command", "AI detects and recommends. Authorized staff decide."],
              ["Degrade visibly", "A failed camera is uncovered ground — never a green tile."],
            ].map(([title, body]) => (
              <div key={title} className="bg-canvas p-5">
                <div className="text-sm tracking-tight">{title}</div>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="label">Workflow</div>
            <h2 className="mt-4 text-3xl tracking-tight">
              From imperfect signals to a disciplined response.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              The tabletop follows a visitor approaching the public barrier at
              Tiger Habitat 01. It is labeled simulation. Nothing here controls
              a gate, a deterrent, or an animal.
            </p>
            <div className="mt-6">
              <Button href="/command" variant="cyan">
                Run the incident
              </Button>
            </div>
          </div>
          <ol className="mt-10 space-y-0 md:col-span-7 md:mt-0">
            {[
              ["Detect", "One or more sensors observe a potentially unsafe event."],
              ["Corroborate", "Independent evidence, timing, location, and health are checked."],
              ["Alert", "Prioritized notice with supporting evidence and uncertainty."],
              ["Command", "An authorized operator acknowledges and owns the incident."],
              ["Review", "Timeline, decisions, and system health are retained for drill."],
            ].map(([title, body], i) => (
              <li
                key={title}
                className="grid grid-cols-[48px_1fr] gap-4 border-t border-line py-4"
              >
                <span className="font-mono text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="tracking-tight">{title}</div>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden border border-line p-8 md:p-12">
            <Corners />
            <div className="label">For operations leads</div>
            <h2 className="mt-4 max-w-2xl text-3xl tracking-tight">
              A 20-minute tabletop with animal care, security, and facilities.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              We are looking for zoo and sanctuary partners to pressure-test the
              concept against real procedures — not to sell a finished product.
            </p>
            <div className="mt-8">
              <Button href="/contact">Request a briefing</Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function ProductCard({
  kicker,
  title,
  body,
  href,
  last,
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block p-8 md:p-12 ${last ? "" : "border-b border-line md:border-r md:border-b-0"}`}
    >
      <div className="label">{kicker}</div>
      <h2 className="mt-4 text-4xl tracking-tight">{title}</h2>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted">{body}</p>
      <span className="mt-8 inline-block label !text-cyan group-hover:!text-ink">
        View product →
      </span>
    </Link>
  );
}
