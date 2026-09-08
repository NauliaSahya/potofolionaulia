import { footer, contact } from '@/data/content'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="container-edit flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[var(--font-display)] text-sm font-medium text-[var(--color-paper)]">{footer.name}</p>
          <p className="mt-1 text-xs text-[var(--color-paper-dim)]">{footer.tagline}</p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-[var(--color-paper-dim)] sm:items-end">
          <a href={contact.emailHref} className="transition-colors duration-300 hover:text-[var(--color-cyan)]">
            {contact.email}
          </a>
          <span>© {footer.year} {footer.name}</span>
        </div>
      </div>
    </footer>
  )
}
