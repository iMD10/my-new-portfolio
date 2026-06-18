import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'
import { content } from '../content'
import { useTheme } from '../ThemeContext'
import { Sun, Moon, Menu, X } from 'lucide-react'
import LiveClock from './LiveClock'

const SECTION_IDS = ['experience', 'projects', 'skills', 'about', 'contact']

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navLinks = [
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects,   href: '#projects' },
    { label: t.nav.skills,     href: '#skills' },
    { label: t.nav.about,      href: '#about' },
    { label: t.nav.contact,    href: '#contact' },
  ]

  // Scroll spy — highlight the nav link for the section currently in view.
  useEffect(() => {
    const els = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!els.length) return

    const visibility = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibility.set(entry.target.id, entry.intersectionRatio))
        let best = ''
        let bestRatio = 0
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        setActiveSection(bestRatio > 0 ? best : '')
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      dir="ltr"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center max-w-[94vw]"
    >
      {/* ── Main pill ── */}
      <motion.nav
        dir="ltr"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-full backdrop-blur-xl bg-white/70 dark:bg-black/35 border border-black/10 dark:border-white/15 shadow-2xl px-3 md:px-5 py-2 md:py-2.5 flex items-center gap-2 md:gap-5"
      >
        {/* Desktop links — width is locked to the English labels (the wider set) via an
            invisible sizer, so the centered pill doesn't shift when switching language. */}
        <div className="hidden md:grid overflow-y-visible py-0.5">
          <div
            aria-hidden
            className="col-start-1 row-start-1 invisible flex items-center gap-2.5 md:gap-5"
          >
            {Object.values(content.en.nav).map((label) => (
              <span
                key={label}
                className="text-[10px] sm:text-[11px] md:text-xs uppercase whitespace-nowrap"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="col-start-1 row-start-1 flex items-center justify-center gap-2.5 md:gap-5">
            {navLinks.map((l) => {
              const isActive = l.href === `#${activeSection}`
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-[10px] sm:text-[11px] md:text-xs uppercase whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'text-gold'
                      : 'text-[#1C1610]/70 dark:text-sand/80 hover:text-[#1C1610] dark:hover:text-sand'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              )
            })}
          </div>
        </div>

        <LiveClock />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/8 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#1C1610]/70 dark:text-sand/70 hover:text-[#1C1610] dark:hover:text-sand transition-colors duration-200"
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Language switcher — pill slides via GPU-composited CSS transform so it
            stays smooth even while the page re-renders on language change. */}
        <div
          className="relative flex items-center rounded-full bg-black/8 dark:bg-white/10 border border-black/10 dark:border-white/15 p-0.5 text-[10px] md:text-[11px] font-bold shrink-0"
          role="group"
          aria-label="Language"
        >
          <span
            aria-hidden
            className="absolute inset-y-0.5 left-0.5 w-9 md:w-10 rounded-full bg-sand will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
          />
          {(['ar', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative z-10 w-9 md:w-10 rounded-full py-1 text-center transition-colors duration-200 ${
                lang === l
                  ? 'text-black'
                  : 'text-[#1C1610]/60 dark:text-sand/70 hover:text-[#1C1610] dark:hover:text-sand'
              }`}
            >
              {l === 'ar' ? 'AR' : 'EN'}
            </button>
          ))}
        </div>

        {/* Mobile hamburger — hidden on md+ */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/8 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#1C1610]/70 dark:text-sand/70 transition-colors duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'x' : 'menu'}
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              {menuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-black/50 border border-black/10 dark:border-white/15 shadow-2xl px-2 py-2 flex flex-col gap-0.5 min-w-[160px]"
          >
            {navLinks.map((l, i) => {
              const isActive = l.href === `#${activeSection}`
              return (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.18 }}
                  className={`px-4 py-2.5 rounded-xl text-xs uppercase font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-gold/15 text-gold'
                      : 'text-[#1C1610]/75 dark:text-sand/80 hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#1C1610] dark:hover:text-sand'
                  }`}
                >
                  {l.label}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
