'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
]

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

        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide uppercase">
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

        <Link
          href="/contact"
          className="hidden md:inline-block bg-brand-black text-brand-white px-6 py-2.5 text-sm uppercase tracking-wider hover:bg-brand-red hover:text-brand-white transition-colors"
        >
          Book Consultation
        </Link>

        <button
          className="md:hidden text-brand-black"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  )
}