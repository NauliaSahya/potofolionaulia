import { assets } from './assets'

export type ProjectSummary = {
  number: string
  slug: string
  title: string
  category: string
  year: string
  description: string
  tech: string[]
  image: string
  imageAlt: string
}

export const projectList: ProjectSummary[] = [
  {
    number: '01',
    slug: 'sirj',
    title: 'SIRJ',
    category: 'Medical Informatics · Healthcare Technology',
    year: '2026',
    description:
      'A web-based outpatient information system integrating self-screening data with outpatient workflows, built on a hybrid database and HL7 FHIR R4.',
    tech: ['Python', 'PHP', 'MySQL', 'MongoDB', 'HL7 FHIR R4'],
    image: assets.projects.sirj.admin,
    imageAlt: 'SIRJ outpatient information system web portal interface',
  },
  {
    number: '02',
    slug: 'cenim',
    title: 'CENIM 2025',
    category: 'Event Coordination · Website Implementation',
    year: '2025',
    description:
      'Contributed to the CENIM 2025 conference website and supported event coordination alongside faculty and 3 core student committee members, coordinating 12 student staff.',
    tech: ['HTML', 'CSS', 'PHP'],
    image: assets.projects.cenim.home,
    imageAlt: 'CENIM 2025 conference website homepage shown in a browser frame',
  },
  {
    number: '03',
    slug: 'hime',
    title: 'Hi-Me!',
    category: 'Healthcare UI · Smart Screening',
    year: '2025',
    description:
      'UI and interface contribution for an integrated smart health screening ecosystem, presenting live vitals in a single dashboard.',
    tech: ['Figma', 'UI Design', 'Health Data'],
    image: assets.projects.hime.ui,
    imageAlt: 'Hi-Me smart health screening dashboard interface',
  },
  {
    number: '04',
    slug: 'medical-coding',
    title: 'Medical Coding Workflow',
    category: 'Hospital Administration · Process Design',
    year: '2025',
    description:
      'Analyzed hospital administrative workflows at RS Primasatya Husada Citra and identified inefficiencies in medical coding processes.',
    tech: ['Figma', 'Microsoft Excel', 'Process Design'],
    image: assets.projects.hospital.figma,
    imageAlt: 'Figma prototype of a proposed medical coding workflow tool',
  },
]

// ---------------------------------------------------------------------------
// SIRJ
// ---------------------------------------------------------------------------
export const sirj = {
  title: 'SIRJ',
  fullTitle:
    'Web-Based Outpatient Information System with Self-Screening Integration Using Hybrid Database and HL7 FHIR R4',
  category: ['Medical Informatics', 'Healthcare Technology', 'Web System'],
  date: 'February 2026 - August 2026',
  description:
    'Developed a web-based outpatient information system integrating patient self-screening data with outpatient workflows, using a hybrid database architecture and HL7 FHIR R4 for healthcare interoperability.',
  stack: ['Python', 'PHP', 'HTML', 'CSS', 'REST API', 'MySQL', 'MongoDB', 'HL7 FHIR R4', 'Figma'],
  results: [
    { value: '8,479 req/s', label: 'hybrid architecture' },
    { value: '<40 ms', label: 'FHIR resource generation latency' },
    { value: '12,401', label: 'documents validated' },
    { value: '100%', label: 'functional and security scenarios passed' },
  ],
  portals: [
    {
      id: 'admin',
      name: 'Portal Admin',
      role: 'Staff & Patient Administration',
      description: 'Manages patient queues, outpatient admissions, and administrative clinic workflows.',
      url: 'bme.its.ac.id/informatics/sirj_staff/',
      image: assets.projects.sirj.admin,
      alt: 'SIRJ Admin Portal Interface',
      tag: '01 · Administration',
    },
    {
      id: 'dokter',
      name: 'Portal Dokter',
      role: 'Clinical Assessment & Examination',
      description: 'Clinical interface for physicians to review screening data, diagnose, and record examination notes.',
      url: 'bme.its.ac.id/informatics/sirj_staff/doctor',
      image: assets.projects.sirj.dokter,
      alt: 'SIRJ Doctor Clinical Portal Interface',
      tag: '02 · Doctor Clinical',
    },
    {
      id: 'pasien',
      name: 'Portal Pasien',
      role: 'Patient Self-Screening & Triage',
      description: 'Patient-facing self-screening interface for independent vital signs input and outpatient triage.',
      url: 'bme.its.ac.id/informatics/sirj_patient/',
      image: assets.projects.sirj.pasien,
      alt: 'SIRJ Patient Self-Screening Portal Interface',
      tag: '03 · Patient Portal',
    },
  ],
  images: {
    admin: assets.projects.sirj.admin,
    dokter: assets.projects.sirj.dokter,
    pasien: assets.projects.sirj.pasien,
    staff: assets.projects.sirj.staff,
    patient: assets.projects.sirj.patient,
    fhir: assets.projects.sirj.fhir,
    architecture: assets.projects.sirj.architecture,
  },
  links: [
    { label: 'View Staff Portal', href: 'https://bme.its.ac.id/informatics/sirj_staff/' },
    { label: 'View Patient Portal', href: 'https://bme.its.ac.id/informatics/sirj_patient/' },
    { label: 'View FHIR Client', href: 'https://bme.its.ac.id/informatics/sirj_fhir/' },
  ],
  disclaimer:
    'Developed as part of a final-year project team; this page reflects the systems and integration work contributed to, not sole ownership of every component.',
}

