/* Hotel Process Wiki — wiki.js (v3 — dynamic sidebar) */

// ── TAXONOMY DATA ─────────────────────────────────────────────────────────────
var HW_DOMAINS = [
  {code:"HK",icon:"🛏️",name:"Housekeeping & Rooms Management",slug:"housekeeping",l2:[
      {code:"HK-GC",name:"Guest Room Cleaning & Turndown",slug:"guest-room-cleaning"},
      {code:"HK-LP",name:"Laundry & Linen Operations",slug:"laundry-linen"},
      {code:"HK-PC",name:"Public Area & Cleaning Operations",slug:"public-area-cleaning"}
  ]},
  {code:"FO",icon:"🏨",name:"Front Office & Guest Services",slug:"front-office",l2:[
      {code:"FO-CI",name:"Check-In & Check-Out Operations",slug:"checkin-checkout"},
      {code:"FO-CS",name:"Concierge & Guest Services",slug:"concierge-services"},
      {code:"FO-NS",name:"Night Audit & Front Desk Operations",slug:"night-audit"},
      {code:"FO-SP",name:"Spa & Wellness Operations",slug:"spa-wellness"},
      {code:"FO-UP",name:"Upselling & Revenue Optimisation",slug:"upselling-revenue"}
  ]},
  {code:"FB",icon:"🍽️",name:"Food & Beverage Operations",slug:"food-beverage",l2:[
      {code:"FB-RO",name:"Restaurant & Bar Operations",slug:"restaurant-bar"},
      {code:"FB-BQ",name:"Banqueting & Events Catering",slug:"banqueting-events"},
      {code:"FB-KT",name:"Kitchen & Culinary Operations",slug:"kitchen-culinary"}
  ]},
  {code:"RM",icon:"📈",name:"Revenue Management & Distribution",slug:"revenue-management",l2:[
      {code:"RM-YM",name:"Yield & Rate Management",slug:"yield-rate"},
      {code:"RM-CH",name:"Channel & Distribution Management",slug:"channel-distribution"},
      {code:"RM-RV",name:"Reservations Operations",slug:"reservations"}
  ]},
  {code:"SM",icon:"🎯",name:"Sales, Marketing & Loyalty",slug:"sales-marketing",l2:[
      {code:"SM-SL",name:"Sales & Account Management",slug:"sales-accounts"},
      {code:"SM-MK",name:"Marketing & Digital",slug:"marketing-digital"},
      {code:"SM-LY",name:"Loyalty & Guest Relationship",slug:"loyalty-guest"},
      {code:"SM-FR",name:"Franchise & Brand Management",slug:"franchise-brand"}
  ]},
  {code:"HR",icon:"👥",name:"Human Resources & Training",slug:"human-resources",l2:[
      {code:"HR-TL",name:"Talent & Workforce Management",slug:"talent-workforce"},
      {code:"HR-LR",name:"Learning & Development",slug:"learning-development"},
      {code:"HR-EW",name:"Employee Wellbeing & Engagement",slug:"employee-wellbeing"}
  ]},
  {code:"FM",icon:"🔧",name:"Facilities & Engineering",slug:"facilities",l2:[
      {code:"FM-PM",name:"Preventive Maintenance",slug:"preventive-maintenance"},
      {code:"FM-EM",name:"Energy & Environment Management",slug:"energy-environment"},
      {code:"FM-RM",name:"Reactive Maintenance & Work Orders",slug:"reactive-maintenance"}
  ]},
  {code:"FN",icon:"💰",name:"Finance & Procurement",slug:"finance",l2:[
      {code:"FN-AC",name:"Accounting & Financial Control",slug:"accounting-finance"},
      {code:"FN-PR",name:"Procurement & Supply Chain",slug:"procurement-supply"}
  ]},
  {code:"IT",icon:"💻",name:"Technology & Systems",slug:"technology",l2:[
      {code:"IT-OP",name:"IT Operations & Infrastructure",slug:"it-operations"},
      {code:"IT-DG",name:"Digital Guest Experience",slug:"digital-guest"}
  ]},
  {code:"SC",icon:"🔒",name:"Safety, Security & Compliance",slug:"security-compliance",l2:[
      {code:"SC-SE",name:"Security Operations",slug:"security-operations"},
      {code:"SC-CL",name:"Compliance & Risk Management",slug:"compliance-risk"}
  ]},
];
var HW_EA = [
  {id:"EA-01",slug:"ea-01",title:"Hotel System Landscape"},
  {id:"EA-02",slug:"ea-02",title:"Guest Journey Data Flow"},
  {id:"EA-03",slug:"ea-03",title:"Revenue & Distribution Architecture"},
  {id:"EA-04",slug:"ea-04",title:"F&B Operations Integration"},
  {id:"EA-05",slug:"ea-05",title:"Property Operations Ecosystem"},
  {id:"EA-06",slug:"ea-06",title:"Loyalty & CRM Architecture"},
  {id:"EA-07",slug:"ea-07",title:"HR & Workforce Technology Stack"},
  {id:"EA-08",slug:"ea-08",title:"Finance & Procurement Technology Stack"},
  {id:"EA-09",slug:"ea-09",title:"IT & Digital Guest Experience Architecture"},
  {id:"EA-10",slug:"ea-10",title:"Sales, MICE & Franchise Ecosystem"},
];

