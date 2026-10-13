# ZooGuard Concept Brief

**Version 3 — ZooGuard Sentinel expansion**  
**Status:** Concept and validation document  
**Purpose:** A shared product vision for zoo safety, animal welfare, and emergency coordination

> **Important scope note:** ZooGuard is a decision-support and situational-awareness concept. It does not replace physical barriers, trained staff, veterinary judgment, established emergency procedures, or regulatory approval. Any physical intervention remains under qualified human control.

## 1. Product vision

ZooGuard is an AI-assisted safety and animal-intelligence platform for zoos, wildlife parks, sanctuaries, and other managed animal facilities.

Its purpose is to help staff detect danger earlier, understand what is happening across a facility, coordinate a disciplined response, and learn from incidents without compromising animal welfare. The system combines fixed cameras, independent sensors, edge computing, live operational maps, behavioral analytics, and human-approved response workflows.

The product direction takes inspiration from the engineering philosophy associated with mission-critical technology companies such as Anduril Industries and Palantir Technologies: fuse fragmented observations into one operational picture, keep working when infrastructure is degraded, make system health visible, and support accountable human decisions. ZooGuard applies those ideas to a different mission—protecting people and animals.

ZooGuard is not affiliated with, endorsed by, or modeled on proprietary technology from either company. The inspiration is limited to broad principles such as sensor fusion, resilient systems, clear command interfaces, and operator-centered decision support.

## 2. The problem

Zoos rely first on physical barriers, operating procedures, trained keepers, veterinary teams, security personnel, and emergency drills. Cameras and alarms can add valuable coverage, but conventional surveillance systems often produce disconnected video feeds rather than a coherent understanding of an event.

Important warning signs may appear across several systems:

- A visitor approaches or crosses a restricted boundary.
- A keeper enters a controlled work zone.
- An animal changes direction, speed, or behavior.
- A gate, camera, or communications link becomes unavailable.
- Multiple low-confidence signals together indicate elevated risk.

During an emergency, staff need more than video. They need a verified event, the relevant location and camera views, the positions of people and animals, the applicable response playbook, clear ownership, and an auditable timeline.

ZooGuard is intended to provide that shared operational picture while leaving safety-critical decisions with trained personnel.

## 3. Product principles

1. **Prevent before responding.** Detect unsafe approach and boundary behavior as early as practical.
2. **Physical safety remains primary.** Software supplements barriers, locks, procedures, and trained teams; it never substitutes for them.
3. **Protect humans and animals together.** The safest response should reduce risk without creating unnecessary distress or harm.
4. **Fuse evidence, do not hide uncertainty.** Show which sensors support an alert, their confidence, and any conflicting or missing data.
5. **Keep humans in command.** AI may detect, prioritize, and recommend. Authorized staff decide and act.
6. **Degrade safely.** Loss of a camera, network, sensor, or server must be visible and must not create a false impression that an area is protected.
7. **Design for accountability.** Record acknowledgements, approvals, actions, system state, and evidence for after-action review.
8. **Validate in the real environment.** Weather, darkness, vegetation, crowds, reflections, enclosure geometry, and animal diversity can all change system performance.

## 4. Core platform

### 4.1 Command Center

The Command Center is the main operational screen. It should feel like a mission-critical control surface rather than a grid of ordinary camera feeds.

```text
┌──────────────────────────────────────────────────────────────────────┐
│  ◈ ZOOGUARD         COMMAND CENTER          ● SYSTEM ONLINE   20:18 │
├────────────┬────────────────────────────────────┬────────────────────┤
│ OVERVIEW   │       LIVE FACILITY MAP            │ LIVE INTELLIGENCE  │
│ Operations │                                    │ CAM 04             │
│ Enclosures │    ┌───────────┐                   │ [LIVE VIDEO]       │
│ Animals    │    │ TIGER 01  │                   │ TIGER: ALT-01      │
│ Personnel  │    │    ●      │                   │ Status: ACTIVE     │
│ Incidents  │    └───────────┘                   │ Risk: LOW          │
│ Analytics  │                                    │                    │
│ Settings   │    ● Keeper 03                     │ Sensor health: 98% │
├────────────┴────────────────────────────────────┴────────────────────┤
│ EVENT STREAM                                                         │
│ 20:18:02  Animal movement detected           TIGER ENCLOSURE         │
│ 20:17:48  Keeper entered authorized zone     SECTOR B                │
│ 20:16:21  Camera health check completed      ALL SYSTEMS            │
└──────────────────────────────────────────────────────────────────────┘
```

