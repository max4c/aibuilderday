const CONFIG = {
  event: {
    name: 'AI Builder Day',
    dates: 'May 8\u20139, 2026',
    location: 'Lehi, UT',
    startDate: new Date('2026-05-08T09:00:00-06:00'),
    endDate: new Date('2026-05-09T23:59:59-06:00'),
  },

  showPartnershipBadge: true,

  bountyPartners: [
    { name: 'Go Utah', logo: 'assets/partners/goeo.png', url: 'https://business.utah.gov/' },
    { name: 'The Nucleus Institute', logo: 'assets/partners/nucleus.png', url: 'https://www.thenucleus.institute/' },
    { name: 'MadeThis', logo: 'assets/sponsors/madethis.svg', url: 'https://madethis.com/' },
  ],

  // Five bounty tracks. Each track has its own ruleset; fill in `rules` (array of strings)
  // as sponsors confirm. Until rules are confirmed, the track card shows a "pitched at
  // 1:05 PM Friday" placeholder. Multiple `logos` collapses into a combined badge row.
  bountyTracks: [
    {
      name: 'JobNimbus',
      logos: [{ src: 'assets/sponsors/jobnimbus.png', alt: 'JobNimbus' }],
      url: 'bounty-jobnimbus.html',
      tagline: 'AI estimates for contractors, in under 24 hours. $10,000.',
      rules: null,
    },
    {
      name: 'The Nucleus Institute',
      logos: [{ src: 'assets/partners/nucleus.png', alt: 'The Nucleus Institute' }],
      url: 'bounty-nucleus.html',
      tagline: 'Utah Innovation Connections Hub.',
      rules: null,
    },
    {
      name: 'Governor’s Office · Track 01',
      logos: [{ src: 'assets/partners/goeo.png', alt: 'Utah Governor’s Office of Economic Opportunity' }],
      url: 'bounty-goeo-navigator.html',
      tagline: 'The Founder’s Navigator.',
      rules: null,
    },
    {
      name: 'Governor’s Office · Track 02',
      logos: [{ src: 'assets/partners/goeo.png', alt: 'Utah Governor’s Office of Economic Opportunity' }],
      url: 'bounty-goeo-map.html',
      tagline: 'The Utah Startup Map.',
      rules: null,
    },
    {
      name: 'MadeThis',
      logos: [{ src: 'assets/sponsors/madethis.svg', alt: 'MadeThis' }],
      url: 'bounty-madethis.html',
      tagline: 'Start a business. Validate. Earn revenue.',
      rules: null,
    },
    {
      name: 'Startup Bounty',
      logos: [
        { src: 'assets/sponsors/leland.png', alt: 'Leland' },
        { src: 'assets/sponsors/surge.svg', alt: 'Surge' },
        { src: 'assets/sponsors/cheers.svg', alt: 'Cheers' },
      ],
      url: 'bounty-startup.html',
      tagline: 'Give yourself a promotion. Automate your real job.',
      rules: null,
    },
  ],

  partners: [
    { name: 'Silicon Slopes', logo: 'assets/partners/siliconslopes.png', url: 'https://www.siliconslopes.com/' },
    { name: 'Utah Tech Week', logo: 'assets/partners/utahtechweek.png', url: 'https://utahtechweek.com/' },
    { name: 'Lassonde Entrepreneur Institute', logo: 'assets/partners/lassonde.png', url: 'https://lassonde.utah.edu/' },
    { name: 'Weber State University', logo: 'assets/partners/weberstate.png', url: 'https://weber.edu/' },
    { name: 'Utah Valley University', logo: 'assets/partners/uvu.png', url: 'https://www.uvu.edu/' },
    { name: 'U Career Success at the University of Utah', logo: 'assets/partners/ucareersuccess.png', url: 'https://careers.utah.edu/' },
  ],

  judgeFirms: [
    { name: 'Convoi Ventures', logo: 'assets/judges/convoi.png', url: 'https://www.convoi.vc/' },
    { name: 'Album', logo: 'assets/judges/album.svg', url: 'https://album.vc/' },
    { name: 'Pelion Venture Partners', logo: 'assets/judges/pelion.svg', url: 'https://pelionvp.com/' },
    { name: 'Run Ventures', logo: 'assets/judges/run.svg', url: 'https://runventures.com/' },
    { name: 'Kickstart', logo: 'assets/judges/kickstart.png', url: 'https://kickstartfund.com/' },
    { name: 'Sorenson Capital', logo: 'assets/judges/sorenson.webp', url: 'https://sorensoncapital.com/' },
  ],

  presentingSponsor: {
    name: 'JobNimbus',
    logo: 'assets/sponsors/jobnimbus.png',
    url: 'https://www.jobnimbus.com/',
    venue: 'JobNimbus HQ · Lehi',
  },

  // Confirmed 2026 AI Builder Day sponsors. Add one per commit:
  //   { name: 'Acme', logo: 'assets/event-sponsors/acme.png', url: 'https://acme.com', tier: 'bounty' }
  eventSponsors: [
    { name: 'Leland', logo: 'assets/sponsors/leland.png', url: 'https://www.joinleland.com/' },
    { name: 'Cheers', logo: 'assets/sponsors/cheers.svg', url: 'https://cheers.tech/' },
    { name: 'Surge', logo: 'assets/sponsors/surge.svg', url: 'https://surge.app/' },
    { name: 'Salesforce', logo: 'assets/sponsors/salesforce.png', url: 'https://www.salesforce.com/' },
    { name: 'Redo', logo: 'assets/sponsors/redo.png', url: 'https://www.getredo.com/en' },
  ],

  // Companies fueling builders with credits & infrastructure (in-kind).
  creditSponsors: [
    { name: 'Cursor', logo: 'assets/sponsors/cursor.svg', url: 'https://cursor.com/' },
    { name: 'MadeThis', logo: 'assets/sponsors/madethis.svg', url: 'https://madethis.com/' },
    { name: 'Capy', logo: 'assets/sponsors/capy.svg', url: 'https://capy.ai/' },
    { name: 'Daytona', logo: 'assets/sponsors/daytona.png', url: 'https://www.daytona.io/' },
  ],

  // Confirmed Friday speakers. Add one per confirmation:
  //   { name: 'Jane Doe', title: 'Founder · Acme', photo: 'assets/speakers/jane.jpg' }
  speakers: [],

  sponsors: [
    { name: 'Cerebras', logo: 'assets/sponsors/cerebras.png', url: 'https://www.cerebras.ai/' },
    { name: 'Manus', logo: 'assets/sponsors/manus.png', url: 'https://manus.im/app' },
    { name: 'Windsurf', logo: 'assets/sponsors/windsurf.svg', url: 'https://windsurf.com/' },
    { name: 'Bolt', logo: 'assets/sponsors/bolt.svg', url: 'https://bolt.new/' },
    { name: 'Contrary', logo: 'assets/sponsors/contrary.svg', url: 'https://contrary.com/' },
    { name: 'Runpod', logo: 'assets/sponsors/runpod.svg', url: 'https://runpod.io/' },
    { name: 'Mastra', logo: 'assets/sponsors/mastra.png', url: 'https://mastra.ai/' },
    { name: 'Cartwheel', logo: 'assets/sponsors/cartwheel.svg', url: 'https://getcartwheel.com/' },
    { name: 'Sameday', logo: 'assets/sponsors/sameday.png', url: 'https://www.gosameday.com/' },
    { name: 'Remi', logo: 'assets/sponsors/remi.png', url: 'https://www.remihq.com/' },
    { name: 'Stratus', logo: 'assets/sponsors/stratus.png', url: 'https://www.usestratus.com/' },
    { name: 'Buster', logo: 'assets/sponsors/buster.png', url: 'https://www.buster.so/' },
    { name: 'Castari', logo: 'assets/sponsors/castari.svg', url: 'https://castari.com/' },
    { name: 'Mindsmith', logo: 'assets/sponsors/mindsmith.svg', url: 'https://mindsmith.ai/' },
  ],

  tiers: {
    base: { name: 'Builder', price: 2500 },
    bounty: { name: 'Partner', price: 5000 },
  },

  stats: {
    builders: '400+',
    sponsors: '16+',
    prizes: '$50K+',
  },

  links: {
    register: 'https://luma.com/aibuilderday',
    sponsorPage: 'sponsors',
    contact: 'mailto:hello@justbuild.ing',
    justbuild: 'https://justbuild.ing',
    aibuilderday: 'https://aibuilderday.com',
    slack: 'https://tinyurl.com/jbslack',
    twitter: 'https://x.com/justbuildHQ',
    linkedin: 'https://www.linkedin.com/company/justbuild-ing/',
    formSponsor: 'https://docs.google.com/forms/d/e/1FAIpQLSfseqkpR5zccC1ypQOgrq5hI58qzSFnqi74WQb6Bgk0C0kWLQ/viewform',
    formSpeaker: 'https://docs.google.com/forms/d/e/1FAIpQLSdnorsK9JBLiFQetXsLkPiZ7lT7RaJ-jK_4k0tF1eRyI1I9ag/viewform',
  },
};