// ---------------------------------------------------------------------------
// CENIM 2025
// ---------------------------------------------------------------------------
export const cenim = {
  title: 'CENIM 2025',
  subtitle: 'Conference Website & Event Coordination',
  officialSite: 'https://elib.its.ac.id/conf/cenim/2025/',
  context:
    'International Conference on Computer Engineering, Network and Intelligent Multimedia.',
  roles: ['Event Coordination', 'Website Implementation', 'Rundown Coordination', 'Staff Coordination'],
  tech: ['HTML', 'CSS', 'PHP'],
  description:
    'Contributed to the implementation of the CENIM 2025 conference website and supported event operations alongside faculty committee (Dosen & Tendik), collaborating with 3 core student committee members and coordinating 12 student staff.',
  templateNote: 'Built on a pre-existing conference template, adapted and implemented for CENIM 2025.',
  team: {
    committee: 'Dosen & Tendik',
    core: 3,
    staff: 12,
  },
  timeline: ['Planning', 'Rundown', 'Website', 'Coordination', 'Conference'],
  images: {
    home: assets.projects.cenim.home,
    schedule: assets.projects.cenim.schedule,
    event: assets.projects.cenim.event,
  },
}

// ---------------------------------------------------------------------------
// Hi-Me!
// ---------------------------------------------------------------------------
export const hime = {
  title: 'Hi-Me!',
  subtitle: 'Smart Health Screening Ecosystem',
  description:
    'UI and interface contribution for an integrated smart health screening ecosystem, translating live vitals from embedded screening devices into real-time web dashboards.',
  parameters: [
    { label: 'Heart Rate', unit: 'bpm', note: 'Continuous pulse monitoring from the screening device.' },
    { label: 'Respiratory Rate', unit: 'rpm', note: 'Breaths per minute, tracked during screening.' },
    { label: 'Blood Pressure', unit: 'mmHg', note: 'Systolic / diastolic reading.' },
    { label: 'Blood Oxygen', unit: '%SpO₂', note: 'Peripheral oxygen saturation.' },
    { label: 'Temperature', unit: '°C', note: 'Body temperature at time of screening.' },
    { label: 'Height', unit: 'cm', note: 'Recorded anthropometric measurement.' },
    { label: 'Weight', unit: 'kg', note: 'Recorded anthropometric measurement.' },
    { label: 'Blood Glucose', unit: 'mg/dL', note: 'Point-of-care glucose reading.' },
  ],
  screens: {
    device: [
      {
        id: 'device-1',
        title: 'Device UI · Measurement Screen',
        caption: 'Touchscreen interface for real-time patient biometric measurement and sensor status.',
        image: assets.projects.hime.ui1,
        alt: 'Hi-Me screening device measurement interface',
        tag: 'Device UI 01',
      },
      {
        id: 'device-2',
        title: 'Device UI · Screening Summary',
        caption: 'Triage overview screen displaying consolidated vital statistics upon measurement completion.',
        image: assets.projects.hime.ui2,
        alt: 'Hi-Me screening device summary interface',
        tag: 'Device UI 02',
      },
    ],
    web: [
      {
        id: 'web-1',
        title: 'Web Platform · Telemetry Overview',
        caption: 'Web dashboard monitoring live patient queues and synchronized screening vitals.',
        url: 'hime.health/dashboard/telemetry',
        image: assets.projects.hime.web1,
        alt: 'Hi-Me web platform telemetry overview dashboard',
        tag: 'Web Dashboard 01',
      },
      {
        id: 'web-2',
        title: 'Web Platform · Patient Records & Analytics',
        caption: 'Detailed patient screening profile, historical comparisons, and clinical triage exports.',
        url: 'hime.health/screening/analytics',
        image: assets.projects.hime.web2,
        alt: 'Hi-Me web platform patient records and analytics',
        tag: 'Web Dashboard 02',
      },
    ],
  },
  images: {
    ui1: assets.projects.hime.ui1,
    ui2: assets.projects.hime.ui2,
    web1: assets.projects.hime.web1,
    web2: assets.projects.hime.web2,
    ui: assets.projects.hime.web2,
    device: assets.projects.hime.ui1,
  },
  flow: ['Hi-Me! Device', 'Health Screening', 'Digital Patient Data', 'Healthcare Information System'],
  relatedNote: 'Related to SIRJ: both sit within the same digital healthcare workflow.',
}

