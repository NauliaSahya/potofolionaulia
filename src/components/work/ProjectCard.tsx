import { ArrowRight } from 'lucide-react'
import type { ProjectSummary } from '@/data/projects'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Reveal } from '@/components/Reveal'

type ProjectCardProps = {
  project: ProjectSummary
  featured?: boolean
  delay?: number
}

export function ProjectCard({ project, featured = false, delay = 0 }: ProjectCardProps) {
  const detailHref = `#project-${project.slug}`

  return (
    <Reveal delay={delay}>
      <a
        href={detailHref}
        className={`group relative grid gap-6 border-t border-[var(--color-line)] py-10 transition-transform duration-400 ease-out first:border-t-0 hover:-translate-y-1.5 md:gap-10 md:py-12 ${
          featured ? 'md:grid-cols-[0.85fr_1.15fr] md:items-center' : 'md:grid-cols-[0.6fr_1fr] md:items-center'
        }`}
      >
        <div className={featured ? 'order-2 md:order-1' : 'order-2 md:order-1'}>
          <span className="font-mono text-xs text-[var(--color-cyan)]">{project.number}</span>
          <h3
            className={`mt-3 font-[var(--font-display)] font-medium tracking-tight text-[var(--color-paper)] transition-transform duration-500 ease-out group-hover:-translate-y-0.5 ${
              featured ? 'text-3xl md:text-4xl' : 'text-2xl'
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-paper-dim)]">
            {project.category} <span className="text-[var(--color-line)]">·</span> {project.year}
          </p>
          <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-[var(--color-paper-dim)]">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)] transition-colors duration-300 group-hover:border-[var(--color-line)]">
                {tech}
              </span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-cyan)]">
            View case study
            <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </div>

        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-md border border-[var(--color-line)] transition-[border-color,box-shadow] duration-400 group-hover:border-[var(--color-cyan)]/40 group-hover:shadow-[var(--shadow-glow-cyan)]">
            <ImageWithFallback
              src={project.image}
              alt={project.imageAlt}
              ratio={featured ? '16 / 10' : '16 / 11'}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </a>
    </Reveal>
  )
}
