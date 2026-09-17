import { client } from '@/sanity/lib/client'
import { homepageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'

export const revalidate = 60

export default async function HomePage() {
  const data = await client.fetch(homepageQuery)

  if (!data) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <p className="text-brand-black/60 text-lg">
          Content loading… Add a Homepage document in the Studio.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Hero — full-bleed background image */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        {data.heroImage?.asset ? (
          <Image
            src={urlFor(data.heroImage).width(2400).url()}
            alt={data.heroImage.alt || data.heroHeadline}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-black" />
        )}

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/70 to-brand-black/40" />

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-6 pb-20 lg:pb-28 pt-40">
          <div className="max-w-3xl">
            <p className="text-brand-red uppercase tracking-[0.35em] text-xs mb-6">
              Legal · Tax · Advisory
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] mb-6 text-brand-white">
              {data.heroHeadline}
            </h1>
            <p className="text-base md:text-lg max-w-xl text-brand-white/75 leading-relaxed mb-10">
              {data.heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-brand-red text-brand-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-brand-white hover:text-brand-black transition-colors"
              >
                {data.heroCtaText || 'Book a Consultation'}
              </Link>
              <Link
                href="/services"
                className="border border-brand-white/60 text-brand-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-brand-white hover:text-brand-black transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      {data.trustMetrics?.length > 0 && (
        <section className="border-y border-brand-black/10 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.trustMetrics.map(
              (m: { value: string; label: string }, i: number) => (
                <div key={i} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl text-brand-red mb-2">
                    {m.value}
                  </p>
                  <p className="text-sm uppercase tracking-wider text-brand-black/60">
                    {m.label}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
            Why Choose Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-2xl text-brand-black">
            Built on expertise. Driven by integrity.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-black/10">
            {data.features?.map(
              (f: { title: string; description: string }, i: number) => (
                <div key={i} className="bg-brand-white p-10">
                  <span className="text-brand-red font-serif text-2xl">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-xl mt-4 mb-3 text-brand-black">
                    {f.title}
                  </h3>
                  <p className="text-brand-black/60 leading-relaxed text-sm">
                    {f.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Services Grid — dark section */}
      <section className="py-24 px-6 bg-brand-black text-brand-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
            Our Core Services
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-2xl text-brand-white">
            Comprehensive solutions across legal and tax disciplines.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services?.map(
              (s: {
                _id: string
                title: string
                slug?: { current: string }
                shortDescription: string
                icon?: string
              }) => {
                const IconComponent =
                  (Icons as any)[s.icon || 'Scale'] || Icons.Scale
                return (
                  <Link
                    key={s._id}
                    href={`/services/${s.slug?.current}`}
                    className="group border border-brand-white/20 p-8 hover:bg-brand-red hover:border-brand-red transition-colors"
                  >
                    <IconComponent
                      className="text-brand-red group-hover:text-brand-white transition-colors mb-6"
                      size={28}
                    />
                    <h3 className="font-serif text-xl mb-3 text-brand-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-brand-white/60 group-hover:text-brand-white/90 text-sm leading-relaxed transition-colors">
                      {s.shortDescription}
                    </p>
                  </Link>
                )
              }
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {data.faq?.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand-red uppercase tracking-[0.3em] text-xs mb-4">
              FAQ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-12 text-brand-black">
              Common questions
            </h2>
            <div className="divide-y divide-brand-black/10">
              {data.faq.map(
                (item: { question: string; answer: string }, i: number) => (
                  <details key={i} className="group py-6">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <span className="font-serif text-lg pr-8 text-brand-black">
                        {item.question}
                      </span>
                      <span className="text-brand-red text-2xl group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-brand-black/60 leading-relaxed pr-12">
                      {item.answer}
                    </p>
                  </details>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA — solid red block */}
      <section className="py-24 px-6 bg-brand-red">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-brand-white">
            Ready to protect your interests?
          </h2>
          <p className="text-brand-white/80 mb-10 text-lg">
            Reach out today for a consultation. We assess your situation and propose
            a tailored engagement plan.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-white text-brand-black px-10 py-4 text-sm uppercase tracking-wider hover:bg-brand-black hover:text-brand-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}