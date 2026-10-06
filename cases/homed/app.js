const viewer=document.getElementById('viewer');
const viewerImg=document.getElementById('viewer-img');
const viewerTitle=document.getElementById('viewer-title');
document.querySelectorAll('.shot').forEach((shot)=>shot.addEventListener('click',()=>{
  viewerImg.src=shot.dataset.src;
  viewerImg.alt=`HOMED 原始设计稿：${shot.dataset.title}`;
  viewerTitle.textContent=shot.dataset.title;
  viewer.showModal();
}));
document.getElementById('viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',(event)=>{if(event.target===viewer)viewer.close()});
viewer.addEventListener('close',()=>{viewerImg.removeAttribute('src')});
