/* Hotel Process Wiki — wiki.js v4 (GitHub Pages path-aware sidebar) */

var HW_DOMAINS = [{code:"HK",icon:"🛏️",name:"Housekeeping and Rooms Management",slug:"housekeeping",l2:[{code:"HK-GC",name:"Guest Room Cleaning and Turndown",slug:"guest-room-cleaning"},{code:"HK-LP",name:"Laundry and Linen Operations",slug:"laundry-linen"},{code:"HK-PC",name:"Public Area and Cleaning Operations",slug:"public-area-cleaning"}]},
{code:"FO",icon:"🏨",name:"Front Office and Guest Services",slug:"front-office",l2:[{code:"FO-CI",name:"Check-In and Check-Out Operations",slug:"checkin-checkout"},{code:"FO-CS",name:"Concierge and Guest Services",slug:"concierge-services"},{code:"FO-NS",name:"Night Audit and Front Desk Operations",slug:"night-audit"},{code:"FO-SP",name:"Spa and Wellness Operations",slug:"spa-wellness"},{code:"FO-UP",name:"Upselling and Revenue Optimisation",slug:"upselling-revenue"}]},
{code:"FB",icon:"🍽️",name:"Food and Beverage Operations",slug:"food-beverage",l2:[{code:"FB-RO",name:"Restaurant and Bar Operations",slug:"restaurant-bar"},{code:"FB-BQ",name:"Banqueting and Events Catering",slug:"banqueting-events"},{code:"FB-KT",name:"Kitchen and Culinary Operations",slug:"kitchen-culinary"}]},
{code:"RM",icon:"📈",name:"Revenue Management and Distribution",slug:"revenue-management",l2:[{code:"RM-YM",name:"Yield and Rate Management",slug:"yield-rate"},{code:"RM-CH",name:"Channel and Distribution Management",slug:"channel-distribution"},{code:"RM-RV",name:"Reservations Operations",slug:"reservations"}]},
{code:"SM",icon:"🎯",name:"Sales, Marketing and Loyalty",slug:"sales-marketing",l2:[{code:"SM-SL",name:"Sales and Account Management",slug:"sales-accounts"},{code:"SM-MK",name:"Marketing and Digital",slug:"marketing-digital"},{code:"SM-LY",name:"Loyalty and Guest Relationship",slug:"loyalty-guest"},{code:"SM-FR",name:"Franchise and Brand Management",slug:"franchise-brand"}]},
{code:"HR",icon:"👥",name:"Human Resources and Training",slug:"human-resources",l2:[{code:"HR-TL",name:"Talent and Workforce Management",slug:"talent-workforce"},{code:"HR-LR",name:"Learning and Development",slug:"learning-development"},{code:"HR-EW",name:"Employee Wellbeing and Engagement",slug:"employee-wellbeing"}]},
{code:"FM",icon:"🔧",name:"Facilities and Engineering",slug:"facilities",l2:[{code:"FM-PM",name:"Preventive Maintenance",slug:"preventive-maintenance"},{code:"FM-EM",name:"Energy and Environment Management",slug:"energy-environment"},{code:"FM-RM",name:"Reactive Maintenance and Work Orders",slug:"reactive-maintenance"}]},
{code:"FN",icon:"💰",name:"Finance and Procurement",slug:"finance",l2:[{code:"FN-AC",name:"Accounting and Financial Control",slug:"accounting-finance"},{code:"FN-PR",name:"Procurement and Supply Chain",slug:"procurement-supply"}]},
{code:"IT",icon:"💻",name:"Technology and Systems",slug:"technology",l2:[{code:"IT-OP",name:"IT Operations and Infrastructure",slug:"it-operations"},{code:"IT-DG",name:"Digital Guest Experience",slug:"digital-guest"}]},
{code:"SC",icon:"🔒",name:"Safety, Security and Compliance",slug:"security-compliance",l2:[{code:"SC-SE",name:"Security Operations",slug:"security-operations"},{code:"SC-CL",name:"Compliance and Risk Management",slug:"compliance-risk"}]}];
var HW_EA = [{id:"EA-01",slug:"ea-01",title:"Hotel System Landscape"},{id:"EA-02",slug:"ea-02",title:"Guest Journey Data Flow"},{id:"EA-03",slug:"ea-03",title:"Revenue and Distribution Architecture"},{id:"EA-04",slug:"ea-04",title:"FandB Operations Integration"},{id:"EA-05",slug:"ea-05",title:"Property Operations Ecosystem"},{id:"EA-06",slug:"ea-06",title:"Loyalty and CRM Architecture"},{id:"EA-07",slug:"ea-07",title:"HR and Workforce Technology Stack"},{id:"EA-08",slug:"ea-08",title:"Finance and Procurement Technology Stack"},{id:"EA-09",slug:"ea-09",title:"IT and Digital Guest Experience Architecture"},{id:"EA-10",slug:"ea-10",title:"Sales, MICE and Franchise Ecosystem"}];
var HW_REPO_BASE = 'Hotel-Process-Wiki';

