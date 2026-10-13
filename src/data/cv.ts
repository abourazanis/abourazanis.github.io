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
  'Backend engineer and tech lead with over fifteen years in software, mostly in Python and Node.js. I design services for recruitment, fintech, e-learning and booking products, and lead the teams that build and run them: delivery, architecture, hiring and mentoring.';

export const experience: Role[] = [
  {
    title: 'Technical Lead',
    company: 'kariera.gr',
    url: 'https://www.kariera.gr',
    start: '2025-03',
    about: 'A job board and recruitment platform in Greece.',
    points: [
      'Lead the technical delivery and architectural direction of the backend services behind B2B workflows.',
      'Design and build scalable, event-driven and real-time data processing.',
      'Mentor engineers and encourage ownership, continuous improvement and technical excellence.',
    ],
    tags: ['node.js', 'event-driven', 'real-time data'],
  },
  {
    title: 'Senior Software Engineer',
    company: 'kariera.gr',
    url: 'https://www.kariera.gr',
    start: '2024-06',
    end: '2025-03',
    points: [
      'Redesigned the job post import pipeline for scale and throughput; it reliably processes 30k+ entries in far less time.',
      'Worked on resume database search, improving its accuracy and performance.',
      'Took part in architecture discussions and improved the system’s observability and resilience.',
    ],
    tags: ['node.js', 'search', 'observability'],
  },
  {
    title: 'Engineering Lead',
    company: 'Plum',
    url: 'https://withplum.com',
    start: '2022-11',
    end: '2024-06',
    about: 'An app that helps people save and invest by analysing their income and spending.',
    points: [
      'Led two teams: a cross-functional squad (eight engineers, a product manager and a designer) owning onboarding, referrals, bank account linking and saving rules, and the mobile platform squad of iOS and Android engineers.',
      'Set delivery and architectural direction for both teams; people lead for ten engineers.',
      'Introduced a localisation process connecting product teams, translators and engineers.',
      'Streamlined hiring to one week from first call to offer.',
      'Shaped domain-level processes and mentored engineers from junior to senior.',
    ],
    tags: ['python', 'flask', 'mongodb', 'gcp', 'ios', 'android'],
  },
  {
    title: 'Technical Lead',
    company: 'Plum',
    url: 'https://withplum.com',
    start: '2021-09',
    end: '2022-11',
    points: [
      'Led the Activation squad (six engineers, a product manager and a designer), which owned onboarding, account linking and aggregation, and saving rules.',
      'Responsible for delivery, architectural direction and the health of the team; people lead for ten engineers.',
      'Redesigned the referrals system with domain-driven design.',
      'Interviewed engineering candidates and mentored engineers from junior to senior.',
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
      'Rebuilt the subscription flow, raising subscription rates by 50%.',
      'Helped design and build a budgeting feature for subscribers, built on money transfers.',
      'Contributed to the internal event-based analytics system.',
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
      'Developed the native iOS and Android apps, and trialled a Flutter app to replace them.',
      'Ran the App Engine infrastructure and set up CI/CD on GitLab.',
    ],
    tags: ['python', 'django', 'swift', 'kotlin', 'flutter', 'app engine'],
  },
  {
    title: 'Senior Web Developer',
    company: 'Giaola',
    url: 'https://www.giaola.gr',
    start: '2016-04',
    end: '2018-01',
    about: 'A directory and marketplace for booking local businesses and freelancers.',
    points: [
      'Led the build of a booking platform for 11888.gr, a major Greek telecoms provider: Django backend and REST API.',
      'Guided the development team using Git Flow and agile practices.',
      'Ran the infrastructure on AWS Elastic Beanstalk with Docker and Bitbucket Pipelines.',
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
      'Part-time: built the first Ellinopoula iOS app in Objective-C.',
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
      'Worked on the technical design and development of the giaola.gr consumer platform.',
      'Built Android and iOS apps around it.',
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
    title: 'Web Developer',
    company: 'Lighthouse Internet Media',
    start: '2010-04',
    end: '2010-09',
    about: 'A web agency for e-commerce and digital marketing.',
    points: [
      'Turned Photoshop designs into pixel-perfect HTML, CSS and jQuery.',
      'Built internal tools in WinForms and Microsoft Access, and worked on the company CMS in C#.',
    ],
  },
];

export const skills = [
  { area: 'Backend', items: 'Python, Node.js, Flask, Django, REST APIs, Celery, RabbitMQ, domain-driven design' },
  { area: 'Data', items: 'PostgreSQL, MongoDB, Pub/Sub, event-driven and real-time pipelines, search' },
  { area: 'Cloud & delivery', items: 'Google Cloud, AWS, Docker, CI/CD on GitLab and Bitbucket' },
  { area: 'Leadership', items: 'Leading multiple teams, people management, delivery, hiring, mentoring' },
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
