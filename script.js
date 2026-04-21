document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileNav();
  initNavScroll();
  initPartnershipBadge();
  initReveal();
  initCopyEmail();
  renderSponsors();
  renderPartners();
  renderJudgeFirms();
  renderPresentingSponsor();
  renderBountyPartners();
  renderEventSponsors();
  renderSpeakers();
  renderTierPrices();
  renderStats();
  renderLinks();
});

function initCountdown() {
  var el = document.getElementById('countdown');
  if (!el) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  el.innerHTML =
    group('days') + sep() +
    group('hours') + sep() +
    group('mins') + sep() +
    group('secs');

  function group(id) {
    return '<div class="flip-group"><div class="flip-digits">' +
      card('fc-' + id + '0') + card('fc-' + id + '1') +
      '</div></div>';
  }
  function card(id) {
    return '<div class="flip-card" id="' + id + '">' +
      '<div class="flip-half flip-top"><span>0</span></div>' +
      '<div class="flip-half flip-bottom"><span>0</span></div>' +
      '<div class="flip-half flip-top flip-flipper flip-flipper-top"><span>0</span></div>' +
      '<div class="flip-half flip-bottom flip-flipper flip-flipper-bottom"><span>0</span></div>' +
    '</div>';
  }
  function sep() { return '<div class="flip-sep">:</div>'; }

  function setDigit(id, val) {
    var cardEl = document.getElementById(id);
    if (!cardEl) return;
    var halves = cardEl.children;
    var topStatic = halves[0].firstChild;
    var bottomStatic = halves[1].firstChild;
    var topFlip = halves[2].firstChild;
    var bottomFlip = halves[3].firstChild;
    if (topStatic.textContent === val) return;
    if (cardEl.classList.contains('flipping')) return;

    var oldVal = topStatic.textContent;
    topFlip.textContent = oldVal;
    bottomFlip.textContent = val;
    topStatic.textContent = val;
    cardEl.classList.add('flipping');
    setTimeout(function() {
      bottomStatic.textContent = val;
      topFlip.textContent = val;
      cardEl.classList.remove('flipping');
    }, 600);
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
    var s = pad(Math.floor((diff % 60000) / 1000));

    setDigit('fc-days0', d[0]);
    setDigit('fc-days1', d[1]);
    setDigit('fc-hours0', h[0]);
    setDigit('fc-hours1', h[1]);
    setDigit('fc-mins0', m[0]);
    setDigit('fc-mins1', m[1]);
    setDigit('fc-secs0', s[0]);
    setDigit('fc-secs1', s[1]);
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

  menu.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (el.hasAttribute('data-copy-keep-menu')) return;
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }
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

function initCopyEmail() {
  document.querySelectorAll('[data-copy-email]').forEach(el => {
    el.addEventListener('click', async () => {
      const email = el.getAttribute('data-copy-email');
      const target = el.querySelector('.nav-contact-copy') || el;
      const original = target.textContent;
      let copied = false;
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch {}
      target.textContent = copied
        ? (target === el ? email + ' — Copied!' : 'Copied!')
        : (target === el ? email : 'Press Cmd+C');
      el.classList.add('copied');
      setTimeout(() => {
        target.textContent = original;
        el.classList.remove('copied');
      }, 1800);
    });
  });
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

function renderPartners() {
  document.querySelectorAll('.partner-grid').forEach(grid => {
    grid.innerHTML = CONFIG.partners.map(p =>
      '<a href="' + p.url + '" class="partner-card" target="_blank" rel="noopener">' +
        '<img src="' + p.logo + '" alt="' + p.name + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="partner-fallback">' + p.name + '</span>' +
      '</a>'
    ).join('');
  });
}

function renderJudgeFirms() {
  document.querySelectorAll('.judge-firm-grid').forEach(grid => {
    grid.innerHTML = CONFIG.judgeFirms.map(j =>
      '<a href="' + j.url + '" class="partner-card" target="_blank" rel="noopener">' +
        '<img src="' + j.logo + '" alt="' + j.name + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="partner-fallback">' + j.name + '</span>' +
      '</a>'
    ).join('');
  });
}

function renderBountyPartners() {
  document.querySelectorAll('.bounty-partner-grid').forEach(function(grid) {
    if (!CONFIG.bountyPartners || CONFIG.bountyPartners.length === 0) {
      grid.style.display = 'none';
      return;
    }
    grid.innerHTML = CONFIG.bountyPartners.map(function(p) {
      return '<a href="' + p.url + '" class="partner-card" target="_blank" rel="noopener">' +
        '<img src="' + p.logo + '" alt="' + p.name + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="partner-fallback">' + p.name + '</span>' +
      '</a>';
    }).join('');
  });
}

function renderPresentingSponsor() {
  var s = CONFIG.presentingSponsor;
  document.querySelectorAll('.presenting-sponsor').forEach(function(el) {
    if (!s) { el.style.display = 'none'; return; }
    el.innerHTML =
      '<a href="' + s.url + '" class="partner-card presenting-card" target="_blank" rel="noopener">' +
        '<img src="' + s.logo + '" alt="' + s.name + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="partner-fallback">' + s.name + '</span>' +
      '</a>' +
      (s.venue ? '<p class="presenting-venue">Hosting at ' + s.venue + '</p>' : '');
  });
}

function renderEventSponsors() {
  document.querySelectorAll('.event-sponsor-grid').forEach(grid => {
    if (!CONFIG.eventSponsors || CONFIG.eventSponsors.length === 0) {
      grid.classList.add('empty');
      grid.innerHTML = '<p class="roster-pending">Announcing as they commit.</p>';
      return;
    }
    grid.classList.remove('empty');
    grid.innerHTML = CONFIG.eventSponsors.map(s =>
      '<a href="' + s.url + '" class="partner-card" target="_blank" rel="noopener">' +
        '<img src="' + s.logo + '" alt="' + s.name + '" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<span class="partner-fallback">' + s.name + '</span>' +
      '</a>'
    ).join('');
  });
}

function renderSpeakers() {
  document.querySelectorAll('.speakers-grid').forEach(grid => {
    if (!CONFIG.speakers || CONFIG.speakers.length === 0) {
      grid.classList.add('empty');
      grid.innerHTML = '<p class="roster-pending">Speakers confirmed on a rolling basis.</p>';
      return;
    }
    grid.classList.remove('empty');
    grid.innerHTML = CONFIG.speakers.map(s => {
      const photo = s.photo
        ? '<img src="' + s.photo + '" alt="' + s.name + '">'
        : '<div class="speaker-photo-placeholder">' + s.name.split(' ').map(n => n[0]).join('') + '</div>';
      return '<div class="speaker-card">' +
        '<div class="speaker-photo">' + photo + '</div>' +
        '<div class="speaker-name">' + s.name + '</div>' +
        '<div class="speaker-title">' + (s.title || '') + '</div>' +
      '</div>';
    }).join('');
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
