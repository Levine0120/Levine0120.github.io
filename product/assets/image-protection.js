(() => {
  'use strict';

  const imagePath = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:$|[?#])/i;
  const imageSurface = 'img, picture, svg, canvas, [data-image], [data-src], .image-open, .open-image, .shot';
  const imageTarget = target => target instanceof Element &&
    (target.closest(imageSurface) || target.closest('a[href]')?.querySelector('img'));

  const style = document.createElement('style');
  style.textContent = 'img,picture,svg,canvas{-webkit-user-drag:none;-webkit-touch-callout:none;user-select:none}';
  document.head.append(style);

  const markImages = root => {
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.matches('img')) root.draggable = false;
    root.querySelectorAll('img').forEach(image => { image.draggable = false; });
  };

  markImages(document.documentElement);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(markImages));
  }).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('dragstart', event => {
    if (imageTarget(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('contextmenu', event => {
    if (imageTarget(event.target)) event.preventDefault();
  }, true);

  const blockDirectImageLink = event => {
    const link = event.target.closest('a[href]');
    if (link && imagePath.test(link.getAttribute('href'))) event.preventDefault();
  };
  document.addEventListener('click', blockDirectImageLink, true);
  document.addEventListener('auxclick', blockDirectImageLink, true);
})();
