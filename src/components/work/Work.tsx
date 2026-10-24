import { useCallback, useEffect, useState } from 'react'
import { Layers } from 'lucide-react'
import { projectList } from '@/data/projects'
import { qaProjects } from '@/data/qaProjects'
import { Reveal } from '@/components/Reveal'
import { ProjectCard } from '@/components/work/ProjectCard'
import { ProjectSIRJ } from '@/components/work/ProjectSIRJ'
import { ProjectCENIM } from '@/components/work/ProjectCENIM'
import { ProjectHiMe } from '@/components/work/ProjectHiMe'
import { ProjectMedicalCoding } from '@/components/work/ProjectMedicalCoding'
import { ProjectQA } from '@/components/work/ProjectQA'

type Category = 'projects' | 'qa'

const categories: { id: Category; label: string; count: number }[] = [
  { id: 'projects', label: 'Projects', count: projectList.length },
  { id: 'qa', label: 'QA Projects', count: qaProjects.length },
]

const projectDetails: Record<string, () => React.JSX.Element> = {
  sirj: () => <ProjectSIRJ />,
  cenim: () => <ProjectCENIM />,
  hime: () => <ProjectHiMe />,
  'medical-coding': () => <ProjectMedicalCoding />,
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function Work() {
  const [category, setCategory] = useState<Category>('projects')
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [pendingScroll, setPendingScroll] = useState<string | null>(null)

  // Deep links from the navbar dropdown: #project-<slug> opens that project,
  // #work-qa switches to the QA tab. The hash is reset afterwards so the same
  // link can be used again.
  const handleHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'work-qa') {
      setCategory('qa')
      setOpenSlug(null)
      setPendingScroll('work-tabs')
    } else if (hash === 'work-projects') {
      setCategory('projects')
      setPendingScroll('work-tabs')
    } else if (hash.startsWith('project-')) {
      const slug = hash.replace('project-', '')
      const isQA = qaProjects.some((p) => p.slug === slug)
      const isProject = projectList.some((p) => p.slug === slug)
      if (!isQA && !isProject) return
      setCategory(isQA ? 'qa' : 'projects')
      setOpenSlug(slug)
      setPendingScroll(`project-card-${slug}`)
    } else {
      return
    }
    window.history.replaceState(null, '', '#work')
  }, [])

  useEffect(() => {
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [handleHash])

  useEffect(() => {
    if (!pendingScroll) return
    const timer = window.setTimeout(() => {
      scrollToId(pendingScroll)
      setPendingScroll(null)
    }, 80)
    return () => window.clearTimeout(timer)
  }, [pendingScroll])

  const toggle = (slug: string) => setOpenSlug((current) => (current === slug ? null : slug))

  const switchCategory = (next: Category) => {
    setCategory(next)
    setOpenSlug(null)
  }

  return (
    <section id="work" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal as="h2" className="flex items-center gap-3 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
            <Layers size={26} className="text-[var(--color-cyan)] shrink-0" />
            Work
          </Reveal>
          <Reveal delay={80} className="max-w-[40ch] text-sm text-[var(--color-paper-dim)]">
            Healthcare systems, event technology, hospital operations, and software quality assurance.
          </Reveal>
        </div>

        <div id="work-tabs" className="mt-10 scroll-mt-24">
          <div role="tablist" aria-label="Kategori karya" className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
            {categories.map((item) => {
              const selected = category === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => switchCategory(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-[var(--color-cyan)] text-[var(--color-ink)]'
                      : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                  }`}
                >
                  {item.label}
                  <span className={`ml-2 font-mono text-[11px] ${selected ? 'opacity-70' : 'opacity-60'}`}>{item.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8" role="tabpanel">
          {category === 'projects' &&
            projectList.map((project, index) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                number={project.number}
                title={project.title}
                category={project.category}
                year={project.year}
                description={project.description}
                tech={project.tech}
                image={project.image}
                imageAlt={project.imageAlt}
                expanded={openSlug === project.slug}
                onToggle={() => toggle(project.slug)}
                delay={index * 60}
              >
                {projectDetails[project.slug]?.()}
              </ProjectCard>
            ))}

          {category === 'qa' && qaProjects.length > 0 &&
            qaProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                number={String(index + 1).padStart(2, '0')}
                title={project.title}
                category={project.category}
                year={project.year}
                description={project.description}
                tech={project.tools}
                expanded={openSlug === project.slug}
                onToggle={() => toggle(project.slug)}
                delay={index * 60}
              >
                <ProjectQA project={project} />
              </ProjectCard>
            ))}

          {category === 'qa' && qaProjects.length === 0 && (
            <Reveal className="rounded-md border border-dashed border-[var(--color-line)] px-6 py-14 text-center">
              <p className="font-[var(--font-display)] text-lg text-[var(--color-paper)]">QA projects are on the way</p>
              <p className="mx-auto mt-2 max-w-[44ch] text-sm text-[var(--color-paper-dim)]">
                Test plans, test cases, and bug reports from my QA learning journey will be added here.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
