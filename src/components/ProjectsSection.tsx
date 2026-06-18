import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../LangContext'
import { FadeIn, PillButton } from './shared'
import { getLenis } from './SmoothScroll'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'

type ProjectItem = {
  name: string
  category: string
  desc: string
  tech: string[]
  details: {
    overview: string
    highlights: string[]
    metrics?: { label: string; value: string }[]
    previewMetrics?: { label: string; value: string }[]
    imageCount?: number
    images?: string[]
    imageLayout?: ('logo' | 'desktop' | 'mobile')[]
  }
  buttons: { label: string; href: string }[]
}

function getImageClasses(kind: 'logo' | 'desktop' | 'mobile' | undefined, large = false) {
  if (kind === 'logo') {
    return large
      ? 'h-full w-full object-contain p-6 md:p-8'
      : 'h-full w-full object-contain p-3 md:p-4'
  }

  if (kind === 'mobile') {
    return 'h-full w-full object-contain object-center p-2 md:p-3'
  }

  return 'h-full w-full object-cover object-top'
}

function getGalleryTileClasses(kind: 'logo' | 'desktop' | 'mobile' | undefined, index: number, total: number) {
  if (total === 1) return 'md:col-span-12 min-h-[280px] md:min-h-[420px]'

  if (index === 0) {
    if (kind === 'logo') return 'md:col-span-5 min-h-[220px] md:min-h-[320px]'
    if (kind === 'mobile') return 'md:col-span-4 min-h-[300px] md:min-h-[440px]'
    return 'md:col-span-7 min-h-[240px] md:min-h-[360px]'
  }

  if (kind === 'mobile') return 'md:col-span-3 min-h-[300px] md:min-h-[440px]'
  if (kind === 'logo') return 'md:col-span-4 min-h-[180px] md:min-h-[240px]'
  return 'md:col-span-5 min-h-[180px] md:min-h-[240px]'
}

function isUniformGallery(kinds: ('logo' | 'desktop' | 'mobile' | undefined)[]) {
  if (kinds.length < 2) return false
  const filtered = kinds.filter(Boolean)
  return filtered.length > 1 && filtered.every((kind) => kind === filtered[0])
}

