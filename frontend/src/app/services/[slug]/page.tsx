import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "service"]{ "slug": slug.current }`
  )
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await client.fetch(serviceBySlugQuery, { slug })

  if (!service) notFound()

  const IconComponent = (Icons as any)[service.icon || 'Scale'] || Icons.Scale

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/services"
          className="text-sm text-brand-black/50 hover:text-brand-red mb-8 inline-block transition-colors"
        >
          ← All Services
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <IconComponent className="text-brand-red" size={32} />
          <p className="text-brand-red uppercase tracking-[0.3em] text-xs">
            {service.category}
          </p>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl mb-6 text-brand-black">
          {service.title}
        </h1>
        <p className="text-xl text-brand-black/70 leading-relaxed mb-12">
          {service.shortDescription}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-2xl mb-6 text-brand-black">
              What we deliver
            </h2>
            <ul className="space-y-4">
              {service.bulletPoints?.map((bp: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-red font-serif shrink-0">—</span>
                  <span className="text-brand-black/70">{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-black/10 pt-12">
          <Link
            href="/contact"
            className="inline-block bg-brand-red text-brand-white px-10 py-4 text-sm uppercase tracking-wider hover:bg-brand-black transition-colors"
          >
            Discuss this service
          </Link>
        </div>
      </div>
    </div>
  )
}