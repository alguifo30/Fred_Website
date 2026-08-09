# F.RED Portfolio v24 — iOS Autoplay Hardened

- All 5 films use muted, looped, inline autoplay markup with direct MP4 sources.
- Safari/iOS autoplay is retried on load, pageshow, focus, visibility and viewport entry.
- Native iOS play overlays are suppressed for the cinematic films.
- If iPhone Low Power Mode blocks autoplay by browser policy, the first touch anywhere on the page unlocks the films; users do not need to press Play on each video.
- Posters are included for a clean first frame while media initializes.
- Responsive behavior from v23 is preserved.

Important: iOS Low Power Mode can prevent true no-interaction video autoplay. This is an operating-system/browser policy and cannot be bypassed by website code.