*Conceptual layout. Events, identities, risk scores, and health metrics are illustrative.*

The central map shows enclosures, controlled zones, public boundaries, gates, cameras, sensors, animals, staff, and active incidents. Selecting an entity opens the relevant live views, recent movement, status, related alerts, and applicable procedures.

### 4.2 Enclosure Intelligence

Each enclosure has an operational view that brings together:

| Component | Information |
|---|---|
| Live camera | Current video with clearly labeled AI observations |
| Animal profile | Identity, species, care context, and relevant records |
| Movement | Current estimated position, direction, and recent path |
| Behavior | Resting, pacing, walking, feeding, and other validated classes |
| Risk indicators | Boundary activity, unusual proximity, and restricted-zone events |
| System health | Camera, sensor, compute, storage, power, and network status |
| Historical analytics | Habitat use, activity trends, and changes from an individual baseline |

Behavior analytics should report observable patterns, not unsupported diagnoses. For example, the system may flag increased pacing relative to an animal's recent baseline and recommend keeper review; it should not claim a medical cause.

### 4.3 Animal Intelligence

ZooGuard maintains an operational profile for each participating animal. The profile can summarize movement patterns, habitat use, activity changes, social interactions, feeding-area activity, and reviewed behavioral events.

An AI-generated daily briefing might read:

> ALT-01 showed more pacing than its recent baseline between 14:00 and 16:00. Activity was concentrated near the northern boundary. Three camera segments support this observation. Keeper review recommended.

Every summary should link back to its source observations and make uncertainty visible.

### 4.4 Incident Intelligence

When an incident is declared, ZooGuard assembles a shared incident view containing:

- The affected location and current risk state.
- Relevant live camera feeds and synchronized replay.
- Detected people, animals, gates, and safety zones.
- A timestamped event and acknowledgement timeline.
- The approved emergency playbook for that facility and scenario.
- Assigned roles, communication status, and outstanding checks.
- A record of operator decisions and system recommendations.

The platform should support prevention, active response, stabilization, and after-action review. It should never imply that an AI alert is confirmed until a human or an independently validated safety rule confirms it.

### 4.5 Controlled diversion and containment support

ZooGuard may support existing, facility-approved responses such as keeper alerts, public warnings, trained animal recall cues, remotely operated gates, or reward-based diversion. These actions require site-specific engineering, animal-training protocols, safe-state interlocks, and authorized human control.

The original concept of a food or reward release remains an experimental hypothesis. It must be evaluated by animal-care and behavioral specialists because it may fail, reinforce unwanted behavior, create competition between animals, or draw an animal toward an unsafe area. It should not be treated as a universal emergency solution.

## 5. ZooGuard Sentinel

ZooGuard Sentinel is the proposed field and operations layer of ZooGuard. It connects ruggedized sensing at an enclosure to the Command Center and turns multiple imperfect observations into a resilient, explainable operational picture.

The term **Sentinel** describes a safety system, not a weapon system. Its first responsibilities are to observe, detect, verify, communicate, and help trained teams respond.

### 5.1 Mission and boundaries

Sentinel is designed to:

- Detect risky approach, climbing, boundary crossing, falls, or entry into controlled zones.
- Track the relative positions and movement of people and animals where validation supports it.
- Identify loss or degradation of cameras, sensors, power, compute, or communications.
- Combine evidence into prioritized alerts with confidence and provenance.
- Deliver the right evidence and approved procedure to the right staff member quickly.
- Maintain an incident record for review, training, and system improvement.

