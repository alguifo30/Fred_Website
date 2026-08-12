# F.RED Portfolio — v26

Built on the v25 "Commercial Storytelling" structure you sent. The five
sections, their order and their layout are unchanged; this pass rewrites
the copy, restores the client logos, cuts the site down to two films and
adds the interaction layer.

## 1 · The copy — the main change

The voice note said the site was saturated: too many words, everything in
caps, everything highlighted, so nothing read as important. Three fixes:

**Red now appears twice on the whole page** — the hero and the closing
question. It was appearing five times (hero, work, method, about,
contact), which is why nothing landed as emphasis. Section headlines are
now plain white.

**The value proposition is five words instead of nine.** "Convierto
problemas complejos en resultados medibles." It used to run six lines at
82px with four of them red; it now runs two lines at 62px with two red
words. The support line went from 21 words to 12.

**Caps came down.** The hero's two shouted principle lines are sentence
case now. `THE PROBLEM CHOOSES THE TOOL.` and the `4 CASOS PRINCIPALES ·
BANCA + SEGUROS` note are sentence case too. Small mono labels stay caps
— that is a label style, not shouting.

Every section lead, both About paragraphs, the music note and the contact
body were cut roughly in half. Nothing factual was removed and no metric
changed.

## 2 · Films: only 01 and 05

`fred-presence` stays in the hero. `fred-people` — the team at the table
— now introduces the References block, which is also the answer to
"muy unipersonal": the second film on the page is a team, not another
portrait of one face.

`fred-clarity`, `fred-impact` and `fred-work` were deleted along with
their posters. **Package went from 12 MB to 4.5 MB.**

## 3 · Client logos, restored

`content.js` carries a `clientMarks` map (organisation → file). The mark
shows on every case card on the home page and under the project name on
each case study: Interbank, Rimac Seguros, MiBolsillo, Yellow Brain.

The organisation sits on its own line under the category. On mobile the
meta row wraps, and any other arrangement pushes the logo into the middle
of a run-on line.

## 4 · Interaction — `css/refine.css` + `js/enhance.js`

Both files are additive; delete them and the site still works, it just
gets louder and stops moving.

| Effect | Where |
|---|---|
| Word-by-word headline reveal | Every headline — each word rides out of its own mask, 55ms apart |
| Section index | Fixed left rail; the active label fills red. Hidden under 1240px |
| Result counters | Hero strip; only a leading number animates, so "3 DÍAS → 10 MIN" and "24/7" survive intact |
| Card hover | A red rule draws across the top and the CTA slides — no glow, no zoom |
| Magnetic buttons | Pointer devices only |
| Button fill | Primary button fills from below on hover |

Films load and play only while on screen. `prefers-reduced-motion:
reduce` disables all of it and leaves the page static and readable.

## QA

7 pages × 390px and 1440px: no console errors, no horizontal overflow,
no broken images, one `<h1>` per page, ES/EN switching on every page.
Scanned for the Yellow Brain client's original identifiers — no matches.

Home page height went from 7,498px to 7,236px on desktop even with the
team film added, because the copy is shorter.

## Deploy

Upload the contents of this folder to the repository root so `index.html`
stays at the root. `.nojekyll` is present.

---

# v27 — films as environment, evidence with context

## 1 · The two films are now full-bleed

Film 01 is the background of section 01 and film 05 is the background of
section 05 (contact), each edge to edge with the copy on top — the
arrangement from the reference screenshots. A `.film-bed` sits at
`z-index:-1` inside the section with a directional scrim: heavy on the
copy side so text stays readable, light on the subject side so the film
still reads as a film.

Both beds drift ~34px slower than the page as you scroll, so the copy
sits in front of the footage rather than pasted onto it.

The hero headline shortened again — "Convierto complejidad en
resultados." Fewer words survive on top of moving footage than on flat
black.

## 2 · The results strip says what it is

It was four bare numbers. Now the band opens with a labelled cell —
**CASOS DE ÉXITO / Resultados en proyectos reales** — and each metric
carries the project and client it came from:

