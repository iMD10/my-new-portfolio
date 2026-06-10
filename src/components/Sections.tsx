import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLang } from '../LangContext'
import { FadeIn, PillButton } from './shared'
import { links } from '../content'
import { Mail, Linkedin, Github, FileDown, BrainCircuit, Cpu, BarChart3, Database, Globe, Code2 } from 'lucide-react'
import {
  SiPython, SiTensorflow, SiKeras,
  SiFlutter, SiDart, SiNextdotjs, SiReact, SiFirebase, SiSupabase,
  SiCplusplus, SiGit, SiGithub,
} from 'react-icons/si'

const skillIcons: Record<string, React.ElementType> = {
  Python: SiPython,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  'Machine Learning': BrainCircuit,
  'Deep Learning': Cpu,
  'Power BI': BarChart3,
  DAX: BarChart3,
  Flutter: SiFlutter,
  Dart: SiDart,
  'Next.js': SiNextdotjs,
  React: SiReact,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  Java: Code2,
  'C++': SiCplusplus,
  Git: SiGit,
  GitHub: SiGithub,
  SQL: Database,
  'REST APIs': Globe,
}

const skillColors: Record<string, string> = {
  Python: '#3776AB',
  TensorFlow: '#FF6F00',
  Keras: '#D00000',
  'Machine Learning': '#a855f7',
  'Deep Learning': '#8b5cf6',
  'Power BI': '#F2C811',
  DAX: '#F2C811',
  Flutter: '#54C5F8',
  Dart: '#0175C2',
  'Next.js': '#D99A4E',
  React: '#61DAFB',
  Firebase: '#FFCA28',
  Supabase: '#3ECF8E',
  Java: '#ED8B00',
  'C++': '#00599C',
  Git: '#F05032',
  GitHub: '#D99A4E',
  SQL: '#336791',
  'REST APIs': '#6FA8B8',
}

function MarqueeToken({ skill }: { skill: { label: string } }) {
  const Icon = skillIcons[skill.label]
  const color = skillColors[skill.label] ?? '#D99A4E'

  return (
    <span className="inline-flex items-center gap-3 shrink-0">
      <span className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.10] text-[#1C1610] dark:text-sand/85 text-sm font-medium whitespace-nowrap select-none transition-colors duration-300">
        {Icon && <Icon style={{ color }} className="w-4 h-4 shrink-0" />}
        {skill.label}
      </span>
      <span className="text-gold/40 select-none text-xs shrink-0" aria-hidden>◆</span>
    </span>
  )
}

function MarqueeSequence({ items }: { items: { label: string }[] }) {
  return (
    <div className="inline-flex items-center gap-3 pr-3 shrink-0">
      {items.map((skill, index) => (
        <MarqueeToken key={`${skill.label}-${index}`} skill={skill} />
      ))}
    </div>
  )
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 30,
}: {
  items: { label: string }[]
  reverse?: boolean
  duration?: number
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ sequenceWidth: 0, sequences: 2 })

  useEffect(() => {
    const viewport = viewportRef.current
    const measure = measureRef.current

    if (!viewport || !measure) {
      return
    }

    const updateLayout = () => {
      const viewportWidth = viewport.offsetWidth
      const sequenceWidth = measure.scrollWidth

      if (!viewportWidth || !sequenceWidth) {
        return
      }

      const sequences = Math.max(2, Math.ceil(viewportWidth / sequenceWidth) + 2)
      setLayout((prev) => (
        prev.sequenceWidth === sequenceWidth && prev.sequences === sequences
          ? prev
          : { sequenceWidth, sequences }
      ))
    }

    updateLayout()

    const observer = new ResizeObserver(updateLayout)
    observer.observe(viewport)
    observer.observe(measure)
    window.addEventListener('resize', updateLayout)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateLayout)
    }
  }, [items])

  const trackSequences = Array.from({ length: layout.sequences }, (_, index) => (
    <MarqueeSequence key={index} items={items} />
  ))

  const marqueeStyle = {
    '--duration': `${duration}s`,
    '--marquee-from': reverse ? `${-layout.sequenceWidth}px` : '0px',
    '--marquee-to': reverse ? '0px' : `${-layout.sequenceWidth}px`,
  } as CSSProperties

  return (
    <div ref={viewportRef} className="relative overflow-hidden" dir="ltr">
      <div className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap">
        <div ref={measureRef} className="inline-flex shrink-0">
          <MarqueeSequence items={items} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#F5EFE4] dark:from-ink to-transparent transition-colors duration-300" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#F5EFE4] dark:from-ink to-transparent transition-colors duration-300" />

      <div
        className={`inline-flex items-center whitespace-nowrap ${layout.sequenceWidth > 0 ? 'animate-marquee' : ''}`}
        style={marqueeStyle}
      >
        {trackSequences}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const { t } = useLang()

  const groupMeta = [
    { color: 'text-gold', duration: 32 },
    { color: 'text-oasis', duration: 26, reverse: true },
    { color: 'text-muted', duration: 30 },
  ]

  return (
    <section id="skills" className="bg-[#F5EFE4] dark:bg-ink py-24 md:py-32 overflow-hidden transition-colors duration-300">
      <div className="px-5 md:px-10">
        <FadeIn>
          <h2 className="text-[16vw] md:text-[10vw] leading-none tracking-[-0.02em] font-extrabold text-[#1C1610] dark:text-sand">
            {t.skills.heading}
          </h2>
          <p className="mt-5 text-[#7A6A58] dark:text-muted text-base md:text-lg max-w-xl">{t.skills.intro}</p>
        </FadeIn>
      </div>

      <div className="mt-14 md:mt-20 flex flex-col gap-6">
        {t.skills.groups.map((group, gi) => {
          const meta = groupMeta[gi]

          return (
            <FadeIn key={group.title} delay={gi * 0.1}>
              <div className="flex flex-col gap-3">
                <p className={`px-5 md:px-10 text-xs uppercase tracking-[0.3em] font-bold ${meta.color}`}>
                  {group.title}
                </p>
                <MarqueeRow
                  items={group.items.map((label) => ({ label }))}
                  reverse={meta.reverse}
                  duration={meta.duration}
                />
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}

export function AboutSection() {
  const { t } = useLang()

  return (
    <section id="about" className="bg-[#EBE1D0] dark:bg-dark py-24 md:py-32 px-5 transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">{t.about.heading}</p>
          <p className="mt-6 text-xl md:text-3xl leading-relaxed md:leading-relaxed font-bold text-[#1C1610] dark:text-sand">
            {t.about.text}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export function ContactSection() {
  const { t } = useLang()

  return (
    <section id="contact" className="bg-[#F5EFE4] dark:bg-ink py-24 md:py-32 px-5 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-7xl font-extrabold leading-tight text-[#1C1610] dark:text-sand">{t.contact.heading}</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillButton href={links.email} variant="primary">
              <Mail className="w-4 h-4" /> {t.contact.buttons.email}
            </PillButton>
            <PillButton href={links.linkedin} variant="secondary">
              <Linkedin className="w-4 h-4" /> {t.contact.buttons.linkedin}
            </PillButton>
            <PillButton href={links.github} variant="secondary">
              <Github className="w-4 h-4" /> {t.contact.buttons.github}
            </PillButton>
            <PillButton href={links.cv} variant="secondary">
              <FileDown className="w-4 h-4" /> {t.contact.buttons.cv}
            </PillButton>
          </div>
        </FadeIn>
        <p className="mt-16 text-xs text-[#7A6A58] dark:text-muted">
          © {new Date().getFullYear()} {t.contact.footer}
        </p>
      </div>
    </section>
  )
}
