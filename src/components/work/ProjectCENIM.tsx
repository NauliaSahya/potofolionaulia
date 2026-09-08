import { ExternalLink } from 'lucide-react'
import { cenim } from '@/data/projects'
import { Reveal } from '@/components/Reveal'
import { BrowserFrame } from '@/components/BrowserFrame'
import { ImageWithFallback } from '@/components/ImageWithFallback'

export function ProjectCENIM() {
  return (
    <section id="project-cenim" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Reveal className="font-mono text-xs text-[var(--color-cyan)]">02 · Selected work</Reveal>
            <Reveal as="h2" delay={60} className="mt-4 font-[var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-paper)] md:text-5xl">
              {cenim.title}
            </Reveal>
            <Reveal delay={120} className="mt-3 text-lg text-[var(--color-paper-dim)]">{cenim.subtitle}</Reveal>
            <Reveal delay={160} className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[var(--color-paper-dim)]">{cenim.context}</Reveal>
          </div>

          <Reveal delay={100} className="text-base leading-relaxed text-[var(--color-paper-dim)]">
            <p>{cenim.description}</p>
            <p className="mt-4 text-sm italic text-[var(--color-paper-dim)]/80">{cenim.templateNote}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {cenim.roles.map((role) => (
                <span key={role} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper)]">
                  {role}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cenim.tech.map((t) => (
                <span key={t} className="rounded-full border border-[var(--color-line-soft)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal className="rounded-md border border-[var(--color-line)] p-8">
            <p className="text-sm text-[var(--color-paper-dim)]">Team structure</p>
            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <TeamNode label="Organizing Committee" detail={cenim.team.committee} />
              <TeamArrow />
              <TeamNode label="Panitia Inti Mahasiswa" detail={`${cenim.team.core} Panitia Inti`} />
              <TeamArrow />
              <TeamNode label="Staff Mahasiswa" detail={`${cenim.team.staff} Staff Terkoordinasi`} accent />
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-md border border-[var(--color-line)] p-8">
            <p className="text-sm text-[var(--color-paper-dim)]">Delivery timeline</p>
            <ol className="mt-6 flex flex-col gap-4">
              {cenim.timeline.map((step, index) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--color-cyan)]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
                  <span className="text-sm text-[var(--color-paper)]">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 items-start">
          <Reveal delay={40} className="group">
            <BrowserFrame url="elib.its.ac.id/conf/cenim/2025">
              <ImageWithFallback
                src={cenim.images.home}
                alt="CENIM 2025 conference website"
                ratio="16 / 10"
                className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                label="Conference website"
              />
            </BrowserFrame>
          </Reveal>
          <Reveal delay={80} className="group overflow-hidden rounded-lg border border-[var(--color-line)] shadow-[var(--shadow-card)]">
            <ImageWithFallback
              src={cenim.images.event}
              alt="CENIM 2025 conference event"
              ratio="16 / 10"
              className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              label="Event day"
            />
          </Reveal>
        </div>

        <Reveal delay={60} className="mt-10">
          <a
            href={cenim.officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-line)] px-5 py-2.5 text-sm text-[var(--color-paper)] transition-colors duration-300 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
          >
            Visit CENIM Website
            <ExternalLink size={14} className="text-[var(--color-cyan)]" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function TeamNode({ label, detail, accent = false }: { label: string; detail?: string; accent?: boolean }) {
  return (
    <div className={`w-full rounded-sm border px-4 py-3 ${accent ? 'border-[var(--color-cyan)]/50' : 'border-[var(--color-line)]'}`}>
      <p className={`text-sm font-medium ${accent ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper)]'}`}>{label}</p>
      {detail && <p className="mt-0.5 text-xs text-[var(--color-paper-dim)]">{detail}</p>}
    </div>
  )
}

function TeamArrow() {
  return (
    <svg width="2" height="22" aria-hidden="true">
      <line x1="1" y1="0" x2="1" y2="22" stroke="var(--color-line)" strokeWidth="2" />
    </svg>
  )
}
