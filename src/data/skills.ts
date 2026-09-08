export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming / Web',
    items: ['Python', 'PHP', 'HTML', 'CSS', 'REST API'],
  },
  {
    title: 'Database / Data',
    items: ['MySQL', 'MongoDB'],
  },
  {
    title: 'Healthcare / Systems',
    items: ['HL7 FHIR R4', 'Medical Informatics', 'Electronic Health Records', 'Healthcare Information Systems'],
  },
  {
    title: 'Design',
    items: ['Figma'],
  },
  {
    title: 'Productivity',
    items: ['Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint', 'Google Drive', 'Google Sheets', 'Google Forms'],
  },
  {
    title: 'Professional',
    items: [
      'Leadership',
      'Project Management',
      'Cross-functional Collaboration',
      'Communication',
      'Analytical Thinking',
      'Problem Solving',
      'Adaptability',
    ],
  },
]
