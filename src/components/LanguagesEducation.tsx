import { Languages, GraduationCap, Award } from 'lucide-react'
import { languages, education, honors } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { useInView } from '@/hooks/useInView'

function LanguageBar({ name, scoreLabel, score, max }: (typeof languages)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const pct = Math.round((score / max) * 100)

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-[var(--color-paper)]">{name}</span>
        <span className="font-mono text-xs text-[var(--color-paper-dim)]">
          {scoreLabel}: {score}
        </span>
      </div>
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-[var(--color-line-soft)]">
        <div
          className="h-full rounded-full bg-[var(--color-cyan)]"
          style={{ width: inView ? `${pct}%` : '0%', transition: 'width 1000ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </div>
    </div>
  )
}

export function LanguagesEducation() {
  return (
    <section id="languages-education" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal as="h2" className="flex items-center gap-2.5 font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-paper)]">
            <Languages size={22} className="text-[var(--color-cyan)]" />
            Languages
          </Reveal>
          <div className="mt-8 flex flex-col gap-6">
            {languages.map((lang) => (
              <LanguageBar key={lang.name} {...lang} />
            ))}
          </div>
        </div>

        <div>
          <Reveal as="h2" className="flex items-center gap-2.5 font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-paper)]">
            <GraduationCap size={22} className="text-[var(--color-cyan)]" />
            Education
          </Reveal>
          <div className="mt-8 flex flex-col gap-6">
            {education.map((item, index) => (
              <Reveal key={item.school} delay={index * 60} className="border-l border-[var(--color-line)] pl-5">
                <p className="text-sm font-medium text-[var(--color-paper)]">{item.school}</p>
                <p className="mt-1 text-sm text-[var(--color-paper-dim)]">{item.program}</p>
                <p className="mt-1 text-xs text-[var(--color-paper-dim)]">
                  {item.date} · {item.detail}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal as="h2" className="mt-14 flex items-center gap-2.5 font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-paper)]">
            <Award size={22} className="text-[var(--color-cyan)]" />
            Honors & certifications
          </Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {honors.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="border-l border-[var(--color-line)] pl-5">
                <p className="text-sm font-medium text-[var(--color-paper)]">{item.title}</p>
                <p className="mt-1 font-mono text-xs text-[var(--color-paper-dim)]">{item.kind}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