// ── PATH ANALYSIS ─────────────────────────────────────────────────────────────
// URL on GitHub Pages: /Hotel-Process-Wiki/l1/l2/pid/
// Strip the repo base segment, then count remaining depth.
function getPathInfo() {
  var raw = window.location.pathname;
  // Split and filter empty segments
  var parts = raw.split('/').filter(function(p){ return p.length > 0; });
  // Remove the repo base segment if present
  var idx = parts.indexOf(HW_REPO_BASE);
  if (idx >= 0) parts = parts.slice(idx + 1);

  // parts is now the path relative to the wiki root
  // []                    → home         depth 0
  // [l1]                  → l1 index     depth 1
  // [l1, l2]              → l2 index     depth 2
  // [l1, l2, pid]         → process page depth 3
  // [ea-diagrams]         → ea index     depth 1
  // [ea-diagrams, ea-xx]  → ea page      depth 2
  var depth = parts.length;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';

  var activePid = '';
  // Detect process PID (e.g. hk-gc-01 → HK-GC-01)
  if (depth === 3) {
    activePid = parts[2].toUpperCase();
  }
  // Detect EA page (ea-diagrams/ea-01)
  if (depth === 2 && parts[0] === 'ea-diagrams') {
    var n = parts[1].replace('ea-','');
    var num = parseInt(n, 10);
    activePid = 'EA-' + (num < 10 ? '0' + num : '' + num);
  }
  var isEA = parts.length > 0 && parts[0] === 'ea-diagrams';
  var activeL1 = activePid && activePid.indexOf('-') > 0 ? activePid.split('-')[0] : '';

  return {depth: depth, prefix: prefix, activePid: activePid,
          activeL1: activeL1, isEA: isEA, parts: parts};
}

// ── SIDEBAR HTML ──────────────────────────────────────────────────────────────
function buildSidebarHTML(info) {
  var p = info.prefix;
  var html = '<a class="sidebar-brand" href="' + p + '">🏨 Hotel Process Wiki</a>';

  HW_DOMAINS.forEach(function(d) {
    var isOpen = (d.code === info.activeL1);
    var oc = isOpen ? ' open' : '';
    var l2html = '<a class="sidebar-l2-link" href="' + p + d.slug + '/">' +
                 d.icon + ' ' + d.name + '</a>';
    d.l2.forEach(function(l2) {
      l2html += '<a class="sidebar-l3-link" href="' + p + d.slug + '/' + l2.slug + '/">' +
                '<span class="spid">' + l2.code + '</span>' + l2.name + '</a>';
    });
    html += '<div class="sidebar-section">' +
            '<div class="sidebar-domain' + oc + '">' +
            '<span>' + d.icon + ' ' + d.name + '</span>' +
            '<span class="chev">&#9658;</span></div>' +
            '<div class="sidebar-l2' + oc + '">' + l2html + '</div></div>';
  });

  // EA section
  var eaOc = info.isEA ? ' open' : '';
  var eaLinks = '<a class="sidebar-l2-link" href="' + p + 'ea-diagrams/">&#128506; All EA Diagrams</a>' +
                '<div class="sidebar-l3">';
  HW_EA.forEach(function(ea) {
    var ac = (info.activePid === ea.id) ? ' active' : '';
    eaLinks += '<a class="sidebar-l3-link' + ac + '" href="' + p + 'ea-diagrams/' + ea.slug + '/">' +
               '<span class="spid">' + ea.id + '</span>' + ea.title + '</a>';
  });
  eaLinks += '</div>';
  html += '<div class="sidebar-section">' +
          '<div class="sidebar-domain' + eaOc + '">' +
          '<span>&#128506; EA Diagrams</span><span class="chev">&#9658;</span></div>' +
          '<div class="sidebar-l2' + eaOc + '">' + eaLinks + '</div></div>';
  return html;
}

