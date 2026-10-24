export type ExperienceEntry = {
  org: string
  role: string
  period: string
  detail?: string
  bullets?: string[]
}

export type ExperienceCategoryId = 'internship' | 'volunteer' | 'organization'

export type ExperienceCategory = {
  id: ExperienceCategoryId
  label: string
  summary: string
  entries: ExperienceEntry[]
}

/**
 * Urutan entri: terbaru di atas. Isi Internship & Lab dan HMTB mengikuti
 * profil LinkedIn (PDF Oktober 2026). UKM Robotic, UKM Expo, BEACON, dan
 * CENIM belum ada di LinkedIn, jadi masih memakai data portofolio lama.
 */
export const experienceCategories: ExperienceCategory[] = [
  {
    id: 'internship',
    label: 'Internship & Lab',
    summary: 'Hospital internship and laboratory work.',
    entries: [
      {
        org: 'Biomedical Signal Processing Laboratory',
        role: 'Practicum Coordinator',
        period: 'Aug 2025 - Jul 2026',
        detail:
          'Directed the operational and instructional activities of the practicum, ensuring smooth academic operations and effective learning delivery.',
        bullets: [
          'Led a team of 20+ teaching assistants, overseeing task allocation and daily practicum activities.',
          'Coordinated biomedical signal processing practicums for more than 100 undergraduate students.',
          'Developed and standardized practicum modules, instructional materials, and documentation across all lab sessions.',
          'Facilitated communication among lecturers, teaching assistants, and students while overseeing administrative and operational processes.',
        ],
      },
      {
        org: 'RS Primasatya Husada Citra (PHC) Surabaya',
        role: 'Hospital Administration Intern',
        period: 'Jul 2025 - Aug 2025',
        bullets: [
          'Analyzed administrative workflows within the Medical Records Unit and identified inefficiencies in medical coding processes.',
          'Designed a digital prototype in Figma to improve medical coding data exchange.',
          'Collaborated with hospital staff to gather requirements and translate operational needs into digital solutions.',
          'Supported daily administrative data processing in Microsoft Excel, keeping hospital records accurate and reliable.',
        ],
      },
      {
        org: 'Biomedical Signal Processing Laboratory',
        role: 'Vice Practicum Coordinator',
        period: 'Aug 2024 - Jul 2025',
        detail:
          'Supported the logistics and administrative coordination of the lab, optimizing resource allocation and scheduling for all practicum sessions.',
        bullets: [
          'Planned practicum schedules, student group assignments, and laboratory logistics to prevent operational bottlenecks.',
          'Assisted in overseeing daily practicum activities and task allocation for teaching assistants.',
          'Coordinated administrative processes and communication between the academic team and student cohorts.',
        ],
      },
    ],
  },
  {
    id: 'volunteer',
    label: 'Volunteer & Committee',
    summary: 'Event committees and one-off volunteer roles.',
    entries: [
      {
        org: 'CENIM 2025',
        role: 'Event & Website Contribution',
        period: '2025',
        detail: 'Contributed to the conference website and supported rundown and staff coordination.',
      },
      {
        org: 'BEACON 2024',
        role: 'Expert Staff of Secretarial',
        period: '2024',
      },
    ],
  },
  {
    id: 'organization',
    label: 'Organization',
    summary: 'Student organizations and leadership.',
    entries: [
      {
        org: 'HMTB ITS (Himpunan Mahasiswa Teknik Biomedik)',
        role: 'Secretary',
        period: 'Jan 2025 - Feb 2026',
        bullets: [
          'Drafted official correspondence, recommendation letters, and administrative documents.',
          'Managed organizational inventory records and archived correspondence, proposals, and financial reports (SPJ/LPJ).',
          'Coordinated administrative processes across departments and supported the executive board with planning, evaluation, and decision-making.',
          'Facilitated communication between the executive board and departments for program execution.',
        ],
      },
      {
        org: 'HMTB ITS (Himpunan Mahasiswa Teknik Biomedik)',
        role: 'Secretary',
        period: 'May 2024 - Dec 2024',
        bullets: [
          'Drafted official correspondence, recommendation letters, and administrative documents.',
          'Managed organizational inventory records and archived correspondence, proposals, and financial reports (SPJ/LPJ).',
          'Coordinated administrative processes across departments and supported the executive board with planning, evaluation, and decision-making.',
          'Facilitated communication between the executive board and departments for program execution.',
        ],
      },
      {
        org: 'UKM Robotic ITS',
        role: 'Secretary II',
        period: '2024',
        detail: 'Supported administrative operations for the robotics student organization.',
      },
      {
        org: 'UKM Expo ITS',
        role: 'Staff → Expert Staff of Data Management',
        period: '2023 - 2024',
        detail: 'Handled participant and exhibitor data, then moved up to oversee data accuracy across the event.',
      },
    ],
  },
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
