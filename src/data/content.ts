export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const contact = {
  name: 'Naulia Sahya Althafah',
  location: 'Surabaya, East Java, Indonesia',
  phoneDisplay: '+62 838-3918-1114',
  phoneHref: 'tel:+6283839181114',
  email: 'nauliaalthafah@gmail.com',
  emailHref: 'mailto:nauliaalthafah@gmail.com',
  linkedinDisplay: 'linkedin.com/in/nauliaa',
  linkedinHref: 'https://linkedin.com/in/nauliaa',
  githubDisplay: 'github.com/NauliaSahya',
  githubHref: 'https://github.com/NauliaSahya',
  resumeHref: 'https://drive.google.com/file/d/14O6ryNf5qiBUAm-KvAHvEn578dRz5ihD/view?usp=sharing',
}

export const hero = {
  badgeName: 'NAULIA SAHYA',
  badgeRole: 'Biomedical Engineering',
  badgeMeta: 'ITS · 2026',
  pullLabel: 'Pull to explore',
  enterLabel: 'Enter portfolio',
  headline: 'Building useful technology at the intersection of people, systems, and healthcare.',
  supporting:
    'Biomedical Engineering graduate focused on digital healthcare, web systems, project coordination, and turning complex workflows into practical solutions.',
  meta: ['Biomedical Engineering', 'Institut Teknologi Sepuluh Nopember', 'Class of 2026'],
  ctaPrimary: 'Explore my work',
  ctaSecondary: 'View resume',
  status: 'Available for opportunities',
}

export const about = {
  title: 'A little about me',
  statement: 'I enjoy working where technology meets real-world problems.',
  pillars: [
    {
      verb: 'I build.',
      detail: 'Web systems, APIs, healthcare solutions, and digital prototypes.',
    },
    {
      verb: 'I organize.',
      detail: 'Events, academic programs, administrative processes, and operational workflows.',
    },
    {
      verb: 'I lead.',
      detail: 'Teams, teaching assistants, event staff, and cross-functional activities.',
    },
  ],
  metrics: [
    { value: 100, suffix: '+', label: 'Students coordinated' },
    { value: 20, suffix: '+', label: 'Teaching assistants coordinated' },
    { value: 12, suffix: '', label: 'Event staff coordinated' },
  ],
}

export const languages = [
  { name: 'Indonesian', scoreLabel: 'UKBI Score', score: 700, max: 750 },
  { name: 'English', scoreLabel: 'TEFL Score', score: 517, max: 677 },
]

export const education = [
  {
    school: 'Institut Teknologi Sepuluh Nopember',
    program: 'Biomedical Engineering',
    date: 'July 2022 - August 2026',
    detail: 'GPA 3.78 / 4.00 · Medical Informatics focus',
  },
  {
    school: 'SMA Negeri 2 Surabaya',
    program: 'Mathematics and Natural Sciences',
    date: 'July 2020 - July 2022',
    detail: 'Accelerated Class Graduate',
  },
  {
    school: 'SMP Negeri 3 Surabaya',
    program: 'Junior Secondary',
    date: 'July 2017 - July 2020',
    detail: 'Bilingual Class Graduate',
  },
]

export const footer = {
  name: 'Naulia Sahya Althafah',
  tagline: 'Biomedical Engineering · Technology · Project Coordination',
  year: 2026,
}

export const contactSection = {
  title: "Let's build something useful.",
  subtext: 'Interested in healthcare technology, digital systems, or project coordination?',
}
