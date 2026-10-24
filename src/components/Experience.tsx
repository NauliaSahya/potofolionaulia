import { useCallback, useEffect, useMemo, useState } from 'react'
import { Briefcase, Calendar } from 'lucide-react'
import {
  capabilityGroups,
  experienceCategories,
  type ExperienceCategoryId,
  type ExperienceEntry,
} from '@/data/experience'
import { Reveal } from '@/components/Reveal'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useInView } from '@/hooks/useInView'

type TabId = 'all' | ExperienceCategoryId

type FlatEntry = ExperienceEntry & { category: ExperienceCategoryId; categoryLabel: string }

type YearGroup = { year: string; items: FlatEntry[] }

const hashToTab: Record<string, TabId> = {
  'experience-all': 'all',
  'experience-internship': 'internship',
  'experience-volunteer': 'volunteer',
  'experience-organization': 'organization',
}

const flatEntries: FlatEntry[] = experienceCategories.flatMap((category) =>
  category.entries.map((entry) => ({ ...entry, category: category.id, categoryLabel: category.label })),
)

const tabs: { id: TabId; label: string; count: number; summary: string }[] = [
  { id: 'all', label: 'All', count: flatEntries.length, summary: 'The full journey, newest first. Each role sits under the year it ended.' },
  ...experienceCategories.map((category) => ({
    id: category.id as TabId,
    label: category.label,
    count: category.entries.length,
    summary: category.summary,
  })),
]

// Newest first: whichever role finished last is on top. Each entry sits under
// the marker of the year it ended, so a role running 2025-2026 appears between
// the 2026 and 2025 markers.
function groupByYear(entries: FlatEntry[]): YearGroup[] {
  const sorted = [...entries].sort((a, b) => b.end.localeCompare(a.end) || b.start.localeCompare(a.start))

  const groups: YearGroup[] = []
  for (const entry of sorted) {
    const year = entry.end.slice(0, 4)
    const last = groups[groups.length - 1]
    if (last && last.year === year) {
      last.items.push(entry)
    } else {
      groups.push({ year, items: [entry] })
    }
  }
  return groups
}

function TimelineItem({ entry, showCategory, index }: { entry: FlatEntry; showCategory: boolean; index: number }) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.3, rootMargin: '-15% 0px -25% 0px' })

  return (
    <li ref={ref} className="relative pl-9">
      <span
        className="absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-500"
        style={{
          borderColor: inView ? 'var(--color-cyan)' : 'var(--color-line)',
          backgroundColor: inView ? 'var(--color-cyan)' : 'var(--color-ink)',
        }}
        aria-hidden="true"
      />

      <Reveal delay={Math.min(index, 4) * 50}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${inView ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper-dim)]'}`}>
            <Calendar size={12} className="opacity-70" />
            {entry.period}
          </span>
          {showCategory && (
            <span className="rounded-full border border-[var(--color-line)] px-2.5 py-0.5 text-[10px] text-[var(--color-paper-dim)]">
              {entry.categoryLabel}
            </span>
          )}
        </div>

        <h3 className="mt-2 font-[var(--font-display)] text-lg font-medium text-[var(--color-paper)]">{entry.org}</h3>
        <p className="text-sm text-[var(--color-paper-dim)]">
          {entry.role}
          {entry.context && <span className="text-[var(--color-paper-dim)]/70"> · {entry.context}</span>}
        </p>

        <ul className="mt-3 flex max-w-[64ch] flex-col gap-2">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)]" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>

        {entry.images && entry.images.length > 0 && (
          <div className="mt-5 grid max-w-[40rem] gap-3 sm:grid-cols-2">
            {entry.images.map((image) => (
              <div key={image.src + image.alt} className="overflow-hidden rounded-md border border-[var(--color-line)]">
                <ImageWithFallback src={image.src} alt={image.alt} ratio="16 / 10" label={image.label} />
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </li>
  )
}

export function Experience() {
  const [active, setActive] = useState<TabId>('all')
  const { ref, progress } = useScrollProgress<HTMLDivElement>()

  // Deep links from the navbar dropdown, e.g. #experience-volunteer.
  const handleHash = useCallback(() => {
    const target = hashToTab[window.location.hash.replace('#', '')]
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

  const tab = tabs.find((item) => item.id === active) ?? tabs[0]

  const groups = useMemo(() => {
    const entries = active === 'all' ? flatEntries : flatEntries.filter((entry) => entry.category === active)
    return groupByYear(entries)
  }, [active])

  return (
    <section id="experience" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal as="h2" className="flex items-center gap-3 font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
            <Briefcase size={26} className="text-[var(--color-cyan)] shrink-0" />
            Experience
          </Reveal>
          <Reveal delay={80} className="max-w-[40ch] text-sm text-[var(--color-paper-dim)]">
            Internship, volunteer, and organization roles, laid out as a timeline.
          </Reveal>
        </div>

        <div className="mt-10">
          <div className="overflow-x-auto pb-1">
            <div role="tablist" aria-label="Kategori pengalaman" className="inline-flex min-w-max rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
              {tabs.map((item) => {
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
                    <span className={`ml-2 font-mono text-[11px] ${selected ? 'opacity-70' : 'opacity-60'}`}>{item.count}</span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        <p className="mt-6 text-sm text-[var(--color-paper-dim)]">{tab.summary}</p>

        <div ref={ref} key={active} role="tabpanel" className="relative mt-10">
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--color-line)]" aria-hidden="true" />
          <div
            className="absolute left-0 top-0 w-px bg-[var(--color-cyan)]"
            style={{ height: `${progress * 100}%`, transition: 'height 80ms linear' }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-12">
            {groups.map((group) => (
              <li key={group.year} className="relative">
                <div className="relative pl-9">
                  <span
                    className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-cyan)] bg-[var(--color-ink)]"
                    aria-hidden="true"
                  />
                  <p className="font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
                    {group.year}
                  </p>
                </div>

                <ul className="mt-8 flex flex-col gap-10">
                  {group.items.map((entry, entryIndex) => (
                    <TimelineItem
                      key={`${entry.org}-${entry.role}-${entry.period}`}
                      entry={entry}
                      showCategory={active === 'all'}
                      index={entryIndex}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {active === 'organization' && (
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
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
