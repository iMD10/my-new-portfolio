import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { content, Lang } from './content'

type LangContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (typeof content)[Lang]
  isRTL: boolean
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang')
    return saved === 'en' || saved === 'ar' ? saved : 'ar'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  useEffect(() => {
    const dir = content[lang].dir
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: content[lang], isRTL: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
