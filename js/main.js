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

  function renderProjects(){
    const root=$('#work-list'); if(!root)return;
    root.innerHTML=C.projects.map(p=>`
      <article class="project-editorial reveal in">
        <div class="project-editorial__meta">
          <span class="project-editorial__index">${p.number}</span>
          <span>${p.category[lang]}</span>
          <span>${p.organization} · ${p.year}</span>
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

  const lazyVideos=$$('video[data-lazy-video]');
  const loadVideo=v=>{
    if(v.dataset.loaded)return;
    v.src=v.dataset.lazyVideo;
    v.dataset.loaded='1';
    v.load();
  };
  if(reduced){
    lazyVideos.forEach(v=>v.removeAttribute('autoplay'));
    $$('video[autoplay]').forEach(v=>{v.pause();v.removeAttribute('autoplay');});
  } else {
    const preloadIO=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){loadVideo(e.target);preloadIO.unobserve(e.target);}
    }),{rootMargin:'420px 0px'});
    lazyVideos.forEach(v=>preloadIO.observe(v));

    const playIO=new IntersectionObserver(es=>es.forEach(e=>{
      const v=e.target;
      if(e.isIntersecting){
        if(v.dataset.lazyVideo&&!v.dataset.loaded)loadVideo(v);
        if(v.dataset.userPaused!=='1')v.play().catch(()=>{});
      }else v.pause();
    }),{threshold:.18,rootMargin:'120px 0px 120px 0px'});
    $$('[data-chapter-video]').forEach(v=>playIO.observe(v));
  }

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
