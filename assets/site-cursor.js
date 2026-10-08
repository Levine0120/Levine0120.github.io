(() => {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const pointer = document.createElement('div');
  pointer.className = 'portfolio-pointer';
  pointer.setAttribute('aria-hidden','true');
  pointer.innerHTML = '<span class="pointer-spectrum"></span><svg viewBox="0 0 24 24"><path d="M5 3 6 20 10 15 16 15Z"/></svg>';
  const style = document.createElement('style');
  style.textContent = `
    html.portfolio-cursor,html.portfolio-cursor *{cursor:none!important}
    .portfolio-pointer{position:fixed;left:0;top:0;width:32px;height:32px;z-index:2147483647;pointer-events:none;opacity:0;transition:opacity .12s;contain:layout style}
    .portfolio-pointer.is-visible{opacity:1}
    .pointer-spectrum{position:absolute;inset:0;border-radius:50%;background:conic-gradient(#ef7498,#f0ba70,#b5d983,#5bcab9,#6eaeed,#aa89df,#ef7498);padding:1.5px;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;animation:portfolio-spectrum 3s linear infinite;transition:inset .2s}
    .portfolio-pointer.is-action .pointer-spectrum{inset:-4px}
    .portfolio-pointer svg{position:absolute;left:8px;top:7px;width:19px;height:19px;fill:#243c46;stroke:#fff;stroke-width:1.2;stroke-linejoin:round;filter:drop-shadow(0 1px 2px #172b3726)}
    .portfolio-pointer.is-dark svg{fill:#f4fafc;stroke:#243c46}
    @keyframes portfolio-spectrum{to{transform:rotate(360deg)}}
  `;
  document.head.append(style);document.body.append(pointer);
  const hide=()=>{pointer.classList.remove('is-visible');document.documentElement.classList.remove('portfolio-cursor')};
  document.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    pointer.style.transform=`translate3d(${e.clientX-12}px,${e.clientY-9}px,0)`;
    pointer.classList.toggle('is-action',!!e.target.closest('a,button,[role="button"],input,select,textarea,[data-image]'));
    let node=e.target,lum=.8;
    while(node instanceof Element){const c=getComputedStyle(node).backgroundColor.match(/[\d.]+/g);if(c&&Number(c[3]??1)>.75){lum=(+c[0]*.2126 + +c[1]*.7152 + +c[2]*.0722)/255;break;}node=node.parentElement;}
    pointer.classList.toggle('is-dark',lum<.48);pointer.classList.add('is-visible');document.documentElement.classList.add('portfolio-cursor');
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
})();
