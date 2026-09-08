import { MapPin, ArrowDown, FileText } from 'lucide-react'
import { hero, contact } from '@/data/content'
import { assets } from '@/data/assets'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { MagneticButton } from '@/components/MagneticButton'
import { Reveal } from '@/components/Reveal'

export function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 md:pb-32">
      <div className="container-edit relative grid gap-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-10">
        <div>
          <Reveal className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs text-[var(--color-paper-dim)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
            {hero.status}
          </Reveal>

          <Reveal as="h1" delay={80} className="text-balance font-[var(--font-display)] text-[2.4rem] font-medium leading-[1.08] tracking-tight text-[var(--color-paper)] sm:text-5xl lg:text-[3.4rem]">
            {hero.headline}
          </Reveal>

          <Reveal delay={160} className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-[var(--color-paper-dim)]">
            {hero.supporting}
          </Reveal>

          <Reveal delay={220} className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--color-paper-dim)]">
            {hero.meta.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {item}
                {i < hero.meta.length - 1 && <span className="h-1 w-1 rounded-full bg-[var(--color-line)]" aria-hidden="true" />}
              </span>
            ))}
          </Reveal>

          <Reveal delay={280} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work">
              {hero.ctaPrimary}
              <ArrowDown size={15} />
            </MagneticButton>
            <MagneticButton href={contact.resumeHref} variant="outline" target="_blank" rel="noopener noreferrer">
              <FileText size={15} />
              {hero.ctaSecondary}
            </MagneticButton>
          </Reveal>

          <Reveal delay={340} className="mt-10 flex items-center gap-2 text-xs text-[var(--color-paper-dim)]">
            <MapPin size={14} className="text-[var(--color-cyan)]" />
            {contact.location}
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-[340px] md:mx-0">
          <ImageWithFallback
            src={assets.profile}
            alt="Portrait of Naulia Sahya Althafah"
            ratio="4 / 5"
            className="rounded-md border border-[var(--color-line)]"
            priority
            objectPosition="center 20%"
            label="Profile photo"
          />
        </Reveal>
      </div>
    </section>
  )
}
