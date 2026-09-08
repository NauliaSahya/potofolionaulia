import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  y?: number
}

/**
 * Fades and slides content up as it enters the viewport. Falls back to
 * fully visible, static content when JS/observers are unavailable, and is
 * neutralised globally under prefers-reduced-motion (see index.css).
 */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', y = 18 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  const style: CSSProperties = {
    transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
    opacity: inView ? 1 : 0,
    transitionProperty: 'transform, opacity',
    transitionDuration: '700ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  }

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
