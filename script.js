document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileNav();
  initNavScroll();
  initPartnershipBadge();
  initReveal();
  renderSponsors();
  renderTierPrices();
  renderStats();
  renderLinks();
});

function initCountdown() {
  var el = document.getElementById('countdown');
  if (!el) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  el.innerHTML =
    group('days', 'Days') + sep() +
    group('hours', 'Hours') + sep() +
    group('mins', 'Mins');

  function group(id, label) {
    return '<div class="flip-group"><div class="flip-digits">' +
      card('fc-' + id + '0') + card('fc-' + id + '1') +
      '</div><div class="flip-label">' + label + '</div></div>';
  }
  function card(id) {
    return '<div class="flip-card" id="' + id + '"><span>0</span></div>';
  }
  function sep() { return '<div class="flip-sep">:</div>'; }

  function setDigit(id, val) {
    var cardEl = document.getElementById(id);
    if (!cardEl) return;
    var span = cardEl.querySelector('span');
    if (span.textContent === val) return;

    cardEl.classList.add('flipping');
    setTimeout(function() {
      span.textContent = val;
      cardEl.classList.remove('flipping');
    }, 300);
  }

  function update() {
    var now = new Date();
    var start = CONFIG.event.startDate;
    var end = CONFIG.event.endDate;

    if (now >= start && now <= end) {
      el.innerHTML = '<div class="countdown-message">EVENT LIVE</div>';
      return;
    }
    if (now > end) {
      el.innerHTML = '<div class="countdown-message">EVENT COMPLETE</div>';
      return;
    }

    var diff = start - now;
    var d = pad(Math.floor(diff / 86400000));
    var h = pad(Math.floor((diff % 86400000) / 3600000));
    var m = pad(Math.floor((diff % 3600000) / 60000));

    setDigit('fc-days0', d[0]);
    setDigit('fc-days1', d[1]);
    setDigit('fc-hours0', h[0]);
    setDigit('fc-hours1', h[1]);
    setDigit('fc-mins0', m[0]);
    setDigit('fc-mins1', m[1]);
  }

  update();
  setInterval(update, 1000);
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initNavScroll() {
  const nav = document.querySelector('.navbar-transparent');
  if (!nav) return;

  function check() {
    nav.classList.toggle('navbar-scrolled', window.scrollY > 80);
  }
  check();
  window.addEventListener('scroll', check, { passive: true });
}

function initPartnershipBadge() {
  if (CONFIG.showPartnershipBadge) return;
  document.querySelectorAll('.partnership-badge').forEach(el => {
    el.style.display = 'none';
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderSponsors() {
  document.querySelectorAll('.sponsor-grid').forEach(grid => {
    grid.innerHTML = CONFIG.sponsors.map(s =>
      '<a href="' + s.url + '" class="sponsor-card" target="_blank" rel="noopener">' +
        '<img src="' + s.logo + '" alt="' + s.name + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="sponsor-fallback">' + s.name + '</span>' +
      '</a>'
    ).join('');
  });
}

function renderTierPrices() {
  document.querySelectorAll('[data-tier-price]').forEach(el => {
    const key = el.getAttribute('data-tier-price');
    if (CONFIG.tiers[key]) {
      el.textContent = '$' + CONFIG.tiers[key].price.toLocaleString();
    }
  });
}

function renderStats() {
  document.querySelectorAll('[data-stat]').forEach(el => {
    const key = el.getAttribute('data-stat');
    if (CONFIG.stats[key]) el.textContent = CONFIG.stats[key];
  });
}

function renderLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.getAttribute('data-link');
    if (CONFIG.links[key]) el.setAttribute('href', CONFIG.links[key]);
  });
}
