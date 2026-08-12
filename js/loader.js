(() => {
  'use strict';
  const loader=document.getElementById('site-loader');
  if(!loader){document.documentElement.classList.add('motion-ready');return;}
  const bar=loader.querySelector('[data-loader-bar]'),value=loader.querySelector('[data-loader-value]'),caption=loader.querySelector('.site-loader__caption'),hero=document.querySelector('[data-hero-video]');
  const lang=localStorage.getItem('fred-lang')||'es'; if(caption)caption.textContent=lang==='en'?'FIND THE RHYTHM.':'ENCUENTRA EL RITMO.';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,start=performance.now(),duration=reduced?180:520;
  const paint=n=>{const x=Math.min(100,Math.round(n));if(bar)bar.style.transform=`scaleX(${x/100})`;if(value)value.textContent=`${String(x).padStart(2,'0')}%`;};
  const finish=()=>{paint(100);loader.classList.add('site-loader--complete');document.body.classList.remove('is-loading');document.documentElement.classList.add('motion-ready');if(hero){hero.muted=true;hero.defaultMuted=true;hero.setAttribute('muted','');hero.setAttribute('autoplay','');hero.setAttribute('playsinline','');try{hero.play().catch(()=>{});}catch(_){}};dispatchEvent(new CustomEvent('fred:loaded'));setTimeout(()=>loader.remove(),220);};
  const tick=now=>{const p=Math.min(1,(now-start)/duration);paint(4+96*(1-Math.pow(1-p,3)));if(p>=1)finish();else requestAnimationFrame(tick);};paint(4);requestAnimationFrame(tick);
})();
