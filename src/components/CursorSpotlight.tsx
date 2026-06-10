import { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeContext'

export default function CursorSpotlight() {
  const { isDark } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(420px circle at ${e.clientX}px ${e.clientY}px, ${
        isDark
          ? 'rgba(217,154,78,0.07) 0%, transparent 70%'
          : 'rgba(217,154,78,0.10) 0%, transparent 70%'
      })`
    }

    const onLeave = () => {
      el.style.background = 'none'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [isDark])

  return <div ref={ref} className="cursor-spotlight" aria-hidden />
}
