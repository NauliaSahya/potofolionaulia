import { Layers } from 'lucide-react'
import { projectList } from '@/data/projects'
import { Reveal } from '@/components/Reveal'
import { ProjectCard } from '@/components/work/ProjectCard'

export function Work() {
  const [featured, ...rest] = projectList

  return (
    <section id="work" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal as="h2" className="flex items-center gap-3 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
            <Layers size={26} className="text-[var(--color-cyan)] shrink-0" />
            Selected work
          </Reveal>
          <Reveal delay={80} className="max-w-[36ch] text-sm text-[var(--color-paper-dim)]">
            Four projects spanning healthcare systems, event technology, and hospital operations.
          </Reveal>
        </div>

        <div className="mt-12">
          <ProjectCard project={featured} featured />
          {rest.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={(index + 1) * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
