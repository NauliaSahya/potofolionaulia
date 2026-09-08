import { Mail, Phone, MapPin, FileText } from 'lucide-react'
import { contact, contactSection } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/MagneticButton'

function LinkedinIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const cards = [
  { icon: Mail, label: 'Email', value: contact.email, href: contact.emailHref },
  { icon: Phone, label: 'Phone', value: contact.phoneDisplay, href: contact.phoneHref },
  { icon: LinkedinIcon, label: 'LinkedIn', value: contact.linkedinDisplay, href: contact.linkedinHref },
  { icon: MapPin, label: 'Location', value: contact.location, href: undefined },
]

export function Contact() {
  return (
    <section id="contact" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal as="h2" className="text-balance font-[var(--font-display)] text-4xl font-medium tracking-tight text-[var(--color-paper)] md:text-5xl">
            {contactSection.title}
          </Reveal>
          <Reveal delay={80} className="max-w-[42ch] text-base leading-relaxed text-[var(--color-paper-dim)]">
            {contactSection.subtext}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, label, value, href }, index) => {
            const content = (
              <div className="flex flex-col gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-cyan)]">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-paper-dim)]">{label}</p>
                  <p className="mt-1 break-words text-sm font-medium text-[var(--color-paper)]">{value}</p>
                </div>
              </div>
            )
            return (
              <Reveal key={label} delay={index * 60} className="bg-[var(--color-ink)]">
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex h-full flex-col justify-center p-6 transition-colors duration-300 hover:bg-[var(--color-surface-raised)]"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex h-full flex-col justify-center p-6">{content}</div>
                )}
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={120} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href={contact.emailHref}>
            <Mail size={15} />
            Email me
          </MagneticButton>
          <MagneticButton href={contact.linkedinHref} variant="outline" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={15} />
            Connect on LinkedIn
          </MagneticButton>
          <MagneticButton href={contact.resumeHref} variant="outline" target="_blank" rel="noopener noreferrer">
            <FileText size={15} />
            View Resume
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
