import type { ReactNode } from 'react'

type BrowserFrameProps = {
  url: string
  children: ReactNode
  className?: string
}

/** A minimal browser-window chrome for displaying live project screenshots. */
export function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)] transition-transform duration-500 ease-out group-hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[#0e1216] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4149]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4149]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a4149]" />
        <div className="ml-2 flex-1 truncate rounded-sm bg-[#161b20] px-2.5 py-1 font-mono text-[11px] text-[var(--color-paper-dim)]">
          {url}
        </div>
      </div>
      {children}
    </div>
  )
}
