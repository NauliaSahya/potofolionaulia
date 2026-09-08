import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Sparkles,
  User,
  Layers,
  History,
  Cpu,
  Mail,
  ChevronRight,
  FileText,
  ArrowUpRight,
} from 'lucide-react'
import { hero, contact } from '@/data/content'
import { useActiveSection } from '@/hooks/useActiveSection'

const navItems = [
  { num: '01', label: 'Home', href: '#home', desc: 'Hero & Lanyard Credential Pass', icon: Sparkles },
  { num: '02', label: 'About', href: '#about', desc: 'Core Philosophy & Team Metrics', icon: User },
  { num: '03', label: 'Work', href: '#work', desc: 'SIRJ, CENIM, Hi-Me! & RS PHC', icon: Layers },
  { num: '04', label: 'Experience', href: '#experience', desc: 'Internships, Lab & Organizations', icon: History },
  { num: '05', label: 'Skills', href: '#skills', desc: 'Medical Tech & Web Software', icon: Cpu },
  { num: '06', label: 'Contact', href: '#contact', desc: 'Inquiries & Direct Socials', icon: Mail },
]

const sectionIds = navItems.map((item) => item.href.replace('#', ''))

function LinkedinIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [menuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* Main Top Header Bar (Desktop & Mobile)                        */}
      {/* ------------------------------------------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'border-b border-[var(--color-line)] bg-[#050708]/90 py-3 backdrop-blur-xl shadow-lg shadow-black/40'
            : 'border-b border-transparent bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="container-edit flex items-center justify-between">
          {/* Brand / Logo */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2.5 transition-transform active:scale-95"
          >
            <span className="font-[var(--font-display)] text-base font-medium tracking-tight text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-cyan)]">
              Naulia Sahya
            </span>
            <span className="hidden rounded bg-[var(--color-surface-raised)] border border-[var(--color-line)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-cyan)] sm:inline-block">
              BME · ITS
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = active === id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-3.5 py-1.5 text-sm font-medium text-[var(--color-paper-dim)] transition-colors duration-200 hover:text-[var(--color-paper)]"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className={isActive ? 'text-[var(--color-paper)]' : ''}>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_rgba(79,214,224,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Desktop Right Status Badge */}
          <div className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-cyan)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-cyan)]" />
            </span>
            <span className="text-xs text-[var(--color-paper-dim)]">{hero.status}</span>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]/90 px-3 py-2 text-xs font-medium text-[var(--color-paper)] shadow-md backdrop-blur-md transition-all active:scale-95 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] md:hidden"
            aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <>
                <X size={16} className="text-[var(--color-cyan)]" />
                <span className="font-mono uppercase tracking-wider text-[11px]">Tutup</span>
              </>
            ) : (
              <>
                <Menu size={16} />
                <span className="font-mono uppercase tracking-wider text-[11px]">Menu</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* Full-Screen Mobile Drawer Overlay (Designed for Mobile/HP)   */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050708]/98 backdrop-blur-2xl text-[var(--color-paper)] md:hidden"
          >
            {/* Mobile Drawer Top Bar */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-line)] px-6">
              <div className="flex items-center gap-2">
                <span className="font-[var(--font-display)] text-base font-medium tracking-tight text-[var(--color-paper)]">
                  Naulia Sahya
                </span>
                <span className="rounded bg-[var(--color-cyan)]/15 px-2 py-0.5 font-mono text-[10px] text-[var(--color-cyan)]">
                  Portfolio
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-paper)] transition-all active:scale-95 hover:border-red-500/50 hover:text-red-400"
              >
                <X size={14} />
                <span className="font-mono text-[11px]">Tutup</span>
              </button>
            </div>

            {/* Mobile Navigation Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              {/* Navigation Section Title */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-cyan)]">
                  Navigasi Menu
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {navItems.map((item, index) => {
                    const id = item.href.replace('#', '')
                    const isActive = active === id
                    const IconComponent = item.icon

                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 + 0.05, duration: 0.25 }}
                        className={`group flex items-center justify-between rounded-xl border p-3.5 transition-all active:scale-[0.98] ${
                          isActive
                            ? 'border-[var(--color-cyan)] bg-[var(--color-surface-raised)] shadow-[0_0_25px_-5px_rgba(79,214,224,0.2)]'
                            : 'border-[var(--color-line)] bg-[var(--color-surface)]/80 hover:border-[var(--color-cyan)]/40 hover:bg-[var(--color-surface-raised)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                              isActive
                                ? 'border-[var(--color-cyan)]/50 bg-[var(--color-cyan)]/15 text-[var(--color-cyan)]'
                                : 'border-[var(--color-line)] bg-[var(--color-surface-raised)] text-[var(--color-paper-dim)] group-hover:text-[var(--color-cyan)]'
                            }`}
                          >
                            <IconComponent size={18} />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] text-[var(--color-cyan)]">{item.num}</span>
                              <span className="font-[var(--font-display)] text-base font-medium text-[var(--color-paper)]">
                                {item.label}
                              </span>
                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                              )}
                            </div>
                            <p className="text-xs text-[var(--color-paper-dim)]">{item.desc}</p>
                          </div>
                        </div>

                        <ChevronRight
                          size={18}
                          className={`transition-transform duration-200 group-hover:translate-x-1 ${
                            isActive ? 'text-[var(--color-cyan)]' : 'text-[var(--color-paper-dim)]/40'
                          }`}
                        />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Status Banner */}
              <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-cyan)] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-cyan)]" />
                  </span>
                  <span className="text-xs font-medium text-[var(--color-paper)]">{hero.status}</span>
                </div>
                <p className="mt-1 text-[11px] text-[var(--color-paper-dim)]">
                  Biomedical Engineering · Institut Teknologi Sepuluh Nopember (ITS)
                </p>
              </div>

              {/* Quick Contact & Socials Buttons */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-cyan)]">
                  Tautan & Kontak
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={contact.emailHref}
                    className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] py-2.5 text-xs text-[var(--color-paper)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                  >
                    <Mail size={14} className="text-[var(--color-cyan)]" />
                    <span>Email</span>
                  </a>

                  <a
                    href={contact.resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] py-2.5 text-xs text-[var(--color-paper)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                  >
                    <FileText size={14} className="text-[var(--color-cyan)]" />
                    <span>Resume</span>
                    <ArrowUpRight size={11} className="text-[var(--color-paper-dim)]" />
                  </a>

                  <a
                    href={contact.linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] py-2.5 text-xs text-[var(--color-paper)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                  >
                    <LinkedinIcon size={14} className="text-[var(--color-cyan)]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={11} className="text-[var(--color-paper-dim)]" />
                  </a>

                  <a
                    href={contact.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] py-2.5 text-xs text-[var(--color-paper)] transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                  >
                    <GithubIcon size={14} className="text-[var(--color-cyan)]" />
                    <span>GitHub</span>
                    <ArrowUpRight size={11} className="text-[var(--color-paper-dim)]" />
                  </a>
                </div>
              </div>

              {/* Location Stamp */}
              <div className="pt-2 text-center text-[11px] text-[var(--color-paper-dim)] font-mono">
                {contact.location}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
