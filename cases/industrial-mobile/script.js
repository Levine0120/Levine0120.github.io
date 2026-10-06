(() => {
  const dialog = document.querySelector('#lightbox');
  const image = document.querySelector('#lightbox-image');
  const title = document.querySelector('#lightbox-title');
  const close = document.querySelector('#close-lightbox');
  let trigger = null;
  let previousOverflow = '';
  document.querySelectorAll('.zoom').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      image.src = button.dataset.image;
      image.alt = button.dataset.title;
      image.classList.toggle('phone-image', !button.closest('.portfolio-finish'));
      title.textContent = button.dataset.title;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.scrollTop = 0;
      close.focus();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (trigger) trigger.focus({preventScroll: true});
  });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-head, .challenge-grid, .architecture, .strategy-layout, .scene-title, .system-title, .closing').forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
})();
