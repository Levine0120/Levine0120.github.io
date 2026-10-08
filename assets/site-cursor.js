(() => {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const path = 'M7 5 L8 28 Q8 30 10 28 L15 22 L23 22 Q26 22 24 20 L9 5 Q7 3 7 5 Z';
  const tilt = 'translate(2 1.5) rotate(-15 16 16.5)';
  const outline = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path transform="${tilt}" d="${path}" fill="none" stroke="white" stroke-width="1.8" stroke-linejoin="round"/></svg>`)}")`;
  const silhouette = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path transform="${tilt}" d="${path}" fill="white"/></svg>`)}")`;
  const pointer = document.createElement('div');
  pointer.className = 'portfolio-pointer';
  pointer.setAttribute('aria-hidden','true');
  pointer.innerHTML = `<span class="pointer-shadow"><span></span></span><svg viewBox="0 0 36 36"><path transform="${tilt}" d="${path}"/></svg><span class="pointer-outline"></span>`;
  const style = document.createElement('style');
  style.textContent = `
    html.portfolio-cursor,html.portfolio-cursor *{cursor:none!important}
    .portfolio-pointer{position:fixed;left:0;top:0;width:25.6px;height:25.6px;z-index:2147483647;pointer-events:none;opacity:0;transition:opacity .12s;--pointer-fill:#181c20;--spectrum:conic-gradient(#ef7498,#f0ba70,#b5d983,#5bcab9,#6eaeed,#aa89df,#ef7498)}
    .portfolio-pointer.is-visible{opacity:1}
    .portfolio-pointer svg{position:absolute;inset:0;width:25.6px;height:25.6px;fill:var(--pointer-fill);filter:drop-shadow(0 1px 2px #172b3726)}
    .portfolio-pointer.is-dark{--pointer-fill:#fff}
    .pointer-outline{position:absolute;inset:0;mask-image:${outline};mask-size:25.6px 25.6px;mask-repeat:no-repeat;opacity:1;transition:opacity .18s}
    .pointer-outline:before{content:'';position:absolute;inset:-50%;background:var(--spectrum);animation:portfolio-spectrum 3s linear infinite}
    .pointer-shadow{position:absolute;inset:0;opacity:0;filter:blur(3px);transform:translate(1px,2px) scale(1.15);transition:opacity .18s}
    .pointer-shadow>span{position:absolute;inset:0;mask-image:${silhouette};mask-size:25.6px 25.6px;mask-repeat:no-repeat}
    .pointer-shadow>span:before{content:'';position:absolute;inset:-50%;background:var(--spectrum);animation:portfolio-spectrum 3s linear infinite}
    .portfolio-pointer.is-action .pointer-shadow{opacity:.85}
    .portfolio-pointer.is-action .pointer-outline{opacity:0}
    .portfolio-pointer.is-action svg{stroke:var(--pointer-edge,#fff);stroke-width:1.4;stroke-linejoin:round}
    .portfolio-pointer.is-dark{--pointer-edge:#181c20}
    @keyframes portfolio-spectrum{to{transform:rotate(360deg)}}
  `;
  document.head.append(style);document.body.append(pointer);
  let last;
  const hide=()=>{last=null;pointer.classList.remove('is-visible');document.documentElement.classList.remove('portfolio-cursor')};
  const updateTarget=target=>{
    if(!(target instanceof Element))return;
    pointer.classList.toggle('is-action',!!target.closest('a,button,[role="button"],input,select,textarea,[data-image]'));
    let node=target,lum=.8;
    while(node instanceof Element){const c=getComputedStyle(node).backgroundColor.match(/[\d.]+/g);if(c&&Number(c[3]??1)>.75){lum=(+c[0]*.2126 + +c[1]*.7152 + +c[2]*.0722)/255;break;}node=node.parentElement;}
    pointer.classList.toggle('is-dark',lum<.48);
  };
  document.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    last={x:e.clientX,y:e.clientY};
    pointer.style.transform=`translate3d(${e.clientX-4.5}px,${e.clientY-6.55}px,0)`;
    updateTarget(e.target);pointer.classList.add('is-visible');document.documentElement.classList.add('portfolio-cursor');
  },{passive:true});
  document.addEventListener('scroll',()=>{if(last)updateTarget(document.elementFromPoint(last.x,last.y))},{passive:true,capture:true});
  document.documentElement.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hide()});
})();
