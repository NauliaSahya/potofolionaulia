import { Code2, CalendarCheck, Users } from 'lucide-react'
import { about } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { MetricCounter } from '@/components/MetricCounter'

const pillarIcons = [Code2, CalendarCheck, Users]

export function About() {
  return (
    <section id="about" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal as="h2" className="font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
            {about.title}
          </Reveal>
          <Reveal delay={100} className="max-w-[52ch] text-xl leading-relaxed text-[var(--color-paper-dim)] md:text-2xl">
            {about.statement}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
          {about.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index]
            return (
              <Reveal
                key={pillar.verb}
                delay={index * 90}
                className="group relative bg-[var(--color-ink)] p-8 transition-colors duration-400 hover:bg-[var(--color-surface-raised)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-cyan)] transition-colors duration-300 group-hover:border-[var(--color-cyan)]/40">
                  <Icon size={18} />
                </div>
                <p className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-paper)] transition-colors duration-300 group-hover:text-[var(--color-cyan)]">
                  {pillar.verb}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">{pillar.detail}</p>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          {about.metrics.map((metric) => (
            <MetricCounter key={metric.label} value={metric.value} suffix={metric.suffix} label={metric.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
