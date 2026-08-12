(() => {
  const C=window.FRED_CONTENT;
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  let lang=localStorage.getItem('fred-lang')||'es';
  const t=k=>C.i18n[lang]?.[k]??C.i18n.es[k]??k;

  // Client marks: the two banks and the two research clients are the
  // strongest proof on the card, so the organisation is shown rather
  // than only named. It sits on its own line under the category, which
  // is the only way it stays readable once the meta row wraps on mobile.
  const mark=org=>{
    const src=C.clientMarks?.[org];
    return src?`<img class="client-mark" src="${src}" alt="" loading="lazy" decoding="async">`:'';
  };

  function projectCard(p,secondary=false){
    return `<article class="${secondary?'other-case':'sales-case'} reveal in">
      <div class="${secondary?'other-case':'sales-case'}__meta"><span>${p.number}</span><span>${p.category[lang]}</span><span class="case-org">${mark(p.organization)}${p.organization} · ${p.year}</span></div>
      <h3>${p.question[lang]}</h3>
      <p class="${secondary?'other-case':'sales-case'}__summary">${p.summary[lang]}</p>
      <div class="${secondary?'other-case':'sales-case'}__footer">
        <div class="${secondary?'other-case':'sales-case'}__metric"><strong>${p.metric}</strong><span>${p.metricLabel[lang]}</span></div>
        <a href="work/${p.id}.html">${t('work.view')}</a>
      </div>
    </article>`;
  }
  function renderProjects(){
    const main=$('#work-list'), other=$('#other-work-list');
    if(main) main.innerHTML=C.projects.filter(p=>p.flagship).map(p=>projectCard(p,false)).join('');
    if(other) other.innerHTML=C.projects.filter(p=>!p.flagship).map(p=>projectCard(p,true)).join('');
  }
  function renderTestimonials(){
    const root=$('#testimonials'); if(!root)return;
    root.innerHTML=C.testimonials.map((x,i)=>`<figure class="testi sales-testi reveal in"><blockquote class="testi__quote">${x.quote[lang]}</blockquote><figcaption class="testi__person"><span class="avatar ${i?'avatar--gray':''}">${x.initials}</span><span><span class="testi__name">${x.name}</span><br><span class="testi__role">${x.role}</span></span></figcaption></figure>`).join('');
  }
  function bindContacts(){ $$('[data-contact="linkedin"]').forEach(a=>a.href=C.contact.linkedin); }
  function applyI18n(){
    document.documentElement.lang=lang;
    $$('[data-i18n]').forEach(el=>{const v=t(el.dataset.i18n);if(v!==undefined)el.textContent=v;});
    $$('[data-i18n-html]').forEach(el=>{const v=t(el.dataset.i18nHtml);if(v!==undefined)el.innerHTML=v;});
    $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    renderProjects();renderTestimonials();bindContacts();
    document.dispatchEvent(new CustomEvent('fred:languagechange',{detail:{lang}}));
  }
  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;localStorage.setItem('fred-lang',lang);applyI18n();}));

  const toggle=$('.nav-toggle'), nav=$('#nav-links');
  const closeNav=()=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open');};
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('open',!open);document.body.classList.toggle('nav-open',!open);});
  $$('#nav-links a').forEach(a=>a.addEventListener('click',closeNav));
  addEventListener('resize',()=>{if(innerWidth>980)closeNav();},{passive:true});

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){$$('.reveal').forEach(x=>x.classList.add('in'));}
  else{
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
    $$('.reveal').forEach(x=>io.observe(x));
  }

  const heroVideo=$('[data-hero-video]');
  const prime=v=>{if(!v)return;v.controls=false;v.muted=true;v.defaultMuted=true;v.volume=0;v.autoplay=true;v.playsInline=true;v.setAttribute('muted','');v.setAttribute('autoplay','');v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');v.removeAttribute('controls');};
  const playHero=()=>{if(!heroVideo||document.hidden)return;prime(heroVideo);try{const p=heroVideo.play();if(p?.catch)p.catch(()=>{});}catch(_){}};
  if(heroVideo){prime(heroVideo);['loadedmetadata','loadeddata','canplay'].forEach(ev=>heroVideo.addEventListener(ev,playHero,{passive:true}));requestAnimationFrame(playHero);setTimeout(playHero,80);setTimeout(playHero,450);addEventListener('load',playHero,{passive:true});addEventListener('pageshow',playHero,{passive:true});addEventListener('focus',playHero,{passive:true});document.addEventListener('visibilitychange',playHero);addEventListener('fred:loaded',playHero,{passive:true});['touchstart','pointerdown','click'].forEach(ev=>document.addEventListener(ev,playHero,{capture:true,passive:true,once:true}));}

  const progress=$('.progress');
  const onScroll=()=>{const d=document.documentElement,max=d.scrollHeight-innerHeight;if(progress)progress.style.width=`${max>0?(scrollY/max)*100:0}%`;};
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  const sections=$$('[data-main-section]');
  const activeIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;$$('.nav__links a').forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')===`#${e.target.id}`));}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>activeIO.observe(s));
  applyI18n();
})();
