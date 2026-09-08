import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, hero } from '@/data/content'
import { useActiveSection } from '@/hooks/useActiveSection'

const sectionIds = nav.map((item) => item.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,padding] duration-500 ease-out ${
        scrolled
          ? 'border-b border-[var(--color-line)] bg-[rgba(5,7,8,0.82)] py-3 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="container-edit flex items-center justify-between">
        <a href="#home" className="font-[var(--font-display)] text-[15px] font-medium tracking-tight text-[var(--color-paper)]">
          Naulia Sahya
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm text-[var(--color-paper-dim)] transition-colors duration-300 hover:text-[var(--color-paper)]"
                aria-current={isActive ? 'true' : undefined}
              >
                <span className={isActive ? 'text-[var(--color-paper)]' : ''}>{item.label}</span>
                <span
                  className="absolute inset-x-4 -bottom-0.5 h-px bg-[var(--color-cyan)] transition-transform duration-300 ease-out"
                  style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
          <span className="text-xs text-[var(--color-paper-dim)]">{hero.status}</span>
        </div>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-sm border border-[var(--color-line)] text-[var(--color-paper)] transition-colors hover:border-[var(--color-paper-dim)] md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 top-0 z-30 bg-[var(--color-ink)] transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ paddingTop: '4.5rem' }}
      >
        <nav className="container-edit flex flex-col gap-1 pt-6" aria-label="Mobile">
          {nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[var(--color-line-soft)] py-4 text-2xl text-[var(--color-paper)] transition-transform duration-300 ease-out"
              style={{
                transitionDelay: `${index * 40}ms`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
          <span className="mt-6 text-sm text-[var(--color-paper-dim)]">{hero.status}</span>
        </nav>
      </div>
    </header>
  )
}