Sentinel is not designed to:

- Replace enclosure barriers, locks, staffing, or emergency drills.
- Diagnose animal health or intent from video alone.
- Autonomously decide that a person or animal should be physically targeted.
- Autonomously deploy medication, projectiles, deterrents, gates, or other safety-critical mechanisms.
- Guarantee detection or prevention of every incident.

### 5.2 Ruggedized fixed camera nodes

Sentinel begins with fixed camera nodes installed to cover approach zones, public boundaries, transfer areas, gates, keeper work zones, and critical enclosure sightlines. Fixed infrastructure is preferred for the first version because it is easier to power, secure, inspect, validate, and aim consistently than a mobile platform.

A production node would need to be selected and installed for the specific environment. Relevant design requirements include:

- Weather-resistant housings appropriate to local temperature, precipitation, dust, humidity, and cleaning practices.
- Day and low-light coverage, with thermal or other modalities considered only where they provide validated benefit.
- Overlapping fields of view so a single obstructed or failed camera does not silently remove coverage from a critical zone.
- Tamper detection, lens-obstruction detection, health telemetry, and scheduled inspection.
- Stable mounting that accounts for vibration, animal access, vegetation growth, glare, reflections, and seasonal changes.
- Privacy-aware framing and retention rules for public and staff areas.

Camera placement must be based on a formal site survey. Marketing specifications alone do not establish useful coverage in a real enclosure.

### 5.3 Sensor fusion

No single sensor should be treated as ground truth. Sentinel combines observations from sources such as:

- Visible-light cameras.
- Thermal cameras where appropriate and validated.
- Gate, door, and lock-state sensors.
- Fence vibration or boundary sensors.
- Staff access-control events.
- Optional authorized staff wearables or location beacons.
- Environmental sensors and equipment-health telemetry.

The fusion layer should preserve the source, timestamp, quality, and confidence of each observation. A boundary alert supported by a camera track, fence event, and gate-state change should be presented differently from an alert generated by one partially obscured camera.

Conflicting evidence must remain visible. The interface should say “camera indicates entry; gate sensor unchanged” rather than collapsing disagreement into a misleading certainty score.

### 5.4 Edge AI

Sentinel performs selected analysis near the cameras so that time-sensitive detection can continue during network degradation and so that unnecessary video does not need to leave the site.

The edge layer may provide:

- Person and animal detection in approved zones.
- Multi-camera tracking where identity continuity has been validated.
- Virtual boundary and direction-of-travel events.
- Camera obstruction, severe image degradation, or frozen-feed detection.
- Local buffering of event evidence during connectivity loss.
- Signed health and event messages to the central platform.

Edge models must be versioned, tested, monitored for drift, and deployable through a controlled release process. The system should support rollback to a known-good model. Safety-critical rules should not depend on a continuously changing model without review.

### 5.5 Redundancy and safe degradation

Sentinel should avoid single points of failure in critical coverage. Depending on the site's risk assessment, this may include:

- Overlapping cameras or complementary sensors for critical boundaries.
- Local processing that continues through loss of the wide-area network.
- Battery-backed power for sensing, networking, and alerting components.
- Store-and-forward event delivery after an outage.
- Independent health monitoring and explicit “coverage degraded” states.
- A manual operating mode and documented fallback procedures.

Redundancy does not mean duplicating every component. It means identifying critical functions, understanding credible failure modes, and ensuring that failures are detectable and lead to a defined safe response.

### 5.6 Secure communications and access

Sentinel carries sensitive operational video, facility layouts, staff activity, animal information, and incident data. Security must be part of the architecture from the start.

The concept requires:

- Authenticated and encrypted communications between nodes, the site platform, and authorized clients.
- Device identity, secure provisioning, controlled software updates, and revocation of compromised devices.
- Role-based access with least privilege and strong authentication for privileged actions.
- Tamper-evident audit logs for alerts, acknowledgements, approvals, configuration changes, and exports.
- Network segmentation between camera or sensor infrastructure and general business systems.
- Defined retention, privacy, export, and incident-response policies.
- Offline procedures that do not assume cloud access during an emergency.

