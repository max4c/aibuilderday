// Shared data + render logic for /tv/friday and /tv/saturday slides.
// Each page calls TVShell.init({ day: 'friday' | 'saturday' }).
// Agenda + bounty data are inlined here so the pages work over file:// too.

const AGENDA = {
  friday: [
    { time: '9:00',  ampm: 'AM', title: 'Welcome & Kickoff',                                  speaker: 'Tyler Jennings' },
    { time: '9:30',  ampm: 'AM', title: 'Tyler Folkman',                                      speaker: 'JobNimbus' },
    { time: '9:45',  ampm: 'AM', title: 'Brandon Doyle',                                      speaker: 'David AI' },
    { time: '10:00', ampm: 'AM', title: 'Brant Choate',                                       speaker: 'Remi' },
    { time: '10:30', ampm: 'AM', title: 'What Should AI Look Like for Our Kids?',             speaker: 'Max Forsey · Daso' },
    { time: '10:45', ampm: 'AM', title: 'John Koelliker',                                     speaker: 'Leland' },
    { time: '11:00', ampm: 'AM', title: 'Curating taste & avoiding AI slop in design',        speaker: 'Cambree Bernkopf · Bernie Studios' },
    { time: '11:15', ampm: 'AM', title: 'Your AI Is an Intern. Manage It Like One.',          speaker: 'Dan Ebeling · Redo' },
    { time: '11:30', ampm: 'AM', title: 'Building an autonomous business',                    speaker: 'Jacob Wright · MadeThis' },
    { time: '11:45', ampm: 'AM', title: 'Bryan Wise',                                         speaker: 'Salesforce' },
    { time: '12:30', ampm: 'PM', title: 'Tyler Hogge',                                        speaker: '' },
    { time: '12:50', ampm: 'PM', title: 'Angela Smith',                                       speaker: 'The Nucleus Institute' },
    { time: '1:05',  ampm: 'PM', title: 'Bounty Presentations',                               speaker: 'Sponsors pitch their tracks' },
    { time: '1:30',  ampm: 'PM', title: 'Hackathon Begins',                                   speaker: '', pivot: true },
    { time: '1:30',  ampm: 'PM', title: 'Workshop · Vibe Coding 101',                         speaker: 'Jacob Wright · MadeThis' },
    { time: '2:00',  ampm: 'PM', title: 'Workshop · How to Code Like a One-Man Army',         speaker: 'Max Forsey · Daso' },
    { time: '2:30',  ampm: 'PM', title: 'Workshop · Agent Resource Management',               speaker: 'Jacob Petterle · School AI' },
    { time: '3:00',  ampm: 'PM', title: 'Workshop · Build Your Company’s AI Brain',           speaker: 'Isaac Tai' },
    { time: '4:00',  ampm: 'PM', title: 'Workshop · Harness Engineering',                     speaker: 'Jacob Wright · MadeThis' },
  ],
  saturday: [
    { time: '8:00',  ampm: 'AM', title: 'Building Opens · Breakfast', speaker: '' },
    { time: '9:00',  ampm: 'AM', title: 'Open Support Session',       speaker: 'JustBuild Mentors · drop in for help' },
    { time: '11:00', ampm: 'AM', title: 'Workshop · Architected Intelligence', speaker: 'Jeremy Mumford' },
    { time: '12:00', ampm: 'PM', title: 'Lunch · BBQ',                speaker: '' },
    { time: '1:00',  ampm: 'PM', title: 'Workshop · Agent Orchestration at Scale', speaker: 'Brad Heitmann' },
    { time: '2:00',  ampm: 'PM', title: 'Code Freeze · Judging Begins', speaker: 'Demo to judges and sponsors', pivot: true },
    { time: '3:30',  ampm: 'PM', title: 'Judges Deliberate',          speaker: '' },
    { time: '4:00',  ampm: 'PM', title: 'Awards Ceremony',            speaker: 'Winners announced. Prizes handed out.', pivot: true },
  ],
};

