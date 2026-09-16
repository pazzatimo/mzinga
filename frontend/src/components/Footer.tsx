import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type LogoType = {
  asset: { _ref: string }
  alt?: string
}

type FooterProps = {
  logo?: LogoType
  companyName?: string
}

export function Footer({ logo, companyName }: FooterProps) {
  return (
    <footer className="bg-brand-black text-brand-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          {logo?.asset ? (
            <Image
              src={urlFor(logo).height(80).url()}
              alt={logo.alt || companyName || 'Mzinga Legal & Tax Consultants'}
              width={220}
              height={80}
              className="h-11 w-auto object-contain mb-4"
            />
          ) : (
            <p className="font-serif text-2xl mb-4">
              MZINGA <span className="text-brand-red">Consultants</span>
            </p>
          )}
          <p className="text-brand-white/60 max-w-sm leading-relaxed">
            Legal, tax, finance and management consultancy serving Tanzania and the
            world.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-brand-red mb-6">
            Navigate
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-brand-red transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-red transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-brand-red transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-brand-red transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-red transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-brand-red mb-6">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-brand-white/60">
            <li>Adrian Mkoba Building, 1st Floor</li>
            <li>Old Dar Es Salaam Road</li>
            <li>Morogoro, Tanzania</li>
            <li>+255 738 601575</li>
            <li>+255 766 013 354</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-brand-white/10 mt-12 pt-8 text-xs text-brand-white/40">
        © {new Date().getFullYear()} Mzinga Legal & Tax Consultants. All rights
        reserved.
      </div>
    </footer>
  )
}