(() => {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$=(s,c=document)=>[...c.querySelectorAll(s)];
  document.documentElement.classList.add('motion-enhanced');
  if(!document.getElementById('site-loader'))document.documentElement.classList.add('motion-ready');
  if(reduced)return;
  $$('a[href]').forEach(a=>a.addEventListener('click',e=>{
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==='_blank'||a.hasAttribute('download'))return;
    const raw=a.getAttribute('href'); if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:'))return;
    let url;try{url=new URL(a.href,location.href);}catch{return;} if(url.origin!==location.origin)return;
    const current=new URL(location.href); if(url.pathname===current.pathname&&url.hash)return;
    e.preventDefault(); const curtain=document.createElement('div');curtain.className='page-exit';curtain.setAttribute('aria-hidden','true');curtain.innerHTML='<i></i>';document.body.appendChild(curtain);requestAnimationFrame(()=>curtain.classList.add('is-in'));setTimeout(()=>{location.href=url.href;},360);
  }));
})();
