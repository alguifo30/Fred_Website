(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  document.documentElement.classList.add('motion-enhanced');

  // The opening experience is controlled by loader.js. Case-study pages
  // without the loader still become motion-ready immediately.
  if (!document.getElementById('site-loader')) {
    document.documentElement.classList.add('motion-ready');
  }

  // Interactive chapter navigator: reflects the current chapter and provides
  // direct previous/next section navigation without hijacking normal scrolling.
  const sections = $$('[data-main-section]');
  if (sections.length) {
    const sectionNames = () => document.documentElement.lang === 'es'
      ? {why:'POR QUÉ', method:'MÉTODO', work:'CASOS', about:'SOBRE MÍ', contact:'CONTACTO'}
      : {why:'WHY', method:'METHOD', work:'WORK', about:'ABOUT', contact:'CONTACT'};

    const spine = document.createElement('aside');
    spine.className = 'motion-spine';
    spine.setAttribute('aria-label', document.documentElement.lang === 'es' ? 'Navegación entre secciones' : 'Section navigation');
    spine.innerHTML = `
      <button class="motion-spine__btn motion-spine__prev" type="button" aria-label="Sección anterior" title="Sección anterior">↑</button>
      <span class="motion-spine__num" aria-live="polite">01 / 05</span>
      <button class="motion-spine__btn motion-spine__next" type="button" aria-label="Siguiente sección" title="Siguiente sección">↓</button>`;
    document.body.appendChild(spine);

    const num = $('.motion-spine__num', spine);
    const fill = null;
    const name = null;
    const prev = $('.motion-spine__prev', spine);
    const next = $('.motion-spine__next', spine);
    let currentIndex = 0;
    let chapterTick = false;

    const setChapter = idx => {
      idx = Math.max(0, Math.min(sections.length - 1, idx));
      currentIndex = idx;
      const current = sections[idx];
      sections.forEach((section, i) => section.classList.toggle('is-current', i === idx));
      num.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`;
      prev.disabled = idx === 0;
      next.disabled = idx === sections.length - 1;
      $$('.nav__links a').forEach(a => {
        const href = a.getAttribute('href');
        const active = href === `#${current.id}`;
        a.classList.toggle('is-active', active);
      });
    };

    const detectChapter = () => {
      const navHeight = $('.nav')?.getBoundingClientRect().height || 0;
      const probe = navHeight + Math.min(innerHeight * .34, 300);
      let idx = 0;
      sections.forEach((section, i) => {
        const r = section.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) idx = i;
        else if (r.top <= probe) idx = i;
      });
      if (idx !== currentIndex || !sections[currentIndex].classList.contains('is-current')) setChapter(idx);
      chapterTick = false;
    };

    const requestChapterUpdate = () => {
      if (!chapterTick) {
        chapterTick = true;
        requestAnimationFrame(detectChapter);
      }
    };

    const goTo = idx => {
      const target = sections[Math.max(0, Math.min(sections.length - 1, idx))];
      if (!target) return;
      target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block: 'start'});
      setChapter(sections.indexOf(target));
    };

    prev.addEventListener('click', () => goTo(currentIndex - 1));
    next.addEventListener('click', () => goTo(currentIndex + 1));
    addEventListener('scroll', requestChapterUpdate, {passive:true});
    addEventListener('resize', requestChapterUpdate, {passive:true});

    document.addEventListener('fred:languagechange', () => {
      const es = document.documentElement.lang === 'es';
      spine.setAttribute('aria-label', es ? 'Navegación entre secciones' : 'Section navigation');
      prev.setAttribute('aria-label', es ? 'Sección anterior' : 'Previous section');
      prev.title = es ? 'Sección anterior' : 'Previous section';
      next.setAttribute('aria-label', es ? 'Siguiente sección' : 'Next section');
      next.title = es ? 'Siguiente sección' : 'Next section';
      setChapter(currentIndex);
    });

    detectChapter();
  }

  if (!reduced) {
    // Staggered modules: one beat after another instead of everything appearing at once.
    const staggerGroups = [
      ['.cap-grid', '.cap'],
      ['.metrics', '.metric'],
      ['.testi-grid', '.testi']
    ];
    staggerGroups.forEach(([groupSel,itemSel]) => {
      $$(groupSel).forEach(group => {
        group.classList.add('motion-stagger');
        $$(itemSel, group).forEach((el,i) => el.style.setProperty('--motion-i', i));
      });
    });
    const staggerIO = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); staggerIO.unobserve(e.target); }
    }), {threshold:.16, rootMargin:'0px 0px -8%'});
    $$('.motion-stagger').forEach(el => staggerIO.observe(el));

    // Case-study blocks reveal in sequence as the argument unfolds.
    $$('.case-block').forEach((block,i) => {
      block.classList.add('case-reveal');
      block.style.setProperty('--case-i', i);
    });
    const caseIO = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); caseIO.unobserve(e.target); }
    }), {threshold:.15, rootMargin:'0px 0px -8%'});
    $$('.case-reveal').forEach(el => caseIO.observe(el));

    // Subtle media drift: creates depth without scroll hijacking.
    const media = $$('.film video, .hero__video, .about-photo img');
    let ticking = false;
    const updateMedia = () => {
      const vh = innerHeight;
      media.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const center = r.top + r.height/2;
        const p = Math.max(-1, Math.min(1, (center - vh/2) / vh));
        const y = p * -4;
        const scale = 1.008 - Math.abs(p) * .003;
        el.style.transform = `translate3d(0,${y}px,0) scale(${scale})`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateMedia); ticking = true; }
    }, {passive:true});
    addEventListener('resize', updateMedia, {passive:true});
    updateMedia();

    // Brand-colour wipe for internal page changes, especially Home <-> Case Study.
    $$('a[href]').forEach(a => a.addEventListener('click', e => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      const raw = a.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      let url; try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin) return;
      const current = new URL(location.href);
      if (url.pathname === current.pathname && url.hash) return;
      e.preventDefault();
      const curtain = document.createElement('div');
      curtain.className = 'page-exit';
      curtain.setAttribute('aria-hidden','true');
      curtain.innerHTML = '<i></i>';
      document.body.appendChild(curtain);
      requestAnimationFrame(() => curtain.classList.add('is-in'));
      window.setTimeout(() => { location.href = url.href; }, 430);
    }));
  }
})();
