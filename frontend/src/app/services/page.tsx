import { client } from '@/sanity/lib/client'
import { servicesPageQuery, servicesQuery } from '@/sanity/lib/queries'
import { HeroMarquee } from '@/components/HeroMarquee'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export const revalidate = 60

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    client.fetch(servicesPageQuery),
    client.fetch(servicesQuery),
  ])

  return (
    <div className="pb-24">
      {/* Hero — 16:9 sliding image background */}
      <section className="relative w-full aspect-video min-h-[420px] max-h-[80vh] overflow-hidden">
        {page?.heroImages?.length > 0 && (
          <HeroMarquee images={page.heroImages} />
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/60 to-brand-black/40" />

        {/* Overlay text */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6">
            <div className="max-w-2xl">
              <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
                {page?.heroEyebrow || 'Our Services'}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-white leading-[1.1] mb-6">
                {page?.heroHeadline ||
                  'Expertise across every dimension of legal and tax practice.'}
              </h1>
              {page?.heroSubheadline && (
                <p className="text-brand-white/80 text-lg leading-relaxed max-w-xl">
                  {page.heroSubheadline}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-brand-black/10">
            {services.map(
              (s: {
                _id: string
                title: string
                slug?: { current: string }
                shortDescription: string
                bulletPoints?: string[]
                icon?: string
              }) => {
                const IconComponent =
                  (Icons as any)[s.icon || 'Scale'] || Icons.Scale
                return (
                  <Link
                    key={s._id}
                    href={`/services/${s.slug?.current}`}
                    className="bg-brand-white p-10 hover:bg-brand-red group transition-colors"
                  >
                    <IconComponent
                      className="text-brand-red group-hover:text-brand-white transition-colors mb-6"
                      size={28}
                    />
                    <h2 className="font-serif text-2xl mb-3 text-brand-black group-hover:text-brand-white transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-brand-black/60 group-hover:text-brand-white/90 text-sm leading-relaxed mb-6 transition-colors">
                      {s.shortDescription}
                    </p>
                    <ul className="space-y-2">
                      {s.bulletPoints?.slice(0, 3).map((bp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-brand-black/70 group-hover:text-brand-white/80 transition-colors"
                        >
                          <span className="text-brand-red group-hover:text-brand-white transition-colors mt-0.5">
                            —
                          </span>
                          {bp}
                        </li>
                      ))}
                    </ul>
                  </Link>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}