// ── SIDEBAR CSS ───────────────────────────────────────────────────────────────
var SIDEBAR_CSS = [
'.sidebar{position:fixed;top:0;left:0;width:260px;height:100vh;overflow-y:auto;',
'background:#1a3c5e;color:#cbd5e1;font-size:12px;z-index:200;',
'padding-bottom:2rem;transition:transform .25s;}',
'.sidebar-brand{display:flex;align-items:center;gap:.5rem;padding:1rem 1rem .75rem;',
'font-weight:700;font-size:.95rem;color:#fff;',
'border-bottom:1px solid rgba(255,255,255,.1);text-decoration:none;}',
'.sidebar-section{border-bottom:1px solid rgba(255,255,255,.07);}',
'.sidebar-domain{display:flex;justify-content:space-between;align-items:center;',
'padding:.52rem 1rem;font-weight:600;font-size:.74rem;text-transform:uppercase;',
'letter-spacing:.06em;color:#94a3b8;cursor:pointer;user-select:none;}',
'.sidebar-domain:hover{color:#fff;}',
'.chev{font-size:.65rem;transition:transform .2s;display:inline-block;}',
'.sidebar-domain.open .chev{transform:rotate(90deg);}',
'.sidebar-l2{display:none;padding:0 0 .2rem;}',
'.sidebar-l2.open{display:block;}',
'.sidebar-l2-link{display:block;padding:.36rem 1rem .36rem 1.3rem;',
'color:#e2e8f0;text-decoration:none;font-weight:600;font-size:.78rem;}',
'.sidebar-l2-link:hover{color:#fff;background:rgba(255,255,255,.06);}',
'.sidebar-l3{padding:0;}',
'.sidebar-l3-link{display:flex;align-items:center;gap:.3rem;',
'padding:.24rem 1rem .24rem 1.8rem;color:#94a3b8;text-decoration:none;font-size:.72rem;}',
'.sidebar-l3-link:hover{color:#e2e8f0;background:rgba(255,255,255,.05);}',
'.sidebar-l3-link.active{color:#fff;background:rgba(255,255,255,.1);font-weight:600;}',
'.spid{font-size:.66rem;font-weight:700;color:#60a5fa;min-width:50px;flex-shrink:0;}',
'.stoggle{position:fixed;top:.75rem;left:260px;background:#1a3c5e;color:#fff;border:none;',
'width:22px;height:36px;border-radius:0 6px 6px 0;cursor:pointer;font-size:.7rem;',
'z-index:201;transition:left .25s;}',
'body.sc .sidebar{transform:translateX(-260px);}',
'body.sc .stoggle{left:0;}',
'body.sc .mwrap{margin-left:0!important;}',
'.mwrap{margin-left:260px;transition:margin-left .25s;}',
'@media(max-width:900px){.sidebar{transform:translateX(-260px);}.stoggle{left:0;}.mwrap{margin-left:0;}}'
].join('');

// ── INJECT SIDEBAR ────────────────────────────────────────────────────────────
function injectSidebar() {
  if (document.getElementById('hw-sidebar')) return;

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = SIDEBAR_CSS;
  document.head.appendChild(style);

  var info = getPathInfo();

  // Build sidebar nav element
  var nav = document.createElement('nav');
  nav.id = 'hw-sidebar';
  nav.className = 'sidebar';
  nav.innerHTML = buildSidebarHTML(info);
  document.body.insertBefore(nav, document.body.firstChild);

  // Build toggle button
  var btn = document.createElement('button');
  btn.className = 'stoggle';
  btn.title = 'Toggle sidebar';
  btn.textContent = '\u25C4'; // ◄
  document.body.insertBefore(btn, nav.nextSibling);

  // Wrap remaining content in .mwrap
  var mwrap = document.createElement('div');
  mwrap.className = 'mwrap';
  var toMove = Array.from(document.body.children).filter(function(el){
    return el !== nav && el !== btn;
  });
  toMove.forEach(function(el){ mwrap.appendChild(el); });
  document.body.appendChild(mwrap);

  // Accordion
  nav.querySelectorAll('.sidebar-domain').forEach(function(el){
    el.addEventListener('click', function(){
      var l2 = el.nextElementSibling;
      var o = el.classList.toggle('open');
      if (l2) l2.classList.toggle('open', o);
    });
  });

  // Collapse toggle
  btn.addEventListener('click', function(){
    document.body.classList.toggle('sc');
    btn.textContent = document.body.classList.contains('sc') ? '\u25BA' : '\u25C4';
  });
}

