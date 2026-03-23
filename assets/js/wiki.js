/* Hotel Process Wiki — wiki.js */

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function initLightbox() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = closeLightbox;

  const img = document.createElement('img');
  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Attach to all diagram images
  document.querySelectorAll('.diagram-wrap img').forEach(function(el) {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', function() {
      img.src = el.src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ── DOMAIN ICONS ─────────────────────────────────────────────────────────────
var DOMAIN_ICONS = {
  'hk': '🛏️',
  'fo': '🏨',
  'fb': '🍽️',
  'rm': '📈',
  'sm': '🎯',
  'hr': '👥',
  'fm': '🔧',
  'fn': '💰',
  'it': '💻',
  'sc': '🔒'
};

// ── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initLightbox();

  // Add active class to current nav
  var path = window.location.pathname;
  document.querySelectorAll('.nav a').forEach(function(a) {
    if (a.href && path.startsWith(new URL(a.href).pathname)) {
      a.style.opacity = '1';
      a.style.fontWeight = '700';
    }
  });
});
