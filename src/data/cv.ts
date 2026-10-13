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
  intro?: string[]; // paragraphs before the bullet points
  points?: string[];
  tags?: string[];
}

export const summary =
  'Backend engineer since 2010, working mostly in Python and Node.js. For the past five years I’ve also led teams: setting the architecture, running delivery, hiring and mentoring. I’ve worked on recruitment, fintech, e-learning and booking products.';

export const experience: Role[] = [
  {
    title: 'Technical Lead',
    company: 'kariera.gr',
    url: 'https://www.kariera.gr',
    start: '2025-03',
    about: 'An HR tech platform for job seekers and the companies hiring them.',
    points: [
      'Leading the technical delivery and architectural direction of backend services supporting B2B workflows.',
      'Designing and implementing scalable, event-driven and real-time data processing solutions.',
      'Mentoring engineers while fostering a culture of ownership, continuous improvement, and technical excellence.',
    ],
    tags: ['node.js', 'typescript', 'nestjs', 'next.js', 'postgresql', 'redis', 'elasticsearch', 'azure openai', 'llms', 'recommender systems'],
  },
  {
    title: 'Senior Software Engineer',
    company: 'kariera.gr',
    url: 'https://www.kariera.gr',
    start: '2024-06',
    end: '2025-03',
    points: [
      'Designed and implemented a revamped job post import pipeline, significantly improving scalability and throughput, reliably processing 30k+ entries in substantially reduced time.',
      'Contributed to the Resume Database Search feature, improving search accuracy and performance.',
      'Actively participated in architectural discussions and contributed to improving system observability and resilience.',
    ],
    tags: ['node.js', 'typescript', 'postgresql', 'elasticsearch'],
  },
  {
    title: 'Engineering Lead',
    company: 'Plum',
    url: 'https://withplum.com',
    start: '2022-11',
    end: '2024-06',
    about: 'An AI assistant that helps users to set money aside and invest by analyzing their income and outgoings.',
    intro: [
      'Overseeing two dynamic teams: one cross-functional squad and one dedicated mobile platform squad.',
      'The cross-functional squad consists of 8 engineers, a product manager, and a designer. Together, we shape the user experience through seamless onboarding, a robust referral mechanism, banking data linking and aggregation, and one of the most important features of the app, the saving rules.',
      'The mobile core squad, consisting of iOS and Android mobile engineers, is dedicated to the maintenance and enhancement of our mobile platforms and internal tooling.',
    ],
    points: [
      'Orchestrated the delivery and provided ongoing architectural direction to ensure the overall health and productivity of both teams.',
      'People lead for 10 engineers, fostered a collaborative and growth-oriented team culture.',
      'Contributed to the ongoing establishment and maintenance of processes at the domain level, enhancing organizational efficiency.',
      'Led an initiative that introduced a new localization process, facilitating seamless collaboration among product teams, translation teams, and engineers.',
      'Streamlined our hiring pipeline, achieving a one-week turnaround from the first call to extending job offers.',
      'Mentored junior, mid-level, and senior engineers, contributing to their professional development and growth within the organization.',
    ],
    tags: ['python', 'flask', 'mongodb', 'gcp', 'ios', 'android'],
  },
  {
    title: 'Technical Lead',
    company: 'Plum',
    url: 'https://withplum.com',
    start: '2021-09',
    end: '2022-11',
    intro: [
      'Tech Lead & Software Engineer on the Activation squad. A team of 6 engineers, a product manager and a designer. The squad’s main responsibilities are user’s onboarding, account linking/aggregation and the saving rules feature.',
    ],
    points: [
      'Responsible for the delivery, architectural direction, people and health of the team.',
      'People lead for 10 engineers.',
      'Participated in the hiring process by being a member of the interviewing team.',
      'Mentored junior, mid-level and senior engineers.',
      'Redesigned the referrals mechanism by following Domain Driven Design with Python, Flask, MongoDB, GCP.',
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
      'Contributed to designing and implementation of a new budgeting feature tailored for subscribed users that depended heavily on money transfers.',
      'Contributed to the internal event based analytics system.',
      'Revamped the subscription mechanism and enhanced the user flow, resulting in a 50% increase in subscription rates.',
    ],
    tags: ['python', 'flask', 'postgresql', 'celery', 'rabbitmq', 'pub/sub'],
  },
  {
    title: 'Web / Mobile Developer',
    company: 'Ellinopoula',
    url: 'https://www.ellinopoula.com',
    start: '2018-01',
    end: '2020-04',
    about: 'An e-learning platform designed for kids to learn Greek online.',
    intro: ['Web & Mobile Developer, responsible for the development of an e-learning platform for kids.'],
    points: [
      'Developed various features for the e-learning platform using Python/Django.',
      'Developed the iOS and Android platform app.',
      'Experimented with Dart and Flutter SDK on a hybrid app aimed to replace the native ones.',
      'Supported DevOps on Google App Engine.',
      'Implemented and refined CI/CD processes through Gitlab to enhance the efficiency of development workflows.',
    ],
    tags: ['python', 'django', 'swift', 'kotlin', 'flutter', 'app engine'],
  },
  {
    title: 'Senior Web Developer',
    company: 'giaola',
    url: 'https://www.giaola.gr',
    start: '2016-04',
    end: '2018-01',
    about: 'An electronic directory and a marketplace helping users to find, contact, book, and transact with freelancers and physical businesses.',
    intro: ['Senior Full Stack Web Developer at giaola.gr, led the creation of a booking platform for a major Greek Telecommunications Provider (11888.gr).'],
    points: [
      'Developed the booking platform backend in Python/Django.',
      'Guided the development team with a strategic approach, leveraged the Git-Flow methodology and adhered to the core principles of Agile methodology.',
      'Designed and implemented a RESTful API for the giaola booking application.',
      'Orchestrated the overall service infrastructure by utilizing Docker containers, BitBucket Pipelines, and several AWS stack (including EC2, ECS, Route 53, S3, CloudFront, RDS, ElastiCache, IAM) on AWS Elastic Beanstalk environment.',
    ],
    tags: ['python', 'django', 'postgresql', 'celery', 'rabbitmq', 'aws', 'docker'],
  },
  {
    title: 'Web & Mobile Developer',
    company: 'Ellinopoula',
    url: 'https://www.ellinopoula.com',
    start: '2015-03',
    end: '2015-09',
    intro: ['Web & Mobile Application Developer, responsible for the development of the Ellinopoula iOS app alongside with the development/support of the website.'],
    points: [
      'Developed various features of the e-learning platform in Python/Django.',
      'Developed the iOS e-learning mobile application in Objective C.',
    ],
    tags: ['python', 'django', 'objective-c'],
  },
  {
    title: 'Web & Mobile Developer',
    company: 'giaola',
    url: 'https://www.giaola.gr',
    start: '2013-03',
    end: '2016-04',
    intro: ['Web & Mobile Developer, responsible for the technical design, development and maintenance of the giaola.gr b2c platform.'],
    points: [
      'Developed mobile apps in Android/Java and in iOS/Objective-C in order to support the giaola ecosystem.',
      'Engaged on the technical design and development of the b2c platform.',
    ],
    tags: ['python', 'django', 'postgresql', 'celery', 'rabbitmq', 'amazon ebs', 'java', 'objective-c'],
  },
  {
    title: 'Freelance Web Developer',
    company: 'Independent',
    start: '2010-10',
    end: '2011-11',
    intro: ['Developed several Web Applications for third party clients.'],
  },
  {
    title: 'Web Developer',
    company: 'Lighthouse Internet Media & Advertising',
    start: '2010-04',
    end: '2010-09',
    about: 'Web development company, specialized in e-commerce applications and digital marketing services.',
    intro: ['Junior Web developer working with HTML, CSS, JQuery, C#, Asp.NET, WinForms and SQL.'],
    points: [
      'Crafted pixel perfect HTML based on Photoshop templates using HTML, CSS & Jquery.',
      'Developed internal tools for the management team with WinForms and Microsoft Access.',
      'Engaged in backend development of the company’s custom CMS using C# and Telerik Controls.',
    ],
  },
];

export const skills = [
  { area: 'Backend', items: 'Python, Node.js, TypeScript, NestJS, Flask, Django, REST APIs, domain-driven design' },
  { area: 'Data & messaging', items: 'PostgreSQL, MongoDB, Redis, Elasticsearch, Celery, RabbitMQ, Pub/Sub, event-driven pipelines' },
  { area: 'AI', items: 'LLM features on Azure OpenAI, recommender systems' },
  { area: 'Cloud & delivery', items: 'Google Cloud, AWS, Docker, CI/CD on GitLab and Bitbucket' },
  { area: 'Leadership', items: 'Leading multiple teams, people management, delivery, hiring, mentoring' },
  { area: 'Web & mobile', items: 'Next.js, Swift, Kotlin, Flutter, Objective-C' },
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
