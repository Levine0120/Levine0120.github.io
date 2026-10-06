const brochureViewer=document.querySelector('#brochure-viewer');
const brochureBook=document.querySelector('#brochure-book');
const brochureStage=document.querySelector('.brochure-stage');
const brochurePage=document.querySelector('#brochure-page');
const brochureTurn=document.querySelector('#brochure-turn');
const brochureDefault={title:'中建钢构智能制造产品集',eyebrow:'PRINT DESIGN / 2022',footer:'CHINA CONSTRUCTION STEEL STRUCTURE',total:16,ratio:1729.13/651.968,base:'assets/brochure-pages/',digits:2};
const exhibitionSpec={title:'中建科工 · 展板设计',eyebrow:'PRINT DESIGN / EXHIBITION',footer:'中建科工 · 展板设计',total:7,ratio:6633.07/907.087,ratios:[6000/821,9356/2552,5954/2552,2200/1241,2200/1241,2200/1241,2200/1241],base:'assets/exhibition-pages/',digits:1};
let brochureCurrent=brochureDefault,brochureTotal=16;
const brochureZoomLevels=[1,1.5,2,2.7,4];
let brochureIndex=1,brochureBusy=false,brochureTrigger=null,brochureZoom=1,brochureX=0,brochureY=0,brochureGeneration=0,brochureDrag=null;
const brochureSrc=n=>brochureCurrent.sources?.[n-1]||`${brochureCurrent.base}page-${String(n+(brochureCurrent.startPage||1)-1).padStart(brochureCurrent.digits,'0')}.jpg`;
function brochureUpdate(){
  brochurePage.src=brochureSrc(brochureIndex);
  brochurePage.alt=`画册第 ${brochureIndex} 页`;
  brochureBook.style.setProperty('--book-ratio',brochureCurrent.ratios?.[brochureIndex-1]||brochureCurrent.ratio);
  document.querySelector('#brochure-count').textContent=`${String(brochureIndex).padStart(2,'0')} / ${brochureTotal}`;
  document.querySelector('#brochure-track-fill').style.width=`${brochureIndex/brochureTotal*100}%`;
  document.querySelector('#brochure-prev').disabled=brochureIndex===1;
  document.querySelector('#brochure-next').disabled=brochureIndex===brochureTotal;
}
function brochureApplyZoom(){
  const maxX=Math.max(0,(brochureBook.offsetWidth*brochureZoom-brochureStage.clientWidth+40)/2);
  const maxY=Math.max(0,(brochureBook.offsetHeight*brochureZoom-brochureStage.clientHeight+30)/2);
  brochureX=Math.max(-maxX,Math.min(maxX,brochureX));
  brochureY=Math.max(-maxY,Math.min(maxY,brochureY));
  brochureBook.style.transform=`translate(${brochureX}px,${brochureY}px) scale(${brochureZoom})`;
  brochureBook.classList.toggle('is-zoomed',brochureZoom>1);
  document.querySelector('#brochure-zoom-label').textContent=`${Math.round(brochureZoom*100)}%`;
  document.querySelector('#brochure-zoom-out').disabled=brochureZoom===1;
  document.querySelector('#brochure-zoom-in').disabled=brochureZoom===brochureZoomLevels.at(-1);
}
function brochureSetZoom(next,point){
  const was=brochureZoom;
  brochureZoom=next;
  if(next===1){brochureX=0;brochureY=0}
  else if(point&&was===1){
    const r=brochureBook.getBoundingClientRect();
    brochureX=-(point.x-(r.left+r.width/2))*next;
    brochureY=-(point.y-(r.top+r.height/2))*next;
  }
  brochureApplyZoom();
}
function brochureZoomStep(step){
  const i=brochureZoomLevels.indexOf(brochureZoom);
  brochureSetZoom(brochureZoomLevels[Math.max(0,Math.min(brochureZoomLevels.length-1,i+step))]);
}
function openBrochure(trigger,spec=brochureDefault){
  brochureCurrent=spec;brochureTotal=spec.total;
  document.querySelector('#brochure-title').textContent=spec.title;
  document.querySelector('#brochure-eyebrow').textContent=spec.eyebrow;
  document.querySelector('#brochure-footer-label').textContent=spec.footer;
  document.querySelector('#brochure-back').hidden=!spec.showBack;
  brochureBook.style.setProperty('--book-ratio',spec.ratios?.[0]||spec.ratio);
  brochureTrigger=trigger;brochureIndex=1;brochureBusy=false;brochureGeneration++;
  brochureViewer.classList.add('open');brochureViewer.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  brochureUpdate();brochureSetZoom(spec.initialZoom||1);document.querySelector('#brochure-close').focus();
  if(brochureTotal>1){const next=new Image();next.src=brochureSrc(2)}
}
function closeBrochure(){
  brochureGeneration++;
  brochureViewer.classList.remove('open');brochureViewer.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');brochureTurn.className='brochure-turn';
  brochureBusy=false;brochureTrigger?.focus();brochureTrigger=null;
}
async function brochureFlip(step){
  if(brochureBusy||!brochureViewer.classList.contains('open'))return;
  const target=brochureIndex+step;if(target<1||target>brochureTotal)return;
  brochureBusy=true;
  const generation=brochureGeneration;
  const next=new Image();next.src=brochureSrc(target);
  try{await next.decode()}catch{}
  if(generation!==brochureGeneration)return;
  brochureTurn.src=next.src;
  brochureTurn.className=`brochure-turn is-turning ${step>0?'to-next':'to-prev'}`;
  setTimeout(()=>{
    if(generation!==brochureGeneration)return;
    brochureIndex=target;brochureUpdate();brochureTurn.className='brochure-turn';brochureBusy=false;brochureApplyZoom();
    const preload=new Image();preload.src=brochureSrc(Math.min(brochureTotal,brochureIndex+1));
  },430);
}
document.querySelector('#brochure-close').onclick=closeBrochure;
document.querySelector('#brochure-prev').onclick=()=>brochureFlip(-1);
document.querySelector('#brochure-next').onclick=()=>brochureFlip(1);
document.querySelector('#brochure-zoom-in').onclick=()=>brochureZoomStep(1);
document.querySelector('#brochure-zoom-out').onclick=()=>brochureZoomStep(-1);
brochureViewer.addEventListener('click',e=>{if(e.target===brochureViewer)closeBrochure()});
brochureBook.addEventListener('pointerdown',e=>{
  if(!brochureViewer.classList.contains('open'))return;
  brochureDrag={x:e.clientX,y:e.clientY,startX:brochureX,startY:brochureY,moved:false};
  brochureBook.setPointerCapture(e.pointerId);
  if(brochureZoom>1)brochureBook.classList.add('is-dragging');
});
brochureBook.addEventListener('pointermove',e=>{
  if(!brochureDrag)return;
  const dx=e.clientX-brochureDrag.x,dy=e.clientY-brochureDrag.y;
  if(Math.hypot(dx,dy)>5)brochureDrag.moved=true;
  if(brochureDrag.moved&&brochureZoom>1){brochureX=brochureDrag.startX+dx;brochureY=brochureDrag.startY+dy;brochureApplyZoom()}
});
brochureBook.addEventListener('pointerup',e=>{
  if(!brochureDrag)return;
  const moved=brochureDrag.moved;brochureDrag=null;
  brochureBook.classList.remove('is-dragging');
  if(!moved)brochureSetZoom(brochureZoom===1?2:1,{x:e.clientX,y:e.clientY});
});
brochureBook.addEventListener('pointercancel',()=>{brochureDrag=null;brochureBook.classList.remove('is-dragging')});
document.addEventListener('keydown',e=>{
  if(!brochureViewer.classList.contains('open'))return;
  if(e.key==='Escape')closeBrochure();
  else if(e.key==='ArrowRight')brochureFlip(1);
  else if(e.key==='ArrowLeft')brochureFlip(-1);
  else if(e.key==='+'||e.key==='=')brochureZoomStep(1);
  else if(e.key==='-')brochureZoomStep(-1);
});
window.addEventListener('resize',()=>{if(brochureViewer.classList.contains('open'))brochureApplyZoom()});