The detailed controls should be developed through threat modeling and independent security review rather than copied from a generic checklist.

### 5.7 Command-center interface

The Sentinel interface should reduce cognitive load under pressure. Its main job is to answer six questions:

1. What happened?
2. Where is it happening?
3. Which evidence supports the alert?
4. What is the system uncertain about or unable to see?
5. Who has acknowledged and taken command?
6. Which approved action or check comes next?

A critical incident view should prioritize the facility map, relevant live views, sensor agreement or conflict, the event timeline, system health, and the active playbook. It should suppress unrelated dashboard noise.

The design language can be dark, precise, and operational, using charcoal backgrounds, restrained cyan for active tracking, amber for warnings, and red only for confirmed or policy-defined critical states. Typography and animation should communicate state changes without becoming theatrical.

### 5.8 Human-in-the-loop emergency workflow

Sentinel uses an escalating workflow with explicit human authority:

1. **Detect.** One or more sensors observe a potentially unsafe event.
2. **Corroborate.** The fusion layer checks independent evidence, timing, location, and system health.
3. **Alert.** The platform sends a prioritized alert with supporting evidence and uncertainty.
4. **Acknowledge.** An authorized operator accepts responsibility or escalates to the designated incident lead.
5. **Verify.** Staff confirm the scenario using live views, direct communication, and facility procedures.
6. **Respond.** Trained personnel select and execute an approved playbook action.
7. **Monitor.** The platform tracks changing positions, communications, safety checks, and degraded coverage.
8. **Resolve.** The incident lead records stabilization and closes or hands off the incident.
9. **Review.** The organization examines the timeline, evidence, decisions, and system performance.

High-impact actions require stronger controls than acknowledgements. Appropriate safeguards may include role restrictions, a deliberate confirmation step, two-person approval, a physical enable control, action-specific interlocks, and a clear abort path. The exact mechanism must come from site risk analysis and applicable regulation.

### 5.9 Veterinary-controlled sedation as a speculative last resort

Remote sedation is included only as a speculative, long-term research question for qualified zoo, veterinary, legal, welfare, and safety experts. It is not part of the initial ZooGuard product and must not be presented as an autonomous AI capability.

Sedation is not an instant “off switch.” Effect and onset can vary with species, individual health, stress, delivery accuracy, environment, and medication. An injured, stressed, or partially affected animal may remain mobile, and an attempted intervention may increase risk to the animal or nearby people. A missed or inappropriate delivery can cause additional harm.

If a facility ever studies integration with a legally approved remote-delivery system, the minimum conceptual boundary is:

- A licensed veterinarian or other legally authorized professional retains exclusive decision authority.
- ZooGuard may provide location, camera views, identity context, and system health; it does not select medication, dose, target point, or firing solution.
- No model autonomously aims, arms, or activates a delivery device.
- Any integration is physically and logically isolated from routine analytics and requires deliberate enablement.
- Independent interlocks, positive identification, clear line-of-fire controls, abort capability, maintenance controls, and comprehensive logging would be mandatory subjects of professional engineering review.
- Regulatory approval, animal-welfare review, occupational safety review, insurer acceptance, and scenario-based validation are prerequisites.
- Conventional trained response plans remain necessary because sedation may be unavailable, inappropriate, unsuccessful, or too slow.

This brief intentionally excludes device construction, projectile design, medication selection, dosing, aiming, and deployment instructions. Those matters belong exclusively to qualified professionals operating under law and approved veterinary protocols.

### 5.10 Validation and safety limitations

Sentinel must be treated as unproven until validated for a particular site, species, enclosure, operating procedure, and environmental range.

Known limitations include:

