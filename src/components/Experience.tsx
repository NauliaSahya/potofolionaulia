import { Briefcase, Calendar } from 'lucide-react'
import { timeline, type TimelineEntry } from '@/data/experience'
import { Reveal } from '@/components/Reveal'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useInView } from '@/hooks/useInView'

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.4, rootMargin: '-15% 0px -30% 0px' })

  return (
    <li ref={ref} className="relative pl-9">
      <span
        className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-400"
        style={{
          borderColor: inView ? 'var(--color-cyan)' : 'var(--color-line)',
          backgroundColor: inView ? 'var(--color-cyan)' : 'var(--color-ink)',
        }}
        aria-hidden="true"
      />

      <Reveal delay={Math.min(index, 6) * 60}>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-5">
          <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${inView ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper-dim)]'}`}>
            <Calendar size={12} className="opacity-70" />
            {entry.year}
          </span>
          <div className="flex-1">
            <span className="block font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">{entry.org}</span>
            <span className="block text-sm text-[var(--color-paper-dim)]">{entry.role}</span>
            {entry.detail && (
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[var(--color-paper-dim)]">{entry.detail}</p>
            )}
          </div>
        </div>
      </Reveal>
    </li>
  )
}

export function Experience() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>()

  return (
    <section id="experience" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <Reveal as="h2" className="flex items-center gap-3 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
          <Briefcase size={26} className="text-[var(--color-cyan)] shrink-0" />
          Where I learned to make things work.
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--color-line)]" aria-hidden="true" />
          <div
            className="absolute left-0 top-0 w-px bg-[var(--color-cyan)]"
            style={{ height: `${progress * 100}%`, transition: 'height 80ms linear' }}
            aria-hidden="true"
          />

          <ul className="flex flex-col gap-10 md:gap-12">
            {timeline.map((entry, index) => (
              <TimelineItem key={`${entry.year}-${entry.org}`} entry={entry} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
