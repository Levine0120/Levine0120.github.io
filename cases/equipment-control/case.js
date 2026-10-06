(() => {
  const screens = JSON.parse(document.getElementById('screenData').textContent);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('js');
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
    }), { threshold: 0.06 });
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
  }
  const heroArt = document.querySelector('.hero-art');
  let heroVisible = true;
  const syncAmbientMotion = () => heroArt.classList.toggle('motion-paused', !heroVisible || document.hidden);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; syncAmbientMotion(); }).observe(heroArt);
  }
  document.addEventListener('visibilitychange', syncAmbientMotion);
  const progress = document.querySelector('.reading-progress');
  const navLinks = [...document.querySelectorAll('.site-header nav a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
  let ticking = false;
  function updateScroll() {
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
    let active = -1;
    sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= innerHeight * 0.35) active = i; });
    navLinks.forEach((link,i) => { link.classList.toggle('active', i===active); if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current'); });
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking=true; requestAnimationFrame(updateScroll); } }, {passive:true});
  addEventListener('resize',updateScroll); updateScroll();
  const focusNotes = [
    {rect:[1.5,7,46.5,55],title:'控制与反馈相邻。',text:'运行、暂停与复位集中排列，设备旁显示连接、警告与准备状态。'},
    {rect:[49,8,50,89],title:'先查找，再设置。',text:'上方查找焊接方案，下方选择自动匹配或手动设置。'},
    {rect:[1.5,63,46.5,33],title:'当前读数与变化并列。',text:'电流、电压显示当前数值，旁边曲线展示变化过程。'}
  ];
  const tabs=[...document.querySelectorAll('[data-zone]')];
  const panel=document.getElementById('controlNote'), zone=document.querySelector('.zone');
  function selectZone(i) {
    const note=focusNotes[i];
    tabs.forEach((button,j)=>{button.setAttribute('aria-selected',String(i===j));button.tabIndex=i===j?0:-1;});
    ['left','top','width','height'].forEach((key,j)=>zone.style[key]=note.rect[j]+'%');
    panel.querySelector('h3').textContent=note.title;
    panel.querySelector('p').textContent=note.text;
    panel.setAttribute('aria-labelledby',tabs[i].id);
  }
  tabs.forEach((button,i)=>{
    button.addEventListener('click',()=>selectZone(i));
    button.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(i+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();selectZone(next);tabs[next].focus();}
    });
  });
  let filter='all';
  const cards=[...document.querySelectorAll('.gallery-card')];
  const galleryIds=new Set(cards.map(card=>card.dataset.image));
  const galleryScreens=screens.filter(screen=>galleryIds.has(screen.id));
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    filter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    cards.forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
    document.getElementById('galleryCount').textContent=`${cards.filter(card=>!card.hidden).length} SCREENS`;
    updateScroll();
  }));
  const modal=document.getElementById('imageModal');
  const modalImage=document.getElementById('modalImage');
  let currentId='',modalItems=screens,trigger=null;
  function showImage(id) {
    const item=screens.find(screen=>screen.id===id);if(!item)return;
    currentId=id;modalImage.src=item.src;modalImage.alt=item.title;
    document.getElementById('modalTitle').textContent=item.title;
    document.getElementById('modalIndex').textContent=`${String(modalItems.findIndex(s=>s.id===id)+1).padStart(2,'0')} / ${modalItems.length}`;
  }
  function step(direction) {const i=modalItems.findIndex(item=>item.id===currentId);showImage(modalItems[(i+direction+modalItems.length)%modalItems.length].id);}
  document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
    trigger=button;modalItems=button.classList.contains('gallery-card')?galleryScreens.filter(s=>filter==='all'||s.category===filter):screens;
    showImage(button.dataset.image);modal.showModal();document.body.classList.add('modal-open');
  }));
  document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
  document.getElementById('previousImage').addEventListener('click',()=>step(-1));
  document.getElementById('nextImage').addEventListener('click',()=>step(1));
  modal.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}
    if(event.key==='ArrowRight'){event.preventDefault();step(1);}
  });
  modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
  modal.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus({preventScroll:true});});
})();
