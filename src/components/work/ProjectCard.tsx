import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Reveal } from '@/components/Reveal'

type ProjectCardProps = {
  slug: string
  number: string
  title: string
  category: string
  year: string
  description: string
  tech: string[]
  image?: string
  imageAlt?: string
  expanded: boolean
  onToggle: () => void
  delay?: number
  children?: ReactNode
}

export function ProjectCard({
  slug,
  number,
  title,
  category,
  year,
  description,
  tech,
  image,
  imageAlt = '',
  expanded,
  onToggle,
  delay = 0,
  children,
}: ProjectCardProps) {
  const panelId = `panel-${slug}`

  return (
    <Reveal delay={delay}>
      <article
        id={`project-card-${slug}`}
        className="scroll-mt-24 border-t border-[var(--color-line)] first:border-t-0"
      >
        <div className="grid gap-6 py-10 md:grid-cols-[0.6fr_1fr] md:items-center md:gap-10 md:py-12">
          <div className="order-2 md:order-1">
            <span className="font-mono text-xs text-[var(--color-cyan)]">{number}</span>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-paper)]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-paper-dim)]">
              {category} <span className="text-[var(--color-line)]">·</span> {year}
            </p>
            <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-[var(--color-paper-dim)]">{description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span key={item} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-paper-dim)]">
                  {item}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
            >
              {expanded ? 'Show less' : 'See more'}
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {image && (
            <div className="order-1 md:order-2">
              <button
                type="button"
                onClick={onToggle}
                tabIndex={-1}
                aria-hidden="true"
                className="block w-full overflow-hidden rounded-md border border-[var(--color-line)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-cyan)]/40 hover:shadow-[var(--shadow-glow-cyan)]"
              >
                <ImageWithFallback src={image} alt={imageAlt} ratio="16 / 11" />
              </button>
            </div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-dashed border-[var(--color-line)] pt-10">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  )
}
