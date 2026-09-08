import { useState } from 'react'

type ImageWithFallbackProps = {
  src: string
  alt: string
  ratio?: string
  className?: string
  priority?: boolean
  objectPosition?: string
  label?: string
}

/**
 * Renders an image with a fixed aspect ratio and lazy loading. If the file
 * hasn't been supplied yet (or fails to load), it falls back to a quiet
 * gradient placeholder labelled with what belongs there, so the layout
 * never breaks while real photography/screens are pending.
 */
export function ImageWithFallback({
  src,
  alt,
  ratio = '4 / 3',
  className = '',
  priority = false,
  objectPosition,
  label,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-[var(--color-surface-raised)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}
      {failed && (
        <div className="grid-lines flex h-full w-full flex-col items-center justify-center gap-2 border border-[var(--color-line)] bg-gradient-to-br from-[#10151a] to-[#0b0e11] px-6 text-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path
              d="M3 18 L8 18 L10.5 10 L14 22 L17.5 13 L20 18 L25 18"
              stroke="var(--color-cyan)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.85}
            />
          </svg>
          <span className="text-xs text-[var(--color-paper-dim)]">{label ?? alt}</span>
        </div>
      )}
    </div>
  )
}
