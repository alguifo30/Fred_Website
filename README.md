# F.RED Portfolio — v25 (transitions layer)

Base: v24 (structure, content, i18n, iOS autoplay hardening) — untouched.
This version adds a transitions layer on top and fixes one bug that was
silently disabling reveals.

## What was added

Two new files. Delete them and the site still works; it just stops moving.

- `css/transitions.css`
- `js/transitions.js`

Both are loaded last, after `styles.css` and `motion.js`, on the home page
and on every case study.

### 1 · Chapter rail
A sticky bar under the nav, one per chapter, carrying the number, the name
and a hairline that fills with **that chapter's own progress**. Each rail is
pushed out by the next one, so the handover between chapters *is* the
transition — no floating widget, no scroll hijack.

Chapter 01 has no rail: the hero already says `01 / POR QUÉ`, and the same
label twice is noise.

### 2 · Film shutter
Each chapter film opens from a horizontal slit to the full frame as it
enters, while the video itself settles from 1.12× to 1×. The overlay copy
follows in three beats: label, headline, closing line. A film band earns
exactly one metaphor, and a shutter is it.

### 3 · Word-by-word headlines
Every display headline is split into words, each in its own mask, arriving
left to right with a 60 ms stagger. The text nodes are rebuilt, never
replaced, so selection, search and screen readers see the same words. Masks
are rebuilt automatically after a language change.

### 4 · Chapter marquees
A slow band of that chapter's own vocabulary at the seam before Method,
Work and Contact. Two copies of the word set, track slides exactly −50%, so
the loop never jumps.

### 5 · Metric counters
Numbers roll up once, on entry. Only the numeric part animates, so `60→85%`
and `24/7` survive intact. Tabular figures keep the grid from jittering.

### 6 · The beat
The mark in the header is an equalizer, so it now answers to scroll
velocity — faster scrolling, taller bars, with a decay. The brand keeps time
with the reader.

### 7 · Rows that open
On pointer devices the case insight is folded away and unfolds on hover or
keyboard focus, so the list reads compact. On touch and under reduced
motion it is simply always open: nothing is ever hidden from a reader who
cannot hover.

### 8 · Smaller things
Magnetic buttons, a sweep fill on the primary button, and the scroll
progress bar — `styles.css` already shipped the bar, but nothing was
driving it.

## The bug this version fixes

The chapter films never revealed. `motion.js` observed them with
`threshold: .12` and the new shutter clips them to 8% of their own height —
and Chrome counts `clip-path` in `intersectionRatio`. Any threshold above
0.08 could therefore never be reached: the film had to open before it was
allowed to open.

Fixed with `threshold: 0` plus a bottom `rootMargin` that holds the reveal
until the film is properly on screen. Worth remembering before adding any
other clip-based reveal.

## Duplication removed

The floating spine and the new rail were both naming the chapter. The spine
now keeps only what the rail cannot do: jump to the previous or next
chapter.

## Reduced motion

`prefers-reduced-motion: reduce` disables the shutter, the word masks, the
marquees, the beat, the counters and the magnetic controls, and forces the
case insight open. Everything renders; it just stops moving.

## Reference note

The brief pointed at fest.pe and dschool.stanford.edu. I could read both
sites' content but not run them here, so the timings and curves are not
copied — this is the same vocabulary (sticky chapter markers, shutter
reveals, word-level type, repeating word bands), tuned to F.RED's own
material.

## Deploy

Unchanged from v24: push to the repo root, `Settings → Pages → main / root`.
`.nojekyll` is present.

---

# v25.1 — density and hierarchy pass

Three changes on top of v25, plus a QA sweep.

## 1 · Films no longer open like an eye

The shutter (`clip-path` slit → full frame) is gone. Every film is simply
there, full frame, exactly like the hero. Only the overlay copy still
animates, in three short beats: label, headline, closing line.

Removing it also removed the black gap that showed while a film was still
clipped — the state visible in the second screenshot.

## 2 · Type scale and vertical rhythm — `css/refine.css`

The old ceilings were set for headlines of two or three words. Real Spanish
copy runs six to nine words, so a 112px cap over a 9-character measure
turned every question into six stacked lines.

| Element | Before | Now |
|---|---|---|
| Hero | up to 144px | up to 82px |
| Case question | up to 96px over 15ch | up to 44px over 720px |
| Case row question | up to 61px over 17ch | up to 40px over 700px |
| Closing question | up to 112px over 9ch | up to 52px over 780px |
| Method step | 56vh tall each | auto height |

**Hierarchy is unchanged.** The hero is still the largest thing on the site,
then chapter headlines, then case questions, then body. Only the gaps
between those steps got smaller — which is what makes the page scan as a
sales page instead of a poster series.

Result: home 11.4k → 10.9k px; each case study 3.4k → 1.7k px, about two
screens instead of five.

