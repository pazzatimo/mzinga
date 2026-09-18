'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('language')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (nextLocale: string) => {
    setOpen(false)
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-brand-black hover:text-brand-red transition-colors text-sm uppercase tracking-wider"
        aria-label={t('label')}
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{t(locale)}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[140px] bg-brand-white border border-brand-black/10 shadow-lg z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSelect(loc)}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                locale === loc
                  ? 'bg-brand-red text-brand-white'
                  : 'text-brand-black hover:bg-brand-black/5'
              }`}
            >
              {t(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}