- Occlusion by terrain, structures, vegetation, enrichment objects, crowds, or other animals.
- Reduced image quality in darkness, glare, rain, snow, fog, dust, reflections, or dirty lenses.
- False alarms and missed detections, including performance differences across clothing, mobility, body size, species, posture, and behavior.
- Tracking errors when entities overlap, leave view, or move between cameras.
- Clock drift, delayed messages, dropped packets, power loss, storage failure, and misconfigured zones.
- Behavior models that may not transfer between species, facilities, or individual animals.
- Human factors such as alarm fatigue, ambiguous authority, interface overload, or over-trust in automation.
- Cybersecurity, privacy, records-retention, labor, and regulatory constraints.

Validation should measure scenario-level outcomes rather than only model accuracy. Useful measures include detection latency, missed-event rate, nuisance-alert rate, time to acknowledgement, coverage availability, time spent in degraded mode, operator understanding, and completion of the correct playbook steps.

Testing should begin with recorded and simulated events, then proceed to controlled drills that do not endanger people or animals. Independent safety review and documented go/no-go criteria are required before operational use.

## 6. Technical architecture

```text
Ruggedized cameras and sensors
        │
        ▼
Edge node
  - validated detection and tracking
  - health monitoring
  - local event buffer
        │
        ▼
Secure site event bus and fusion service
  - time synchronization
  - entity and zone model
  - corroboration and confidence
  - incident state machine
        │
        ├──────────► Command Center and mobile alerts
        ├──────────► Evidence store and audit log
        └──────────► Analytics and after-action review
```

A prototype could use a web interface built with Next.js and React, a facility map using MapLibre or a lightweight 3D view, Python-based computer vision services, FastAPI, and WebSockets for simulated live events. Technology choices are provisional and should follow field requirements, security review, and maintainability—not the visual demo alone.

## 7. Staged MVP roadmap

### Stage 0 — Discovery and safety definition

**Goal:** Confirm the problem before building operational technology.

- Interview keepers, veterinarians, welfare specialists, security staff, facilities teams, and operations leaders.
- Map current barriers, response procedures, roles, and communication paths.
- Select one narrow scenario, such as public-side boundary approach and crossing.
- Define unacceptable failure modes, privacy constraints, validation metrics, and a human-factors test plan.
- Complete an initial threat model and site survey.

**Exit criterion:** A facility partner agrees that the selected scenario is valuable, measurable, ethically appropriate, and safe to simulate.

### Stage 1 — Simulation-only command-center prototype

**Goal:** Demonstrate the product experience without controlling real infrastructure.

- Build the Command Center, facility map, enclosure view, event stream, and incident timeline.
- Simulate a person approaching and crossing a restricted boundary.
- Show camera selection, sensor corroboration, system health, acknowledgement, and an approved playbook.
- Label every simulated event and metric clearly.

**Exit criterion:** Operators can understand the event, identify uncertainty, acknowledge it, and follow the correct workflow in a tabletop exercise.

### Stage 2 — Recorded-video detection prototype

**Goal:** Test perception against representative footage without live alerts.

- Evaluate person, animal, zone, and camera-health detection on consented or appropriately sourced recordings.
- Measure false alarms, missed events, latency, and performance by environmental condition.
- Compare single-camera results with multi-sensor corroboration.
- Establish model versioning, test sets, and rollback procedures.

**Exit criterion:** Results meet pre-agreed experimental thresholds and limitations are documented honestly.

### Stage 3 — Shadow-mode enclosure pilot

**Goal:** Observe real conditions without influencing operations.

- Install a small number of fixed nodes at one non-critical or carefully selected location.
- Run alerts silently or to a test console; staff continue using existing procedures.
- Measure availability, degradation, nuisance alerts, maintenance burden, and operator interpretation.
- Conduct cybersecurity, privacy, and accessibility reviews.

**Exit criterion:** The pilot demonstrates stable operation and useful detection without unacceptable burden or hidden failure modes.

### Stage 4 — Advisory live pilot

**Goal:** Deliver alerts to trained staff while keeping all actions manual.

- Introduce controlled live notifications and acknowledgement.
- Train users on limitations, fallback procedures, and incident ownership.
- Run safe drills and compare performance with the facility's current process.
- Review every significant alert and near miss.