function renderProjectMedia({
  src,
  kind,
  large = false,
  desktopLabel,
  onClick,
}: {
  src: string
  kind: 'logo' | 'desktop' | 'mobile' | undefined
  large?: boolean
  desktopLabel?: string
  onClick?: () => void
}) {
  if (kind === 'mobile') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex h-full w-full cursor-zoom-in items-center justify-center ${large ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
      >
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-black/12 bg-[#111] shadow-[0_22px_60px_rgba(0,0,0,0.28)] dark:border-white/10 ${large ? 'h-[min(86vh,56rem)] w-[min(24rem,68vw)] max-w-full' : 'h-[18rem] w-[13rem] max-w-full'}`}
        >
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/75" />
          <div className="absolute inset-[6px] overflow-hidden rounded-[1.6rem] bg-white">
            <img src={src} alt="" className="h-full w-full object-cover object-top bg-white" />
          </div>
        </div>
      </button>
    )
  }

  if (kind === 'desktop') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex h-full w-full cursor-zoom-in flex-col text-start ${large ? 'p-3 md:p-4' : 'p-3 md:p-4'}`}
      >
        <div className="flex items-center gap-1.5 rounded-t-[18px] border border-black/10 border-b-0 bg-white/72 px-3 py-2 dark:border-white/10 dark:bg-white/8">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          {desktopLabel && <span className="ms-2 truncate text-[10px] uppercase text-[#1C1610]/42 dark:text-sand/42">{desktopLabel}</span>}
        </div>
        <div
          className={`min-h-0 overflow-hidden rounded-b-[18px] border border-black/10 bg-white shadow-[0_18px_42px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#111] ${large ? 'aspect-[16/10] md:flex-1 md:aspect-auto' : 'flex-1'}`}
        >
          <img src={src} alt="" className={`h-full w-full ${large ? 'object-contain md:object-cover' : 'object-cover'} object-top bg-white`} />
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-full w-full cursor-zoom-in items-center justify-center ${large ? 'p-6 md:p-10' : 'p-6 md:p-8'}`}
    >
      <div
        className={`flex items-center justify-center rounded-[24px] border border-white/10 bg-white/75 shadow-[0_18px_42px_rgba(0,0,0,0.14)] dark:bg-white/8 ${large ? 'h-[min(72vh,36rem)] w-[min(72vh,36rem)] max-w-full' : 'h-[8rem] w-[8rem]'}`}
      >
        <img src={src} alt="" className={`${getImageClasses(kind, large)} h-full w-full`} />
      </div>
    </button>
  )
}

// Card-preview media: sizes the mockup to fit inside the fixed preview window
// (no fixed rem/vh heights, image contained) so previews are never cropped.
function renderProjectCardMedia({
  src,
  kind,
  desktopLabel,
  onClick,
}: {
  src: string
  kind: 'logo' | 'desktop' | 'mobile' | undefined
  desktopLabel?: string
  onClick?: () => void
}) {
  if (kind === 'mobile') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-full w-full cursor-zoom-in items-center justify-center p-1"
      >
        <div className="relative aspect-[13/18] h-full max-h-full max-w-full overflow-hidden rounded-[1.8rem] border border-black/12 bg-[#111] shadow-[0_18px_46px_rgba(0,0,0,0.26)] dark:border-white/10">
          <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/75" />
          <div className="absolute inset-[5px] overflow-hidden rounded-[1.5rem] bg-white">
            <img src={src} alt="" className="h-full w-full object-cover object-top bg-white" />
          </div>
        </div>
      </button>
    )
  }

  if (kind === 'desktop') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-full w-full cursor-zoom-in items-center justify-center"
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-black/10 bg-white shadow-[0_18px_42px_rgba(0,0,0,0.14)] dark:border-white/10 dark:bg-[#111]">
          <div className="flex items-center gap-1.5 border-b border-black/10 bg-white/72 px-3 py-2 dark:border-white/10 dark:bg-white/8">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            {desktopLabel && <span className="ms-2 truncate text-[10px] uppercase text-[#1C1610]/42 dark:text-sand/42">{desktopLabel}</span>}
          </div>
          <div className="min-h-0 flex-1 bg-white dark:bg-[#111]">
            <img src={src} alt="" className="h-full w-full object-contain object-top bg-white" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full w-full cursor-zoom-in items-center justify-center p-3"
    >
      <img src={src} alt="" className="max-h-full max-w-full object-contain" />
    </button>
  )
}

function getShowcaseKind(kinds: ('logo' | 'desktop' | 'mobile' | undefined)[]) {
  const filtered = kinds.filter(Boolean)
  if (filtered.length === 3 && filtered[0] === 'logo' && filtered[1] === 'mobile' && filtered[2] === 'mobile') return 'logo-two-mobiles'
  if (filtered.length === 3 && filtered[0] === 'logo' && filtered[1] === 'desktop' && filtered[2] === 'mobile') return 'logo-desktop-mobile'
  if (filtered.length > 1 && filtered.every((kind) => kind === 'desktop')) return 'desktop-carousel'
  if (filtered.length > 1 && filtered.every((kind) => kind === 'mobile')) return 'mobile-carousel'
  return 'grid'
}

function ShowcaseNav({
  count,
  active,
  onPrev,
  onNext,
  compact = false,
}: {
  count: number
  active: number
  onPrev: () => void
  onNext: () => void
  compact?: boolean
}) {
  return (
    <div className={`flex items-center justify-between ${compact ? 'mt-3' : 'absolute inset-x-4 bottom-4'}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous image"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/82 text-[#1C1610] backdrop-blur dark:border-white/10 dark:bg-black/45 dark:text-sand"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`h-1.5 rounded-full transition-all ${dotIndex === active ? 'w-7 bg-[#D99A4E]' : 'w-1.5 bg-white/55 dark:bg-white/35'}`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next image"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/82 text-[#1C1610] backdrop-blur dark:border-white/10 dark:bg-black/45 dark:text-sand"
      >
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </button>
    </div>
  )
}

