(() => {
  'use strict';
  const loader = document.getElementById('site-loader');
  if (!loader) {
    document.documentElement.classList.add('motion-ready');
    return;
  }

  const bar = loader.querySelector('[data-loader-bar]');
  const savedLang = localStorage.getItem('fred-lang') || 'es';
  const caption = loader.querySelector('.site-loader__caption');
  if (caption) caption.textContent = savedLang === 'en' ? 'FIND THE RHYTHM.' : 'ENCUENTRA EL RITMO.';
  const value = loader.querySelector('[data-loader-value]');
  const heroVideo = document.querySelector('[data-hero-video]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const started = performance.now();
  const minDuration = reduced ? 250 : 950;
  const maxDuration = reduced ? 450 : 2800;

  const state = {
    dom: document.readyState !== 'loading',
    fonts: !document.fonts,
    hero: !heroVideo || heroVideo.readyState >= 2,
    page: document.readyState === 'complete'
  };

  let shown = 4;
  let forced = false;
  let finished = false;

  const target = () => {
    if (forced) return 100;
    return Math.min(100,
      8 +
      (state.dom ? 17 : 0) +
      (state.fonts ? 20 : 0) +
      (state.hero ? 40 : 0) +
      (state.page ? 15 : 0)
    );
  };

  const paint = n => {
    const safe = Math.max(0, Math.min(100, Math.round(n)));
    if (bar) bar.style.transform = `scaleX(${safe / 100})`;
    if (value) value.textContent = `${String(safe).padStart(2, '0')}%`;
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    shown = 100;
    paint(100);
    loader.classList.add('site-loader--complete');
    document.body.classList.remove('is-loading');
    document.documentElement.classList.add('motion-ready');

    // Start the Presence film at its first frame when the experience is revealed.
    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.autoplay = true;
      heroVideo.playsInline = true;
      heroVideo.setAttribute('muted','');
      heroVideo.setAttribute('autoplay','');
      heroVideo.setAttribute('playsinline','');
      heroVideo.setAttribute('webkit-playsinline','');
      try { heroVideo.currentTime = 0; } catch (_) {}
      heroVideo.play().catch(() => {});
    }

    window.dispatchEvent(new CustomEvent('fred:loaded'));
    window.setTimeout(() => loader.remove(), reduced ? 120 : 720);
  };

  if (!state.dom) {
    document.addEventListener('DOMContentLoaded', () => { state.dom = true; }, { once: true });
  }
  if (document.fonts) {
    document.fonts.ready.then(() => { state.fonts = true; }).catch(() => { state.fonts = true; });
  }
  if (heroVideo && !state.hero) {
    const markHero = () => { state.hero = true; };
    heroVideo.addEventListener('loadeddata', markHero, { once: true });
    heroVideo.addEventListener('canplay', markHero, { once: true });
  }
  if (!state.page) {
    window.addEventListener('load', () => { state.page = true; }, { once: true });
  }

  const tick = now => {
    const elapsed = now - started;
    if (elapsed >= maxDuration) forced = true;
    const goal = target();
    const step = Math.max(.7, (goal - shown) * .085);
    shown = Math.min(goal, shown + step);
    paint(shown);

    const allReady = state.dom && state.fonts && state.hero && state.page;
    if (elapsed >= minDuration && (allReady || forced) && shown >= 98.8) {
      finish();
      return;
    }
    requestAnimationFrame(tick);
  };

  paint(shown);
  requestAnimationFrame(tick);
})();
