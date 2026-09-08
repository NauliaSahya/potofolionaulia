import { useState } from 'react'
import { Code2, Database, Activity, Palette, Wrench, Briefcase } from 'lucide-react'
import { skillGroups } from '@/data/skills'
import { Reveal } from '@/components/Reveal'

function getSkillGroupIcon(title: string) {
  if (title.includes('Programming')) return Code2
  if (title.includes('Database')) return Database
  if (title.includes('Healthcare')) return Activity
  if (title.includes('Design')) return Palette
  if (title.includes('Productivity')) return Wrench
  return Briefcase
}

function SkillGroupBlock({ title, items, delay }: { title: string; items: string[]; delay: number }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const Icon = getSkillGroupIcon(title)

  return (
    <Reveal delay={delay} className="rounded-md border border-[var(--color-line)] p-6">
      <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--color-paper)]">
        <Icon size={16} className="text-[var(--color-cyan)]" />
        {title}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => {
          const dimmed = hovered !== null && hovered !== item
          return (
            <span
              key={item}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-default rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ease-out"
              style={{
                borderColor: hovered === item ? 'var(--color-cyan)' : 'var(--color-line)',
                color: hovered === item ? 'var(--color-cyan)' : 'var(--color-paper)',
                opacity: dimmed ? 0.45 : 1,
              }}
            >
              {item}
            </span>
          )
        })}
      </div>
    </Reveal>
  )
}

export function Skills() {
  return (
    <section id="skills" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="container-edit">
        <Reveal as="h2" className="font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-paper)] md:text-4xl">
          Skills &amp; tools
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <SkillGroupBlock key={group.title} title={group.title} items={group.items} delay={index * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
