(function () {
  'use strict';

  var PROFILE = {
    name: 'VishwaConclave',
    org: 'VishwaConclave — VIT Pune',
    note: "India's First Truly Multidisciplinary Student Centric Conclave organized by students of VIT, Pune.",
    urls: [
      'https://www.vishwaconclave.com/',
      'https://www.instagram.com/vishwaconclave/',
      'https://in.linkedin.com/company/vishwaconclave',
      'https://linktw.in/ciXaBb'
    ],
    address: 'Vishwakarma Institute of Technology;666 Upper Indiranagar, Bibwewadi;Pune;Maharashtra;411037;India'
  };

  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  // Nav background on scroll
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up stats
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var counters = document.querySelectorAll('[data-count]');
  function fmt(n, comma) { return comma ? n.toLocaleString('en-IN') : String(n); }
  function runCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var comma = el.hasAttribute('data-comma');
    if (reduce || target > 2000 && target < 2100) { el.textContent = fmt(target, comma); return; }
    var start = performance.now(), dur = 1400;
    (function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))), comma);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  // Save contact (vCard)
  document.getElementById('saveContact').addEventListener('click', function () {
    var lines = [
      'BEGIN:VCARD', 'VERSION:3.0',
      'FN:' + PROFILE.name,
      'ORG:' + PROFILE.org,
      'NOTE:' + PROFILE.note.replace(/,/g, '\\,')
    ];
    PROFILE.urls.forEach(function (u) { lines.push('URL:' + u); });
    lines.push('ADR;TYPE=WORK:;;' + PROFILE.address, 'END:VCARD');
    var blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'VishwaConclave.vcf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Contact card downloaded');
  });

  // Share
  document.getElementById('share').addEventListener('click', function () {
    var data = { title: 'VishwaConclave — Thought Begins Here', text: PROFILE.note, url: location.href };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href).then(function () { toast('Link copied'); });
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Starfield
  var canvas = document.getElementById('stars');
  var ctx = canvas.getContext('2d');
  var stars = [], W, H, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = innerWidth * dpr;
    H = canvas.height = innerHeight * dpr;
    var n = Math.round((innerWidth * innerHeight) / 9000);
    stars = [];
    for (var i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.2 + 0.3) * dpr,
        s: Math.random() * 0.04 + 0.01,
        p: Math.random() * Math.PI * 2,
        c: Math.random() < 0.15 ? '242,194,48' : '220,230,255'
      });
    }
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = reduce ? 0.6 : 0.35 + 0.45 * Math.sin(t * s.s * 0.05 + s.p);
      ctx.fillStyle = 'rgba(' + s.c + ',' + Math.max(0.1, a) + ')';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.283);
      ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();