## 3 · Client marks

`content.js` now carries a `clientMarks` map (organisation → logo). The mark
appears next to the organisation in each case row on the home page and under
the project name on the case study, so the two clients are shown rather than
only named.

Adding a third client is one line in `clientMarks` plus the file in
`assets/brand/clients/`.

## QA notes

Checked at 1440 and 390 across the home and the four case studies: no
console errors, no horizontal overflow, one `<h1>` per page, ES/EN
switching cleanly on every page.

Fixed along the way:

- **Descenders were being clipped.** The word masks are exactly one
  line-height tall, and at `line-height: .96` that cut the tail of the
  period in "BIEN." Mask now pads and pulls back by the same amount.
- **`ch` and `em` measures were unreliable here.** `ch` resolves against
  whichever font has actually loaded, and `em` against the element's own
  clamped font-size — so the same value gave different line lengths before
  and after the webfont arrived. All headline measures are now pixels.
- **`styles.css` declares `.contact h3` five times, three with
  `!important`.** The override in `refine.css` has to match that weight; it
  is the only `!important` in the file that is not there for a reason worth
  writing down.
- **Breadcrumb separator pointed at nothing on mobile**, because the current
  crumb is hidden below 680px. Hidden too.
- **Inline `style="max-width:15ch"` on each case question** overrode every
  stylesheet. Removed from the four case pages.

## Still open

`fred-impact.mp4` has generated text on the gallery walls ("Zone 1 — People
and Problem"). Nothing in CSS fixes that without blurring the film, which is
what you asked to remove. Regenerating that one clip without on-set text is
the only real fix.

---

# v25.2 — Other Work tier + client logos

Built on top of v25.1 without touching the four flagship case studies.
Checksums confirmed identical before and after this pass.

## What was added

**Home page** — a second, lighter tier inside the existing `03 / CASOS`
section, after the four flagship rows:

- A short transition (`OTROS CASOS` / `OTHER WORK`) with its own headline
  and one line of lead copy.
- A two-column editorial grid — no cards, no colour blocks — for cases 05
  (MiBolsillo) and 06 (Yellow Brain). Each column: number, category,
  organisation (with its mark) and year, question, summary, a metric, and
  a "VER CASO" link. Divided by a single vertical hairline, matching the
  rest of the site's language.

**Two new pages** — `work/mibolsillo.html` and
`work/yellow-brain-research.html`, using the exact same template, CSS and
scripts as the four flagship cases. Same narrative order throughout:
THE QUESTION → THE NOISE → THE INSIGHT → THE BET → THE BUILD → THE IMPACT →
THE LEARNING.

**Client marks** — Interbank and Rimac Seguros already had theirs; this
pass adds MiBolsillo and Yellow Brain, shown in three places: the Other
Work preview on the home page, and each case's own hero. Yellow Brain's
own logo is not a confidentiality risk — the brief only restricted the
*original* client's identity; Yellow Brain itself is explicitly the
allowed name throughout that case.

## What stayed untouched

- The four flagship case-study HTML files — confirmed by identical MD5
  checksums before and after this pass.
- Chapter navigation (`03 / 05 CASOS` unchanged), header, loader, About,
  Testimonials, Contact, footer, the five videos, autoplay, GitHub Pages
  structure.
- "Next case" on the four flagship pages: still cycles 1→2→3→4→1. The two
  research cases cycle 5→6→5 on their own — added by scoping the rotation
  to each project's `tier`, so the flagship rotation's *behaviour*, not
  just its markup, is unchanged.

## New, fully additive files

- `css/other-work.css` — every selector in it is new; nothing overrides an
  existing rule. Delete the file and only this tier disappears.
- `work/mibolsillo.html`, `work/yellow-brain-research.html`

## Confidentiality — Yellow Brain

Checked the entire project for "SIDERPERU" and "Construyamos" (original
client identifiers): no matches anywhere — HTML, JS, data, alt text, or
metadata. The only organisation name attached to case 06, anywhere in the
public site, is **Yellow Brain**. The roadmap, research-evidence numbers,
and validation count are abstracted exactly as specified (no industry
references, no "59 users/participants" — always "research activities").

## Content rule followed

No commercial metrics were invented for either case. MiBolsillo's impact
is the confirmed "4 behavioral profiles," not a fabricated adoption or
revenue number. Yellow Brain's are the confirmed research-activity counts
(31 + 5 + 23 = 59) and the 14-person validation count — nothing else.

## QA — this pass

Checked at 1440 and 390 across all 7 pages (5 previous + 2 new): zero
console errors, zero horizontal overflow, zero broken images, four
flagship pages byte-identical to the prior version.

Also checked separately: tablet portrait (768) and tablet landscape
(1024) for the new Other Work grid — both clean, both correctly falling
back to the site's existing 980px breakpoint.