| | |
|---|---|
| 97% | Asistente inteligente para asesores · Interbank |
| 3 días → 10 min | Flujo digital de pólizas · Rimac Seguros |
| +25 pp | Portal de autogestión · Rimac Seguros |
| 7+ | Banca · Seguros · Startups · Consultoría |

Solid band rather than translucent: numbers over moving footage were
hard to read. Cells arrive one at a time as the band enters.

## 3 · Case studies: hierarchy instead of volume

The insight and learning lines were set at display size, so two
sentences became eight lines and each case was a long scroll for very
little content. They are now `clamp(20px, 1.9vw, 27px)` against a 44px
question — a real step down instead of everything competing.

**Each case page went from ~2,630px to ~1,610px.** The whole story now
fits in about two screens. Section padding and the flow gap came down
with it.

## 4 · Colour — same palette, more range

No new colour. Onyx was one flat value on every section; sections now
alternate a few points apart (`#0a0a0a`, `#070707`, `#0b0b0b`) so the
page has depth. Each one opens with a single red hairline that fades to
nothing across the width — it marks the boundary without another block
of red type. Case cards alternate at 1–2% white. The tool band picks up
a 4% red wash and a red left rule.

## 5 · New portrait

The About photo is the new studio portrait, cropped 4:5 with head room.

## 6 · Interactions added this pass

Bed parallax, staggered strip reveal, tool-tag hover, on top of what
v26 already had: word-by-word headlines, section index rail, result
counters, card hover rules, magnetic buttons.

## QA

7 pages × 390px and 1440px: no console errors, no horizontal overflow,
no broken images. Home 6,642px desktop / 8,664px mobile.

One thing worth knowing: the strip's responsive rules had to be appended
at the very end of `refine.css`. The desktop track definition was added
after the earlier media queries and, at equal specificity, was winning at
every width — the strip stayed in four columns on a phone. If you add
more strip rules later, keep them above that final block.

---

# v28 — contact film, cleanup, tool band, QA pass

## 1 · Contact film matches the reference frame

The film sat inside a section with no defined height, so it inherited
whatever height the text column needed — short, and the video cropped
tight. It now has its own stage: `.contact-film-stage`, `min-height:
min(84vh, 760px)`, separate from the footer below it. The scrim is
narrower and lighter — dark only up to about 34% of the width, clear
by 68% — so the faces on the right stay bright, matching the reference.

The footer moved outside the film's `isolation` boundary, onto plain
ground below, so it no longer inherits a scrim meant for hero copy.

## 2 · Section index rail removed

It sat fixed at the same position as the hero's own text column, so on
section 01 the two overlapped and neither read cleanly — confirmed by
your screenshot. The top nav already provides the same five links with
an active-state underline, so nothing was lost. Removed the DOM
creation in `enhance.js` and its CSS in one pass; no other feature
depended on it.

## 3 · Tool band: more presence, same restraint

Was one bold line, a gray sentence and a single wrapped row of pills —
read as a footnote after Method. Now:

- A small eyebrow above it: `— LA CAJA DE HERRAMIENTAS`
- The four disciplines from the site's own taxonomy — Negocio,
  Experiencia, Tecnología, Narrativa — each with its own label and its
  own one or two tags, in a four-column grid with hairline dividers
- A closing line at the bottom: `No vendo herramientas. Las uso para
  resolver problemas.`
- Groups arrive left to right, 90ms apart, on entry

Still monochrome and red-accent only — no new colour, no icons, no
boxed cards. It just reads as a small section now instead of a
sign-off.

## 4 · QA pass

- **35 combinations** (7 pages × 5 widths: 360, 390, 768, 1024, 1440):
  zero console errors, zero horizontal overflow, zero broken images,
  one `<h1>` per page.
- **Keyboard**: tab order is skip-link → brand → five nav links → language
  toggle → page content, in that order on every page. Focus rings are
  visible (solid outline) on every interactive element, including the
  primary button.
- **Contrast**: checked the contact title directly against the film
  behind it — white text over the darkened left two-thirds reads clean;
  the red word sits far enough left that it never lands on the bright
  part of the frame.
- **ES/EN**: every string touched this pass — tool band, groups, contact
  — confirmed translated on toggle, no residual Spanish or English
  leaking into the other language.
- **Mobile menu**: opens, closes on link tap, and the in-page anchor
  still scrolls correctly afterward.

