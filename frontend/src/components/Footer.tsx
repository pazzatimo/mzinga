import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Mail,
} from 'lucide-react'

type LogoType = {
  asset: { _ref: string }
  alt?: string
}

type SocialLink = {
  platform: string
  url: string
}

type FooterProps = {
  settings?: {
    companyName?: string
    logo?: LogoType
    logoInverse?: LogoType
    officeAddress?: {
      line1?: string
      line2?: string
      line3?: string
      city?: string
      country?: string
    }
    mailingAddress?: string
    phone1?: string
    phone2?: string
    email?: string
    socialLinks?: SocialLink[]
  }
}

function getSocialIcon(platform: string) {
  const key = platform.toLowerCase().trim()
  if (key.includes('face')) return Facebook
  if (key.includes('twit') || key === 'x') return Twitter
  if (key.includes('link')) return Linkedin
  if (key.includes('insta')) return Instagram
  if (key.includes('yout')) return Youtube
  return Globe
}

export function Footer({ settings }: FooterProps) {
  const logo = settings?.logoInverse || settings?.logo
  const { officeAddress, mailingAddress, phone1, phone2, email, socialLinks } =
    settings || {}

  return (
    <footer className="bg-brand-black text-brand-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          {logo?.asset ? (
            <Image
              src={urlFor(logo).height(80).url()}
              alt={logo.alt || settings?.companyName || 'Mzinga'}
              width={220}
              height={80}
              className="h-11 w-auto object-contain mb-4"
            />
          ) : (
            <p className="font-serif text-2xl mb-4">
              MZINGA <span className="text-brand-red">Consultants</span>
            </p>
          )}
          <p className="text-brand-white/60 max-w-sm leading-relaxed mb-6">
            Legal, tax, finance and management consultancy serving Tanzania and the
            world.
          </p>

          {/* Social links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((s, i) => {
                const Icon = getSocialIcon(s.platform)
                return (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="w-10 h-10 border border-brand-white/20 flex items-center justify-center text-brand-white/70 hover:bg-brand-red hover:border-brand-red hover:text-brand-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          )}
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
            {officeAddress?.line1 && <li>{officeAddress.line1}</li>}
            {officeAddress?.line2 && <li>{officeAddress.line2}</li>}
            {officeAddress?.line3 && <li>{officeAddress.line3}</li>}
            {(officeAddress?.city || officeAddress?.country) && (
              <li>
                {[officeAddress.city, officeAddress.country]
                  .filter(Boolean)
                  .join(', ')}
              </li>
            )}
            {mailingAddress && <li>{mailingAddress}</li>}
            {phone1 && (
              <li>
                <a href={`tel:${phone1}`} className="hover:text-brand-red transition-colors">
                  {phone1}
                </a>
              </li>
            )}
            {phone2 && (
              <li>
                <a href={`tel:${phone2}`} className="hover:text-brand-red transition-colors">
                  {phone2}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-brand-red transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={14} />
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-brand-white/10 mt-12 pt-8 text-xs text-brand-white/40">
        © {new Date().getFullYear()} {settings?.companyName || 'Mzinga Legal & Tax Consultants'}. All rights reserved.
      </div>
    </footer>
  )
}