import { ArrowUpRight } from 'lucide-react'
import type { QAProject } from '@/data/qaProjects'
import { Reveal } from '@/components/Reveal'

export function ProjectQA({ project }: { project: QAProject }) {
  return (
    <div id={`project-${project.slug}`} className="pb-4 pt-2 md:pb-8">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <Reveal className="font-mono text-xs text-[var(--color-cyan)]">QA case study</Reveal>
          <Reveal as="h3" delay={60} className="mt-4 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
            {project.title}
          </Reveal>
          <Reveal delay={120} className="mt-3 text-base text-[var(--color-paper-dim)]">
            {project.category} <span className="text-[var(--color-line)]">·</span> {project.year}
          </Reveal>
        </div>
        <Reveal delay={100} className="text-base leading-relaxed text-[var(--color-paper-dim)]">
          <p>{project.description}</p>
        </Reveal>
      </div>

      {project.highlights.length > 0 && (
        <Reveal className="mt-10 grid gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {project.highlights.map((item) => (
            <div key={item.label} className="bg-[var(--color-ink)] px-6 py-6">
              <p className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-paper)]">{item.value}</p>
              <p className="mt-1 text-xs text-[var(--color-paper-dim)]">{item.label}</p>
            </div>
          ))}
        </Reveal>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Reveal className="rounded-md border border-[var(--color-line)] p-6">
          <p className="text-sm text-[var(--color-paper-dim)]">Scope</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {project.scope.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-paper)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={60} className="rounded-md border border-[var(--color-line)] p-6">
          <p className="text-sm text-[var(--color-paper-dim)]">Test types</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.testTypes.map((item) => (
              <span key={item} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="rounded-md border border-[var(--color-line)] p-6">
          <p className="text-sm text-[var(--color-paper-dim)]">Tools</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tools.map((item) => (
              <span key={item} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {project.links && project.links.length > 0 && (
        <Reveal className="mt-8 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-paper)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </Reveal>
      )}
    </div>
  )
}
