// CV content, newest first. Plain text only.

// The email address, reversed and base64-encoded so it never appears in the
// repo or the HTML. scripts/email.ts decodes it only on a click or before printing.
export const emailCode = 'bW9jLmxpYW1nQHNpbmF6YXJ1b2IuYQ==';
export interface Role {
  title: string;
  company: string;
  url?: string;
  start: string; // "YYYY-MM"
  end?: string; // omitted: present
  about?: string; // what the company does, one line
  points: string[];
  tags?: string[];
}

export const summary =
  'Backend engineer and tech lead with over fifteen years in software, most of it in Python. I design services for fintech, e-learning and booking products, and lead the teams that build and run them: delivery, architecture, hiring and mentoring.';

export const experience: Role[] = [
  {
    title: 'Tech Lead',
    company: 'Plum',
    url: 'https://withplum.com',
    start: '2021-09',
    about: 'An app that helps people save and invest by analysing their income and spending.',
    points: [
      'Lead the Activation squad (six engineers, a product manager and a designer), which owns onboarding, account linking and aggregation, and the savings features.',
      'Responsible for delivery, architectural direction and the health of the team; people lead for ten engineers.',
      'Redesigned the referrals system around a domain-driven model.',
      'Interview engineering candidates and mentor engineers from junior to senior.',
    ],
    tags: ['python', 'flask', 'mongodb', 'gcp', 'ddd'],
  },
  {
    title: 'Software Engineer',
    company: 'Plum',
    url: 'https://withplum.com',
    start: '2020-04',
    end: '2021-09',
    points: [
      'Worked on the redesign of the subscriptions system.',
      'Helped design and build a new budgeting feature.',
      'Contributed to the analytics pipeline on GCP Pub/Sub.',
    ],
    tags: ['python', 'flask', 'postgresql', 'celery', 'rabbitmq', 'pub/sub'],
  },
  {
    title: 'Web & Mobile Developer',
    company: 'Ellinopoula',
    url: 'https://www.ellinopoula.com',
    start: '2018-01',
    end: '2020-04',
    about: 'An e-learning platform that teaches Greek to children online.',
    points: [
      'Built features across the Django platform.',
      'Developed the native iOS and Android apps, and trialled Flutter.',
      'Ran the App Engine infrastructure and set up CI/CD on GitLab.',
    ],
    tags: ['python', 'django', 'swift', 'kotlin', 'flutter', 'app engine'],
  },
  {
    title: 'Senior Web Developer',
    company: 'Giaola · 11888',
    url: 'https://www.11888.gr',
    start: '2016-04',
    end: '2018-01',
    about: 'A directory and marketplace for booking local businesses and freelancers, built for Greece’s main telecoms provider.',
    points: [
      'Built the booking platform backend and its REST API.',
      'Coordinated the development team on Git Flow and agile practices.',
      'Deployed the platform on AWS with Docker, aiming for high availability and auto-scaling.',
    ],
    tags: ['python', 'django', 'postgresql', 'celery', 'rabbitmq', 'aws', 'docker'],
  },
  {
    title: 'Web & Mobile Developer',
    company: 'Ellinopoula',
    url: 'https://www.ellinopoula.com',
    start: '2015-03',
    end: '2015-09',
    points: [
      'Built the first Ellinopoula iOS app in Objective-C.',
      'Developed and supported the Django website.',
    ],
    tags: ['python', 'django', 'objective-c'],
  },
  {
    title: 'Web & Mobile Developer',
    company: 'Giaola',
    url: 'https://www.giaola.gr',
    start: '2013-03',
    end: '2016-04',
    points: [
      'Designed, built and maintained the Giaola platform.',
      'Shipped small native Android and iOS apps around it.',
    ],
    tags: ['python', 'django', 'postgresql', 'java', 'objective-c'],
  },
  {
    title: 'Freelance Web Developer',
    company: 'Independent',
    start: '2010-10',
    end: '2011-11',
    points: ['Built web applications for clients.'],
  },
  {
    title: 'Junior Web Developer',
    company: 'Lighthouse',
    start: '2010-04',
    end: '2010-09',
    about: 'A web agency for e-commerce and digital marketing.',
    points: [
      'Turned designs into pixel-perfect HTML, CSS and jQuery.',
      'Built internal tools in WinForms and worked on the company CMS in C# and ASP.NET.',
    ],
  },
];

export const skills = [
  { area: 'Backend', items: 'Python, Flask, Django, REST APIs, Celery, RabbitMQ, domain-driven design' },
  { area: 'Data', items: 'PostgreSQL, MongoDB, Pub/Sub, event-driven pipelines' },
  { area: 'Cloud & delivery', items: 'Google Cloud, AWS, Docker, CI/CD on GitLab and Bitbucket' },
  { area: 'Leadership', items: 'Team and people lead, architecture reviews, hiring, mentoring' },
  { area: 'Mobile', items: 'Swift, Kotlin, Flutter, Objective-C, Android SDK' },
];

export const education = [
  {
    degree: 'BSc Computer Science',
    school: 'University of West Attica',
    years: '2006 – 2012',
    note: 'Thesis: a DRM protocol and an EPUB reader for Android.',
  },
];

export const interests = ['Airplanes', 'Scale modelling', 'Lindy Hop'];
