/* ============================================================
   F.RED — ENHANCE (v26)
   ------------------------------------------------------------
   The interaction layer. IntersectionObserver for state, one
   shared rAF loop for anything that tracks scroll. No library.

   Everything degrades to a static, readable page: without JS the
   headlines are plain text, the index simply never appears.
   ============================================================ */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const jobs = [];
  let queued = false;
  const onScroll = fn => jobs.push(fn);
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { jobs.forEach(f => f()); queued = false; });
  };

  /* ---------------------------------------------------------
     1 · WORD-LEVEL HEADLINE REVEAL
     --------------------------------------------------------- */
  const SPLIT = '.sales-hero__title, .sales-section-title, .contact-sales-title, .other-work-head h3, .proof-head h3';

  function split(root = document) {
    $$(SPLIT, root).forEach(el => {
      // i18n rewrites these wholesale, so the test is "are the masks
      // still here?", not "did we ever run?".
      if (el.querySelector('.rf-word')) return;

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(node => {
        if (!node.nodeValue.trim()) return;
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(w => {
          if (!w.trim()) { frag.appendChild(document.createTextNode(w)); return; }
          const mask = document.createElement('span');
          mask.className = 'rf-word';
          const inner = document.createElement('i');
          inner.textContent = w;
          mask.appendChild(inner);
          frag.appendChild(mask);
        });
        node.parentNode.replaceChild(frag, node);
      });

      $$('.rf-word > i', el).forEach((i, n) => {
        i.style.transitionDelay = `${Math.min(n * 55, 560)}ms`;
      });
      el.classList.add('rf-split');
    });
  }

  function watchSplits() {
    split();
    if (reduced || !('IntersectionObserver' in window)) {
      $$('.rf-split').forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -5% 0px' });
    $$('.rf-split').forEach(el => io.observe(el));

    document.addEventListener('fred:languagechange', () => {
      requestAnimationFrame(() => {
        split();
        $$('.rf-split').forEach(el => el.classList.add('in'));
      });
    });
  }

  /* ---------------------------------------------------------
     2 · RESULT COUNTERS
     Only a leading number animates, so "3 DÍAS → 10 MIN" and
     "24/7" survive untouched.
     --------------------------------------------------------- */
  function counters() {
    const cells = $$('.result-strip__item strong');
    if (!cells.length || reduced || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);

        const full = el.textContent;
        const m = full.match(/^(\D*)(\d+)(.*)$/s);
        if (!m) return;
        const [, before, digits, after] = m;
        const target = parseInt(digits, 10);
        if (!target || target > 10000) return;

        const t0 = performance.now(), dur = 900;
        const step = now => {
          const k = Math.min(1, (now - t0) / dur);
          el.textContent = before + Math.round(target * (1 - Math.pow(1 - k, 3))) + after;
          if (k < 1) requestAnimationFrame(step); else el.textContent = full;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });

    cells.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     4 · FILM 05 — loads and plays only while on screen
     --------------------------------------------------------- */
  function bedFilms() {
    $$('.film-bed video').forEach(v => setupFilm(v));
  }

  function setupFilm(v) {
    if (!v) return;

    const prime = () => {
      v.controls = false; v.muted = true; v.defaultMuted = true; v.playsInline = true;
      ['muted', 'autoplay', 'playsinline', 'webkit-playsinline'].forEach(a => v.setAttribute(a, ''));
    };
    prime();

    // Loading and the play attempts below are core content, not
    // decorative motion, so they run the same way under
    // prefers-reduced-motion: reduce — only the scroll-linked parallax
    // in bedParallax() is gated by that preference. What IS gated here
    // is purely presentational: skip the visibility-based load/pause
    // cycle when there's no IntersectionObserver, since without it we
    // can't tell whether the video is on screen.
    const attempt = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const ensureLoaded = () => { if (!v.dataset.loaded) { v.load(); v.dataset.loaded = '1'; } };

    ensureLoaded();

    // iOS sometimes rejects play() while too little of the file has
    // buffered yet, independent of any autoplay policy — a later
    // attempt once more data is available can succeed with no retry
    // logic needed at all. Each event is a legitimate, separate reason
    // to try again; none of them fire on a false promise.
    ['loadeddata', 'canplay', 'canplaythrough', 'loadedmetadata'].forEach(ev =>
      v.addEventListener(ev, attempt, { once: true }));

    // A handful of short-interval retries covers the case where the
    // browser's own autoplay heuristic simply needed a second pass —
    // observed in practice to succeed even when the very first
    // programmatic attempt on page load did not.
    [0, 150, 400, 900, 1800].forEach(ms => setTimeout(attempt, ms));

    // Any first tap anywhere on the page clears a genuine iOS autoplay
    // block. This listener is intentionally never gated by reduced
    // motion or by IntersectionObserver support — it's the one
    // mechanism guaranteed to work regardless of either.
    ['touchstart', 'pointerdown', 'click'].forEach(ev =>
      document.addEventListener(ev, attempt, { once: true, passive: true, capture: true }));

    if (!('IntersectionObserver' in window)) { attempt(); return; }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { ensureLoaded(); attempt(); }
        else if (!v.paused) { v.pause(); }
      });
    }, { threshold: 0.15 });
    io.observe(v);
  }

  /* ---------------------------------------------------------
     6 · FILM PARALLAX
     The bed drifts a few percent slower than the page, so the
     copy reads as sitting in front of the film rather than
     pasted onto it. Capped at 60px of travel.
     --------------------------------------------------------- */
  function bedParallax() {
    if (reduced) return;
    const beds = $$('.film-bed');
    if (!beds.length) return;
    beds.forEach(b => { b.style.willChange = 'transform'; });
    onScroll(() => {
      beds.forEach(bed => {
        const host = bed.parentElement;
        const r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const mid = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        bed.style.transform = `translate3d(0, ${(-mid * 34).toFixed(1)}px, 0) scale(1.06)`;
      });
    });
  }

  /* ---------------------------------------------------------
     7 · PROOF STRIP — reveals one cell at a time
     --------------------------------------------------------- */
  function strip() {
    const cells = $$('.result-strip__item, .result-strip__head');
    if (!cells.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      cells.forEach(c => c.classList.add('is-on'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const i = cells.indexOf(e.target);
        setTimeout(() => e.target.classList.add('is-on'), Math.max(0, i) * 90);
        io.unobserve(e.target);
      });
    }, { threshold: .4 });
    cells.forEach(c => io.observe(c));
  }

  /* ---------------------------------------------------------
     5 · MAGNETIC BUTTONS
     --------------------------------------------------------- */
  function magnetic() {
    if (!fine || reduced) return;
    $$('.btn').forEach(el => {
      el.setAttribute('data-rf-magnetic', '');
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * .13;
        const dy = (e.clientY - (r.top + r.height / 2)) * .2;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------
     BOOT
     --------------------------------------------------------- */
  function init() {
    watchSplits();
    counters();
    bedFilms();
    bedParallax();
    strip();
    magnetic();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    schedule();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
