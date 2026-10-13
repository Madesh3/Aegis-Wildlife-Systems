import Image from "next/image";
import Link from "next/link";
import { HeroConsole } from "@/components/home/HeroConsole";
import { Button } from "@/components/site/Button";
import { Icon } from "@/components/site/Icon";
import { MarketingShell } from "@/components/site/MarketingShell";

export default function Home() {
  return (
    <MarketingShell>
      <section className="home-hero">
        <Image
          src="/images/conservation-landscape.webp"
          alt="Elephants moving across an expansive conservation landscape at dawn; concept imagery."
          fill
          sizes="(max-width: 760px) 1600px, 100vw"
          preload
          className="hero-landscape"
        />
        <div className="hero-shade" />
        <div className="hero-content page-width">
          <div className="eyebrow">
            <span className="status-dot" /> AN OPEN INVITATION TO BUILD TOGETHER
          </div>
          <h1>
            Protect what
            <br />
            cannot be
            <br />
            <span>replaced.</span>
          </h1>
          <div className="hero-bottom">
            <div>
              <p>
                An early-stage vision for protecting people and wildlife.
                <br className="desktop-break" /> Looking for zoo teams,
                builders, and people who share the mission.
              </p>
              <div className="hero-actions">
                <Button href="/contact">Join the conversation</Button>
                <Link href="/aegis" className="text-link">
                  Explore the idea <Icon name="external" size={16} />
                </Link>
              </div>
            </div>
            <div className="hero-coordinate">
              <span>AEGIS / FIELD OF VISION</span>
              <div className="crosshair-mark">
                <Icon name="crosshair" size={38} />
              </div>
              <span>OBSERVE. UNDERSTAND. PROTECT.</span>
            </div>
          </div>
        </div>
        <div className="hero-caption">
          <span>01 / A NEW PERSPECTIVE ON PROTECTION</span>
          <span>
            SEEKING COLLABORATORS <span className="caption-plus">+</span>
          </span>
        </div>
      </section>
      <div className="sector-strip">
        <span>LOOKING TO CONNECT WITH</span>
        <div>
          <span>Zoo & wildlife teams</span>
          <span>Engineers & builders</span>
          <span>Researchers</span>
          <span>Mission-aligned partners</span>
        </div>
        <Icon name="external" />
      </div>
      <section className="mission-section light-section">
        <div className="page-width">
          <div className="section-marker">
            <span>01 — THE MISSION</span>
            <Icon name="crosshair" size={17} />
          </div>
          <div className="mission-grid">
            <h2>
              An idea worth building.
              <br />
              <span>A mission worth sharing.</span>
            </h2>
            <div>
              <p>
                What if the people protecting wildlife could see risk earlier,
                understand what’s happening, and respond together? That’s the
                idea behind Aegis.
              </p>
              <p className="secondary-copy">
                I’m developing a concept that connects cameras, sensors, and
                human judgment. The next step is finding the right people to
                learn from and build with— from zoo teams who know the
                challenges to collaborators who want to help solve them.
              </p>
              <Link href="/company" className="text-link dark-link">
                Why I’m building Aegis <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="collaborate-section light-section" id="get-involved">
        <div className="page-width">
          <div className="section-marker">
            <span>02 — THE PEOPLE WHO MAKE IT POSSIBLE</span>
            <span>OPEN TO CONNECTIONS</span>
          </div>
          <div className="section-heading">
            <h2>
              There’s a place
              <br />
              for your perspective.
            </h2>
            <p>
              A conversation, a shared skill, or the right introduction.
              <br />
              There are many ways to move this idea forward.
            </p>
          </div>
          <div className="collaboration-grid">
            {[
              [
                "01",
                "Zoo & wildlife teams",
                "Help ground the idea in reality. Share the challenges your team faces, offer feedback, or explore what a future collaboration could look like.",
                "Share your experience",
              ],
              [
                "02",
                "Builders & curious minds",
                "Engineers, designers, researchers, and animal-care specialists: if this problem interests you, let’s explore what we could create together.",
                "Build alongside me",
              ],
              [
                "03",
                "Partners & connectors",
                "Have a relevant opportunity, an introduction, or a way to support the mission? I’d love to hear it. The right connection can change what’s possible.",
                "Make a connection",
              ],
            ].map(([number, title, body, action]) => (
              <Link key={number} href="/contact" className="collaboration-card">
                <span>{number} /</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <strong>
                  {action}
                  <Icon name="arrow" size={17} />
                </strong>
              </Link>
            ))}
          </div>
          <p className="collaboration-note">
            Aegis is at the concept and prototype stage. This is an invitation
            to shape what comes next.
          </p>
        </div>
      </section>
      <section className="platform-section page-width">
        <div className="section-marker">
          <span>03 — THE PROPOSED SOLUTION</span>
          <span>CONCEPT & EARLY PROTOTYPE</span>
        </div>
        <div className="section-heading">
          <h2>
            One mission.
            <br />A connected system.
          </h2>
          <p>
            Two connected ideas to explore with future collaborators.
            <br />
            Your experience can help shape what they become.
          </p>
        </div>
        <div className="product-grid">
          <Link href="/aegis" className="product-card software-card">
            <div className="product-top">
              <span className="eyebrow">01 / INTELLIGENCE PLATFORM</span>
              <Icon name="external" size={24} />
            </div>
            <div className="fusion-visual" aria-hidden="true">
              <div className="fusion-orbit orbit-one" />
              <div className="fusion-orbit orbit-two" />
              <div className="fusion-core">
                <Icon name="layers" size={38} />
              </div>
              <span className="fusion-node node-one">
                <Icon name="scan" />
              </span>
              <span className="fusion-node node-two">
                <Icon name="activity" />
              </span>
              <span className="fusion-node node-three">
                <Icon name="shield" />
              </span>
              <span className="fusion-label">MANY SIGNALS. ONE PICTURE.</span>
            </div>
            <div className="product-copy">
              <h3>
                Aegis Command<span>Software prototype</span>
              </h3>
              <p>
                A prototype exploring how evidence, context, and a coordinated
                response could come together in one workspace.
              </p>
              <span className="product-link">
                Explore the concept <Icon name="arrow" />
              </span>
            </div>
          </Link>
          <Link href="/sentinel" className="product-card hardware-card">
            <div className="product-top">
              <span className="eyebrow">02 / FIELD INTELLIGENCE</span>
              <Icon name="external" size={24} />
            </div>
            <div className="sentinel-visual" aria-hidden="true">
              <div className="device-shadow" />
              <div className="device-mount" />
              <div className="device-body">
                <div className="device-face">
                  <div className="device-lens">
                    <i />
                  </div>
                  <span className="device-led" />
                  <div className="device-small-lens" />
                </div>
                <span className="device-wordmark">AEGIS / S01</span>
              </div>
              <span className="device-caption">
                SENTINEL NODE — CONCEPT DESIGN
              </span>
            </div>
            <div className="product-copy">
              <h3>
                Aegis Sentinel<span>Hardware concept</span>
              </h3>
              <p>
                Eyes on the ground. A ruggedized sensing concept designed for
                local intelligence and visible system health.
              </p>
              <span className="product-link">
                Meet Sentinel <Icon name="arrow" />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="command-section">
        <div className="page-width">
          <div className="section-marker">
            <span>04 — EXPLORE THE IDEA</span>
            <span className="simulation-tag">INTERACTIVE SIMULATION</span>
          </div>
          <div className="section-heading">
            <h2>
              A glimpse of
              <br />
              what we could build.
            </h2>
            <div>
              <p>
                Try the simulated workflow and see the thinking behind it.
                <br />
                Then tell me what could make it useful in the real world.
              </p>
              <Link href="/command" className="text-link">
                Explore the prototype <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <HeroConsole />
          <div className="console-footnote">
            <span>ILLUSTRATIVE FACILITY · SIMULATED EVENTS & METRICS</span>
            <span>HUMAN AUTHORITY. ALWAYS.</span>
          </div>
        </div>
      </section>
      <section className="principles-section light-section">
        <div className="page-width">
          <div className="section-marker">
            <span>05 — THE PRINCIPLES</span>
            <Icon name="shield" size={18} />
          </div>
          <h2>
            Designed around trust.
            <br />
            Grounded in responsibility.
          </h2>
          <div className="principles-grid">
            {[
              [
                "01",
                "Clarity over noise",
                "Understand the evidence behind every alert. Sources, confidence, and uncertainty remain visible.",
              ],
              [
                "02",
                "Resilience by design",
                "When a sensor goes down, your awareness shouldn’t. Degraded coverage is always explicit.",
              ],
              [
                "03",
                "People in command",
                "Intelligence informs. Trained teams decide. Every critical action has a human owner.",
              ],
            ].map(([n, title, body]) => (
              <article key={n}>
                <span className="principle-number">{n} /</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-section">
        <div className="page-width">
          <div className="eyebrow">
            CONNECTIONS. COLLABORATION. POSSIBILITY.
          </div>
          <div className="closing-grid">
            <h2>
              A shared mission
              <br />
              starts with a conversation.
            </h2>
            <div>
              <p>
                Work with animals? Build technology? Know someone I should meet?
                I’m open to conversations, introductions, collaboration, and
                opportunities that could help bring Aegis to life.
              </p>
              <Button href="/contact">Let’s connect</Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
