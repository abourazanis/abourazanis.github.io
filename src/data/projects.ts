export interface Project {
  id: string; // anchor on /projects/
  name: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  status?: string; // shown instead of links, e.g. while it isn't public
}

// Side projects, newest first. The homepage shows the first three.
export const projects: Project[] = [
  {
    id: 'ripple',
    name: 'Ripple',
    summary: 'A wellness tracking app for iPhone and Apple Watch, written natively in Swift.',
    stack: ['swift', 'ios', 'watchos'],
    links: [],
    status: 'In development',
  },
  {
    id: 'word-or-weird',
    name: 'Word or Weird',
    summary: 'A word trivia game for iOS and Android, built with Flutter.',
    stack: ['dart', 'flutter', 'riverpod', 'go_router', 'hive'],
    links: [],
    status: 'In development',
  },
  {
    id: 'website',
    name: 'abourazanis.com',
    summary: 'This website. A static Astro site on GitHub Pages, with a contact form that runs on a Cloudflare Worker.',
    stack: ['astro', 'typescript', 'cloudflare workers'],
    links: [{ label: 'Source', href: 'https://github.com/abourazanis/abourazanis.github.io' }],
  },
  {
    id: 'wug-game',
    name: 'Wug Game',
    summary: 'A word quiz based on the Wug test, built to try out Flutter. Unfinished.',
    stack: ['dart', 'flutter'],
    links: [{ label: 'Source', href: 'https://github.com/abourazanis/wuggame' }],
  },
  {
    id: 'muzei-wallbase',
    name: 'Muzei Wallbase',
    summary: 'An artwork source for Muzei, the Android live wallpaper app. It picked a random image from the latest 30 on the Wallbase.cc toplist, and was published on Google Play.',
    stack: ['java', 'android', 'jsoup'],
    links: [{ label: 'Source', href: 'https://github.com/abourazanis/muzei-wallbase.cc' }],
  },
];
