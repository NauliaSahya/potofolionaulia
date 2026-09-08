import { ExternalLink } from 'lucide-react'
import { sirj } from '@/data/projects'
import { Reveal } from '@/components/Reveal'
import { SIRJWebShowcase } from './SIRJWebShowcase'
import { useInView } from '@/hooks/useInView'

function ArchitectureDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })

  const box = 'rounded-sm border border-[var(--color-line)] bg-[var(--color-surface-raised)] px-4 py-3 text-center'

  return (
    <div ref={ref} className="relative rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:p-10">
      <div className="mx-auto flex max-w-md flex-col items-center gap-0">
        <div className={`${box} w-full`}>
          <p className="text-sm font-medium text-[var(--color-paper)]">Web System</p>
        </div>

        <Connector active={inView} />

        <div className={`${box} w-full`}>
          <p className="text-sm font-medium text-[var(--color-paper)]">REST API</p>
        </div>

        <Connector active={inView} />

        <div className="grid w-full grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-0">
            <div className={`${box} w-full`}>
              <p className="text-sm font-medium text-[var(--color-paper)]">MySQL</p>
            </div>
            <Connector active={inView} short />
            <div className={`${box} w-full`}>
              <p className="text-xs text-[var(--color-paper-dim)]">Administrative Data</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-0">
            <div className={`${box} w-full`}>
              <p className="text-sm font-medium text-[var(--color-paper)]">MongoDB</p>
            </div>
            <Connector active={inView} short />
            <div className={`${box} w-full`}>
              <p className="text-xs text-[var(--color-paper-dim)]">Clinical Observation</p>
            </div>
          </div>
        </div>

        <Connector active={inView} />

        <div className={`${box} w-full border-[var(--color-cyan)]/50`}>
          <p className="text-sm font-medium text-[var(--color-cyan)]">HL7 FHIR R4</p>
        </div>
      </div>
    </div>
  )
}

function Connector({ active, short = false }: { active: boolean; short?: boolean }) {
  const height = short ? 20 : 28
  return (
    <svg width="2" height={height} className="overflow-visible" aria-hidden="true">
      <line
        x1="1"
        y1="0"
        x2="1"
        y2={height}
        stroke="var(--color-cyan)"
        strokeWidth="2"
        strokeDasharray={height}
        strokeDashoffset={active ? 0 : height}
        style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
      />
    </svg>
  )
}

export function ProjectSIRJ() {
  return (
    <section id="project-sirj" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Reveal className="font-mono text-xs text-[var(--color-cyan)]">01 · Selected work</Reveal>
            <Reveal as="h2" delay={60} className="mt-4 font-[var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-paper)] md:text-5xl">
              {sirj.title}
            </Reveal>
            <Reveal delay={120} className="mt-4 max-w-[50ch] text-lg leading-snug text-[var(--color-paper-dim)]">
              {sirj.fullTitle}
            </Reveal>
            <Reveal delay={160} className="mt-5 flex flex-wrap gap-2">
              {sirj.category.map((c) => (
                <span key={c} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                  {c}
                </span>
              ))}
            </Reveal>
            <Reveal delay={200} className="mt-4 text-sm text-[var(--color-paper-dim)]">{sirj.date}</Reveal>
          </div>

          <Reveal delay={100} className="text-base leading-relaxed text-[var(--color-paper-dim)]">
            <p>{sirj.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {sirj.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper)]">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-16">
          <ArchitectureDiagram />
        </Reveal>

        <Reveal delay={80} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {sirj.results.map((r) => (
            <div key={r.label} className="border-l border-[var(--color-line)] pl-4">
              <div className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-paper)] sm:text-3xl">{r.value}</div>
              <div className="mt-1 text-xs leading-snug text-[var(--color-paper-dim)]">{r.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={60} className="mt-16">
          <SIRJWebShowcase />
        </Reveal>

        <Reveal delay={60} className="mt-10 flex flex-wrap gap-3">
          {sirj.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-line)] px-5 py-2.5 text-sm text-[var(--color-paper)] transition-colors duration-300 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
            >
              {link.label}
              <ExternalLink size={13} className="text-[var(--color-cyan)]" />
            </a>
          ))}
        </Reveal>

        <Reveal delay={80} className="mt-8 max-w-[60ch] text-xs leading-relaxed text-[var(--color-paper-dim)]">
          {sirj.disclaimer}
        </Reveal>
      </div>
    </section>
  )
}