// ── PATH DEPTH DETECTION ──────────────────────────────────────────────────────
function getPrefix() {
  var path = window.location.pathname;
  // Strip leading slash and trailing slash, split
  var parts = path.replace(/^\/|\/$/, '').split('/').filter(Boolean);
  // Remove the repo name segment (Hotel-Process-Wiki)
  var idx = parts.indexOf('Hotel-Process-Wiki');
  if (idx >= 0) parts = parts.slice(idx + 1);

  // Depth from root:
  // []              → home        → prefix = ''
  // [l1]            → l1 index   → prefix = '../'
  // [l1, l2]        → l2 index   → prefix = '../../'
  // [l1, l2, pid]   → process    → prefix = '../../../'
  // [ea-diagrams]           → ea index  → prefix = '../'
  // [ea-diagrams, ea-xx]    → ea page   → prefix = '../../'

  var depth = parts.length;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';
  return prefix;
}

// ── ACTIVE PID DETECTION ──────────────────────────────────────────────────────
function getActivePid() {
  var path = window.location.pathname;
  // Match process PID like HK-GC-01
  var m = path.match(/([A-Z]{2,3}-[A-Z]{2,3}-\d{2})/i);
  if (m) return m[1].toUpperCase();
  // Match EA pid
  var ea = path.match(/(ea-\d{2})/i);
  if (ea) return ea[1].toUpperCase().replace('EA-0','EA-').replace('EA-','EA-');
  var ea2 = path.match(/ea-diagrams\/(ea-\d+)/i);
  if (ea2) {
    var n = ea2[1].replace('ea-','');
    return 'EA-' + (parseInt(n) < 10 ? '0' + parseInt(n) : n);
  }
  return '';
}

