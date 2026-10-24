import { useCallback, useEffect, useState } from 'react'
import { Briefcase } from 'lucide-react'
import { capabilityGroups, experienceCategories, type ExperienceCategoryId } from '@/data/experience'
import { Reveal } from '@/components/Reveal'

const hashToCategory: Record<string, ExperienceCategoryId> = {
  'experience-internship': 'internship',
  'experience-volunteer': 'volunteer',
  'experience-organization': 'organization',
}

export function Experience() {
  const [active, setActive] = useState<ExperienceCategoryId>('internship')

  // Deep links from the navbar dropdown, e.g. #experience-volunteer.
  const handleHash = useCallback(() => {
    const target = hashToCategory[window.location.hash.replace('#', '')]
    if (!target) return
    setActive(target)
    window.history.replaceState(null, '', '#experience')
    window.setTimeout(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('experience')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }, 60)
  }, [])

  useEffect(() => {
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [handleHash])

  const category = experienceCategories.find((item) => item.id === active) ?? experienceCategories[0]

  return (
    <section id="experience" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal as="h2" className="flex items-center gap-3 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
            <Briefcase size={26} className="text-[var(--color-cyan)] shrink-0" />
            Experience
          </Reveal>
          <Reveal delay={80} className="max-w-[40ch] text-sm text-[var(--color-paper-dim)]">
            Internship, volunteer, and organization roles, grouped so each one is easy to find.
          </Reveal>
        </div>

        <div className="mt-10 overflow-x-auto pb-1">
          <div role="tablist" aria-label="Kategori pengalaman" className="inline-flex min-w-max rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
            {experienceCategories.map((item) => {
              const selected = item.id === active
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-[var(--color-cyan)] text-[var(--color-ink)]'
                      : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                  }`}
                >
                  {item.label}
                  <span className={`ml-2 font-mono text-[11px] ${selected ? 'opacity-70' : 'opacity-60'}`}>{item.entries.length}</span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-6 text-sm text-[var(--color-paper-dim)]">{category.summary}</p>

        <ul key={category.id} role="tabpanel" className="mt-4 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {category.entries.map((entry) => (
            <li key={`${entry.org}-${entry.role}-${entry.period}`} className="grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <span className="font-mono text-xs text-[var(--color-cyan)] sm:pt-1.5">{entry.period}</span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">{entry.org}</h3>
                <p className="mt-0.5 text-sm text-[var(--color-paper-dim)]">{entry.role}</p>
                {entry.detail && (
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[var(--color-paper-dim)]">{entry.detail}</p>
                )}
                {entry.bullets && (
                  <ul className="mt-3 flex max-w-[60ch] flex-col gap-2">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)]" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        {active === 'organization' && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {capabilityGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 90} className="flex flex-col rounded-md border border-[var(--color-line)] p-7">
                <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">{group.title}</h3>

                {group.flow.length > 0 && (
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
                )}

                <div
                  className={`flex flex-wrap gap-2 ${group.flow.length > 0 ? 'mt-6 border-t border-[var(--color-line-soft)] pt-5' : 'mt-6'}`}
                >
                  {group.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                      {stat}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
