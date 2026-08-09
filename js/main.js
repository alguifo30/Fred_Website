(() => {
  const C = window.FRED_CONTENT;
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
  let lang = localStorage.getItem('fred-lang') || 'es';
  const t = key => C.i18n[lang]?.[key] ?? C.i18n.es[key] ?? key;

  function applyI18n(){
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el=>{ const v=t(el.dataset.i18n); if(v!==undefined) el.textContent=v; });
    $$('[data-i18n-html]').forEach(el=>{ const v=t(el.dataset.i18nHtml); if(v!==undefined) el.innerHTML=v; });
    $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    renderProjects();
    renderOtherWork();
    renderTestimonials();
    bindContacts();
    syncFilmButtons();
    document.dispatchEvent(new CustomEvent('fred:languagechange',{detail:{lang}}));
  }

  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{
    lang=b.dataset.lang;
    localStorage.setItem('fred-lang',lang);
    applyI18n();
  }));

  const mark=(org, base='')=>{
    const src=C.clientMarks?.[org];
    return src?`<img class="client-mark" src="${base}${src}" alt="${org}" loading="lazy">`:'';
  };

  // Flagship cases: unchanged output, filtered to tier !== 'other' so the
  // two new cases never join this row-based list or its next-case cycle.
  const flagship=()=>C.projects.filter(p=>(p.tier||'flagship')==='flagship');
  const otherWork=()=>C.projects.filter(p=>p.tier==='other');

  function renderProjects(){
    const root=$('#work-list'); if(!root)return;
    root.innerHTML=flagship().map(p=>`
      <article class="project-editorial reveal in">
        <div class="project-editorial__meta">
          <span class="project-editorial__index">${p.number}</span>
          <span>${p.category[lang]}</span>
          <span class="project-editorial__org">${mark(p.organization)}${p.organization} · ${p.year}</span>
        </div>
        <div class="project-editorial__main">
          <p class="project-editorial__name">${p.title[lang]}</p>
          <h3 class="project-editorial__question">${p.question[lang]}</h3>
          <p class="project-editorial__summary">${p.summary[lang]}</p>
          <div class="project-editorial__insight">
            <span>${t('work.insight')}</span>
            <p>${p.insight[lang]}</p>
          </div>
        </div>
        <aside class="project-editorial__impact">
          <strong>${p.metric}</strong>
          <span>${p.metricLabel[lang]}</span>
          <a href="work/${p.id}.html">${t('work.view')}</a>
        </aside>
      </article>`).join('');
  }

  // Second, lighter tier: an editorial two-column composition, not a copy
  // of the flagship row. No cards, no colour, no logos — text and a
  // hairline only, so it visibly carries less weight than the four
  // flagship cases above it.
  function renderOtherWork(){
    const root=$('#work-other-list'); if(!root)return;
    root.innerHTML=otherWork().map(p=>`
      <article class="other-case reveal in">
        <div class="other-case__top">
          <span class="other-case__n">${p.number}</span>
          <span class="other-case__cat">${p.category[lang]}</span>
        </div>
        <p class="other-case__meta">${mark(p.organization)}${p.organization} · ${p.year}</p>
        <h4 class="other-case__q">${p.question[lang]}</h4>
        <p class="other-case__summary">${p.summary[lang]}</p>
        <div class="other-case__foot">
          <div class="other-case__metric">
            <strong>${p.metric}</strong>
            <span>${p.metricLabel[lang]}</span>
            ${p.microCopy?`<em>${p.microCopy[lang]}</em>`:''}
          </div>
          <a class="other-case__cta" href="work/${p.id}.html">${t('work.view')}</a>
        </div>
      </article>`).join('');
  }

  function renderTestimonials(){
    const root=$('#testimonials'); if(!root)return;
    root.innerHTML=C.testimonials.map((x,i)=>`
      <figure class="testi reveal in">
        <blockquote class="testi__quote">${x.quote[lang]}</blockquote>
        <figcaption class="testi__person">
          <span class="avatar ${i?'avatar--gray':''}">${x.initials}</span>
          <span><span class="testi__name">${x.name}</span><br><span class="testi__role">${x.role}</span></span>
        </figcaption>
      </figure>`).join('');
  }

  function bindContacts(){
    $$('[data-contact="linkedin"]').forEach(a=>{a.href=C.contact.linkedin;a.removeAttribute('aria-disabled');});
    $$('[data-contact="email"]').forEach(a=>{
      if(C.contact.email){a.href=`mailto:${C.contact.email}`;a.hidden=false;}
      else{a.removeAttribute('href');a.hidden=true;}
    });
    $$('[data-contact="cv"]').forEach(a=>{
      if(C.contact.cv){a.href=C.contact.cv;a.hidden=false;}
      else{a.removeAttribute('href');a.hidden=true;}
    });
  }

  const toggle=$('.nav-toggle'), nav=$('#nav-links');
  const closeMobileNav=()=>{
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    document.body.classList.remove('nav-open');
  };
  toggle?.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')==='true';
    toggle.setAttribute('aria-expanded',String(!open));
    nav?.classList.toggle('open',!open);
    document.body.classList.toggle('nav-open',!open);
  });
  $$('#nav-links a').forEach(a=>a.addEventListener('click',closeMobileNav));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileNav();});
  addEventListener('resize',()=>{if(innerWidth>980)closeMobileNav();},{passive:true});

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){$$('.reveal').forEach(x=>x.classList.add('in'));}
  else{
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    }),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    $$('.reveal').forEach(x=>io.observe(x));
  }

  /* ---------------------------------------------------------
     Media / autoplay
     iOS Safari requires muted + playsinline before playback.
     Low Power Mode can still block true autoplay by browser policy;
     the first touch anywhere on the page then unlocks the media.
     --------------------------------------------------------- */
  const chapterVideos=$$('[data-chapter-video]');
  const isNearViewport=v=>{
    const r=v.getBoundingClientRect();
    return r.bottom>-180 && r.top<innerHeight+180;
  };
  const primeVideo=v=>{
    v.controls=false;
    v.muted=true;
    v.defaultMuted=true;
    v.volume=0;
    v.autoplay=true;
    v.playsInline=true;
    v.setAttribute('muted','');
    v.setAttribute('autoplay','');
    v.setAttribute('playsinline','');
    v.setAttribute('webkit-playsinline','');
    v.setAttribute('disablepictureinpicture','');
    v.setAttribute('controlslist','nodownload noplaybackrate noremoteplayback');
    v.removeAttribute('controls');
  };
  const tryAutoplay=v=>{
    if(!v || v.dataset.userPaused==='1') return Promise.resolve(false);
    primeVideo(v);
    let p;
    try{ p=v.play(); }catch(_){ return Promise.resolve(false); }
    if(!p || typeof p.then!=='function') return Promise.resolve(!v.paused);
    return p.then(()=>{
      v.dataset.autoplayBlocked='0';
      return true;
    }).catch(()=>{
      v.dataset.autoplayBlocked='1';
      return false;
    });
  };

  chapterVideos.forEach(v=>{
    primeVideo(v);
    const retry=()=>{ if(isNearViewport(v) && !document.hidden) tryAutoplay(v); };
    v.addEventListener('loadedmetadata',retry,{passive:true});
    v.addEventListener('loadeddata',retry,{passive:true});
    v.addEventListener('canplay',retry,{passive:true});
  });

  const playIO=new IntersectionObserver(entries=>entries.forEach(e=>{
    const v=e.target;
    if(e.isIntersecting){
      tryAutoplay(v);
    }else if(!document.hidden && v.dataset.userPaused!=='1'){
      // Keep only nearby films running so mobile Safari uses less battery/data.
      v.pause();
    }
  }),{threshold:.04,rootMargin:'200px 0px 200px 0px'});
  chapterVideos.forEach(v=>playIO.observe(v));

  const resumeVisibleVideos=()=>{
    if(document.hidden)return;
    chapterVideos.forEach(v=>{ if(isNearViewport(v)) tryAutoplay(v); });
  };

  // Immediate retries cover normal Safari/Chrome muted autoplay. iOS
  // sometimes rejects the very first attempt while the video is still
  // buffering, so this keeps trying for a few seconds instead of giving
  // up after one pass — each call is a no-op once playback has started.
  requestAnimationFrame(resumeVisibleVideos);
  [80,300,600,1000,1800,2800,4000].forEach(ms=>setTimeout(resumeVisibleVideos,ms));
  document.addEventListener('DOMContentLoaded',resumeVisibleVideos,{passive:true});
  addEventListener('load',resumeVisibleVideos,{passive:true});
  addEventListener('pageshow',resumeVisibleVideos,{passive:true});
  addEventListener('focus',resumeVisibleVideos,{passive:true});
  document.addEventListener('visibilitychange',resumeVisibleVideos);
  addEventListener('fred:loaded',resumeVisibleVideos,{passive:true});

  // iPhone Low Power Mode can legally block true autoplay. Safari then needs
  // one user activation. Any first touch/click on the page unlocks the films;
  // the visitor never has to press the native Play icon on each video.
  let mediaUnlocked=false;
  const unlockMedia=()=>{
    if(mediaUnlocked)return;
    mediaUnlocked=true;
    const promises=chapterVideos.map(v=>{
      primeVideo(v);
      let p;
      try{ p=v.play(); }catch(_){ return Promise.resolve(); }
      if(!p || typeof p.then!=='function')return Promise.resolve();
      return p.then(()=>{
        v.dataset.autoplayBlocked='0';
        if(!isNearViewport(v)){
          setTimeout(()=>{ if(!isNearViewport(v) && v.dataset.userPaused!=='1')v.pause(); },90);
        }
      }).catch(()=>{});
    });
    Promise.allSettled(promises).then(resumeVisibleVideos);
    document.removeEventListener('touchstart',unlockMedia,true);
    document.removeEventListener('pointerdown',unlockMedia,true);
    document.removeEventListener('click',unlockMedia,true);
  };
  document.addEventListener('touchstart',unlockMedia,{capture:true,passive:true});
  document.addEventListener('pointerdown',unlockMedia,{capture:true,passive:true});
  document.addEventListener('click',unlockMedia,{capture:true,passive:true});

  function syncFilmButton(btn){
    const host=btn.closest('.film,.hero'); const v=host?.querySelector('video'); if(!v)return;
    btn.textContent=v.paused?t('film.play'):t('film.pause');
    btn.setAttribute('aria-label',v.paused?t('film.play'):t('film.pause'));
  }
  function syncFilmButtons(){ $$('[data-film-toggle]').forEach(syncFilmButton); }
  $$('[data-film-toggle]').forEach(btn=>{
    const host=btn.closest('.film,.hero'); const v=host?.querySelector('video'); if(!v)return;
    btn.addEventListener('click',()=>{
      if(v.paused){v.dataset.userPaused='0';if(v.dataset.lazyVideo&&!v.dataset.loaded)loadVideo(v);v.play().catch(()=>{});}
      else{v.dataset.userPaused='1';v.pause();}
      setTimeout(()=>syncFilmButton(btn),0);
    });
    v.addEventListener('play',()=>syncFilmButton(btn));
    v.addEventListener('pause',()=>syncFilmButton(btn));
  });

  const progress=$('.progress');
  const onScroll=()=>{const d=document.documentElement,max=d.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`;};
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  const steps=$$('.step'), stage=$('[data-method-stage]');
  const stepKey={UNDERSTAND:'method.s1.num',CONNECT:'method.s2.num',CREATE:'method.s3.num',MOVE:'method.s4.num'};
  if(steps.length && !reduced){
    const sio=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){
        steps.forEach(s=>s.classList.toggle('active',s===e.target));
        if(stage)stage.textContent=t(stepKey[e.target.dataset.step]||'method.stage');
      }
    }),{threshold:.55});
    steps.forEach(s=>sio.observe(s));
  }

  const cycler=$('[data-role-cycler]');
  if(cycler && !reduced){
    let i=0;
    setInterval(()=>{
      const roles=C.roles[lang]||C.roles.es;
      i=(i+1)%roles.length;
      cycler.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:420,easing:'ease-out'});
      cycler.textContent=roles[i];
    },1700);
  } else if(cycler) cycler.textContent=(C.roles[lang]||C.roles.es).at(-1);

  applyI18n();
})();
