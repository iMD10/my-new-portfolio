import { useEffect, useState } from 'react'
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react'
import { useLang } from '../LangContext'

function getASTTime() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }))
}

function getIcon(hour: number) {
  if (hour >= 5 && hour < 7) return <Sunrise className="w-3 h-3" />
  if (hour >= 7 && hour < 18) return <Sun className="w-3 h-3" />
  if (hour >= 18 && hour < 20) return <Sunset className="w-3 h-3" />
  return <Moon className="w-3 h-3" />
}

export default function LiveClock() {
  const { lang } = useLang()
  const [time, setTime] = useState(getASTTime())

  useEffect(() => {
    const id = setInterval(() => setTime(getASTTime()), 1000)
    return () => clearInterval(id)
  }, [])

  const hour = time.getHours()
  const hh = String(hour % 12 || 12).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const isPM = hour >= 12
  const ampm = lang === 'ar' ? (isPM ? 'م' : 'ص') : (isPM ? 'PM' : 'AM')

  return (
    <div
      dir="ltr"
      className="flex items-center gap-1 text-[#1C1610]/55 dark:text-sand/55 shrink-0 select-none"
    >
      <span className="opacity-70 flex items-center">{getIcon(hour)}</span>
      <span className="font-mono tabular-nums text-[10px] md:text-[11px] leading-none">
        {hh}:{mm}
      </span>
      <span className="inline-block min-w-[1.3rem] text-center text-[9px] md:text-[10px] font-medium opacity-60 leading-none self-center">
        {ampm}
      </span>
    </div>
  )
}
