# F.RED Portfolio v23 — Mobile Cinematic + Autoplay

Mobile-specific refinements:
- Presence film is shown first on phones, with editorial copy below it so Alfredo's face remains visible.
- Chapter films 02–05 use a wider 16:10 mobile composition to preserve more of the original footage.
- The 01/05 chapter dock is removed on phones because it covered content; it remains available on tablet/desktop.
- Film pause controls are hidden on phones for a cleaner autoplay-first experience.
- All five films are marked autoplay + muted + playsinline + webkit-playsinline.
- Lazy-loaded films retry muted autoplay when entering/returning to the viewport, including Safari/iOS visibility changes.
- Reduced-motion preferences are still respected.
