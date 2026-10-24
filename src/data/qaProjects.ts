export type QAProject = {
  slug: string
  title: string
  category: string
  year: string
  description: string
  tools: string[]
  testTypes: string[]
  highlights: { value: string; label: string }[]
  scope: string[]
  links?: { label: string; href: string }[]
}

/**
 * Isi project QA di sini. Setiap entri otomatis muncul di tab "QA Projects",
 * di dropdown navbar Work, dan bisa dibuka dengan "See more".
 *
 * Contoh bentuk data (hapus tanda komentar dan isi dengan project asli):
 *
 * {
 *   slug: 'nama-project',
 *   title: 'Nama Project',
 *   category: 'Manual Testing · Web Application',
 *   year: '2026',
 *   description: 'Ringkasan singkat: apa yang diuji dan hasil akhirnya.',
 *   tools: ['Postman', 'Jira', 'Selenium'],
 *   testTypes: ['Functional', 'Regression', 'API'],
 *   highlights: [{ value: '120', label: 'test cases' }, { value: '18', label: 'bugs found' }],
 *   scope: ['Login & registrasi', 'Alur checkout'],
 *   links: [{ label: 'Test report', href: 'https://...' }],
 * },
 */
export const qaProjects: QAProject[] = []
