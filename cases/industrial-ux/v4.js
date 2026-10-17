(function () {
  'use strict';

  /* ---------- 左侧浮动导航 ---------- */
  var rail = document.getElementById('rail');
  var items = [].slice.call(rail.querySelectorAll('a'));
  var fill = document.getElementById('rail-fill');
  var targets = items.map(function (a) { var t = a.dataset.t; return t === 'top' ? null : document.getElementById(t); });
  var darkSecs = [].slice.call(document.querySelectorAll('.hero,.sec--dark'));
  function railUpdate() {
    var probe = window.innerHeight * 0.4, cur = 0;
    targets.forEach(function (el, i) { if (el && el.getBoundingClientRect().top <= probe) cur = i; });
    items.forEach(function (a, i) { a.classList.toggle('on', i === cur); a.classList.toggle('done', i < cur); });
    if (fill) fill.style.height = (items.length > 1 ? cur / (items.length - 1) * 100 : 0) + '%';
    var r = rail.getBoundingClientRect(), mid = r.top + r.height / 2;
    var dark = darkSecs.some(function (s) { var b = s.getBoundingClientRect(); return b.top <= mid && b.bottom >= mid; });
    rail.classList.toggle('dark', dark);
  }
  items.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var el = a.dataset.t === 'top' ? null : document.getElementById(a.dataset.t);
      var y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      history.pushState(null, '', a.getAttribute('href'));
      window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
  window.addEventListener('scroll', railUpdate, { passive: true });
  window.addEventListener('resize', railUpdate);
  railUpdate();
  /* ---------- 图片查看器：缩放、拖动 ---------- */
  var viewer = document.getElementById('viewer');
  var stage = document.getElementById('viewer-stage');
  var img = document.getElementById('viewer-img');
  var title = document.getElementById('viewer-title');
  var pct = document.getElementById('viewer-pct');
  var s = 1, x = 0, y = 0, fit = 1, minS = 0.1, maxS = 4, lastFocus = null;

  function apply() {
    img.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
    pct.textContent = Math.round(s * 100) + '%';
  }
  function clampPos() {
    var W = stage.clientWidth, H = stage.clientHeight;
    var w = img.naturalWidth * s, h = img.naturalHeight * s;
    x = w <= W ? (W - w) / 2 : Math.min(40, Math.max(W - w - 40, x));
    y = h <= H ? (H - h) / 2 : Math.min(40, Math.max(H - h - 40, y));
  }
  function fitView() {
    var W = stage.clientWidth, H = stage.clientHeight;
    fit = Math.min((W - 32) / img.naturalWidth, (H - 32) / img.naturalHeight);
    minS = fit * 0.6;
    maxS = Math.max(fit * 8, 1.5);
    s = fit; clampPos(); apply();
  }
  function zoomAt(ns, cx, cy) {
    ns = Math.min(maxS, Math.max(minS, ns));
    var r = stage.getBoundingClientRect();
    var px = cx - r.left, py = cy - r.top;
    x = px - (px - x) * (ns / s);
    y = py - (py - y) * (ns / s);
    s = ns; clampPos(); apply();
  }
  function center() { var r = stage.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }

  function open(btn) {
    lastFocus = btn;
    title.textContent = btn.dataset.title || '';
    img.alt = btn.dataset.title || '';
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    img.onload = fitView;
    img.src = btn.dataset.src;
    if (img.complete && img.naturalWidth) fitView();
  }
  function close() {
    viewer.hidden = true;
    document.body.style.overflow = '';
    img.removeAttribute('src');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  document.querySelectorAll('.zoomable').forEach(function (b) {
    b.addEventListener('click', function () { open(b); });
  });

  viewer.querySelector('.viewer-tools').addEventListener('click', function (e) {
    var z = e.target.closest('button'); if (!z) return;
    var c = center();
    if (z.dataset.z === 'in') zoomAt(s * 1.4, c[0], c[1]);
    else if (z.dataset.z === 'out') zoomAt(s / 1.4, c[0], c[1]);
    else if (z.dataset.z === 'fit') fitView();
    else if (z.dataset.z === 'close') close();
  });

  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    zoomAt(s * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
  }, { passive: false });

  stage.addEventListener('dblclick', function (e) {
    if (s > fit * 1.5) fitView(); else zoomAt(Math.max(fit * 3, 1), e.clientX, e.clientY);
  });

  var pointers = {}, startDist = 0, startS = 1, lastX = 0, lastY = 0;
  stage.addEventListener('pointerdown', function (e) {
    stage.setPointerCapture(e.pointerId);
    pointers[e.pointerId] = [e.clientX, e.clientY];
    var ids = Object.keys(pointers);
    if (ids.length === 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      startDist = Math.hypot(a[0] - b[0], a[1] - b[1]); startS = s;
    }
    lastX = e.clientX; lastY = e.clientY;
    stage.classList.add('dragging');
  });
  stage.addEventListener('pointermove', function (e) {
    if (!pointers[e.pointerId]) return;
    pointers[e.pointerId] = [e.clientX, e.clientY];
    var ids = Object.keys(pointers);
    if (ids.length === 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      zoomAt(startS * d / startDist, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    } else {
      x += e.clientX - lastX; y += e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      clampPos(); apply();
    }
  });
  function up(e) {
    delete pointers[e.pointerId];
    var ids = Object.keys(pointers);
    if (ids.length === 1) { lastX = pointers[ids[0]][0]; lastY = pointers[ids[0]][1]; }
    if (!ids.length) stage.classList.remove('dragging');
  }
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);

  document.addEventListener('keydown', function (e) {
    if (viewer.hidden) return;
    var c = center();
    if (e.key === 'Escape') close();
    else if (e.key === '+' || e.key === '=') zoomAt(s * 1.4, c[0], c[1]);
    else if (e.key === '-') zoomAt(s / 1.4, c[0], c[1]);
    else if (e.key === '0') fitView();
  });
  window.addEventListener('resize', function () { if (!viewer.hidden) fitView(); });
})();
