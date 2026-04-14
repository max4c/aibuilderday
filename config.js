const CONFIG = {
  event: {
    name: 'AI Builder Day',
    dates: 'May 8\u20139, 2026',
    location: 'Draper, UT',
    startDate: new Date('2026-05-08T09:00:00-06:00'),
    endDate: new Date('2026-05-09T23:59:59-06:00'),
  },

  showPartnershipBadge: true,

  partners: [
    { name: 'Startup State Initiative', logo: 'assets/partners/goeo.png', url: 'https://business.utah.gov/' },
    { name: 'The Nucleus Institute', logo: 'assets/partners/nucleus.webp', url: 'https://www.thenucleus.institute/' },
    { name: 'Silicon Slopes', logo: 'assets/partners/siliconslopes.png', url: 'https://www.siliconslopes.com/' },
    { name: 'Utah Tech Week', logo: 'assets/partners/utahtechweek.png', url: 'https://utahtechweek.com/' },
    { name: 'Lassonde Entrepreneur Institute', logo: 'assets/partners/lassonde.png', url: 'https://lassonde.utah.edu/' },
  ],

  judgeFirms: [
    { name: 'Convoi Ventures', logo: 'assets/judges/convoi.png', url: 'https://www.convoi.vc/' },
    { name: 'Album', logo: 'assets/judges/album.svg', url: 'https://album.vc/' },
    { name: 'Pelion Venture Partners', logo: 'assets/judges/pelion.svg', url: 'https://pelionvp.com/' },
    { name: 'Run Ventures', logo: 'assets/judges/run.svg', url: 'https://runventures.com/' },
    { name: 'Kickstart', logo: 'assets/judges/kickstart.png', url: 'https://kickstartfund.com/' },
    { name: 'Sorenson Capital', logo: 'assets/judges/sorenson.webp', url: 'https://sorensoncapital.com/' },
  ],

  // Confirmed 2026 AI Builder Day sponsors. Add one per commit:
  //   { name: 'Acme', logo: 'assets/event-sponsors/acme.png', url: 'https://acme.com', tier: 'bounty' }
  eventSponsors: [],

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
    { name: 'Redo', logo: 'assets/sponsors/redo.png', url: 'https://www.getredo.com/en' },
    { name: 'Buster', logo: 'assets/sponsors/buster.png', url: 'https://www.buster.so/' },
    { name: 'Castari', logo: 'assets/sponsors/castari.svg', url: 'https://castari.com/' },
    { name: 'Mindsmith', logo: 'assets/sponsors/mindsmith.svg', url: 'https://mindsmith.ai/' },
    { name: 'Surge', logo: 'assets/sponsors/surge.svg', url: 'https://surge.app/' },
  ],

  tiers: {
    base: { name: 'Base Sponsor', price: 2500 },
    bounty: { name: 'Bounty Sponsor', price: 5000 },
    headline: { name: 'Headline Sponsor', price: 10000 },
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
    slack: 'https://tinyurl.com/jb-slackinvite',
    twitter: 'https://x.com/justbuildHQ',
    linkedin: 'https://www.linkedin.com/company/justbuild',
    formJudge: 'https://docs.google.com/forms/d/e/1FAIpQLSfuVZV3-8JRqevAwSL4Dajhu3bGL20-Gxh3UABUpYZqTDhoaQ/viewform',
    formSponsor: 'https://docs.google.com/forms/d/e/1FAIpQLSfseqkpR5zccC1ypQOgrq5hI58qzSFnqi74WQb6Bgk0C0kWLQ/viewform',
    formSpeaker: 'https://docs.google.com/forms/d/e/1FAIpQLSdnorsK9JBLiFQetXsLkPiZ7lT7RaJ-jK_4k0tF1eRyI1I9ag/viewform',
  },
};
