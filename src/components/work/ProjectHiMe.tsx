import { useState } from 'react'
import { hime } from '@/data/projects'
import { Reveal } from '@/components/Reveal'
import { HiMeShowcase } from './HiMeShowcase'

export function ProjectHiMe() {
  const [activeParam, setActiveParam] = useState<string | null>(null)

  return (
    <div id="project-hime" className="pb-4 pt-2 md:pb-8">
      <div>
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Reveal className="font-mono text-xs text-[var(--color-cyan)]">Case study</Reveal>
            <Reveal as="h2" delay={60} className="mt-4 font-[var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-paper)] md:text-5xl">
              {hime.title}
            </Reveal>
            <Reveal delay={120} className="mt-3 text-lg text-[var(--color-paper-dim)]">{hime.subtitle}</Reveal>
          </div>
          <Reveal delay={100} className="text-base leading-relaxed text-[var(--color-paper-dim)]">
            <p>{hime.description}</p>
            <p className="mt-4 text-sm text-[var(--color-cyan)]">{hime.relatedNote}</p>
          </Reveal>
        </div>

        {/* Interactive Showcase: Web Platform & Device UI with Zoom Modal */}
        <Reveal delay={60} className="mt-16">
          <HiMeShowcase />
        </Reveal>

        {/* Screening Parameters & System Integration */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-md border border-[var(--color-line)] p-6 md:p-8">
            <p className="mb-6 text-sm text-[var(--color-paper-dim)]">Screening parameters</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {hime.parameters.map((param) => {
                const isActive = activeParam === param.label
                return (
                  <button
                    key={param.label}
                    type="button"
                    onMouseEnter={() => setActiveParam(param.label)}
                    onMouseLeave={() => setActiveParam((current) => (current === param.label ? null : current))}
                    onFocus={() => setActiveParam(param.label)}
                    onBlur={() => setActiveParam((current) => (current === param.label ? null : current))}
                    onClick={() => setActiveParam((current) => (current === param.label ? null : param.label))}
                    className={`relative flex flex-col items-start gap-1 rounded-sm border px-3 py-3 text-left transition-colors duration-300 ${
                      isActive ? 'border-[var(--color-cyan)] bg-[var(--color-surface-raised)]' : 'border-[var(--color-line)]'
                    }`}
                    aria-expanded={isActive}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[var(--color-cyan)]' : 'bg-[var(--color-line)]'}`} aria-hidden="true" />
                    <span className="text-xs font-medium text-[var(--color-paper)]">{param.label}</span>
                    <span className="font-mono text-[10px] text-[var(--color-paper-dim)]">{param.unit}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-4 min-h-[2.5rem] text-xs leading-relaxed text-[var(--color-paper-dim)]">
              {activeParam
                ? hime.parameters.find((p) => p.label === activeParam)?.note
                : 'Hover or focus a parameter to see what it measures.'}
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-md border border-[var(--color-line)] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <p className="mb-5 text-sm text-[var(--color-paper-dim)]">Where it fits</p>
              <div className="flex flex-col gap-3">
                {hime.flow.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--color-cyan)]">{String(index + 1).padStart(2, '0')}</span>
                    <span className={`text-sm ${index === 0 ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper)]'}`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 border-t border-[var(--color-line)] pt-4 text-xs leading-relaxed text-[var(--color-paper-dim)]">
              Real-time synchronization between bedside / self-screening terminal and hospital electronic health record systems.
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
