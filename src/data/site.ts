// Identity and links shared by every page. Never add an email address here:
// contact goes through the form and LinkedIn, to keep it away from spam bots.
// (The CV page carries an encoded one; see emailCode in cv.ts.)
export const site = {
  name: 'Anastasis Bourazanis',
  role: 'Backend engineer & tech\u00a0lead', // non-breaking: never leave "lead" alone
  tagline: 'Technical Lead at kariera.gr. Before that, engineering lead at Plum.',
  description: 'Anastasis Bourazanis is a backend engineer and technical lead in Athens, currently at kariera.gr.',
  githubUser: 'abourazanis',
  socials: [
    { label: 'GitHub', href: 'https://github.com/abourazanis' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abourazanis' },
  ],
  linkedin: 'https://www.linkedin.com/in/abourazanis',
};

// Side menu: in-page sections first, then separate pages (CV last).
export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'CV', href: '/cv/' },
];