**Exit criterion:** The facility's safety leadership approves continued advisory use based on measured benefit and acceptable risk.

### Stage 5 — Limited integration with approved infrastructure

**Goal:** Integrate only low-risk, reversible actions first.

- Connect to approved communication systems or read-only gate and equipment states.
- Consider operator-controlled recall cues, diversion, or gate actions only after specialist review and independent interlocks.
- Require explicit authorization, audit logs, safe-state behavior, and drill-based validation.

**Exit criterion:** Each integration passes engineering, veterinary or welfare, security, legal, and operational approval.

### Out of scope for the MVP

- Autonomous physical intervention.
- Autonomous gate actuation.
- Autonomous deterrent activation.
- Autonomous or AI-directed remote sedation.
- Medical diagnosis from behavioral video.
- Claims of guaranteed prevention or species-general intelligence.

## 8. Demonstration walkthrough

The recommended portfolio demo is a clearly simulated enclosure incident:

1. The Command Center opens on a live facility map with healthy cameras and sensors.
2. A simulated visitor approaches a restricted boundary near Tiger Habitat 01.
3. A camera generates an early warning; the interface highlights the supporting evidence and uncertainty.
4. A second simulated sensor corroborates a boundary crossing.
5. The interface enters incident mode, centers the affected location, expands the relevant feed, and starts a timeline.
6. An operator acknowledges the alert and assumes the incident role.
7. The approved playbook appears with communication and verification steps.
8. A simulated camera outage demonstrates redundant coverage and an explicit degraded-state warning.
9. The incident resolves, and the after-action view summarizes evidence, response times, decisions, and system health.

The demo should emphasize calm coordination and transparent system behavior, not weaponized automation.

## 9. Design system

- **Background:** Charcoal black, `#0B0F14`
- **Panels:** Dark slate, `#151C24`
- **Primary type:** Inter or another highly legible sans-serif
- **Telemetry type:** JetBrains Mono or another restrained monospace
- **Active state:** Muted cyan
- **Warning:** Amber
- **Critical:** Red, used sparingly and consistently
- **Maps:** Minimal 2D or restrained 3D with clear entity and coverage layers
- **Motion:** Short, functional transitions that explain state change

The experience should feel engineered, not decorated. Every color, animation, and panel must serve an operational purpose.

## 10. Potential customers and business direction

Initial users may include zoos, wildlife parks, sanctuaries, aquariums, conservation facilities, and other organizations responsible for controlled interactions between people and animals.

Possible commercial models include a paid pilot, per-site software subscription, managed edge hardware, installation and validation services, and premium incident-analysis or welfare-analytics modules. These are hypotheses. Customer budgets, procurement cycles, regulatory obligations, competitor capabilities, and willingness to pay require direct research.

The strongest initial positioning is likely:

> **An AI-assisted safety and behavioral intelligence layer for animal facilities—designed to help trained teams detect risk earlier, coordinate response, and protect people and animals.**

## 11. Key questions for validation

1. Which event do staff most need existing cameras to detect automatically?
2. How early must an alert arrive to change the outcome?
3. Which false alarms are tolerable, and which would make the system unusable?
4. What independent signals can corroborate a critical visual alert?
5. Who has authority to acknowledge, escalate, and approve each class of action?
6. What happens when the system loses power, networking, visibility, or confidence?
7. Which animal-welfare and privacy constraints shape camera placement and data retention?
8. Can the product improve measurable response outcomes without increasing alarm fatigue or over-reliance on automation?

## 12. Recommended next step

Build Stage 1 as a simulation-only product demonstration while conducting Stage 0 interviews in parallel. The first proof should show that ZooGuard can turn several imperfect signals into a clear incident picture and a disciplined human workflow. It should not attempt physical intervention.

The long-term ambition can be large: resilient field sensing, edge intelligence, a facility-wide operational map, and deeply integrated emergency coordination. The responsible path is staged validation, explicit limits, and human authority at every safety-critical boundary.
