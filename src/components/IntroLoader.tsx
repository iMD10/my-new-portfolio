import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'

const MIN_SHOW_MS = 1700
const MAX_WAIT_MS = 6000

type Phase = 'loading' | 'reveal' | 'done'

export default function IntroLoader({ children }: { children: ReactNode }) {
  const { t } = useLang()
  const { isDark } = useTheme()
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)
  const startedAt = useRef(Date.now())
  const finished = useRef(false)

  // Preload the hero image for the active theme, then warm the other one
  useEffect(() => {
    const primary = isDark ? './hero-dark.jpg' : './hero-light.jpg'
    const secondary = isDark ? './hero-light.jpg' : './hero-dark.jpg'

    const finish = () => {
      if (finished.current) return
      finished.current = true
      setProgress(100)
      const elapsed = Date.now() - startedAt.current
      const wait = Math.max(MIN_SHOW_MS - elapsed, 450)
      window.setTimeout(() => setPhase('reveal'), wait)
    }

    const img = new Image()
    img.onload = finish
    img.onerror = finish
    img.src = primary
    if (img.complete) finish()

    // Failsafe: never trap the visitor on the splash screen
    const failsafe = window.setTimeout(finish, MAX_WAIT_MS)

    const warm = new Image()
    warm.src = secondary

    return () => window.clearTimeout(failsafe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fake-ramp the counter toward 90 while the image is in flight
  useEffect(() => {
    if (phase !== 'loading') return
    const id = window.setInterval(() => {
      setProgress(p => (p >= 90 || finished.current ? p : Math.min(90, p + Math.random() * 9 + 2)))
    }, 140)
    return () => window.clearInterval(id)
  }, [phase])

  // Lock scroll while the intro is up
  useEffect(() => {
    if (phase === 'done') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  const words = t.hero.name.split(' ')

  return (
    <>
      <AnimatePresence onExitComplete={() => setPhase('done')}>
        {phase === 'loading' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[200] flex flex-col bg-[#F5EFE4] dark:bg-ink text-[#1C1610] dark:text-sand overflow-hidden"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="noise-local" />

            {/* Center: name reveal */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-gold mb-5"
              >
                {t.hero.subtitle}
              </motion.p>
              <h1 className="font-extrabold text-center leading-[1.05] text-[11vw] sm:text-[8vw] md:text-6xl lg:text-7xl">
                {words.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                      {i < words.length - 1 ? ' ' : ''}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 h-px w-24 bg-gold/70 origin-center"
              />
            </div>

            {/* Bottom: counter + progress hairline */}
            <div className="px-6 pb-6 md:px-10 md:pb-8">
              <div className="flex items-end justify-between mb-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="serif-accent text-sm md:text-base text-[#1C1610]/60 dark:text-sand/60"
                >
                  portfolio
                </motion.span>
                <span className="font-extrabold tabular-nums text-3xl md:text-5xl leading-none text-[#1C1610]/80 dark:text-sand/80">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-px w-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gold origin-left rtl:origin-right"
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase !== 'loading' && children}
    </>
  )
}