// ---------------------------------------------------------------------------
// Medical Coding Workflow
// ---------------------------------------------------------------------------
export const medicalCoding = {
  title: 'Medical Coding Workflow',
  subtitle: 'Hospital Administration & Digital Process Optimization',
  organization: 'RS Primasatya Husada Citra',
  role: 'Hospital Administration Intern',
  date: 'July 2025 - August 2025',
  description:
    'Analyzed hospital administrative workflows and identified inefficiencies in medical coding processes. Proposed streamlined digital workflows and presented findings directly to hospital leadership.',
  contributions: [
    'Workflow analysis',
    'Requirement gathering',
    'Digital solution design',
    'Figma prototyping',
    'Excel-based data processing',
    'Executive stakeholder presentation',
  ],
  stakeholders: [
    'Customer Service',
    'Divisi IT (Information Technology)',
    'Rekam Medis (Medical Records)',
    'Komite Koordinasi Pendidikan (Komkordik)',
  ],
  flow: ['Observe', 'Analyze', 'Design', 'Prototype'],
  diagrams: [
    {
      id: 'flow-1',
      title: 'Workflow Analisis Alur Medical Coding 01',
      subtitle: 'Pemetaan proses alur rekam medis rawat jalan dan titik hambatan administratif',
      image: assets.projects.hospital.flow1,
      alt: 'Diagram alur proses analisis medical coding RS PHC bagian 1',
      tag: 'Workflow Analysis 01',
    },
    {
      id: 'flow-2',
      title: 'Workflow Rekomendasi Solusi Digital 02',
      subtitle: 'Rancangan digitalisasi verifikasi berkas dan integrasi bridging coding sistem',
      image: assets.projects.hospital.flow2,
      alt: 'Diagram alur rekomendasi solusi digital medical coding RS PHC bagian 2',
      tag: 'Workflow Analysis 02',
    },
  ],
  documentation: [
    {
      id: 'kegiatan-pagi',
      title: 'Aktivitas Kerja Praktik & Observasi Lapangan',
      subtitle: 'RS Primasatya Husada Citra',
      description:
        'Observasi alur pelayanan pasien, pencatatan rekam medis, dan koordinasi administratif harian di lingkungan rumah sakit.',
      image: assets.projects.hospital.kegiatanPagi,
      alt: 'Foto kegiatan observasi kerja praktik pagi hari di RS Primasatya Husada Citra',
      tag: 'Kegiatan Lapangan',
    },
    {
      id: 'presentasi-1',
      title: 'Presentasi Akhir Proyek di Ruang Rapat',
      subtitle: 'Pemaparan Analisis & Evaluasi Alur',
      description:
        'Penyampaian hasil temuan hambatan koding dan rancangan alur digital kepada jajaran pimpinan unit rumah sakit.',
      image: assets.projects.hospital.presentasi1,
      alt: 'Foto presentasi akhir kerja praktik di ruang rapat RS PHC',
      tag: 'Presentasi Akhir',
    },
    {
      id: 'presentasi-2',
      title: 'Diskusi & Validasi bersama Pimpinan Unit',
      subtitle: 'Customer Service, IT, Rekam Medis, dan Komkordik',
      description:
        'Sesi diskusi mendalam, peninjauan kelayakan implementasi, serta umpan balik dari para kepala divisi rumah sakit.',
      image: assets.projects.hospital.presentasi2,
      alt: 'Foto sesi diskusi dan validasi hasil analisis bersama atasan dan pimpinan RS PHC',
      tag: 'Validasi Stakeholder',
    },
  ],
  images: {
    flow1: assets.projects.hospital.flow1,
    flow2: assets.projects.hospital.flow2,
    kegiatanPagi: assets.projects.hospital.kegiatanPagi,
    presentasi1: assets.projects.hospital.presentasi1,
    presentasi2: assets.projects.hospital.presentasi2,
    figma: assets.projects.hospital.flow1,
  },
}
