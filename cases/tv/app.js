const viewer=document.getElementById('image-viewer');
const viewerImage=viewer.querySelector('img');
const viewerCaption=viewer.querySelector('p');
document.querySelectorAll('.open-image').forEach(card=>card.addEventListener('click',()=>{
  viewerImage.src=card.dataset.src;
  viewerImage.alt=`原始设计稿：${card.dataset.title}`;
  viewerCaption.textContent=card.dataset.title;
  viewer.showModal();
}));
viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
viewer.addEventListener('close',()=>viewerImage.removeAttribute('src'));