## Deploy

Same as before: upload the folder contents to the repository root.

---

# v29 — contact collapsed to one column, case questions resized

Two fixes, confirmed against your reference screenshots.

## 1 · Contact: one left column, nothing on the face

v28 kept the two-column split from the original sales template —
question in one column, "BIEN." + body + CTA in a second column that
landed on top of the people in the film. Your reference showed all four
pieces (question, BIEN., body, CTA) stacked as one left-aligned block,
with the film left clear on the right.

Markup: the two divs merged into one `.contact-sales-copy` block.
CSS: `.contact-sales-grid--stacked { display: block }` replaces the grid,
and `.contact-sales-good` / `.contact-sales-body` carry their own type
now that they're not living inside the old `.contact-sales-side` column.
Checked at 1440 and 390 — matches the reference at both.

## 2 · Case card questions, resized

They were set at up to 44px — close enough to the 50px section titles
that a card's question and the section's own headline read as the same
level of importance. Down to a `29px` ceiling on desktop, `26px` on
mobile. The metric below each question is still the largest thing in
the card, which is correct — the number is the proof, the question is
the setup.

## QA

Same 35-combination sweep (7 pages × 5 widths): zero overflow, zero
console errors. EN confirmed on the new contact markup.

---

# v30 — tool band de-boxed, case questions use their width

## 1 · Tool band no longer clashes with the page's own line language

At the 900px breakpoint (2-column grid) the boxed treatment — red left
rule, tinted background, its own top and bottom rules — sat directly
under `.method-fast`'s hairline dividers and right above the case
grid's hairline dividers. Three different line languages stacked in
one small stretch of the page is what was reading as a collision.

Removed the left red rule and the background tint; kept a single top
hairline, matching `.method-fast` and the case grid exactly. It now
reads as the close of Method rather than a boxed callout competing with
it.

Also rebalanced the four groups: Narrativa had only one tag
(Storytelling) against two in every other column, which is the
uneven-looking gap in your screenshot. Added Facilitation, so every
group carries two.

## 2 · Case questions now use the width they have

`styles.css` capped every case-card question at `16ch` regardless of
how wide the card actually was — the empty space to the right in your
screenshot. Overridden to `480px` (`420px` under 980px), sized against
the longest real question in the data (81 characters) so it still
wraps sensibly rather than running edge to edge. Two lines for most
cards, three for the longest one — never four.

## QA

49 combinations this pass (7 pages × 7 widths, including 900px and
1366px specifically to catch the breakpoint where the tool-band issue
was visible): zero overflow, zero console errors.

---

# v31 — tool band spacing, contained video on mobile, a real cascade bug

## 1 · Tool band divider spacing

`.tool-group` had `padding: 18px 18px 4px 0` — zero padding on the left.
Every column's content sat flush against the divider to its left while
keeping 24px before its own right divider, which is what read as
"stuck to the line, should be centered." Rewritten symmetric: 24px on
both sides of every inner divider, with the two outer edges (first
column's left, last column's right) flush against the section's own
margins so the row still lines up with the heading above it. Fixed the
same asymmetry in the 900px two-column fallback.

## 2 · Video on mobile/tablet: contained banner instead of full-bleed

You asked what I'd recommend — here's the reasoning and what's built.

**The options I weighed:**
- Keep it full-bleed but darken it further — rejected. A dominant
  full-screen video is still a dominant full-screen video, just dimmer.
- Static poster only, no motion, below 900px — saves the most weight
  and battery, but throws away the one thing the cinematic hero is
  actually for.
- **A contained banner: full width, capped height, sitting above the
  text in normal flow instead of behind it.** This is what's built.
  It keeps the edge-to-edge cinematic feel (nothing shrinks into a
  rounded card) but stops it from being the whole screen — 34vh capped
  between 190–280px, versus the 70–84vh it was claiming before.

Below 900px, `.film-bed` switches from `position: absolute; inset: 0`
to a normal-flow block with that capped height, and the copy that used
to sit on top of it now follows below on solid ground. Because nothing
overlays the video anymore, the heavy legibility scrim came off too —
it's now a soft bottom fade, there for blend, not contrast protection.
Same treatment on both films (hero and contact). Parallax is switched
off in this mode (`transform: none !important`) since it was tuned for
a full-bleed background, not a small fixed banner.

