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

  // Custom scroll indicator: appears while scrolling, slips away when idle.
  // Also fully interactive — drag the thumb or click the track to scroll.
  useEffect(() => {
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!track || !thumb) return

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight
    const scrollToY = (y: number, immediate: boolean) => {
      const target = Math.min(maxScroll(), Math.max(0, y))
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(target, immediate ? { immediate: true } : { duration: 0.8 })
      else window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' })
    }

    let hideTimeout = 0
    const scheduleHide = () => {
      window.clearTimeout(hideTimeout)
      hideTimeout = window.setTimeout(() => {
        if (!dragging) track.classList.remove('is-visible')
      }, 1100)
    }

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
      scheduleHide()
    }

    // Drag-to-scroll
    let dragging = false
    let dragStartY = 0
    let dragStartScroll = 0

    const onThumbPointerDown = (event: PointerEvent) => {
      event.preventDefault()
      event.stopPropagation()
      dragging = true
      dragStartY = event.clientY
      dragStartScroll = window.scrollY
      track.classList.add('is-visible', 'is-dragging')
      thumb.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      const max = maxScroll()
      if (max <= 0) return
      const usable = track.clientHeight - thumb.offsetHeight
      const delta = usable > 0 ? ((event.clientY - dragStartY) / usable) * max : 0
      scrollToY(dragStartScroll + delta, true)
    }

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      track.classList.remove('is-dragging')
      thumb.releasePointerCapture?.(event.pointerId)
      scheduleHide()
    }

    // Click-on-track to jump
    const onTrackPointerDown = (event: PointerEvent) => {
      if (event.target === thumb) return
      const max = maxScroll()
      if (max <= 0) return
      const rect = track.getBoundingClientRect()
      const usable = rect.height - thumb.offsetHeight
      const offset = event.clientY - rect.top - thumb.offsetHeight / 2
      const ratio = usable > 0 ? Math.min(1, Math.max(0, offset / usable)) : 0
      scrollToY(ratio * max, false)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    thumb.addEventListener('pointerdown', onThumbPointerDown)
    track.addEventListener('pointerdown', onTrackPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      thumb.removeEventListener('pointerdown', onThumbPointerDown)
      track.removeEventListener('pointerdown', onTrackPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.clearTimeout(hideTimeout)
    }
  }, [])

  return (
    <div ref={trackRef} className="scroll-indicator">
      <div ref={thumbRef} className="scroll-indicator-thumb" />
    </div>
  )
}
