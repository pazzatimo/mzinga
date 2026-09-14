import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export const revalidate = 60

export default async function ServicesPage() {
  const services = await client.fetch(servicesQuery)

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
          Our Services
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl text-brand-black">
          Expertise across every dimension of legal and tax practice.
        </h1>
        <p className="text-brand-black/60 max-w-2xl mb-16 text-lg">
          From corporate structuring to tax dispute resolution, our team delivers
          practical, jurisdiction-aware advice tailored to your needs.
        </p>

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
              const IconComponent = (Icons as any)[s.icon || 'Scale'] || Icons.Scale
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
  )
}