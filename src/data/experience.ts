import { assets } from './assets'

export type ExperienceImage = {
  src: string
  alt: string
  label?: string
}

export type ExperienceEntry = {
  org: string
  role: string
  /** Label tampilan, mis. "Jan 2025 - Feb 2026". */
  period: string
  /** Bulan mulai (YYYY-MM), dipakai untuk mengurutkan dan mengelompokkan per tahun. */
  start: string
  /** Konteks singkat, mis. nama acara atau bidangnya. */
  context?: string
  /** Pencapaian dengan rumus XYZ: hasil (X), ukuran (Y), cara (Z). */
  bullets: string[]
  images?: ExperienceImage[]
}

export type ExperienceCategoryId = 'internship' | 'volunteer' | 'organization'

export type ExperienceCategory = {
  id: ExperienceCategoryId
  label: string
  summary: string
  entries: ExperienceEntry[]
}

/**
 * Untuk menambah foto pada sebuah entri, taruh file di public/images lalu
 * isi `images`, contoh:
 *   images: [{ src: '/images/beacon-1.webp', alt: 'Tim BEACON ITS', label: 'Hari acara' }]
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
        start: '2025-08',
        bullets: [
          'Kept instructional standards consistent through a full academic year by leading 20+ teaching assistants, allocating tasks, and overseeing daily practicum activities.',
          'Delivered biomedical signal processing practicums to 100+ undergraduate students by coordinating lecturers, assistants, and students through a structured program.',
          'Improved learning quality and administrative consistency across all lab sessions by developing standardized practicum modules, instructional materials, and documentation.',
        ],
      },
      {
        org: 'RS Primasatya Husada Citra (PHC) Surabaya',
        role: 'Hospital Administration Intern',
        period: 'Jul 2025 - Aug 2025',
        start: '2025-07',
        bullets: [
          'Identified inefficiencies in medical coding by analyzing administrative workflows in the Medical Records Unit and proposing targeted operational improvements.',
          'Streamlined the proposed medical coding data exchange by designing a digital prototype in Figma.',
          'Turned operational needs into actionable digital solutions by gathering requirements directly with hospital staff.',
          'Validated the proposed workflow with leaders of 4 hospital units (Customer Service, IT, Medical Records, Komkordik) by presenting the findings and prototype.',
          'Kept hospital records accurate and reliable by supporting daily administrative data processing in Microsoft Excel.',
        ],
      },
      {
        org: 'Biomedical Signal Processing Laboratory',
        role: 'Vice Practicum Coordinator',
        period: 'Aug 2024 - Jul 2025',
        start: '2024-08',
        bullets: [
          'Prevented operational bottlenecks across all practicum sessions by planning schedules, student group assignments, and laboratory logistics.',
          'Kept teaching assistant work aligned with the academic curriculum by helping oversee daily practicum activities and task allocation.',
          'Minimized administrative errors between the academic team and student cohorts by coordinating administrative processes and communication.',
        ],
      },
    ],
  },
  {
    id: 'volunteer',
    label: 'Volunteer & Committee',
    summary: 'Event committees and staff roles.',
    entries: [
      {
        org: 'CENIM 2025',
        role: 'Event & Website Contribution',
        period: '2025',
        start: '2025-01',
        context: 'International Conference on Computer Engineering, Network and Intelligent Multimedia',
        bullets: [
          'Delivered the CENIM 2025 conference website by adapting a pre-existing conference template with HTML, CSS, and PHP.',
          'Kept event operations running alongside the faculty committee by coordinating 12 student staff with 3 core student committee members and supporting the rundown.',
        ],
        images: [
          { src: assets.projects.cenim.event, alt: 'CENIM 2025 conference event day', label: 'Event day' },
          { src: assets.projects.cenim.home, alt: 'CENIM 2025 conference website', label: 'Conference website' },
        ],
      },
      {
        org: 'UKM Expo ITS',
        role: 'Expert Staff of Data Management',
        period: 'May 2024 - Aug 2024',
        start: '2024-05',
        bullets: [
          'Verified 5,000+ event tickets for authenticity by applying UV verification, ensuring accurate attendee admission.',
          'Ensured only registered participants entered the event by supervising entry gate operations.',
          'Kept ticket records consistent with official registration data by overseeing ticket exchange and reconciling redeemed tickets.',
          'Contributed to building the next Data Management team by taking part in staff recruitment and interviews.',
        ],
      },
      {
        org: 'BEACON ITS',
        role: 'Expert Staff of Secretarial',
        period: 'Mar 2024 - Mar 2025',
        start: '2024-03',
        bullets: [
          'Managed participant data for 3 event categories, supporting 170+ participants throughout the event.',
          'Streamlined registration and feedback by designing digital workflows in Google Forms, with records kept in Google Drive and Google Sheets.',
          'Delivered personalized digital certificates by merging participant information into Figma certificate templates.',
          'Supported smooth event execution and accurate participant data by coordinating with the event division.',
        ],
      },
      {
        org: 'BEM FTEIC ITS',
        role: 'Staff of Secretarial',
        period: 'Sep 2023 - Nov 2023',
        start: '2023-09',
        context: 'EliteXPesraf',
        bullets: [
          'Kept registration records accurate by managing participant registration through Google Forms.',
          'Kept ticket distribution and participant administration running smoothly throughout the event by coordinating both.',
          'Supported efficient event preparation and execution through administrative operations.',
        ],
      },
      {
        org: 'UKM Expo ITS',
        role: 'Data Management Staff',
        period: 'May 2023 - Aug 2023',
        start: '2023-05',
        bullets: [
          'Tracked participant attendance by managing QR code-based registration integrated with Google Forms.',
          'Supported post-event evaluation and reporting by compiling and analyzing attendance data.',
          'Kept event documentation accurate by assisting in maintaining participant records.',
        ],
      },
      {
        org: 'IRIS ITS',
        role: 'Event Staff',
        period: 'Mar 2023 - Aug 2023',
        start: '2023-03',
        context: 'Science and Technology competition',
        bullets: [
          'Kept the competition flow smooth by coordinating event schedules and match sequencing.',
          'Maintained operational efficiency despite unexpected delays by adjusting event timelines on the spot.',
          'Kept activities on schedule throughout the competition through real-time event coordination.',
        ],
      },
      {
        org: 'Himpunan Mahasiswa Teknik Biomedik ITS',
        role: 'Staff of Administrative Division',
        period: 'Aug 2022 - Sep 2022',
        start: '2022-08',
        context: 'BME Awards 2022',
        bullets: [
          'Supported participant management by developing RSVP and event feedback forms in Google Forms.',
          'Gave participants one place for registration forms, event information, and feedback by organizing digital event resources in Linktree.',
          'Enabled efficient communication with participants before and during the event by supporting administrative coordination.',
        ],
      },
    ],
  },
  {
    id: 'organization',
    label: 'Organization',
    summary: 'Student organizations and secretariat leadership.',
    entries: [
      {
        org: 'Himpunan Mahasiswa Teknik Biomedik ITS',
        role: 'Secretary I',
        period: 'Jan 2025 - Feb 2026',
        start: '2025-01',
        bullets: [
          'Standardized secretarial work for future administrations by developing the organization’s first Standard Operating Procedure (SOP) for Secretarial Affairs.',
          'Kept letter, SPJ (Financial Accountability Report), and LPJ (Final Accountability Report) requests on time by processing them through Google Forms.',
          'Made organizational documents structured and easy to find by managing archives in Google Drive and Google Sheets.',
          'Ensured accuracy, completeness, and consistency of official documents by reviewing them before submission.',
          'Improved organizational governance by evaluating administrative processes with Executive Board members and recommending improvements.',
          'Kept asset records accurate by maintaining and updating the inventory.',
        ],
      },
      {
        org: 'Himpunan Mahasiswa Teknik Biomedik ITS',
        role: 'Secretary II',
        period: 'May 2024 - Dec 2024',
        start: '2024-05',
        bullets: [
          'Supported organizational operations by drafting official documents, including recommendation letters, statements, and administrative correspondence.',
          'Improved document organization and retrieval by managing digital archives in Google Drive and Google Sheets.',
          'Kept letter, SPJ, and LPJ requests on schedule by processing them through Google Forms.',
          'Supported the Executive Board by monitoring administrative compliance of proposals and accountability reports.',
          'Kept administrative documentation and inventory records up to date to support organizational operations.',
        ],
      },
      {
        org: 'ITS Robotics',
        role: 'Secretary II',
        period: 'Mar 2024 - Feb 2025',
        start: '2024-03',
        bullets: [
          'Supported internal and external needs by drafting official correspondence.',
          'Ensured administrative compliance by assisting in reviewing proposals, SPJ, and LPJ.',
          'Handled venue and equipment requests by coordinating administrative communication with scholarship providers and university facilities management.',
          'Preserved a clear record of meetings and assemblies by preparing meeting minutes and maintaining documentation.',
        ],
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