## 3 · A real bug this surfaced

Chasing the leftover gap above the mobile hero video turned up
something bigger: a selector — `section[data-main-section]:not(#why)`
— survives in `styles.css` from before this template's rewrite. No
section carries `id="why"` anymore, so it matches every section, and
because `:not(#id)` carries ID-level specificity, it was silently
beating this template's own `body.v25-sales .section` padding rule at
every width below 980px — on **all five sections**, not just the hero.

Restored each section's real, intended padding (58px at 980px, 48px at
680px) with a matching-specificity override. This is a likely
contributor to the "too much scroll on mobile" feedback from earlier in
this project — it was quietly adding extra padding-top and
padding-bottom to every section on every phone and tablet visit,
independent of any of the content trims made along the way.

## QA

49 combinations (7 pages × 7 widths, 360–1440, including 900px where
the tool band's 2-column fallback and the video's mode switch both
live): zero overflow, zero console errors. Checked tablet at 768×1024
specifically for the new contained video treatment.

---

# v32 — tool band alignment bug, video autoplay hardening

## 1 · Tool band: the actual bug behind the zig-zag

Confirmed on your device: NEGOCIO/TECNOLOGÍA sat flush left while
EXPERIENCIA/NARRATIVA sat indented — an alternating pattern, not random.

The cause: last pass's fix used `.tool-group:nth-child(odd)` /
`:nth-child(even)` inside a `@media (max-width: 900px)` block (no floor)
to build a 2-column layout. That block never stops applying as the
screen keeps narrowing — it's still active at 375px. The single-column
reset at `@media (max-width: 560px)` uses the plain `.tool-group`
selector, but a `:nth-child()` selector carries more specificity than a
plain class, so the 900px block's left/right offsets kept winning
underneath the "reset," regardless of which one came later in the file.
That's the exact zig-zag in your screenshot.

Fixed two ways at once: the 900px block is now range-scoped to
`(min-width: 561px) and (max-width: 900px)`, so it stops applying the
instant the single-column layout takes over — and the 560px reset now
carries `!important` on every offset as a second, independent
safety net. Confirmed clean at 560px and 561px specifically, either
side of the boundary, plus the full sweep.

## 2 · Video autoplay — a real bug fixed, plus what your screenshot shows

**The bug, fixed:** `enhance.js` had `if (reduced || !('IntersectionObserver' in window)) return;`
at the top of the function that loads and plays every `.film-bed`
video — reduced-motion was gating not just the parallax (correct) but
the load, the play attempt, and the tap-to-unlock listener too
(wrong). A visitor with "Reduce Motion" on in iOS Accessibility got
none of those for the contact-page film. Rewritten so only the
decorative parallax stays gated by that preference; loading and
playback attempts now run unconditionally, with five retries on a
staggered schedule, four separate buffering events each triggering
another attempt, and a permanent first-tap listener with no
dependency on IntersectionObserver support.

The hero video (section 01) already had its own separate, fairly
robust retry system in `main.js` — untouched, still there.

**What I think your screenshot is actually showing:** the status bar
reads "◀ WhatsApp" — that page opened inside WhatsApp's own in-app
browser, not Safari itself. In-app browsers (WhatsApp, Instagram,
Messenger, TikTok) commonly enforce their own, stricter autoplay
policy at the WebView level, one that a page's own HTML/JS has no way
to see or override — this is a limitation of the embedding app, not
of the code running inside it.

**The way to tell them apart:** open the same link directly in Safari
(in WhatsApp, tap the ••• menu in the in-app browser and choose "Open
in Safari" / "Open in Browser") and reload. If it autoplays cleanly
there, the fixes above did their job and the in-app browser was the
actual cause. If it still shows the tap-to-play button in real Safari
too, that's a genuine remaining issue worth another look — but the two
have very different fixes, and only one of them is something code can
touch.

## QA

77 combinations this pass (7 pages × 11 widths, including 560px and
561px on either side of the tool-band boundary that broke last time):
zero overflow, zero console errors.