function renderProjectShowcase({
  images,
  kinds,
  title,
  activeIndex,
  onPrev,
  onNext,
  mode,
  onOpenImage,
}: {
  images: string[]
  kinds: ('logo' | 'desktop' | 'mobile' | undefined)[]
  title: string
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  mode: 'card' | 'modal'
  onOpenImage: (src: string, kind: 'logo' | 'desktop' | 'mobile' | undefined) => void
}) {
  const showcaseKind = getShowcaseKind(kinds)
  const isModal = mode === 'modal'
  const shell = 'relative overflow-hidden rounded-[26px] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(235,225,208,0.92))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(17,14,11,0.96))]'
  const shouldUseMobileModalCarousel = isModal && images.length > 1

  const mobileModalCarousel = shouldUseMobileModalCarousel ? (
    <div className="md:hidden">
      <div className={`${shell} min-h-[320px]`}>
        {renderProjectMedia({
          src: images[activeIndex],
          kind: kinds[activeIndex],
          large: true,
          desktopLabel: title,
          onClick: () => onOpenImage(images[activeIndex], kinds[activeIndex]),
        })}
      </div>
      <ShowcaseNav count={images.length} active={activeIndex} onPrev={onPrev} onNext={onNext} compact />
    </div>
  ) : null

  if (showcaseKind === 'logo-two-mobiles' && images.length >= 3) {
    return (
      <>
        {mobileModalCarousel}
        <div className={`${shouldUseMobileModalCarousel ? 'hidden md:grid' : 'grid'} gap-3 md:grid-cols-[0.5fr_1.5fr] md:items-stretch`}>
          <div className={`${shell} min-h-[140px] md:min-h-[220px] flex items-center justify-center p-5 md:p-7`}>
            {renderProjectMedia({ src: images[0], kind: kinds[0], desktopLabel: title, onClick: () => onOpenImage(images[0], kinds[0]) })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className={`${shell} min-h-[340px] md:min-h-[600px] flex items-center justify-center`}>
              {renderProjectMedia({ src: images[1], kind: kinds[1], large: true, desktopLabel: title, onClick: () => onOpenImage(images[1], kinds[1]) })}
            </div>
            <div className={`${shell} min-h-[340px] md:min-h-[600px] flex items-center justify-center`}>
              {renderProjectMedia({ src: images[2], kind: kinds[2], large: true, desktopLabel: title, onClick: () => onOpenImage(images[2], kinds[2]) })}
            </div>
          </div>
        </div>
      </>
    )
  }

  if (showcaseKind === 'logo-desktop-mobile' && images.length >= 3) {
    return (
      <>
        {mobileModalCarousel}
        <div className={`${shouldUseMobileModalCarousel ? 'hidden md:grid' : 'grid'} gap-3 md:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[1fr_1fr]`}>
          <div className="grid gap-3">
            <div className={`${shell} min-h-[150px] md:min-h-[180px]`}>
              {renderProjectMedia({ src: images[0], kind: kinds[0], large: true, desktopLabel: title, onClick: () => onOpenImage(images[0], kinds[0]) })}
            </div>
            <div className={`${shell} min-h-[240px] md:min-h-[360px]`}>
              {renderProjectMedia({ src: images[1], kind: kinds[1], large: true, desktopLabel: title, onClick: () => onOpenImage(images[1], kinds[1]) })}
            </div>
          </div>
          <div className={`${shell} min-h-[320px] md:min-h-[560px] xl:min-h-[600px]`}>
            {renderProjectMedia({ src: images[2], kind: kinds[2], large: true, desktopLabel: title, onClick: () => onOpenImage(images[2], kinds[2]) })}
          </div>
        </div>
      </>
    )
  }

  if ((showcaseKind === 'desktop-carousel' || showcaseKind === 'mobile-carousel') && images.length > 0) {
    const currentKind = kinds[activeIndex]
    return (
      <div>
        <div className={`${shell} ${showcaseKind === 'desktop-carousel' ? 'min-h-[260px] md:min-h-[380px]' : 'min-h-[320px] md:min-h-[520px]'}`}>
          {renderProjectMedia({ src: images[activeIndex], kind: currentKind, large: true, desktopLabel: title, onClick: () => onOpenImage(images[activeIndex], currentKind) })}
        </div>
        <ShowcaseNav count={images.length} active={activeIndex} onPrev={onPrev} onNext={onNext} compact />
      </div>
    )
  }

  return (
    <>
      {mobileModalCarousel}
      <div className={`${shouldUseMobileModalCarousel ? 'hidden md:grid' : 'grid'} auto-rows-fr gap-3 md:grid-cols-12`}>
        {images.map((src, index) => (
          <div key={src} className={`${shell} ${getGalleryTileClasses(kinds[index], index, images.length)}`}>
            {renderProjectMedia({ src, kind: kinds[index], large: index === 0 && images.length > 1, desktopLabel: title, onClick: () => onOpenImage(src, kinds[index]) })}
          </div>
        ))}
      </div>
    </>
  )
}

function StickyProjectCard({
  index,
  total,
  progress,
  item,
  onOpenDetails,
  onOpenImage,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  item: ProjectItem
  onOpenDetails: (item: ProjectItem) => void
  onOpenImage: (src: string, kind: 'logo' | 'desktop' | 'mobile' | undefined) => void
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const range: [number, number] = [index / total, 1]
  const scale = useTransform(progress, range, [1, targetScale])
  const previewImages = item.details.images?.slice(0, 3) ?? []
  const previewKinds = item.details.imageLayout?.slice(0, 3) ?? []
  const showPreview = (item.details.imageCount ?? previewImages.length) > 0 && previewImages.length > 0
  const metrics = item.details.previewMetrics ?? item.details.metrics ?? []
  const [activePreview, setActivePreview] = useState(0)
  const cardMinHeight = 'min-h-[78vh]'

  useEffect(() => {
    setActivePreview(0)
  }, [item.name])

  const previewIndex = previewImages.length === 0 ? 0 : activePreview % previewImages.length

  return (
    <div className="sticky" style={{ top: `calc(6rem + ${index * 28}px)` }}>
      <motion.article
        style={{ scale }}
        className={`${cardMinHeight} rounded-[40px] md:rounded-[56px] bg-[#EBE1D0] dark:bg-dark border border-black/10 dark:border-white/15 p-5 md:p-10 shadow-2xl flex flex-col origin-top transition-colors duration-300`}
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="flex min-w-0 items-baseline gap-4 md:gap-6">
            <span className="text-5xl md:text-7xl font-extrabold text-[#1C1610]/12 dark:text-sand/15 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#1C1610] dark:text-sand leading-tight">{item.name}</h3>
              <p className="mt-2 text-xs md:text-sm uppercase text-gold">{item.category}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 lg:justify-self-start xl:justify-self-end">
            {item.buttons.map((b) => (
              b.href === '#' ? (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => onOpenDetails(item)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-black/8 px-4 py-2 text-[13px] font-bold text-[#1C1610] transition-all duration-200 hover:scale-[1.03] hover:bg-black/12 active:scale-[0.98] dark:border-white/15 dark:bg-white/10 dark:text-sand dark:hover:bg-white/15"
                >
                  {b.label}
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </button>
              ) : (
                <PillButton key={b.label} href={b.href} variant={b === item.buttons[0] ? 'primary' : 'secondary'} className="!px-4 !py-2 !text-[13px]">
                  {b.label}
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </PillButton>
              )
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 flex-1">
          <div className={showPreview ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-5 xl:col-span-4'}>
            <p className="max-w-3xl text-base leading-relaxed text-[#1C1610]/70 dark:text-sand/75 md:text-xl">{item.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tech.map((tch) => (
                <span key={tch} className="rounded-full bg-black/[0.06] dark:bg-white/[0.07] border border-black/10 dark:border-white/12 px-3.5 py-1.5 text-xs text-[#1C1610]/75 dark:text-sand/80">
                  {tch}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 lg:items-center lg:justify-end">
            {showPreview ? (
            <div className="relative w-full max-w-[600px] xl:max-w-[700px] aspect-[4/3] xl:aspect-[16/11] rounded-[28px] overflow-hidden bg-[rgba(210,195,175,0.7)] dark:bg-[rgba(15,13,10,0.72)] border border-black/10 dark:border-white/10">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    index % 2 === 0
                      ? 'radial-gradient(80% 70% at 70% 30%, rgba(217,154,78,0.25), transparent 70%)'
                      : 'radial-gradient(80% 70% at 30% 70%, rgba(111,168,184,0.25), transparent 70%)',
                }}
              />
              <div className="noise-local" />
              <div className="absolute inset-0 flex flex-col p-4 md:p-5">
                <div className="relative min-h-0 flex-1">
                  {renderProjectCardMedia({
                    src: previewImages[previewIndex],
                    kind: previewKinds[previewIndex],
                    desktopLabel: item.name,
                    onClick: () => onOpenImage(previewImages[previewIndex], previewKinds[previewIndex]),
                  })}
                </div>
                {previewImages.length > 1 && (
                  <ShowcaseNav
                    count={previewImages.length}
                    active={previewIndex}
                    onPrev={() => setActivePreview((value) => (value - 1 + previewImages.length) % previewImages.length)}
                    onNext={() => setActivePreview((value) => (value + 1) % previewImages.length)}
                    compact
                  />
                )}
              </div>
            </div>
            ) : (
            <div className="relative w-full aspect-[4/3] xl:aspect-[16/11] rounded-[28px] overflow-hidden bg-[rgba(210,195,175,0.7)] dark:bg-[rgba(15,13,10,0.72)] border border-black/10 dark:border-white/10">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    index % 2 === 0
                      ? 'radial-gradient(80% 70% at 70% 30%, rgba(217,154,78,0.25), transparent 70%)'
                      : 'radial-gradient(80% 70% at 30% 70%, rgba(111,168,184,0.25), transparent 70%)',
                }}
              />
              <div className="noise-local" />
              <div className={`absolute inset-0 grid gap-4 p-5 ${metrics.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex min-h-[11rem] flex-col justify-start rounded-[26px] border border-black/10 bg-white/46 p-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-white/[0.05]"
                  >
                    <p className="text-xs uppercase text-gold">{metric.label}</p>
                    <p className="mt-5 text-4xl md:text-5xl font-extrabold leading-none text-[#1C1610] dark:text-sand">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function ProjectsSection() {
  const { t, lang } = useLang()
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [activeModalImage, setActiveModalImage] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; kind: 'logo' | 'desktop' | 'mobile' | undefined } | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const imageSlots = [1, 2, 3]

  useEffect(() => {
    if (!selectedProject) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    document.body.style.overflow = 'hidden'
    getLenis()?.stop()
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      getLenis()?.start()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProject])

  useEffect(() => {
    setActiveModalImage(0)
  }, [selectedProject?.name])

  useEffect(() => {
    if (!lightboxImage) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxImage])

  return (
    <>
      <section
        id="projects"
        className="bg-[#F5EFE4] dark:bg-ink rounded-t-[40px] md:rounded-t-[60px] -mt-10 relative z-10 py-24 md:py-32 px-4 md:px-10 transition-colors duration-300"
      >
        <FadeIn>
          <h2 className="text-[10vw] md:text-[6vw] leading-none font-extrabold text-[#1C1610] dark:text-sand">
            {t.projects.heading}
          </h2>
        </FadeIn>

        <div ref={containerRef} className="mt-12 md:mt-16 flex flex-col gap-10">
          {t.projects.items.map((item, i) => (
            <StickyProjectCard
              key={item.name}
              index={i}
              total={t.projects.items.length}
              progress={scrollYProgress}
              item={item}
              onOpenDetails={setSelectedProject}
              onOpenImage={(src, kind) => setLightboxImage({ src, kind })}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/65 p-3 md:p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              data-lenis-prevent
              className="project-modal-scroll relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-black/10 bg-[#F5EFE4] text-[#1C1610] shadow-[0_30px_80px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#0D0B09] dark:text-sand md:max-h-[92vh] md:rounded-[32px]"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="sticky top-0 z-20 flex justify-end border-b border-black/10 bg-[#F5EFE4]/92 px-4 py-4 backdrop-blur md:px-8 dark:border-white/10 dark:bg-[#0D0B09]/92">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label={lang === 'ar' ? 'Ø¥ØºÙ„Ø§Ù‚' : 'Close'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[#1C1610] transition-colors hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-sand dark:hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-5 pt-5 md:px-8 md:pb-8 md:pt-6">
              {(() => {
                const galleryCount = selectedProject.details.imageCount ?? 3
                const showGallery = galleryCount > 0
                const visibleImageSlots = imageSlots.slice(0, galleryCount)
                const galleryImages = selectedProject.details.images?.slice(0, galleryCount) ?? []
                const galleryKinds = selectedProject.details.imageLayout?.slice(0, galleryCount) ?? []
                const modalImageIndex = galleryImages.length === 0 ? 0 : activeModalImage % galleryImages.length

                return (
                  <>
              <div className="max-w-3xl">
                <p className="text-xs uppercase text-gold">{selectedProject.category}</p>
                <h3 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">{selectedProject.name}</h3>
                <p className="mt-4 text-sm md:text-base leading-7 text-[#1C1610]/72 dark:text-sand/76">
                  {selectedProject.details.overview}
                </p>
              </div>

              {showGallery && (
              <div className="mt-8">
                {renderProjectShowcase({
                  images: galleryImages,
                  kinds: galleryKinds,
                  title: selectedProject.name,
                  activeIndex: modalImageIndex,
                  onPrev: () => setActiveModalImage((value) => (value - 1 + galleryImages.length) % galleryImages.length),
                  onNext: () => setActiveModalImage((value) => (value + 1) % galleryImages.length),
                  mode: 'modal',
                  onOpenImage: (src, kind) => setLightboxImage({ src, kind }),
                })}
              </div>
              )}

              <div className="mt-8 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-sm leading-7 text-[#1C1610]/72 dark:text-sand/72">
                    {selectedProject.desc}
                  </p>
                  {!showGallery && (
                    <div className="mt-5 rounded-[24px] border border-black/10 bg-white/38 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                      <p className="text-xs uppercase text-gold">
                        {lang === 'ar' ? 'نوع المشروع' : 'Project Type'}
                      </p>
                      <p className="mt-3 text-base leading-7 text-[#1C1610]/72 dark:text-sand/72">
                        {lang === 'ar'
                          ? 'دفتر تجارب وتدريب نموذج، وليس منتجاً بواجهات أو لقطات استخدام.'
                          : 'A notebook-based model training project, not a UI product with screen galleries.'}
                      </p>
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-black/10 bg-black/[0.05] px-3.5 py-1.5 text-xs text-[#1C1610]/74 dark:border-white/10 dark:bg-white/[0.06] dark:text-sand/78">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <h4 className="text-sm font-bold uppercase text-gold">
                    {lang === 'ar' ? 'أبرز النقاط' : 'Highlights'}
                  </h4>
                  {!showGallery && (selectedProject.details.metrics?.length ?? 0) > 0 ? (
                    <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(235,225,208,0.92))] p-4 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(17,14,11,0.96))]">
                      <div className="grid gap-3">
                        {(selectedProject.details.metrics ?? []).map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-[22px] border border-black/10 bg-white/44 px-5 py-5 dark:border-white/10 dark:bg-white/[0.05]"
                          >
                            <p className="text-[11px] uppercase text-gold">{metric.label}</p>
                            <p className="mt-3 text-3xl md:text-4xl font-extrabold">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {selectedProject.details.highlights.map((point) => (
                        <div key={point} className="rounded-[20px] border border-black/10 bg-white/38 px-4 py-3 text-sm leading-6 dark:border-white/10 dark:bg-white/[0.04]">
                          {point}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
                  </>
                )
              })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full ${lightboxImage.kind === 'mobile' ? 'max-w-5xl' : lightboxImage.kind === 'logo' ? 'max-w-4xl' : 'max-w-6xl'}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label={lang === 'ar' ? 'إغلاق الصورة' : 'Close image'}
                className="absolute end-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(16,14,12,0.96)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className={lightboxImage.kind === 'mobile' ? 'min-h-[84vh]' : lightboxImage.kind === 'logo' ? 'min-h-[78vh]' : lightboxImage.kind === 'desktop' ? 'min-h-[38vh] md:min-h-[70vh]' : 'min-h-[70vh]'}>
                  {renderProjectMedia({
                    src: lightboxImage.src,
                    kind: lightboxImage.kind,
                    large: true,
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
