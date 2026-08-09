# F.RED Portfolio v22 — QA Polish

Refined WHY spacing, testimonial hierarchy, contact typography, chapter/subsection consistency, and responsive QA fixes.

# F.RED Portfolio v20 — Responsive Experience

Responsive version optimized as separate compositions for desktop, iPad/tablet and phones.

## Responsive targets
- Desktop and large laptops: 1180px+
- iPad / tablet landscape and compact laptops: 901–1180px
- iPad / tablet portrait: 681–900px
- Phones: 391–680px
- Small phones: up to 390px
- Phone landscape: dedicated low-height composition

## Main changes
- Sticky header with a full mobile navigation drawer.
- Touch targets sized for mobile use.
- Hero typography and video focal point re-composed per breakpoint.
- Chapter videos use 16:10 on tablets and 4:5 on phones to preserve the subject while avoiding excessive cropping.
- Method becomes 2×2 on tablets and 1-column on phones.
- Cases, metrics, About, testimonials, contact and Case Study pages all reflow without horizontal scrolling.
- Dynamic chapter navigator becomes a compact bottom dock on phones.
- Safe-area support for notched iPhones/iPads.
- Escape closes mobile navigation; menu closes automatically after choosing a section.
- Reduced-motion behavior remains supported.

Open `index.html` or deploy the full folder to GitHub Pages.

## v21 — Compact Impact + About
- Impact uses the previously empty left column for its explanatory copy.
- About copy begins directly below the 04.5 / Sobre mí label.
- Removed motion clip-path behavior that could temporarily hide headings and create blank space.
- Preserves the v20 responsive behavior for desktop, iPad/tablet and phones.
