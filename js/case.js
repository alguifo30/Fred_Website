(() => {
  const C=window.FRED_CONTENT;
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  let lang=localStorage.getItem('fred-lang')||'es';
  const id=document.body.dataset.caseId;
  const p=C.projects.find(x=>x.id===id); if(!p)return;
  const t=k=>C.i18n[lang]?.[k]??C.i18n.es[k]??k;

  const sections=()=>[
    ['case.noise',`<p>${p.noise[lang]}</p>`],
    ['case.insight',`<h2>${p.insight[lang]}</h2>`],
    ['case.bet',`<p>${p.bet[lang]}</p>`],
    ['case.build',`<div class="case-tags">${p.build.map(x=>`<span class="tag">${x}</span>`).join('')}</div>`],
    ['case.impact',`<h2>${p.impact[lang]}</h2>`],
    ['case.learning',`<h2>${p.learning[lang]}</h2>`]
  ];

  function render(){
    document.documentElement.lang=lang;
    $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    $('#case-study-label').textContent=t('case.study');
    // Category and year on the label line; the client gets its own line
    // with its mark, so the organisation reads as a subtitle rather than
    // as one more item in a run-on list.
    $('#case-category').textContent=`${p.category[lang]} · ${p.year}`;
    const host=$('#case-client');
    if(host){
      const src=C.clientMarks?.[p.organization];
      host.innerHTML=(src?`<img class="client-mark" src="../${src}" alt="">`:'')+`<span>${p.organization}</span>`;
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

    const idx=C.projects.findIndex(x=>x.id===p.id),next=C.projects[(idx+1)%C.projects.length];
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
