import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'solid' | 'outline'
}

const PULL = 0.28

export function MagneticButton({ children, variant = 'solid', className = '', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const reducedMotion = useReducedMotion()

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) * PULL
    const y = (event.clientY - (rect.top + rect.height / 2)) * PULL
    ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
  }

  const handlePointerLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-colors duration-200 ease-out'
  const styles =
    variant === 'solid'
      ? 'bg-[var(--color-cyan)] text-[var(--color-ink)] hover:bg-[var(--color-cyan-strong)]'
      : 'border border-[var(--color-line)] text-[var(--color-paper)] hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]'

  return (
    <a
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`${base} ${styles} ${className}`}
      style={{
        transition: 'transform 350ms cubic-bezier(0.2, 0.9, 0.3, 1.2), color 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out',
        willChange: 'transform',
      }}
      {...props}
    >
      {children}
    </a>
  )
}
