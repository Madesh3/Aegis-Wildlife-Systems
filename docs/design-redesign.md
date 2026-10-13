# Aegis UI redesign

## Direction

The design follows the referenced Aegis/ZooGuard conversation: protective, authoritative, and operator-centered. The supplied Sam Thies and Tekt screenshots informed the immersive landscape, restrained typography, open space, and an inset navigation frame with fine rules. The homepage has an editorial presentation; the command workspace uses compact, explicit operational hierarchy.

Colors use charcoal and field green for operational surfaces, with mineral white sections on the company homepage. Status colors remain distinct from decorative accents. The prototype remains explicitly simulated and human-led.

## Website purpose

The primary goal is to attract connections and collaborators for an early-stage idea. The homepage invites zoo and wildlife teams, builders and researchers, and partners or connectors to start a conversation. The prototype demonstrates the proposed solution; it is secondary to the invitation. The contact form supports individuals, optional organizations, introductions, feedback, collaboration, and opportunities.

## What changed

- Rebuilt homepage with landscape-led introduction, mission narrative, platform and hardware presentations, interactive scenario preview, principles, and contact invitation.
- Shared header, mobile navigation, buttons, focus states, skip link, and spacing system; product and briefing page refinements.
- Rebuilt Command workspace with working Overview, Entities, Timeline, and System health views, selectable map entities, reference camera imagery, evidence, response playbook, and after-action dialog.
- Removed continuous homepage animation. Scenario preview changes only when a stage is selected. Command updates are limited to ten per second and pause while the document is hidden.
- Keyboard shortcuts respect controls and editable fields. Map entities work with Enter and Space. Dialog uses native focus management. Mobile navigation closes with Escape. CSS and the 3D prototype respect reduced motion.
- Improved Sentinel material colors, lighting, camera framing, layout, and accessible state of its controls.

## Assets and provenance

Generated with the built-in image-generation tool; converted to WebP with Sharp for delivery. Neither image depicts a real deployed Aegis system. The camera panel is labeled a reference still and concept imagery.

### `public/images/conservation-landscape.webp`

Final generation prompt:

> Use case: photorealistic-natural. Asset type: full-bleed widescreen hero image for Aegis Wildlife Systems, an elite conservation technology company. Generate a cinematic, exceptionally high quality documentary aerial photograph of a vast protected African wildlife landscape at dawn. Sweeping undulating muted olive grasslands and scattered acacia trees, a winding pale dirt track leading diagonally from bottom center toward distant mountain escarpments, subtle atmospheric haze. One small herd of elephants far away in the lower right landscape, realistically small in relation to the terrain. Wide 16:9 composition. Deep charcoal olive shadows, desaturated warm pale sandstone highlights, subdued golden sunlight from upper right. Keep upper left half quiet and dark enough for light heading text that will be added separately in code. Feeling: quietly monumental, precise, powerful, institutional. Realistic film grain and natural terrain detail. No text, no typography, no UI, no borders, no artificial graphics, no logos, no watermark. Save image locally for website use.

### `public/images/tiger-habitat.webp`

Final generation prompt:

> Use case: photorealistic-natural. Asset type: static illustrated camera still for a clearly labeled wildlife safety software simulation. A realistic elevated security-camera view looking down into a spacious naturalistic tiger habitat at a professionally managed wildlife park, wide 16:9 landscape. A single adult tiger walking on grass is located at 60% of image width and 46% of image height, seen from above from a distance. Tiger occupies about 16% of image width. Natural boulders, muted moss green grass, shrubs, small pool at top left, dark lush forest behind. A low stone boundary and pale empty visitor path crosses diagonally across the bottom quarter of image. Soft overcast daylight, realistic documentary detail, desaturated green and earth tones, no dramatic lighting. No people, no writing, no UI overlays, no text, no logos or watermarks. This is concept imagery, not a real live feed. Save locally for website use.

## Validation

- ESLint and production build, including TypeScript and all route prerenders.
- Browser review at desktop and 390px phone widths.
- Homepage scenario stages, mobile menu, Escape behavior, and absence of horizontal overflow on the homepage and contact page.
- Connection form accepts an individual without an organization, supports collaboration/opportunity categories, and keeps name/message validation. No email was sent during verification.
- Command acknowledgement, entity selection, camera failure/overlap status, incident resolution, native after-action dialog, keyboard replay, pause, and reset.
- Sentinel exploded and orthographic views; browser console checked for runtime errors.

The connection form opens an email draft in the user's mail client; this redesign does not add a submission backend. No live camera connections or physical controls are introduced.
