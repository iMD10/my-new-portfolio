import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function WordsPullUp({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
          <motion.span
            className="inline-block"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function GlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`backdrop-blur-2xl bg-white/50 dark:bg-white/10 border border-black/12 dark:border-white/15 rounded-[32px] shadow-2xl ${className}`}>
      {children}
    </div>
  )
}

export function PillButton({
  children,
  href,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode
  href: string
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]'
  const styles =
    variant === 'primary'
      ? 'bg-sand text-black hover:bg-white'
      : 'bg-black/8 dark:bg-white/10 border border-black/12 dark:border-white/15 text-[#1C1610] dark:text-sand hover:bg-black/12 dark:hover:bg-white/15'
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  )
}
