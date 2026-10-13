// Identity and links shared by every page. Never add an email address here:
// contact goes through the form and LinkedIn, to keep it away from spam bots.
export const site = {
  name: 'Anastasis Bourazanis',
  role: 'Backend engineer & tech lead',
  tagline: 'I design Python backends for products people rely on, and lead the teams that ship them.',
  description: 'Anastasis Bourazanis builds backend systems in Python and leads the teams that run them.',
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
