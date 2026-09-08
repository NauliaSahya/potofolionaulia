export type TimelineEntry = {
  year: string
  org: string
  role: string
  detail?: string
}

export const timeline: TimelineEntry[] = [
  {
    year: '2023',
    org: 'UKM Expo ITS',
    role: 'Staff of Data Management',
    detail: 'Handled participant and exhibitor data for a campus-wide exhibition event.',
  },
  {
    year: '2024',
    org: 'UKM Expo ITS',
    role: 'Expert Staff of Data Management',
    detail: 'Advanced to a senior data-management role, overseeing data accuracy across the event.',
  },
  {
    year: '2024',
    org: 'UKM Robotic ITS',
    role: 'Secretary II',
    detail: 'Supported administrative operations for the robotics student organization.',
  },
  {
    year: '2024 - 2025',
    org: 'HMTB ITS',
    role: 'Secretary II → Secretary I',
    detail: 'Progressed from supporting to leading the secretariat of the Biomedical Engineering student association.',
  },
  {
    year: '2024 - 2026',
    org: 'Biomedical Signal Processing Laboratory',
    role: 'Vice Practicum Coordinator → Practicum Coordinator',
    detail: 'Coordinated practicum scheduling, teaching assistants, and lab operations.',
  },
  {
    year: '2025',
    org: 'CENIM 2025',
    role: 'Event & Website Contribution',
    detail: 'Contributed to the conference website and supported rundown and staff coordination.',
  },
  {
    year: '2025',
    org: 'RS Primasatya Husada Citra',
    role: 'Hospital Administration Intern',
    detail: 'Analyzed medical coding workflows and proposed digital process improvements.',
  },
  {
    year: '2026',
    org: 'Final Year Project',
    role: 'SIRJ',
    detail: 'Built an outpatient information system integrating self-screening data with HL7 FHIR R4.',
  },
]

export const orgExperience = [
  { org: 'HMTB ITS', role: 'Secretary II → Secretary I' },
  { org: 'UKM Robotic ITS 2024', role: 'Secretary II' },
  { org: 'UKM Expo ITS 2023 & 2024', role: 'Staff → Expert Staff of Data Management' },
  { org: 'BEACON 2024', role: 'Expert Staff of Secretarial' },
]

export const capabilityGroups = [
  {
    title: 'Team Coordination',
    stats: ['20+ teaching assistants', '12 event staff'],
    flow: ['20+ TAs', 'Scheduling', 'Task Allocation', 'Execution'],
  },
  {
    title: 'Operations',
    stats: ['Scheduling', 'Registration', 'Documentation', 'Administrative workflows', 'Event execution'],
    flow: ['12 Staff', 'Delegation', 'Coordination', 'Event Delivery'],
  },
  {
    title: 'Communication',
    stats: ['Lecturers', 'Students', 'Executive Boards', 'Event Teams'],
    flow: [],
  },
]