const BOUNTIES = [
  { prize: '$10,000', sponsor: 'JobNimbus · Presenting Sponsor', title: 'AI estimates for contractors, in under 24 hours.' },
  { prize: '$10,000', sponsor: 'GOED · two prizes of $5,000',    title: 'Make Utah’s startup ecosystem visible.' },
  { prize: '$5,000',  sponsor: 'The Nucleus Institute',          title: 'Utah Innovation Connections Hub' },
  { prize: '$5,000',  sponsor: 'MadeThis',                       title: 'Start a business. Validate. Earn revenue.' },
  { prize: '$5,000',  sponsor: 'Leland · Surge · Cheers',        title: 'Give yourself a promotion.' },
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
  });
}

function renderAgenda(elId, items, dense) {
  var el = document.getElementById(elId);
  if (!el) return;
  el.classList.toggle('cols-2', !!dense);
  if (dense) {
    el.style.gridTemplateRows = 'repeat(' + Math.ceil(items.length / 2) + ', auto)';
  } else {
    el.style.gridTemplateRows = '';
  }
  el.innerHTML = items.map(function(i) {
    return '<li class="tv-agenda-row' + (i.pivot ? ' is-pivot' : '') + '">' +
      '<div class="tv-agenda-time">' + escapeHtml(i.time) +
        (i.ampm ? ' <small>' + escapeHtml(i.ampm) + '</small>' : '') +
      '</div>' +
      '<div class="tv-agenda-body">' +
        '<div class="tv-agenda-title">' + escapeHtml(i.title) + '</div>' +
        (i.speaker ? '<div class="tv-agenda-speaker">' + escapeHtml(i.speaker) + '</div>' : '') +
      '</div>' +
    '</li>';
  }).join('');
}

function renderBounties() {
  var el = document.getElementById('tv-bounty-list');
  if (!el) return;
  el.innerHTML = BOUNTIES.map(function(b) {
    return '<li class="tv-bounty-row">' +
      '<div class="tv-bounty-prize">' + escapeHtml(b.prize) + '</div>' +
      '<div class="tv-bounty-meta">' +
        '<div class="tv-bounty-sponsor">' + escapeHtml(b.sponsor) + '</div>' +
        '<div class="tv-bounty-title">' + escapeHtml(b.title) + '</div>' +
      '</div>' +
    '</li>';
  }).join('');
}

// Pulls every logo from the same tiers as renderSponsorThanks() in /script.js,
// dedupes, then balances into two evenly-spaced rows (no category labels).
function renderSponsorStrip() {
  var strip = document.getElementById('tv-sponsor-strip');
  if (!strip || typeof CONFIG === 'undefined') return;
  var seen = new Set();
  var all = [];
  function add(arr) {
    (arr || []).forEach(function(s) {
      if (s && s.name && s.logo && !seen.has(s.name)) {
        seen.add(s.name);
        all.push(s);
      }
    });
  }
  if (CONFIG.presentingSponsor) add([CONFIG.presentingSponsor]);
  add(CONFIG.bountyPartners);
  add(CONFIG.eventSponsors);
  add(CONFIG.creditSponsors);
  add(CONFIG.partners);

  var half = Math.ceil(all.length / 2);
  function row(arr) {
    return '<div class="tv-sponsor-row">' +
      arr.map(function(s) {
        return '<span class="tv-logo-slot"><img src="' + s.logo.replace(/^assets\//, '../assets/') + '" alt="' + escapeHtml(s.name) + '"></span>';
      }).join('') +
    '</div>';
  }
  strip.innerHTML = row(all.slice(0, half)) + row(all.slice(half));
}

window.TVShell = {
  init: function(opts) {
    var day = opts && opts.day === 'saturday' ? 'saturday' : 'friday';
    var listId = 'tv-' + day + '-list';
    renderAgenda(listId, AGENDA[day], day === 'friday');
    renderBounties();
    renderSponsorStrip();

    var goFs = function() {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function(){});
      }
    };
    window.addEventListener('click', goFs, { once: true });
    window.addEventListener('keydown', goFs, { once: true });
  }
};
