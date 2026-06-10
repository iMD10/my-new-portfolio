import { useLang } from '../LangContext'
import { FadeIn } from './shared'
import {
  BarChart3,
  BrainCircuit,
  Smartphone,
  GitBranch,
  Database,
  Sparkles,
  Flame,
  Terminal,
  LineChart,
  Cpu,
} from 'lucide-react'

const cardMeta = [
  {
    icon: BarChart3,
    corner: [Database, LineChart],
    gradient: 'from-[#e8d8b8] via-[#d4c4a0] to-[#c8b890]',
    darkGradient: 'dark:from-[#1c1408] dark:via-[#2a1d0d] dark:to-[#0B0A08]',
    glow: 'rgba(217,154,78,0.35)',
    rotate: '-rotate-2',
  },
  {
    icon: BrainCircuit,
    corner: [Cpu, Sparkles],
    gradient: 'from-[#b8cfd8] via-[#a0bfcc] to-[#c8d8e0]',
    darkGradient: 'dark:from-[#0d1a1e] dark:via-[#13262c] dark:to-[#0B0A08]',
    glow: 'rgba(111,168,184,0.4)',
    rotate: 'rotate-1',
  },
  {
    icon: Smartphone,
    corner: [Flame, Sparkles],
    gradient: 'from-[#e0c8b0] via-[#d4b898] to-[#c8a880]',
    darkGradient: 'dark:from-[#1a120c] dark:via-[#241a10] dark:to-[#0B0A08]',
    glow: 'rgba(217,154,78,0.3)',
    rotate: '-rotate-1',
  },
  {
    icon: GitBranch,
    corner: [Terminal, GitBranch],
    gradient: 'from-[#d8d0c4] via-[#ccc4b4] to-[#c0b8a8]',
    darkGradient: 'dark:from-[#121212] dark:via-[#1c1a16] dark:to-[#0B0A08]',
    glow: 'rgba(28,22,16,0.15)',
    rotate: 'rotate-2',
  },
]

export default function ExperienceSection() {
  const { t } = useLang()

  return (
    <section id="experience" className="bg-[#EBE1D0] dark:bg-dark py-24 md:py-32 px-5 md:px-10 overflow-hidden transition-colors duration-300">
      <FadeIn>
        <h2 className="text-[16vw] md:text-[10vw] leading-none font-extrabold text-[#1C1610] dark:text-sand">
          {t.experience.heading}
        </h2>
        <p className="mt-5 text-[#7A6A58] dark:text-muted text-base md:text-lg max-w-xl">{t.experience.intro}</p>
      </FadeIn>

      {/* Desktop: horizontal rail / Mobile: vertical stack */}
      <div className="mt-12 md:mt-16">
        <div className="rail flex flex-col md:flex-row gap-6 md:gap-8 md:overflow-x-auto md:pb-6 md:snap-x md:snap-mandatory md:-mx-10 md:px-10">
          {t.experience.items.map((item, i) => {
            const meta = cardMeta[i % cardMeta.length]
            const Icon = meta.icon
            return (
              <FadeIn key={item.company} delay={i * 0.08} className="md:snap-start md:shrink-0 md:w-[360px] lg:w-[400px]">
                <div
                  className={`rounded-[28px] bg-black/[0.04] dark:bg-white/[0.08] border border-black/10 dark:border-white/15 backdrop-blur-xl p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:rotate-0 ${meta.rotate}`}
                >
                  {/* Photo area */}
                  <div
                    className={`relative aspect-[4/3] rounded-[22px] overflow-hidden bg-gradient-to-br ${meta.gradient} ${meta.darkGradient} saturate-[0.85] contrast-[0.9] brightness-[0.92]`}
                  >
                    {item.image ? (
                      <>
                        <img src={item.image} alt={item.company} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.04),rgba(12,10,8,0.2))]" />
                      </>
                    ) : (
                      <>
                        <div
                          className="absolute inset-0"
                          style={{ background: `radial-gradient(70% 60% at 50% 40%, ${meta.glow}, transparent 70%)` }}
                        />
                        <div className="noise-local" />
                        <Icon className="absolute inset-0 m-auto w-16 h-16 text-[#1C1610]/40 dark:text-sand/55" strokeWidth={1.2} />
                        {meta.corner.map((C, ci) => (
                          <C
                            key={ci}
                            className={`absolute w-4 h-4 text-[#1C1610]/25 dark:text-sand/30 ${
                              ci === 0 ? 'top-3 start-3' : 'bottom-3 end-3'
                            }`}
                            strokeWidth={1.5}
                          />
                        ))}
                      </>
                    )}
                  </div>

                  {/* Text */}
                  <div className="px-2 pt-4 pb-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-bold text-[#1C1610] dark:text-sand">{item.company}</h3>
                      <span className="text-[11px] text-[#7A6A58] dark:text-muted whitespace-nowrap">{item.date}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] text-gold">{item.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#1C1610]/65 dark:text-sand/65">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
