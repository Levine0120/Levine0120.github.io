(() => {
  'use strict';
  const imagePath = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:$|[?#])/i;
  const surfaces = 'img,picture,svg,canvas,[data-image],[data-src],.image-open,.open-image,.shot';
  const imageTarget = target => {
    if (!(target instanceof Element)) return false;
    if (target.closest(surfaces)) return true;
    const control=target.closest('a,button,figure');
    if (control?.querySelector('img,picture,svg,canvas')) return true;
    for (let el=target,depth=0;el&&depth<5;el=el.parentElement,depth++) {
      if (el===document.body||el===document.documentElement) break;
      if (/url\(/i.test(getComputedStyle(el).backgroundImage)) return true;
    }
    return false;
  };
  const style=document.createElement('style');
  style.dataset.imageProtection='true';
  style.textContent='img,picture,svg,canvas{-webkit-user-drag:none;-webkit-touch-callout:none;user-select:none}a:has(img),button:has(img),figure{-webkit-touch-callout:none}';
  document.head.append(style);
  const markImages=root=>{
    if(root.nodeType!==Node.ELEMENT_NODE)return;
    if(root.matches('img'))root.draggable=false;
    root.querySelectorAll('img').forEach(image=>{image.draggable=false;});
  };
  markImages(document.documentElement);
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(markImages)))
    .observe(document.documentElement,{childList:true,subtree:true});
  for(const type of ['dragstart','contextmenu'])document.addEventListener(type,event=>{
    if(imageTarget(event.target))event.preventDefault();
  },true);
  document.addEventListener('copy',event=>{
    if(imageTarget(event.target)&&!(window.getSelection()?.toString()))event.preventDefault();
  },true);
  const blockDirectImageLink=event=>{
    const link=event.target instanceof Element?event.target.closest('a[href]'):null;
    if(link&&imagePath.test(link.getAttribute('href')))event.preventDefault();
  };
  document.addEventListener('click',blockDirectImageLink,true);
  document.addEventListener('auxclick',blockDirectImageLink,true);
})();
