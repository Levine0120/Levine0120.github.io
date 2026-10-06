(() => {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  // Use the actual browser cursor so scrolling and window changes cannot leave a second pointer behind.
  const cursor = (day, action) => {
    const fill = day ? '#183039' : '#f2fafb';
    const edge = day ? '#f7fcfd' : '#10232c';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">${action ? `<circle cx="16" cy="17" r="14" fill="none" stroke="${day ? '#315e6c' : '#79d4df'}" stroke-opacity=".6"/>` : ''}<path d="M7 5 L8 28 Q8 30 10 28 L15 22 L23 22 Q26 22 24 20 L9 5 Q7 3 7 5 Z" fill="${fill}" stroke="${edge}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 7 5, auto`;
  };
  const variants = [cursor(false,false),cursor(false,true),cursor(true,false),cursor(true,true)];
  const style = document.createElement('style');
  style.textContent = 'html.portfolio-cursor,html.portfolio-cursor *{cursor:var(--portfolio-cursor)!important}';
  document.head.append(style);
  document.querySelectorAll('.portfolio-pointer').forEach(node=>node.remove());
  let previous=-1;
  document.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch')return;
    let node=e.target,lum=.8;
    while(node instanceof Element){
      const color=getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
      if(color&&Number(color[3]??1)>.75){lum=(Number(color[0])*.2126+Number(color[1])*.7152+Number(color[2])*.0722)/255;break;}
      node=node.parentElement;
    }
    const action=!!e.target.closest('a,button,[role="button"],input,select,textarea,[data-image]');
    const next=(lum>.48?2:0)+(action?1:0);
    if(next!==previous){document.documentElement.style.setProperty('--portfolio-cursor',variants[next]);previous=next;}
    document.documentElement.classList.add('portfolio-cursor');
  },{passive:true});
})();
