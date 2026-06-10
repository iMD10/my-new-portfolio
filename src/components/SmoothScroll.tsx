import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

/** Lets other components pause/resume the smooth scroll (e.g. while a modal is open). */
export function getLenis() {
  return instance
}

export default function SmoothScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  // Lenis inertia scrolling + eased anchor navigation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    instance = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')!
      const target = hash === '#' ? 0 : document.querySelector<HTMLElement>(hash)
      if (target === null) return
      event.preventDefault()
      lenis.scrollTo(target, { duration: 1.4 })
      history.pushState(null, '', hash === '#' ? window.location.pathname : hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      instance = null
    }
  }, [])

  // Custom scroll indicator: appears while scrolling, slips away when idle
  useEffect(() => {
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!track || !thumb) return

    let hideTimeout = 0
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      if (max <= 0) return
      const trackHeight = track.clientHeight
      const thumbHeight = Math.max((window.innerHeight / doc.scrollHeight) * trackHeight, 44)
      const y = (window.scrollY / max) * (trackHeight - thumbHeight)
      thumb.style.height = `${thumbHeight}px`
      thumb.style.transform = `translate3d(0, ${y}px, 0)`
      track.classList.add('is-visible')
      window.clearTimeout(hideTimeout)
      hideTimeout = window.setTimeout(() => track.classList.remove('is-visible'), 1100)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(hideTimeout)
    }
  }, [])

  return (
    <div ref={trackRef} className="scroll-indicator" aria-hidden="true">
      <div ref={thumbRef} className="scroll-indicator-thumb" />
    </div>
  )
}
