(() => {
  const C=window.FRED_CONTENT;
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  let lang=localStorage.getItem('fred-lang')||'es';
  const id=document.body.dataset.caseId;
  const p=C.projects.find(x=>x.id===id); if(!p)return;
  const t=k=>C.i18n[lang]?.[k]??C.i18n.es[k]??k;

  // Plain text gets the same <p> wrapper the four flagship cases always
  // had. Content that already supplies its own markup (the two research
  // cases pass multi-paragraph HTML) is inserted as-is instead of being
  // wrapped a second time.
  const wrap=html=>/^\s*<(p|div|h\d|ul|ol)/i.test(html)?html:`<p>${html}</p>`;
  const chain=words=>`<div class="case-flow-chain">${words.map(w=>`<span>${w}</span>`).join('<i>→</i>')}</div>`;

  function noiseHtml(){
    let html=wrap(p.noise[lang]);
    if(p.evidence){
      const items=p.evidence.items.map(x=>`<div class="case-evidence__item"><strong>${x.v}</strong><span>${x.l[lang]}</span></div>`).join('');
      html+=`<div class="case-evidence">${items}<div class="case-evidence__total"><strong>${p.evidence.total.v}</strong><span>${p.evidence.total.l[lang]}</span></div></div>`;
    }
    return html;
  }

  function betHtml(){
    let html=wrap(p.bet[lang]);
    if(p.betFlow) html+=chain(p.betFlow[lang]);
    if(p.betPrinciples) html+=`<ol class="case-principles">${p.betPrinciples[lang].map(x=>`<li><span>${x.n}</span><b>${x.l}</b></li>`).join('')}</ol>`;
    return html;
  }

  function buildHtml(){
    let html=`<div class="case-tags">${p.build.map(x=>`<span class="tag">${x}</span>`).join('')}</div>`;
    if(p.buildText) html+=`<p>${p.buildText[lang]}</p>`;
    return html;
  }

  function impactHtml(){
    if(!p.impactBlock) return `<h2>${p.impact[lang]}</h2>`;
    const b=p.impactBlock; let html='';
    if(b.metric) html+=`<div class="case-impact-metric"><strong>${b.metric}</strong><span>${b.metricLabel[lang]}</span></div>`;
    if(b.flow) html+=chain(b.flow[lang]);
    if(b.text) html+=`<p>${b.text[lang]}</p>`;
    if(b.validation) html+=`<div class="case-validation"><strong>${b.validation.v}</strong><span>${b.validation.l[lang]}</span></div>`;
    if(b.roadmap) html+=`<div class="case-roadmap">${b.roadmap.map((s,i)=>(i?'<i class="case-roadmap__arrow">→</i>':'')+`<div class="case-roadmap__stage"><span>${s.n}</span><p>${s.l[lang]}</p></div>`).join('')}</div>`;
    return html;
  }

  const sections=()=>[
    ['case.noise',noiseHtml()],
    ['case.insight',`<h2>${p.insight[lang]}</h2>`],
    ['case.bet',betHtml()],
    ['case.build',buildHtml()],
    ['case.impact',impactHtml()],
    ['case.learning',`<h2>${p.learning[lang]}</h2>`]
  ];

  function render(){
    document.documentElement.lang=lang;
    $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    $('#case-study-label').textContent=t('case.study');
    $('#case-category').textContent=`${p.category[lang]} · ${p.year}`;
    const markSrc=C.clientMarks?.[p.organization];
    const clientEl=$('#case-client');
    if(clientEl){
      clientEl.innerHTML=(markSrc?`<img class="client-mark" src="../${markSrc}" alt="${p.organization}">`:'')+
                         `<span>${p.organization}</span>`;
    }
    $('#case-title').textContent=p.title[lang];
    $('#case-question').textContent=p.question[lang];
    $('#case-summary').textContent=p.summary[lang];
    $('#case-metric').textContent=p.metric;
    $('#case-metric-label').textContent=p.metricLabel[lang];
    document.title=`F.RED — ${p.title[lang]}`;

    $('#case-flow').innerHTML=sections().map(([k,html])=>`<section class="case-block"><div class="case-block__label">${t(k)}</div><div class="case-block__content">${html}</div></section>`).join('');

    $('#crumb-home').textContent=t('case.breadcrumb.home');
    $('#crumb-work').textContent=t('case.breadcrumb.work');
    $('#crumb-current').textContent=p.title[lang];
    $('#crumb-back').textContent=t('case.back');
    $('#back-work').textContent=t('case.back');

    // Each tier cycles within itself: the four flagship cases keep exactly
    // the rotation they always had (4 wraps to 1), and the two research
    // cases cycle between themselves, so adding case 05/06 never changes
    // what "next case" means on the flagship pages.
    const tier=(p.tier||'flagship');
    const tierList=C.projects.filter(x=>(x.tier||'flagship')===tier);
    const idx=tierList.findIndex(x=>x.id===p.id),next=tierList[(idx+1)%tierList.length];
    $('#next-case').href=`${next.id}.html`;
    $('#next-case').textContent=t('case.next');

    document.dispatchEvent(new CustomEvent('fred:languagechange',{detail:{lang}}));
  }

  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{
    lang=b.dataset.lang;
    localStorage.setItem('fred-lang',lang);
    render();
  }));
  render();
})();
