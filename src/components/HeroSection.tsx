import { useState, useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import { WordsPullUp, GlassPanel, PillButton } from './shared'
import { links } from '../content'

const emberSpecs = [
  { size: 8, left: '73%', bottom: '12%', duration: 10.5, delay: 0.2, drift: 20 },
  { size: 6, left: '77%', bottom: '10%', duration: 8.8, delay: 1.3, drift: 14 },
  { size: 10, left: '81%', bottom: '14%', duration: 11.6, delay: 0.9, drift: 22 },
  { size: 5, left: '84%', bottom: '11%', duration: 9.4, delay: 2.1, drift: 16 },
  { size: 7, left: '79%', bottom: '8%', duration: 12.2, delay: 1.7, drift: 18 },
  { size: 4, left: '75%', bottom: '15%', duration: 7.9, delay: 2.6, drift: 12 },
  { size: 9, left: '86%', bottom: '13%', duration: 10.9, delay: 0.5, drift: 24 },
  { size: 6, left: '71%', bottom: '9%', duration: 9.8, delay: 3.2, drift: 15 },
] as const

const starSpecs = [
  { size: 2, left: '12%', top: '10%', duration: 5.2, delay: 0.1, opacity: 0.65 },
  { size: 2, left: '18%', top: '16%', duration: 6.4, delay: 1.7, opacity: 0.75 },
  { size: 3, left: '27%', top: '8%', duration: 7.1, delay: 0.9, opacity: 0.82 },
  { size: 2, left: '35%', top: '14%', duration: 5.9, delay: 2.3, opacity: 0.58 },
  { size: 2, left: '42%', top: '11%', duration: 6.7, delay: 0.6, opacity: 0.7 },
  { size: 3, left: '51%', top: '7%', duration: 7.6, delay: 1.2, opacity: 0.9 },
  { size: 2, left: '58%', top: '13%', duration: 5.5, delay: 2.9, opacity: 0.6 },
  { size: 2, left: '66%', top: '9%', duration: 6.2, delay: 0.4, opacity: 0.72 },
  { size: 3, left: '74%', top: '12%', duration: 7.9, delay: 1.9, opacity: 0.88 },
  { size: 2, left: '82%', top: '15%', duration: 5.7, delay: 2.5, opacity: 0.64 },
  { size: 2, left: '87%', top: '9%', duration: 6.9, delay: 1.1, opacity: 0.7 },
  { size: 3, left: '91%', top: '18%', duration: 8.1, delay: 0.8, opacity: 0.84 },
] as const

export default function HeroSection() {
  const { t, lang } = useLang()
  const { isDark } = useTheme()
  const [expanded, setExpanded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = section.getBoundingClientRect()
      const x = ((e.clientX - left) / width - 0.5) * 2
      const y = ((e.clientY - top) / height - 0.5) * 2
      img.style.animation = 'none'
      img.style.transform = `scale(1.06) translate(${x * -12}px, ${y * -8}px)`
    }

    const onLeave = () => {
      img.style.transform = 'scale(1.06) translate(0px, 0px)'
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} className="h-[100svh] p-3 md:p-4">
      <div className="h-full rounded-2xl md:rounded-[2rem] overflow-hidden relative">
        {/* Background image — CSS entrance + JS parallax */}
        <img
          ref={imgRef}
          key={isDark ? 'hero-dark' : 'hero-light'}
          className="absolute inset-0 w-full h-full object-cover object-[38%_center] hero-img-enter"
          style={{ transform: 'scale(1.06)', transition: 'transform 0.12s ease-out' }}
          src={isDark ? './hero-dark.jpg' : './hero-light.jpg'}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />
        <div className="hero-ambient hero-ambient-sky" />
        <div className="hero-ambient hero-ambient-fire" />
        {isDark && (
          <div className="hero-stars" aria-hidden="true">
            {starSpecs.map((star, index) => (
              <span
                key={index}
                className="hero-star"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: star.left,
                  top: star.top,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>
        )}
        <div className="noise-local" />
        <div className="hero-embers" aria-hidden="true">
          {emberSpecs.map((ember, index) => (
            <span
              key={index}
              className="hero-ember"
              style={{
                width: `${ember.size}px`,
                height: `${ember.size}px`,
                left: ember.left,
                bottom: ember.bottom,
                animationDuration: `${ember.duration}s`,
                animationDelay: `${ember.delay}s`,
                '--ember-drift': `${ember.drift}px`,
              } as CSSProperties}
            />
          ))}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-5 md:bottom-8 left-4 md:left-8 right-4 md:right-8 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-end">

          {/* Name */}
          <div className="lg:col-span-8 min-w-0">
            <h1
              className={`font-extrabold text-sand max-w-full ${
                lang === 'ar'
                  ? 'tracking-normal leading-[1.05] text-[15vw] sm:text-[13vw] md:text-[10.5vw] lg:text-[8vw]'
                  : 'tracking-[-0.07em] leading-[0.82] text-[17vw] sm:text-[14.5vw] md:text-[11.5vw] lg:text-[8.6vw]'
              }`}
            >
              <WordsPullUp text={t.hero.name} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-gold mt-4"
            >
              {t.hero.subtitle}
            </motion.p>
          </div>

          {/* Desktop: full card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:block lg:col-span-4"
          >
            <GlassPanel className="hero-glass-panel p-5 md:p-6 !bg-black/40 !border-white/20">
              <h2 className="text-lg md:text-xl font-bold leading-snug text-sand">{t.hero.headline}</h2>
              <p className="mt-3 text-sm leading-relaxed text-sand/75">{t.hero.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.hero.pills.map((pill, i) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[11px] text-sand/90"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-5 flex flex-wrap gap-3"
              >
                <PillButton href="#projects" variant="primary">{t.hero.ctaProjects}</PillButton>
                <PillButton href={links.cv} variant="secondary" className="!bg-white/10 !border-white/15 !text-sand hover:!bg-white/15">
                  {t.hero.ctaCV}
                </PillButton>
              </motion.div>
            </GlassPanel>
          </motion.div>

          {/* Mobile: collapsible card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden"
          >
            <div className="hero-glass-panel rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-2xl shadow-2xl">

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="expanded"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pt-4 pb-2">
                      <h2 className="text-base font-bold leading-snug text-sand">{t.hero.headline}</h2>
                      <p className="mt-2 text-xs leading-relaxed text-sand/70">{t.hero.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {t.hero.pills.map((pill) => (
                          <span
                            key={pill}
                            className="rounded-full bg-white/10 border border-white/15 px-2.5 py-1 text-[10px] text-sand/85"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Always-visible bottom bar */}
              <div className="flex items-center gap-2 px-3 py-2.5">
                <PillButton href="#projects" variant="primary" className="flex-1 !py-2 !text-xs">
                  {t.hero.ctaProjects}
                </PillButton>
                <PillButton href={links.cv} variant="secondary" className="flex-1 !py-2 !text-xs !bg-white/10 !border-white/15 !text-sand hover:!bg-white/15">
                  {t.hero.ctaCV}
                </PillButton>
                <button
                  onClick={() => setExpanded(v => !v)}
                  aria-label="Toggle details"
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-sand transition-colors hover:bg-white/20"
                >
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex items-center justify-center"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </motion.span>
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