// ── LIGHTBOX WITH PAN/ZOOM ────────────────────────────────────────────────────
function initLightbox() {
  var existing = document.querySelector('.lightbox-overlay');
  if (existing) existing.remove();

  // Lightbox CSS
  if (!document.getElementById('lbx-css')) {
    var s = document.createElement('style');
    s.id = 'lbx-css';
    s.textContent = [
      '.lightbox-overlay{display:none;position:fixed;inset:0;',
      'background:rgba(0,0,0,.92);z-index:2000;',
      'justify-content:center;align-items:center;}',
      '.lightbox-overlay.active{display:flex;}',
      '.lbx-close{position:fixed;top:1rem;right:1.5rem;color:#fff;font-size:2.2rem;',
      'cursor:pointer;z-index:2001;background:none;border:none;line-height:1;}',
      '.lbx-close:hover{color:#f87171;}',
      '.lbx-hint{position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);',
      'color:rgba(255,255,255,.5);font-size:.75rem;pointer-events:none;}',
    ].join('');
    document.head.appendChild(s);
  }

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  var closeBtn = document.createElement('button');
  closeBtn.className = 'lbx-close';
  closeBtn.innerHTML = '&times;';

  var hint = document.createElement('div');
  hint.className = 'lbx-hint';
  hint.textContent = 'Scroll to zoom \u00b7 Drag to pan \u00b7 Double-click to reset \u00b7 ESC to close';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'overflow:hidden;width:96vw;height:92vh;display:flex;' +
    'align-items:center;justify-content:center;cursor:grab;position:relative;';

  var img = document.createElement('img');
  img.style.cssText = 'max-width:none;max-height:none;transform-origin:center center;' +
    'user-select:none;pointer-events:none;transition:none;';

  wrap.appendChild(img);
  overlay.appendChild(closeBtn);
  overlay.appendChild(wrap);
  overlay.appendChild(hint);
  document.body.appendChild(overlay);

  var scale = 1, panX = 0, panY = 0, dragging = false, startX = 0, startY = 0;

  function applyT() {
    img.style.transform = 'scale('+scale+') translate('+(panX/scale)+'px,'+(panY/scale)+'px)';
  }

  wrap.addEventListener('wheel', function(e){
    e.preventDefault();
    var factor = e.deltaY < 0 ? 1.15 : 0.87;
    scale = Math.max(0.3, Math.min(10, scale * factor));
    applyT();
  }, {passive: false});

  wrap.addEventListener('mousedown', function(e){
    dragging = true; startX = e.clientX - panX; startY = e.clientY - panY;
    wrap.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e){
    if (!dragging) return;
    panX = e.clientX - startX; panY = e.clientY - startY; applyT();
  });
  document.addEventListener('mouseup', function(){
    dragging = false; wrap.style.cursor = 'grab';
  });
  wrap.addEventListener('dblclick', function(){
    scale = 1; panX = 0; panY = 0; applyT();
  });

  // Touch support
  var lastTouchDist = 0;
  wrap.addEventListener('touchstart', function(e){
    if (e.touches.length === 2) {
      lastTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
    } else if (e.touches.length === 1) {
      dragging = true;
      startX = e.touches[0].clientX - panX;
      startY = e.touches[0].clientY - panY;
    }
  }, {passive: true});
  wrap.addEventListener('touchmove', function(e){
    if (e.touches.length === 2) {
      var dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
      scale = Math.max(0.3, Math.min(10, scale * (dist / lastTouchDist)));
      lastTouchDist = dist; applyT();
    } else if (dragging && e.touches.length === 1) {
      panX = e.touches[0].clientX - startX;
      panY = e.touches[0].clientY - startY; applyT();
    }
  }, {passive: true});
  wrap.addEventListener('touchend', function(){ dragging = false; });

  function openLb(src) {
    // Set natural size first, then constrain via scale
    img.onload = function() {
      // Fit image to viewport on open
      var sw = wrap.clientWidth, sh = wrap.clientHeight;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      scale = Math.min(sw / iw, sh / ih, 1);
      panX = 0; panY = 0;
      img.style.width = iw + 'px';
      img.style.height = ih + 'px';
      applyT();
    };
    img.src = src;
    scale = 1; panX = 0; panY = 0;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.onclick = closeLb;
  overlay.addEventListener('click', function(e){ if (e.target === overlay) closeLb(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLb(); });

  // Attach to all diagram images
  document.querySelectorAll('.diagram-wrap img').forEach(function(el){
    el.style.cssText += ';cursor:zoom-in;max-width:100%;max-height:580px;' +
      'width:auto;height:auto;object-fit:contain;';
    el.addEventListener('click', function(){ openLb(el.src); });
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
  injectSidebar();
  initLightbox();

  /* ── SEARCH — redirect to search.html on Enter ── */
  const searchBox = document.getElementById('searchBox');
  if (searchBox) {
    function getSearchUrl(q) {
      const logo = document.querySelector('a.topbar-logo, a[class*="logo"]');
      const base = logo ? logo.getAttribute('href') : '/';
      const root = base.endsWith('/') ? base : base + '/';
      return root + 'search.html?q=' + encodeURIComponent(q.trim());
    }
    searchBox.addEventListener('keydown', e => {
      if (e.key === 'Enter' && searchBox.value.trim()) {
        window.location.href = getSearchUrl(searchBox.value);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchBox) {
        e.preventDefault(); searchBox.focus(); searchBox.select();
      }
      if (e.key === 'Escape' && document.activeElement === searchBox) {
        searchBox.value = ''; searchBox.blur();
      }
    });
  }

});