// ── SIDEBAR BUILDER ───────────────────────────────────────────────────────────
function buildSidebar() {
  var prefix = getPrefix();
  var activePid = getActivePid();
  var activeL1 = activePid ? activePid.split('-')[0] : '';
  var isEA = window.location.pathname.indexOf('ea-diagrams') >= 0;

  var html = '<a class="sidebar-brand" href="' + prefix + '">🏨 Hotel Process Wiki</a>';

  HW_DOMAINS.forEach(function(d) {
    var isOpen = (d.code === activeL1) || false;
    var oc = isOpen ? ' open' : '';
    var l2html = '';
    d.l2.forEach(function(l2) {
      l2html += '<a class="sidebar-l2-link" href="' + prefix + d.slug + '/' + l2.slug + '/">' +
                '<span class="spid">' + l2.code + '</span>' + escHtml(l2.name) + '</a>';
    });
    html += '<div class="sidebar-section">' +
            '<div class="sidebar-domain' + oc + '">' +
            '<span>' + d.icon + ' ' + escHtml(d.name) + '</span>' +
            '<span class="chev">▶</span></div>' +
            '<div class="sidebar-l2' + oc + '">' +
            '<a class="sidebar-l2-link hw-l1-link" href="' + prefix + d.slug + '/">' +
            d.icon + ' ' + escHtml(d.name) + '</a>' +
            l2html + '</div></div>';
  });

  // EA section
  var eaOpen = isEA ? ' open' : '';
  var eaLinks = '';
  HW_EA.forEach(function(ea) {
    var ac = (activePid === ea.id) ? ' active' : '';
    eaLinks += '<a class="sidebar-l3-link' + ac + '" href="' + prefix + 'ea-diagrams/' + ea.slug + '/">' +
               '<span class="spid">' + ea.id + '</span>' + escHtml(ea.title) + '</a>';
  });
  html += '<div class="sidebar-section">' +
          '<div class="sidebar-domain' + eaOpen + '">' +
          '<span>🗺️ EA Diagrams</span><span class="chev">▶</span></div>' +
          '<div class="sidebar-l2' + eaOpen + '">' +
          '<a class="sidebar-l2-link" href="' + prefix + 'ea-diagrams/">🗺️ All EA Diagrams</a>' +
          '<div class="sidebar-l3">' + eaLinks + '</div>' +
          '</div></div>';

  return html;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── SIDEBAR INJECTION ─────────────────────────────────────────────────────────
function injectSidebar() {
  // Don't double-inject
  if (document.getElementById('hw-sidebar')) return;

  // Create sidebar element
  var nav = document.createElement('nav');
  nav.id = 'hw-sidebar';
  nav.className = 'sidebar';
  nav.innerHTML = buildSidebar();
  document.body.insertBefore(nav, document.body.firstChild);

  // Create toggle button
  var btn = document.createElement('button');
  btn.id = 'stoggle';
  btn.className = 'stoggle';
  btn.title = 'Toggle sidebar';
  btn.textContent = '◀';
  document.body.insertBefore(btn, nav.nextSibling);

  // Wrap existing content in .mwrap if not already wrapped
  if (!document.querySelector('.mwrap')) {
    var mwrap = document.createElement('div');
    mwrap.className = 'mwrap';
    // Move all body children except sidebar and toggle into mwrap
    var children = Array.from(document.body.children).filter(function(el) {
      return el !== nav && el !== btn;
    });
    children.forEach(function(el) { mwrap.appendChild(el); });
    document.body.appendChild(mwrap);
  }

  // Accordion behaviour
  nav.querySelectorAll('.sidebar-domain').forEach(function(el) {
    el.addEventListener('click', function() {
      var l2 = el.nextElementSibling;
      var o = el.classList.toggle('open');
      if (l2) l2.classList.toggle('open', o);
    });
  });

  // Toggle collapse
  btn.addEventListener('click', function() {
    document.body.classList.toggle('sc');
    btn.textContent = document.body.classList.contains('sc') ? '▶' : '◀';
  });
}

// ── SIDEBAR CSS INJECTION ─────────────────────────────────────────────────────
function injectSidebarCSS() {
  if (document.getElementById('hw-sidebar-css')) return;
  var style = document.createElement('style');
  style.id = 'hw-sidebar-css';
  style.textContent = [
    '.sidebar{position:fixed;top:0;left:0;width:260px;height:100vh;overflow-y:auto;',
    'background:#1a3c5e;color:#cbd5e1;font-size:12px;z-index:200;',
    'padding-bottom:2rem;transition:transform .25s;}',
    '.sidebar-brand{display:flex;align-items:center;gap:.5rem;padding:1rem 1rem .75rem;',
    'font-weight:700;font-size:.95rem;color:#fff;',
    'border-bottom:1px solid rgba(255,255,255,.1);text-decoration:none;}',
    '.sidebar-section{border-bottom:1px solid rgba(255,255,255,.07);}',
    '.sidebar-domain{display:flex;justify-content:space-between;align-items:center;',
    'padding:.55rem 1rem;font-weight:600;font-size:.75rem;text-transform:uppercase;',
    'letter-spacing:.06em;color:#94a3b8;cursor:pointer;user-select:none;}',
    '.sidebar-domain:hover{color:#fff;}',
    '.sidebar-domain .chev{font-size:.65rem;transition:transform .2s;}',
    '.sidebar-domain.open .chev{transform:rotate(90deg);}',
    '.sidebar-l2{display:none;padding:0 0 .25rem;}',
    '.sidebar-l2.open{display:block;}',
    '.sidebar-l2-link{display:block;padding:.38rem 1rem .38rem 1.4rem;',
    'color:#e2e8f0;text-decoration:none;font-weight:600;font-size:.78rem;}',
    '.sidebar-l2-link:hover{color:#fff;background:rgba(255,255,255,.06);}',
    '.sidebar-l3{padding:0;}',
    '.sidebar-l3-link{display:flex;align-items:center;gap:.35rem;',
    'padding:.26rem 1rem .26rem 1.9rem;color:#94a3b8;text-decoration:none;font-size:.73rem;}',
    '.sidebar-l3-link:hover{color:#e2e8f0;background:rgba(255,255,255,.05);}',
    '.sidebar-l3-link.active{color:#fff;background:rgba(255,255,255,.1);font-weight:600;}',
    '.spid{font-size:.67rem;font-weight:700;color:#60a5fa;min-width:50px;flex-shrink:0;}',
    '.stoggle{position:fixed;top:.75rem;left:260px;background:#1a3c5e;color:#fff;border:none;',
    'width:22px;height:36px;border-radius:0 6px 6px 0;cursor:pointer;font-size:.7rem;',
    'z-index:201;transition:left .25s;}',
    'body.sc .sidebar{transform:translateX(-260px);}',
    'body.sc .stoggle{left:0;}',
    'body.sc .mwrap{margin-left:0!important;}',
    '.mwrap{margin-left:260px;transition:margin-left .25s;}',
    '@media(max-width:768px){',
    '.sidebar{transform:translateX(-260px);}',
    '.stoggle{left:0;}',
    '.mwrap{margin-left:0;}}',
  ].join('');
  document.head.appendChild(style);
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function initLightbox() {
  // Remove any existing lightbox overlay
  var existing = document.querySelector('.lightbox-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';

  // Pan/zoom container
  var zoomWrap = document.createElement('div');
  zoomWrap.className = 'lbx-zoom-wrap';
  zoomWrap.style.cssText = 'position:relative;overflow:hidden;width:96vw;height:92vh;' +
    'display:flex;align-items:center;justify-content:center;cursor:grab;';

  var img = document.createElement('img');
  img.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;' +
    'transform-origin:center center;transition:transform .1s;user-select:none;';

  zoomWrap.appendChild(img);
  overlay.appendChild(closeBtn);
  overlay.appendChild(zoomWrap);
  document.body.appendChild(overlay);

  // Pan/zoom state
  var scale = 1, panX = 0, panY = 0, dragging = false, startX, startY;

  function applyTransform() {
    img.style.transform = 'scale(' + scale + ') translate(' + panX/scale + 'px,' + panY/scale + 'px)';
  }

  zoomWrap.addEventListener('wheel', function(e) {
    e.preventDefault();
    var delta = e.deltaY > 0 ? 0.85 : 1.18;
    scale = Math.max(0.5, Math.min(8, scale * delta));
    applyTransform();
  }, {passive: false});

  zoomWrap.addEventListener('mousedown', function(e) {
    dragging = true; startX = e.clientX - panX; startY = e.clientY - panY;
    zoomWrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    panX = e.clientX - startX; panY = e.clientY - startY;
    applyTransform();
  });
  window.addEventListener('mouseup', function() {
    dragging = false; zoomWrap.style.cursor = 'grab';
  });

  // Double-click to reset
  zoomWrap.addEventListener('dblclick', function() {
    scale = 1; panX = 0; panY = 0; applyTransform();
  });

  function openLightbox(src) {
    img.src = src; scale = 1; panX = 0; panY = 0; applyTransform();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.onclick = closeLightbox;
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLightbox(); });

  // Attach to all diagram images (process + EA)
  document.querySelectorAll('.diagram-wrap img').forEach(function(el) {
    el.style.cssText += 'cursor:zoom-in;max-width:100%;max-height:600px;' +
      'width:auto;height:auto;object-fit:contain;';
    el.addEventListener('click', function() { openLightbox(el.src); });
  });

  // Lightbox CSS
  if (!document.getElementById('lbx-css')) {
    var s = document.createElement('style');
    s.id = 'lbx-css';
    s.textContent = '.lightbox-overlay{display:none;position:fixed;inset:0;' +
      'background:rgba(0,0,0,.92);z-index:2000;justify-content:center;align-items:center;}' +
      '.lightbox-overlay.active{display:flex;}' +
      '.lightbox-close{position:fixed;top:1rem;right:1.5rem;color:#fff;font-size:2.2rem;' +
      'cursor:pointer;z-index:2001;background:none;border:none;line-height:1;}' +
      '.lightbox-close:hover{color:#f87171;}';
    document.head.appendChild(s);
  }
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  injectSidebarCSS();
  injectSidebar();
  initLightbox();
});
