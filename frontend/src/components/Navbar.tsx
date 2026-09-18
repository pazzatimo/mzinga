'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { urlFor } from '@/sanity/lib/image'
import { LanguageSwitcher } from './LanguageSwitcher'

type LogoType = {
  asset: { _ref: string }
  alt?: string
}

type NavbarProps = {
  logo?: LogoType
  companyName?: string
}

export function Navbar({ logo, companyName }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/team', label: t('team') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-white/95 backdrop-blur-sm border-b border-brand-black/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center"
          aria-label={companyName || 'Mzinga Legal & Tax Consultants'}
        >
          {logo?.asset ? (
            <Image
              src={urlFor(logo).height(80).url()}
              alt={logo.alt || companyName || 'Mzinga Legal & Tax Consultants'}
              width={220}
              height={80}
              priority
              className="h-11 w-auto object-contain"
            />
          ) : (
            <span className="font-serif text-xl tracking-tight text-brand-black">
              MZINGA <span className="text-brand-red">Consultants</span>
            </span>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-sm tracking-wide uppercase">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-brand-black hover:text-brand-red transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />

          <Link
            href="/contact"
            className="bg-brand-black text-brand-white px-6 py-2.5 text-sm uppercase tracking-wider hover:bg-brand-red hover:text-brand-white transition-colors"
          >
            {t('bookConsultation')}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <LanguageSwitcher />
          <button
            className="text-brand-black"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-brand-white border-t border-brand-black/10 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-lg text-brand-black hover:text-brand-red transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block bg-brand-red text-brand-white px-6 py-3 text-sm uppercase tracking-wider text-center"
            onClick={() => setOpen(false)}
          >
            {t('bookConsultation')}
          </Link>
        </div>
      )}
    </header>
  )
}