/* ============================================================
   F.RED — TRANSITIONS ENGINE (v25)
   ------------------------------------------------------------
   Additive layer over motion.js. One shared rAF loop for anything
   that tracks scroll; IntersectionObserver for anything that only
   needs to fire once.

   Nothing here hijacks the scroll. The page scrolls natively; the
   transitions read the scroll and respond to it.
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
  const tick = () => { jobs.forEach(fn => fn()); queued = false; };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(tick); } };

  /* ---------------------------------------------------------
     1 · CHAPTER RAIL
     One sticky bar per chapter, inserted at the top of each
     section. Sticky beats fixed here: each rail is pushed out by
     the next chapter's rail, so the handover is the transition.
     --------------------------------------------------------- */
  function chapterRails() {
    const sections = $$('[data-main-section]');
    if (!sections.length) return;

    const names = () => document.documentElement.lang === 'es'
      ? { why: 'POR QUÉ', method: 'MÉTODO', work: 'CASOS', about: 'SOBRE MÍ', contact: 'CONTACTO' }
      : { why: 'WHY', method: 'METHOD', work: 'WORK', about: 'ABOUT', contact: 'CONTACT' };

    const rails = sections.map((section, i) => {
      // Chapter 01 already announces itself inside the hero; a rail on
      // top of it would be the same label twice.
      if (i === 0) return null;
      const rail = document.createElement('div');
      rail.className = 'chapter-rail';
      rail.setAttribute('aria-hidden', 'true');
      rail.innerHTML =
        `<span class="chapter-rail__n">${section.dataset.mainSection}</span>` +
        `<span class="chapter-rail__name"></span>` +
        `<span class="chapter-rail__bar"><i></i></span>` +
        `<span class="chapter-rail__of">${String(sections.length).padStart(2, '0')}</span>`;
      section.insertBefore(rail, section.firstChild);
      return { rail, section, i };
    }).filter(Boolean);

    const label = () => {
      const map = names();
      rails.forEach(({ rail, section }) => {
        $('.chapter-rail__name', rail).textContent = map[section.id] || section.id.toUpperCase();
      });
    };
    label();
    document.addEventListener('fred:languagechange', label);

    if (reduced) {
      rails.forEach(({ rail }) => rail.style.setProperty('--chapter-p', 1));
      return;
    }

    onScroll(() => {
      rails.forEach(({ rail, section }) => {
        const r = section.getBoundingClientRect();
        const travel = r.height - innerHeight;
        const p = travel > 0
          ? Math.min(1, Math.max(0, -r.top / travel))
          : (r.top < 0 ? 1 : 0);
        rail.style.setProperty('--chapter-p', p.toFixed(3));
      });
    });
  }

  /* ---------------------------------------------------------
     2 · FILM SLIT REVEAL
     The film opens like a shutter when it enters. CSS does the
     motion; this only decides when.
     --------------------------------------------------------- */
  function filmReveal() {
    const films = $$('.chapter-film');
    if (!films.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      films.forEach(f => f.classList.add('in'));
      return;
    }

    /* threshold 0 plus a bottom rootMargin: the copy arrives once the
       film is properly on screen, not the moment its first pixel is. */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -18% 0px' });

    films.forEach(f => io.observe(f));
  }

  /* ---------------------------------------------------------
     3 · WORD-BY-WORD HEADLINES
     Wraps each word in its own mask. The text nodes are rebuilt,
     never replaced, so selection, search and screen readers see
     exactly the same words as before.
     --------------------------------------------------------- */
  const SPLIT_SELECTOR = '.display.reveal, .about-copy h3.reveal, .contact h3.reveal, .cap-title.reveal, .case-hero h1';

  function splitHeadlines(root = document) {
    $$(SPLIT_SELECTOR, root).forEach(el => {
      if (el.querySelector('.tx-word')) return;

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(node => {
        if (!node.nodeValue.trim()) return;
        const frag = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(word => {
          if (!word.trim()) { frag.appendChild(document.createTextNode(word)); return; }
          const mask = document.createElement('span');
          mask.className = 'tx-word';
          const inner = document.createElement('i');
          inner.textContent = word;
          mask.appendChild(inner);
          frag.appendChild(mask);
        });
        node.parentNode.replaceChild(frag, node);
      });

      $$('.tx-word > i', el).forEach((inner, i) => {
        inner.style.transitionDelay = `${Math.min(i * 60, 640)}ms`;
      });
      el.classList.add('tx-split');
    });
  }

  function watchHeadlines() {
    splitHeadlines();

    if (reduced || !('IntersectionObserver' in window)) {
      $$('.tx-split').forEach(el => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });

    $$('.tx-split').forEach(el => io.observe(el));

    // i18n rewrites headline text wholesale, so the masks have to be
    // rebuilt after every language change.
    document.addEventListener('fred:languagechange', () => {
      requestAnimationFrame(() => {
        splitHeadlines();
        $$('.tx-split').forEach(el => el.classList.add('in'));
      });
    });
  }

  /* ---------------------------------------------------------
     4 · CHAPTER MARQUEE
     Inserted at the seam between chapters, carrying that
     chapter's own vocabulary.
     --------------------------------------------------------- */
  const MARQUEE_WORDS = {
    es: {
      method: ['ENTENDER', 'CONECTAR', 'CREAR', 'MOVER', 'APRENDER'],
      work: ['PROBLEMAS REALES', 'DECISIONES REALES', 'RESULTADOS MEDIBLES'],
      contact: ['CURIOSIDAD', 'CLARIDAD', 'PERSONAS', 'IMPACTO']
    },
    en: {
      method: ['UNDERSTAND', 'CONNECT', 'CREATE', 'MOVE', 'LEARN'],
      work: ['REAL PROBLEMS', 'REAL DECISIONS', 'MEASURABLE RESULTS'],
      contact: ['CURIOSITY', 'CLARITY', 'PEOPLE', 'IMPACT']
    }
  };

  function marquees() {
    const build = () => {
      const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
      Object.keys(MARQUEE_WORDS[lang]).forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        let bar = section.previousElementSibling;
        if (!bar || !bar.classList.contains('tx-marquee')) {
          bar = document.createElement('div');
          bar.className = 'tx-marquee';
          bar.setAttribute('aria-hidden', 'true');
          bar.innerHTML = '<div class="tx-marquee__track"></div>';
          section.parentNode.insertBefore(bar, section);
        }

        const words = MARQUEE_WORDS[lang][id];
        // Two copies: the track slides exactly -50%, so the loop is seamless.
        $('.tx-marquee__track', bar).innerHTML = words.concat(words)
          .map(w => `<span class="tx-marquee__item">${w}</span>`).join('');
      });
    };

    build();
    document.addEventListener('fred:languagechange', build);
  }

  /* ---------------------------------------------------------
     5 · METRIC COUNTERS
     Only the numeric part animates; the symbols stay put, so
     "60→85%" and "24/7" survive intact.
     --------------------------------------------------------- */
  function counters() {
    const cells = $$('.metric__v');
    if (!cells.length || reduced || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);

        const full = el.textContent;
        const match = full.match(/^(\D*)(\d+)(.*)$/s);
        if (!match) return;
        const [, before, digits, after] = match;
        const target = parseInt(digits, 10);
        if (!target || target > 10000) return;

        const t0 = performance.now();
        const dur = 900;
        const step = now => {
          const k = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = before + Math.round(target * eased) + after;
          if (k < 1) requestAnimationFrame(step);
          else el.textContent = full;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });

    cells.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     6 · THE BEAT
     The header mark is an equalizer, so it keeps time with the
     reader: faster scrolling, taller bars.
     --------------------------------------------------------- */
  function beat() {
    const mark = $('.nav .brand .mark');
    if (!mark || reduced) return;

    const bars = $$('rect', mark);
    let last = scrollY;
    let energy = 0;

    onScroll(() => {
      const delta = Math.abs(scrollY - last);
      last = scrollY;
      energy = Math.max(energy * 0.86, Math.min(1, delta / 90));
      bars.forEach((bar, i) => {
        const swing = 1 + energy * (i === 2 ? 0.10 : 0.34 - Math.abs(i - 2) * 0.06);
        bar.style.setProperty('--beat', swing.toFixed(3));
      });
    });
  }

  /* ---------------------------------------------------------
     7 · MAGNETIC CONTROLS
     --------------------------------------------------------- */
  function magnetic() {
    if (!fine || reduced) return;
    $$('.btn, .nav__cta, .contact-linkedin').forEach(el => {
      el.setAttribute('data-magnetic', '');
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------
     8 · SCROLL PROGRESS
     styles.css already ships the bar; nothing was driving it.
     --------------------------------------------------------- */
  function progress() {
    const bar = $('.progress');
    if (!bar) return;
    onScroll(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${h > 0 ? Math.min(100, (scrollY / h) * 100) : 0}%`;
    });
  }

  /* ---------------------------------------------------------
     BOOT
     --------------------------------------------------------- */
  function init() {
    chapterRails();
    marquees();
    filmReveal();
    watchHeadlines();
    counters();
    beat();
    magnetic();
    progress();

    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    schedule();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
