import { Users } from 'lucide-react'
import { capabilityGroups, orgExperience } from '@/data/experience'
import { Reveal } from '@/components/Reveal'

export function Organization() {
  return (
    <section id="organization" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <Reveal as="h2" className="flex items-center gap-3 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
          <Users size={26} className="text-[var(--color-cyan)] shrink-0" />
          Beyond the code.
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 90} className="flex flex-col rounded-md border border-[var(--color-line)] p-7">
              <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">{group.title}</h3>

              {group.flow.length > 0 ? (
                <div className="mt-6 flex flex-col gap-3">
                  {group.flow.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? 'bg-[var(--color-cyan)]' : 'bg-[var(--color-line)]'}`}
                        aria-hidden="true"
                      />
                      <span className={`text-sm ${i === 0 ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper-dim)]'}`}>{step}</span>
                      {i < group.flow.length - 1 && <span className="sr-only"> then </span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                      {stat}
                    </span>
                  ))}
                </div>
              )}

              {group.flow.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-line-soft)] pt-5">
                  {group.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                      {stat}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-16">
          <p className="text-sm text-[var(--color-paper-dim)]">Organization experience</p>
          <div className="mt-4 grid gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
            {orgExperience.map((item) => (
              <div key={item.org} className="flex items-center justify-between gap-4 bg-[var(--color-ink)] px-6 py-5">
                <span className="text-sm font-medium text-[var(--color-paper)]">{item.org}</span>
                <span className="text-right text-xs text-[var(--color-paper-dim)]">{item.role}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
